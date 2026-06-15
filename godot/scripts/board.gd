extends Node3D
## LIMES — the battlefield. Builds an 8x8 frontier board, places tribe-colored
## unit miniatures in formation across the gold frontier, orbit camera, juice.
## Grey shape-only meshes are tinted by tribe -> reads as painted board minis.

const TILE := 1.0
const GAP := 0.06
const STEP := TILE + GAP
const N := 8
const HALF := (N * STEP) / 2.0
const STAKE := 4          # frontier row: your land rows 0-3, enemy 4-7

# LIMES tribe palette (from the established art direction)
const TRIBE := {
	"roman":   Color8(0xa3, 0x26, 0x38),
	"spartan": Color8(0xc4, 0x62, 0x2d),
	"hun":     Color8(0xd9, 0xa4, 0x18),
	"gaul":    Color8(0x3e, 0x7a, 0x3a),
	"egyptian":Color8(0x2a, 0xa1, 0x98),
	"viking":  Color8(0x2b, 0x4f, 0x81),
	"persian": Color8(0x5b, 0x3a, 0x8e),
	"teuton":  Color8(0x6e, 0x73, 0x78),
}

# A skirmish: your army (roman) vs enemy (viking), facing across the frontier.
# {col, row, tribe, unit}
const FORMATION := [
	# your side (rows 2-3, warm) — facing +z toward the enemy
	{"c":1,"r":3,"t":"roman","u":"roman_spearman"},
	{"c":2,"r":3,"t":"roman","u":"roman_swordsman"},
	{"c":3,"r":3,"t":"roman","u":"roman_hero_legatus_marcus"},
	{"c":4,"r":3,"t":"roman","u":"roman_swordsman"},
	{"c":5,"r":3,"t":"roman","u":"roman_spearman"},
	{"c":2,"r":2,"t":"roman","u":"roman_archer"},
	{"c":4,"r":2,"t":"roman","u":"roman_cavalry"},
	{"c":3,"r":1,"t":"roman","u":"roman_siege"},
	# enemy side (rows 4-5, cool) — facing -z toward you
	{"c":1,"r":4,"t":"viking","u":"viking_spearman"},
	{"c":2,"r":4,"t":"viking","u":"viking_swordsman"},
	{"c":3,"r":4,"t":"viking","u":"viking_hero_jarl_sigrid"},
	{"c":4,"r":4,"t":"viking","u":"viking_swordsman"},
	{"c":5,"r":4,"t":"viking","u":"viking_spearman"},
	{"c":3,"r":5,"t":"viking","u":"viking_archer"},
	{"c":5,"r":5,"t":"viking","u":"viking_cavalry"},
	{"c":4,"r":6,"t":"viking","u":"viking_siege"},
]

var _cam_yaw := 0.0
var _cam_pitch := 0.86
var _cam_dist := 9.0
var _cam: Camera3D
var _units: Array[Dictionary] = []

func _ready() -> void:
	_build_environment()
	_build_board()
	_place_units()
	var args := OS.get_cmdline_user_args()
	if "--shot" in args:
		await get_tree().create_timer(0.8).timeout
		_screenshot()
		get_tree().quit()
	elif "--reel" in args:
		await _capture_reel()
		get_tree().quit()
	elif "--battle" in args:
		await _play_battle()              # recorded externally via --write-movie
		get_tree().quit()
	else:
		_battle_loop()                    # interactive: a living, looping skirmish

func cell_to_world(c: int, r: int) -> Vector3:
	return Vector3((c - (N - 1) / 2.0) * STEP, 0.0, (r - (N - 1) / 2.0) * STEP)

