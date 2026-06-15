extends Node3D
## LIMES — runtime GLB loader / unit turntable.
## Loads a decimated unit mesh via GLTFDocument (no import step needed), centers
## it, and slowly rotates it. First milestone of the Godot mobile+PC client.

@export var unit_name: String = "roman_swordsman"
@export var spin_speed: float = 0.6

var _mesh_root: Node3D

func _ready() -> void:
	_load_unit(unit_name)

func unit_glb_path(name: String) -> String:
	# Decimated meshes live outside res:// for now (generated assets).
	var home := OS.get_environment("HOME")
	var low := home + "/Desktop/limes/art/renders/units3d_lowpoly/" + name + ".glb"
	if FileAccess.file_exists(low):
		return low
	return home + "/Desktop/limes/art/renders/units3d/" + name + ".glb"

func _load_unit(name: String) -> void:
	var path := unit_glb_path(name)
	if not FileAccess.file_exists(path):
		push_error("[unit_viewer] missing mesh: " + path)
		return
	var doc := GLTFDocument.new()
	var state := GLTFState.new()
	var err := doc.append_from_file(path, state)
	if err != OK:
		push_error("[unit_viewer] GLTF load failed (%d): %s" % [err, path])
		return
	var scene := doc.generate_scene(state)
	if scene == null:
		push_error("[unit_viewer] generate_scene returned null")
		return
	if _mesh_root:
		_mesh_root.queue_free()
	_mesh_root = scene
	add_child(_mesh_root)
	_center_and_report(_mesh_root, name)

func _center_and_report(root: Node3D, name: String) -> void:
	var aabb := _scene_aabb(root)
	var verts := _count_verts(root)
	# recenter so the model sits on origin, base at y=0
	root.position = Vector3(-aabb.get_center().x, -aabb.position.y, -aabb.get_center().z)
	print("[unit_viewer] loaded %s — %d verts, size %.2f x %.2f x %.2f" % [
		name, verts, aabb.size.x, aabb.size.y, aabb.size.z])

func _scene_aabb(node: Node) -> AABB:
	var out := AABB()
	var first := true
	for child in node.find_children("*", "MeshInstance3D", true, false):
		var mi := child as MeshInstance3D
		if mi.mesh == null:
			continue
		var box := mi.get_aabb()
		box = mi.global_transform * box
		if first:
			out = box
			first = false
		else:
			out = out.merge(box)
	return out

func _count_verts(node: Node) -> int:
	var n := 0
	for child in node.find_children("*", "MeshInstance3D", true, false):
		var mi := child as MeshInstance3D
		if mi.mesh:
			for s in mi.mesh.get_surface_count():
				var arr := mi.mesh.surface_get_arrays(s)
				if arr.size() > Mesh.ARRAY_VERTEX and arr[Mesh.ARRAY_VERTEX]:
					n += arr[Mesh.ARRAY_VERTEX].size()
	return n

func _process(delta: float) -> void:
	if _mesh_root:
		_mesh_root.rotate_y(spin_speed * delta)