# ---------- environment / camera ----------
func _build_environment() -> void:
	var sky_mat := ProceduralSkyMaterial.new()
	sky_mat.sky_top_color = Color8(0x17, 0x13, 0x10)
	sky_mat.sky_horizon_color = Color8(0x3a, 0x2c, 0x20)
	sky_mat.ground_horizon_color = Color8(0x2a, 0x22, 0x18)
	sky_mat.ground_bottom_color = Color8(0x14, 0x10, 0x0c)
	sky_mat.sun_angle_max = 30.0
	var sky := Sky.new()
	sky.sky_material = sky_mat

	var env := Environment.new()
	env.background_mode = Environment.BG_SKY
	env.sky = sky
	env.ambient_light_source = Environment.AMBIENT_SOURCE_SKY
	env.ambient_light_energy = 0.5
	env.fog_enabled = true
	env.fog_light_color = Color8(0x2a, 0x22, 0x18)
	env.fog_density = 0.012
	env.fog_aerial_perspective = 0.3
	env.tonemap_mode = Environment.TONE_MAPPER_ACES
	env.tonemap_white = 1.1
	env.glow_enabled = true
	env.glow_intensity = 0.45
	env.glow_bloom = 0.12
	var we := WorldEnvironment.new()
	we.environment = env
	add_child(we)

	var sun := DirectionalLight3D.new()
	sun.light_color = Color8(0xff, 0xef, 0xd2)
	sun.light_energy = 1.7
	sun.shadow_enabled = true
	sun.shadow_blur = 1.5
	sun.rotation_degrees = Vector3(-52, -42, 0)
	add_child(sun)

	# cool back-rim light for silhouette separation (cinematic)
	var rim := DirectionalLight3D.new()
	rim.light_color = Color8(0x7e, 0x9c, 0xc8)
	rim.light_energy = 0.6
	rim.rotation_degrees = Vector3(-18, 150, 0)
	add_child(rim)

	_cam = Camera3D.new()
	_cam.fov = 40.0
	# tilt-shift DoF -> reads as real tabletop miniatures
	var ca := CameraAttributesPractical.new()
	ca.dof_blur_far_enabled = true
	ca.dof_blur_far_distance = 10.5
	ca.dof_blur_far_transition = 2.5
	ca.dof_blur_near_enabled = true
	ca.dof_blur_near_distance = 7.0
	ca.dof_blur_near_transition = 2.5
	ca.dof_blur_amount = 0.2
	_cam.attributes = ca
	add_child(_cam)
	_update_camera()

func _update_camera() -> void:
	var tgt := Vector3(0, 0.55, 0.2)
	var off := Vector3(
		sin(_cam_yaw) * cos(_cam_pitch),
		sin(_cam_pitch),
		cos(_cam_yaw) * cos(_cam_pitch)) * _cam_dist
	_cam.position = tgt + off
	_cam.look_at(tgt, Vector3.UP)

# ---------- board ----------
func _mat(col: Color, rough := 0.9, metal := 0.0) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = col
	m.roughness = rough
	m.metallic = metal
	return m

func _box(size: Vector3, pos: Vector3, mat: StandardMaterial3D, parent: Node) -> MeshInstance3D:
	var bm := BoxMesh.new()
	bm.size = size
	var mi := MeshInstance3D.new()
	mi.mesh = bm
	mi.material_override = mat
	mi.position = pos
	parent.add_child(mi)
	return mi

func _build_board() -> void:
	# grassy apron the board sits on
	_box(Vector3(N * STEP + 4, 0.5, N * STEP + 4), Vector3(0, -0.35, 0),
		_mat(Color8(0x4f, 0x63, 0x2f), 1.0), self)

	var warm := Color8(0x6f, 0x7d, 0x3a)
	var cool := Color8(0x55, 0x63, 0x3a)
	var gold := Color8(0xdb, 0xc0, 0x6a)
	for r in N:
		for c in N:
			var p := cell_to_world(c, r)
			var is_yours := r < STAKE
			var base := warm if is_yours else cool
			# subtle checker
			if (c + r) % 2 == 0:
				base = base.lightened(0.06)
			_box(Vector3(TILE, 0.22, TILE), p + Vector3(0, -0.11, 0), _mat(base, 1.0), self)
	# gold frontier line between row 3 and row 4
	var z_front := cell_to_world(0, STAKE).z - STEP / 2.0
	var glow_mat := _mat(gold, 0.4, 0.2)
	glow_mat.emission_enabled = true
	glow_mat.emission = Color8(0x6a, 0x52, 0x18)
	glow_mat.emission_energy_multiplier = 1.4
	_box(Vector3(N * STEP, 0.06, 0.10), Vector3(0, 0.02, z_front), glow_mat, self)
	# a few gold stakes along the frontier
	for c in range(0, N, 2):
		var sp := Vector3(cell_to_world(c, 0).x, 0.18, z_front)
		_box(Vector3(0.07, 0.5, 0.07), sp, glow_mat, self)

# ---------- units ----------
func _load_unit_mesh(unit: String) -> Node3D:
	var home := OS.get_environment("HOME")
	var path := home + "/Desktop/limes/art/renders/units3d_lowpoly/" + unit + ".glb"
	if not FileAccess.file_exists(path):
		path = home + "/Desktop/limes/art/renders/units3d/" + unit + ".glb"
	if not FileAccess.file_exists(path):
		push_warning("[board] missing unit mesh: " + unit)
		return null
	var doc := GLTFDocument.new()
	var st := GLTFState.new()
	if doc.append_from_file(path, st) != OK:
		return null
	return doc.generate_scene(st)

func _tint(node: Node, col: Color) -> StandardMaterial3D:
	# painted-miniature look: tribe albedo, matte, slight rim. ONE shared
	# material per unit so combat can flash its emission.
	var mat := StandardMaterial3D.new()
	mat.albedo_color = col
	mat.roughness = 0.62
	mat.metallic = 0.05
	mat.rim_enabled = true
	mat.rim = 0.35
	mat.rim_tint = 0.4
	mat.emission_enabled = true
	mat.emission = Color(1, 0.2, 0.12)
	mat.emission_energy_multiplier = 0.0
	for mi in node.find_children("*", "MeshInstance3D", true, false):
		(mi as MeshInstance3D).material_override = mat
	return mat

func _unit_type(name: String) -> String:
	for t in ["spearman", "swordsman", "archer", "cavalry", "siege", "hero"]:
		if t in name:
			return t
	return "swordsman"

func _place_units() -> void:
	for f in FORMATION:
		var mesh := _load_unit_mesh(f.u)
		if mesh == null:
			continue
		# recenter base to origin + scale to ~0.95 tall
		var aabb := _aabb(mesh)
		var holder := Node3D.new()
		mesh.position = Vector3(-aabb.get_center().x, -aabb.position.y, -aabb.get_center().z)
		var target_h := 0.95
		var s: float = target_h / max(0.01, aabb.size.y)
		holder.scale = Vector3(s, s, s)
		holder.add_child(mesh)

		var base := Node3D.new()      # tribe disc base under the mini
		var disc := CylinderMesh.new()
		disc.top_radius = 0.42; disc.bottom_radius = 0.46; disc.height = 0.06
		var dm := MeshInstance3D.new()
		dm.mesh = disc
		dm.material_override = _mat(TRIBE[f.t].darkened(0.45), 0.8)
		dm.position = Vector3(0, 0.03, 0)
		base.add_child(dm)
		base.add_child(holder)

		var anchor := Node3D.new()
		anchor.position = cell_to_world(f.c, f.r)
		# face the frontier: your side looks +z, enemy looks -z
		anchor.rotation.y = 0.0 if f.r < STAKE else PI
		var mat := _tint(mesh, TRIBE[f.t])
		anchor.add_child(base)
		add_child(anchor)

		var typ := _unit_type(f.u)
		var hp := 3
		if typ == "hero" or typ == "siege": hp = 5
		_units.append({
			"node": anchor, "holder": holder, "mat": mat,
			"tribe": f.t, "type": typ, "cell": Vector2i(f.c, f.r),
			"home_cell": Vector2i(f.c, f.r), "base_scale": holder.scale,
			"hp": hp, "max_hp": hp, "alive": true, "busy": false,
			"yours": f.r < STAKE, "phase": _units.size() * 0.7,
		})

func _aabb(node: Node) -> AABB:
	# AABB in `node`-local space — works before the node enters the tree.
	var out := AABB()
	var first := true
	for mi in node.find_children("*", "MeshInstance3D", true, false):
		var inst := mi as MeshInstance3D
		if inst.mesh == null: continue
		var x := Transform3D()
		var n: Node = inst
		while n != node and n != null:
			if n is Node3D: x = (n as Node3D).transform * x
			n = n.get_parent()
		var b: AABB = x * inst.get_aabb()
		if first: out = b; first = false
		else: out = out.merge(b)
	return out

# ---------- combat (procedural; static meshes, tween-driven) ----------
func _world_of(u: Dictionary) -> Vector3:
	return cell_to_world(u.cell.x, u.cell.y)

func _damage_number(u: Dictionary, dmg: int) -> void:
	var lbl := Label3D.new()
	lbl.text = "-%d" % dmg
	lbl.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	lbl.no_depth_test = true
	lbl.pixel_size = 0.009
	lbl.font_size = 64
	lbl.outline_size = 14
	lbl.modulate = Color(1.0, 0.82, 0.28)
	lbl.outline_modulate = Color(0, 0, 0, 0.9)
	var base := _world_of(u) + Vector3(0, 1.25, 0)
	lbl.position = base
	add_child(lbl)
	var tw := create_tween()
	tw.set_parallel(true)
	tw.tween_property(lbl, "position", base + Vector3(0, 0.8, 0), 0.85)
	tw.tween_property(lbl, "modulate:a", 0.0, 0.85)
	tw.set_parallel(false)
	tw.tween_callback(lbl.queue_free)

func _hit(u: Dictionary, dmg: int) -> void:
	if not u.alive: return
	var mat: StandardMaterial3D = u.mat
	var ft := create_tween()
	ft.tween_property(mat, "emission_energy_multiplier", 3.0, 0.05)
	ft.tween_property(mat, "emission_energy_multiplier", 0.0, 0.25)
	var holder: Node3D = u.holder
	var bs: Vector3 = u.base_scale
	var pt := create_tween()
	pt.tween_property(holder, "scale", bs * 1.16, 0.05)
	pt.tween_property(holder, "scale", bs, 0.22).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
	_damage_number(u, dmg)
	u.hp -= dmg
	if u.hp <= 0:
		_die(u)

func _die(u: Dictionary) -> void:
	u.alive = false
	var mat: StandardMaterial3D = u.mat
	mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	var anchor: Node3D = u.node
	var tw := create_tween()
	tw.set_parallel(true)
	tw.tween_property(anchor, "rotation:x", deg_to_rad(86), 0.5).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
	tw.tween_property(anchor, "position:y", anchor.position.y - 0.35, 0.7)
	tw.tween_property(mat, "albedo_color:a", 0.0, 0.7)

func _lunge(att: Dictionary, target: Dictionary, dmg: int, dur := 0.34) -> void:
	if not att.alive: return
	att.busy = true
	var anchor: Node3D = att.node
	var from := anchor.position
	var dir := _world_of(target) - _world_of(att); dir.y = 0
	if dir.length() > 0.01: dir = dir.normalized()
	var strike := from + dir * 0.5
	var tw := create_tween()
	tw.tween_property(anchor, "position", strike, dur * 0.4).set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_IN)
	tw.tween_callback(func(): _hit(target, dmg))
	tw.tween_property(anchor, "position", from, dur * 0.6).set_trans(Tween.TRANS_SINE)
	tw.tween_callback(func(): att.busy = false)
	await tw.finished

func _clash(a: Dictionary, b: Dictionary, da := 1, db := 1) -> void:
	_lunge(a, b, da)
	_lunge(b, a, db)

func _glide(u: Dictionary, to_cell: Vector2i, dur := 0.5) -> void:
	if not u.alive: return
	u.busy = true
	u.cell = to_cell
	var anchor: Node3D = u.node
	var holder: Node3D = u.holder
	var tw := create_tween()
	tw.tween_property(anchor, "position", cell_to_world(to_cell.x, to_cell.y), dur).set_trans(Tween.TRANS_SINE)
	var hop := create_tween()
	hop.tween_property(holder, "position:y", 0.22, dur * 0.5).set_trans(Tween.TRANS_SINE)
	hop.tween_property(holder, "position:y", 0.0, dur * 0.5).set_trans(Tween.TRANS_SINE)
	await tw.finished
	u.busy = false

func _shoot(shooter: Dictionary, target: Dictionary, dmg: int) -> void:
	if not shooter.alive: return
	var proj := MeshInstance3D.new()
	var sm := SphereMesh.new(); sm.radius = 0.07; sm.height = 0.14
	proj.mesh = sm
	proj.material_override = _mat(Color(0.96, 0.9, 0.55), 0.3, 0.2)
	var start := _world_of(shooter) + Vector3(0, 0.7, 0)
	var end := _world_of(target) + Vector3(0, 0.6, 0)
	var mid := start.lerp(end, 0.5) + Vector3(0, 0.6, 0)
	proj.position = start
	add_child(proj)
	var dur := 0.45
	var tw := create_tween()
	tw.tween_property(proj, "position", mid, dur * 0.5).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
	tw.tween_property(proj, "position", end, dur * 0.5).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_IN)
	await tw.finished
	proj.queue_free()
	_hit(target, dmg)

func _charge(att: Dictionary, to_cell: Vector2i, target: Dictionary, dmg: int) -> void:
	await _glide(att, to_cell, 0.45)
	_lunge(att, target, dmg)

# A choreographed skirmish: arrows, clashes, two cavalry charges, a hero duel,
# a siege barrage, several deaths. Indices are FORMATION order (0-7 Roman, 8-15 Viking).
func _play_battle() -> void:
	await get_tree().create_timer(0.8).timeout
	_shoot(_units[5], _units[9], 1)                      # archers loose
	_shoot(_units[13], _units[1], 1)
	await get_tree().create_timer(1.1).timeout
	_clash(_units[0], _units[8])                         # front lines clash
	_clash(_units[1], _units[9])
	_clash(_units[3], _units[11])
	_clash(_units[4], _units[12])
	await get_tree().create_timer(1.3).timeout
	await _charge(_units[6], Vector2i(4, 4), _units[11], 3)   # Roman cavalry crashes in
	await get_tree().create_timer(0.6).timeout
	_clash(_units[2], _units[10], 2, 2)                  # hero duel
	await get_tree().create_timer(1.2).timeout
	_shoot(_units[7], _units[12], 3)                     # siege barrage
	await get_tree().create_timer(0.6).timeout
	_shoot(_units[15], _units[3], 3)
	await get_tree().create_timer(1.0).timeout
	await _charge(_units[14], Vector2i(2, 3), _units[1], 3)   # Viking cavalry counter
	await get_tree().create_timer(1.6).timeout

func _reset_battle() -> void:
	for u in _units:
		u.alive = true; u.busy = false; u.hp = u.max_hp; u.cell = u.home_cell
		var anchor: Node3D = u.node
		anchor.position = cell_to_world(u.home_cell.x, u.home_cell.y)
		anchor.rotation.x = 0.0
		var holder: Node3D = u.holder
		holder.position.y = 0.0
		holder.scale = u.base_scale
		var mat: StandardMaterial3D = u.mat
		mat.albedo_color.a = 1.0
		mat.transparency = BaseMaterial3D.TRANSPARENCY_DISABLED
		mat.emission_energy_multiplier = 0.0

func _battle_loop() -> void:
	while true:
		await _play_battle()
		await get_tree().create_timer(2.0).timeout
		_reset_battle()
		await get_tree().create_timer(1.0).timeout

# ---------- input: orbit + idle ----------
func _unhandled_input(e: InputEvent) -> void:
	if e is InputEventMouseMotion and Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT):
		_cam_yaw -= e.relative.x * 0.006
		_cam_pitch = clamp(_cam_pitch - e.relative.y * 0.005, 0.2, 1.3)
		_update_camera()
	elif e is InputEventMouseButton:
		if e.button_index == MOUSE_BUTTON_WHEEL_UP: _cam_dist = max(5.0, _cam_dist - 0.6); _update_camera()
		elif e.button_index == MOUSE_BUTTON_WHEEL_DOWN: _cam_dist = min(20.0, _cam_dist + 0.6); _update_camera()

var _t := 0.0
func _process(delta: float) -> void:
	_t += delta
	# gentle idle bob per LIVING, non-busy unit (combat tweens drive busy ones)
	for u in _units:
		if not u.alive or u.busy: continue
		(u.holder as Node3D).position.y = sin(_t * 1.6 + u.phase) * 0.02

func _capture_reel() -> void:
	var dir := "/tmp/limes_reel"
	DirAccess.make_dir_recursive_absolute(dir)
	var frames := 72
	# let the scene settle
	await get_tree().create_timer(0.4).timeout
	for i in frames:
		var ph := float(i) / frames
		_cam_yaw = ph * TAU                       # full 360 orbit
		_cam_pitch = 0.80 + sin(ph * TAU) * 0.10  # gentle vertical sway
		_update_camera()
		# advance idle bob too
		_t = ph * 6.0
		for u in _units:
			if u.alive:
				(u.holder as Node3D).position.y = sin(_t * 1.6 + u.phase) * 0.02
		await RenderingServer.frame_post_draw
		var img := get_viewport().get_texture().get_image()
		img.save_png("%s/f_%03d.png" % [dir, i])
	print("[board] reel frames -> ", dir)

func _screenshot() -> void:
	var img := get_viewport().get_texture().get_image()
	var out := OS.get_environment("HOME") + "/Desktop/limes/art/godot_board.png"
	img.save_png(out)
	print("[board] screenshot -> ", out)
