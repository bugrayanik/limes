(()=>{function ZZ(J){let Q=new TextEncoder().encode(J),$=Q.length*8,Z=Q.length+1,W=Z+(56-Z%64+64)%64+8,K=new Uint8Array(W);K.set(Q),K[Q.length]=128;let Y=new DataView(K.buffer);Y.setUint32(W-4,$>>>0,!1),Y.setUint32(W-8,Math.floor($/4294967296)>>>0,!1);let X=1732584193,U=4023233417,H=2562383102,q=271733878,G=3285377520,N=new Uint32Array(80),E=(B,D)=>B<<D|B>>>32-D;for(let B=0;B<W;B+=64){for(let w=0;w<16;w++)N[w]=Y.getUint32(B+w*4,!1);for(let w=16;w<80;w++)N[w]=E(N[w-3]^N[w-8]^N[w-14]^N[w-16],1);let D=X,F=U,O=H,L=q,z=G;for(let w=0;w<80;w++){let P,C;if(w<20)P=F&O|~F&L,C=1518500249;else if(w<40)P=F^O^L,C=1859775393;else if(w<60)P=F&O|F&L|O&L,C=2400959708;else P=F^O^L,C=3395469782;let V=E(D,5)+P+z+C+N[w]|0;z=L,L=O,O=E(F,30),F=D,D=V}X=X+D|0,U=U+F|0,H=H+O|0,q=q+L|0,G=G+z|0}let R=(B)=>(B>>>0).toString(16).padStart(8,"0");return R(X)+R(U)+R(H)+R(q)+R(G)}class S6{mt=new Uint32Array(624);mti=625;constructor(J){let Q=[],$=J>>>0,Z=Math.floor(J/4294967296);Q.push($);while(Z>0)Q.push(Z>>>0),Z=Math.floor(Z/4294967296);this.initByArray(Q.length?Q:[0])}initGenrand(J){this.mt[0]=J>>>0;for(let Q=1;Q<624;Q++){let $=this.mt[Q-1]^this.mt[Q-1]>>>30;this.mt[Q]=Math.imul(1812433253,$)+Q>>>0}this.mti=624}initByArray(J){this.initGenrand(19650218);let Q=1,$=0,Z=Math.max(624,J.length);for(;Z;Z--){let W=this.mt[Q-1]^this.mt[Q-1]>>>30;if(this.mt[Q]=(this.mt[Q]^Math.imul(W,1664525))+J[$]+$>>>0,Q++,$++,Q>=624)this.mt[0]=this.mt[623],Q=1;if($>=J.length)$=0}for(Z=623;Z;Z--){let W=this.mt[Q-1]^this.mt[Q-1]>>>30;if(this.mt[Q]=(this.mt[Q]^Math.imul(W,1566083941))-Q>>>0,Q++,Q>=624)this.mt[0]=this.mt[623],Q=1}this.mt[0]=2147483648}genrandUint32(){let J;if(this.mti>=624){let Q=0;for(;Q<227;Q++)J=this.mt[Q]&2147483648|this.mt[Q+1]&2147483647,this.mt[Q]=this.mt[Q+397]^J>>>1^(J&1?2567483615:0);for(;Q<623;Q++)J=this.mt[Q]&2147483648|this.mt[Q+1]&2147483647,this.mt[Q]=this.mt[Q+-227]^J>>>1^(J&1?2567483615:0);J=this.mt[623]&2147483648|this.mt[0]&2147483647,this.mt[623]=this.mt[396]^J>>>1^(J&1?2567483615:0),this.mti=0}return J=this.mt[this.mti++],J^=J>>>11,J^=J<<7&2636928640,J^=J<<15&4022730752,J^=J>>>18,J>>>0}getrandbits(J){return this.genrandUint32()>>>32-J}randbelow(J){if(!J)return 0;let Q=32-Math.clz32(J),$=this.getrandbits(Q);while($>=J)$=this.getrandbits(Q);return $}shuffle(J){for(let Q=J.length-1;Q>=1;Q--){let $=this.randbelow(Q+1),Z=J[Q];J[Q]=J[$],J[$]=Z}}}var jK={BOARD_COLS:8,BOARD_ROWS:8,HEARTLAND_ROWS:2,STAKE_START:4,STAKE_MIN:2,STAKE_MAX:6,STAKE_STEP_MAX:1,LONE_RUNNER_RADIUS:2,WAGON_COUNT:3,WAGON_HP:3,WAGON_BOUNTY:3,BREACH_DMG:1,BREACH_CAP:2,BREACH_CAP_LATE:3,BREACH_CAP_RISE_ROUND:13,ROUT_WAGON_DMG:2,START_SUPPLY:8,START_CROP:6,FIELD_COST:2,FIELD_YIELD:2,FARMSTEAD_SIZE:3,FARMSTEAD_BONUS:2,ANNEX_YIELD:1,RAID_GAIN:3,PALISADE_COST:3,BUILD_ACTIONS:2,UPKEEP_CROP:1,SUPPLY_STRAIN_CROP:1,EXHAUSTION_START_ROUND:12,EXHAUSTION_INITIAL:1,EXHAUSTION_ACCEL_ROUND:13,EXHAUSTION_ACCEL:2,MUSTER_COPIES:6,COPY_SURCHARGE:1,UNLOCK_3RD:6,UNLOCK_4TH:10,UNLOCK_5TH:15,COST_SPEARMAN:2,COST_SWORDSMAN:3,COST_ARCHER:3,COST_CAVALRY:4,COST_SIEGE:5,DEPLOY_MAX:2,REPOSITION_MAX:2,RUSH_RETURN_COST:1,WOUND_RETURN_DELAY:2,TRIBUTE_PER_ROW:1,TRIBUTE_SUPPLY_VALUE:1,SURGE_COST:1,SHIELDBEARER_COST:2,INTERVENTIONS_PER_WINDOW:1,PULSES_PER_CLASH:2,ATK_BONUS_CAP:2,GUARD_CAP:2,MOD_FLANK:1,MOD_SUPPORT:1,MOD_BRACE_GUARD:1,MOD_CHARGE:1,MOD_COUNTER:1,MOD_HILL:1,MOD_RIVER:1,MOD_ROAD:1,FLANK_THRESHOLD:2,FLANK_MIN_DMG:1,EXHAUST_ATK_PENALTY:1,EXHAUST_GUARD_PENALTY:1,DISPLACE_DMG:1,RIVER_PUSH_DMG:2,TRAP_PUSH_DMG:2,CHARGE_MOVE_MIN:2,PUSH_BACK:1,RANGED_RETALIATION:1,SPEAR_ATK:1,SPEAR_HP:4,SPEAR_MV:1,SPEAR_RNG:1,SWORD_ATK:2,SWORD_HP:5,SWORD_MV:1,SWORD_RNG:1,CAV_ATK:2,CAV_HP:4,CAV_MV:3,CAV_RNG:1,ARCHER_ATK:2,ARCHER_HP:3,ARCHER_MV:1,ARCHER_RNG_MAX:2,SIEGE_ATK:3,SIEGE_HP:3,SIEGE_MV:1,SIEGE_RNG_MIN:2,SIEGE_RNG_MAX:3,HERO_ATK:3,HERO_HP:7,HERO_MV:2,HERO_RNG:1,XP_PER_WOUND:1,XP_TIER1:2,XP_TIER2:4,PROMO_T1_HP:1,PROMO_T2_STAT:1,CARAVAN_ROUND_1:4,CARAVAN_ROUND_2:8,CARAVAN_ARTIFACTS:4,CARAVAN_DISCARD:1,ARTIFACT_POOL:8,ARTIFACT_SUPPLY:4,ARTIFACT_CROP:4,ARTIFACT_XP:2,ARTIFACT_TRIBUTE:2,ARTIFACT_DISCOUNT:2,GOLDEN_GOAL_ROUND:16,HARD_STOP_ROUND:20,LASTSTAND_BOONS:3,ENTRENCH_PALISADES:2,ENTRENCH_HOLD:0,FIRST_BLOOD_SUPPLY:0,TIMER_MUSTER:60,TIMER_COMMIT:15,TIMER_MUSTER_CASUAL:90,TIMER_COMMIT_CASUAL:30,TACTICA_POOL:9,TACTICA_RACK:5,TACTICA_HELD:2,TACTICA_HELD_CONTINGENCY:3,DOCTRINE_DISPLAY:8,DOCTRINE_BASE_PRICE:4,DOCTRINE_AGING:1,DOCTRINE_MIN_PRICE:1,T2_POOL:5,T2_UNLOCKABLE:3,GAUL_TRAPS:2,HUN_REPOSITIONS:2,ZOC_ENABLED:1,SIEGE_PUSH_UNITS:1,CHARGE_ADJ_OK:1,EXHAUSTED_CARRY:0,R1_REQUIRE_ENGAGE:0};function yK(J){return{...jK,...J??{}}}var WZ=["spear","sword","cav","archer","siege"],j6={spear:"cav",cav:"archer",archer:"spear"};function vK(J){return{spear:J.COST_SPEARMAN,sword:J.COST_SWORDSMAN,archer:J.COST_ARCHER,cav:J.COST_CAVALRY,siege:J.COST_SIEGE,hero:9}}function fK(J){return{spear:[J.SPEAR_ATK,J.SPEAR_HP,J.SPEAR_MV,1,1],sword:[J.SWORD_ATK,J.SWORD_HP,J.SWORD_MV,1,1],cav:[J.CAV_ATK,J.CAV_HP,J.CAV_MV,1,1],archer:[J.ARCHER_ATK,J.ARCHER_HP,J.ARCHER_MV,2,J.ARCHER_RNG_MAX],siege:[J.SIEGE_ATK,J.SIEGE_HP,J.SIEGE_MV,J.SIEGE_RNG_MIN,J.SIEGE_RNG_MAX],hero:[J.HERO_ATK,J.HERO_HP,J.HERO_MV,1,1]}}var C0=(J)=>`${J[0]},${J[1]}`,KZ=(J,Q)=>C0(J)<=C0(Q)?`${C0(J)}|${C0(Q)}`:`${C0(Q)}|${C0(J)}`;function M9(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++){let Z=J[$],W=Q[$];if(Array.isArray(Z)&&Array.isArray(W)){let K=M9(Z,W);if(K)return K}else if(Z!==W)return Z<W?-1:1}return 0}class fJ extends Error{winner;wtype;constructor(J,Q){super("GameOver");this.winner=J;this.wtype=Q}}class d8 extends Error{constructor(){super("ClashEnd")}}class XZ{uid;owner;arch;base_atk;base_guard=0;hp;max_hp;mv;rmin;rmax;pos=null;exhausted=!1;braced=!1;xp=0;tier1=!1;tier2=!1;wounded_round=null;face_down=!1;constructor(J,Q,$,Z){this.uid=J,this.owner=Q,this.arch=$,this.base_atk=Z[0],this.hp=Z[1],this.max_hp=Z[1],this.mv=Z[2],this.rmin=Z[3],this.rmax=Z[4]}}class q9{C;seed;bots;stats;costs;units=new Map;next_uid=0;board=new Map;stakes;fields=new Map;palisades=new Map;entrench=new Map;res;wagons=[[],[]];wagon_at=new Map;komi=1;round=1;copies={spear:0,sword:0,cav:0,archer:0,siege:0};unlocked=[new Set(["sword","spear"]),new Set(["sword","spear"])];extra_deploy=[0,0];recruit_discount=[0,0];standard_bearer=[null,null];wards=[];last_stand_used=[!1,!1];last_wagon_kill_src=null;cap_dmg=[0,0];wagon_dmg_round=[0,0];rows_lost_round=[0,0];rows_taken_round=[0,0];unit_dmg_round=[0,0];terrain_on=!1;ttype=new Map;rivers=new Set;artifact_order=[];lead_trace=[];r1_winner=null;r1_rows_winner=null;constructor(J,Q,$){this.C=yK($),this.seed=Q,this.bots=J,this.stats=fK(this.C),this.costs=vK(this.C),this.stakes=Array(8).fill(this.C.STAKE_START),this.res=[{supply:this.C.START_SUPPLY,crop:this.C.START_CROP,tribute:0},{supply:this.C.START_SUPPLY,crop:this.C.START_CROP,tribute:0}],this.artifact_order=[...Array(this.C.ARTIFACT_POOL).keys()].map((Z)=>Z+1),new S6(Q).shuffle(this.artifact_order)}heartlandRows(J){return J===0?[0,1]:[6,7]}backRow(J){return J===0?0:7}occupied(J){return this.board.has(C0(J))||this.wagon_at.has(C0(J))}inBounds(J){return J[0]>=0&&J[0]<8&&J[1]>=0&&J[1]<8}newUnit(J,Q){let $=new XZ(this.next_uid,J,Q,this.stats[Q]);return this.next_uid++,this.units.set($.uid,$),$}place(J,Q){this.board.set(C0(Q),J.uid),J.pos=Q}freeHeartlandTile(J){for(let Q=0;Q<8;Q++)for(let $ of this.heartlandRows(J))if(!this.occupied([Q,$]))return[Q,$];return null}setup(){let J=this.C;for(let Q=0;Q<2;Q++){let $=this.bots[Q].setup(this,Q),Z=this.heartlandRows(Q),W=this.backRow(Q),K=[];for(let U of $.wagons)if(U>=0&&U<8&&!K.includes(U))K.push(U);for(let U=0;U<8&&K.length<J.WAGON_COUNT;U++)if(!K.includes(U))K.push(U);K.length=Math.min(K.length,J.WAGON_COUNT),K.forEach((U,H)=>{this.wagons[Q].push({col:U,row:W,hp:J.WAGON_HP}),this.wagon_at.set(C0([U,W]),[Q,H])});let Y=["hero","spear","sword","sword"],X=$.units.slice();for(let U of Y){let H=null;for(let q=0;q<X.length;q++){let G=X[q];if(G.arch===U&&Z.includes(G.pos[1])&&this.inBounds(G.pos)&&!this.occupied(G.pos)){H=G.pos,X.splice(q,1);break}}if(H===null)H=this.freeHeartlandTile(Q);this.place(this.newUnit(Q,U),H)}}}moveUnit(J,Q){this.board.delete(C0(J.pos)),this.board.set(C0(Q),J.uid),J.pos=Q}unbroken(J){return J.pos!==null&&!J.exhausted}loneRunner(J){let Q=this.C.LONE_RUNNER_RADIUS;for(let $ of this.units.values())if($.uid!==J.uid&&$.owner===J.owner&&$.pos!==null&&n0($.pos,J.pos)<=Q)return!1;return!0}carryEligible(J){if(J.pos===null||this.loneRunner(J))return!1;return!J.exhausted||!!this.C.EXHAUSTED_CARRY}exhaustionPenalty(J){let Q=this.C,$=J??this.round;if($<Q.EXHAUSTION_START_ROUND)return 0;let Z=Q.EXHAUSTION_INITIAL;if($>=Q.EXHAUSTION_ACCEL_ROUND)Z+=Q.EXHAUSTION_ACCEL*($-Q.EXHAUSTION_ACCEL_ROUND+1);return Z}columnClaims(J){let Q=this.stakes[J],$=!1,Z=!1,W=!1,K=!1,Y=!1,X=!1;for(let U=0;U<8;U++){let H=this.board.get(C0([J,U]));if(H===void 0)continue;let q=this.units.get(H),G=this.unbroken(q),N=this.carryEligible(q);if(!G&&!N)continue;if(q.owner===0){if(U>=Q){if(G)W=!0;if(N)$=!0}else if(G)Y=!0}else if(U<Q){if(G)X=!0;if(N)Z=!0}else if(G)K=!0}return[$&&!K,Z&&!Y]}computeHarvest(J,Q){let $=this.C,Z=this.exhaustionPenalty(Q),W=0,K=0,Y=[];for(let[H,q]of this.fields.entries()){let G=H.split(",").map(Number);if((q.annexed!==null?q.annexed:q.owner)!==J||this.territoryOf(G)!==J)continue;let E=q.annexed===J?$.ANNEX_YIELD:$.FIELD_YIELD;if(q.type==="crop")K+=Math.max(0,E-Z);else W+=E;if(q.annexed===null&&q.owner===J)Y.push([G,q.type])}let X=new Set,U=new Map(Y.map(([H,q])=>[C0(H),q]));for(let[H,q]of Y){if(X.has(C0(H)))continue;let G=0,N=[H];X.add(C0(H));while(N.length){let E=N.pop();G++;for(let R of GJ(E))if(!X.has(C0(R))&&U.get(C0(R))===q)X.add(C0(R)),N.push(R)}if(G>=$.FARMSTEAD_SIZE)if(q==="crop")K+=Math.max(0,$.FARMSTEAD_BONUS-Z);else W+=$.FARMSTEAD_BONUS}return[W,K]}musterPlayer(J){let Q=this.C,$=this.bots[J],Z=this.res[J],[W,K]=this.computeHarvest(J);Z.supply+=W,Z.crop+=K;let Y=this.onBoard(J),X=[],U=new Set;for(let O of $.feedOrder(this,J)){let L=this.units.get(O);if(U.has(O)||!L||L.owner!==J||L.pos===null)continue;U.add(O),X.push(O)}for(let O of Y)if(!U.has(O.uid))X.push(O.uid);let H=Z.crop;for(let O of X){let L=this.units.get(O),z=Q.UPKEEP_CROP+(this.beyondOwn(L)?Q.SUPPLY_STRAIN_CROP:0);if(H>=z)H-=z,L.exhausted=!1;else L.exhausted=!0}Z.crop=H;for(let O of $.build(this,J).slice(0,Q.BUILD_ACTIONS)){if(!O)continue;if(O[0]==="field"){let L=O[1],z=O[2];if(V9(L)&&this.territoryOf(L)===J&&!this.fields.has(C0(L))&&!this.wagon_at.has(C0(L))&&Z.supply>=Q.FIELD_COST&&(z==="supply"||z==="crop"))Z.supply-=Q.FIELD_COST,this.fields.set(C0(L),{type:z,owner:J,annexed:null})}else if(O[0]==="palisade"){let L=O[1];if(L>=0&&L<8&&!this.palisades.has(L)&&Z.supply>=Q.PALISADE_COST)Z.supply-=Q.PALISADE_COST,this.palisades.set(L,J)}}let q=$.reinforce(this,J),G=Math.min(Math.trunc(q.tribute_spend??0),Z.tribute);if(G>0)Z.tribute-=G,Z.supply+=G*Q.TRIBUTE_SUPPLY_VALUE;for(let O of this.reserve(J))if(O.wounded_round!==null&&O.wounded_round<=this.round-Q.WOUND_RETURN_DELAY){let L=this.freeHeartlandTile(J);if(L===null)break;O.hp=O.max_hp,O.wounded_round=null,this.place(O,L)}for(let O of q.rush??[]){let L=this.units.get(O);if(L&&L.owner===J&&L.pos===null&&L.wounded_round===this.round-1&&Z.crop>=Q.RUSH_RETURN_COST){let z=this.freeHeartlandTile(J);if(z===null)break;Z.crop-=Q.RUSH_RETURN_COST,L.hp=L.max_hp,L.wounded_round=null,this.place(L,z)}}for(let O of q.unlocks??[]){if(!WZ.includes(O)||this.unlocked[J].has(O))continue;let L=this.unlocked[J].size,z={2:Q.UNLOCK_3RD,3:Q.UNLOCK_4TH,4:Q.UNLOCK_5TH}[L];if(z!==void 0&&Z.supply>=z)Z.supply-=z,this.unlocked[J].add(O)}let N=Q.DEPLOY_MAX+this.extra_deploy[J];this.extra_deploy[J]=0;let E=0,R=new Set,B=this.heartlandRows(J);for(let[O,L]of q.recruits??[]){if(E>=N||!WZ.includes(O))continue;if(!this.unlocked[J].has(O)||this.copies[O]>=Q.MUSTER_COPIES)continue;if(!V9(L)||!B.includes(L[1])||this.occupied(L))continue;let z=this.costs[O]+Q.COPY_SURCHARGE*this.copies[O];if(this.recruit_discount[J])z=Math.max(1,z-this.recruit_discount[J]);if(Z.supply<z)continue;if(Z.supply-=z,this.recruit_discount[J])this.recruit_discount[J]=0;this.copies[O]++;let w=this.newUnit(J,O);w.face_down=!0,this.place(w,L),R.add(w.uid),E++}let D=0;for(let[O,L]of q.repositions??[]){if(D>=Q.REPOSITION_MAX)break;let z=this.units.get(O);if(!z||z.owner!==J||z.pos===null||R.has(O)||!V9(L)||this.occupied(L)||this.territoryOf(L)!==J)continue;this.moveUnit(z,L),z.braced=!1,D++}let F;for(let O of this.units.values())if(O.owner===J&&O.arch==="hero"){F=O;break}if(!F||F.pos===null){let O=$.standardBearer(this,J),L=O!==null?this.units.get(O):void 0;if(!L||L.owner!==J||L.pos===null)L=this.onBoard(J).sort((w,P)=>this.costs[P.arch]-this.costs[w.arch]||w.pos[0]-P.pos[0]||w.pos[1]-P.pos[1])[0];this.standard_bearer[J]=L?L.uid:null}else this.standard_bearer[J]=null}counter(J,Q){return j6[J]===Q?this.C.MOD_COUNTER:0}flanked(J){let Q=0;for(let $ of GJ(J.pos)){let Z=this.board.get(C0($));if(Z!==void 0&&this.units.get(Z).owner!==J.owner)Q++}return Q>=this.C.FLANK_THRESHOLD}hasAdjacentFriend(J){for(let Q of GJ(J.pos)){let $=this.board.get(C0(Q));if($!==void 0&&this.units.get($).owner===J.owner)return!0}return!1}effGuard(J,Q=!1){let $=this.C,Z=0;if(!this.beyondOwn(J)&&this.hasAdjacentFriend(J))Z+=$.MOD_SUPPORT;if(J.braced)Z+=$.MOD_BRACE_GUARD;if(this.terrain_on){let K=this.ttype.get(C0(J.pos));if(K==="hills")Z+=$.MOD_HILL;if(K==="woods"&&Q)Z+=1}let W=J.base_guard+Math.min($.GUARD_CAP,Z);if(J.exhausted)W-=$.EXHAUST_GUARD_PENALTY;return Math.max(0,W)}effAtk(J,Q,$=!1,Z=!1){let W=this.C,K=this.counter(J.arch,Q.arch);if($)K+=W.MOD_CHARGE;if(this.flanked(Q))K+=W.MOD_FLANK;let Y=J.base_atk+Math.min(W.ATK_BONUS_CAP,K);if(J.exhausted)Y-=W.EXHAUST_ATK_PENALTY;if(Z&&this.terrain_on&&this.rivers.has(KZ(J.pos,Q.pos)))Y-=W.MOD_RIVER;return Math.max(0,Y)}attackDamage(J,Q,$=!1,Z=!1){let W=this.effAtk(J,Q,$,Z)-this.effGuard(Q,!Z&&!$),K=this.flanked(Q)?this.C.FLANK_MIN_DMG:0;return Math.max(K,W)}applyDamage(J,Q){let $=(W)=>{let[K,Y]=W,X=this.units.get(Y),U=K!==null?this.units.get(K).pos??[-1,-1]:[-1,-1];return[X.pos??[-1,-1],U]},Z=J.map((W,K)=>({inst:W,i:K})).sort((W,K)=>M9($(W.inst),$(K.inst))||W.i-K.i);for(let{inst:W}of Z)this.damageUnit(this.units.get(W[1]),W[2],W[0],Q)}damageUnit(J,Q,$,Z){if(Q<=0||J.pos===null)return;let W=this.wards.find((Y)=>Y.uid===J.uid&&Y.active);if(W&&J.hp-Q<=0){W.active=!1;let Y=this.wardBearer(J);if(Y)J=Y}J.hp-=Q;let K=`${$===null?"n":$}_${J.uid}`;if(Z.set(K,(Z.get(K)??0)+Q),$!==null){let Y=this.units.get($);if(Y.owner!==J.owner)this.unit_dmg_round[Y.owner]+=Q}}wardBearer(J){let Q=[];for(let $ of GJ(J.pos)){let Z=this.board.get(C0($));if(Z===void 0)continue;let W=this.units.get(Z);if(W.owner===J.owner&&(W.arch==="spear"||W.arch==="sword"))Q.push(W)}if(!Q.length)return null;return Q.sort(($,Z)=>Z.hp-$.hp||M9($.pos,Z.pos)),Q[0]}removeDead(J){let Q=[];for(let $ of[...this.onBoard()])if($.hp<=0)this.board.delete(C0($.pos)),$.pos=null,$.braced=!1,$.exhausted=!1,$.wounded_round=this.round,Q.push($);for(let $ of Q)for(let[Z,W]of J.entries()){let[K,Y]=Z.split("_");if(Number(Y)===$.uid&&W>=1&&K!=="n"){let X=this.units.get(Number(K));if(X.owner!==$.owner)this.gainXp(X,this.C.XP_PER_WOUND)}}}gainXp(J,Q){let $=this.C;if(J.xp+=Q,!J.tier1&&J.xp>=$.XP_TIER1)this.grantTier(J);if(!J.tier2&&J.xp>=$.XP_TIER2)this.grantTier(J)}grantTier(J){let Q=this.C;if(!J.tier1)J.tier1=!0,J.max_hp+=Q.PROMO_T1_HP,J.hp=Math.min(J.hp+1,J.max_hp);else if(!J.tier2)if(J.tier2=!0,this.bots[J.owner].promoT2(this,J.owner,J)==="guard")J.base_guard+=Q.PROMO_T2_STAT;else J.base_atk+=Q.PROMO_T2_STAT}applyPushes(J,Q){let $=this.C,Z=(K)=>{return this.units.get(K.uid).pos??K.tgt_tile??[9,9]},W=J.map((K,Y)=>({p:K,i:Y})).sort((K,Y)=>M9(Z(K.p),Z(Y.p))||K.i-Y.i);for(let{p:K}of W){let Y=this.units.get(K.uid);if(Y.pos===null){if(K.kind==="charge"&&K.charger!=null){let E=this.units.get(K.charger);if(E.pos!==null&&K.tgt_tile&&!this.occupied(K.tgt_tile))this.moveUnit(E,K.tgt_tile)}continue}let[X,U]=K.dir,H=[Y.pos[0]+X,Y.pos[1]+U],q=K.pusher??null;if(!V9(H)||this.occupied(H)){this.damageUnit(Y,$.DISPLACE_DMG,q,Q);let E=this.board.get(C0(H));if(E!==void 0)this.damageUnit(this.units.get(E),$.DISPLACE_DMG,q,Q);continue}let G=Y.pos,N=this.terrain_on&&this.rivers.has(KZ(G,H));if(this.moveUnit(Y,H),Y.braced=!1,N)this.damageUnit(Y,$.RIVER_PUSH_DMG,q,Q);if(K.kind==="charge"&&K.charger!=null){let E=this.units.get(K.charger);if(E.pos!==null&&!this.occupied(G))this.moveUnit(E,G)}}}capRemaining(J){let Q=this.C;return(this.round>=Q.BREACH_CAP_RISE_ROUND?Q.BREACH_CAP_LATE:Q.BREACH_CAP)-this.cap_dmg[J]}damageWagon(J,Q,$,Z=!0){let W=this.wagons[Q][$];if(W.hp<=0)return!1;if(Z){if(this.capRemaining(J)<=0)return!1;this.cap_dmg[J]++}if(this.wagon_dmg_round[J]++,W.hp--,W.hp<=0){if(this.wagon_at.delete(C0([W.col,this.backRow(Q)])),this.res[J].supply+=this.C.WAGON_BOUNTY,this.last_wagon_kill_src="normal",!this.last_stand_used[Q]&&this.wagonsAlive(Q)>0)this.last_stand_used[Q]=!0,this.resolveLastStand(Q)}return!0}wagonWinCheck(J){let Q=this.wagonsAlive(0),$=this.wagonsAlive(1);if(Q===0&&$===0)throw new fJ(this.komi,J);if($===0)throw new fJ(0,J);if(Q===0)throw new fJ(1,J)}resolveLastStand(J){let Q=this.bots[J].lastStand(this,J);if(Q===1){for(let $ of this.reserve(J)){let Z=this.freeHeartlandTile(J);if(Z===null)break;$.hp=$.max_hp,$.exhausted=!1,$.braced=!1,$.face_down=!1,$.wounded_round=null,this.place($,Z)}this.extra_deploy[J]++}else if(Q===2){let $=this.onBoard(J).filter((Z)=>!Z.tier2).sort((Z,W)=>W.xp-Z.xp||this.costs[W.arch]-this.costs[Z.arch]||M9(Z.pos,W.pos));if($.length)this.grantTier($[0])}else{let $=this.bots[J].entrenchCols(this,J),Z=0;for(let W of $){if(Z>=this.C.ENTRENCH_PALISADES)break;if(W>=0&&W<8&&!this.palisades.has(W))this.palisades.set(W,J),Z++}}}standardUnit(J){let Q;for(let Z of this.units.values())if(Z.owner===J&&Z.arch==="hero"){Q=Z;break}if(Q&&Q.pos!==null)return Q;let $=this.standard_bearer[J];if($!==null){let Z=this.units.get($);if(Z&&Z.pos!==null)return Z}return null}validateOrder(J,Q){let $=this.C,Z=["HOLD"];if(!Q||J.pos===null)return Z;let W=Q[0];if(W==="HOLD")return Z;if(W==="BRACE")return J.arch==="spear"?Q:Z;let K=J.braced?0:J.mv,Y=(X,U)=>{let H=U;if(this.terrain_on&&U>0&&X.length===U+1&&X.every((G)=>this.ttype.get(C0(G))==="road"))H=U+1;if(X.length>H)return!1;let q=J.pos;for(let G of X){if(!V9(G)||n0(q,G)!==1)return!1;q=G}return!0};if(W==="SHOOT"){if(J.arch!=="archer"&&J.arch!=="siege")return Z;let X=Q[1];if(X[0]==="U"){let U=this.units.get(X[1]);if(!U||U.pos===null||U.owner===J.owner)return Z;if(!(J.rmin<=n0(J.pos,U.pos)&&n0(J.pos,U.pos)<=J.rmax))return Z}else if(X[0]==="W"){if(J.arch!=="siege")return Z}else if(X[0]==="P"){if(J.arch!=="siege")return Z}else return Z;return Q}if(W==="MOVE"){let X=Q[1];return X&&X.length&&Y(X,K)?Q:Z}if(W==="MELEE"){if(J.arch==="siege")return Z;let X=Q[1],U=Q[2],H=this.units.get(X);if(!H||H.owner===J.owner)return Z;if(U&&U.length&&!Y(U,K))return Z;return["MELEE",X,U&&U.length?[...U]:[]]}if(W==="CHARGE"){if(J.arch!=="cav"||J.braced)return Z;let X=Q[1],U=Q[2],H=this.units.get(X);if(!H||H.owner===J.owner)return Z;if(!this.C.CHARGE_ADJ_OK&&H.pos!==null&&n0(J.pos,H.pos)===1)return["MELEE",X,[]];if(!U||!U.length||!Y(U,K))return Z;return["CHARGE",X,[...U]]}return Z}runPulse(J){let Q=this.bots[0].orders(this,0,J),$=this.bots[1].orders(this,1,J),Z=new Map;for(let G of this.onBoard())Z.set(G.uid,this.validateOrder(G,(G.owner===0?Q:$)[G.uid]));for(let G of this.onBoard()){let N=Z.get(G.uid)[0];if(N==="BRACE")G.braced=!0;else if(G.braced&&N!=="MELEE")G.braced=!1}this.endSubphase(new Map,[]);let W=new Map,K=[],Y=[],X=[];for(let G of this.onBoard()){let N=Z.get(G.uid);if(!N||N[0]!=="SHOOT")continue;let E=N[1];if(E[0]==="U"){let R=this.units.get(E[1]);if(!R||R.pos===null||!(G.rmin<=n0(G.pos,R.pos)&&n0(G.pos,R.pos)<=G.rmax))continue;let B;if(this.terrain_on&&this.ttype.get(C0(R.pos))==="woods")B=Math.max(this.flanked(R)?this.C.FLANK_MIN_DMG:0,this.effAtk(G,R)-this.effGuard(R,!0));else B=this.attackDamage(G,R);if(K.push([G.uid,R.uid,B]),G.arch==="siege"&&this.C.SIEGE_PUSH_UNITS){let D=R.pos[0]-G.pos[0],F=R.pos[1]-G.pos[1],O=Math.abs(D)>Math.abs(F)?[D>0?1:-1,0]:[0,F>0?1:-1];Y.push({uid:R.uid,dir:O,pusher:G.uid,kind:"siege",tgt_tile:R.pos})}}else if(E[0]==="W"){let R=E[1],B=E[2];if(R===G.owner||B>=this.wagons[R].length)continue;let D=this.wagons[R][B],F=[D.col,this.backRow(R)];if(D.hp>0&&G.rmin<=n0(G.pos,F)&&n0(G.pos,F)<=G.rmax)X.push([G.owner,R,B])}else if(E[0]==="P"){let R=E[1];if(this.palisades.has(R)){let B=this.stakes[R];for(let D of[[R,B-1],[R,B]])if(G.rmin<=n0(G.pos,D)&&n0(G.pos,D)<=G.rmax){this.palisades.delete(R);break}}}}for(let[G,N,E]of X)this.damageWagon(G,N,E,!0);if(X.length)this.wagonWinCheck("wagons");this.applyDamage(K,W),this.endSubphase(W,Y),W=new Map;let U=new Map;for(let G of this.onBoard()){let N=Z.get(G.uid);if(N&&(N[0]==="MOVE"||N[0]==="MELEE"||N[0]==="CHARGE")){let E=N[0]==="MOVE"?N[1]:N[2];if(E&&E.length)U.set(G.uid,{path:E,stopped:!1,moved:0})}}let H=0;for(let G of U.values())H=Math.max(H,G.path.length);for(let G=0;G<H;G++){let N=new Map;for(let B of[...U.keys()].sort((D,F)=>D-F)){let D=U.get(B),F=this.units.get(B);if(D.stopped||G>=D.path.length||F.pos===null)continue;let O=D.path[G];if(n0(F.pos,O)!==1){D.stopped=!0;continue}if(this.occupied(O)){D.stopped=!0;continue}let L=C0(O);if(!N.has(L))N.set(L,[]);N.get(L).push(B)}let E=[],R=[...N.keys()].sort((B,D)=>M9(B.split(",").map(Number),D.split(",").map(Number)));for(let B of R){let D=N.get(B);if(D.length>=2)for(let F of D)U.get(F).stopped=!0;else E.push([D[0],B.split(",").map(Number)])}for(let[B,D]of E)this.moveUnit(this.units.get(B),D),U.get(B).moved++;if(!this.C.ZOC_ENABLED)E=[];for(let[B]of E){let D=this.units.get(B);for(let F of GJ(D.pos)){let O=this.board.get(C0(F));if(O!==void 0&&this.units.get(O).owner!==D.owner){U.get(B).stopped=!0;break}}}}K=[],Y=[];for(let G of[...U.keys()].sort((N,E)=>N-E)){let N=Z.get(G);if(!N||N[0]!=="CHARGE")continue;let E=this.units.get(G);if(E.pos===null)continue;let R=this.units.get(N[1]);if(!R||R.pos===null||U.get(G).moved<this.C.CHARGE_MOVE_MIN||n0(E.pos,R.pos)!==1)continue;if(this.terrain_on&&this.ttype.get(C0(R.pos))==="woods")continue;if(R.arch==="spear"&&R.braced){let B=Math.max(0,R.base_atk+this.counter(R.arch,E.arch)-this.effGuard(E));K.push([R.uid,E.uid,B]);let D=[E.pos[0]-R.pos[0],E.pos[1]-R.pos[1]];Y.push({uid:E.uid,dir:D,pusher:R.uid,kind:"brace",tgt_tile:E.pos})}else{let B=this.attackDamage(E,R,!0,!0);K.push([E.uid,R.uid,B]);let D=[R.pos[0]-E.pos[0],R.pos[1]-E.pos[1]];Y.push({uid:R.uid,dir:D,pusher:E.uid,kind:"charge",charger:E.uid,tgt_tile:R.pos})}}this.applyDamage(K,W),this.endSubphase(W,Y),W=new Map,K=[],Y=[];let q=[];for(let G of this.onBoard()){let N=Z.get(G.uid);if(!N||N[0]!=="MELEE")continue;let E=this.units.get(N[1]);if(!E||E.pos===null||G.pos===null||n0(G.pos,E.pos)!==1)continue;q.push([G,E])}for(let[G,N]of q){K.push([G.uid,N.uid,this.attackDamage(G,N,!1,!0)]);let E=N.arch==="archer"||N.arch==="siege"?this.C.RANGED_RETALIATION:Math.max(0,N.base_atk+this.counter(N.arch,G.arch)-this.effGuard(G));K.push([N.uid,G.uid,E])}this.applyDamage(K,W);for(let[G,N]of q)if(N.arch==="spear"&&N.braced&&N.pos!==null&&G.pos!==null&&G.hp>0&&n0(G.pos,N.pos)===1){let E=[G.pos[0]-N.pos[0],G.pos[1]-N.pos[1]];Y.push({uid:G.uid,dir:E,pusher:N.uid,kind:"brace",tgt_tile:G.pos})}this.endSubphase(W,Y)}endSubphase(J,Q){if(this.removeDead(J),Q.length)this.applyPushes(Q,J),this.removeDead(J);this.routTest()}routTest(){let J=[];for(let Q=0;Q<2;Q++){let $=this.standardUnit(Q);if($===null)continue;let Z=!1,W=!0;for(let K of GJ($.pos)){let Y=this.board.get(C0(K));if(Y!==void 0)if(this.units.get(Y).owner!==Q)Z=!0;else{W=!1;break}else if(this.wagon_at.has(C0(K)));else{W=!1;break}}if(W&&Z)J.push(Q)}if(!J.length)return;for(let Q of J){let $=1-Q,Z=this.C.ROUT_WAGON_DMG,W=this.bots[$].routAllocate,K=W?[...W.call(this.bots[$],this,$,Q,Z)]:[];for(let Y=0;Y<Z;Y++){let X=this.wagons[Q].map((H,q)=>[q,H]).filter(([,H])=>H.hp>0);if(!X.length)break;let U=null;while(K.length){let H=K.shift();if(X.some(([q])=>q===H)){U=H;break}}if(U===null)X.sort((H,q)=>H[1].hp-q[1].hp||H[0]-q[0]),U=X[0][0];this.damageWagon($,Q,U,!1)}}throw this.wagonWinCheck("rout"),new d8}interventionWindow(J){let Q=this.C;for(let $ of[this.komi,1-this.komi]){let Z=this.bots[$].intervention(this,$,J);if(!Z)continue;let W=this.res[$];if(Z[0]==="SURGE"&&W.tribute>=Q.SURGE_COST){let K=this.units.get(Z[1]),Y=Z[2];if(K&&K.owner===$&&K.pos!==null&&V9(Y)&&n0(K.pos,Y)===1&&!this.occupied(Y))W.tribute-=Q.SURGE_COST,this.moveUnit(K,Y)}else if(Z[0]==="SHIELDBEARER"&&W.tribute>=Q.SHIELDBEARER_COST){let K=this.units.get(Z[1]);if(K&&K.owner===$&&K.pos!==null)W.tribute-=Q.SHIELDBEARER_COST,this.wards.push({uid:K.uid,owner:$,active:!0})}}}clash(){this.wards=[];try{this.interventionWindow(1),this.runPulse(1),this.interventionWindow(2),this.runPulse(2),this.interventionWindow(3)}catch(J){if(!(J instanceof d8))throw J}this.wards=[]}frontier(){let J=this.C,Q=[];for(let $=0;$<8;$++){let Z=this.stakes[$],[W,K]=this.columnClaims($);if(W===K)continue;let Y=W?0:1,X=Y===0?Z+1:Z-1;if(!(J.STAKE_MIN<=X&&X<=J.STAKE_MAX))continue;let U=1-Y;if(this.palisades.get($)===U){this.palisades.delete($);continue}let H=Y===0?[$,Z]:[$,Z-1];if(J.ENTRENCH_HOLD&&(this.entrench.get(C0(H))??0)>=J.ENTRENCH_HOLD){this.entrench.set(C0(H),0);continue}this.stakes[$]=X,this.rows_lost_round[U]++,this.rows_taken_round[Y]++,Q.push([Y,Y===0?[$,Z]:[$,Z-1]])}for(let[$,Z]of Q){let W=this.fields.get(C0(Z));if(!W)continue;if(W.owner===$){if(W.annexed!==null)W.annexed=null;continue}if((W.annexed!==null?W.annexed:W.owner)===$)continue;if(this.bots[$].trampleChoice(this,$,Z,W)==="annex")W.annexed=$;else this.res[$][W.type]+=J.RAID_GAIN,this.fields.delete(C0(Z))}for(let $ of[this.komi,1-this.komi]){let Z=1-$,W=this.heartlandRows(Z),K=this.onBoard($).filter((X)=>W.includes(X.pos[1])),Y=!1;for(let X of K){if(this.capRemaining($)<=0)break;let U=this.wagons[Z].map((G,N)=>[N,G]).filter(([,G])=>G.hp>0);if(!U.length)break;let H=U.filter(([,G])=>G.col===X.pos[0]),q;if(H.length)q=H[0][0];else{let G=Math.min(...U.map(([,E])=>Math.abs(E.col-X.pos[0]))),N=U.filter(([,E])=>Math.abs(E.col-X.pos[0])===G).sort((E,R)=>E[1].col-R[1].col);if(q=N[0][0],N.length>1){let E=this.bots[$].breachTarget(this,$,X,N);if(N.some(([R])=>R===E))q=E}}Y=this.damageWagon($,Z,q,!0)||Y}if(Y)this.wagonWinCheck("wagons")}}leadHolder(){let J=($)=>[this.wagonsAlive($),this.wagonHp($),this.ownedRows($)],Q=M9(J(0),J(1));return Q>0?0:Q<0?1:null}updateEntrench(){let J=this.C;if(!J.ENTRENCH_HOLD)return;let Q=J.STAKE_START,$=new Map;for(let Z=0;Z<8;Z++){let W=this.stakes[Z],K;if(W>Q)K=[...Array(W-Q).keys()].map((Y)=>Y+Q);else if(W<Q)K=[...Array(Q-W).keys()].map((Y)=>Y+W);else continue;for(let Y of K)$.set(C0([Z,Y]),Math.min((this.entrench.get(C0([Z,Y]))??0)+1,J.ENTRENCH_HOLD))}this.entrench=$}caravan(J){let Q=this.C,$=Q.CARAVAN_ARTIFACTS,Z=J===1?0:$,W=this.artifact_order.slice(Z,Z+$),K=(X)=>[this.wagonsAlive(X),this.ownedRows(X),X===this.komi?0:1],Y=M9(K(0),K(1))<=0?0:1;for(let X of[Y,1-Y,Y]){if(!W.length)break;let U=this.bots[X].artifactPick(this,X,W.slice());if(!W.includes(U))U=W[0];W=W.filter((H)=>H!==U),this.applyArtifact(X,U)}}applyArtifact(J,Q){let $=this.C,Z=this.res[J];if(Q===1)Z.supply+=$.ARTIFACT_SUPPLY;else if(Q===2)Z.crop+=$.ARTIFACT_CROP;else if(Q===3){let W;for(let K of this.units.values())if(K.owner===J&&K.arch==="hero"){W=K;break}if(W)W.base_guard+=1}else if(Q===4){let W=this.onBoard(J).sort((K,Y)=>Y.xp-K.xp||this.costs[Y.arch]-this.costs[K.arch]||M9(K.pos,Y.pos));if(W.length)this.gainXp(W[0],$.ARTIFACT_XP)}else if(Q===5){for(let W of this.bots[J].entrenchCols(this,J))if(W>=0&&W<8&&!this.palisades.has(W)){this.palisades.set(W,J);break}}else if(Q===6)Z.tribute+=$.ARTIFACT_TRIBUTE;else if(Q===7)this.recruit_discount[J]=$.ARTIFACT_DISCOUNT;else if(Q===8){let[,W]=this.computeHarvest(J),K=W<this.onBoard(J).length?"crop":"supply";for(let Y=0;Y<8;Y++)for(let X of this.heartlandRows(J)){let U=[Y,X];if(!this.fields.has(C0(U))&&!this.wagon_at.has(C0(U))){this.fields.set(C0(U),{type:K,owner:J,annexed:null});return}}}}playRound(){let J=this.C;this.cap_dmg=[0,0],this.wagon_dmg_round=[0,0],this.rows_lost_round=[0,0],this.rows_taken_round=[0,0],this.unit_dmg_round=[0,0],this.musterPlayer(this.komi),this.musterPlayer(1-this.komi);for(let Z of this.units.values())Z.face_down=!1;this.clash(),this.frontier();let[Q,$]=this.rows_lost_round;if(Q!==$)this.komi=Q>$?0:1;if(this.round>=J.GOLDEN_GOAL_ROUND){let Z=this.rows_taken_round[0]>0||this.wagon_dmg_round[0]>0,W=this.rows_taken_round[1]>0||this.wagon_dmg_round[1]>0;if(Z||W){let K;if(Z&&W)if(this.rows_taken_round[0]!==this.rows_taken_round[1])K=this.rows_taken_round[0]>this.rows_taken_round[1]?0:1;else if(this.wagon_dmg_round[0]!==this.wagon_dmg_round[1])K=this.wagon_dmg_round[0]>this.wagon_dmg_round[1]?0:1;else K=this.komi;else K=Z?0:1;throw new fJ(K,"golden-goal")}}for(let Z=0;Z<2;Z++)this.res[Z].tribute+=J.TRIBUTE_PER_ROW*this.rows_lost_round[Z];if(this.round===J.CARAVAN_ROUND_1)this.caravan(1);else if(this.round===J.CARAVAN_ROUND_2)this.caravan(2);if(this.round===1){let[Z,W]=this.rows_taken_round;if(Z!==W)this.r1_winner=Z>W?0:1,this.r1_rows_winner=this.r1_winner;else if(this.unit_dmg_round[0]!==this.unit_dmg_round[1]&&(!J.R1_REQUIRE_ENGAGE||Math.min(...this.unit_dmg_round)>=1))this.r1_winner=this.unit_dmg_round[0]>this.unit_dmg_round[1]?0:1;if(J.FIRST_BLOOD_SUPPLY&&this.r1_winner!==null)this.res[this.r1_winner].supply+=J.FIRST_BLOOD_SUPPLY}if(this.lead_trace.push(this.leadHolder()),this.round>=J.HARD_STOP_ROUND){let Z=this.wagonsAlive(0),W=this.wagonsAlive(1);if(Z!==W)throw new fJ(Z>W?0:1,"ladder");let K=this.ownedRows(0),Y=this.ownedRows(1);if(K!==Y)throw new fJ(K>Y?0:1,"ladder");throw new fJ(this.komi,"ladder")}this.updateEntrench(),this.round++}phaseHashesR1(){let J=[];this.musterPlayer(this.komi),this.musterPlayer(1-this.komi),J.push(["muster",this.stateHash()]);for(let Z of this.units.values())Z.face_down=!1;J.push(["reveal",this.stateHash()]),this.clash(),J.push(["clash",this.stateHash()]),this.frontier();let[Q,$]=this.rows_lost_round;if(Q!==$)this.komi=Q>$?0:1;J.push(["frontier",this.stateHash()]);for(let Z=0;Z<2;Z++)this.res[Z].tribute+=this.C.TRIBUTE_PER_ROW*this.rows_lost_round[Z];return J.push(["pass",this.stateHash()]),J}snapshot(){let J=[...this.units.values()].map((Q)=>({uid:Q.uid,owner:Q.owner,arch:Q.arch,base_atk:Q.base_atk,base_guard:Q.base_guard,hp:Q.hp,max_hp:Q.max_hp,mv:Q.mv,rmin:Q.rmin,rmax:Q.rmax,pos:Q.pos===null?null:[Q.pos[0],Q.pos[1]],exhausted:Q.exhausted,braced:Q.braced,xp:Q.xp,tier1:Q.tier1,tier2:Q.tier2,wounded_round:Q.wounded_round,face_down:Q.face_down})).sort((Q,$)=>Q.uid-$.uid);return{round:this.round,komi:this.komi,stakes:[...this.stakes],res:this.res.map((Q)=>({supply:Q.supply,crop:Q.crop,tribute:Q.tribute})),units:J,wagons:this.wagons.map((Q)=>Q.map(($)=>({col:$.col,row:$.row,hp:$.hp}))),fields:[...this.fields.entries()].map(([Q,$])=>[Q.split(",").map(Number),$]).sort(YZ),palisades:[...this.palisades.entries()].sort((Q,$)=>Q[0]-$[0]),entrench:[...this.entrench.entries()].map(([Q,$])=>[Q.split(",").map(Number),$]).sort(YZ)}}stateHash(){return ZZ(u8(this.snapshot())).slice(0,16)}}function YZ(J,Q){return u8(J)<u8(Q)?-1:1}function u8(J){if(J===null)return"null";if(typeof J==="boolean")return J?"true":"false";if(typeof J==="number")return String(J);if(typeof J==="string")return JSON.stringify(J);if(Array.isArray(J))return"["+J.map(u8).join(",")+"]";return"{"+Object.keys(J).sort().map(($)=>JSON.stringify($)+":"+u8(J[$])).join(",")+"}"}function n0(J,Q){return Math.abs(J[0]-Q[0])+Math.abs(J[1]-Q[1])}function V9(J){return J[0]>=0&&J[0]<8&&J[1]>=0&&J[1]<8}function GJ(J){let[Q,$]=J,Z=[];if(Q>0)Z.push([Q-1,$]);if(Q<7)Z.push([Q+1,$]);if($>0)Z.push([Q,$-1]);if($<7)Z.push([Q,$+1]);return Z}q9.prototype.territoryOf=function(J){return J[1]<this.stakes[J[0]]?0:1};q9.prototype.beyondOwn=function(J){return this.territoryOf(J.pos)!==J.owner};q9.prototype.onBoard=function(J){let Q=[...this.board.values()].map(($)=>this.units.get($));if(J!==void 0)Q=Q.filter(($)=>$.owner===J);return Q.sort(($,Z)=>$.pos[0]-Z.pos[0]||$.pos[1]-Z.pos[1])};q9.prototype.reserve=function(J){return[...this.units.values()].filter((Q)=>Q.pos===null&&Q.owner===J).sort((Q,$)=>Q.uid-$.uid)};q9.prototype.wagonsAlive=function(J){return this.wagons[J].filter((Q)=>Q.hp>0).length};q9.prototype.wagonHp=function(J){return this.wagons[J].reduce((Q,$)=>Q+Math.max(0,$.hp),0)};q9.prototype.ownedRows=function(J){return J===0?this.stakes.reduce((Q,$)=>Q+$,0):this.stakes.reduce((Q,$)=>Q+(8-$),0)};function L7(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(K>Z)Z=K,$=J[W]}return $}function B7(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(K<Z)Z=K,$=J[W]}return $}function y6(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(xK(K,Z)<0)Z=K,$=J[W]}return $}function xK(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++)if(J[$]!==Q[$])return J[$]<Q[$]?-1:1;return 0}var UJ=(J)=>`${J[0]},${J[1]}`,hK=(()=>{let J=[];for(let Q=0;Q<256;Q++){let $=Q;for(let Z=0;Z<8;Z++)$=$&1?3988292384^$>>>1:$>>>1;J[Q]=$>>>0}return J})();function bK(J){let Q=new TextEncoder().encode(J),$=4294967295;for(let Z=0;Z<Q.length;Z++)$=hK[($^Q[Z])&255]^$>>>8;return($^4294967295)>>>0}function UZ(J){return Array.isArray(J)?"("+J.map(UZ).join(", ")+")":String(J)}function R8(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++){let Z=J[$],W=Q[$];if(Array.isArray(Z)&&Array.isArray(W)){let K=R8(Z,W);if(K)return K}else if(Z!==W)return Z<W?-1:1}return 0}var gK=["HONEST","AGGRO","TURTLE","PROBER","SANDBAGGER","RUNNER"];function pK(J){let Q={mode:"auto",depth:1,fields_target:9,palisades:!0,unlock_plan:["archer"],unlock_round:3,recruit_priority:["sword","spear","archer","cav","siege"],army_overshoot:0,attack_scope:"any",brace_radius:2,trample:"annex",desperation_round:11,sandbag_until:0,wagon_hunt:!1,avoid_lone:!0,feed_forward_first:!0,rush:!0,rearguard:0,push_margin:1,convert_mult:1.8,breach_round:12,force_push_round:12};if(J==="HONEST")Object.assign(Q,{rearguard:1});else if(J==="AGGRO")Object.assign(Q,{mode:"push",depth:2,fields_target:9,unlock_plan:["cav"],unlock_round:1,recruit_priority:["cav","sword","spear","archer"],army_overshoot:1,trample:"raid",wagon_hunt:!0,palisades:!1,desperation_round:1,brace_radius:1,convert_mult:1.4,breach_round:10,force_push_round:1});else if(J==="TURTLE")Object.assign(Q,{mode:"hold",fields_target:14,unlock_plan:["archer","siege"],unlock_round:2,recruit_priority:["spear","archer","sword","siege"],attack_scope:"own_half",desperation_round:12,feed_forward_first:!1,brace_radius:3,convert_mult:2,force_push_round:14,breach_round:14});else if(J==="PROBER")Object.assign(Q,{mode:"hold",fields_target:11,unlock_plan:["archer"],unlock_round:2,recruit_priority:["spear","archer","sword","cav"],attack_scope:"own_half_superior",desperation_round:11,feed_forward_first:!1,brace_radius:3,convert_mult:1.8,force_push_round:13});else if(J==="SANDBAGGER")Object.assign(Q,{mode:"sandbag",depth:2,fields_target:9,unlock_plan:["cav"],unlock_round:5,recruit_priority:["sword","cav","spear","archer"],trample:"raid",sandbag_until:5,desperation_round:6,wagon_hunt:!0,convert_mult:1.5});else if(J==="RUNNER")Object.assign(Q,{mode:"runner",depth:6,fields_target:6,unlock_plan:["cav"],unlock_round:1,recruit_priority:["cav","sword","spear"],trample:"raid",avoid_lone:!1,desperation_round:99,palisades:!1,convert_mult:99,force_push_round:99});return Q}class z7{name;cfg;seed=0;me=0;_convert=!1;constructor(J){if(!gK.includes(J))throw Error("unknown bot: "+J);this.name=J,this.cfg=pK(J)}reset(J,Q){this.seed=J,this.me=Q,this._convert=!1}clock(J,Q){return this.cfg[Q]+(J.C.GOLDEN_GOAL_ROUND-16)}tb(...J){let Q=`${this.seed}|${this.name}|${this.me}|${J.map(UZ).join("|")}`;return bK(Q)/4294967296}setup(J,Q){let $=Q===0?1:6,Z=[[1,4,6],[0,3,6],[2,4,7],[1,3,5]],W=Z[Math.floor(this.tb("wagons")*Z.length)].slice(),K=3+(this.tb("side")<0.5?0:1),Y=[{arch:"hero",pos:[K,$]},{arch:"spear",pos:[K-1,$]},{arch:"sword",pos:[K+1,$]},{arch:"sword",pos:[K-2,$]}];return{wagons:W,units:Y}}threatenedCols(J,Q){let $=[];for(let Z=0;Z<8;Z++){let[W,K]=J.columnClaims(Z);if(Q===0&&K||Q===1&&W)$.push(Z)}return $}dangerCols(J,Q){let $=[,,,,,,,,].fill(0);for(let Z of J.onBoard(1-Q)){let[W,K]=Z.pos,Y=J.stakes[W],X,U;if(Q===0)X=K<Y,U=Y<=K&&K<=Y+2;else X=K>=Y,U=Y-3<=K&&K<Y;if(X)$[W]+=3;else if(U)$[W]+=1}return $}pickPushCenter(J,Q){let $=null,Z=null,W=J.onBoard(Q);for(let K=0;K<8;K++){let Y=0,X=0;for(let H=Math.max(0,K-1);H<Math.min(8,K+2);H++){let q=H===K?1:0.5;for(let G of J.onBoard(1-Q))if(G.pos[0]===H&&J.territoryOf(G.pos)===1-Q)Y+=q;for(let G of W)if(G.pos[0]===H)X+=0.4*q}let U=-Y+X+0.3*this.tb("pushcol",K);if(Z===null||U>Z)$=K,Z=U}return $}feedOrder(J,Q){let Z=J.onBoard(Q).map((W)=>{let K=GJ(W.pos).some((H)=>{let q=J.board.get(UJ(H));return q!==void 0&&J.units.get(q).owner!==Q}),Y=J.beyondOwn(W),X=this.cfg.feed_forward_first?0:Y?1:0,U=[W.arch==="hero"?0:1,K?0:1,X,-J.costs[W.arch],W.pos];return{uid:W.uid,key:U}});return Z.sort((W,K)=>R8(W.key,K.key)),Z.map((W)=>W.uid)}_projCropIncome(J,Q){return J.computeHarvest(Q,J.round+1)[1]}build(J,Q){let $=this.cfg,Z=J.C,W=[],K=J.res[Q].supply,Y=0;for(let H of J.fields.values())if(H.owner===Q&&H.annexed===null)Y++;let X=0;for(let H of J.units.values())if(H.owner===Q)X++;if($.palisades&&K>=Z.PALISADE_COST+Z.FIELD_COST){let H=this.dangerCols(J,Q),q=[...Array(8).keys()].filter((G)=>!J.palisades.has(G)&&H[G]>=2).sort((G,N)=>R8([-H[G],this.tb("pal",G)],[-H[N],this.tb("pal",N)]));if(q.length)W.push(["palisade",q[0]]),K-=Z.PALISADE_COST}let U=[];while(W.length<Z.BUILD_ACTIONS&&K>=Z.FIELD_COST&&Y<$.fields_target){let G=this._projCropIncome(J,Q)+2*U.filter(([,E])=>E==="crop").length<X+2&&J.round<Z.EXHAUSTION_START_ROUND-2?"crop":"supply",N=this._fieldSpot(J,Q,G,new Set(U.map(([E])=>UJ(E))));if(N===null)break;W.push(["field",N,G]),U.push([N,G]),K-=Z.FIELD_COST,Y++}if($.palisades&&W.length<Z.BUILD_ACTIONS&&K>=Z.PALISADE_COST+4){let H=this.dangerCols(J,Q),q=[...Array(8).keys()].filter((G)=>!J.palisades.has(G)&&H[G]>=1).sort((G,N)=>R8([-H[G],this.tb("pal2",G)],[-H[N],this.tb("pal2",N)]));if(q.length)W.push(["palisade",q[0]])}return W}_fieldSpot(J,Q,$,Z){let W=null,K=null;for(let Y=0;Y<8;Y++)for(let X=0;X<8;X++){let U=[Y,X];if(J.territoryOf(U)!==Q||J.fields.has(UJ(U))||J.wagon_at.has(UJ(U))||Z.has(UJ(U)))continue;let H=0;for(let N of GJ(U)){let E=J.fields.get(UJ(N));if(E&&E.type===$&&E.owner===Q&&E.annexed===null)H++}let q=J.heartlandRows(Q).includes(X)?2:0,G=2*H+q+this.tb("field",U);if(K===null||G>K)W=U,K=G}return W}reinforce(J,Q){let $=this.cfg,Z=J.C,W=J.res[Q],K={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0},Y=W.supply,X=W.tribute,U=0;if($.mode==="sandbag"&&J.round>$.sandbag_until)U=Math.max(0,X-2);else if(J.round>=this.clock(J,"desperation_round")&&X>2)U=X-2;if(K.tribute_spend=U,Y+=U,$.rush){let F=W.crop;for(let O of J.reserve(Q))if(O.wounded_round===J.round-1&&F>J.onBoard(Q).length)K.rush.push(O.uid),F--}let H=J.unlocked[Q],q=$.unlock_plan.filter((F)=>!H.has(F));if(q.length&&J.round>=$.unlock_round){let F=H.size,O={2:Z.UNLOCK_3RD,3:Z.UNLOCK_4TH,4:Z.UNLOCK_5TH}[F]??999;if(Y>=O+3)K.unlocks.push(q[0]),Y-=O}let G=this._projCropIncome(J,Q),N=0;for(let F of J.units.values())if(F.owner===Q)N++;let E=Z.DEPLOY_MAX+J.extra_deploy[Q],R=new Set;for(let F=0;F<E;F++){let O=Math.max(4,G+Math.floor(W.crop/6)+$.army_overshoot);if(N+1>O)break;let L=null;for(let w of $.recruit_priority){if(!H.has(w)&&!K.unlocks.includes(w))continue;if(J.copies[w]>=Z.MUSTER_COPIES)continue;let P=J.costs[w]+Z.COPY_SURCHARGE*J.copies[w];if(J.recruit_discount[Q])P=Math.max(1,P-J.recruit_discount[Q]);if(Y>=P){L=w,Y-=P;break}}if(L===null)break;let z=this._deploySpot(J,Q,R);if(z===null)break;R.add(UJ(z)),K.recruits.push([L,z]),N++}let B=this.threatenedCols(J,Q),D=new Set;for(let F of B.slice(0,Z.REPOSITION_MAX)){let O=this._spareBlocker(J,Q,F,D);if(O===null)continue;let L=this._blockTile(J,Q,F);if(L===null)continue;D.add(O.uid),K.repositions.push([O.uid,L])}if(K.repositions.length<Z.REPOSITION_MAX&&($.mode==="push"||$.mode==="sandbag"||this._convert||J.round>=this.clock(J,"force_push_round"))){let F=this.pickPushCenter(J,Q);for(let O of J.onBoard(Q)){if(K.repositions.length>=Z.REPOSITION_MAX)break;if(D.has(O.uid)||J.beyondOwn(O)||O.arch==="siege")continue;if(GJ(O.pos).some((w)=>{let P=J.board.get(UJ(w));return P!==void 0&&J.units.get(P).owner!==Q})||Math.abs(O.pos[0]-F)<=1)continue;if(!(Q===0?O.pos[1]<=1:O.pos[1]>=6))continue;for(let w of[F,F-1,F+1]){if(w<0||w>=8)continue;let P=this._blockTile(J,Q,w);if(P!==null){D.add(O.uid),K.repositions.push([O.uid,P]);break}}}}return K}_deploySpot(J,Q,$){let Z=J.heartlandRows(Q),W=Q===0?Z[1]:Z[0],K=null;if(this.cfg.mode==="push"||this.cfg.mode==="runner"||this.cfg.mode==="auto")K=this.pickPushCenter(J,Q);let Y=this.threatenedCols(J,Q);if(Y.length)K=Y[0];let X=null,U=null,H=[W,Q===0?Z[0]:Z[1]];for(let q=0;q<8;q++)for(let G of H){let N=[q,G];if(J.occupied(N)||$.has(UJ(N)))continue;let E=-Math.abs(q-(K!==null?K:3))+(G===W?1:0)+this.tb("deploy",N);if(U===null||E>U)X=N,U=E}return X}_spareBlocker(J,Q,$,Z){let W=[];for(let K of J.onBoard(Q)){if(Z.has(K.uid)||K.arch==="hero"||J.beyondOwn(K))continue;if(GJ(K.pos).some((q)=>{let G=J.board.get(UJ(q));return G!==void 0&&J.units.get(G).owner!==Q}))continue;let X=K.pos[0],U=0;for(let q of J.onBoard(Q))if(q.uid!==K.uid&&q.pos[0]===X&&!J.beyondOwn(q))U++;if(J.onBoard(1-Q).some((q)=>q.pos[0]===X)&&U===0)continue;W.push(K)}if(!W.length)return null;return W.sort((K,Y)=>R8([J.costs[K.arch],Math.abs(K.pos[0]-$),this.tb("blk",K.uid)],[J.costs[Y.arch],Math.abs(Y.pos[0]-$),this.tb("blk",Y.uid)])),W[0]}_blockTile(J,Q,$){let Z=J.stakes[$],W=Q===0?[...Array(Z).keys()].reverse():[...Array(8-Z).keys()].map((K)=>K+Z);for(let K of W){let Y=[$,K];if(!J.occupied(Y))return Y}return null}standardBearer(J,Q){return null}dirn(J){return J===0?1:-1}ownFrontRow(J,Q,$){let Z=J.stakes[$];return Q===0?Z-1:Z}firstBeyondRow(J,Q,$){let Z=J.stakes[$];return Q===0?Z:Z-1}stakeAtMax(J,Q,$){let Z=J.stakes[$];return Q===0?Z===J.C.STAKE_MAX:Z===J.C.STAKE_MIN}behind(J,Q){let $=1-Q,Z=J.wagonsAlive(Q),W=J.wagonsAlive($);if(Z!==W)return Z<W;let K=J.wagonHp(Q),Y=J.wagonHp($);if(K!==Y)return K<Y;return J.ownedRows(Q)<J.ownedRows($)}pushCols(J,Q){let $=this.pickPushCenter(J,Q);return[$-1,$,$+1].filter((Z)=>Z>=0&&Z<8)}plan(J,Q){let $=this.cfg,Z=$.mode,W=0,K=0;for(let U of J.onBoard(Q))W+=J.costs[U.arch]+U.hp;for(let U of J.onBoard(1-Q))K+=J.costs[U.arch]+U.hp;let Y=W>=$.convert_mult*Math.max(1,K);if(Z==="sandbag"&&J.round>$.sandbag_until)Z="push";if((Z==="auto"||Z==="hold")&&J.round>=this.clock(J,"desperation_round")&&this.behind(J,Q))Z="push";if((Z==="auto"||Z==="hold")&&J.round>=this.clock(J,"force_push_round"))Z="push";if(Y&&Z!=="runner")Z="push";if(Z==="auto")Z=W>=$.push_margin*K?"push":"hold";this._convert=Y;let X={mode:Z,convert:Y,threats:this.threatenedCols(J,Q)};if(Z==="push"||Z==="runner"){X.push_cols=this.pushCols(J,Q);let U=J.wagons[1-Q].filter((H)=>H.hp>0);if(U.length){let H=X.push_cols[Math.floor(X.push_cols.length/2)];X.wagon_target=y6(U,(q)=>[Math.abs(q.col-H),q.col]).col}}return X}orders(J,Q,$){let Z=this.plan(J,Q),W={},K=this._assignDefenders(J,Q,Z),Y={};for(let X of J.onBoard(Q))W[X.uid]=this._unitOrder(J,Q,X,Z,K,Y);return W}_assignDefenders(J,Q,$){let Z={},W=new Set;for(let K of $.threats){let Y=null,X=null;for(let U of J.onBoard(Q)){if(W.has(U.uid)||J.beyondOwn(U))continue;let H=Math.abs(U.pos[0]-K)+0.1*J.costs[U.arch];if(X===null||H<X)Y=U,X=H}if(Y!==null&&X!==null&&X<=3.5)Z[Y.uid]=K,W.add(Y.uid)}if(this.cfg.rearguard&&$.mode==="push"){let K=0;for(let U of J.onBoard(1-Q))if(J.territoryOf(U.pos)===1-Q)K++;let Y=[...new Set(J.wagons[Q].filter((U)=>U.hp>0).map((U)=>U.col))].sort((U,H)=>U-H),X=Math.min(this.cfg.rearguard,Math.floor(K/2),Y.length);for(let U of Y){if(X<=0)break;if(Object.values(Z).includes(U))continue;let H=null,q=null;for(let G of J.onBoard(Q)){if(W.has(G.uid)||J.beyondOwn(G))continue;let N=Math.abs(G.pos[0]-U)+0.1*J.costs[G.arch];if(q===null||N<q)H=G,q=N}if(H!==null)Z[H.uid]=U,W.add(H.uid),X--}}return Z}_targetScore(J,Q,$,Z,W=!1){let K=J.attackDamage($,Z,W,!W);return(K>=Z.hp?10:0)+2*(j6[$.arch]===Z.arch?1:0)+(6-Z.hp)*0.5+K+(Z.uid===(J.standard_bearer[1-Q]??-1)?3:0)+(Z.arch==="hero"?2:0)+this.tb("tgt",$.uid,Z.uid)}_attackAllowed(J,Q,$){let Z=this.cfg.attack_scope;if(this._convert)Z="any";if(Z==="any")return!0;let W=J.territoryOf($.pos)===Q;if(Z==="own_half")return W;if(Z==="own_half_superior"){if(!W)return!1;let K=0,Y=0;for(let X of J.onBoard(Q))if(n0(X.pos,$.pos)<=2)K++;for(let X of J.onBoard(1-Q))if(n0(X.pos,$.pos)<=2)Y++;return K>=Y+1}return!0}bfs(J,Q,$){if($<=0)return new Map([[UJ(Q.pos),[]]]);let Z=new Set;for(let Y of J.onBoard(1-Q.owner))for(let X of GJ(Y.pos))Z.add(UJ(X));let W=new Map([[UJ(Q.pos),[]]]),K=[[Q.pos,[]]];for(let Y=0;Y<$;Y++){let X=[];for(let[U,H]of K){if(UJ(U)!==UJ(Q.pos)&&Z.has(UJ(U)))continue;for(let q of GJ(U)){if(W.has(UJ(q))||J.occupied(q))continue;let G=[...H,q];W.set(UJ(q),G),X.push([q,G])}}K=X}return W}_unitOrder(J,Q,$,Z,W,K){let Y=this.cfg,X=[];for(let q of GJ($.pos)){let G=J.board.get(UJ(q));if(G!==void 0&&J.units.get(G).owner!==Q)X.push(J.units.get(G))}if($.arch==="siege")return this._siegeOrder(J,Q,$,Z);if($.arch==="archer"){let q=J.onBoard(1-Q).filter((G)=>n0($.pos,G.pos)===2&&this._attackAllowed(J,Q,G));if(q.length)return["SHOOT",["U",L7(q,(G)=>this._targetScore(J,Q,$,G)).uid]];if(X.length){let G=L7(X,(N)=>this._targetScore(J,Q,$,N));if(this._attackAllowed(J,Q,G))return["MELEE",G.uid,[]]}return this._moveOrder(J,Q,$,Z,W,K,2)}if($.arch==="cav"&&!$.exhausted){let q=this._findCharge(J,Q,$);if(q!==null)return q}if(X.length){let q=X.filter((G)=>this._attackAllowed(J,Q,G));if(q.length)return["MELEE",L7(q,(G)=>this._targetScore(J,Q,$,G)).uid,[]]}let U=this.bfs(J,$,$.mv),H=null;for(let q of J.onBoard(1-Q)){if(!this._attackAllowed(J,Q,q))continue;for(let G of GJ(q.pos)){if(UJ(G)===UJ($.pos))continue;let N=U.get(UJ(G));if(N!==void 0){let E=this._targetScore(J,Q,$,q)-0.3*N.length;if(q.arch==="spear"&&q.braced&&$.arch==="cav")E-=6;if(H===null||E>H[0])H=[E,q,N]}}}if(H!==null&&H[0]>1.5)return["MELEE",H[1].uid,H[2]];if($.arch==="spear"&&!$.exhausted){let q=J.onBoard(1-Q).some((N)=>n0($.pos,N.pos)<=Y.brace_radius),G=Z.mode==="hold"||!J.beyondOwn($);if(q&&G&&!($.uid in W))return["BRACE"]}return this._moveOrder(J,Q,$,Z,W,K,0,U)}_findCharge(J,Q,$){let Z=this.bfs(J,$,$.mv),W=null;for(let K of J.onBoard(1-Q)){if(!this._attackAllowed(J,Q,K))continue;if(K.arch==="spear"&&K.braced)continue;if(J.terrain_on&&J.ttype.get(UJ(K.pos))==="woods")continue;for(let Y of GJ(K.pos)){let X=Z.get(UJ(Y));if(X===void 0||X.length<J.C.CHARGE_MOVE_MIN)continue;let U=this._targetScore(J,Q,$,K,!0)-0.2*X.length;if(W===null||U>W[0])W=[U,K,X]}}if(W!==null&&W[0]>2)return["CHARGE",W[1].uid,W[2]];return null}_siegeOrder(J,Q,$,Z){let W=this.cfg;if(Z.mode==="push"){for(let Y of Z.push_cols??[])if(J.palisades.get(Y)===1-Q){let X=J.stakes[Y];if([[Y,X-1],[Y,X]].some((U)=>$.rmin<=n0($.pos,U)&&n0($.pos,U)<=$.rmax))return["SHOOT",["P",Y]]}}if((W.wagon_hunt||Z.convert)&&J.capRemaining(Q)>0)for(let Y=0;Y<J.wagons[1-Q].length;Y++){let X=J.wagons[1-Q][Y];if(X.hp<=0)continue;let U=[X.col,J.backRow(1-Q)];if($.rmin<=n0($.pos,U)&&n0($.pos,U)<=$.rmax)return["SHOOT",["W",1-Q,Y]]}let K=J.onBoard(1-Q).filter((Y)=>$.rmin<=n0($.pos,Y.pos)&&n0($.pos,Y.pos)<=$.rmax&&this._attackAllowed(J,Q,Y));if(K.length)return["SHOOT",["U",L7(K,(Y)=>this._targetScore(J,Q,$,Y)).uid]];return this._moveOrder(J,Q,$,Z,{},{},2)}_moveOrder(J,Q,$,Z,W,K,Y=0,X){let U=this.cfg,H=this._goalTile(J,Q,$,Z,W,K);if(H===null)return["HOLD"];if(X===void 0)X=this.bfs(J,$,$.mv);let q=J.onBoard(1-Q),G=null,N=null;for(let[E,R]of X){let B=E.split(",").map(Number),F=-n0(B,H);if(Y&&q.length){let O=Math.min(...q.map((L)=>n0(B,L.pos)));if(O<Y)F-=(Y-O)*2}if(U.avoid_lone&&J.territoryOf(B)!==Q){if(!J.onBoard(Q).some((L)=>L.uid!==$.uid&&L.owner===Q&&n0(L.pos,B)<=J.C.LONE_RUNNER_RADIUS))F-=4}if(F+=0.1*this.tb("mv",$.uid,B),N===null||F>N)G=[B,R],N=F}if(G===null||!G[1].length)return["HOLD"];return["MOVE",G[1]]}_goalTile(J,Q,$,Z,W,K){let Y=this.cfg;if($.uid in W){let G=W[$.uid];return[G,this.ownFrontRow(J,Q,G)]}let X=Z.mode;if(X==="sandbag"){let G=[...new Set(J.wagons[Q].filter((E)=>E.hp>0).map((E)=>E.col))].sort((E,R)=>E-R);if(!G.length)G=[3];let N=B7(G,(E)=>Math.abs(E-$.pos[0]));return[N,this.ownFrontRow(J,Q,N)]}if(X==="runner"&&$.arch==="cav")return[B7([...Array(8).keys()],(N)=>J.onBoard(1-Q).filter((E)=>E.pos[0]===N).length+0.1*this.tb("run",$.uid,N)),J.backRow(1-Q)];if(X==="push"||X==="runner"){let G=Z.push_cols&&Z.push_cols.length?Z.push_cols:[3,4],N=B7(G,(B)=>Math.abs(B-$.pos[0])+0.7*(K[String(B)]??0));if(K[String(N)]=(K[String(N)]??0)+1,Z.convert||J.round>=this.clock(J,"breach_round")||this.stakeAtMax(J,Q,N)){let B=Z.wagon_target;if(B!==void 0&&B!==null){let D=K.breach??0;K.breach=D+1;let F=[0,1,-1,0,1,-1,2,-2][D%8],O=Math.max(0,Math.min(7,B+F)),L=J.backRow(1-Q)-this.dirn(Q);return[O,L]}return[N,J.backRow(1-Q)]}let E=Y.depth,R=this.firstBeyondRow(J,Q,N)+(E-1)*this.dirn(Q);return R=Math.max(0,Math.min(7,R)),[N,R]}let U=this.dangerCols(J,Q),H=[...Array(8).keys()].filter((G)=>U[G]>0);if(!H.length)H=[$.pos[0]];let q=B7(H,(G)=>Math.abs(G-$.pos[0])+0.7*(K[String(G)]??0));return K[String(q)]=(K[String(q)]??0)+1,[q,this.ownFrontRow(J,Q,q)]}intervention(J,Q,$){let Z=J.C,W=J.res[Q].tribute;if($<=2&&W>=Z.SHIELDBEARER_COST){let K=J.standardUnit(Q);if(K!==null&&K.hp<=4){let Y=0;for(let U of GJ(K.pos)){let H=J.board.get(UJ(U));if(H!==void 0&&J.units.get(H).owner!==Q)Y++}let X=GJ(K.pos).some((U)=>{let H=J.board.get(UJ(U));if(H===void 0)return!1;let q=J.units.get(H);return q.owner===Q&&(q.arch==="spear"||q.arch==="sword")});if(Y>=2&&X&&!J.wards.some((U)=>U.uid===K.uid&&U.active))return["SHIELDBEARER",K.uid]}}if($===3&&W>=Z.SURGE_COST){for(let K of this.threatenedCols(J,Q))for(let Y of J.onBoard(Q)){if(!J.unbroken(Y))continue;for(let X of GJ(Y.pos)){if(J.occupied(X)||!V9(X))continue;if(X[0]===K&&J.territoryOf(X)===Q)return["SURGE",Y.uid,X]}}for(let K=0;K<8;K++){let[Y,X]=J.columnClaims(K);if(Q===0?Y:X)continue;let H=!0;for(let q of J.onBoard(1-Q))if(q.pos[0]===K&&J.territoryOf(q.pos)===1-Q&&J.unbroken(q)){H=!1;break}if(!H)continue;for(let q of J.onBoard(Q)){if(q.exhausted||J.beyondOwn(q))continue;for(let G of GJ(q.pos)){if(J.occupied(G))continue;if(G[0]===K&&J.territoryOf(G)!==Q){if(J.onBoard(Q).some((E)=>E.uid!==q.uid&&E.owner===Q&&n0(E.pos,G)<=J.C.LONE_RUNNER_RADIUS))return["SURGE",q.uid,G]}}}}}return null}trampleChoice(J,Q,$,Z){if(this.cfg.trample==="raid")return"raid";if(this.cfg.trample==="annex"){if(Z.type==="crop"&&J.round>=J.C.EXHAUSTION_START_ROUND-2)return"raid";return"annex"}return"raid"}lastStand(J,Q){if(J.reserve(Q).length>=2)return 1;if(this.cfg.mode==="hold")return 3;return 2}entrenchCols(J,Q){let $=this.dangerCols(J,Q);return[...Array(8).keys()].filter((Z)=>!J.palisades.has(Z)).sort((Z,W)=>R8([-$[Z],this.tb("ent",Z)],[-$[W],this.tb("ent",W)]))}promoT2(J,Q,$){return $.arch==="spear"||$.arch==="hero"?"guard":"atk"}breachTarget(J,Q,$,Z){return y6(Z,(W)=>[W[1].hp,W[1].col])[0]}artifactPick(J,Q,$){let Z=this._projCropIncome(J,Q)<J.onBoard(Q).length,W=this.cfg.mode,K;if(W==="push"||W==="runner"||W==="sandbag")K=Z?[2,1,4,7,6,3,8,5]:[1,4,7,3,6,2,8,5];else K=Z?[2,8,5,1,3,6,4,7]:[8,5,1,3,2,6,4,7];for(let Y of K)if($.includes(Y))return Y;return $[0]}routAllocate(J,Q,$,Z){let W=new Map;J.wagons[$].forEach((Y,X)=>{if(Y.hp>0)W.set(X,Y.hp)});let K=[];for(let Y=0;Y<Z;Y++){if(!W.size)break;let X=y6([...W.keys()],(U)=>[W.get(U),U]);if(K.push(X),W.set(X,W.get(X)-1),W.get(X)<=0)W.delete(X)}return K}}function HZ(J){return new z7(J)}var mK={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0};class v6 extends z7{label;pendingFeed=null;pendingBuild=null;pendingReinforce=null;pendingSB=null;pendingOrders={};pendingIntervention={};tramplePref="annex";constructor(J="You"){super("HONEST");this.label=J}feedOrder(J,Q){return this.pendingFeed??super.feedOrder(J,Q)}build(J,Q){return this.pendingBuild??[]}reinforce(J,Q){return this.pendingReinforce??{...mK}}standardBearer(J,Q){return this.pendingSB}orders(J,Q,$){return this.pendingOrders[$]??{}}intervention(J,Q,$){return this.pendingIntervention[$]??null}trampleChoice(J,Q,$,Z){if(this.tramplePref==="raid")return"raid";if(Z.type==="crop"&&J.round>=J.C.EXHAUSTION_START_ROUND-2)return"raid";return"annex"}clearPhase(){this.pendingFeed=null,this.pendingBuild=null,this.pendingReinforce=null,this.pendingSB=null,this.pendingOrders={},this.pendingIntervention={}}}var E9=(J)=>`${J[0]},${J[1]}`;function lK(J,Q,$){if($<=0)return new Map([[E9(Q.pos),[]]]);let Z=new Set;for(let Y of J.onBoard(1-Q.owner))for(let X of GJ(Y.pos))Z.add(E9(X));let W=new Map([[E9(Q.pos),[]]]),K=[[Q.pos,[]]];for(let Y=0;Y<$;Y++){let X=[];for(let[U,H]of K){if(E9(U)!==E9(Q.pos)&&Z.has(E9(U)))continue;for(let q of GJ(U)){if(W.has(E9(q))||J.occupied(q))continue;let G=[...H,q];W.set(E9(q),G),X.push([q,G])}}K=X}return W}function c8(J,Q){let $=Q.braced?0:Q.mv,Z=lK(J,Q,$),W=new Map;for(let[U,H]of Z)if(H.length)W.set(U,H);let K=[],Y=[],X=[];if(Q.arch==="archer"||Q.arch==="siege"){for(let U of J.onBoard(1-Q.owner))if(Q.rmin<=n0(Q.pos,U.pos)&&n0(Q.pos,U.pos)<=Q.rmax)X.push(U.uid)}if(Q.arch!=="siege")for(let U of J.onBoard(1-Q.owner)){if(n0(Q.pos,U.pos)===1){K.push({uid:U.uid,path:[]});continue}let H=null;for(let q of GJ(U.pos)){let G=Z.get(E9(q));if(G&&(H===null||G.length<H.length))H=G}if(H)K.push({uid:U.uid,path:H})}if(Q.arch==="cav"&&!Q.exhausted)for(let U of J.onBoard(1-Q.owner)){if(U.arch==="spear"&&U.braced)continue;let H=null;for(let q of GJ(U.pos)){let G=Z.get(E9(q));if(G&&G.length>=J.C.CHARGE_MOVE_MIN&&(H===null||G.length<H.length))H=G}if(H)Y.push({uid:U.uid,path:H})}return{moves:W,meleeTargets:K,shootTargets:X,chargeTargets:Y,canBrace:Q.arch==="spear"&&!Q.braced}}var I7=["egyptian","gaul","hun","persian","roman","spartan","teuton","viking"],k7={egyptian_archer:"../art/renders/limes_roster_28_egyptian_archer_00001_.png",egyptian_cav:"../art/renders/limes_roster_27_egyptian_cavalry_00001_.png",egyptian_hero:"../art/renders/limes_roster_30_egyptian_hero_high_priest_sebek_00001_.png",egyptian_siege:"../art/renders/limes_roster_29_egyptian_siege_00001_.png",egyptian_spear:"../art/renders/limes_roster_25_egyptian_spearman_00001_.png",egyptian_sword:"../art/renders/limes_roster_26_egyptian_swordsman_00001_.png",gaul_archer:"../art/renders/limes_roster_10_gaul_archer_00001_.png",gaul_cav:"../art/renders/limes_roster_09_gaul_cavalry_00001_.png",gaul_hero:"../art/renders/limes_roster_12_gaul_hero_druidess_eponia_00001_.png",gaul_siege:"../art/renders/limes_roster_11_gaul_siege_00001_.png",gaul_spear:"../art/renders/limes_roster_07_gaul_spearman_00001_.png",gaul_sword:"../art/renders/limes_roster_08_gaul_swordsman_00001_.png",hun_archer:"../art/renders/limes_roster_22_hun_archer_00001_.png",hun_cav:"../art/renders/limes_roster_21_hun_cavalry_00001_.png",hun_hero:"../art/renders/limes_roster_24_hun_hero_khan_bayan_00001_.png",hun_siege:"../art/renders/limes_roster_23_hun_siege_00001_.png",hun_spear:"../art/renders/limes_roster_19_hun_spearman_00001_.png",hun_sword:"../art/renders/limes_roster_20_hun_swordsman_00001_.png",persian_archer:"../art/renders/limes_roster_46_persian_archer_00001_.png",persian_cav:"../art/renders/limes_roster_45_persian_cavalry_00001_.png",persian_hero:"../art/renders/limes_roster_48_persian_hero_satrap_darius_00001_.png",persian_siege:"../art/renders/limes_roster_47_persian_siege_00001_.png",persian_spear:"../art/renders/limes_roster_43_persian_spearman_00001_.png",persian_sword:"../art/renders/limes_roster_44_persian_swordsman_00001_.png",roman_archer:"../art/renders/limes_roster_04_roman_archer_00001_.png",roman_cav:"../art/renders/limes_roster_03_roman_cavalry_00001_.png",roman_hero:"../art/renders/limes_roster_06_roman_hero_legatus_marcus_00001_.png",roman_siege:"../art/renders/limes_roster_05_roman_siege_00001_.png",roman_spear:"../art/renders/limes_roster_01_roman_spearman_00001_.png",roman_sword:"../art/renders/limes_roster_02_roman_swordsman_00001_.png",spartan_archer:"../art/renders/limes_roster_40_spartan_archer_00001_.png",spartan_cav:"../art/renders/limes_roster_39_spartan_cavalry_00001_.png",spartan_hero:"../art/renders/limes_roster_42_spartan_hero_king_leonis_00001_.png",spartan_siege:"../art/renders/limes_roster_41_spartan_siege_00001_.png",spartan_spear:"../art/renders/limes_roster_37_spartan_spearman_00001_.png",spartan_sword:"../art/renders/limes_roster_38_spartan_swordsman_00001_.png",teuton_archer:"../art/renders/limes_roster_16_teuton_archer_00001_.png",teuton_cav:"../art/renders/limes_roster_15_teuton_cavalry_00001_.png",teuton_hero:"../art/renders/limes_roster_18_teuton_hero_warlord_drengr_00001_.png",teuton_siege:"../art/renders/limes_roster_17_teuton_siege_00001_.png",teuton_spear:"../art/renders/limes_roster_13_teuton_spearman_00001_.png",teuton_sword:"../art/renders/limes_roster_14_teuton_swordsman_00001_.png",viking_archer:"../art/renders/limes_roster_34_viking_archer_00001_.png",viking_cav:"../art/renders/limes_roster_33_viking_cavalry_00001_.png",viking_hero:"../art/renders/limes_roster_36_viking_hero_jarl_sigrid_00001_.png",viking_siege:"../art/renders/limes_roster_35_viking_siege_00001_.png",viking_spear:"../art/renders/limes_roster_31_viking_spearman_00001_.png",viking_sword:"../art/renders/limes_roster_32_viking_swordsman_00001_.png"};var $9={spear:"Spearman",sword:"Swordsman",cav:"Cavalry",archer:"Archer",siege:"Siege",hero:"Hero"},A7={roman:"#a32638",spartan:"#c4622d",hun:"#d9a418",gaul:"#3e7a3a",egyptian:"#2aa198",viking:"#2b4f81",persian:"#5b3a8e",teuton:"#6e7378"},dK={p0tribe:"roman",p1tribe:"viking"},_8=(J)=>J.replace(/[&<>"]/g,(Q)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[Q]),GZ=(J)=>J.charAt(0).toUpperCase()+J.slice(1);function uK(J,Q,$){let Z=k7[`${$}_${Q.arch}`]??"",W=Math.max(0,Math.round(Q.hp/Q.max_hp*100)),K=Q.tier2?"★★":Q.tier1?"★":"",Y=[Q.exhausted?'<span class="flag ex" title="Exhausted">∅</span>':"",Q.braced?'<span class="flag br" title="Braced">⛨</span>':"",Q.face_down?'<span class="flag fd" title="Face-down">?</span>':""].join(""),X=Z?`<img class="billboard" src="${_8(Z)}" alt="${_8($9[Q.arch])}" loading="lazy">`:`<div class="billboard noimg">${_8($9[Q.arch][0])}</div>`;return`<div class="unit owner${Q.owner}" style="--c:${A7[$]}">
    ${X}
    <div class="hpbar"><i style="width:${W}%"></i></div>
    <div class="ulabel">${_8($9[Q.arch])}<span class="hp">${Q.hp}/${Q.max_hp}</span></div>
    ${K?`<span class="tier">${K}</span>`:""}
    ${Y?`<div class="flags">${Y}</div>`:""}
  </div>`}function cK(J,Q,$,Z){return`<div class="wagon owner${J}" style="--c:${A7[Z]}" title="Supply Wagon">
    <div class="wgicon">▣</div><div class="wghp">${Q}/${$}</div></div>`}function nK(J){let Q=J.annexed!==null?J.annexed:J.owner,$=J.type==="crop"?"\uD83C\uDF3E":"⛏";return`<div class="field f-owner${Q}${J.annexed!==null?" annexed":""}" title="${_8(J.type)} field">${$}</div>`}function f6(J,Q={}){let $={...dK,...Q},Z=(U)=>U===0?$.p0tribe:$.p1tribe,W=new Map;for(let U of J.units.values())if(U.pos)W.set(`${U.pos[0]},${U.pos[1]}`,U);let K=new Map;for(let U=0;U<2;U++)for(let H of J.wagons[U])K.set(`${H.col},${H.row}`,{p:U,hp:H.hp});let Y=[];for(let U=7;U>=0;U--)for(let H=0;H<8;H++){let q=`${H},${U}`,G=U<J.stakes[H]?0:1,N=U===J.stakes[H]-1,E=J.palisades.get(H),R=N&&E!==void 0,B=["cell",`terr${G}`,N?"stakeline":"",R?"has-pal":""].filter(Boolean).join(" "),D="",F=W.get(q),O=K.get(q),L=J.fields.get(q),z=`data-pos="${q}"`;if(F)D=uK(J,F,Z(F.owner)),z+=` data-uid="${F.uid}" data-owner="${F.owner}"`;else if(O)D=cK(O.p,O.hp,J.C.WAGON_HP,Z(O.p));else if(L)D=nK(L);let w=R?`<span class="pal owner${E}" style="--c:${A7[Z(E)]}" title="Palisade"></span>`:"";Y.push(`<div class="${B}" ${z}>${w}${D}</div>`)}let X=(U)=>{let H=Z(U),q=J.res[U];return`<div class="side owner${U}" style="--c:${A7[H]}">
      <div class="stitle">P${U+1} · ${_8(H[0].toUpperCase()+H.slice(1))}${J.komi===U?' <span class="komi" title="Komi holder">⚖</span>':""}</div>
      <div class="stats">
        <span title="Supply">\uD83D\uDEE1 ${q.supply}</span><span title="Crop">\uD83C\uDF3E ${q.crop}</span>
        <span title="Tribute">◆ ${q.tribute}</span><span title="Owned rows">▦ ${J.ownedRows(U)}</span>
        <span title="Wagons alive">▣ ${J.wagonsAlive(U)}/${J.wagons[U].length}</span>
      </div></div>`};return`<div class="hud">
    <div class="round">Round ${J.round}</div>
    ${X(1)}${X(0)}
  </div>
  <div class="board-grid">${Y.join("")}</div>`}function n8(){if(document.getElementById("guide-ov"))return;let J=document.createElement("div");J.id="guide-ov",J.className="overlay",J.innerHTML=`<div class="modal guide"><button class="modal-x" id="guide-x">✕</button>${`
<h2>How to play LIMES</h2>
<p class="g-lede">A deterministic, dice-free frontier wargame for 2. No luck — every
outcome follows from the rules. Hold your line, push the enemy's back, and smash
their supply.</p>

<h3>① Your goal — how you win</h3>
<ul>
  <li><b>Wagons (knockout):</b> destroy all <b>3 enemy Supply Wagons</b> (the ▣ on their back row). Instant win.</li>
  <li><b>Golden goal (from round 14):</b> in a late round, the only side to take ground / hit a wagon wins immediately.</li>
  <li><b>Ladder (round 18 time limit):</b> if no knockout, the leader wins — compared by wagons alive → wagon HP → rows of land owned.</li>
</ul>

<h3>② The board</h3>
<p>An 8×8 grid. <b>You (P1)</b> sit at the bottom, the enemy (P2) at the top — or swap seats at setup.
Each column has a <b>stake line</b> (the gold frontier): tiles below it are your land, above it the enemy's.
Push a column's stake forward to <b>take a row</b>; lose one and the enemy gains it.
Your 3 <b>Wagons</b> sit on your back row — guard them.</p>

<h3>③ A round has 5 phases</h3>
<ol>
  <li><b>Muster</b> — spend resources: <i>recruit</i> units (placed in your back rows), <i>unlock</i> new
    types, <i>build</i> Supply/Crop fields & Palisades, <i>reposition</i>, or convert <i>Tribute→Supply</i>.</li>
  <li><b>Reveal</b> — recruits flip face-up (automatic).</li>
  <li><b>Clash</b> — combat, over <b>2 pulses</b>. Each of your units may Move, Attack (melee),
    Shoot (Archer/Siege), Charge (Cavalry), Brace (Spearman), or Hold.</li>
  <li><b>Frontier</b> — stakes step where one side carries a column uncontested; trampled fields are
    raided or annexed; units in the enemy's back rows <b>breach</b> wagons (automatic).</li>
  <li><b>Pass & Tribute</b> — you gain Tribute for rows you lost; caravans bring artifacts on rounds 4 & 8 (automatic).</li>
</ol>

<h3>④ The units</h3>
<table class="g-table">
  <tr><th>Unit</th><th>Atk</th><th>HP</th><th>Move</th><th>Range</th><th>Note</th></tr>
  <tr><td>Spearman</td><td>1</td><td>4</td><td>1</td><td>1</td><td>Beats Cavalry; <b>Brace</b> to stop charges</td></tr>
  <tr><td>Swordsman</td><td>2</td><td>6</td><td>1</td><td>1</td><td>Sturdy frontline</td></tr>
  <tr><td>Cavalry</td><td>2</td><td>4</td><td>3</td><td>1</td><td>Fast; <b>Charge</b> for bonus dmg; beats Archers</td></tr>
  <tr><td>Archer</td><td>2</td><td>3</td><td>1</td><td>2</td><td>Shoots at range; beats Spearmen</td></tr>
  <tr><td>Siege</td><td>3</td><td>3</td><td>1</td><td>2–3</td><td>Hits Wagons & Palisades from afar</td></tr>
  <tr><td>Hero</td><td>3</td><td>7</td><td>2</td><td>1</td><td>Your standard — if surrounded, you <b>rout</b></td></tr>
</table>
<p><b>Triangle:</b> Spear → beats → Cavalry → beats → Archer → beats → Spear. Attack into the matchup you win.</p>

<h3>⑤ Combat edges</h3>
<ul>
  <li><b>Counter +1</b> attacking the type you beat. <b>Flank +1</b> with 2+ attackers around a target.</li>
  <li><b>Support +1 guard</b> for a unit on home soil next to a friend. <b>Brace +1 guard</b> (Spearman) and it halts a charge.</li>
  <li><b>Charge</b> (Cavalry, 2+ tiles run) adds punch and shoves the target back — but a Braced Spearman wrecks the charger.</li>
  <li><b>Beyond your line</b> a unit pays extra Crop (supply strain) and gets no Support — overextend carefully.</li>
  <li><b>Exhausted</b> (unfed) units fight worse. Keep Crop income above your army size.</li>
</ul>

<h3>⑥ Tribute & interventions</h3>
<p>Lose rows → gain <b>Tribute (◆)</b>. Spend it during Clash on <b>Surge</b> (shove a unit 1 tile) or
<b>Shieldbearer</b> (ward your Hero from a killing blow), or convert it to Supply in Muster.</p>

<h3>⑦ Controls</h3>
<ul>
  <li><b>Muster:</b> click an action button, then click a glowing board tile to place it. <b>Undo</b> reverts; <b>End Muster</b> confirms.</li>
  <li><b>Clash:</b> click your unit → <span class="g-c g-move">green</span> = move,
    <span class="g-c g-melee">red</span> = attack, <span class="g-c g-shoot">orange</span> = shoot,
    <span class="g-c g-charge">purple</span> = charge. Click a target/tile to order it; <b>Resolve pulse</b> when ready.</li>
</ul>

<h3>⑧ Reading the board</h3>
<ul>
  <li><b>Gold line</b> across a column = that column's stake (the frontier). Below it is yours, above it the enemy's. A <b>double</b> gold line means a Palisade sits there.</li>
  <li><b>Green bar</b> under a unit = its current HP. The label shows e.g. <i>SWORDSMAN 4/6</i> (4 of 6 HP left).</li>
  <li><b>★ / ★★</b> = promoted (tougher / upgraded). Units earn this by wounding enemies.</li>
  <li><b>∅</b> exhausted (under-fed, weaker) · <b>⛨</b> braced (Spearman, anti-charge) · <b>?</b> face-down (a fresh recruit, flips up at Reveal).</li>
  <li><b>⚖</b> next to a player = the <b>komi holder</b> — they act first and win exact ties.</li>
  <li>Top HUD per side: \uD83D\uDEE1 Supply · \uD83C\uDF3E Crop · ◆ Tribute · ▦ rows of land owned · ▣ wagons alive.</li>
</ul>

<h3>⑨ Combat — a worked example</h3>
<p>Damage = <b>attacker Atk − defender Guard</b> (minimum 0, or 1 if the defender is flanked).</p>
<p>Your <b>Cavalry</b> (Atk 2) charges an enemy <b>Archer</b> (HP 3) in the open:</p>
<ul>
  <li>Base Atk 2, <b>+1 counter</b> (Cav beats Archer), <b>+1 charge</b> → Atk 4.</li>
  <li>Archer Guard 0 (no Brace, no friendly support) → <b>4 damage</b>. The Archer (3 HP) dies, and the charge shoves anything behind it.</li>
</ul>
<p>But charge a <b>Braced Spearman</b> instead and it's reversed: no damage to the Spearman, and its anti-cavalry counter wrecks your Cavalry. <b>Match-ups matter more than raw stats.</b></p>

<h3>⑩ Strategy tips</h3>
<ul>
  <li><b>Feed your army.</b> Each unit eats 1 Crop/round (2 if past your line). Build Crop fields or stay lean — exhausted troops lose fights.</li>
  <li><b>Concentrate.</b> Pushing one column with a small wall beats spreading thin everywhere. Take rows where you outnumber.</li>
  <li><b>Respect the triangle.</b> Don't send Cavalry into Spears, or Archers into Cavalry. Lead with the type that counters what's in front.</li>
  <li><b>Support & brace on defense.</b> Keep defenders adjacent (for +Guard) and brace Spearmen when Cavalry threatens.</li>
  <li><b>Guard your Hero.</b> If it's ever fully surrounded by enemies you <b>rout</b> — instant wagon damage. Keep a friend beside it.</li>
  <li><b>Banking Tribute</b> (from lost rows) is real value — convert it to Supply for a big Muster, or hold it for clutch interventions.</li>
  <li><b>The clock.</b> From round 14 a single uncontested push can end it (golden goal); at round 18 the leader wins. Don't stall if you're behind.</li>
</ul>

<h3>⑪ Glossary</h3>
<ul>
  <li><b>Stake / frontier:</b> a column's border row. Carry a column uncontested to step it toward the enemy.</li>
  <li><b>Carry vs contest:</b> a unit past the line with a nearby friend "carries" (pushes); an enemy unit there "contests" (cancels the push).</li>
  <li><b>Breach:</b> a unit reaching the enemy's back rows damages a Supply Wagon in the Frontier phase.</li>
  <li><b>Rout:</b> your standard (Hero) surrounded → automatic wagon damage to you.</li>
  <li><b>Komi:</b> the first-move / tie-break token; it flips to whoever lost more ground that round.</li>
  <li><b>Caravan:</b> on rounds 4 & 8, both sides draft Artifacts (one-time boosts); the trailing side picks first.</li>
</ul>`}</div>`,document.body.appendChild(J),J.addEventListener("click",(Q)=>{if(Q.target===J)NZ()}),document.getElementById("guide-x").addEventListener("click",NZ)}function NZ(){document.getElementById("guide-ov")?.remove()}function x6(){return'<button class="pbtn guide-btn" id="open-guide">❓ Guide</button>'}function h6(J=document){J.querySelector("#open-guide")?.addEventListener("click",n8)}var fZ="184";var xZ=0,HQ=1,hZ=2;var t8=1,a7=2,v8=3,f8=0,hJ=1,dJ=2,F9=0,e8=1,GQ=2,NQ=3,qQ=4,bZ=5;var x8=100,gZ=101,pZ=102,mZ=103,lZ=104,dZ=200,uZ=201,cZ=202,nZ=203,sZ=204,iZ=205,oZ=206,aZ=207,rZ=208,tZ=209,eZ=210,JW=211,QW=212,$W=213,ZW=214,WW=0,KW=1,YW=2,EQ=3,XW=4,UW=5,HW=6,GW=7,NW=0,qW=1,EW=2,X9=0,DQ=1,FQ=2,RQ=3,_Q=4,OQ=5,MQ=6,VQ=7;var h8=301,J8=302,r7=303,t7=304,J7=306,DW=1000,e7=1001,FW=1002,u9=1003,RW=1004;var Q7=1005;var bJ=1006,J6=1007;var Q8=1008;var U9=1009,_W=1010,OW=1011,$7=1012,LQ=1013,c9=1014,C9=1015,T9=1016,BQ=1017,zQ=1018,b8=1020,MW=35902,VW=35899,LW=1021,BW=1022,R9=1023,$8=1026,Z8=1027,zW=1028,IQ=1029,W8=1030,kQ=1031;var AQ=1033,Q6=33776,$6=33777,Z6=33778,W6=33779,PQ=35840,wQ=35841,CQ=35842,TQ=35843,SQ=36196,jQ=37492,yQ=37496,vQ=37488,fQ=37489,K6=37490,xQ=37491,hQ=37808,bQ=37809,gQ=37810,pQ=37811,mQ=37812,lQ=37813,dQ=37814,uQ=37815,cQ=37816,nQ=37817,sQ=37818,iQ=37819,oQ=37820,aQ=37821,rQ=36492,tQ=36494,eQ=36495,J$=36283,Q$=36284,Y6=36285,$$=36286;var Z$=0,IW=1,K8="",Z7="srgb",W$="srgb-linear",K$="linear",KJ="srgb";var kW=512,AW=513,PW=514,X6=515,wW=516,CW=517,U6=518,TW=519;var Y$="300 es",X$=2000;function sK(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function iK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function j8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function SW(){let J=j8("canvas");return J.style.display="block",J}var qZ={},y8=null;function U$(...J){let Q="THREE."+J.shift();if(y8)y8("log",Q,...J);else console.log(Q,...J)}function jW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function w0(...J){J=jW(J);let Q="THREE."+J.shift();if(y8)y8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function P0(...J){J=jW(J);let Q="THREE."+J.shift();if(y8)y8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function i7(...J){let Q=J.join(" ");if(Q in qZ)return;qZ[Q]=!0,w0(...J)}function yW(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}var vW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class S9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}var TJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var b6=Math.PI/180,o7=180/Math.PI;function W7(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(TJ[J&255]+TJ[J>>8&255]+TJ[J>>16&255]+TJ[J>>24&255]+"-"+TJ[Q&255]+TJ[Q>>8&255]+"-"+TJ[Q>>16&15|64]+TJ[Q>>24&255]+"-"+TJ[$&63|128]+TJ[$>>8&255]+"-"+TJ[$>>16&255]+TJ[$>>24&255]+TJ[Z&255]+TJ[Z>>8&255]+TJ[Z>>16&255]+TJ[Z>>24&255]).toLowerCase()}function s0(J,Q,$){return Math.max(Q,Math.min($,J))}function oK(J,Q){return(J%Q+Q)%Q}function g6(J,Q,$){return(1-$)*J+$*Q}function s8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function xJ(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}class u0{static{u0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=s0(this.x,J.x,Q.x),this.y=s0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=s0(this.x,J,Q),this.y=s0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(s0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(s0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class j9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,Y){let X=$[Z+0],U=$[Z+1],H=$[Z+2],q=$[Z+3],G=W[K+0],N=W[K+1],E=W[K+2],R=W[K+3];if(q!==R||X!==G||U!==N||H!==E){let B=X*G+U*N+H*E+q*R;if(B<0)G=-G,N=-N,E=-E,R=-R,B=-B;let D=1-Y;if(B<0.9995){let F=Math.acos(B),O=Math.sin(F);D=Math.sin(D*F)/O,Y=Math.sin(Y*F)/O,X=X*D+G*Y,U=U*D+N*Y,H=H*D+E*Y,q=q*D+R*Y}else{X=X*D+G*Y,U=U*D+N*Y,H=H*D+E*Y,q=q*D+R*Y;let F=1/Math.sqrt(X*X+U*U+H*H+q*q);X*=F,U*=F,H*=F,q*=F}}J[Q]=X,J[Q+1]=U,J[Q+2]=H,J[Q+3]=q}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let Y=$[Z],X=$[Z+1],U=$[Z+2],H=$[Z+3],q=W[K],G=W[K+1],N=W[K+2],E=W[K+3];return J[Q]=Y*E+H*q+X*N-U*G,J[Q+1]=X*E+H*G+U*q-Y*N,J[Q+2]=U*E+H*N+Y*G-X*q,J[Q+3]=H*E-Y*q-X*G-U*N,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,Y=Math.cos,X=Math.sin,U=Y($/2),H=Y(Z/2),q=Y(W/2),G=X($/2),N=X(Z/2),E=X(W/2);switch(K){case"XYZ":this._x=G*H*q+U*N*E,this._y=U*N*q-G*H*E,this._z=U*H*E+G*N*q,this._w=U*H*q-G*N*E;break;case"YXZ":this._x=G*H*q+U*N*E,this._y=U*N*q-G*H*E,this._z=U*H*E-G*N*q,this._w=U*H*q+G*N*E;break;case"ZXY":this._x=G*H*q-U*N*E,this._y=U*N*q+G*H*E,this._z=U*H*E+G*N*q,this._w=U*H*q-G*N*E;break;case"ZYX":this._x=G*H*q-U*N*E,this._y=U*N*q+G*H*E,this._z=U*H*E-G*N*q,this._w=U*H*q+G*N*E;break;case"YZX":this._x=G*H*q+U*N*E,this._y=U*N*q+G*H*E,this._z=U*H*E-G*N*q,this._w=U*H*q-G*N*E;break;case"XZY":this._x=G*H*q-U*N*E,this._y=U*N*q-G*H*E,this._z=U*H*E+G*N*q,this._w=U*H*q+G*N*E;break;default:w0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],Y=Q[5],X=Q[9],U=Q[2],H=Q[6],q=Q[10],G=$+Y+q;if(G>0){let N=0.5/Math.sqrt(G+1);this._w=0.25/N,this._x=(H-X)*N,this._y=(W-U)*N,this._z=(K-Z)*N}else if($>Y&&$>q){let N=2*Math.sqrt(1+$-Y-q);this._w=(H-X)/N,this._x=0.25*N,this._y=(Z+K)/N,this._z=(W+U)/N}else if(Y>q){let N=2*Math.sqrt(1+Y-$-q);this._w=(W-U)/N,this._x=(Z+K)/N,this._y=0.25*N,this._z=(X+H)/N}else{let N=2*Math.sqrt(1+q-$-Y);this._w=(K-Z)/N,this._x=(W+U)/N,this._y=(X+H)/N,this._z=0.25*N}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(s0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,Y=Q._x,X=Q._y,U=Q._z,H=Q._w;return this._x=$*H+K*Y+Z*U-W*X,this._y=Z*H+K*X+W*Y-$*U,this._z=W*H+K*U+$*X-Z*Y,this._w=K*H-$*Y-Z*X-W*U,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,Y=this.dot(J);if(Y<0)$=-$,Z=-Z,W=-W,K=-K,Y=-Y;let X=1-Q;if(Y<0.9995){let U=Math.acos(Y),H=Math.sin(U);X=Math.sin(X*U)/H,Q=Math.sin(Q*U)/H,this._x=this._x*X+$*Q,this._y=this._y*X+Z*Q,this._z=this._z*X+W*Q,this._w=this._w*X+K*Q,this._onChangeCallback()}else this._x=this._x*X+$*Q,this._y=this._y*X+Z*Q,this._z=this._z*X+W*Q,this._w=this._w*X+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class f{static{f.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(EZ.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(EZ.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,Y=J.z,X=J.w,U=2*(K*Z-Y*$),H=2*(Y*Q-W*Z),q=2*(W*$-K*Q);return this.x=Q+X*U+K*q-Y*H,this.y=$+X*H+Y*U-W*q,this.z=Z+X*q+W*H-K*U,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=s0(this.x,J.x,Q.x),this.y=s0(this.y,J.y,Q.y),this.z=s0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=s0(this.x,J,Q),this.y=s0(this.y,J,Q),this.z=s0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(s0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,Y=Q.y,X=Q.z;return this.x=Z*X-W*Y,this.y=W*K-$*X,this.z=$*Y-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return p6.copy(this).projectOnVector(J),this.sub(p6)}reflect(J){return this.sub(p6.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(s0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var p6=new f,EZ=new j9;class S0{static{S0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,Y,X,U){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,Y,X,U)}set(J,Q,$,Z,W,K,Y,X,U){let H=this.elements;return H[0]=J,H[1]=Z,H[2]=Y,H[3]=Q,H[4]=W,H[5]=X,H[6]=$,H[7]=K,H[8]=U,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],Y=$[3],X=$[6],U=$[1],H=$[4],q=$[7],G=$[2],N=$[5],E=$[8],R=Z[0],B=Z[3],D=Z[6],F=Z[1],O=Z[4],L=Z[7],z=Z[2],w=Z[5],P=Z[8];return W[0]=K*R+Y*F+X*z,W[3]=K*B+Y*O+X*w,W[6]=K*D+Y*L+X*P,W[1]=U*R+H*F+q*z,W[4]=U*B+H*O+q*w,W[7]=U*D+H*L+q*P,W[2]=G*R+N*F+E*z,W[5]=G*B+N*O+E*w,W[8]=G*D+N*L+E*P,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],U=J[7],H=J[8];return Q*K*H-Q*Y*U-$*W*H+$*Y*X+Z*W*U-Z*K*X}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],U=J[7],H=J[8],q=H*K-Y*U,G=Y*X-H*W,N=U*W-K*X,E=Q*q+$*G+Z*N;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/E;return J[0]=q*R,J[1]=(Z*U-H*$)*R,J[2]=(Y*$-Z*K)*R,J[3]=G*R,J[4]=(H*Q-Z*X)*R,J[5]=(Z*W-Y*Q)*R,J[6]=N*R,J[7]=($*X-U*Q)*R,J[8]=(K*Q-$*W)*R,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,Y){let X=Math.cos(W),U=Math.sin(W);return this.set($*X,$*U,-$*(X*K+U*Y)+K+J,-Z*U,Z*X,-Z*(-U*K+X*Y)+Y+Q,0,0,1),this}scale(J,Q){return this.premultiply(m6.makeScale(J,Q)),this}rotate(J){return this.premultiply(m6.makeRotation(-J)),this}translate(J,Q){return this.premultiply(m6.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var m6=new S0,DZ=new S0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),FZ=new S0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function aK(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,Y){if(this.enabled===!1||K===Y||!K||!Y)return W;if(this.spaces[K].transfer==="srgb")W.r=P9(W.r),W.g=P9(W.g),W.b=P9(W.b);if(this.spaces[K].primaries!==this.spaces[Y].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[Y].fromXYZ);if(this.spaces[Y].transfer==="srgb")W.r=S8(W.r),W.g=S8(W.g),W.b=S8(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,Y){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[Y].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return i7("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return i7("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:DZ,fromXYZ:FZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:DZ,fromXYZ:FZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var d0=aK();function P9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function S8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var O8;class H${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(O8===void 0)O8=j8("canvas");O8.width=J.width,O8.height=J.height;let Z=O8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=O8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=j8("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=P9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(P9(Q[$]/255)*255);else Q[$]=P9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return w0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var rK=0;class K7{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rK++}),this.uuid=W7(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,Y=Z.length;K<Y;K++)if(Z[K].isDataTexture)W.push(l6(Z[K].image));else W.push(l6(Z[K]))}else W=l6(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function l6(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return H$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return w0("Texture: Unable to serialize Texture."),{}}var tK=0,d6=new f;class kJ extends S9{constructor(J=kJ.DEFAULT_IMAGE,Q=kJ.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,Y=1023,X=1009,U=kJ.DEFAULT_ANISOTROPY,H=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:tK++}),this.uuid=W7(),this.name="",this.source=new K7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=U,this.format=Y,this.internalFormat=null,this.type=X,this.offset=new u0(0,0),this.repeat=new u0(1,1),this.center=new u0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new S0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=H,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(d6).x}get height(){return this.source.getSize(d6).y}get depth(){return this.source.getSize(d6).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){w0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){w0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}kJ.DEFAULT_IMAGE=null;kJ.DEFAULT_MAPPING=300;kJ.DEFAULT_ANISOTROPY=1;class EJ{static{EJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,Y=0.1,X=J.elements,U=X[0],H=X[4],q=X[8],G=X[1],N=X[5],E=X[9],R=X[2],B=X[6],D=X[10];if(Math.abs(H-G)<0.01&&Math.abs(q-R)<0.01&&Math.abs(E-B)<0.01){if(Math.abs(H+G)<0.1&&Math.abs(q+R)<0.1&&Math.abs(E+B)<0.1&&Math.abs(U+N+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let O=(U+1)/2,L=(N+1)/2,z=(D+1)/2,w=(H+G)/4,P=(q+R)/4,C=(E+B)/4;if(O>L&&O>z)if(O<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(O),Z=w/$,W=P/$;else if(L>z)if(L<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(L),$=w/Z,W=C/Z;else if(z<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(z),$=P/W,Z=C/W;return this.set($,Z,W,Q),this}let F=Math.sqrt((B-E)*(B-E)+(q-R)*(q-R)+(G-H)*(G-H));if(Math.abs(F)<0.001)F=1;return this.x=(B-E)/F,this.y=(q-R)/F,this.z=(G-H)/F,this.w=Math.acos((U+N+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=s0(this.x,J.x,Q.x),this.y=s0(this.y,J.y,Q.y),this.z=s0(this.z,J.z,Q.z),this.w=s0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=s0(this.x,J,Q),this.y=s0(this.y,J,Q),this.z=s0(this.z,J,Q),this.w=s0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(s0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class G$ extends S9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new EJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new EJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new kJ(Z),K=$.count;for(let Y=0;Y<K;Y++)this.textures[Y]=W.clone(),this.textures[Y].isRenderTargetTexture=!0,this.textures[Y].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new K7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rJ extends G${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class H6 extends kJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class N$ extends kJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class NJ{static{NJ.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,Y,X,U,H,q,G,N,E,R,B){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,Y,X,U,H,q,G,N,E,R,B)}set(J,Q,$,Z,W,K,Y,X,U,H,q,G,N,E,R,B){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=Z,D[1]=W,D[5]=K,D[9]=Y,D[13]=X,D[2]=U,D[6]=H,D[10]=q,D[14]=G,D[3]=N,D[7]=E,D[11]=R,D[15]=B,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new NJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinant()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinant()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/M8.setFromMatrixColumn(J,0).length(),W=1/M8.setFromMatrixColumn(J,1).length(),K=1/M8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),Y=Math.sin($),X=Math.cos(Z),U=Math.sin(Z),H=Math.cos(W),q=Math.sin(W);if(J.order==="XYZ"){let G=K*H,N=K*q,E=Y*H,R=Y*q;Q[0]=X*H,Q[4]=-X*q,Q[8]=U,Q[1]=N+E*U,Q[5]=G-R*U,Q[9]=-Y*X,Q[2]=R-G*U,Q[6]=E+N*U,Q[10]=K*X}else if(J.order==="YXZ"){let G=X*H,N=X*q,E=U*H,R=U*q;Q[0]=G+R*Y,Q[4]=E*Y-N,Q[8]=K*U,Q[1]=K*q,Q[5]=K*H,Q[9]=-Y,Q[2]=N*Y-E,Q[6]=R+G*Y,Q[10]=K*X}else if(J.order==="ZXY"){let G=X*H,N=X*q,E=U*H,R=U*q;Q[0]=G-R*Y,Q[4]=-K*q,Q[8]=E+N*Y,Q[1]=N+E*Y,Q[5]=K*H,Q[9]=R-G*Y,Q[2]=-K*U,Q[6]=Y,Q[10]=K*X}else if(J.order==="ZYX"){let G=K*H,N=K*q,E=Y*H,R=Y*q;Q[0]=X*H,Q[4]=E*U-N,Q[8]=G*U+R,Q[1]=X*q,Q[5]=R*U+G,Q[9]=N*U-E,Q[2]=-U,Q[6]=Y*X,Q[10]=K*X}else if(J.order==="YZX"){let G=K*X,N=K*U,E=Y*X,R=Y*U;Q[0]=X*H,Q[4]=R-G*q,Q[8]=E*q+N,Q[1]=q,Q[5]=K*H,Q[9]=-Y*H,Q[2]=-U*H,Q[6]=N*q+E,Q[10]=G-R*q}else if(J.order==="XZY"){let G=K*X,N=K*U,E=Y*X,R=Y*U;Q[0]=X*H,Q[4]=-q,Q[8]=U*H,Q[1]=G*q+R,Q[5]=K*H,Q[9]=N*q-E,Q[2]=E*q-N,Q[6]=Y*H,Q[10]=R*q+G}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(eK,J,JY)}lookAt(J,Q,$){let Z=this.elements;if(mJ.subVectors(J,Q),mJ.lengthSq()===0)mJ.z=1;if(mJ.normalize(),b9.crossVectors($,mJ),b9.lengthSq()===0){if(Math.abs($.z)===1)mJ.x+=0.0001;else mJ.z+=0.0001;mJ.normalize(),b9.crossVectors($,mJ)}return b9.normalize(),P7.crossVectors(mJ,b9),Z[0]=b9.x,Z[4]=P7.x,Z[8]=mJ.x,Z[1]=b9.y,Z[5]=P7.y,Z[9]=mJ.y,Z[2]=b9.z,Z[6]=P7.z,Z[10]=mJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],Y=$[4],X=$[8],U=$[12],H=$[1],q=$[5],G=$[9],N=$[13],E=$[2],R=$[6],B=$[10],D=$[14],F=$[3],O=$[7],L=$[11],z=$[15],w=Z[0],P=Z[4],C=Z[8],V=Z[12],k=Z[1],d=Z[5],A=Z[9],m=Z[13],c=Z[2],y=Z[6],l=Z[10],b=Z[14],p=Z[3],a=Z[7],Q0=Z[11],E0=Z[15];return W[0]=K*w+Y*k+X*c+U*p,W[4]=K*P+Y*d+X*y+U*a,W[8]=K*C+Y*A+X*l+U*Q0,W[12]=K*V+Y*m+X*b+U*E0,W[1]=H*w+q*k+G*c+N*p,W[5]=H*P+q*d+G*y+N*a,W[9]=H*C+q*A+G*l+N*Q0,W[13]=H*V+q*m+G*b+N*E0,W[2]=E*w+R*k+B*c+D*p,W[6]=E*P+R*d+B*y+D*a,W[10]=E*C+R*A+B*l+D*Q0,W[14]=E*V+R*m+B*b+D*E0,W[3]=F*w+O*k+L*c+z*p,W[7]=F*P+O*d+L*y+z*a,W[11]=F*C+O*A+L*l+z*Q0,W[15]=F*V+O*m+L*b+z*E0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],Y=J[5],X=J[9],U=J[13],H=J[2],q=J[6],G=J[10],N=J[14],E=J[3],R=J[7],B=J[11],D=J[15],F=X*N-U*G,O=Y*N-U*q,L=Y*G-X*q,z=K*N-U*H,w=K*G-X*H,P=K*q-Y*H;return Q*(R*F-B*O+D*L)-$*(E*F-B*z+D*w)+Z*(E*O-R*z+D*P)-W*(E*L-R*w+B*P)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],U=J[7],H=J[8],q=J[9],G=J[10],N=J[11],E=J[12],R=J[13],B=J[14],D=J[15],F=Q*Y-$*K,O=Q*X-Z*K,L=Q*U-W*K,z=$*X-Z*Y,w=$*U-W*Y,P=Z*U-W*X,C=H*R-q*E,V=H*B-G*E,k=H*D-N*E,d=q*B-G*R,A=q*D-N*R,m=G*D-N*B,c=F*m-O*A+L*d+z*k-w*V+P*C;if(c===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let y=1/c;return J[0]=(Y*m-X*A+U*d)*y,J[1]=(Z*A-$*m-W*d)*y,J[2]=(R*P-B*w+D*z)*y,J[3]=(G*w-q*P-N*z)*y,J[4]=(X*k-K*m-U*V)*y,J[5]=(Q*m-Z*k+W*V)*y,J[6]=(B*L-E*P-D*O)*y,J[7]=(H*P-G*L+N*O)*y,J[8]=(K*A-Y*k+U*C)*y,J[9]=($*k-Q*A-W*C)*y,J[10]=(E*w-R*L+D*F)*y,J[11]=(q*L-H*w-N*F)*y,J[12]=(Y*V-K*d-X*C)*y,J[13]=(Q*d-$*V+Z*C)*y,J[14]=(R*O-E*z-B*F)*y,J[15]=(H*z-q*O+G*F)*y,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,Y=J.y,X=J.z,U=W*K,H=W*Y;return this.set(U*K+$,U*Y-Z*X,U*X+Z*Y,0,U*Y+Z*X,H*Y+$,H*X-Z*K,0,U*X-Z*Y,H*X+Z*K,W*X*X+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,Y=Q._z,X=Q._w,U=W+W,H=K+K,q=Y+Y,G=W*U,N=W*H,E=W*q,R=K*H,B=K*q,D=Y*q,F=X*U,O=X*H,L=X*q,z=$.x,w=$.y,P=$.z;return Z[0]=(1-(R+D))*z,Z[1]=(N+L)*z,Z[2]=(E-O)*z,Z[3]=0,Z[4]=(N-L)*w,Z[5]=(1-(G+D))*w,Z[6]=(B+F)*w,Z[7]=0,Z[8]=(E+O)*P,Z[9]=(B-F)*P,Z[10]=(1-(G+R))*P,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinant();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=M8.set(Z[0],Z[1],Z[2]).length(),Y=M8.set(Z[4],Z[5],Z[6]).length(),X=M8.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;Z9.copy(this);let U=1/K,H=1/Y,q=1/X;return Z9.elements[0]*=U,Z9.elements[1]*=U,Z9.elements[2]*=U,Z9.elements[4]*=H,Z9.elements[5]*=H,Z9.elements[6]*=H,Z9.elements[8]*=q,Z9.elements[9]*=q,Z9.elements[10]*=q,Q.setFromRotationMatrix(Z9),$.x=K,$.y=Y,$.z=X,this}makePerspective(J,Q,$,Z,W,K,Y=2000,X=!1){let U=this.elements,H=2*W/(Q-J),q=2*W/($-Z),G=(Q+J)/(Q-J),N=($+Z)/($-Z),E,R;if(X)E=W/(K-W),R=K*W/(K-W);else if(Y===2000)E=-(K+W)/(K-W),R=-2*K*W/(K-W);else if(Y===2001)E=-K/(K-W),R=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return U[0]=H,U[4]=0,U[8]=G,U[12]=0,U[1]=0,U[5]=q,U[9]=N,U[13]=0,U[2]=0,U[6]=0,U[10]=E,U[14]=R,U[3]=0,U[7]=0,U[11]=-1,U[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,Y=2000,X=!1){let U=this.elements,H=2/(Q-J),q=2/($-Z),G=-(Q+J)/(Q-J),N=-($+Z)/($-Z),E,R;if(X)E=1/(K-W),R=K/(K-W);else if(Y===2000)E=-2/(K-W),R=-(K+W)/(K-W);else if(Y===2001)E=-1/(K-W),R=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return U[0]=H,U[4]=0,U[8]=0,U[12]=G,U[1]=0,U[5]=q,U[9]=0,U[13]=N,U[2]=0,U[6]=0,U[10]=E,U[14]=R,U[3]=0,U[7]=0,U[11]=0,U[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var M8=new f,Z9=new NJ,eK=new f(0,0,0),JY=new f(1,1,1),b9=new f,P7=new f,mJ=new f,RZ=new NJ,_Z=new j9;class w9{constructor(J=0,Q=0,$=0,Z=w9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],Y=Z[8],X=Z[1],U=Z[5],H=Z[9],q=Z[2],G=Z[6],N=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(s0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-H,N),this._z=Math.atan2(-K,W);else this._x=Math.atan2(G,U),this._z=0;break;case"YXZ":if(this._x=Math.asin(-s0(H,-1,1)),Math.abs(H)<0.9999999)this._y=Math.atan2(Y,N),this._z=Math.atan2(X,U);else this._y=Math.atan2(-q,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(s0(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(-q,N),this._z=Math.atan2(-K,U);else this._y=0,this._z=Math.atan2(X,W);break;case"ZYX":if(this._y=Math.asin(-s0(q,-1,1)),Math.abs(q)<0.9999999)this._x=Math.atan2(G,N),this._z=Math.atan2(X,W);else this._x=0,this._z=Math.atan2(-K,U);break;case"YZX":if(this._z=Math.asin(s0(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-H,U),this._y=Math.atan2(-q,W);else this._x=0,this._y=Math.atan2(Y,N);break;case"XZY":if(this._z=Math.asin(-s0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(G,U),this._y=Math.atan2(Y,W);else this._x=Math.atan2(-H,N),this._y=0;break;default:w0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return RZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(RZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return _Z.setFromEuler(this),this.setFromQuaternion(_Z,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}w9.DEFAULT_ORDER="XYZ";class Y7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var QY=0,OZ=new f,V8=new j9,L9=new NJ,w7=new f,i8=new f,$Y=new f,ZY=new j9,MZ=new f(1,0,0),VZ=new f(0,1,0),LZ=new f(0,0,1),BZ={type:"added"},WY={type:"removed"},L8={type:"childadded",child:null},u6={type:"childremoved",child:null};class zJ extends S9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:QY++}),this.uuid=W7(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zJ.DEFAULT_UP.clone();let J=new f,Q=new w9,$=new j9,Z=new f(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new NJ},normalMatrix:{value:new S0}}),this.matrix=new NJ,this.matrixWorld=new NJ,this.matrixAutoUpdate=zJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Y7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return V8.setFromAxisAngle(J,Q),this.quaternion.multiply(V8),this}rotateOnWorldAxis(J,Q){return V8.setFromAxisAngle(J,Q),this.quaternion.premultiply(V8),this}rotateX(J){return this.rotateOnAxis(MZ,J)}rotateY(J){return this.rotateOnAxis(VZ,J)}rotateZ(J){return this.rotateOnAxis(LZ,J)}translateOnAxis(J,Q){return OZ.copy(J).applyQuaternion(this.quaternion),this.position.add(OZ.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(MZ,J)}translateY(J){return this.translateOnAxis(VZ,J)}translateZ(J){return this.translateOnAxis(LZ,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(L9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)w7.copy(J);else w7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),i8.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)L9.lookAt(i8,w7,this.up);else L9.lookAt(w7,i8,this.up);if(this.quaternion.setFromRotationMatrix(L9),Z)L9.extractRotation(Z.matrixWorld),V8.setFromRotationMatrix(L9),this.quaternion.premultiply(V8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return P0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(BZ),L8.child=J,this.dispatchEvent(L8),L8.child=null;else P0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(WY),u6.child=J,this.dispatchEvent(u6),u6.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),L9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),L9.multiply(J.parent.matrixWorld);return J.applyMatrix4(L9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(BZ),L8.child=J,this.dispatchEvent(L8),L8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(i8,J,$Y),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(i8,ZY,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q){let $=this.parent;if(J===!0&&$!==null)$.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(Q===!0){let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].updateWorldMatrix(!1,!0)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((Y)=>({...Y,boundingBox:Y.boundingBox?Y.boundingBox.toJSON():void 0,boundingSphere:Y.boundingSphere?Y.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((Y)=>({...Y})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(Y,X){if(Y[X.uuid]===void 0)Y[X.uuid]=X.toJSON(J);return X.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let X=Y.shapes;if(Array.isArray(X))for(let U=0,H=X.length;U<H;U++){let q=X[U];W(J.shapes,q)}else W(J.shapes,X)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let X=0,U=this.material.length;X<U;X++)Y.push(W(J.materials,this.material[X]));Z.material=Y}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let Y=0;Y<this.children.length;Y++)Z.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let Y=0;Y<this.animations.length;Y++){let X=this.animations[Y];Z.animations.push(W(J.animations,X))}}if(Q){let Y=K(J.geometries),X=K(J.materials),U=K(J.textures),H=K(J.images),q=K(J.shapes),G=K(J.skeletons),N=K(J.animations),E=K(J.nodes);if(Y.length>0)$.geometries=Y;if(X.length>0)$.materials=X;if(U.length>0)$.textures=U;if(H.length>0)$.images=H;if(q.length>0)$.shapes=q;if(G.length>0)$.skeletons=G;if(N.length>0)$.animations=N;if(E.length>0)$.nodes=E}return $.object=Z,$;function K(Y){let X=[];for(let U in Y){let H=Y[U];delete H.metadata,X.push(H)}return X}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}zJ.DEFAULT_UP=new f(0,1,0);zJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;zJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Y9 extends zJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var KY={type:"move"};class X7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new Y9,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new Y9,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new f,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new f;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new Y9,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new f,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new f,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,Y=this._targetRay,X=this._grip,U=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(U&&J.hand){K=!0;for(let R of J.hand.values()){let B=Q.getJointPose(R,$),D=this._getHandJoint(U,R);if(B!==null)D.matrix.fromArray(B.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=B.radius;D.visible=B!==null}let H=U.joints["index-finger-tip"],q=U.joints["thumb-tip"],G=H.position.distanceTo(q.position),N=0.02,E=0.005;if(U.inputState.pinching&&G>N+E)U.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!U.inputState.pinching&&G<=N-E)U.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(X!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(X.matrix.fromArray(W.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,W.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(W.linearVelocity);else X.hasLinearVelocity=!1;if(W.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(W.angularVelocity);else X.hasAngularVelocity=!1;if(X.eventsEnabled)X.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(Y!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(KY)}}}if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=W!==null;if(U!==null)U.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new Y9;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var fW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},g9={h:0,s:0,l:0},C7={h:0,s:0,l:0};function c6(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class m0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,d0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=d0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,d0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=d0.workingColorSpace){if(J=oK(J,1),Q=s0(Q,0,1),$=s0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=c6(K,W,J+0.3333333333333333),this.g=c6(K,W,J),this.b=c6(K,W,J-0.3333333333333333)}return d0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)w0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],Y=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:w0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else w0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=fW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else w0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=P9(J.r),this.g=P9(J.g),this.b=P9(J.b),this}copyLinearToSRGB(J){return this.r=S8(J.r),this.g=S8(J.g),this.b=S8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return d0.workingToColorSpace(SJ.copy(this),J),Math.round(s0(SJ.r*255,0,255))*65536+Math.round(s0(SJ.g*255,0,255))*256+Math.round(s0(SJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=d0.workingColorSpace){d0.workingToColorSpace(SJ.copy(this),Q);let{r:$,g:Z,b:W}=SJ,K=Math.max($,Z,W),Y=Math.min($,Z,W),X,U,H=(Y+K)/2;if(Y===K)X=0,U=0;else{let q=K-Y;switch(U=H<=0.5?q/(K+Y):q/(2-K-Y),K){case $:X=(Z-W)/q+(Z<W?6:0);break;case Z:X=(W-$)/q+2;break;case W:X=($-Z)/q+4;break}X/=6}return J.h=X,J.s=U,J.l=H,J}getRGB(J,Q=d0.workingColorSpace){return d0.workingToColorSpace(SJ.copy(this),Q),J.r=SJ.r,J.g=SJ.g,J.b=SJ.b,J}getStyle(J="srgb"){d0.workingToColorSpace(SJ.copy(this),J);let{r:Q,g:$,b:Z}=SJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(g9),this.setHSL(g9.h+J,g9.s+Q,g9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(g9),J.getHSL(C7);let $=g6(g9.h,C7.h,Q),Z=g6(g9.s,C7.s,Q),W=g6(g9.l,C7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var SJ=new m0;m0.NAMES=fW;class U7{constructor(J,Q=1,$=1000){this.isFog=!0,this.name="",this.color=new m0(J),this.near=Q,this.far=$}clone(){return new U7(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class G6 extends zJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new w9,this.environmentIntensity=1,this.environmentRotation=new w9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var W9=new f,B9=new f,n6=new f,z9=new f,B8=new f,z8=new f,zZ=new f,s6=new f,i6=new f,o6=new f,a6=new EJ,r6=new EJ,t6=new EJ;class oJ{constructor(J=new f,Q=new f,$=new f){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),W9.subVectors(J,Q),Z.cross(W9);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){W9.subVectors(Z,Q),B9.subVectors($,Q),n6.subVectors(J,Q);let K=W9.dot(W9),Y=W9.dot(B9),X=W9.dot(n6),U=B9.dot(B9),H=B9.dot(n6),q=K*U-Y*Y;if(q===0)return W.set(0,0,0),null;let G=1/q,N=(U*X-Y*H)*G,E=(K*H-Y*X)*G;return W.set(1-N-E,E,N)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,z9)===null)return!1;return z9.x>=0&&z9.y>=0&&z9.x+z9.y<=1}static getInterpolation(J,Q,$,Z,W,K,Y,X){if(this.getBarycoord(J,Q,$,Z,z9)===null){if(X.x=0,X.y=0,"z"in X)X.z=0;if("w"in X)X.w=0;return null}return X.setScalar(0),X.addScaledVector(W,z9.x),X.addScaledVector(K,z9.y),X.addScaledVector(Y,z9.z),X}static getInterpolatedAttribute(J,Q,$,Z,W,K){return a6.setScalar(0),r6.setScalar(0),t6.setScalar(0),a6.fromBufferAttribute(J,Q),r6.fromBufferAttribute(J,$),t6.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(a6,W.x),K.addScaledVector(r6,W.y),K.addScaledVector(t6,W.z),K}static isFrontFacing(J,Q,$,Z){return W9.subVectors($,Q),B9.subVectors(J,Q),W9.cross(B9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return W9.subVectors(this.c,this.b),B9.subVectors(this.a,this.b),W9.cross(B9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return oJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return oJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return oJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return oJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return oJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,Y;B8.subVectors(Z,$),z8.subVectors(W,$),s6.subVectors(J,$);let X=B8.dot(s6),U=z8.dot(s6);if(X<=0&&U<=0)return Q.copy($);i6.subVectors(J,Z);let H=B8.dot(i6),q=z8.dot(i6);if(H>=0&&q<=H)return Q.copy(Z);let G=X*q-H*U;if(G<=0&&X>=0&&H<=0)return K=X/(X-H),Q.copy($).addScaledVector(B8,K);o6.subVectors(J,W);let N=B8.dot(o6),E=z8.dot(o6);if(E>=0&&N<=E)return Q.copy(W);let R=N*U-X*E;if(R<=0&&U>=0&&E<=0)return Y=U/(U-E),Q.copy($).addScaledVector(z8,Y);let B=H*E-N*q;if(B<=0&&q-H>=0&&N-E>=0)return zZ.subVectors(W,Z),Y=(q-H)/(q-H+(N-E)),Q.copy(Z).addScaledVector(zZ,Y);let D=1/(B+R+G);return K=R*D,Y=G*D,Q.copy($).addScaledVector(B8,K).addScaledVector(z8,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class Y8{constructor(J=new f(1/0,1/0,1/0),Q=new f(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(K9.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(K9.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=K9.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,Y=W.count;K<Y;K++){if(J.isMesh===!0)J.getVertexPosition(K,K9);else K9.fromBufferAttribute(W,K);K9.applyMatrix4(J.matrixWorld),this.expandByPoint(K9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();T7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();T7.copy($.boundingBox)}T7.applyMatrix4(J.matrixWorld),this.union(T7)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,K9),K9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(o8),S7.subVectors(this.max,o8),I8.subVectors(J.a,o8),k8.subVectors(J.b,o8),A8.subVectors(J.c,o8),p9.subVectors(k8,I8),m9.subVectors(A8,k8),a9.subVectors(I8,A8);let Q=[0,-p9.z,p9.y,0,-m9.z,m9.y,0,-a9.z,a9.y,p9.z,0,-p9.x,m9.z,0,-m9.x,a9.z,0,-a9.x,-p9.y,p9.x,0,-m9.y,m9.x,0,-a9.y,a9.x,0];if(!e6(Q,I8,k8,A8,S7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!e6(Q,I8,k8,A8,S7))return!1;return j7.crossVectors(p9,m9),Q=[j7.x,j7.y,j7.z],e6(Q,I8,k8,A8,S7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,K9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(K9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return I9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),I9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),I9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),I9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),I9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),I9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),I9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),I9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(I9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var I9=[new f,new f,new f,new f,new f,new f,new f,new f],K9=new f,T7=new Y8,I8=new f,k8=new f,A8=new f,p9=new f,m9=new f,a9=new f,o8=new f,S7=new f,j7=new f,r9=new f;function e6(J,Q,$,Z,W){for(let K=0,Y=J.length-3;K<=Y;K+=3){r9.fromArray(J,K);let X=W.x*Math.abs(r9.x)+W.y*Math.abs(r9.y)+W.z*Math.abs(r9.z),U=Q.dot(r9),H=$.dot(r9),q=Z.dot(r9);if(Math.max(-Math.max(U,H,q),Math.min(U,H,q))>X)return!1}return!0}var MJ=new f,y7=new u0,YY=0;class aJ extends S9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:YY++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)y7.fromBufferAttribute(this,Q),y7.applyMatrix3(J),this.setXY(Q,y7.x,y7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)MJ.fromBufferAttribute(this,Q),MJ.applyMatrix3(J),this.setXYZ(Q,MJ.x,MJ.y,MJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)MJ.fromBufferAttribute(this,Q),MJ.applyMatrix4(J),this.setXYZ(Q,MJ.x,MJ.y,MJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)MJ.fromBufferAttribute(this,Q),MJ.applyNormalMatrix(J),this.setXYZ(Q,MJ.x,MJ.y,MJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)MJ.fromBufferAttribute(this,Q),MJ.transformDirection(J),this.setXYZ(Q,MJ.x,MJ.y,MJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=s8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=xJ($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=s8(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=xJ(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=s8(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=xJ(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=s8(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=xJ(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=s8(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=xJ(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=xJ(Q,this.array),$=xJ($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=xJ(Q,this.array),$=xJ($,this.array),Z=xJ(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=xJ(Q,this.array),$=xJ($,this.array),Z=xJ(Z,this.array),W=xJ(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class N6 extends aJ{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class q6 extends aJ{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class AJ extends aJ{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var XY=new Y8,a8=new f,JQ=new f;class H7{constructor(J=new f,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else XY.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;a8.subVectors(J,this.center);let Q=a8.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(a8,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else JQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(a8.copy(J.center).add(JQ)),this.expandByPoint(a8.copy(J.center).sub(JQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var UY=0,iJ=new NJ,QQ=new zJ,P8=new f,lJ=new Y8,r8=new Y8,BJ=new f;class tJ extends S9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:UY++}),this.uuid=W7(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((sK(J))?q6:N6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new S0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return iJ.makeRotationFromQuaternion(J),this.applyMatrix4(iJ),this}rotateX(J){return iJ.makeRotationX(J),this.applyMatrix4(iJ),this}rotateY(J){return iJ.makeRotationY(J),this.applyMatrix4(iJ),this}rotateZ(J){return iJ.makeRotationZ(J),this.applyMatrix4(iJ),this}translate(J,Q,$){return iJ.makeTranslation(J,Q,$),this.applyMatrix4(iJ),this}scale(J,Q,$){return iJ.makeScale(J,Q,$),this.applyMatrix4(iJ),this}lookAt(J){return QQ.lookAt(J),QQ.updateMatrix(),this.applyMatrix4(QQ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(P8).negate(),this.translate(P8.x,P8.y,P8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new AJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)w0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Y8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new f(-1/0,-1/0,-1/0),new f(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(lJ.setFromBufferAttribute(W),this.morphTargetsRelative)BJ.addVectors(this.boundingBox.min,lJ.min),this.boundingBox.expandByPoint(BJ),BJ.addVectors(this.boundingBox.max,lJ.max),this.boundingBox.expandByPoint(BJ);else this.boundingBox.expandByPoint(lJ.min),this.boundingBox.expandByPoint(lJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))P0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new H7;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new f,1/0);return}if(J){let $=this.boundingSphere.center;if(lJ.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let Y=Q[W];if(r8.setFromBufferAttribute(Y),this.morphTargetsRelative)BJ.addVectors(lJ.min,r8.min),lJ.expandByPoint(BJ),BJ.addVectors(lJ.max,r8.max),lJ.expandByPoint(BJ);else lJ.expandByPoint(r8.min),lJ.expandByPoint(r8.max)}lJ.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)BJ.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(BJ));if(Q)for(let W=0,K=Q.length;W<K;W++){let Y=Q[W],X=this.morphTargetsRelative;for(let U=0,H=Y.count;U<H;U++){if(BJ.fromBufferAttribute(Y,U),X)P8.fromBufferAttribute(J,U),BJ.add(P8);Z=Math.max(Z,$.distanceToSquared(BJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))P0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){P0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new aJ(new Float32Array(4*$.count),4));let K=this.getAttribute("tangent"),Y=[],X=[];for(let C=0;C<$.count;C++)Y[C]=new f,X[C]=new f;let U=new f,H=new f,q=new f,G=new u0,N=new u0,E=new u0,R=new f,B=new f;function D(C,V,k){U.fromBufferAttribute($,C),H.fromBufferAttribute($,V),q.fromBufferAttribute($,k),G.fromBufferAttribute(W,C),N.fromBufferAttribute(W,V),E.fromBufferAttribute(W,k),H.sub(U),q.sub(U),N.sub(G),E.sub(G);let d=1/(N.x*E.y-E.x*N.y);if(!isFinite(d))return;R.copy(H).multiplyScalar(E.y).addScaledVector(q,-N.y).multiplyScalar(d),B.copy(q).multiplyScalar(N.x).addScaledVector(H,-E.x).multiplyScalar(d),Y[C].add(R),Y[V].add(R),Y[k].add(R),X[C].add(B),X[V].add(B),X[k].add(B)}let F=this.groups;if(F.length===0)F=[{start:0,count:J.count}];for(let C=0,V=F.length;C<V;++C){let k=F[C],d=k.start,A=k.count;for(let m=d,c=d+A;m<c;m+=3)D(J.getX(m+0),J.getX(m+1),J.getX(m+2))}let O=new f,L=new f,z=new f,w=new f;function P(C){z.fromBufferAttribute(Z,C),w.copy(z);let V=Y[C];O.copy(V),O.sub(z.multiplyScalar(z.dot(V))).normalize(),L.crossVectors(w,V);let d=L.dot(X[C])<0?-1:1;K.setXYZW(C,O.x,O.y,O.z,d)}for(let C=0,V=F.length;C<V;++C){let k=F[C],d=k.start,A=k.count;for(let m=d,c=d+A;m<c;m+=3)P(J.getX(m+0)),P(J.getX(m+1)),P(J.getX(m+2))}}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0)$=new aJ(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let G=0,N=$.count;G<N;G++)$.setXYZ(G,0,0,0);let Z=new f,W=new f,K=new f,Y=new f,X=new f,U=new f,H=new f,q=new f;if(J)for(let G=0,N=J.count;G<N;G+=3){let E=J.getX(G+0),R=J.getX(G+1),B=J.getX(G+2);Z.fromBufferAttribute(Q,E),W.fromBufferAttribute(Q,R),K.fromBufferAttribute(Q,B),H.subVectors(K,W),q.subVectors(Z,W),H.cross(q),Y.fromBufferAttribute($,E),X.fromBufferAttribute($,R),U.fromBufferAttribute($,B),Y.add(H),X.add(H),U.add(H),$.setXYZ(E,Y.x,Y.y,Y.z),$.setXYZ(R,X.x,X.y,X.z),$.setXYZ(B,U.x,U.y,U.z)}else for(let G=0,N=Q.count;G<N;G+=3)Z.fromBufferAttribute(Q,G+0),W.fromBufferAttribute(Q,G+1),K.fromBufferAttribute(Q,G+2),H.subVectors(K,W),q.subVectors(Z,W),H.cross(q),$.setXYZ(G+0,H.x,H.y,H.z),$.setXYZ(G+1,H.x,H.y,H.z),$.setXYZ(G+2,H.x,H.y,H.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)BJ.fromBufferAttribute(J,Q),BJ.normalize(),J.setXYZ(Q,BJ.x,BJ.y,BJ.z)}toNonIndexed(){function J(Y,X){let{array:U,itemSize:H,normalized:q}=Y,G=new U.constructor(X.length*H),N=0,E=0;for(let R=0,B=X.length;R<B;R++){if(Y.isInterleavedBufferAttribute)N=X[R]*Y.data.stride+Y.offset;else N=X[R]*H;for(let D=0;D<H;D++)G[E++]=U[N++]}return new aJ(G,H,q)}if(this.index===null)return w0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new tJ,$=this.index.array,Z=this.attributes;for(let Y in Z){let X=Z[Y],U=J(X,$);Q.setAttribute(Y,U)}let W=this.morphAttributes;for(let Y in W){let X=[],U=W[Y];for(let H=0,q=U.length;H<q;H++){let G=U[H],N=J(G,$);X.push(N)}Q.morphAttributes[Y]=X}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let Y=0,X=K.length;Y<X;Y++){let U=K[Y];Q.addGroup(U.start,U.count,U.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let X=this.parameters;for(let U in X)if(X[U]!==void 0)J[U]=X[U];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let X in $){let U=$[X];J.data.attributes[X]=U.toJSON(J.data)}let Z={},W=!1;for(let X in this.morphAttributes){let U=this.morphAttributes[X],H=[];for(let q=0,G=U.length;q<G;q++){let N=U[q];H.push(N.toJSON(J.data))}if(H.length>0)Z[X]=H,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere=Y.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let U in Z){let H=Z[U];this.setAttribute(U,H.clone(Q))}let W=J.morphAttributes;for(let U in W){let H=[],q=W[U];for(let G=0,N=q.length;G<N;G++)H.push(q[G].clone(Q));this.morphAttributes[U]=H}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let U=0,H=K.length;U<H;U++){let q=K[U];this.addGroup(q.start,q.count,q.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let X=J.boundingSphere;if(X!==null)this.boundingSphere=X.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var HY=0;class X8 extends S9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:HY++}),this.uuid=W7(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new m0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){w0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){w0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let Y in W){let X=W[Y];delete X.metadata,K.push(X)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var k9=new f,$Q=new f,v7=new f,l9=new f,ZQ=new f,f7=new f,WQ=new f;class E6{constructor(J=new f,Q=new f(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,k9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=k9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return k9.copy(this.origin).addScaledVector(this.direction,Q),k9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){$Q.copy(J).add(Q).multiplyScalar(0.5),v7.copy(Q).sub(J).normalize(),l9.copy(this.origin).sub($Q);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(v7),Y=l9.dot(this.direction),X=-l9.dot(v7),U=l9.lengthSq(),H=Math.abs(1-K*K),q,G,N,E;if(H>0)if(q=K*X-Y,G=K*Y-X,E=W*H,q>=0)if(G>=-E)if(G<=E){let R=1/H;q*=R,G*=R,N=q*(q+K*G+2*Y)+G*(K*q+G+2*X)+U}else G=W,q=Math.max(0,-(K*G+Y)),N=-q*q+G*(G+2*X)+U;else G=-W,q=Math.max(0,-(K*G+Y)),N=-q*q+G*(G+2*X)+U;else if(G<=-E)q=Math.max(0,-(-K*W+Y)),G=q>0?-W:Math.min(Math.max(-W,-X),W),N=-q*q+G*(G+2*X)+U;else if(G<=E)q=0,G=Math.min(Math.max(-W,-X),W),N=G*(G+2*X)+U;else q=Math.max(0,-(K*W+Y)),G=q>0?W:Math.min(Math.max(-W,-X),W),N=-q*q+G*(G+2*X)+U;else G=K>0?-W:W,q=Math.max(0,-(K*G+Y)),N=-q*q+G*(G+2*X)+U;if($)$.copy(this.origin).addScaledVector(this.direction,q);if(Z)Z.copy($Q).addScaledVector(v7,G);return N}intersectSphere(J,Q){k9.subVectors(J.center,this.origin);let $=k9.dot(this.direction),Z=k9.dot(k9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),Y=$-K,X=$+K;if(X<0)return null;if(Y<0)return this.at(X,Q);return this.at(Y,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,Y,X,U=1/this.direction.x,H=1/this.direction.y,q=1/this.direction.z,G=this.origin;if(U>=0)$=(J.min.x-G.x)*U,Z=(J.max.x-G.x)*U;else $=(J.max.x-G.x)*U,Z=(J.min.x-G.x)*U;if(H>=0)W=(J.min.y-G.y)*H,K=(J.max.y-G.y)*H;else W=(J.max.y-G.y)*H,K=(J.min.y-G.y)*H;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(q>=0)Y=(J.min.z-G.z)*q,X=(J.max.z-G.z)*q;else Y=(J.max.z-G.z)*q,X=(J.min.z-G.z)*q;if($>X||Y>Z)return null;if(Y>$||$!==$)$=Y;if(X<Z||Z!==Z)Z=X;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,k9)!==null}intersectTriangle(J,Q,$,Z,W){ZQ.subVectors(Q,J),f7.subVectors($,J),WQ.crossVectors(ZQ,f7);let K=this.direction.dot(WQ),Y;if(K>0){if(Z)return null;Y=1}else if(K<0)Y=-1,K=-K;else return null;l9.subVectors(this.origin,J);let X=Y*this.direction.dot(f7.crossVectors(l9,f7));if(X<0)return null;let U=Y*this.direction.dot(ZQ.cross(l9));if(U<0)return null;if(X+U>K)return null;let H=-Y*l9.dot(WQ);if(H<0)return null;return this.at(H/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class y9 extends X8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new m0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new w9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var IZ=new NJ,t9=new E6,x7=new H7,kZ=new f,h7=new f,b7=new f,g7=new f,KQ=new f,p7=new f,AZ=new f,m7=new f;class HJ extends zJ{constructor(J=new tJ,Q=new y9){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let Y=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let Y=this.morphTargetInfluences;if(W&&Y){p7.set(0,0,0);for(let X=0,U=W.length;X<U;X++){let H=Y[X],q=W[X];if(H===0)continue;if(KQ.fromBufferAttribute(q,J),K)p7.addScaledVector(KQ,H);else p7.addScaledVector(KQ.sub(Q),H)}Q.add(p7)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(x7.copy($.boundingSphere),x7.applyMatrix4(W),t9.copy(J.ray).recast(J.near),x7.containsPoint(t9.origin)===!1){if(t9.intersectSphere(x7,kZ)===null)return;if(t9.origin.distanceToSquared(kZ)>(J.far-J.near)**2)return}if(IZ.copy(W).invert(),t9.copy(J.ray).applyMatrix4(IZ),$.boundingBox!==null){if(t9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,t9)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,Y=W.index,X=W.attributes.position,U=W.attributes.uv,H=W.attributes.uv1,q=W.attributes.normal,G=W.groups,N=W.drawRange;if(Y!==null)if(Array.isArray(K))for(let E=0,R=G.length;E<R;E++){let B=G[E],D=K[B.materialIndex],F=Math.max(B.start,N.start),O=Math.min(Y.count,Math.min(B.start+B.count,N.start+N.count));for(let L=F,z=O;L<z;L+=3){let w=Y.getX(L),P=Y.getX(L+1),C=Y.getX(L+2);if(Z=l7(this,D,J,$,U,H,q,w,P,C),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let E=Math.max(0,N.start),R=Math.min(Y.count,N.start+N.count);for(let B=E,D=R;B<D;B+=3){let F=Y.getX(B),O=Y.getX(B+1),L=Y.getX(B+2);if(Z=l7(this,K,J,$,U,H,q,F,O,L),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}else if(X!==void 0)if(Array.isArray(K))for(let E=0,R=G.length;E<R;E++){let B=G[E],D=K[B.materialIndex],F=Math.max(B.start,N.start),O=Math.min(X.count,Math.min(B.start+B.count,N.start+N.count));for(let L=F,z=O;L<z;L+=3){let w=L,P=L+1,C=L+2;if(Z=l7(this,D,J,$,U,H,q,w,P,C),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let E=Math.max(0,N.start),R=Math.min(X.count,N.start+N.count);for(let B=E,D=R;B<D;B+=3){let F=B,O=B+1,L=B+2;if(Z=l7(this,K,J,$,U,H,q,F,O,L),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}}}function GY(J,Q,$,Z,W,K,Y,X){let U;if(Q.side===1)U=Z.intersectTriangle(Y,K,W,!0,X);else U=Z.intersectTriangle(W,K,Y,Q.side===0,X);if(U===null)return null;m7.copy(X),m7.applyMatrix4(J.matrixWorld);let H=$.ray.origin.distanceTo(m7);if(H<$.near||H>$.far)return null;return{distance:H,point:m7.clone(),object:J}}function l7(J,Q,$,Z,W,K,Y,X,U,H){J.getVertexPosition(X,h7),J.getVertexPosition(U,b7),J.getVertexPosition(H,g7);let q=GY(J,Q,$,Z,h7,b7,g7,AZ);if(q){let G=new f;if(oJ.getBarycoord(AZ,h7,b7,g7,G),W)q.uv=oJ.getInterpolatedAttribute(W,X,U,H,G,new u0);if(K)q.uv1=oJ.getInterpolatedAttribute(K,X,U,H,G,new u0);if(Y){if(q.normal=oJ.getInterpolatedAttribute(Y,X,U,H,G,new f),q.normal.dot(Z.direction)>0)q.normal.multiplyScalar(-1)}let N={a:X,b:U,c:H,normal:new f,materialIndex:0};oJ.getNormal(h7,b7,g7,N.normal),q.face=N,q.barycoord=G}return q}class q$ extends kJ{constructor(J=null,Q=1,$=1,Z,W,K,Y,X,U=1003,H=1003,q,G){super(null,K,Y,X,U,H,Z,W,q,G);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var YQ=new f,NY=new f,qY=new S0;class A9{constructor(J=new f(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=YQ.subVectors($,Q).cross(NY.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(YQ),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||qY.getNormalMatrix(J),Z=this.coplanarPoint(YQ).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var e9=new H7,EY=new u0(0.5,0.5),d7=new f;class G7{constructor(J=new A9,Q=new A9,$=new A9,Z=new A9,W=new A9,K=new A9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let Y=this.planes;return Y[0].copy(J),Y[1].copy(Q),Y[2].copy($),Y[3].copy(Z),Y[4].copy(W),Y[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],Y=W[1],X=W[2],U=W[3],H=W[4],q=W[5],G=W[6],N=W[7],E=W[8],R=W[9],B=W[10],D=W[11],F=W[12],O=W[13],L=W[14],z=W[15];if(Z[0].setComponents(U-K,N-H,D-E,z-F).normalize(),Z[1].setComponents(U+K,N+H,D+E,z+F).normalize(),Z[2].setComponents(U+Y,N+q,D+R,z+O).normalize(),Z[3].setComponents(U-Y,N-q,D-R,z-O).normalize(),$)Z[4].setComponents(X,G,B,L).normalize(),Z[5].setComponents(U-X,N-G,D-B,z-L).normalize();else if(Z[4].setComponents(U-X,N-G,D-B,z-L).normalize(),Q===2000)Z[5].setComponents(U+X,N+G,D+B,z+L).normalize();else if(Q===2001)Z[5].setComponents(X,G,B,L).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();e9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();e9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(e9)}intersectsSprite(J){e9.center.set(0,0,0);let Q=EY.distanceTo(J.center);return e9.radius=0.7071067811865476+Q,e9.applyMatrix4(J.matrixWorld),this.intersectsSphere(e9)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(d7.x=Z.normal.x>0?J.max.x:J.min.x,d7.y=Z.normal.y>0?J.max.y:J.min.y,d7.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(d7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class D6 extends kJ{constructor(J=[],Q=301,$,Z,W,K,Y,X,U,H){super(J,Q,$,Z,W,K,Y,X,U,H);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class n9 extends kJ{constructor(J,Q,$=1014,Z,W,K,Y=1003,X=1003,U,H=1026,q=1){if(H!==1026&&H!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let G={width:J,height:Q,depth:q};super(G,Z,W,K,Y,X,H,$,U);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new K7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class E$ extends n9{constructor(J,Q=1014,$=301,Z,W,K=1003,Y=1003,X,U=1026){let H={width:J,height:J,depth:1},q=[H,H,H,H,H,H];super(J,J,Q,$,Z,W,K,Y,X,U);this.image=q,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class F6 extends kJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class gJ extends tJ{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let Y=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let X=[],U=[],H=[],q=[],G=0,N=0;E("z","y","x",-1,-1,$,Q,J,K,W,0),E("z","y","x",1,-1,$,Q,-J,K,W,1),E("x","z","y",1,1,J,$,Q,Z,K,2),E("x","z","y",1,-1,J,$,-Q,Z,K,3),E("x","y","z",1,-1,J,Q,$,Z,W,4),E("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(X),this.setAttribute("position",new AJ(U,3)),this.setAttribute("normal",new AJ(H,3)),this.setAttribute("uv",new AJ(q,2));function E(R,B,D,F,O,L,z,w,P,C,V){let k=L/P,d=z/C,A=L/2,m=z/2,c=w/2,y=P+1,l=C+1,b=0,p=0,a=new f;for(let Q0=0;Q0<l;Q0++){let E0=Q0*d-m;for(let I0=0;I0<y;I0++){let O0=I0*k-A;a[R]=O0*F,a[B]=E0*O,a[D]=c,U.push(a.x,a.y,a.z),a[R]=0,a[B]=0,a[D]=w>0?1:-1,H.push(a.x,a.y,a.z),q.push(I0/P),q.push(1-Q0/C),b+=1}}for(let Q0=0;Q0<C;Q0++)for(let E0=0;E0<P;E0++){let I0=G+E0+y*Q0,O0=G+E0+y*(Q0+1),r0=G+(E0+1)+y*(Q0+1),p0=G+(E0+1)+y*Q0;X.push(I0,O0,p0),X.push(O0,r0,p0),p+=6}Y.addGroup(N,p,V),N+=p,G+=b}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new gJ(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class g8 extends tJ{constructor(J=1,Q=1,$=1,Z=32,W=1,K=!1,Y=0,X=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:W,openEnded:K,thetaStart:Y,thetaLength:X};let U=this;Z=Math.floor(Z),W=Math.floor(W);let H=[],q=[],G=[],N=[],E=0,R=[],B=$/2,D=0;if(F(),K===!1){if(J>0)O(!0);if(Q>0)O(!1)}this.setIndex(H),this.setAttribute("position",new AJ(q,3)),this.setAttribute("normal",new AJ(G,3)),this.setAttribute("uv",new AJ(N,2));function F(){let L=new f,z=new f,w=0,P=(Q-J)/$;for(let C=0;C<=W;C++){let V=[],k=C/W,d=k*(Q-J)+J;for(let A=0;A<=Z;A++){let m=A/Z,c=m*X+Y,y=Math.sin(c),l=Math.cos(c);z.x=d*y,z.y=-k*$+B,z.z=d*l,q.push(z.x,z.y,z.z),L.set(y,P,l).normalize(),G.push(L.x,L.y,L.z),N.push(m,1-k),V.push(E++)}R.push(V)}for(let C=0;C<Z;C++)for(let V=0;V<W;V++){let k=R[V][C],d=R[V+1][C],A=R[V+1][C+1],m=R[V][C+1];if(J>0||V!==0)H.push(k,d,m),w+=3;if(Q>0||V!==W-1)H.push(d,A,m),w+=3}U.addGroup(D,w,0),D+=w}function O(L){let z=E,w=new u0,P=new f,C=0,V=L===!0?J:Q,k=L===!0?1:-1;for(let A=1;A<=Z;A++)q.push(0,B*k,0),G.push(0,k,0),N.push(0.5,0.5),E++;let d=E;for(let A=0;A<=Z;A++){let c=A/Z*X+Y,y=Math.cos(c),l=Math.sin(c);P.x=V*l,P.y=B*k,P.z=V*y,q.push(P.x,P.y,P.z),G.push(0,k,0),w.x=y*0.5+0.5,w.y=l*0.5*k+0.5,N.push(w.x,w.y),E++}for(let A=0;A<Z;A++){let m=z+A,c=d+A;if(L===!0)H.push(c,c+1,m);else H.push(c+1,c,m);C+=3}U.addGroup(D,C,L===!0?1:2),D+=C}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new g8(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class v9 extends tJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,Y=Math.floor($),X=Math.floor(Z),U=Y+1,H=X+1,q=J/Y,G=Q/X,N=[],E=[],R=[],B=[];for(let D=0;D<H;D++){let F=D*G-K;for(let O=0;O<U;O++){let L=O*q-W;E.push(L,-F,0),R.push(0,0,1),B.push(O/Y),B.push(1-D/X)}}for(let D=0;D<X;D++)for(let F=0;F<Y;F++){let O=F+U*D,L=F+U*(D+1),z=F+1+U*(D+1),w=F+1+U*D;N.push(O,L,w),N.push(L,z,w)}this.setIndex(N),this.setAttribute("position",new AJ(E,3)),this.setAttribute("normal",new AJ(R,3)),this.setAttribute("uv",new AJ(B,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new v9(J.width,J.height,J.widthSegments,J.heightSegments)}}class p8 extends tJ{constructor(J=0.5,Q=1,$=32,Z=1,W=0,K=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:$,phiSegments:Z,thetaStart:W,thetaLength:K},$=Math.max(3,$),Z=Math.max(1,Z);let Y=[],X=[],U=[],H=[],q=J,G=(Q-J)/Z,N=new f,E=new u0;for(let R=0;R<=Z;R++){for(let B=0;B<=$;B++){let D=W+B/$*K;N.x=q*Math.cos(D),N.y=q*Math.sin(D),X.push(N.x,N.y,N.z),U.push(0,0,1),E.x=(N.x/Q+1)/2,E.y=(N.y/Q+1)/2,H.push(E.x,E.y)}q+=G}for(let R=0;R<Z;R++){let B=R*($+1);for(let D=0;D<$;D++){let F=D+B,O=F,L=F+$+1,z=F+$+2,w=F+1;Y.push(O,L,w),Y.push(L,z,w)}}this.setIndex(Y),this.setAttribute("position",new AJ(X,3)),this.setAttribute("normal",new AJ(U,3)),this.setAttribute("uv",new AJ(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new p8(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}function U8(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(PZ(W))if(W.isRenderTargetTexture)w0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(PZ(W[0])){let K=[];for(let Y=0,X=W.length;Y<X;Y++)K[Y]=W[Y].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function jJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=U8(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function PZ(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function DY(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function D$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return d0.workingColorSpace}var xW={clone:U8,merge:jJ},FY=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RY=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class eJ extends X8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=FY,this.fragmentShader=RY,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=U8(J.uniforms),this.uniformsGroups=DY(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}}class F$ extends eJ{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class uJ extends X8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new m0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new m0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new u0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new w9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class R$ extends X8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class _$ extends X8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function u7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class H8{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let Y=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===Y)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let Y=Q[1];if(J<Y)$=2,W=Y;for(let X=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===X)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let Y=$+K>>>1;if(J<Q[Y])K=Y;else $=Y+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class O$ extends H8{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,Y=Z[W],X=Z[K];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,Y=2*Q-$;break;case 2402:W=Z.length-2,Y=Q+Z[W]-Z[W+1];break;default:W=J,Y=$}if(X===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,X=2*$-Q;break;case 2402:K=1,X=$+Z[1]-Z[0];break;default:K=J-1,X=Q}let U=($-Q)*0.5,H=this.valueSize;this._weightPrev=U/(Q-Y),this._weightNext=U/(X-$),this._offsetPrev=W*H,this._offsetNext=K*H}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,U=X-Y,H=this._offsetPrev,q=this._offsetNext,G=this._weightPrev,N=this._weightNext,E=($-Q)/(Z-Q),R=E*E,B=R*E,D=-G*B+2*G*R-G*E,F=(1+G)*B+(-1.5-2*G)*R+(-0.5+G)*E+1,O=(-1-N)*B+(1.5+N)*R+0.5*E,L=N*B-N*R;for(let z=0;z!==Y;++z)W[z]=D*K[H+z]+F*K[U+z]+O*K[X+z]+L*K[q+z];return W}}class M$ extends H8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,U=X-Y,H=($-Q)/(Z-Q),q=1-H;for(let G=0;G!==Y;++G)W[G]=K[U+G]*q+K[X+G]*H;return W}}class V$ extends H8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class L$ extends H8{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,U=X-Y,H=this.settings||this.DefaultSettings_,q=H.inTangents,G=H.outTangents;if(!q||!G){let R=($-Q)/(Z-Q),B=1-R;for(let D=0;D!==Y;++D)W[D]=K[U+D]*B+K[X+D]*R;return W}let N=Y*2,E=J-1;for(let R=0;R!==Y;++R){let B=K[U+R],D=K[X+R],F=E*N+R*2,O=G[F],L=G[F+1],z=J*N+R*2,w=q[z],P=q[z+1],C=($-Q)/(Z-Q),V,k,d,A,m;for(let c=0;c<8;c++){V=C*C,k=V*C,d=1-C,A=d*d,m=A*d;let l=m*Q+3*A*C*O+3*d*V*w+k*Z-$;if(Math.abs(l)<0.0000000001)break;let b=3*A*(O-Q)+6*d*C*(w-O)+3*V*(Z-w);if(Math.abs(b)<0.0000000001)break;C=C-l/b,C=Math.max(0,Math.min(1,C))}W[R]=m*B+3*A*C*L+3*d*V*P+k*D}return W}}class J9{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=u7(Q,this.TimeBufferType),this.values=u7($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:u7(J.times,Array),values:u7(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new V$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new M$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new O$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new L$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.settings=this.settings;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return w0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let Y=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*Y,K*Y)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)P0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)P0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let Y=0;Y!==W;Y++){let X=$[Y];if(typeof X==="number"&&isNaN(X)){P0("KeyframeTrack: Time is not a valid number.",this,Y,X),J=!1;break}if(K!==null&&K>X){P0("KeyframeTrack: Out of order keys.",this,Y,X,K),J=!1;break}K=X}if(Z!==void 0){if(iK(Z))for(let Y=0,X=Z.length;Y!==X;++Y){let U=Z[Y];if(isNaN(U)){P0("KeyframeTrack: Value is not a valid number.",this,Y,U),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let Y=1;Y<W;++Y){let X=!1,U=J[Y],H=J[Y+1];if(U!==H&&(Y!==1||U!==J[0]))if(!Z){let q=Y*$,G=q-$,N=q+$;for(let E=0;E!==$;++E){let R=Q[q+E];if(R!==Q[G+E]||R!==Q[N+E]){X=!0;break}}}else X=!0;if(X){if(Y!==K){J[K]=J[Y];let q=Y*$,G=K*$;for(let N=0;N!==$;++N)Q[G+N]=Q[q+N]}++K}}if(W>0){J[K]=J[W];for(let Y=W*$,X=K*$,U=0;U!==$;++U)Q[X+U]=Q[Y+U];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}J9.prototype.ValueTypeName="";J9.prototype.TimeBufferType=Float32Array;J9.prototype.ValueBufferType=Float32Array;J9.prototype.DefaultInterpolation=2301;class G8 extends J9{constructor(J,Q,$){super(J,Q,$)}}G8.prototype.ValueTypeName="bool";G8.prototype.ValueBufferType=Array;G8.prototype.DefaultInterpolation=2300;G8.prototype.InterpolantFactoryMethodLinear=void 0;G8.prototype.InterpolantFactoryMethodSmooth=void 0;class B$ extends J9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}B$.prototype.ValueTypeName="color";class z$ extends J9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}z$.prototype.ValueTypeName="number";class I$ extends H8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=($-Q)/(Z-Q),U=J*Y;for(let H=U+Y;U!==H;U+=4)j9.slerpFlat(W,0,K,U-Y,K,U,X);return W}}class R6 extends J9{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new I$(this.times,this.values,this.getValueSize(),J)}}R6.prototype.ValueTypeName="quaternion";R6.prototype.InterpolantFactoryMethodSmooth=void 0;class N8 extends J9{constructor(J,Q,$){super(J,Q,$)}}N8.prototype.ValueTypeName="string";N8.prototype.ValueBufferType=Array;N8.prototype.DefaultInterpolation=2300;N8.prototype.InterpolantFactoryMethodLinear=void 0;N8.prototype.InterpolantFactoryMethodSmooth=void 0;class k$ extends J9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}k$.prototype.ValueTypeName="vector";var s7={enabled:!1,files:{},add:function(J,Q){if(this.enabled===!1)return;if(wZ(J))return;this.files[J]=Q},get:function(J){if(this.enabled===!1)return;if(wZ(J))return;return this.files[J]},remove:function(J){delete this.files[J]},clear:function(){this.files={}}};function wZ(J){try{let Q=J.slice(J.indexOf(":")+1);return new URL(Q).protocol==="blob:"}catch(Q){return!1}}class A${constructor(J,Q,$){let Z=this,W=!1,K=0,Y=0,X=void 0,U=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(H){if(Y++,W===!1){if(Z.onStart!==void 0)Z.onStart(H,K,Y)}W=!0},this.itemEnd=function(H){if(K++,Z.onProgress!==void 0)Z.onProgress(H,K,Y);if(K===Y){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(H){if(Z.onError!==void 0)Z.onError(H)},this.resolveURL=function(H){if(X)return X(H);return H},this.setURLModifier=function(H){return X=H,this},this.addHandler=function(H,q){return U.push(H,q),this},this.removeHandler=function(H){let q=U.indexOf(H);if(q!==-1)U.splice(q,2);return this},this.getHandler=function(H){for(let q=0,G=U.length;q<G;q+=2){let N=U[q],E=U[q+1];if(N.global)N.lastIndex=0;if(N.test(H))return E}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var hW=new A$;class N7{constructor(J){if(this.manager=J!==void 0?J:hW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}N7.DEFAULT_MATERIAL_NAME="__DEFAULT";var w8=new WeakMap;class P$ extends N7{constructor(J){super(J)}load(J,Q,$,Z){if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,K=s7.get(`image:${J}`);if(K!==void 0){if(K.complete===!0)W.manager.itemStart(J),setTimeout(function(){if(Q)Q(K);W.manager.itemEnd(J)},0);else{let q=w8.get(K);if(q===void 0)q=[],w8.set(K,q);q.push({onLoad:Q,onError:Z})}return K}let Y=j8("img");function X(){if(H(),Q)Q(this);let q=w8.get(this)||[];for(let G=0;G<q.length;G++){let N=q[G];if(N.onLoad)N.onLoad(this)}w8.delete(this),W.manager.itemEnd(J)}function U(q){if(H(),Z)Z(q);s7.remove(`image:${J}`);let G=w8.get(this)||[];for(let N=0;N<G.length;N++){let E=G[N];if(E.onError)E.onError(q)}w8.delete(this),W.manager.itemError(J),W.manager.itemEnd(J)}function H(){Y.removeEventListener("load",X,!1),Y.removeEventListener("error",U,!1)}if(Y.addEventListener("load",X,!1),Y.addEventListener("error",U,!1),J.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)Y.crossOrigin=this.crossOrigin}return s7.add(`image:${J}`,Y),W.manager.itemStart(J),Y.src=J,Y}}class _6 extends N7{constructor(J){super(J)}load(J,Q,$,Z){let W=new kJ,K=new P$(this.manager);return K.setCrossOrigin(this.crossOrigin),K.setPath(this.path),K.load(J,function(Y){if(W.image=Y,W.needsUpdate=!0,Q!==void 0)Q(W)},$,Z),W}}class q7 extends zJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new m0(J),this.intensity=Q}dispose(){this.dispatchEvent({type:"dispose"})}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class O6 extends q7{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(zJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new m0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var XQ=new NJ,CZ=new f,TZ=new f;class bW{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new u0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new NJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new G7,this._frameExtents=new u0(1,1),this._viewportCount=1,this._viewports=[new EJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera,$=this.matrix;if(CZ.setFromMatrixPosition(J.matrixWorld),Q.position.copy(CZ),TZ.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(TZ),Q.updateMatrixWorld(),XQ.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(XQ,Q.coordinateSystem,Q.reversedDepth),Q.coordinateSystem===2001||Q.reversedDepth)$.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else $.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);$.multiply(XQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.intensity!==1)J.intensity=this.intensity;if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var c7=new f,n7=new j9,D9=new f;class M6 extends zJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new NJ,this.projectionMatrix=new NJ,this.projectionMatrixInverse=new NJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(c7,n7,D9),D9.x===1&&D9.y===1&&D9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(c7,n7,D9.set(1,1,1)).invert()}updateWorldMatrix(J,Q){if(super.updateWorldMatrix(J,Q),this.matrixWorld.decompose(c7,n7,D9),D9.x===1&&D9.y===1&&D9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(c7,n7,D9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var d9=new f,SZ=new u0,jZ=new u0;class vJ extends M6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=o7*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(b6*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return o7*2*Math.atan(Math.tan(b6*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){d9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(d9.x,d9.y).multiplyScalar(-J/d9.z),d9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(d9.x,d9.y).multiplyScalar(-J/d9.z)}getViewSize(J,Q){return this.getViewBounds(J,SZ,jZ),Q.subVectors(jZ,SZ)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(b6*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:X,fullHeight:U}=K;W+=K.offsetX*Z/X,Q-=K.offsetY*$/U,Z*=K.width/X,$*=K.height/U}let Y=this.filmOffset;if(Y!==0)W+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class E7 extends M6{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,Y=Z+Q,X=Z-Q;if(this.view!==null&&this.view.enabled){let U=(this.right-this.left)/this.view.fullWidth/this.zoom,H=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=U*this.view.offsetX,K=W+U*this.view.width,Y-=H*this.view.offsetY,X=Y-H*this.view.height}this.projectionMatrix.makeOrthographic(W,K,Y,X,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class gW extends bW{constructor(){super(new E7(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class V6 extends q7{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zJ.DEFAULT_UP),this.updateMatrix(),this.target=new zJ,this.shadow=new gW}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class L6 extends q7{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var C8=-90,T8=1;class w$ extends zJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new vJ(C8,T8,J,Q);Z.layers=this.layers,this.add(Z);let W=new vJ(C8,T8,J,Q);W.layers=this.layers,this.add(W);let K=new vJ(C8,T8,J,Q);K.layers=this.layers,this.add(K);let Y=new vJ(C8,T8,J,Q);Y.layers=this.layers,this.add(Y);let X=new vJ(C8,T8,J,Q);X.layers=this.layers,this.add(X);let U=new vJ(C8,T8,J,Q);U.layers=this.layers,this.add(U)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,Y,X]=Q;for(let U of Q)this.remove(U);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),X.up.set(0,1,0),X.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),X.up.set(0,-1,0),X.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let U of Q)this.add(U),U.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,Y,X,U,H]=this.children,q=J.getRenderTarget(),G=J.getActiveCubeFace(),N=J.getActiveMipmapLevel(),E=J.xr.enabled;J.xr.enabled=!1;let R=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let B=!1;if(J.isWebGLRenderer===!0)B=J.state.buffers.depth.getReversed();else B=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,3,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),J.setRenderTarget($,4,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,U),$.texture.generateMipmaps=R,J.setRenderTarget($,5,Z),B&&J.autoClear===!1)J.clearDepth();J.render(Q,H),J.setRenderTarget(q,G,N),J.xr.enabled=E,$.texture.needsPMREMUpdate=!0}}class C$ extends vJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var T$="\\[\\]\\.:\\/",_Y=new RegExp("["+T$+"]","g"),S$="[^"+T$+"]",OY="[^"+T$.replace("\\.","")+"]",MY=/((?:WC+[\/:])*)/.source.replace("WC",S$),VY=/(WCOD+)?/.source.replace("WCOD",OY),LY=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",S$),BY=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",S$),zY=new RegExp("^"+MY+VY+LY+BY+"$"),IY=["material","materials","bones","map"];class pW{constructor(J,Q,$){let Z=$||t0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class t0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||t0.parseTrackName(Q),this.node=t0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new t0(J,Q,$);else return new t0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(_Y,"")}static parseTrackName(J){let Q=zY.exec(J);if(Q===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(IY.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let Y=W[K];if(Y.name===Q||Y.uuid===Q)return Y;let X=$(Y.children);if(X)return X}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=t0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){w0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let U=Q.objectIndex;switch($){case"materials":if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){P0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){P0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let H=0;H<J.length;H++)if(J[H].name===U){U=H;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){P0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){P0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(U!==void 0){if(J[U]===void 0){P0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[U]}}let K=J[Z];if(K===void 0){let U=Q.nodeName;P0("PropertyBinding: Trying to update property for track: "+U+"."+Z+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)Y=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)Y=this.Versioning.MatrixWorldNeedsUpdate;let X=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}X=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)X=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))X=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[X],this.setValue=this.SetterByBindingTypeAndVersioning[X][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}t0.Composite=pW;t0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};t0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};t0.prototype.GetterByBindingType=[t0.prototype._getValue_direct,t0.prototype._getValue_array,t0.prototype._getValue_arrayElement,t0.prototype._getValue_toArray];t0.prototype.SetterByBindingTypeAndVersioning=[[t0.prototype._setValue_direct,t0.prototype._setValue_direct_setNeedsUpdate,t0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[t0.prototype._setValue_array,t0.prototype._setValue_array_setNeedsUpdate,t0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[t0.prototype._setValue_arrayElement,t0.prototype._setValue_arrayElement_setNeedsUpdate,t0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[t0.prototype._setValue_fromArray,t0.prototype._setValue_fromArray_setNeedsUpdate,t0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var j5=new Float32Array(1);var yZ=new NJ;class B6{constructor(J,Q,$=0,Z=1/0){this.ray=new E6(J,Q),this.near=$,this.far=Z,this.camera=null,this.layers=new Y7,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,Q){this.ray.set(J,Q)}setFromCamera(J,Q){if(Q.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(Q.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject(Q).sub(this.ray.origin).normalize(),this.camera=Q;else if(Q.isOrthographicCamera)this.ray.origin.set(J.x,J.y,(Q.near+Q.far)/(Q.near-Q.far)).unproject(Q),this.ray.direction.set(0,0,-1).transformDirection(Q.matrixWorld),this.camera=Q;else P0("Raycaster: Unsupported camera type: "+Q.type)}setFromXRController(J){return yZ.identity().extractRotation(J.matrixWorld),this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yZ),this}intersectObject(J,Q=!0,$=[]){return UQ(J,this,$,Q),$.sort(vZ),$}intersectObjects(J,Q=!0,$=[]){for(let Z=0,W=J.length;Z<W;Z++)UQ(J[Z],this,$,Q);return $.sort(vZ),$}}function vZ(J,Q){return J.distance-Q.distance}function UQ(J,Q,$,Z){let W=!0;if(J.layers.test(Q.layers)){if(J.raycast(Q,$)===!1)W=!1}if(W===!0&&Z===!0){let K=J.children;for(let Y=0,X=K.length;Y<X;Y++)UQ(K[Y],Q,$,!0)}}class j${static{j$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}function y$(J,Q,$,Z){let W=kY(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function kY(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));if(typeof window<"u")if(window.__THREE__)w0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="184";function HK(){let J=null,Q=!1,$=null,Z=null;function W(K,Y){$(K,Y),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function AY(J){let Q=new WeakMap;function $(X,U){let{array:H,usage:q}=X,G=H.byteLength,N=J.createBuffer();J.bindBuffer(U,N),J.bufferData(U,H,q),X.onUploadCallback();let E;if(H instanceof Float32Array)E=J.FLOAT;else if(typeof Float16Array<"u"&&H instanceof Float16Array)E=J.HALF_FLOAT;else if(H instanceof Uint16Array)if(X.isFloat16BufferAttribute)E=J.HALF_FLOAT;else E=J.UNSIGNED_SHORT;else if(H instanceof Int16Array)E=J.SHORT;else if(H instanceof Uint32Array)E=J.UNSIGNED_INT;else if(H instanceof Int32Array)E=J.INT;else if(H instanceof Int8Array)E=J.BYTE;else if(H instanceof Uint8Array)E=J.UNSIGNED_BYTE;else if(H instanceof Uint8ClampedArray)E=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+H);return{buffer:N,type:E,bytesPerElement:H.BYTES_PER_ELEMENT,version:X.version,size:G}}function Z(X,U,H){let{array:q,updateRanges:G}=U;if(J.bindBuffer(H,X),G.length===0)J.bufferSubData(H,0,q);else{G.sort((E,R)=>E.start-R.start);let N=0;for(let E=1;E<G.length;E++){let R=G[N],B=G[E];if(B.start<=R.start+R.count+1)R.count=Math.max(R.count,B.start+B.count-R.start);else++N,G[N]=B}G.length=N+1;for(let E=0,R=G.length;E<R;E++){let B=G[E];J.bufferSubData(H,B.start*q.BYTES_PER_ELEMENT,q,B.start,B.count)}U.clearUpdateRanges()}U.onUploadCallback()}function W(X){if(X.isInterleavedBufferAttribute)X=X.data;return Q.get(X)}function K(X){if(X.isInterleavedBufferAttribute)X=X.data;let U=Q.get(X);if(U)J.deleteBuffer(U.buffer),Q.delete(X)}function Y(X,U){if(X.isInterleavedBufferAttribute)X=X.data;if(X.isGLBufferAttribute){let q=Q.get(X);if(!q||q.version<X.version)Q.set(X,{buffer:X.buffer,type:X.type,bytesPerElement:X.elementSize,version:X.version});return}let H=Q.get(X);if(H===void 0)Q.set(X,$(X,U));else if(H.version<X.version){if(H.size!==X.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(H.buffer,X,U),H.version=X.version}}return{get:W,remove:K,update:Y}}var PY=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wY=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,CY=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,TY=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SY=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jY=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yY=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vY=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fY=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,xY=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hY=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bY=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gY=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pY=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mY=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lY=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dY=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uY=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cY=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,iY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,oY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,aY=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rY=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tY=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,eY=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$X=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ZX="gl_FragColor = linearToOutputTexel( gl_FragColor );",WX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,KX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,YX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,XX=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,UX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,HX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,GX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,EX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,DX=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,FX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_X=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,OX=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,MX=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,VX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LX=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zX=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,IX=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kX=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,AX=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,PX=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wX=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,CX=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,TX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,SX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hX=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pX=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mX=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lX=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dX=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,uX=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cX=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nX=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aX=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,JU=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,QU=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$U=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ZU=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,WU=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,KU=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,YU=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,XU=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,UU=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,HU=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,GU=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,NU=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qU=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,EU=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,DU=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,FU=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,RU=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_U=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,OU=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,MU=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,VU=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,LU=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,BU=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,IU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,AU=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,PU=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wU=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TU=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jU=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vU=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,fU=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,xU=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,hU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bU=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gU=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pU=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mU=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lU=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dU=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uU=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cU=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nU=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sU=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iU=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,oU=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aU=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rU=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tU=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eU=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JH=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QH=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$H=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZH=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,WH=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KH=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,YH=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,x0={alphahash_fragment:PY,alphahash_pars_fragment:wY,alphamap_fragment:CY,alphamap_pars_fragment:TY,alphatest_fragment:SY,alphatest_pars_fragment:jY,aomap_fragment:yY,aomap_pars_fragment:vY,batching_pars_vertex:fY,batching_vertex:xY,begin_vertex:hY,beginnormal_vertex:bY,bsdfs:gY,iridescence_fragment:pY,bumpmap_pars_fragment:mY,clipping_planes_fragment:lY,clipping_planes_pars_fragment:dY,clipping_planes_pars_vertex:uY,clipping_planes_vertex:cY,color_fragment:nY,color_pars_fragment:sY,color_pars_vertex:iY,color_vertex:oY,common:aY,cube_uv_reflection_fragment:rY,defaultnormal_vertex:tY,displacementmap_pars_vertex:eY,displacementmap_vertex:JX,emissivemap_fragment:QX,emissivemap_pars_fragment:$X,colorspace_fragment:ZX,colorspace_pars_fragment:WX,envmap_fragment:KX,envmap_common_pars_fragment:YX,envmap_pars_fragment:XX,envmap_pars_vertex:UX,envmap_physical_pars_fragment:MX,envmap_vertex:HX,fog_vertex:GX,fog_pars_vertex:NX,fog_fragment:qX,fog_pars_fragment:EX,gradientmap_pars_fragment:DX,lightmap_pars_fragment:FX,lights_lambert_fragment:RX,lights_lambert_pars_fragment:_X,lights_pars_begin:OX,lights_toon_fragment:VX,lights_toon_pars_fragment:LX,lights_phong_fragment:BX,lights_phong_pars_fragment:zX,lights_physical_fragment:IX,lights_physical_pars_fragment:kX,lights_fragment_begin:AX,lights_fragment_maps:PX,lights_fragment_end:wX,lightprobes_pars_fragment:CX,logdepthbuf_fragment:TX,logdepthbuf_pars_fragment:SX,logdepthbuf_pars_vertex:jX,logdepthbuf_vertex:yX,map_fragment:vX,map_pars_fragment:fX,map_particle_fragment:xX,map_particle_pars_fragment:hX,metalnessmap_fragment:bX,metalnessmap_pars_fragment:gX,morphinstance_vertex:pX,morphcolor_vertex:mX,morphnormal_vertex:lX,morphtarget_pars_vertex:dX,morphtarget_vertex:uX,normal_fragment_begin:cX,normal_fragment_maps:nX,normal_pars_fragment:sX,normal_pars_vertex:iX,normal_vertex:oX,normalmap_pars_fragment:aX,clearcoat_normal_fragment_begin:rX,clearcoat_normal_fragment_maps:tX,clearcoat_pars_fragment:eX,iridescence_pars_fragment:JU,opaque_fragment:QU,packing:$U,premultiplied_alpha_fragment:ZU,project_vertex:WU,dithering_fragment:KU,dithering_pars_fragment:YU,roughnessmap_fragment:XU,roughnessmap_pars_fragment:UU,shadowmap_pars_fragment:HU,shadowmap_pars_vertex:GU,shadowmap_vertex:NU,shadowmask_pars_fragment:qU,skinbase_vertex:EU,skinning_pars_vertex:DU,skinning_vertex:FU,skinnormal_vertex:RU,specularmap_fragment:_U,specularmap_pars_fragment:OU,tonemapping_fragment:MU,tonemapping_pars_fragment:VU,transmission_fragment:LU,transmission_pars_fragment:BU,uv_pars_fragment:zU,uv_pars_vertex:IU,uv_vertex:kU,worldpos_vertex:AU,background_vert:PU,background_frag:wU,backgroundCube_vert:CU,backgroundCube_frag:TU,cube_vert:SU,cube_frag:jU,depth_vert:yU,depth_frag:vU,distance_vert:fU,distance_frag:xU,equirect_vert:hU,equirect_frag:bU,linedashed_vert:gU,linedashed_frag:pU,meshbasic_vert:mU,meshbasic_frag:lU,meshlambert_vert:dU,meshlambert_frag:uU,meshmatcap_vert:cU,meshmatcap_frag:nU,meshnormal_vert:sU,meshnormal_frag:iU,meshphong_vert:oU,meshphong_frag:aU,meshphysical_vert:rU,meshphysical_frag:tU,meshtoon_vert:eU,meshtoon_frag:JH,points_vert:QH,points_frag:$H,shadow_vert:ZH,shadow_frag:WH,sprite_vert:KH,sprite_frag:YH},X0={common:{diffuse:{value:new m0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new S0},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new S0}},envmap:{envMap:{value:null},envMapRotation:{value:new S0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new S0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new S0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new S0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new S0},normalScale:{value:new u0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new S0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new S0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new S0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new S0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new m0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new f},probesMax:{value:new f},probesResolution:{value:new f}},points:{diffuse:{value:new m0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0},uvTransform:{value:new S0}},sprite:{diffuse:{value:new m0(16777215)},opacity:{value:1},center:{value:new u0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new S0},alphaMap:{value:null},alphaMapTransform:{value:new S0},alphaTest:{value:0}}},O9={basic:{uniforms:jJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.fog]),vertexShader:x0.meshbasic_vert,fragmentShader:x0.meshbasic_frag},lambert:{uniforms:jJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,X0.lights,{emissive:{value:new m0(0)},envMapIntensity:{value:1}}]),vertexShader:x0.meshlambert_vert,fragmentShader:x0.meshlambert_frag},phong:{uniforms:jJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,X0.lights,{emissive:{value:new m0(0)},specular:{value:new m0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:x0.meshphong_vert,fragmentShader:x0.meshphong_frag},standard:{uniforms:jJ([X0.common,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.roughnessmap,X0.metalnessmap,X0.fog,X0.lights,{emissive:{value:new m0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:x0.meshphysical_vert,fragmentShader:x0.meshphysical_frag},toon:{uniforms:jJ([X0.common,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.gradientmap,X0.fog,X0.lights,{emissive:{value:new m0(0)}}]),vertexShader:x0.meshtoon_vert,fragmentShader:x0.meshtoon_frag},matcap:{uniforms:jJ([X0.common,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,{matcap:{value:null}}]),vertexShader:x0.meshmatcap_vert,fragmentShader:x0.meshmatcap_frag},points:{uniforms:jJ([X0.points,X0.fog]),vertexShader:x0.points_vert,fragmentShader:x0.points_frag},dashed:{uniforms:jJ([X0.common,X0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:x0.linedashed_vert,fragmentShader:x0.linedashed_frag},depth:{uniforms:jJ([X0.common,X0.displacementmap]),vertexShader:x0.depth_vert,fragmentShader:x0.depth_frag},normal:{uniforms:jJ([X0.common,X0.bumpmap,X0.normalmap,X0.displacementmap,{opacity:{value:1}}]),vertexShader:x0.meshnormal_vert,fragmentShader:x0.meshnormal_frag},sprite:{uniforms:jJ([X0.sprite,X0.fog]),vertexShader:x0.sprite_vert,fragmentShader:x0.sprite_frag},background:{uniforms:{uvTransform:{value:new S0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:x0.background_vert,fragmentShader:x0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new S0}},vertexShader:x0.backgroundCube_vert,fragmentShader:x0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:x0.cube_vert,fragmentShader:x0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:x0.equirect_vert,fragmentShader:x0.equirect_frag},distance:{uniforms:jJ([X0.common,X0.displacementmap,{referencePosition:{value:new f},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:x0.distance_vert,fragmentShader:x0.distance_frag},shadow:{uniforms:jJ([X0.lights,X0.fog,{color:{value:new m0(0)},opacity:{value:1}}]),vertexShader:x0.shadow_vert,fragmentShader:x0.shadow_frag}};O9.physical={uniforms:jJ([O9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new S0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new S0},clearcoatNormalScale:{value:new u0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new S0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new S0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new S0},sheen:{value:0},sheenColor:{value:new m0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new S0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new S0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new S0},transmissionSamplerSize:{value:new u0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new S0},attenuationDistance:{value:0},attenuationColor:{value:new m0(0)},specularColor:{value:new m0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new S0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new S0},anisotropyVector:{value:new u0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new S0}}]),vertexShader:x0.meshphysical_vert,fragmentShader:x0.meshphysical_frag};var z6={r:0,b:0,g:0},XH=new NJ,GK=new S0;GK.set(-1,0,0,0,1,0,0,0,1);function UH(J,Q,$,Z,W,K){let Y=new m0(0),X=W===!0?0:1,U,H,q=null,G=0,N=null;function E(O){let L=O.isScene===!0?O.background:null;if(L&&L.isTexture){let z=O.backgroundBlurriness>0;L=Q.get(L,z)}return L}function R(O){let L=!1,z=E(O);if(z===null)D(Y,X);else if(z&&z.isColor)D(z,1),L=!0;let w=J.xr.getEnvironmentBlendMode();if(w==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(w==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||L)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function B(O,L){let z=E(L);if(z&&(z.isCubeTexture||z.mapping===J7)){if(H===void 0)H=new HJ(new gJ(1,1,1),new eJ({name:"BackgroundCubeMaterial",uniforms:U8(O9.backgroundCube.uniforms),vertexShader:O9.backgroundCube.vertexShader,fragmentShader:O9.backgroundCube.fragmentShader,side:hJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),H.geometry.deleteAttribute("normal"),H.geometry.deleteAttribute("uv"),H.onBeforeRender=function(w,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(H.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(H);if(H.material.uniforms.envMap.value=z,H.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,H.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,H.material.uniforms.backgroundRotation.value.setFromMatrix4(XH.makeRotationFromEuler(L.backgroundRotation)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1)H.material.uniforms.backgroundRotation.value.premultiply(GK);if(H.material.toneMapped=d0.getTransfer(z.colorSpace)!==KJ,q!==z||G!==z.version||N!==J.toneMapping)H.material.needsUpdate=!0,q=z,G=z.version,N=J.toneMapping;H.layers.enableAll(),O.unshift(H,H.geometry,H.material,0,0,null)}else if(z&&z.isTexture){if(U===void 0)U=new HJ(new v9(2,2),new eJ({name:"BackgroundMaterial",uniforms:U8(O9.background.uniforms),vertexShader:O9.background.vertexShader,fragmentShader:O9.background.fragmentShader,side:f8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),Object.defineProperty(U.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(U);if(U.material.uniforms.t2D.value=z,U.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,U.material.toneMapped=d0.getTransfer(z.colorSpace)!==KJ,z.matrixAutoUpdate===!0)z.updateMatrix();if(U.material.uniforms.uvTransform.value.copy(z.matrix),q!==z||G!==z.version||N!==J.toneMapping)U.material.needsUpdate=!0,q=z,G=z.version,N=J.toneMapping;U.layers.enableAll(),O.unshift(U,U.geometry,U.material,0,0,null)}}function D(O,L){O.getRGB(z6,D$(J)),$.buffers.color.setClear(z6.r,z6.g,z6.b,L,K)}function F(){if(H!==void 0)H.geometry.dispose(),H.material.dispose(),H=void 0;if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0}return{getClearColor:function(){return Y},setClearColor:function(O,L=1){Y.set(O),X=L,D(Y,X)},getClearAlpha:function(){return X},setClearAlpha:function(O){X=O,D(Y,X)},render:R,addToRenderList:B,dispose:F}}function HH(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=N(null),K=W,Y=!1;function X(A,m,c,y,l){let b=!1,p=G(A,y,c,m);if(K!==p)K=p,H(K.object);if(b=E(A,y,c,l),b)R(A,y,c,l);if(l!==null)Q.update(l,J.ELEMENT_ARRAY_BUFFER);if(b||Y){if(Y=!1,z(A,m,c,y),l!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(l).buffer)}}function U(){return J.createVertexArray()}function H(A){return J.bindVertexArray(A)}function q(A){return J.deleteVertexArray(A)}function G(A,m,c,y){let l=y.wireframe===!0,b=Z[m.id];if(b===void 0)b={},Z[m.id]=b;let p=A.isInstancedMesh===!0?A.id:0,a=b[p];if(a===void 0)a={},b[p]=a;let Q0=a[c.id];if(Q0===void 0)Q0={},a[c.id]=Q0;let E0=Q0[l];if(E0===void 0)E0=N(U()),Q0[l]=E0;return E0}function N(A){let m=[],c=[],y=[];for(let l=0;l<$;l++)m[l]=0,c[l]=0,y[l]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:c,attributeDivisors:y,object:A,attributes:{},index:null}}function E(A,m,c,y){let l=K.attributes,b=m.attributes,p=0,a=c.getAttributes();for(let Q0 in a)if(a[Q0].location>=0){let I0=l[Q0],O0=b[Q0];if(O0===void 0){if(Q0==="instanceMatrix"&&A.instanceMatrix)O0=A.instanceMatrix;if(Q0==="instanceColor"&&A.instanceColor)O0=A.instanceColor}if(I0===void 0)return!0;if(I0.attribute!==O0)return!0;if(O0&&I0.data!==O0.data)return!0;p++}if(K.attributesNum!==p)return!0;if(K.index!==y)return!0;return!1}function R(A,m,c,y){let l={},b=m.attributes,p=0,a=c.getAttributes();for(let Q0 in a)if(a[Q0].location>=0){let I0=b[Q0];if(I0===void 0){if(Q0==="instanceMatrix"&&A.instanceMatrix)I0=A.instanceMatrix;if(Q0==="instanceColor"&&A.instanceColor)I0=A.instanceColor}let O0={};if(O0.attribute=I0,I0&&I0.data)O0.data=I0.data;l[Q0]=O0,p++}K.attributes=l,K.attributesNum=p,K.index=y}function B(){let A=K.newAttributes;for(let m=0,c=A.length;m<c;m++)A[m]=0}function D(A){F(A,0)}function F(A,m){let{newAttributes:c,enabledAttributes:y,attributeDivisors:l}=K;if(c[A]=1,y[A]===0)J.enableVertexAttribArray(A),y[A]=1;if(l[A]!==m)J.vertexAttribDivisor(A,m),l[A]=m}function O(){let{newAttributes:A,enabledAttributes:m}=K;for(let c=0,y=m.length;c<y;c++)if(m[c]!==A[c])J.disableVertexAttribArray(c),m[c]=0}function L(A,m,c,y,l,b,p){if(p===!0)J.vertexAttribIPointer(A,m,c,l,b);else J.vertexAttribPointer(A,m,c,y,l,b)}function z(A,m,c,y){B();let l=y.attributes,b=c.getAttributes(),p=m.defaultAttributeValues;for(let a in b){let Q0=b[a];if(Q0.location>=0){let E0=l[a];if(E0===void 0){if(a==="instanceMatrix"&&A.instanceMatrix)E0=A.instanceMatrix;if(a==="instanceColor"&&A.instanceColor)E0=A.instanceColor}if(E0!==void 0){let{normalized:I0,itemSize:O0}=E0,r0=Q.get(E0);if(r0===void 0)continue;let{buffer:p0,type:s,bytesPerElement:N0}=r0,V0=s===J.INT||s===J.UNSIGNED_INT||E0.gpuType===LQ;if(E0.isInterleavedBufferAttribute){let q0=E0.data,k0=q0.stride,a0=E0.offset;if(q0.isInstancedInterleavedBuffer){for(let h0=0;h0<Q0.locationSize;h0++)F(Q0.location+h0,q0.meshPerAttribute);if(A.isInstancedMesh!==!0&&y._maxInstanceCount===void 0)y._maxInstanceCount=q0.meshPerAttribute*q0.count}else for(let h0=0;h0<Q0.locationSize;h0++)D(Q0.location+h0);J.bindBuffer(J.ARRAY_BUFFER,p0);for(let h0=0;h0<Q0.locationSize;h0++)L(Q0.location+h0,O0/Q0.locationSize,s,I0,k0*N0,(a0+O0/Q0.locationSize*h0)*N0,V0)}else{if(E0.isInstancedBufferAttribute){for(let q0=0;q0<Q0.locationSize;q0++)F(Q0.location+q0,E0.meshPerAttribute);if(A.isInstancedMesh!==!0&&y._maxInstanceCount===void 0)y._maxInstanceCount=E0.meshPerAttribute*E0.count}else for(let q0=0;q0<Q0.locationSize;q0++)D(Q0.location+q0);J.bindBuffer(J.ARRAY_BUFFER,p0);for(let q0=0;q0<Q0.locationSize;q0++)L(Q0.location+q0,O0/Q0.locationSize,s,I0,O0*N0,O0/Q0.locationSize*q0*N0,V0)}}else if(p!==void 0){let I0=p[a];if(I0!==void 0)switch(I0.length){case 2:J.vertexAttrib2fv(Q0.location,I0);break;case 3:J.vertexAttrib3fv(Q0.location,I0);break;case 4:J.vertexAttrib4fv(Q0.location,I0);break;default:J.vertexAttrib1fv(Q0.location,I0)}}}}O()}function w(){k();for(let A in Z){let m=Z[A];for(let c in m){let y=m[c];for(let l in y){let b=y[l];for(let p in b)q(b[p].object),delete b[p];delete y[l]}}delete Z[A]}}function P(A){if(Z[A.id]===void 0)return;let m=Z[A.id];for(let c in m){let y=m[c];for(let l in y){let b=y[l];for(let p in b)q(b[p].object),delete b[p];delete y[l]}}delete Z[A.id]}function C(A){for(let m in Z){let c=Z[m];for(let y in c){let l=c[y];if(l[A.id]===void 0)continue;let b=l[A.id];for(let p in b)q(b[p].object),delete b[p];delete l[A.id]}}}function V(A){for(let m in Z){let c=Z[m],y=A.isInstancedMesh===!0?A.id:0,l=c[y];if(l===void 0)continue;for(let b in l){let p=l[b];for(let a in p)q(p[a].object),delete p[a];delete l[b]}if(delete c[y],Object.keys(c).length===0)delete Z[m]}}function k(){if(d(),Y=!0,K===W)return;K=W,H(K.object)}function d(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:X,reset:k,resetDefaultState:d,dispose:w,releaseStatesOfGeometry:P,releaseStatesOfObject:V,releaseStatesOfProgram:C,initAttributes:B,enableAttribute:D,disableUnusedAttributes:O}}function GH(J,Q,$){let Z;function W(U){Z=U}function K(U,H){J.drawArrays(Z,U,H),$.update(H,Z,1)}function Y(U,H,q){if(q===0)return;J.drawArraysInstanced(Z,U,H,q),$.update(H,Z,q)}function X(U,H,q){if(q===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,U,0,H,0,q);let N=0;for(let E=0;E<q;E++)N+=H[E];$.update(N,Z,1)}this.setMode=W,this.render=K,this.renderInstances=Y,this.renderMultiDraw=X}function NH(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let C=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function Y(C){if(C!==R9&&Z.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function X(C){let V=C===T9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(C!==U9&&Z.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==C9&&!V)return!1;return!0}function U(C){if(C==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";C="mediump"}if(C==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let H=$.precision!==void 0?$.precision:"highp",q=U(H);if(q!==H)w0("WebGLRenderer:",H,"not supported, using",q,"instead."),H=q;let G=$.logarithmicDepthBuffer===!0,N=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&N===!1)w0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let E=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),B=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),F=J.getParameter(J.MAX_VERTEX_ATTRIBS),O=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),L=J.getParameter(J.MAX_VARYING_VECTORS),z=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),w=J.getParameter(J.MAX_SAMPLES),P=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:U,textureFormatReadable:Y,textureTypeReadable:X,precision:H,logarithmicDepthBuffer:G,reversedDepthBuffer:N,maxTextures:E,maxVertexTextures:R,maxTextureSize:B,maxCubemapSize:D,maxAttributes:F,maxVertexUniforms:O,maxVaryings:L,maxFragmentUniforms:z,maxSamples:w,samples:P}}function qH(J){let Q=this,$=null,Z=0,W=!1,K=!1,Y=new A9,X=new S0,U={value:null,needsUpdate:!1};this.uniform=U,this.numPlanes=0,this.numIntersection=0,this.init=function(G,N){let E=G.length!==0||N||Z!==0||W;return W=N,Z=G.length,E},this.beginShadows=function(){K=!0,q(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(G,N){$=q(G,N,0)},this.setState=function(G,N,E){let{clippingPlanes:R,clipIntersection:B,clipShadows:D}=G,F=J.get(G);if(!W||R===null||R.length===0||K&&!D)if(K)q(null);else H();else{let O=K?0:Z,L=O*4,z=F.clippingState||null;U.value=z,z=q(R,N,L,E);for(let w=0;w!==L;++w)z[w]=$[w];F.clippingState=z,this.numIntersection=B?this.numPlanes:0,this.numPlanes+=O}};function H(){if(U.value!==$)U.value=$,U.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function q(G,N,E,R){let B=G!==null?G.length:0,D=null;if(B!==0){if(D=U.value,R!==!0||D===null){let F=E+B*4,O=N.matrixWorldInverse;if(X.getNormalMatrix(O),D===null||D.length<F)D=new Float32Array(F);for(let L=0,z=E;L!==B;++L,z+=4)Y.copy(G[L]).applyMatrix4(O,X),Y.normal.toArray(D,z),D[z+3]=Y.constant}U.value=D,U.needsUpdate=!0}return Q.numPlanes=B,Q.numIntersection=0,D}}var s9=4,mW=[0.125,0.215,0.35,0.446,0.526,0.582],q8=20,EH=256,D7=new E7,lW=new m0,v$=null,f$=0,x$=0,h$=!1,DH=new f;class p${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:Y=DH}=W;v$=this._renderer.getRenderTarget(),f$=this._renderer.getActiveCubeFace(),x$=this._renderer.getActiveMipmapLevel(),h$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let X=this._allocateTargets();if(X.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,X,Y),Q>0)this._blur(X,0,0,Q);return this._applyPMREM(X),this._cleanup(X),X}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=cW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=uW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(v$,f$,x$),this._renderer.xr.enabled=h$,J.scissorTest=!1,m8(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===h8||J.mapping===J8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);v$=this._renderer.getRenderTarget(),f$=this._renderer.getActiveCubeFace(),x$=this._renderer.getActiveMipmapLevel(),h$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:bJ,minFilter:bJ,generateMipmaps:!1,type:T9,format:R9,colorSpace:W$,depthBuffer:!1},Z=dW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=dW(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=FH(W)),this._blurMaterial=_H(W,J,Q),this._ggxMaterial=RH(W,J,Q)}return Z}_compileMaterial(J){let Q=new HJ(new tJ,J);this._renderer.compile(Q,D7)}_sceneToCubeUV(J,Q,$,Z,W){let X=new vJ(90,1,Q,$),U=[1,-1,1,1,1,1],H=[1,1,1,-1,-1,-1],q=this._renderer,G=q.autoClear,N=q.toneMapping;if(q.getClearColor(lW),q.toneMapping=X9,q.autoClear=!1,q.state.buffers.depth.getReversed())q.setRenderTarget(Z),q.clearDepth(),q.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new HJ(new gJ,new y9({name:"PMREM.Background",side:hJ,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,B=R.material,D=!1,F=J.background;if(F){if(F.isColor)B.color.copy(F),J.background=null,D=!0}else B.color.copy(lW),D=!0;for(let O=0;O<6;O++){let L=O%3;if(L===0)X.up.set(0,U[O],0),X.position.set(W.x,W.y,W.z),X.lookAt(W.x+H[O],W.y,W.z);else if(L===1)X.up.set(0,0,U[O]),X.position.set(W.x,W.y,W.z),X.lookAt(W.x,W.y+H[O],W.z);else X.up.set(0,U[O],0),X.position.set(W.x,W.y,W.z),X.lookAt(W.x,W.y,W.z+H[O]);let z=this._cubeSize;if(m8(Z,L*z,O>2?z:0,z,z),q.setRenderTarget(Z),D)q.render(R,X);q.render(J,X)}q.toneMapping=N,q.autoClear=G,J.background=F}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===h8||J.mapping===J8;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=cW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=uW();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let Y=W.uniforms;Y.envMap.value=J;let X=this._cubeSize;m8(Q,0,0,3*X,2*X),$.setRenderTarget(Q),$.render(K,D7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,Y=this._lodMeshes[$];Y.material=K;let X=K.uniforms,U=$/(this._lodMeshes.length-1),H=Q/(this._lodMeshes.length-1),q=Math.sqrt(U*U-H*H),G=0+U*1.25,N=q*G,{_lodMax:E}=this,R=this._sizeLods[$],B=3*R*($>E-s9?$-E+s9:0),D=4*(this._cubeSize-R);X.envMap.value=J.texture,X.roughness.value=N,X.mipInt.value=E-Q,m8(W,B,D,3*R,2*R),Z.setRenderTarget(W),Z.render(Y,D7),X.envMap.value=W.texture,X.roughness.value=0,X.mipInt.value=E-$,m8(J,B,D,3*R,2*R),Z.setRenderTarget(J),Z.render(Y,D7)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,Y){let X=this._renderer,U=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")P0("blur direction must be either latitudinal or longitudinal!");let H=3,q=this._lodMeshes[Z];q.material=U;let G=U.uniforms,N=this._sizeLods[$]-1,E=isFinite(W)?Math.PI/(2*N):2*Math.PI/(2*q8-1),R=W/E,B=isFinite(W)?1+Math.floor(H*R):q8;if(B>q8)w0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${B} samples when the maximum is set to ${q8}`);let D=[],F=0;for(let P=0;P<q8;++P){let C=P/R,V=Math.exp(-C*C/2);if(D.push(V),P===0)F+=V;else if(P<B)F+=2*V}for(let P=0;P<D.length;P++)D[P]=D[P]/F;if(G.envMap.value=J.texture,G.samples.value=B,G.weights.value=D,G.latitudinal.value=K==="latitudinal",Y)G.poleAxis.value=Y;let{_lodMax:O}=this;G.dTheta.value=E,G.mipInt.value=O-$;let L=this._sizeLods[Z],z=3*L*(Z>O-s9?Z-O+s9:0),w=4*(this._cubeSize-L);m8(Q,z,w,3*L,2*L),X.setRenderTarget(Q),X.render(q,D7)}}function FH(J){let Q=[],$=[],Z=[],W=J,K=J-s9+1+mW.length;for(let Y=0;Y<K;Y++){let X=Math.pow(2,W);Q.push(X);let U=1/X;if(Y>J-s9)U=mW[Y-J+s9-1];else if(Y===0)U=0;$.push(U);let H=1/(X-2),q=-H,G=1+H,N=[q,q,G,q,G,G,q,q,G,G,q,G],E=6,R=6,B=3,D=2,F=1,O=new Float32Array(B*R*E),L=new Float32Array(D*R*E),z=new Float32Array(F*R*E);for(let P=0;P<E;P++){let C=P%3*2/3-1,V=P>2?0:-1,k=[C,V,0,C+0.6666666666666666,V,0,C+0.6666666666666666,V+1,0,C,V,0,C+0.6666666666666666,V+1,0,C,V+1,0];O.set(k,B*R*P),L.set(N,D*R*P);let d=[P,P,P,P,P,P];z.set(d,F*R*P)}let w=new tJ;if(w.setAttribute("position",new aJ(O,B)),w.setAttribute("uv",new aJ(L,D)),w.setAttribute("faceIndex",new aJ(z,F)),Z.push(new HJ(w,null)),W>s9)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function dW(J,Q,$){let Z=new rJ(J,Q,$);return Z.texture.mapping=J7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function m8(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function RH(J,Q,$){return new eJ({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:EH,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:k6(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:F9,depthTest:!1,depthWrite:!1})}function _H(J,Q,$){let Z=new Float32Array(q8),W=new f(0,1,0);return new eJ({name:"SphericalGaussianBlur",defines:{n:q8,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:k6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:F9,depthTest:!1,depthWrite:!1})}function uW(){return new eJ({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:k6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:F9,depthTest:!1,depthWrite:!1})}function cW(){return new eJ({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:k6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:F9,depthTest:!1,depthWrite:!1})}function k6(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class d$ extends rJ{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new D6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},Z=new gJ(5,5,5),W=new eJ({name:"CubemapFromEquirect",uniforms:U8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:hJ,blending:F9});W.uniforms.tEquirect.value=Q;let K=new HJ(Z,W),Y=Q.minFilter;if(Q.minFilter===Q8)Q.minFilter=bJ;return new w$(1,10,this).update(J,K),Q.minFilter=Y,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}}function OH(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(N,E=!1){if(N===null||N===void 0)return null;if(E)return Y(N);return K(N)}function K(N){if(N&&N.isTexture){let E=N.mapping;if(E===r7||E===t7)if(Q.has(N)){let R=Q.get(N).texture;return X(R,N.mapping)}else{let R=N.image;if(R&&R.height>0){let B=new d$(R.height);return B.fromEquirectangularTexture(J,N),Q.set(N,B),N.addEventListener("dispose",H),X(B.texture,N.mapping)}else return null}}return N}function Y(N){if(N&&N.isTexture){let E=N.mapping,R=E===r7||E===t7,B=E===h8||E===J8;if(R||B){let D=$.get(N),F=D!==void 0?D.texture.pmremVersion:0;if(N.isRenderTargetTexture&&N.pmremVersion!==F){if(Z===null)Z=new p$(J);return D=R?Z.fromEquirectangular(N,D):Z.fromCubemap(N,D),D.texture.pmremVersion=N.pmremVersion,$.set(N,D),D.texture}else if(D!==void 0)return D.texture;else{let O=N.image;if(R&&O&&O.height>0||B&&O&&U(O)){if(Z===null)Z=new p$(J);return D=R?Z.fromEquirectangular(N):Z.fromCubemap(N),D.texture.pmremVersion=N.pmremVersion,$.set(N,D),N.addEventListener("dispose",q),D.texture}else return null}}}return N}function X(N,E){if(E===r7)N.mapping=h8;else if(E===t7)N.mapping=J8;return N}function U(N){let E=0,R=6;for(let B=0;B<R;B++)if(N[B]!==void 0)E++;return E===R}function H(N){let E=N.target;E.removeEventListener("dispose",H);let R=Q.get(E);if(R!==void 0)Q.delete(E),R.dispose()}function q(N){let E=N.target;E.removeEventListener("dispose",q);let R=$.get(E);if(R!==void 0)$.delete(E),R.dispose()}function G(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:G}}function MH(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)i7("WebGLRenderer: "+Z+" extension not supported.");return W}}}function VH(J,Q,$,Z){let W={},K=new WeakMap;function Y(G){let N=G.target;if(N.index!==null)Q.remove(N.index);for(let R in N.attributes)Q.remove(N.attributes[R]);N.removeEventListener("dispose",Y),delete W[N.id];let E=K.get(N);if(E)Q.remove(E),K.delete(N);if(Z.releaseStatesOfGeometry(N),N.isInstancedBufferGeometry===!0)delete N._maxInstanceCount;$.memory.geometries--}function X(G,N){if(W[N.id]===!0)return N;return N.addEventListener("dispose",Y),W[N.id]=!0,$.memory.geometries++,N}function U(G){let N=G.attributes;for(let E in N)Q.update(N[E],J.ARRAY_BUFFER)}function H(G){let N=[],E=G.index,R=G.attributes.position,B=0;if(R===void 0)return;if(E!==null){let O=E.array;B=E.version;for(let L=0,z=O.length;L<z;L+=3){let w=O[L+0],P=O[L+1],C=O[L+2];N.push(w,P,P,C,C,w)}}else{let O=R.array;B=R.version;for(let L=0,z=O.length/3-1;L<z;L+=3){let w=L+0,P=L+1,C=L+2;N.push(w,P,P,C,C,w)}}let D=new(R.count>=65535?q6:N6)(N,1);D.version=B;let F=K.get(G);if(F)Q.remove(F);K.set(G,D)}function q(G){let N=K.get(G);if(N){let E=G.index;if(E!==null){if(N.version<E.version)H(G)}}else H(G);return K.get(G)}return{get:X,update:U,getWireframeAttribute:q}}function LH(J,Q,$){let Z;function W(G){Z=G}let K,Y;function X(G){K=G.type,Y=G.bytesPerElement}function U(G,N){J.drawElements(Z,N,K,G*Y),$.update(N,Z,1)}function H(G,N,E){if(E===0)return;J.drawElementsInstanced(Z,N,K,G*Y,E),$.update(N,Z,E)}function q(G,N,E){if(E===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,N,0,K,G,0,E);let B=0;for(let D=0;D<E;D++)B+=N[D];$.update(B,Z,1)}this.setMode=W,this.setIndex=X,this.render=U,this.renderInstances=H,this.renderMultiDraw=q}function BH(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,Y,X){switch($.calls++,Y){case J.TRIANGLES:$.triangles+=X*(K/3);break;case J.LINES:$.lines+=X*(K/2);break;case J.LINE_STRIP:$.lines+=X*(K-1);break;case J.LINE_LOOP:$.lines+=X*K;break;case J.POINTS:$.points+=X*K;break;default:P0("WebGLInfo: Unknown draw mode:",Y);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function zH(J,Q,$){let Z=new WeakMap,W=new EJ;function K(Y,X,U){let H=Y.morphTargetInfluences,q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,G=q!==void 0?q.length:0,N=Z.get(X);if(N===void 0||N.count!==G){let k=function(){C.dispose(),Z.delete(X),X.removeEventListener("dispose",k)};if(N!==void 0)N.texture.dispose();let E=X.morphAttributes.position!==void 0,R=X.morphAttributes.normal!==void 0,B=X.morphAttributes.color!==void 0,D=X.morphAttributes.position||[],F=X.morphAttributes.normal||[],O=X.morphAttributes.color||[],L=0;if(E===!0)L=1;if(R===!0)L=2;if(B===!0)L=3;let z=X.attributes.position.count*L,w=1;if(z>Q.maxTextureSize)w=Math.ceil(z/Q.maxTextureSize),z=Q.maxTextureSize;let P=new Float32Array(z*w*4*G),C=new H6(P,z,w,G);C.type=C9,C.needsUpdate=!0;let V=L*4;for(let d=0;d<G;d++){let A=D[d],m=F[d],c=O[d],y=z*w*4*d;for(let l=0;l<A.count;l++){let b=l*V;if(E===!0)W.fromBufferAttribute(A,l),P[y+b+0]=W.x,P[y+b+1]=W.y,P[y+b+2]=W.z,P[y+b+3]=0;if(R===!0)W.fromBufferAttribute(m,l),P[y+b+4]=W.x,P[y+b+5]=W.y,P[y+b+6]=W.z,P[y+b+7]=0;if(B===!0)W.fromBufferAttribute(c,l),P[y+b+8]=W.x,P[y+b+9]=W.y,P[y+b+10]=W.z,P[y+b+11]=c.itemSize===4?W.w:1}}N={count:G,texture:C,size:new u0(z,w)},Z.set(X,N),X.addEventListener("dispose",k)}if(Y.isInstancedMesh===!0&&Y.morphTexture!==null)U.getUniforms().setValue(J,"morphTexture",Y.morphTexture,$);else{let E=0;for(let B=0;B<H.length;B++)E+=H[B];let R=X.morphTargetsRelative?1:1-E;U.getUniforms().setValue(J,"morphTargetBaseInfluence",R),U.getUniforms().setValue(J,"morphTargetInfluences",H)}U.getUniforms().setValue(J,"morphTargetsTexture",N.texture,$),U.getUniforms().setValue(J,"morphTargetsTextureSize",N.size)}return{update:K}}function IH(J,Q,$,Z,W){let K=new WeakMap;function Y(H){let q=W.render.frame,G=H.geometry,N=Q.get(H,G);if(K.get(N)!==q)Q.update(N),K.set(N,q);if(H.isInstancedMesh){if(H.hasEventListener("dispose",U)===!1)H.addEventListener("dispose",U);if(K.get(H)!==q){if($.update(H.instanceMatrix,J.ARRAY_BUFFER),H.instanceColor!==null)$.update(H.instanceColor,J.ARRAY_BUFFER);K.set(H,q)}}if(H.isSkinnedMesh){let E=H.skeleton;if(K.get(E)!==q)E.update(),K.set(E,q)}return N}function X(){K=new WeakMap}function U(H){let q=H.target;if(q.removeEventListener("dispose",U),Z.releaseStatesOfObject(q),$.remove(q.instanceMatrix),q.instanceColor!==null)$.remove(q.instanceColor)}return{update:Y,dispose:X}}var kH={[DQ]:"LINEAR_TONE_MAPPING",[FQ]:"REINHARD_TONE_MAPPING",[RQ]:"CINEON_TONE_MAPPING",[_Q]:"ACES_FILMIC_TONE_MAPPING",[MQ]:"AGX_TONE_MAPPING",[VQ]:"NEUTRAL_TONE_MAPPING",[OQ]:"CUSTOM_TONE_MAPPING"};function AH(J,Q,$,Z,W){let K=new rJ(Q,$,{type:J,depthBuffer:Z,stencilBuffer:W,depthTexture:Z?new n9(Q,$):void 0}),Y=new rJ(Q,$,{type:T9,depthBuffer:!1,stencilBuffer:!1}),X=new tJ;X.setAttribute("position",new AJ([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new AJ([0,2,0,0,2,0],2));let U=new F$({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),H=new HJ(X,U),q=new E7(-1,1,1,-1,0,1),G=null,N=null,E=!1,R,B=null,D=[],F=!1;this.setSize=function(O,L){K.setSize(O,L),Y.setSize(O,L);for(let z=0;z<D.length;z++){let w=D[z];if(w.setSize)w.setSize(O,L)}},this.setEffects=function(O){D=O,F=D.length>0&&D[0].isRenderPass===!0;let{width:L,height:z}=K;for(let w=0;w<D.length;w++){let P=D[w];if(P.setSize)P.setSize(L,z)}},this.begin=function(O,L){if(E)return!1;if(O.toneMapping===X9&&D.length===0)return!1;if(B=L,L!==null){let{width:z,height:w}=L;if(K.width!==z||K.height!==w)this.setSize(z,w)}if(F===!1)O.setRenderTarget(K);return R=O.toneMapping,O.toneMapping=X9,!0},this.hasRenderPass=function(){return F},this.end=function(O,L){O.toneMapping=R,E=!0;let z=K,w=Y;for(let P=0;P<D.length;P++){let C=D[P];if(C.enabled===!1)continue;if(C.render(O,w,z,L),C.needsSwap!==!1){let V=z;z=w,w=V}}if(G!==O.outputColorSpace||N!==O.toneMapping){if(G=O.outputColorSpace,N=O.toneMapping,U.defines={},d0.getTransfer(G)===KJ)U.defines.SRGB_TRANSFER="";let P=kH[N];if(P)U.defines[P]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=z.texture,O.setRenderTarget(B),O.render(H,q),B=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){if(K.depthTexture)K.depthTexture.dispose();K.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var NK=new kJ,m$=new n9(1,1),qK=new H6,EK=new N$,DK=new D6,nW=[],sW=[],iW=new Float32Array(16),oW=new Float32Array(9),aW=new Float32Array(4);function l8(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=nW[W];if(K===void 0)K=new Float32Array(W),nW[W]=K;if(Q!==0){Z.toArray(K,0);for(let Y=1,X=0;Y!==Q;++Y)X+=$,J[Y].toArray(K,X)}return K}function VJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function LJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function A6(J,Q){let $=sW[Q];if($===void 0)$=new Int32Array(Q),sW[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function PH(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function wH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(VJ($,Q))return;J.uniform2fv(this.addr,Q),LJ($,Q)}}function CH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(VJ($,Q))return;J.uniform3fv(this.addr,Q),LJ($,Q)}}function TH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(VJ($,Q))return;J.uniform4fv(this.addr,Q),LJ($,Q)}}function SH(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(VJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),LJ($,Q)}else{if(VJ($,Z))return;aW.set(Z),J.uniformMatrix2fv(this.addr,!1,aW),LJ($,Z)}}function jH(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(VJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),LJ($,Q)}else{if(VJ($,Z))return;oW.set(Z),J.uniformMatrix3fv(this.addr,!1,oW),LJ($,Z)}}function yH(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(VJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),LJ($,Q)}else{if(VJ($,Z))return;iW.set(Z),J.uniformMatrix4fv(this.addr,!1,iW),LJ($,Z)}}function vH(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function fH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(VJ($,Q))return;J.uniform2iv(this.addr,Q),LJ($,Q)}}function xH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(VJ($,Q))return;J.uniform3iv(this.addr,Q),LJ($,Q)}}function hH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(VJ($,Q))return;J.uniform4iv(this.addr,Q),LJ($,Q)}}function bH(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function gH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(VJ($,Q))return;J.uniform2uiv(this.addr,Q),LJ($,Q)}}function pH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(VJ($,Q))return;J.uniform3uiv(this.addr,Q),LJ($,Q)}}function mH(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(VJ($,Q))return;J.uniform4uiv(this.addr,Q),LJ($,Q)}}function lH(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)m$.compareFunction=$.isReversedDepthBuffer()?U6:X6,K=m$;else K=NK;$.setTexture2D(Q||K,W)}function dH(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||EK,W)}function uH(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||DK,W)}function cH(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||qK,W)}function nH(J){switch(J){case 5126:return PH;case 35664:return wH;case 35665:return CH;case 35666:return TH;case 35674:return SH;case 35675:return jH;case 35676:return yH;case 5124:case 35670:return vH;case 35667:case 35671:return fH;case 35668:case 35672:return xH;case 35669:case 35673:return hH;case 5125:return bH;case 36294:return gH;case 36295:return pH;case 36296:return mH;case 35678:case 36198:case 36298:case 36306:case 35682:return lH;case 35679:case 36299:case 36307:return dH;case 35680:case 36300:case 36308:case 36293:return uH;case 36289:case 36303:case 36311:case 36292:return cH}}function sH(J,Q){J.uniform1fv(this.addr,Q)}function iH(J,Q){let $=l8(Q,this.size,2);J.uniform2fv(this.addr,$)}function oH(J,Q){let $=l8(Q,this.size,3);J.uniform3fv(this.addr,$)}function aH(J,Q){let $=l8(Q,this.size,4);J.uniform4fv(this.addr,$)}function rH(J,Q){let $=l8(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function tH(J,Q){let $=l8(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function eH(J,Q){let $=l8(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function JG(J,Q){J.uniform1iv(this.addr,Q)}function QG(J,Q){J.uniform2iv(this.addr,Q)}function $G(J,Q){J.uniform3iv(this.addr,Q)}function ZG(J,Q){J.uniform4iv(this.addr,Q)}function WG(J,Q){J.uniform1uiv(this.addr,Q)}function KG(J,Q){J.uniform2uiv(this.addr,Q)}function YG(J,Q){J.uniform3uiv(this.addr,Q)}function XG(J,Q){J.uniform4uiv(this.addr,Q)}function UG(J,Q,$){let Z=this.cache,W=Q.length,K=A6($,W);if(!VJ(Z,K))J.uniform1iv(this.addr,K),LJ(Z,K);let Y;if(this.type===J.SAMPLER_2D_SHADOW)Y=m$;else Y=NK;for(let X=0;X!==W;++X)$.setTexture2D(Q[X]||Y,K[X])}function HG(J,Q,$){let Z=this.cache,W=Q.length,K=A6($,W);if(!VJ(Z,K))J.uniform1iv(this.addr,K),LJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTexture3D(Q[Y]||EK,K[Y])}function GG(J,Q,$){let Z=this.cache,W=Q.length,K=A6($,W);if(!VJ(Z,K))J.uniform1iv(this.addr,K),LJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTextureCube(Q[Y]||DK,K[Y])}function NG(J,Q,$){let Z=this.cache,W=Q.length,K=A6($,W);if(!VJ(Z,K))J.uniform1iv(this.addr,K),LJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTexture2DArray(Q[Y]||qK,K[Y])}function qG(J){switch(J){case 5126:return sH;case 35664:return iH;case 35665:return oH;case 35666:return aH;case 35674:return rH;case 35675:return tH;case 35676:return eH;case 5124:case 35670:return JG;case 35667:case 35671:return QG;case 35668:case 35672:return $G;case 35669:case 35673:return ZG;case 5125:return WG;case 36294:return KG;case 36295:return YG;case 36296:return XG;case 35678:case 36198:case 36298:case 36306:case 35682:return UG;case 35679:case 36299:case 36307:return HG;case 35680:case 36300:case 36308:case 36293:return GG;case 36289:case 36303:case 36311:case 36292:return NG}}class FK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=nH(Q.type)}}class RK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=qG(Q.type)}}class _K{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let Y=Z[W];Y.setValue(J,Q[Y.id],$)}}}var b$=/(\w+)(\])?(\[|\.)?/g;function rW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function EG(J,Q,$){let Z=J.name,W=Z.length;b$.lastIndex=0;while(!0){let K=b$.exec(Z),Y=b$.lastIndex,X=K[1],U=K[2]==="]",H=K[3];if(U)X=X|0;if(H===void 0||H==="["&&Y+2===W){rW($,H===void 0?new FK(X,J,Q):new RK(X,J,Q));break}else{let G=$.map[X];if(G===void 0)G=new _K(X),rW($,G);$=G}}}class _7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let Y=J.getActiveUniform(Q,K),X=J.getUniformLocation(Q,Y.name);EG(Y,X,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let Y=Q[W],X=$[Y.id];if(X.needsUpdate!==!1)Y.setValue(J,X.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function tW(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var DG=37297,FG=0;function RG(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let Y=W;Y<K;Y++){let X=Y+1;Z.push(`${X===Q?">":" "} ${X}: ${$[Y]}`)}return Z.join(`
`)}var eW=new S0;function _G(J){d0._getMatrix(eW,d0.workingColorSpace,J);let Q=`mat3( ${eW.elements.map(($)=>$.toFixed(4))} )`;switch(d0.getTransfer(J)){case K$:return[Q,"LinearTransferOETF"];case KJ:return[Q,"sRGBTransferOETF"];default:return w0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function JK(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let Y=/ERROR: 0:(\d+)/.exec(K);if(Y){let X=parseInt(Y[1]);return $.toUpperCase()+`

`+K+`

`+RG(J.getShaderSource(Q),X)}else return K}function OG(J,Q){let $=_G(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var MG={[DQ]:"Linear",[FQ]:"Reinhard",[RQ]:"Cineon",[_Q]:"ACESFilmic",[MQ]:"AgX",[VQ]:"Neutral",[OQ]:"Custom"};function VG(J,Q){let $=MG[Q];if($===void 0)return w0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var I6=new f;function LG(){d0.getLuminanceCoefficients(I6);let J=I6.x.toFixed(4),Q=I6.y.toFixed(4),$=I6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function BG(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(R7).join(`
`)}function zG(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function IG(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),Y=K.name,X=1;if(K.type===J.FLOAT_MAT2)X=2;if(K.type===J.FLOAT_MAT3)X=3;if(K.type===J.FLOAT_MAT4)X=4;$[Y]={type:K.type,location:J.getAttribLocation(Q,Y),locationSize:X}}return $}function R7(J){return J!==""}function QK(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function $K(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var kG=/^[ \t]*#include +<([\w\d./]+)>/gm;function l$(J){return J.replace(kG,PG)}var AG=new Map;function PG(J,Q){let $=x0[Q];if($===void 0){let Z=AG.get(Q);if(Z!==void 0)$=x0[Z],w0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("Can not resolve #include <"+Q+">")}return l$($)}var wG=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ZK(J){return J.replace(wG,CG)}function CG(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function WK(J){let Q=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var TG={[t8]:"SHADOWMAP_TYPE_PCF",[v8]:"SHADOWMAP_TYPE_VSM"};function SG(J){return TG[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var jG={[h8]:"ENVMAP_TYPE_CUBE",[J8]:"ENVMAP_TYPE_CUBE",[J7]:"ENVMAP_TYPE_CUBE_UV"};function yG(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return jG[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var vG={[J8]:"ENVMAP_MODE_REFRACTION"};function fG(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return vG[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var xG={[NW]:"ENVMAP_BLENDING_MULTIPLY",[qW]:"ENVMAP_BLENDING_MIX",[EW]:"ENVMAP_BLENDING_ADD"};function hG(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return xG[J.combine]||"ENVMAP_BLENDING_NONE"}function bG(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function gG(J,Q,$,Z){let W=J.getContext(),K=$.defines,Y=$.vertexShader,X=$.fragmentShader,U=SG($),H=yG($),q=fG($),G=hG($),N=bG($),E=BG($),R=zG(K),B=W.createProgram(),D,F,O=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(R7).join(`
`),D.length>0)D+=`
`;if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(R7).join(`
`),F.length>0)F+=`
`}else D=[WK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+q:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+U:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(R7).join(`
`),F=[WK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+H:"",$.envMap?"#define "+q:"",$.envMap?"#define "+G:"",N?"#define CUBEUV_TEXEL_WIDTH "+N.texelWidth:"",N?"#define CUBEUV_TEXEL_HEIGHT "+N.texelHeight:"",N?"#define CUBEUV_MAX_MIP "+N.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+U:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==X9?"#define TONE_MAPPING":"",$.toneMapping!==X9?x0.tonemapping_pars_fragment:"",$.toneMapping!==X9?VG("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",x0.colorspace_pars_fragment,OG("linearToOutputTexel",$.outputColorSpace),LG(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(R7).join(`
`);if(Y=l$(Y),Y=QK(Y,$),Y=$K(Y,$),X=l$(X),X=QK(X,$),X=$K(X,$),Y=ZK(Y),X=ZK(X),$.isRawShaderMaterial!==!0)O=`#version 300 es
`,D=[E,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,F=["#define varying in",$.glslVersion===Y$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===Y$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+F;let L=O+D+Y,z=O+F+X,w=tW(W,W.VERTEX_SHADER,L),P=tW(W,W.FRAGMENT_SHADER,z);if(W.attachShader(B,w),W.attachShader(B,P),$.index0AttributeName!==void 0)W.bindAttribLocation(B,0,$.index0AttributeName);else if($.morphTargets===!0)W.bindAttribLocation(B,0,"position");W.linkProgram(B);function C(A){if(J.debug.checkShaderErrors){let m=W.getProgramInfoLog(B)||"",c=W.getShaderInfoLog(w)||"",y=W.getShaderInfoLog(P)||"",l=m.trim(),b=c.trim(),p=y.trim(),a=!0,Q0=!0;if(W.getProgramParameter(B,W.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,B,w,P);else{let E0=JK(W,w,"vertex"),I0=JK(W,P,"fragment");P0("THREE.WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(B,W.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+l+`
`+E0+`
`+I0)}else if(l!=="")w0("WebGLProgram: Program Info Log:",l);else if(b===""||p==="")Q0=!1;if(Q0)A.diagnostics={runnable:a,programLog:l,vertexShader:{log:b,prefix:D},fragmentShader:{log:p,prefix:F}}}W.deleteShader(w),W.deleteShader(P),V=new _7(W,B),k=IG(W,B)}let V;this.getUniforms=function(){if(V===void 0)C(this);return V};let k;this.getAttributes=function(){if(k===void 0)C(this);return k};let d=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(d===!1)d=W.getProgramParameter(B,DG);return d},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(B),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=FG++,this.cacheKey=Q,this.usedTimes=1,this.program=B,this.vertexShader=w,this.fragmentShader=P,this}var pG=0;class OK{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:Q,fragmentShader:$}=J,Z=this._getShaderStage(Q),W=this._getShaderStage($),K=this._getShaderCacheForMaterial(J);if(K.has(Z)===!1)K.add(Z),Z.usedTimes++;if(K.has(W)===!1)K.add(W),W.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new MK(J),Q.set(J,$);return $}}class MK{constructor(J){this.id=pG++,this.code=J,this.usedTimes=0}}function mG(J){return J===W8||J===K6||J===Y6}function lG(J,Q,$,Z,W,K){let Y=new Y7,X=new OK,U=new Set,H=[],q=new Map,G=Z.logarithmicDepthBuffer,N=Z.precision,E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(V){if(U.add(V),V===0)return"uv";return`uv${V}`}function B(V,k,d,A,m,c){let y=A.fog,l=m.geometry,b=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?A.environment:null,p=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,a=Q.get(V.envMap||b,p),Q0=!!a&&a.mapping===J7?a.image.height:null,E0=E[V.type];if(V.precision!==null){if(N=Z.getMaxPrecision(V.precision),N!==V.precision)w0("WebGLProgram.getParameters:",V.precision,"not supported, using",N,"instead.")}let I0=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,O0=I0!==void 0?I0.length:0,r0=0;if(l.morphAttributes.position!==void 0)r0=1;if(l.morphAttributes.normal!==void 0)r0=2;if(l.morphAttributes.color!==void 0)r0=3;let p0,s,N0,V0;if(E0){let j0=O9[E0];p0=j0.vertexShader,s=j0.fragmentShader}else p0=V.vertexShader,s=V.fragmentShader,X.update(V),N0=X.getVertexShaderID(V),V0=X.getFragmentShaderID(V);let q0=J.getRenderTarget(),k0=J.state.buffers.depth.getReversed(),a0=m.isInstancedMesh===!0,h0=m.isBatchedMesh===!0,l0=!!V.map,QJ=!!V.matcap,$J=!!a,f0=!!V.aoMap,IJ=!!V.lightMap,wJ=!!V.bumpMap,_J=!!V.normalMap,S=!!V.displacementMap,yJ=!!V.emissiveMap,c0=!!V.metalnessMap,o0=!!V.roughnessMap,H0=V.anisotropy>0,qJ=V.clearcoat>0,A0=V.dispersion>0,I=V.iridescence>0,_=V.sheen>0,v=V.transmission>0,o=H0&&!!V.anisotropyMap,r=qJ&&!!V.clearcoatMap,e=qJ&&!!V.clearcoatNormalMap,K0=qJ&&!!V.clearcoatRoughnessMap,u=I&&!!V.iridescenceMap,i=I&&!!V.iridescenceThicknessMap,W0=_&&!!V.sheenColorMap,R0=_&&!!V.sheenRoughnessMap,$0=!!V.specularMap,Y0=!!V.specularColorMap,T0=!!V.specularIntensityMap,v0=v&&!!V.transmissionMap,b0=v&&!!V.thicknessMap,T=!!V.gradientMap,Z0=!!V.alphaMap,n=V.alphaTest>0,J0=!!V.alphaHash,_0=!!V.extensions,t=X9;if(V.toneMapped){if(q0===null||q0.isXRRenderTarget===!0)t=J.toneMapping}let L0={shaderID:E0,shaderType:V.type,shaderName:V.name,vertexShader:p0,fragmentShader:s,defines:V.defines,customVertexShaderID:N0,customFragmentShaderID:V0,isRawShaderMaterial:V.isRawShaderMaterial===!0,glslVersion:V.glslVersion,precision:N,batching:h0,batchingColor:h0&&m._colorsTexture!==null,instancing:a0,instancingColor:a0&&m.instanceColor!==null,instancingMorph:a0&&m.morphTexture!==null,outputColorSpace:q0===null?J.outputColorSpace:q0.isXRRenderTarget===!0?q0.texture.colorSpace:d0.workingColorSpace,alphaToCoverage:!!V.alphaToCoverage,map:l0,matcap:QJ,envMap:$J,envMapMode:$J&&a.mapping,envMapCubeUVHeight:Q0,aoMap:f0,lightMap:IJ,bumpMap:wJ,normalMap:_J,displacementMap:S,emissiveMap:yJ,normalMapObjectSpace:_J&&V.normalMapType===IW,normalMapTangentSpace:_J&&V.normalMapType===Z$,packedNormalMap:_J&&V.normalMapType===Z$&&mG(V.normalMap.format),metalnessMap:c0,roughnessMap:o0,anisotropy:H0,anisotropyMap:o,clearcoat:qJ,clearcoatMap:r,clearcoatNormalMap:e,clearcoatRoughnessMap:K0,dispersion:A0,iridescence:I,iridescenceMap:u,iridescenceThicknessMap:i,sheen:_,sheenColorMap:W0,sheenRoughnessMap:R0,specularMap:$0,specularColorMap:Y0,specularIntensityMap:T0,transmission:v,transmissionMap:v0,thicknessMap:b0,gradientMap:T,opaque:V.transparent===!1&&V.blending===e8&&V.alphaToCoverage===!1,alphaMap:Z0,alphaTest:n,alphaHash:J0,combine:V.combine,mapUv:l0&&R(V.map.channel),aoMapUv:f0&&R(V.aoMap.channel),lightMapUv:IJ&&R(V.lightMap.channel),bumpMapUv:wJ&&R(V.bumpMap.channel),normalMapUv:_J&&R(V.normalMap.channel),displacementMapUv:S&&R(V.displacementMap.channel),emissiveMapUv:yJ&&R(V.emissiveMap.channel),metalnessMapUv:c0&&R(V.metalnessMap.channel),roughnessMapUv:o0&&R(V.roughnessMap.channel),anisotropyMapUv:o&&R(V.anisotropyMap.channel),clearcoatMapUv:r&&R(V.clearcoatMap.channel),clearcoatNormalMapUv:e&&R(V.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K0&&R(V.clearcoatRoughnessMap.channel),iridescenceMapUv:u&&R(V.iridescenceMap.channel),iridescenceThicknessMapUv:i&&R(V.iridescenceThicknessMap.channel),sheenColorMapUv:W0&&R(V.sheenColorMap.channel),sheenRoughnessMapUv:R0&&R(V.sheenRoughnessMap.channel),specularMapUv:$0&&R(V.specularMap.channel),specularColorMapUv:Y0&&R(V.specularColorMap.channel),specularIntensityMapUv:T0&&R(V.specularIntensityMap.channel),transmissionMapUv:v0&&R(V.transmissionMap.channel),thicknessMapUv:b0&&R(V.thicknessMap.channel),alphaMapUv:Z0&&R(V.alphaMap.channel),vertexTangents:!!l.attributes.tangent&&(_J||H0),vertexNormals:!!l.attributes.normal,vertexColors:V.vertexColors,vertexAlphas:V.vertexColors===!0&&!!l.attributes.color&&l.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!l.attributes.uv&&(l0||Z0),fog:!!y,useFog:V.fog===!0,fogExp2:!!y&&y.isFogExp2,flatShading:V.wireframe===!1&&(V.flatShading===!0||l.attributes.normal===void 0&&_J===!1&&(V.isMeshLambertMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isMeshPhysicalMaterial)),sizeAttenuation:V.sizeAttenuation===!0,logarithmicDepthBuffer:G,reversedDepthBuffer:k0,skinning:m.isSkinnedMesh===!0,morphTargets:l.morphAttributes.position!==void 0,morphNormals:l.morphAttributes.normal!==void 0,morphColors:l.morphAttributes.color!==void 0,morphTargetsCount:O0,morphTextureStride:r0,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numLightProbeGrids:c.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:V.dithering,shadowMapEnabled:J.shadowMap.enabled&&d.length>0,shadowMapType:J.shadowMap.type,toneMapping:t,decodeVideoTexture:l0&&V.map.isVideoTexture===!0&&d0.getTransfer(V.map.colorSpace)===KJ,decodeVideoTextureEmissive:yJ&&V.emissiveMap.isVideoTexture===!0&&d0.getTransfer(V.emissiveMap.colorSpace)===KJ,premultipliedAlpha:V.premultipliedAlpha,doubleSided:V.side===dJ,flipSided:V.side===hJ,useDepthPacking:V.depthPacking>=0,depthPacking:V.depthPacking||0,index0AttributeName:V.index0AttributeName,extensionClipCullDistance:_0&&V.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_0&&V.extensions.multiDraw===!0||h0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:V.customProgramCacheKey()};return L0.vertexUv1s=U.has(1),L0.vertexUv2s=U.has(2),L0.vertexUv3s=U.has(3),U.clear(),L0}function D(V){let k=[];if(V.shaderID)k.push(V.shaderID);else k.push(V.customVertexShaderID),k.push(V.customFragmentShaderID);if(V.defines!==void 0)for(let d in V.defines)k.push(d),k.push(V.defines[d]);if(V.isRawShaderMaterial===!1)F(k,V),O(k,V),k.push(J.outputColorSpace);return k.push(V.customProgramCacheKey),k.join()}function F(V,k){V.push(k.precision),V.push(k.outputColorSpace),V.push(k.envMapMode),V.push(k.envMapCubeUVHeight),V.push(k.mapUv),V.push(k.alphaMapUv),V.push(k.lightMapUv),V.push(k.aoMapUv),V.push(k.bumpMapUv),V.push(k.normalMapUv),V.push(k.displacementMapUv),V.push(k.emissiveMapUv),V.push(k.metalnessMapUv),V.push(k.roughnessMapUv),V.push(k.anisotropyMapUv),V.push(k.clearcoatMapUv),V.push(k.clearcoatNormalMapUv),V.push(k.clearcoatRoughnessMapUv),V.push(k.iridescenceMapUv),V.push(k.iridescenceThicknessMapUv),V.push(k.sheenColorMapUv),V.push(k.sheenRoughnessMapUv),V.push(k.specularMapUv),V.push(k.specularColorMapUv),V.push(k.specularIntensityMapUv),V.push(k.transmissionMapUv),V.push(k.thicknessMapUv),V.push(k.combine),V.push(k.fogExp2),V.push(k.sizeAttenuation),V.push(k.morphTargetsCount),V.push(k.morphAttributeCount),V.push(k.numDirLights),V.push(k.numPointLights),V.push(k.numSpotLights),V.push(k.numSpotLightMaps),V.push(k.numHemiLights),V.push(k.numRectAreaLights),V.push(k.numDirLightShadows),V.push(k.numPointLightShadows),V.push(k.numSpotLightShadows),V.push(k.numSpotLightShadowsWithMaps),V.push(k.numLightProbes),V.push(k.shadowMapType),V.push(k.toneMapping),V.push(k.numClippingPlanes),V.push(k.numClipIntersection),V.push(k.depthPacking)}function O(V,k){if(Y.disableAll(),k.instancing)Y.enable(0);if(k.instancingColor)Y.enable(1);if(k.instancingMorph)Y.enable(2);if(k.matcap)Y.enable(3);if(k.envMap)Y.enable(4);if(k.normalMapObjectSpace)Y.enable(5);if(k.normalMapTangentSpace)Y.enable(6);if(k.clearcoat)Y.enable(7);if(k.iridescence)Y.enable(8);if(k.alphaTest)Y.enable(9);if(k.vertexColors)Y.enable(10);if(k.vertexAlphas)Y.enable(11);if(k.vertexUv1s)Y.enable(12);if(k.vertexUv2s)Y.enable(13);if(k.vertexUv3s)Y.enable(14);if(k.vertexTangents)Y.enable(15);if(k.anisotropy)Y.enable(16);if(k.alphaHash)Y.enable(17);if(k.batching)Y.enable(18);if(k.dispersion)Y.enable(19);if(k.batchingColor)Y.enable(20);if(k.gradientMap)Y.enable(21);if(k.packedNormalMap)Y.enable(22);if(k.vertexNormals)Y.enable(23);if(V.push(Y.mask),Y.disableAll(),k.fog)Y.enable(0);if(k.useFog)Y.enable(1);if(k.flatShading)Y.enable(2);if(k.logarithmicDepthBuffer)Y.enable(3);if(k.reversedDepthBuffer)Y.enable(4);if(k.skinning)Y.enable(5);if(k.morphTargets)Y.enable(6);if(k.morphNormals)Y.enable(7);if(k.morphColors)Y.enable(8);if(k.premultipliedAlpha)Y.enable(9);if(k.shadowMapEnabled)Y.enable(10);if(k.doubleSided)Y.enable(11);if(k.flipSided)Y.enable(12);if(k.useDepthPacking)Y.enable(13);if(k.dithering)Y.enable(14);if(k.transmission)Y.enable(15);if(k.sheen)Y.enable(16);if(k.opaque)Y.enable(17);if(k.pointsUvs)Y.enable(18);if(k.decodeVideoTexture)Y.enable(19);if(k.decodeVideoTextureEmissive)Y.enable(20);if(k.alphaToCoverage)Y.enable(21);if(k.numLightProbeGrids>0)Y.enable(22);V.push(Y.mask)}function L(V){let k=E[V.type],d;if(k){let A=O9[k];d=xW.clone(A.uniforms)}else d=V.uniforms;return d}function z(V,k){let d=q.get(k);if(d!==void 0)++d.usedTimes;else d=new gG(J,k,V,W),H.push(d),q.set(k,d);return d}function w(V){if(--V.usedTimes===0){let k=H.indexOf(V);H[k]=H[H.length-1],H.pop(),q.delete(V.cacheKey),V.destroy()}}function P(V){X.remove(V)}function C(){X.dispose()}return{getParameters:B,getProgramCacheKey:D,getUniforms:L,acquireProgram:z,releaseProgram:w,releaseShaderCache:P,programs:H,dispose:C}}function dG(){let J=new WeakMap;function Q(Y){return J.has(Y)}function $(Y){let X=J.get(Y);if(X===void 0)X={},J.set(Y,X);return X}function Z(Y){J.delete(Y)}function W(Y,X,U){J.get(Y)[X]=U}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function uG(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function KK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function YK(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function Y(N){let E=0;if(N.isInstancedMesh)E+=2;if(N.isSkinnedMesh)E+=1;return E}function X(N,E,R,B,D,F){let O=J[Q];if(O===void 0)O={id:N.id,object:N,geometry:E,material:R,materialVariant:Y(N),groupOrder:B,renderOrder:N.renderOrder,z:D,group:F},J[Q]=O;else O.id=N.id,O.object=N,O.geometry=E,O.material=R,O.materialVariant=Y(N),O.groupOrder=B,O.renderOrder=N.renderOrder,O.z=D,O.group=F;return Q++,O}function U(N,E,R,B,D,F){let O=X(N,E,R,B,D,F);if(R.transmission>0)Z.push(O);else if(R.transparent===!0)W.push(O);else $.push(O)}function H(N,E,R,B,D,F){let O=X(N,E,R,B,D,F);if(R.transmission>0)Z.unshift(O);else if(R.transparent===!0)W.unshift(O);else $.unshift(O)}function q(N,E){if($.length>1)$.sort(N||uG);if(Z.length>1)Z.sort(E||KK);if(W.length>1)W.sort(E||KK)}function G(){for(let N=Q,E=J.length;N<E;N++){let R=J[N];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:U,unshift:H,finish:G,sort:q}}function cG(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),Y;if(K===void 0)Y=new YK,J.set(Z,[Y]);else if(W>=K.length)Y=new YK,K.push(Y);else Y=K[W];return Y}function $(){J=new WeakMap}return{get:Q,dispose:$}}function nG(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new f,color:new m0};break;case"SpotLight":$={position:new f,direction:new f,color:new m0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new f,color:new m0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new f,skyColor:new m0,groundColor:new m0};break;case"RectAreaLight":$={color:new m0,position:new f,halfWidth:new f,halfHeight:new f};break}return J[Q.id]=$,$}}}function sG(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var iG=0;function oG(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function aG(J){let Q=new nG,$=sG(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let H=0;H<9;H++)Z.probe.push(new f);let W=new f,K=new NJ,Y=new NJ;function X(H){let q=0,G=0,N=0;for(let k=0;k<9;k++)Z.probe[k].set(0,0,0);let E=0,R=0,B=0,D=0,F=0,O=0,L=0,z=0,w=0,P=0,C=0;H.sort(oG);for(let k=0,d=H.length;k<d;k++){let A=H[k],m=A.color,c=A.intensity,y=A.distance,l=null;if(A.shadow&&A.shadow.map)if(A.shadow.map.texture.format===W8)l=A.shadow.map.texture;else l=A.shadow.map.depthTexture||A.shadow.map.texture;if(A.isAmbientLight)q+=m.r*c,G+=m.g*c,N+=m.b*c;else if(A.isLightProbe){for(let b=0;b<9;b++)Z.probe[b].addScaledVector(A.sh.coefficients[b],c);C++}else if(A.isDirectionalLight){let b=Q.get(A);if(b.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let p=A.shadow,a=$.get(A);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,Z.directionalShadow[E]=a,Z.directionalShadowMap[E]=l,Z.directionalShadowMatrix[E]=A.shadow.matrix,O++}Z.directional[E]=b,E++}else if(A.isSpotLight){let b=Q.get(A);b.position.setFromMatrixPosition(A.matrixWorld),b.color.copy(m).multiplyScalar(c),b.distance=y,b.coneCos=Math.cos(A.angle),b.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),b.decay=A.decay,Z.spot[B]=b;let p=A.shadow;if(A.map){if(Z.spotLightMap[w]=A.map,w++,p.updateMatrices(A),A.castShadow)P++}if(Z.spotLightMatrix[B]=p.matrix,A.castShadow){let a=$.get(A);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,Z.spotShadow[B]=a,Z.spotShadowMap[B]=l,z++}B++}else if(A.isRectAreaLight){let b=Q.get(A);b.color.copy(m).multiplyScalar(c),b.halfWidth.set(A.width*0.5,0,0),b.halfHeight.set(0,A.height*0.5,0),Z.rectArea[D]=b,D++}else if(A.isPointLight){let b=Q.get(A);if(b.color.copy(A.color).multiplyScalar(A.intensity),b.distance=A.distance,b.decay=A.decay,A.castShadow){let p=A.shadow,a=$.get(A);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,a.shadowCameraNear=p.camera.near,a.shadowCameraFar=p.camera.far,Z.pointShadow[R]=a,Z.pointShadowMap[R]=l,Z.pointShadowMatrix[R]=A.shadow.matrix,L++}Z.point[R]=b,R++}else if(A.isHemisphereLight){let b=Q.get(A);b.skyColor.copy(A.color).multiplyScalar(c),b.groundColor.copy(A.groundColor).multiplyScalar(c),Z.hemi[F]=b,F++}}if(D>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=X0.LTC_FLOAT_1,Z.rectAreaLTC2=X0.LTC_FLOAT_2;else Z.rectAreaLTC1=X0.LTC_HALF_1,Z.rectAreaLTC2=X0.LTC_HALF_2;Z.ambient[0]=q,Z.ambient[1]=G,Z.ambient[2]=N;let V=Z.hash;if(V.directionalLength!==E||V.pointLength!==R||V.spotLength!==B||V.rectAreaLength!==D||V.hemiLength!==F||V.numDirectionalShadows!==O||V.numPointShadows!==L||V.numSpotShadows!==z||V.numSpotMaps!==w||V.numLightProbes!==C)Z.directional.length=E,Z.spot.length=B,Z.rectArea.length=D,Z.point.length=R,Z.hemi.length=F,Z.directionalShadow.length=O,Z.directionalShadowMap.length=O,Z.pointShadow.length=L,Z.pointShadowMap.length=L,Z.spotShadow.length=z,Z.spotShadowMap.length=z,Z.directionalShadowMatrix.length=O,Z.pointShadowMatrix.length=L,Z.spotLightMatrix.length=z+w-P,Z.spotLightMap.length=w,Z.numSpotLightShadowsWithMaps=P,Z.numLightProbes=C,V.directionalLength=E,V.pointLength=R,V.spotLength=B,V.rectAreaLength=D,V.hemiLength=F,V.numDirectionalShadows=O,V.numPointShadows=L,V.numSpotShadows=z,V.numSpotMaps=w,V.numLightProbes=C,Z.version=iG++}function U(H,q){let G=0,N=0,E=0,R=0,B=0,D=q.matrixWorldInverse;for(let F=0,O=H.length;F<O;F++){let L=H[F];if(L.isDirectionalLight){let z=Z.directional[G];z.direction.setFromMatrixPosition(L.matrixWorld),W.setFromMatrixPosition(L.target.matrixWorld),z.direction.sub(W),z.direction.transformDirection(D),G++}else if(L.isSpotLight){let z=Z.spot[E];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(D),z.direction.setFromMatrixPosition(L.matrixWorld),W.setFromMatrixPosition(L.target.matrixWorld),z.direction.sub(W),z.direction.transformDirection(D),E++}else if(L.isRectAreaLight){let z=Z.rectArea[R];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(D),Y.identity(),K.copy(L.matrixWorld),K.premultiply(D),Y.extractRotation(K),z.halfWidth.set(L.width*0.5,0,0),z.halfHeight.set(0,L.height*0.5,0),z.halfWidth.applyMatrix4(Y),z.halfHeight.applyMatrix4(Y),R++}else if(L.isPointLight){let z=Z.point[N];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(D),N++}else if(L.isHemisphereLight){let z=Z.hemi[B];z.direction.setFromMatrixPosition(L.matrixWorld),z.direction.transformDirection(D),B++}}}return{setup:X,setupView:U,state:Z}}function XK(J){let Q=new aG(J),$=[],Z=[],W=[];function K(N){G.camera=N,$.length=0,Z.length=0,W.length=0}function Y(N){$.push(N)}function X(N){Z.push(N)}function U(N){W.push(N)}function H(){Q.setup($)}function q(N){Q.setupView($,N)}let G={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:G,setupLights:H,setupLightsView:q,pushLight:Y,pushShadow:X,pushLightProbeGrid:U}}function rG(J){let Q=new WeakMap;function $(W,K=0){let Y=Q.get(W),X;if(Y===void 0)X=new XK(J),Q.set(W,[X]);else if(K>=Y.length)X=new XK(J),Y.push(X);else X=Y[K];return X}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var tG=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,eG=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,J5=[new f(1,0,0),new f(-1,0,0),new f(0,1,0),new f(0,-1,0),new f(0,0,1),new f(0,0,-1)],Q5=[new f(0,-1,0),new f(0,-1,0),new f(0,0,1),new f(0,0,-1),new f(0,-1,0),new f(0,-1,0)],UK=new NJ,F7=new f,g$=new f;function $5(J,Q,$){let Z=new G7,W=new u0,K=new u0,Y=new EJ,X=new R$,U=new _$,H={},q=$.maxTextureSize,G={[f8]:hJ,[hJ]:f8,[dJ]:dJ},N=new eJ({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new u0},radius:{value:4}},vertexShader:tG,fragmentShader:eG}),E=N.clone();E.defines.HORIZONTAL_PASS=1;let R=new tJ;R.setAttribute("position",new aJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let B=new HJ(R,N),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=t8;let F=this.type;this.render=function(P,C,V){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(P.length===0)return;if(this.type===a7)w0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=t8;let k=J.getRenderTarget(),d=J.getActiveCubeFace(),A=J.getActiveMipmapLevel(),m=J.state;if(m.setBlending(F9),m.buffers.depth.getReversed()===!0)m.buffers.color.setClear(0,0,0,0);else m.buffers.color.setClear(1,1,1,1);m.buffers.depth.setTest(!0),m.setScissorTest(!1);let c=F!==this.type;if(c)C.traverse(function(y){if(y.material)if(Array.isArray(y.material))y.material.forEach((l)=>l.needsUpdate=!0);else y.material.needsUpdate=!0});for(let y=0,l=P.length;y<l;y++){let b=P[y],p=b.shadow;if(p===void 0){w0("WebGLShadowMap:",b,"has no shadow.");continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;W.copy(p.mapSize);let a=p.getFrameExtents();if(W.multiply(a),K.copy(p.mapSize),W.x>q||W.y>q){if(W.x>q)K.x=Math.floor(q/a.x),W.x=K.x*a.x,p.mapSize.x=K.x;if(W.y>q)K.y=Math.floor(q/a.y),W.y=K.y*a.y,p.mapSize.y=K.y}let Q0=J.state.buffers.depth.getReversed();if(p.camera._reversedDepth=Q0,p.map===null||c===!0){if(p.map!==null){if(p.map.depthTexture!==null)p.map.depthTexture.dispose(),p.map.depthTexture=null;p.map.dispose()}if(this.type===v8){if(b.isPointLight){w0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}p.map=new rJ(W.x,W.y,{format:W8,type:T9,minFilter:bJ,magFilter:bJ,generateMipmaps:!1}),p.map.texture.name=b.name+".shadowMap",p.map.depthTexture=new n9(W.x,W.y,C9),p.map.depthTexture.name=b.name+".shadowMapDepth",p.map.depthTexture.format=$8,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=u9,p.map.depthTexture.magFilter=u9}else{if(b.isPointLight)p.map=new d$(W.x),p.map.depthTexture=new E$(W.x,c9);else p.map=new rJ(W.x,W.y),p.map.depthTexture=new n9(W.x,W.y,c9);if(p.map.depthTexture.name=b.name+".shadowMap",p.map.depthTexture.format=$8,this.type===t8)p.map.depthTexture.compareFunction=Q0?U6:X6,p.map.depthTexture.minFilter=bJ,p.map.depthTexture.magFilter=bJ;else p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=u9,p.map.depthTexture.magFilter=u9}p.camera.updateProjectionMatrix()}let E0=p.map.isWebGLCubeRenderTarget?6:1;for(let I0=0;I0<E0;I0++){if(p.map.isWebGLCubeRenderTarget)J.setRenderTarget(p.map,I0),J.clear();else{if(I0===0)J.setRenderTarget(p.map),J.clear();let O0=p.getViewport(I0);Y.set(K.x*O0.x,K.y*O0.y,K.x*O0.z,K.y*O0.w),m.viewport(Y)}if(b.isPointLight){let{camera:O0,matrix:r0}=p,p0=b.distance||O0.far;if(p0!==O0.far)O0.far=p0,O0.updateProjectionMatrix();F7.setFromMatrixPosition(b.matrixWorld),O0.position.copy(F7),g$.copy(O0.position),g$.add(J5[I0]),O0.up.copy(Q5[I0]),O0.lookAt(g$),O0.updateMatrixWorld(),r0.makeTranslation(-F7.x,-F7.y,-F7.z),UK.multiplyMatrices(O0.projectionMatrix,O0.matrixWorldInverse),p._frustum.setFromProjectionMatrix(UK,O0.coordinateSystem,O0.reversedDepth)}else p.updateMatrices(b);Z=p.getFrustum(),z(C,V,p.camera,b,this.type)}if(p.isPointLightShadow!==!0&&this.type===v8)O(p,V);p.needsUpdate=!1}F=this.type,D.needsUpdate=!1,J.setRenderTarget(k,d,A)};function O(P,C){let V=Q.update(B);if(N.defines.VSM_SAMPLES!==P.blurSamples)N.defines.VSM_SAMPLES=P.blurSamples,E.defines.VSM_SAMPLES=P.blurSamples,N.needsUpdate=!0,E.needsUpdate=!0;if(P.mapPass===null)P.mapPass=new rJ(W.x,W.y,{format:W8,type:T9});N.uniforms.shadow_pass.value=P.map.depthTexture,N.uniforms.resolution.value=P.mapSize,N.uniforms.radius.value=P.radius,J.setRenderTarget(P.mapPass),J.clear(),J.renderBufferDirect(C,null,V,N,B,null),E.uniforms.shadow_pass.value=P.mapPass.texture,E.uniforms.resolution.value=P.mapSize,E.uniforms.radius.value=P.radius,J.setRenderTarget(P.map),J.clear(),J.renderBufferDirect(C,null,V,E,B,null)}function L(P,C,V,k){let d=null,A=V.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(A!==void 0)d=A;else if(d=V.isPointLight===!0?U:X,J.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let m=d.uuid,c=C.uuid,y=H[m];if(y===void 0)y={},H[m]=y;let l=y[c];if(l===void 0)l=d.clone(),y[c]=l,C.addEventListener("dispose",w);d=l}if(d.visible=C.visible,d.wireframe=C.wireframe,k===v8)d.side=C.shadowSide!==null?C.shadowSide:C.side;else d.side=C.shadowSide!==null?C.shadowSide:G[C.side];if(d.alphaMap=C.alphaMap,d.alphaTest=C.alphaToCoverage===!0?0.5:C.alphaTest,d.map=C.map,d.clipShadows=C.clipShadows,d.clippingPlanes=C.clippingPlanes,d.clipIntersection=C.clipIntersection,d.displacementMap=C.displacementMap,d.displacementScale=C.displacementScale,d.displacementBias=C.displacementBias,d.wireframeLinewidth=C.wireframeLinewidth,d.linewidth=C.linewidth,V.isPointLight===!0&&d.isMeshDistanceMaterial===!0){let m=J.properties.get(d);m.light=V}return d}function z(P,C,V,k,d){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)){if((P.castShadow||P.receiveShadow&&d===v8)&&(!P.frustumCulled||Z.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,P.matrixWorld);let c=Q.update(P),y=P.material;if(Array.isArray(y)){let l=c.groups;for(let b=0,p=l.length;b<p;b++){let a=l[b],Q0=y[a.materialIndex];if(Q0&&Q0.visible){let E0=L(P,Q0,k,d);P.onBeforeShadow(J,P,C,V,c,E0,a),J.renderBufferDirect(V,null,c,E0,P,a),P.onAfterShadow(J,P,C,V,c,E0,a)}}}else if(y.visible){let l=L(P,y,k,d);P.onBeforeShadow(J,P,C,V,c,l,null),J.renderBufferDirect(V,null,c,l,P,null),P.onAfterShadow(J,P,C,V,c,l,null)}}}let m=P.children;for(let c=0,y=m.length;c<y;c++)z(m[c],C,V,k,d)}function w(P){P.target.removeEventListener("dispose",w);for(let V in H){let k=H[V],d=P.target.uuid;if(d in k)k[d].dispose(),delete k[d]}}}function Z5(J,Q){function $(){let T=!1,Z0=new EJ,n=null,J0=new EJ(0,0,0,0);return{setMask:function(_0){if(n!==_0&&!T)J.colorMask(_0,_0,_0,_0),n=_0},setLocked:function(_0){T=_0},setClear:function(_0,t,L0,j0,OJ){if(OJ===!0)_0*=j0,t*=j0,L0*=j0;if(Z0.set(_0,t,L0,j0),J0.equals(Z0)===!1)J.clearColor(_0,t,L0,j0),J0.copy(Z0)},reset:function(){T=!1,n=null,J0.set(-1,0,0,0)}}}function Z(){let T=!1,Z0=!1,n=null,J0=null,_0=null;return{setReversed:function(t){if(Z0!==t){let L0=Q.get("EXT_clip_control");if(t)L0.clipControlEXT(L0.LOWER_LEFT_EXT,L0.ZERO_TO_ONE_EXT);else L0.clipControlEXT(L0.LOWER_LEFT_EXT,L0.NEGATIVE_ONE_TO_ONE_EXT);Z0=t;let j0=_0;_0=null,this.setClear(j0)}},getReversed:function(){return Z0},setTest:function(t){if(t)q0(J.DEPTH_TEST);else k0(J.DEPTH_TEST)},setMask:function(t){if(n!==t&&!T)J.depthMask(t),n=t},setFunc:function(t){if(Z0)t=vW[t];if(J0!==t){switch(t){case WW:J.depthFunc(J.NEVER);break;case KW:J.depthFunc(J.ALWAYS);break;case YW:J.depthFunc(J.LESS);break;case EQ:J.depthFunc(J.LEQUAL);break;case XW:J.depthFunc(J.EQUAL);break;case UW:J.depthFunc(J.GEQUAL);break;case HW:J.depthFunc(J.GREATER);break;case GW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}J0=t}},setLocked:function(t){T=t},setClear:function(t){if(_0!==t){if(_0=t,Z0)t=1-t;J.clearDepth(t)}},reset:function(){T=!1,n=null,J0=null,_0=null,Z0=!1}}}function W(){let T=!1,Z0=null,n=null,J0=null,_0=null,t=null,L0=null,j0=null,OJ=null;return{setTest:function(e0){if(!T)if(e0)q0(J.STENCIL_TEST);else k0(J.STENCIL_TEST)},setMask:function(e0){if(Z0!==e0&&!T)J.stencilMask(e0),Z0=e0},setFunc:function(e0,G9,Q9){if(n!==e0||J0!==G9||_0!==Q9)J.stencilFunc(e0,G9,Q9),n=e0,J0=G9,_0=Q9},setOp:function(e0,G9,Q9){if(t!==e0||L0!==G9||j0!==Q9)J.stencilOp(e0,G9,Q9),t=e0,L0=G9,j0=Q9},setLocked:function(e0){T=e0},setClear:function(e0){if(OJ!==e0)J.clearStencil(e0),OJ=e0},reset:function(){T=!1,Z0=null,n=null,J0=null,_0=null,t=null,L0=null,j0=null,OJ=null}}}let K=new $,Y=new Z,X=new W,U=new WeakMap,H=new WeakMap,q={},G={},N={},E=new WeakMap,R=[],B=null,D=!1,F=null,O=null,L=null,z=null,w=null,P=null,C=null,V=new m0(0,0,0),k=0,d=!1,A=null,m=null,c=null,y=null,l=null,b=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),p=!1,a=0,Q0=J.getParameter(J.VERSION);if(Q0.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(Q0)[1]),p=a>=1;else if(Q0.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(Q0)[1]),p=a>=2;let E0=null,I0={},O0=J.getParameter(J.SCISSOR_BOX),r0=J.getParameter(J.VIEWPORT),p0=new EJ().fromArray(O0),s=new EJ().fromArray(r0);function N0(T,Z0,n,J0){let _0=new Uint8Array(4),t=J.createTexture();J.bindTexture(T,t),J.texParameteri(T,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(T,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let L0=0;L0<n;L0++)if(T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY)J.texImage3D(Z0,0,J.RGBA,1,1,J0,0,J.RGBA,J.UNSIGNED_BYTE,_0);else J.texImage2D(Z0+L0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,_0);return t}let V0={};V0[J.TEXTURE_2D]=N0(J.TEXTURE_2D,J.TEXTURE_2D,1),V0[J.TEXTURE_CUBE_MAP]=N0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),V0[J.TEXTURE_2D_ARRAY]=N0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),V0[J.TEXTURE_3D]=N0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),Y.setClear(1),X.setClear(0),q0(J.DEPTH_TEST),Y.setFunc(EQ),wJ(!1),_J(HQ),q0(J.CULL_FACE),f0(F9);function q0(T){if(q[T]!==!0)J.enable(T),q[T]=!0}function k0(T){if(q[T]!==!1)J.disable(T),q[T]=!1}function a0(T,Z0){if(N[T]!==Z0){if(J.bindFramebuffer(T,Z0),N[T]=Z0,T===J.DRAW_FRAMEBUFFER)N[J.FRAMEBUFFER]=Z0;if(T===J.FRAMEBUFFER)N[J.DRAW_FRAMEBUFFER]=Z0;return!0}return!1}function h0(T,Z0){let n=R,J0=!1;if(T){if(n=E.get(Z0),n===void 0)n=[],E.set(Z0,n);let _0=T.textures;if(n.length!==_0.length||n[0]!==J.COLOR_ATTACHMENT0){for(let t=0,L0=_0.length;t<L0;t++)n[t]=J.COLOR_ATTACHMENT0+t;n.length=_0.length,J0=!0}}else if(n[0]!==J.BACK)n[0]=J.BACK,J0=!0;if(J0)J.drawBuffers(n)}function l0(T){if(B!==T)return J.useProgram(T),B=T,!0;return!1}let QJ={[x8]:J.FUNC_ADD,[gZ]:J.FUNC_SUBTRACT,[pZ]:J.FUNC_REVERSE_SUBTRACT};QJ[mZ]=J.MIN,QJ[lZ]=J.MAX;let $J={[dZ]:J.ZERO,[uZ]:J.ONE,[cZ]:J.SRC_COLOR,[sZ]:J.SRC_ALPHA,[eZ]:J.SRC_ALPHA_SATURATE,[rZ]:J.DST_COLOR,[oZ]:J.DST_ALPHA,[nZ]:J.ONE_MINUS_SRC_COLOR,[iZ]:J.ONE_MINUS_SRC_ALPHA,[tZ]:J.ONE_MINUS_DST_COLOR,[aZ]:J.ONE_MINUS_DST_ALPHA,[JW]:J.CONSTANT_COLOR,[QW]:J.ONE_MINUS_CONSTANT_COLOR,[$W]:J.CONSTANT_ALPHA,[ZW]:J.ONE_MINUS_CONSTANT_ALPHA};function f0(T,Z0,n,J0,_0,t,L0,j0,OJ,e0){if(T===F9){if(D===!0)k0(J.BLEND),D=!1;return}if(D===!1)q0(J.BLEND),D=!0;if(T!==bZ){if(T!==F||e0!==d){if(O!==x8||w!==x8)J.blendEquation(J.FUNC_ADD),O=x8,w=x8;if(e0)switch(T){case e8:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case GQ:J.blendFunc(J.ONE,J.ONE);break;case NQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case qQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:P0("WebGLState: Invalid blending: ",T);break}else switch(T){case e8:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case GQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case NQ:P0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qQ:P0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:P0("WebGLState: Invalid blending: ",T);break}L=null,z=null,P=null,C=null,V.set(0,0,0),k=0,F=T,d=e0}return}if(_0=_0||Z0,t=t||n,L0=L0||J0,Z0!==O||_0!==w)J.blendEquationSeparate(QJ[Z0],QJ[_0]),O=Z0,w=_0;if(n!==L||J0!==z||t!==P||L0!==C)J.blendFuncSeparate($J[n],$J[J0],$J[t],$J[L0]),L=n,z=J0,P=t,C=L0;if(j0.equals(V)===!1||OJ!==k)J.blendColor(j0.r,j0.g,j0.b,OJ),V.copy(j0),k=OJ;F=T,d=!1}function IJ(T,Z0){T.side===dJ?k0(J.CULL_FACE):q0(J.CULL_FACE);let n=T.side===hJ;if(Z0)n=!n;wJ(n),T.blending===e8&&T.transparent===!1?f0(F9):f0(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),Y.setFunc(T.depthFunc),Y.setTest(T.depthTest),Y.setMask(T.depthWrite),K.setMask(T.colorWrite);let J0=T.stencilWrite;if(X.setTest(J0),J0)X.setMask(T.stencilWriteMask),X.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),X.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass);yJ(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?q0(J.SAMPLE_ALPHA_TO_COVERAGE):k0(J.SAMPLE_ALPHA_TO_COVERAGE)}function wJ(T){if(A!==T){if(T)J.frontFace(J.CW);else J.frontFace(J.CCW);A=T}}function _J(T){if(T!==xZ){if(q0(J.CULL_FACE),T!==m)if(T===HQ)J.cullFace(J.BACK);else if(T===hZ)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else k0(J.CULL_FACE);m=T}function S(T){if(T!==c){if(p)J.lineWidth(T);c=T}}function yJ(T,Z0,n){if(T){if(q0(J.POLYGON_OFFSET_FILL),y!==Z0||l!==n){if(y=Z0,l=n,Y.getReversed())Z0=-Z0;J.polygonOffset(Z0,n)}}else k0(J.POLYGON_OFFSET_FILL)}function c0(T){if(T)q0(J.SCISSOR_TEST);else k0(J.SCISSOR_TEST)}function o0(T){if(T===void 0)T=J.TEXTURE0+b-1;if(E0!==T)J.activeTexture(T),E0=T}function H0(T,Z0,n){if(n===void 0)if(E0===null)n=J.TEXTURE0+b-1;else n=E0;let J0=I0[n];if(J0===void 0)J0={type:void 0,texture:void 0},I0[n]=J0;if(J0.type!==T||J0.texture!==Z0){if(E0!==n)J.activeTexture(n),E0=n;J.bindTexture(T,Z0||V0[T]),J0.type=T,J0.texture=Z0}}function qJ(){let T=I0[E0];if(T!==void 0&&T.type!==void 0)J.bindTexture(T.type,null),T.type=void 0,T.texture=void 0}function A0(){try{J.compressedTexImage2D(...arguments)}catch(T){P0("WebGLState:",T)}}function I(){try{J.compressedTexImage3D(...arguments)}catch(T){P0("WebGLState:",T)}}function _(){try{J.texSubImage2D(...arguments)}catch(T){P0("WebGLState:",T)}}function v(){try{J.texSubImage3D(...arguments)}catch(T){P0("WebGLState:",T)}}function o(){try{J.compressedTexSubImage2D(...arguments)}catch(T){P0("WebGLState:",T)}}function r(){try{J.compressedTexSubImage3D(...arguments)}catch(T){P0("WebGLState:",T)}}function e(){try{J.texStorage2D(...arguments)}catch(T){P0("WebGLState:",T)}}function K0(){try{J.texStorage3D(...arguments)}catch(T){P0("WebGLState:",T)}}function u(){try{J.texImage2D(...arguments)}catch(T){P0("WebGLState:",T)}}function i(){try{J.texImage3D(...arguments)}catch(T){P0("WebGLState:",T)}}function W0(T){if(G[T]!==void 0)return G[T];else return J.getParameter(T)}function R0(T,Z0){if(G[T]!==Z0)J.pixelStorei(T,Z0),G[T]=Z0}function $0(T){if(p0.equals(T)===!1)J.scissor(T.x,T.y,T.z,T.w),p0.copy(T)}function Y0(T){if(s.equals(T)===!1)J.viewport(T.x,T.y,T.z,T.w),s.copy(T)}function T0(T,Z0){let n=H.get(Z0);if(n===void 0)n=new WeakMap,H.set(Z0,n);let J0=n.get(T);if(J0===void 0)J0=J.getUniformBlockIndex(Z0,T.name),n.set(T,J0)}function v0(T,Z0){let J0=H.get(Z0).get(T);if(U.get(Z0)!==J0)J.uniformBlockBinding(Z0,J0,T.__bindingPointIndex),U.set(Z0,J0)}function b0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),Y.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),q={},G={},E0=null,I0={},N={},E=new WeakMap,R=[],B=null,D=!1,F=null,O=null,L=null,z=null,w=null,P=null,C=null,V=new m0(0,0,0),k=0,d=!1,A=null,m=null,c=null,y=null,l=null,p0.set(0,0,J.canvas.width,J.canvas.height),s.set(0,0,J.canvas.width,J.canvas.height),K.reset(),Y.reset(),X.reset()}return{buffers:{color:K,depth:Y,stencil:X},enable:q0,disable:k0,bindFramebuffer:a0,drawBuffers:h0,useProgram:l0,setBlending:f0,setMaterial:IJ,setFlipSided:wJ,setCullFace:_J,setLineWidth:S,setPolygonOffset:yJ,setScissorTest:c0,activeTexture:o0,bindTexture:H0,unbindTexture:qJ,compressedTexImage2D:A0,compressedTexImage3D:I,texImage2D:u,texImage3D:i,pixelStorei:R0,getParameter:W0,updateUBOMapping:T0,uniformBlockBinding:v0,texStorage2D:e,texStorage3D:K0,texSubImage2D:_,texSubImage3D:v,compressedTexSubImage2D:o,compressedTexSubImage3D:r,scissor:$0,viewport:Y0,reset:b0}}function W5(J,Q,$,Z,W,K,Y){let X=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,U=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),H=new u0,q=new WeakMap,G=new Set,N,E=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(I){}function B(I,_){return R?new OffscreenCanvas(I,_):j8("canvas")}function D(I,_,v){let o=1,r=A0(I);if(r.width>v||r.height>v)o=v/Math.max(r.width,r.height);if(o<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let e=Math.floor(o*r.width),K0=Math.floor(o*r.height);if(N===void 0)N=B(e,K0);let u=_?B(e,K0):N;return u.width=e,u.height=K0,u.getContext("2d").drawImage(I,0,0,e,K0),w0("WebGLRenderer: Texture has been resized from ("+r.width+"x"+r.height+") to ("+e+"x"+K0+")."),u}else{if("data"in I)w0("WebGLRenderer: Image in DataTexture is too big ("+r.width+"x"+r.height+").");return I}return I}function F(I){return I.generateMipmaps}function O(I){J.generateMipmap(I)}function L(I){if(I.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(I.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function z(I,_,v,o,r,e=!1){if(I!==null){if(J[I]!==void 0)return J[I];w0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let K0;if(o){if(K0=Q.get("EXT_texture_norm16"),!K0)w0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let u=_;if(_===J.RED){if(v===J.FLOAT)u=J.R32F;if(v===J.HALF_FLOAT)u=J.R16F;if(v===J.UNSIGNED_BYTE)u=J.R8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.R16_EXT;if(v===J.SHORT&&K0)u=K0.R16_SNORM_EXT}if(_===J.RED_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.R8UI;if(v===J.UNSIGNED_SHORT)u=J.R16UI;if(v===J.UNSIGNED_INT)u=J.R32UI;if(v===J.BYTE)u=J.R8I;if(v===J.SHORT)u=J.R16I;if(v===J.INT)u=J.R32I}if(_===J.RG){if(v===J.FLOAT)u=J.RG32F;if(v===J.HALF_FLOAT)u=J.RG16F;if(v===J.UNSIGNED_BYTE)u=J.RG8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.RG16_EXT;if(v===J.SHORT&&K0)u=K0.RG16_SNORM_EXT}if(_===J.RG_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RG8UI;if(v===J.UNSIGNED_SHORT)u=J.RG16UI;if(v===J.UNSIGNED_INT)u=J.RG32UI;if(v===J.BYTE)u=J.RG8I;if(v===J.SHORT)u=J.RG16I;if(v===J.INT)u=J.RG32I}if(_===J.RGB_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RGB8UI;if(v===J.UNSIGNED_SHORT)u=J.RGB16UI;if(v===J.UNSIGNED_INT)u=J.RGB32UI;if(v===J.BYTE)u=J.RGB8I;if(v===J.SHORT)u=J.RGB16I;if(v===J.INT)u=J.RGB32I}if(_===J.RGBA_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RGBA8UI;if(v===J.UNSIGNED_SHORT)u=J.RGBA16UI;if(v===J.UNSIGNED_INT)u=J.RGBA32UI;if(v===J.BYTE)u=J.RGBA8I;if(v===J.SHORT)u=J.RGBA16I;if(v===J.INT)u=J.RGBA32I}if(_===J.RGB){if(v===J.UNSIGNED_SHORT&&K0)u=K0.RGB16_EXT;if(v===J.SHORT&&K0)u=K0.RGB16_SNORM_EXT;if(v===J.UNSIGNED_INT_5_9_9_9_REV)u=J.RGB9_E5;if(v===J.UNSIGNED_INT_10F_11F_11F_REV)u=J.R11F_G11F_B10F}if(_===J.RGBA){let i=e?K$:d0.getTransfer(r);if(v===J.FLOAT)u=J.RGBA32F;if(v===J.HALF_FLOAT)u=J.RGBA16F;if(v===J.UNSIGNED_BYTE)u=i===KJ?J.SRGB8_ALPHA8:J.RGBA8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.RGBA16_EXT;if(v===J.SHORT&&K0)u=K0.RGBA16_SNORM_EXT;if(v===J.UNSIGNED_SHORT_4_4_4_4)u=J.RGBA4;if(v===J.UNSIGNED_SHORT_5_5_5_1)u=J.RGB5_A1}if(u===J.R16F||u===J.R32F||u===J.RG16F||u===J.RG32F||u===J.RGBA16F||u===J.RGBA32F)Q.get("EXT_color_buffer_float");return u}function w(I,_){let v;if(I){if(_===null||_===c9||_===b8)v=J.DEPTH24_STENCIL8;else if(_===C9)v=J.DEPTH32F_STENCIL8;else if(_===$7)v=J.DEPTH24_STENCIL8,w0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(_===null||_===c9||_===b8)v=J.DEPTH_COMPONENT24;else if(_===C9)v=J.DEPTH_COMPONENT32F;else if(_===$7)v=J.DEPTH_COMPONENT16;return v}function P(I,_){if(F(I)===!0||I.isFramebufferTexture&&I.minFilter!==u9&&I.minFilter!==bJ)return Math.log2(Math.max(_.width,_.height))+1;else if(I.mipmaps!==void 0&&I.mipmaps.length>0)return I.mipmaps.length;else if(I.isCompressedTexture&&Array.isArray(I.image))return _.mipmaps.length;else return 1}function C(I){let _=I.target;if(_.removeEventListener("dispose",C),k(_),_.isVideoTexture)q.delete(_);if(_.isHTMLTexture)G.delete(_)}function V(I){let _=I.target;_.removeEventListener("dispose",V),A(_)}function k(I){let _=Z.get(I);if(_.__webglInit===void 0)return;let v=I.source,o=E.get(v);if(o){let r=o[_.__cacheKey];if(r.usedTimes--,r.usedTimes===0)d(I);if(Object.keys(o).length===0)E.delete(v)}Z.remove(I)}function d(I){let _=Z.get(I);J.deleteTexture(_.__webglTexture);let v=I.source,o=E.get(v);delete o[_.__cacheKey],Y.memory.textures--}function A(I){let _=Z.get(I);if(I.depthTexture)I.depthTexture.dispose(),Z.remove(I.depthTexture);if(I.isWebGLCubeRenderTarget)for(let o=0;o<6;o++){if(Array.isArray(_.__webglFramebuffer[o]))for(let r=0;r<_.__webglFramebuffer[o].length;r++)J.deleteFramebuffer(_.__webglFramebuffer[o][r]);else J.deleteFramebuffer(_.__webglFramebuffer[o]);if(_.__webglDepthbuffer)J.deleteRenderbuffer(_.__webglDepthbuffer[o])}else{if(Array.isArray(_.__webglFramebuffer))for(let o=0;o<_.__webglFramebuffer.length;o++)J.deleteFramebuffer(_.__webglFramebuffer[o]);else J.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer)J.deleteRenderbuffer(_.__webglDepthbuffer);if(_.__webglMultisampledFramebuffer)J.deleteFramebuffer(_.__webglMultisampledFramebuffer);if(_.__webglColorRenderbuffer){for(let o=0;o<_.__webglColorRenderbuffer.length;o++)if(_.__webglColorRenderbuffer[o])J.deleteRenderbuffer(_.__webglColorRenderbuffer[o])}if(_.__webglDepthRenderbuffer)J.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let v=I.textures;for(let o=0,r=v.length;o<r;o++){let e=Z.get(v[o]);if(e.__webglTexture)J.deleteTexture(e.__webglTexture),Y.memory.textures--;Z.remove(v[o])}Z.remove(I)}let m=0;function c(){m=0}function y(){return m}function l(I){m=I}function b(){let I=m;if(I>=W.maxTextures)w0("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+W.maxTextures);return m+=1,I}function p(I){let _=[];return _.push(I.wrapS),_.push(I.wrapT),_.push(I.wrapR||0),_.push(I.magFilter),_.push(I.minFilter),_.push(I.anisotropy),_.push(I.internalFormat),_.push(I.format),_.push(I.type),_.push(I.generateMipmaps),_.push(I.premultiplyAlpha),_.push(I.flipY),_.push(I.unpackAlignment),_.push(I.colorSpace),_.join()}function a(I,_){let v=Z.get(I);if(I.isVideoTexture)H0(I);if(I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&v.__version!==I.version){let o=I.image;if(o===null)w0("WebGLRenderer: Texture marked for update but no image data found.");else if(o.complete===!1)w0("WebGLRenderer: Texture marked for update but image is incomplete");else{k0(v,I,_);return}}else if(I.isExternalTexture)v.__webglTexture=I.sourceTexture?I.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,v.__webglTexture,J.TEXTURE0+_)}function Q0(I,_){let v=Z.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&v.__version!==I.version){k0(v,I,_);return}else if(I.isExternalTexture)v.__webglTexture=I.sourceTexture?I.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,v.__webglTexture,J.TEXTURE0+_)}function E0(I,_){let v=Z.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&v.__version!==I.version){k0(v,I,_);return}$.bindTexture(J.TEXTURE_3D,v.__webglTexture,J.TEXTURE0+_)}function I0(I,_){let v=Z.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&v.__version!==I.version){a0(v,I,_);return}$.bindTexture(J.TEXTURE_CUBE_MAP,v.__webglTexture,J.TEXTURE0+_)}let O0={[DW]:J.REPEAT,[e7]:J.CLAMP_TO_EDGE,[FW]:J.MIRRORED_REPEAT},r0={[u9]:J.NEAREST,[RW]:J.NEAREST_MIPMAP_NEAREST,[Q7]:J.NEAREST_MIPMAP_LINEAR,[bJ]:J.LINEAR,[J6]:J.LINEAR_MIPMAP_NEAREST,[Q8]:J.LINEAR_MIPMAP_LINEAR},p0={[kW]:J.NEVER,[TW]:J.ALWAYS,[AW]:J.LESS,[X6]:J.LEQUAL,[PW]:J.EQUAL,[U6]:J.GEQUAL,[wW]:J.GREATER,[CW]:J.NOTEQUAL};function s(I,_){if(_.type===C9&&Q.has("OES_texture_float_linear")===!1&&(_.magFilter===bJ||_.magFilter===J6||_.magFilter===Q7||_.magFilter===Q8||_.minFilter===bJ||_.minFilter===J6||_.minFilter===Q7||_.minFilter===Q8))w0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(I,J.TEXTURE_WRAP_S,O0[_.wrapS]),J.texParameteri(I,J.TEXTURE_WRAP_T,O0[_.wrapT]),I===J.TEXTURE_3D||I===J.TEXTURE_2D_ARRAY)J.texParameteri(I,J.TEXTURE_WRAP_R,O0[_.wrapR]);if(J.texParameteri(I,J.TEXTURE_MAG_FILTER,r0[_.magFilter]),J.texParameteri(I,J.TEXTURE_MIN_FILTER,r0[_.minFilter]),_.compareFunction)J.texParameteri(I,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(I,J.TEXTURE_COMPARE_FUNC,p0[_.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===u9)return;if(_.minFilter!==Q7&&_.minFilter!==Q8)return;if(_.type===C9&&Q.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||Z.get(_).__currentAnisotropy){let v=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(I,v.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,W.getMaxAnisotropy())),Z.get(_).__currentAnisotropy=_.anisotropy}}}function N0(I,_){let v=!1;if(I.__webglInit===void 0)I.__webglInit=!0,_.addEventListener("dispose",C);let o=_.source,r=E.get(o);if(r===void 0)r={},E.set(o,r);let e=p(_);if(e!==I.__cacheKey){if(r[e]===void 0)r[e]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,v=!0;r[e].usedTimes++;let K0=r[I.__cacheKey];if(K0!==void 0){if(r[I.__cacheKey].usedTimes--,K0.usedTimes===0)d(_)}I.__cacheKey=e,I.__webglTexture=r[e].texture}return v}function V0(I,_,v){return Math.floor(Math.floor(I/v)/_)}function q0(I,_,v,o){let e=I.updateRanges;if(e.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,_.width,_.height,v,o,_.data);else{e.sort((R0,$0)=>R0.start-$0.start);let K0=0;for(let R0=1;R0<e.length;R0++){let $0=e[K0],Y0=e[R0],T0=$0.start+$0.count,v0=V0(Y0.start,_.width,4),b0=V0($0.start,_.width,4);if(Y0.start<=T0+1&&v0===b0&&V0(Y0.start+Y0.count-1,_.width,4)===v0)$0.count=Math.max($0.count,Y0.start+Y0.count-$0.start);else++K0,e[K0]=Y0}e.length=K0+1;let u=$.getParameter(J.UNPACK_ROW_LENGTH),i=$.getParameter(J.UNPACK_SKIP_PIXELS),W0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,_.width);for(let R0=0,$0=e.length;R0<$0;R0++){let Y0=e[R0],T0=Math.floor(Y0.start/4),v0=Math.ceil(Y0.count/4),b0=T0%_.width,T=Math.floor(T0/_.width),Z0=v0,n=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,b0),$.pixelStorei(J.UNPACK_SKIP_ROWS,T),$.texSubImage2D(J.TEXTURE_2D,0,b0,T,Z0,1,v,o,_.data)}I.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,u),$.pixelStorei(J.UNPACK_SKIP_PIXELS,i),$.pixelStorei(J.UNPACK_SKIP_ROWS,W0)}}function k0(I,_,v){let o=J.TEXTURE_2D;if(_.isDataArrayTexture||_.isCompressedArrayTexture)o=J.TEXTURE_2D_ARRAY;if(_.isData3DTexture)o=J.TEXTURE_3D;let r=N0(I,_),e=_.source;$.bindTexture(o,I.__webglTexture,J.TEXTURE0+v);let K0=Z.get(e);if(e.version!==K0.__version||r===!0){if($.activeTexture(J.TEXTURE0+v),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let n=d0.getPrimaries(d0.workingColorSpace),J0=_.colorSpace===K8?null:d0.getPrimaries(_.colorSpace),_0=_.colorSpace===K8||n===J0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,_.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,_0)}$.pixelStorei(J.UNPACK_ALIGNMENT,_.unpackAlignment);let i=D(_.image,!1,W.maxTextureSize);i=qJ(_,i);let W0=K.convert(_.format,_.colorSpace),R0=K.convert(_.type),$0=z(_.internalFormat,W0,R0,_.normalized,_.colorSpace,_.isVideoTexture);s(o,_);let Y0,T0=_.mipmaps,v0=_.isVideoTexture!==!0,b0=K0.__version===void 0||r===!0,T=e.dataReady,Z0=P(_,i);if(_.isDepthTexture){if($0=w(_.format===Z8,_.type),b0)if(v0)$.texStorage2D(J.TEXTURE_2D,1,$0,i.width,i.height);else $.texImage2D(J.TEXTURE_2D,0,$0,i.width,i.height,0,W0,R0,null)}else if(_.isDataTexture)if(T0.length>0){if(v0&&b0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,T0[0].width,T0[0].height);for(let n=0,J0=T0.length;n<J0;n++)if(Y0=T0[n],v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,R0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,W0,R0,Y0.data);_.generateMipmaps=!1}else if(v0){if(b0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,i.width,i.height);if(T)q0(_,i,W0,R0)}else $.texImage2D(J.TEXTURE_2D,0,$0,i.width,i.height,0,W0,R0,i.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){if(v0&&b0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,$0,T0[0].width,T0[0].height,i.depth);for(let n=0,J0=T0.length;n<J0;n++)if(Y0=T0[n],_.format!==R9)if(W0!==null)if(v0){if(T)if(_.layerUpdates.size>0){let _0=y$(Y0.width,Y0.height,_.format,_.type);for(let t of _.layerUpdates){let L0=Y0.data.subarray(t*_0/Y0.data.BYTES_PER_ELEMENT,(t+1)*_0/Y0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,t,Y0.width,Y0.height,1,W0,L0)}_.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,0,Y0.width,Y0.height,i.depth,W0,Y0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,n,$0,Y0.width,Y0.height,i.depth,0,Y0.data,0,0);else w0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(v0){if(T)$.texSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,0,Y0.width,Y0.height,i.depth,W0,R0,Y0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,n,$0,Y0.width,Y0.height,i.depth,0,W0,R0,Y0.data)}else{if(v0&&b0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,T0[0].width,T0[0].height);for(let n=0,J0=T0.length;n<J0;n++)if(Y0=T0[n],_.format!==R9)if(W0!==null)if(v0){if(T)$.compressedTexSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,Y0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,Y0.data);else w0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,R0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,W0,R0,Y0.data)}else if(_.isDataArrayTexture)if(v0){if(b0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,$0,i.width,i.height,i.depth);if(T)if(_.layerUpdates.size>0){let n=y$(i.width,i.height,_.format,_.type);for(let J0 of _.layerUpdates){let _0=i.data.subarray(J0*n/i.data.BYTES_PER_ELEMENT,(J0+1)*n/i.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,J0,i.width,i.height,1,W0,R0,_0)}_.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,W0,R0,i.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,$0,i.width,i.height,i.depth,0,W0,R0,i.data);else if(_.isData3DTexture)if(v0){if(b0)$.texStorage3D(J.TEXTURE_3D,Z0,$0,i.width,i.height,i.depth);if(T)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,W0,R0,i.data)}else $.texImage3D(J.TEXTURE_3D,0,$0,i.width,i.height,i.depth,0,W0,R0,i.data);else if(_.isFramebufferTexture){if(b0)if(v0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,i.width,i.height);else{let{width:n,height:J0}=i;for(let _0=0;_0<Z0;_0++)$.texImage2D(J.TEXTURE_2D,_0,$0,n,J0,0,W0,R0,null),n>>=1,J0>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in J){let n=J.canvas;if(!n.hasAttribute("layoutsubtree"))n.setAttribute("layoutsubtree","true");if(i.parentNode!==n){n.appendChild(i),G.add(_),n.onpaint=(j0)=>{let OJ=j0.changedElements;for(let e0 of G)if(OJ.includes(e0.image))e0.needsUpdate=!0},n.requestPaint();return}let J0=0,_0=J.RGBA,t=J.RGBA,L0=J.UNSIGNED_BYTE;J.texElementImage2D(J.TEXTURE_2D,J0,_0,t,L0,i),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(T0.length>0){if(v0&&b0){let n=A0(T0[0]);$.texStorage2D(J.TEXTURE_2D,Z0,$0,n.width,n.height)}for(let n=0,J0=T0.length;n<J0;n++)if(Y0=T0[n],v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,W0,R0,Y0)}else $.texImage2D(J.TEXTURE_2D,n,$0,W0,R0,Y0);_.generateMipmaps=!1}else if(v0){if(b0){let n=A0(i);$.texStorage2D(J.TEXTURE_2D,Z0,$0,n.width,n.height)}if(T)$.texSubImage2D(J.TEXTURE_2D,0,0,0,W0,R0,i)}else $.texImage2D(J.TEXTURE_2D,0,$0,W0,R0,i);if(F(_))O(o);if(K0.__version=e.version,_.onUpdate)_.onUpdate(_)}I.__version=_.version}function a0(I,_,v){if(_.image.length!==6)return;let o=N0(I,_),r=_.source;$.bindTexture(J.TEXTURE_CUBE_MAP,I.__webglTexture,J.TEXTURE0+v);let e=Z.get(r);if(r.version!==e.__version||o===!0){$.activeTexture(J.TEXTURE0+v);let K0=d0.getPrimaries(d0.workingColorSpace),u=_.colorSpace===K8?null:d0.getPrimaries(_.colorSpace),i=_.colorSpace===K8||K0===u?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,_.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,_.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,i);let W0=_.isCompressedTexture||_.image[0].isCompressedTexture,R0=_.image[0]&&_.image[0].isDataTexture,$0=[];for(let t=0;t<6;t++){if(!W0&&!R0)$0[t]=D(_.image[t],!0,W.maxCubemapSize);else $0[t]=R0?_.image[t].image:_.image[t];$0[t]=qJ(_,$0[t])}let Y0=$0[0],T0=K.convert(_.format,_.colorSpace),v0=K.convert(_.type),b0=z(_.internalFormat,T0,v0,_.normalized,_.colorSpace),T=_.isVideoTexture!==!0,Z0=e.__version===void 0||o===!0,n=r.dataReady,J0=P(_,Y0);s(J.TEXTURE_CUBE_MAP,_);let _0;if(W0){if(T&&Z0)$.texStorage2D(J.TEXTURE_CUBE_MAP,J0,b0,Y0.width,Y0.height);for(let t=0;t<6;t++){_0=$0[t].mipmaps;for(let L0=0;L0<_0.length;L0++){let j0=_0[L0];if(_.format!==R9)if(T0!==null)if(T){if(n)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,0,0,j0.width,j0.height,T0,j0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,b0,j0.width,j0.height,0,j0.data);else w0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,0,0,j0.width,j0.height,T0,v0,j0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,b0,j0.width,j0.height,0,T0,v0,j0.data)}}}else{if(_0=_.mipmaps,T&&Z0){if(_0.length>0)J0++;let t=A0($0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,J0,b0,t.width,t.height)}for(let t=0;t<6;t++)if(R0){if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,$0[t].width,$0[t].height,T0,v0,$0[t].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,b0,$0[t].width,$0[t].height,0,T0,v0,$0[t].data);for(let L0=0;L0<_0.length;L0++){let OJ=_0[L0].image[t].image;if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,0,0,OJ.width,OJ.height,T0,v0,OJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,b0,OJ.width,OJ.height,0,T0,v0,OJ.data)}}else{if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,T0,v0,$0[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,b0,T0,v0,$0[t]);for(let L0=0;L0<_0.length;L0++){let j0=_0[L0];if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,0,0,T0,v0,j0.image[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,b0,T0,v0,j0.image[t])}}}if(F(_))O(J.TEXTURE_CUBE_MAP);if(e.__version=r.version,_.onUpdate)_.onUpdate(_)}I.__version=_.version}function h0(I,_,v,o,r,e){let K0=K.convert(v.format,v.colorSpace),u=K.convert(v.type),i=z(v.internalFormat,K0,u,v.normalized,v.colorSpace),W0=Z.get(_),R0=Z.get(v);if(R0.__renderTarget=_,!W0.__hasExternalTextures){let $0=Math.max(1,_.width>>e),Y0=Math.max(1,_.height>>e);if(r===J.TEXTURE_3D||r===J.TEXTURE_2D_ARRAY)$.texImage3D(r,e,i,$0,Y0,_.depth,0,K0,u,null);else $.texImage2D(r,e,i,$0,Y0,0,K0,u,null)}if($.bindFramebuffer(J.FRAMEBUFFER,I),o0(_))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,r,R0.__webglTexture,0,c0(_));else if(r===J.TEXTURE_2D||r>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&r<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,o,r,R0.__webglTexture,e);$.bindFramebuffer(J.FRAMEBUFFER,null)}function l0(I,_,v){if(J.bindRenderbuffer(J.RENDERBUFFER,I),_.depthBuffer){let o=_.depthTexture,r=o&&o.isDepthTexture?o.type:null,e=w(_.stencilBuffer,r),K0=_.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(o0(_))X.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,c0(_),e,_.width,_.height);else if(v)J.renderbufferStorageMultisample(J.RENDERBUFFER,c0(_),e,_.width,_.height);else J.renderbufferStorage(J.RENDERBUFFER,e,_.width,_.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,K0,J.RENDERBUFFER,I)}else{let o=_.textures;for(let r=0;r<o.length;r++){let e=o[r],K0=K.convert(e.format,e.colorSpace),u=K.convert(e.type),i=z(e.internalFormat,K0,u,e.normalized,e.colorSpace);if(o0(_))X.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,c0(_),i,_.width,_.height);else if(v)J.renderbufferStorageMultisample(J.RENDERBUFFER,c0(_),i,_.width,_.height);else J.renderbufferStorage(J.RENDERBUFFER,i,_.width,_.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function QJ(I,_,v){let o=_.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,I),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let r=Z.get(_.depthTexture);if(r.__renderTarget=_,!r.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0;if(o){if(r.__webglInit===void 0)r.__webglInit=!0,_.depthTexture.addEventListener("dispose",C);if(r.__webglTexture===void 0){r.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,r.__webglTexture),s(J.TEXTURE_CUBE_MAP,_.depthTexture);let W0=K.convert(_.depthTexture.format),R0=K.convert(_.depthTexture.type),$0;if(_.depthTexture.format===$8)$0=J.DEPTH_COMPONENT24;else if(_.depthTexture.format===Z8)$0=J.DEPTH24_STENCIL8;for(let Y0=0;Y0<6;Y0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Y0,0,$0,_.width,_.height,0,W0,R0,null)}}else a(_.depthTexture,0);let e=r.__webglTexture,K0=c0(_),u=o?J.TEXTURE_CUBE_MAP_POSITIVE_X+v:J.TEXTURE_2D,i=_.depthTexture.format===Z8?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(_.depthTexture.format===$8)if(o0(_))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,e,0,K0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,e,0);else if(_.depthTexture.format===Z8)if(o0(_))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,e,0,K0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,e,0);else throw Error("Unknown depthTexture format")}function $J(I){let _=Z.get(I),v=I.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==I.depthTexture){let o=I.depthTexture;if(_.__depthDisposeCallback)_.__depthDisposeCallback();if(o){let r=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,o.removeEventListener("dispose",r)};o.addEventListener("dispose",r),_.__depthDisposeCallback=r}_.__boundDepthTexture=o}if(I.depthTexture&&!_.__autoAllocateDepthBuffer)if(v)for(let o=0;o<6;o++)QJ(_.__webglFramebuffer[o],I,o);else{let o=I.texture.mipmaps;if(o&&o.length>0)QJ(_.__webglFramebuffer[0],I,0);else QJ(_.__webglFramebuffer,I,0)}else if(v){_.__webglDepthbuffer=[];for(let o=0;o<6;o++)if($.bindFramebuffer(J.FRAMEBUFFER,_.__webglFramebuffer[o]),_.__webglDepthbuffer[o]===void 0)_.__webglDepthbuffer[o]=J.createRenderbuffer(),l0(_.__webglDepthbuffer[o],I,!1);else{let r=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,e=_.__webglDepthbuffer[o];J.bindRenderbuffer(J.RENDERBUFFER,e),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,e)}}else{let o=I.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.FRAMEBUFFER,_.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,_.__webglFramebuffer);if(_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=J.createRenderbuffer(),l0(_.__webglDepthbuffer,I,!1);else{let r=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,e=_.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,e),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,e)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function f0(I,_,v){let o=Z.get(I);if(_!==void 0)h0(o.__webglFramebuffer,I,I.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(v!==void 0)$J(I)}function IJ(I){let _=I.texture,v=Z.get(I),o=Z.get(_);I.addEventListener("dispose",V);let r=I.textures,e=I.isWebGLCubeRenderTarget===!0,K0=r.length>1;if(!K0){if(o.__webglTexture===void 0)o.__webglTexture=J.createTexture();o.__version=_.version,Y.memory.textures++}if(e){v.__webglFramebuffer=[];for(let u=0;u<6;u++)if(_.mipmaps&&_.mipmaps.length>0){v.__webglFramebuffer[u]=[];for(let i=0;i<_.mipmaps.length;i++)v.__webglFramebuffer[u][i]=J.createFramebuffer()}else v.__webglFramebuffer[u]=J.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){v.__webglFramebuffer=[];for(let u=0;u<_.mipmaps.length;u++)v.__webglFramebuffer[u]=J.createFramebuffer()}else v.__webglFramebuffer=J.createFramebuffer();if(K0)for(let u=0,i=r.length;u<i;u++){let W0=Z.get(r[u]);if(W0.__webglTexture===void 0)W0.__webglTexture=J.createTexture(),Y.memory.textures++}if(I.samples>0&&o0(I)===!1){v.__webglMultisampledFramebuffer=J.createFramebuffer(),v.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,v.__webglMultisampledFramebuffer);for(let u=0;u<r.length;u++){let i=r[u];v.__webglColorRenderbuffer[u]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,v.__webglColorRenderbuffer[u]);let W0=K.convert(i.format,i.colorSpace),R0=K.convert(i.type),$0=z(i.internalFormat,W0,R0,i.normalized,i.colorSpace,I.isXRRenderTarget===!0),Y0=c0(I);J.renderbufferStorageMultisample(J.RENDERBUFFER,Y0,$0,I.width,I.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u,J.RENDERBUFFER,v.__webglColorRenderbuffer[u])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),I.depthBuffer)v.__webglDepthRenderbuffer=J.createRenderbuffer(),l0(v.__webglDepthRenderbuffer,I,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(e){$.bindTexture(J.TEXTURE_CUBE_MAP,o.__webglTexture),s(J.TEXTURE_CUBE_MAP,_);for(let u=0;u<6;u++)if(_.mipmaps&&_.mipmaps.length>0)for(let i=0;i<_.mipmaps.length;i++)h0(v.__webglFramebuffer[u][i],I,_,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,i);else h0(v.__webglFramebuffer[u],I,_,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,0);if(F(_))O(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(K0){for(let u=0,i=r.length;u<i;u++){let W0=r[u],R0=Z.get(W0),$0=J.TEXTURE_2D;if(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)$0=I.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture($0,R0.__webglTexture),s($0,W0),h0(v.__webglFramebuffer,I,W0,J.COLOR_ATTACHMENT0+u,$0,0),F(W0))O($0)}$.unbindTexture()}else{let u=J.TEXTURE_2D;if(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)u=I.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(u,o.__webglTexture),s(u,_),_.mipmaps&&_.mipmaps.length>0)for(let i=0;i<_.mipmaps.length;i++)h0(v.__webglFramebuffer[i],I,_,J.COLOR_ATTACHMENT0,u,i);else h0(v.__webglFramebuffer,I,_,J.COLOR_ATTACHMENT0,u,0);if(F(_))O(u);$.unbindTexture()}if(I.depthBuffer)$J(I)}function wJ(I){let _=I.textures;for(let v=0,o=_.length;v<o;v++){let r=_[v];if(F(r)){let e=L(I),K0=Z.get(r).__webglTexture;$.bindTexture(e,K0),O(e),$.unbindTexture()}}}let _J=[],S=[];function yJ(I){if(I.samples>0){if(o0(I)===!1){let{textures:_,width:v,height:o}=I,r=J.COLOR_BUFFER_BIT,e=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,K0=Z.get(I),u=_.length>1;if(u)for(let W0=0;W0<_.length;W0++)$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,K0.__webglMultisampledFramebuffer);let i=I.texture.mipmaps;if(i&&i.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglFramebuffer);for(let W0=0;W0<_.length;W0++){if(I.resolveDepthBuffer){if(I.depthBuffer)r|=J.DEPTH_BUFFER_BIT;if(I.stencilBuffer&&I.resolveStencilBuffer)r|=J.STENCIL_BUFFER_BIT}if(u){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,K0.__webglColorRenderbuffer[W0]);let R0=Z.get(_[W0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,R0,0)}if(J.blitFramebuffer(0,0,v,o,0,0,v,o,r,J.NEAREST),U===!0){if(_J.length=0,S.length=0,_J.push(J.COLOR_ATTACHMENT0+W0),I.depthBuffer&&I.resolveDepthBuffer===!1)_J.push(e),S.push(e),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,S);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,_J)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),u)for(let W0=0;W0<_.length;W0++){$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,K0.__webglColorRenderbuffer[W0]);let R0=Z.get(_[W0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.TEXTURE_2D,R0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&U){let _=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[_])}}}function c0(I){return Math.min(W.maxSamples,I.samples)}function o0(I){let _=Z.get(I);return I.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function H0(I){let _=Y.render.frame;if(q.get(I)!==_)q.set(I,_),I.update()}function qJ(I,_){let{colorSpace:v,format:o,type:r}=I;if(I.isCompressedTexture===!0||I.isVideoTexture===!0)return _;if(v!==W$&&v!==K8)if(d0.getTransfer(v)===KJ){if(o!==R9||r!==U9)w0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else P0("WebGLTextures: Unsupported texture color space:",v);return _}function A0(I){if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement)H.width=I.naturalWidth||I.width,H.height=I.naturalHeight||I.height;else if(typeof VideoFrame<"u"&&I instanceof VideoFrame)H.width=I.displayWidth,H.height=I.displayHeight;else H.width=I.width,H.height=I.height;return H}this.allocateTextureUnit=b,this.resetTextureUnits=c,this.getTextureUnits=y,this.setTextureUnits=l,this.setTexture2D=a,this.setTexture2DArray=Q0,this.setTexture3D=E0,this.setTextureCube=I0,this.rebindTextures=f0,this.setupRenderTarget=IJ,this.updateRenderTargetMipmap=wJ,this.updateMultisampleRenderTarget=yJ,this.setupDepthRenderbuffer=$J,this.setupFrameBufferTexture=h0,this.useMultisampledRTT=o0,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function K5(J,Q){function $(Z,W=K8){let K,Y=d0.getTransfer(W);if(Z===U9)return J.UNSIGNED_BYTE;if(Z===BQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===zQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===MW)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===VW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===_W)return J.BYTE;if(Z===OW)return J.SHORT;if(Z===$7)return J.UNSIGNED_SHORT;if(Z===LQ)return J.INT;if(Z===c9)return J.UNSIGNED_INT;if(Z===C9)return J.FLOAT;if(Z===T9)return J.HALF_FLOAT;if(Z===LW)return J.ALPHA;if(Z===BW)return J.RGB;if(Z===R9)return J.RGBA;if(Z===$8)return J.DEPTH_COMPONENT;if(Z===Z8)return J.DEPTH_STENCIL;if(Z===zW)return J.RED;if(Z===IQ)return J.RED_INTEGER;if(Z===W8)return J.RG;if(Z===kQ)return J.RG_INTEGER;if(Z===AQ)return J.RGBA_INTEGER;if(Z===Q6||Z===$6||Z===Z6||Z===W6)if(Y===KJ)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===Q6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===$6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===Z6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===W6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===Q6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===$6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===Z6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===W6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===PQ||Z===wQ||Z===CQ||Z===TQ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===PQ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===wQ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===CQ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===TQ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===SQ||Z===jQ||Z===yQ||Z===vQ||Z===fQ||Z===K6||Z===xQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===SQ||Z===jQ)return Y===KJ?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===yQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===vQ)return K.COMPRESSED_R11_EAC;if(Z===fQ)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===K6)return K.COMPRESSED_RG11_EAC;if(Z===xQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===hQ||Z===bQ||Z===gQ||Z===pQ||Z===mQ||Z===lQ||Z===dQ||Z===uQ||Z===cQ||Z===nQ||Z===sQ||Z===iQ||Z===oQ||Z===aQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===hQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===bQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===gQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===pQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===mQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===lQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===dQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===uQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===cQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===nQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===sQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===iQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===oQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===aQ)return Y===KJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===rQ||Z===tQ||Z===eQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===rQ)return Y===KJ?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===tQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===eQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===J$||Z===Q$||Z===Y6||Z===$$)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===J$)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===Q$)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===Y6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===$$)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===b8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var Y5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,X5=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class VK{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new F6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new eJ({vertexShader:Y5,fragmentShader:X5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new HJ(new v9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class LK extends S9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,Y="local-floor",X=1,U=null,H=null,q=null,G=null,N=null,E=null,R=typeof XRWebGLBinding<"u",B=new VK,D={},F=Q.getContextAttributes(),O=null,L=null,z=[],w=[],P=new u0,C=null,V=new vJ;V.viewport=new EJ;let k=new vJ;k.viewport=new EJ;let d=[V,k],A=new C$,m=null,c=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(s){let N0=z[s];if(N0===void 0)N0=new X7,z[s]=N0;return N0.getTargetRaySpace()},this.getControllerGrip=function(s){let N0=z[s];if(N0===void 0)N0=new X7,z[s]=N0;return N0.getGripSpace()},this.getHand=function(s){let N0=z[s];if(N0===void 0)N0=new X7,z[s]=N0;return N0.getHandSpace()};function y(s){let N0=w.indexOf(s.inputSource);if(N0===-1)return;let V0=z[N0];if(V0!==void 0)V0.update(s.inputSource,s.frame,U||K),V0.dispatchEvent({type:s.type,data:s.inputSource})}function l(){Z.removeEventListener("select",y),Z.removeEventListener("selectstart",y),Z.removeEventListener("selectend",y),Z.removeEventListener("squeeze",y),Z.removeEventListener("squeezestart",y),Z.removeEventListener("squeezeend",y),Z.removeEventListener("end",l),Z.removeEventListener("inputsourceschange",b);for(let s=0;s<z.length;s++){let N0=w[s];if(N0===null)continue;w[s]=null,z[s].disconnect(N0)}m=null,c=null,B.reset();for(let s in D)delete D[s];J.setRenderTarget(O),N=null,G=null,q=null,Z=null,L=null,p0.stop(),$.isPresenting=!1,J.setPixelRatio(C),J.setSize(P.width,P.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(s){if(W=s,$.isPresenting===!0)w0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(s){if(Y=s,$.isPresenting===!0)w0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return U||K},this.setReferenceSpace=function(s){U=s},this.getBaseLayer=function(){return G!==null?G:N},this.getBinding=function(){if(q===null&&R)q=new XRWebGLBinding(Z,Q);return q},this.getFrame=function(){return E},this.getSession=function(){return Z},this.setSession=async function(s){if(Z=s,Z!==null){if(O=J.getRenderTarget(),Z.addEventListener("select",y),Z.addEventListener("selectstart",y),Z.addEventListener("selectend",y),Z.addEventListener("squeeze",y),Z.addEventListener("squeezestart",y),Z.addEventListener("squeezeend",y),Z.addEventListener("end",l),Z.addEventListener("inputsourceschange",b),F.xrCompatible!==!0)await Q.makeXRCompatible();if(C=J.getPixelRatio(),J.getSize(P),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let V0={antialias:F.antialias,alpha:!0,depth:F.depth,stencil:F.stencil,framebufferScaleFactor:W};N=new XRWebGLLayer(Z,Q,V0),Z.updateRenderState({baseLayer:N}),J.setPixelRatio(1),J.setSize(N.framebufferWidth,N.framebufferHeight,!1),L=new rJ(N.framebufferWidth,N.framebufferHeight,{format:R9,type:U9,colorSpace:J.outputColorSpace,stencilBuffer:F.stencil,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1})}else{let V0=null,q0=null,k0=null;if(F.depth)k0=F.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,V0=F.stencil?Z8:$8,q0=F.stencil?b8:c9;let a0={colorFormat:Q.RGBA8,depthFormat:k0,scaleFactor:W};q=this.getBinding(),G=q.createProjectionLayer(a0),Z.updateRenderState({layers:[G]}),J.setPixelRatio(1),J.setSize(G.textureWidth,G.textureHeight,!1),L=new rJ(G.textureWidth,G.textureHeight,{format:R9,type:U9,depthTexture:new n9(G.textureWidth,G.textureHeight,q0,void 0,void 0,void 0,void 0,void 0,void 0,V0),stencilBuffer:F.stencil,colorSpace:J.outputColorSpace,samples:F.antialias?4:0,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(X),U=null,K=await Z.requestReferenceSpace(Y),p0.setContext(Z),p0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return B.getDepthTexture()};function b(s){for(let N0=0;N0<s.removed.length;N0++){let V0=s.removed[N0],q0=w.indexOf(V0);if(q0>=0)w[q0]=null,z[q0].disconnect(V0)}for(let N0=0;N0<s.added.length;N0++){let V0=s.added[N0],q0=w.indexOf(V0);if(q0===-1){for(let a0=0;a0<z.length;a0++)if(a0>=w.length){w.push(V0),q0=a0;break}else if(w[a0]===null){w[a0]=V0,q0=a0;break}if(q0===-1)break}let k0=z[q0];if(k0)k0.connect(V0)}}let p=new f,a=new f;function Q0(s,N0,V0){p.setFromMatrixPosition(N0.matrixWorld),a.setFromMatrixPosition(V0.matrixWorld);let q0=p.distanceTo(a),k0=N0.projectionMatrix.elements,a0=V0.projectionMatrix.elements,h0=k0[14]/(k0[10]-1),l0=k0[14]/(k0[10]+1),QJ=(k0[9]+1)/k0[5],$J=(k0[9]-1)/k0[5],f0=(k0[8]-1)/k0[0],IJ=(a0[8]+1)/a0[0],wJ=h0*f0,_J=h0*IJ,S=q0/(-f0+IJ),yJ=S*-f0;if(N0.matrixWorld.decompose(s.position,s.quaternion,s.scale),s.translateX(yJ),s.translateZ(S),s.matrixWorld.compose(s.position,s.quaternion,s.scale),s.matrixWorldInverse.copy(s.matrixWorld).invert(),k0[10]===-1)s.projectionMatrix.copy(N0.projectionMatrix),s.projectionMatrixInverse.copy(N0.projectionMatrixInverse);else{let c0=h0+S,o0=l0+S,H0=wJ-yJ,qJ=_J+(q0-yJ),A0=QJ*l0/o0*c0,I=$J*l0/o0*c0;s.projectionMatrix.makePerspective(H0,qJ,A0,I,c0,o0),s.projectionMatrixInverse.copy(s.projectionMatrix).invert()}}function E0(s,N0){if(N0===null)s.matrixWorld.copy(s.matrix);else s.matrixWorld.multiplyMatrices(N0.matrixWorld,s.matrix);s.matrixWorldInverse.copy(s.matrixWorld).invert()}this.updateCamera=function(s){if(Z===null)return;let{near:N0,far:V0}=s;if(B.texture!==null){if(B.depthNear>0)N0=B.depthNear;if(B.depthFar>0)V0=B.depthFar}if(A.near=k.near=V.near=N0,A.far=k.far=V.far=V0,m!==A.near||c!==A.far)Z.updateRenderState({depthNear:A.near,depthFar:A.far}),m=A.near,c=A.far;A.layers.mask=s.layers.mask|6,V.layers.mask=A.layers.mask&-5,k.layers.mask=A.layers.mask&-3;let q0=s.parent,k0=A.cameras;E0(A,q0);for(let a0=0;a0<k0.length;a0++)E0(k0[a0],q0);if(k0.length===2)Q0(A,V,k);else A.projectionMatrix.copy(V.projectionMatrix);I0(s,A,q0)};function I0(s,N0,V0){if(V0===null)s.matrix.copy(N0.matrixWorld);else s.matrix.copy(V0.matrixWorld),s.matrix.invert(),s.matrix.multiply(N0.matrixWorld);if(s.matrix.decompose(s.position,s.quaternion,s.scale),s.updateMatrixWorld(!0),s.projectionMatrix.copy(N0.projectionMatrix),s.projectionMatrixInverse.copy(N0.projectionMatrixInverse),s.isPerspectiveCamera)s.fov=o7*2*Math.atan(1/s.projectionMatrix.elements[5]),s.zoom=1}this.getCamera=function(){return A},this.getFoveation=function(){if(G===null&&N===null)return;return X},this.setFoveation=function(s){if(X=s,G!==null)G.fixedFoveation=s;if(N!==null&&N.fixedFoveation!==void 0)N.fixedFoveation=s},this.hasDepthSensing=function(){return B.texture!==null},this.getDepthSensingMesh=function(){return B.getMesh(A)},this.getCameraTexture=function(s){return D[s]};let O0=null;function r0(s,N0){if(H=N0.getViewerPose(U||K),E=N0,H!==null){let V0=H.views;if(N!==null)J.setRenderTargetFramebuffer(L,N.framebuffer),J.setRenderTarget(L);let q0=!1;if(V0.length!==A.cameras.length)A.cameras.length=0,q0=!0;for(let l0=0;l0<V0.length;l0++){let QJ=V0[l0],$J=null;if(N!==null)$J=N.getViewport(QJ);else{let IJ=q.getViewSubImage(G,QJ);if($J=IJ.viewport,l0===0)J.setRenderTargetTextures(L,IJ.colorTexture,IJ.depthStencilTexture),J.setRenderTarget(L)}let f0=d[l0];if(f0===void 0)f0=new vJ,f0.layers.enable(l0),f0.viewport=new EJ,d[l0]=f0;if(f0.matrix.fromArray(QJ.transform.matrix),f0.matrix.decompose(f0.position,f0.quaternion,f0.scale),f0.projectionMatrix.fromArray(QJ.projectionMatrix),f0.projectionMatrixInverse.copy(f0.projectionMatrix).invert(),f0.viewport.set($J.x,$J.y,$J.width,$J.height),l0===0)A.matrix.copy(f0.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale);if(q0===!0)A.cameras.push(f0)}let k0=Z.enabledFeatures;if(k0&&k0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&R){q=$.getBinding();let l0=q.getDepthInformation(V0[0]);if(l0&&l0.isValid&&l0.texture)B.init(l0,Z.renderState)}if(k0&&k0.includes("camera-access")&&R){J.state.unbindTexture(),q=$.getBinding();for(let l0=0;l0<V0.length;l0++){let QJ=V0[l0].camera;if(QJ){let $J=D[QJ];if(!$J)$J=new F6,D[QJ]=$J;let f0=q.getCameraImage(QJ);$J.sourceTexture=f0}}}}for(let V0=0;V0<z.length;V0++){let q0=w[V0],k0=z[V0];if(q0!==null&&k0!==void 0)k0.update(q0,N0,U||K)}if(O0)O0(s,N0);if(N0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:N0});E=null}let p0=new HK;p0.setAnimationLoop(r0),this.setAnimationLoop=function(s){O0=s},this.dispose=function(){}}}var U5=new NJ,BK=new S0;BK.set(-1,0,0,0,1,0,0,0,1);function H5(J,Q){function $(D,F){if(D.matrixAutoUpdate===!0)D.updateMatrix();F.value.copy(D.matrix)}function Z(D,F){if(F.color.getRGB(D.fogColor.value,D$(J)),F.isFog)D.fogNear.value=F.near,D.fogFar.value=F.far;else if(F.isFogExp2)D.fogDensity.value=F.density}function W(D,F,O,L,z){if(F.isNodeMaterial)F.uniformsNeedUpdate=!1;else if(F.isMeshBasicMaterial)K(D,F);else if(F.isMeshLambertMaterial){if(K(D,F),F.envMap)D.envMapIntensity.value=F.envMapIntensity}else if(F.isMeshToonMaterial)K(D,F),G(D,F);else if(F.isMeshPhongMaterial){if(K(D,F),q(D,F),F.envMap)D.envMapIntensity.value=F.envMapIntensity}else if(F.isMeshStandardMaterial){if(K(D,F),N(D,F),F.isMeshPhysicalMaterial)E(D,F,z)}else if(F.isMeshMatcapMaterial)K(D,F),R(D,F);else if(F.isMeshDepthMaterial)K(D,F);else if(F.isMeshDistanceMaterial)K(D,F),B(D,F);else if(F.isMeshNormalMaterial)K(D,F);else if(F.isLineBasicMaterial){if(Y(D,F),F.isLineDashedMaterial)X(D,F)}else if(F.isPointsMaterial)U(D,F,O,L);else if(F.isSpriteMaterial)H(D,F);else if(F.isShadowMaterial)D.color.value.copy(F.color),D.opacity.value=F.opacity;else if(F.isShaderMaterial)F.uniformsNeedUpdate=!1}function K(D,F){if(D.opacity.value=F.opacity,F.color)D.diffuse.value.copy(F.color);if(F.emissive)D.emissive.value.copy(F.emissive).multiplyScalar(F.emissiveIntensity);if(F.map)D.map.value=F.map,$(F.map,D.mapTransform);if(F.alphaMap)D.alphaMap.value=F.alphaMap,$(F.alphaMap,D.alphaMapTransform);if(F.bumpMap){if(D.bumpMap.value=F.bumpMap,$(F.bumpMap,D.bumpMapTransform),D.bumpScale.value=F.bumpScale,F.side===hJ)D.bumpScale.value*=-1}if(F.normalMap){if(D.normalMap.value=F.normalMap,$(F.normalMap,D.normalMapTransform),D.normalScale.value.copy(F.normalScale),F.side===hJ)D.normalScale.value.negate()}if(F.displacementMap)D.displacementMap.value=F.displacementMap,$(F.displacementMap,D.displacementMapTransform),D.displacementScale.value=F.displacementScale,D.displacementBias.value=F.displacementBias;if(F.emissiveMap)D.emissiveMap.value=F.emissiveMap,$(F.emissiveMap,D.emissiveMapTransform);if(F.specularMap)D.specularMap.value=F.specularMap,$(F.specularMap,D.specularMapTransform);if(F.alphaTest>0)D.alphaTest.value=F.alphaTest;let O=Q.get(F),L=O.envMap,z=O.envMapRotation;if(L){if(D.envMap.value=L,D.envMapRotation.value.setFromMatrix4(U5.makeRotationFromEuler(z)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(BK);D.reflectivity.value=F.reflectivity,D.ior.value=F.ior,D.refractionRatio.value=F.refractionRatio}if(F.lightMap)D.lightMap.value=F.lightMap,D.lightMapIntensity.value=F.lightMapIntensity,$(F.lightMap,D.lightMapTransform);if(F.aoMap)D.aoMap.value=F.aoMap,D.aoMapIntensity.value=F.aoMapIntensity,$(F.aoMap,D.aoMapTransform)}function Y(D,F){if(D.diffuse.value.copy(F.color),D.opacity.value=F.opacity,F.map)D.map.value=F.map,$(F.map,D.mapTransform)}function X(D,F){D.dashSize.value=F.dashSize,D.totalSize.value=F.dashSize+F.gapSize,D.scale.value=F.scale}function U(D,F,O,L){if(D.diffuse.value.copy(F.color),D.opacity.value=F.opacity,D.size.value=F.size*O,D.scale.value=L*0.5,F.map)D.map.value=F.map,$(F.map,D.uvTransform);if(F.alphaMap)D.alphaMap.value=F.alphaMap,$(F.alphaMap,D.alphaMapTransform);if(F.alphaTest>0)D.alphaTest.value=F.alphaTest}function H(D,F){if(D.diffuse.value.copy(F.color),D.opacity.value=F.opacity,D.rotation.value=F.rotation,F.map)D.map.value=F.map,$(F.map,D.mapTransform);if(F.alphaMap)D.alphaMap.value=F.alphaMap,$(F.alphaMap,D.alphaMapTransform);if(F.alphaTest>0)D.alphaTest.value=F.alphaTest}function q(D,F){D.specular.value.copy(F.specular),D.shininess.value=Math.max(F.shininess,0.0001)}function G(D,F){if(F.gradientMap)D.gradientMap.value=F.gradientMap}function N(D,F){if(D.metalness.value=F.metalness,F.metalnessMap)D.metalnessMap.value=F.metalnessMap,$(F.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=F.roughness,F.roughnessMap)D.roughnessMap.value=F.roughnessMap,$(F.roughnessMap,D.roughnessMapTransform);if(F.envMap)D.envMapIntensity.value=F.envMapIntensity}function E(D,F,O){if(D.ior.value=F.ior,F.sheen>0){if(D.sheenColor.value.copy(F.sheenColor).multiplyScalar(F.sheen),D.sheenRoughness.value=F.sheenRoughness,F.sheenColorMap)D.sheenColorMap.value=F.sheenColorMap,$(F.sheenColorMap,D.sheenColorMapTransform);if(F.sheenRoughnessMap)D.sheenRoughnessMap.value=F.sheenRoughnessMap,$(F.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(F.clearcoat>0){if(D.clearcoat.value=F.clearcoat,D.clearcoatRoughness.value=F.clearcoatRoughness,F.clearcoatMap)D.clearcoatMap.value=F.clearcoatMap,$(F.clearcoatMap,D.clearcoatMapTransform);if(F.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=F.clearcoatRoughnessMap,$(F.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(F.clearcoatNormalMap){if(D.clearcoatNormalMap.value=F.clearcoatNormalMap,$(F.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(F.clearcoatNormalScale),F.side===hJ)D.clearcoatNormalScale.value.negate()}}if(F.dispersion>0)D.dispersion.value=F.dispersion;if(F.iridescence>0){if(D.iridescence.value=F.iridescence,D.iridescenceIOR.value=F.iridescenceIOR,D.iridescenceThicknessMinimum.value=F.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=F.iridescenceThicknessRange[1],F.iridescenceMap)D.iridescenceMap.value=F.iridescenceMap,$(F.iridescenceMap,D.iridescenceMapTransform);if(F.iridescenceThicknessMap)D.iridescenceThicknessMap.value=F.iridescenceThicknessMap,$(F.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(F.transmission>0){if(D.transmission.value=F.transmission,D.transmissionSamplerMap.value=O.texture,D.transmissionSamplerSize.value.set(O.width,O.height),F.transmissionMap)D.transmissionMap.value=F.transmissionMap,$(F.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=F.thickness,F.thicknessMap)D.thicknessMap.value=F.thicknessMap,$(F.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=F.attenuationDistance,D.attenuationColor.value.copy(F.attenuationColor)}if(F.anisotropy>0){if(D.anisotropyVector.value.set(F.anisotropy*Math.cos(F.anisotropyRotation),F.anisotropy*Math.sin(F.anisotropyRotation)),F.anisotropyMap)D.anisotropyMap.value=F.anisotropyMap,$(F.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=F.specularIntensity,D.specularColor.value.copy(F.specularColor),F.specularColorMap)D.specularColorMap.value=F.specularColorMap,$(F.specularColorMap,D.specularColorMapTransform);if(F.specularIntensityMap)D.specularIntensityMap.value=F.specularIntensityMap,$(F.specularIntensityMap,D.specularIntensityMapTransform)}function R(D,F){if(F.matcap)D.matcap.value=F.matcap}function B(D,F){let O=Q.get(F).light;D.referencePosition.value.setFromMatrixPosition(O.matrixWorld),D.nearDistance.value=O.shadow.camera.near,D.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function G5(J,Q,$,Z){let W={},K={},Y=[],X=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function U(O,L){let z=L.program;Z.uniformBlockBinding(O,z)}function H(O,L){let z=W[O.id];if(z===void 0)R(O),z=q(O),W[O.id]=z,O.addEventListener("dispose",D);let w=L.program;Z.updateUBOMapping(O,w);let P=Q.render.frame;if(K[O.id]!==P)N(O),K[O.id]=P}function q(O){let L=G();O.__bindingPointIndex=L;let z=J.createBuffer(),w=O.__size,P=O.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,w,P),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,L,z),z}function G(){for(let O=0;O<X;O++)if(Y.indexOf(O)===-1)return Y.push(O),O;return P0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function N(O){let L=W[O.id],z=O.uniforms,w=O.__cache;J.bindBuffer(J.UNIFORM_BUFFER,L);for(let P=0,C=z.length;P<C;P++){let V=Array.isArray(z[P])?z[P]:[z[P]];for(let k=0,d=V.length;k<d;k++){let A=V[k];if(E(A,P,k,w)===!0){let m=A.__offset,c=Array.isArray(A.value)?A.value:[A.value],y=0;for(let l=0;l<c.length;l++){let b=c[l],p=B(b);if(typeof b==="number"||typeof b==="boolean")A.__data[0]=b,J.bufferSubData(J.UNIFORM_BUFFER,m+y,A.__data);else if(b.isMatrix3)A.__data[0]=b.elements[0],A.__data[1]=b.elements[1],A.__data[2]=b.elements[2],A.__data[3]=0,A.__data[4]=b.elements[3],A.__data[5]=b.elements[4],A.__data[6]=b.elements[5],A.__data[7]=0,A.__data[8]=b.elements[6],A.__data[9]=b.elements[7],A.__data[10]=b.elements[8],A.__data[11]=0;else if(ArrayBuffer.isView(b))A.__data.set(new b.constructor(b.buffer,b.byteOffset,A.__data.length));else b.toArray(A.__data,y),y+=p.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,m,A.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function E(O,L,z,w){let P=O.value,C=L+"_"+z;if(w[C]===void 0){if(typeof P==="number"||typeof P==="boolean")w[C]=P;else if(ArrayBuffer.isView(P))w[C]=P.slice();else w[C]=P.clone();return!0}else{let V=w[C];if(typeof P==="number"||typeof P==="boolean"){if(V!==P)return w[C]=P,!0}else if(ArrayBuffer.isView(P))return!0;else if(V.equals(P)===!1)return V.copy(P),!0}return!1}function R(O){let L=O.uniforms,z=0,w=16;for(let C=0,V=L.length;C<V;C++){let k=Array.isArray(L[C])?L[C]:[L[C]];for(let d=0,A=k.length;d<A;d++){let m=k[d],c=Array.isArray(m.value)?m.value:[m.value];for(let y=0,l=c.length;y<l;y++){let b=c[y],p=B(b),a=z%w,Q0=a%p.boundary,E0=a+Q0;if(z+=Q0,E0!==0&&w-E0<p.storage)z+=w-E0;m.__data=new Float32Array(p.storage/Float32Array.BYTES_PER_ELEMENT),m.__offset=z,z+=p.storage}}}let P=z%w;if(P>0)z+=w-P;return O.__size=z,O.__cache={},this}function B(O){let L={boundary:0,storage:0};if(typeof O==="number"||typeof O==="boolean")L.boundary=4,L.storage=4;else if(O.isVector2)L.boundary=8,L.storage=8;else if(O.isVector3||O.isColor)L.boundary=16,L.storage=12;else if(O.isVector4)L.boundary=16,L.storage=16;else if(O.isMatrix3)L.boundary=48,L.storage=48;else if(O.isMatrix4)L.boundary=64,L.storage=64;else if(O.isTexture)w0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(O))L.boundary=16,L.storage=O.byteLength;else w0("WebGLRenderer: Unsupported uniform value type.",O);return L}function D(O){let L=O.target;L.removeEventListener("dispose",D);let z=Y.indexOf(L.__bindingPointIndex);Y.splice(z,1),J.deleteBuffer(W[L.id]),delete W[L.id],delete K[L.id]}function F(){for(let O in W)J.deleteBuffer(W[O]);Y=[],W={},K={}}return{bind:U,update:H,dispose:F}}var N5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_9=null;function q5(){if(_9===null)_9=new q$(N5,16,16,W8,T9),_9.name="DFG_LUT",_9.minFilter=bJ,_9.magFilter=bJ,_9.wrapS=e7,_9.wrapT=e7,_9.generateMipmaps=!1,_9.needsUpdate=!0;return _9}class u${constructor(J={}){let{canvas:Q=SW(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:Y=!1,premultipliedAlpha:X=!0,preserveDrawingBuffer:U=!1,powerPreference:H="default",failIfMajorPerformanceCaveat:q=!1,reversedDepthBuffer:G=!1,outputBufferType:N=U9}=J;this.isWebGLRenderer=!0;let E;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=$.getContextAttributes().alpha}else E=K;let R=N,B=new Set([AQ,kQ,IQ]),D=new Set([U9,c9,$7,b8,BQ,zQ]),F=new Uint32Array(4),O=new Int32Array(4),L=new f,z=null,w=null,P=[],C=[],V=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=X9,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,d=!1,A=null;this._outputColorSpace=Z7;let m=0,c=0,y=null,l=-1,b=null,p=new EJ,a=new EJ,Q0=null,E0=new m0(0),I0=0,O0=Q.width,r0=Q.height,p0=1,s=null,N0=null,V0=new EJ(0,0,O0,r0),q0=new EJ(0,0,O0,r0),k0=!1,a0=new G7,h0=!1,l0=!1,QJ=new NJ,$J=new f,f0=new EJ,IJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},wJ=!1;function _J(){return y===null?p0:1}let S=$;function yJ(M,j){return Q.getContext(M,j)}try{let M={alpha:!0,depth:Z,stencil:W,antialias:Y,premultipliedAlpha:X,preserveDrawingBuffer:U,powerPreference:H,failIfMajorPerformanceCaveat:q};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${fZ}`);if(Q.addEventListener("webglcontextlost",_0,!1),Q.addEventListener("webglcontextrestored",t,!1),Q.addEventListener("webglcontextcreationerror",L0,!1),S===null){if(S=yJ("webgl2",M),S===null)if(yJ("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(M){throw P0("WebGLRenderer: "+M.message),M}let c0,o0,H0,qJ,A0,I,_,v,o,r,e,K0,u,i,W0,R0,$0,Y0,T0,v0,b0,T,Z0;function n(){if(c0=new MH(S),c0.init(),b0=new K5(S,c0),o0=new NH(S,c0,J,b0),H0=new Z5(S,c0),o0.reversedDepthBuffer&&G)H0.buffers.depth.setReversed(!0);qJ=new BH(S),A0=new dG,I=new W5(S,c0,H0,A0,o0,b0,qJ),_=new OH(k),v=new AY(S),T=new HH(S,v),o=new VH(S,v,qJ,T),r=new IH(S,o,v,T,qJ),Y0=new zH(S,o0,I),W0=new qH(A0),e=new lG(k,_,c0,o0,T,W0),K0=new H5(k,A0),u=new cG,i=new rG(c0),$0=new UH(k,_,H0,r,E,X),R0=new $5(k,r,o0),Z0=new G5(S,qJ,o0,H0),T0=new GH(S,c0,qJ),v0=new LH(S,c0,qJ),qJ.programs=e.programs,k.capabilities=o0,k.extensions=c0,k.properties=A0,k.renderLists=u,k.shadowMap=R0,k.state=H0,k.info=qJ}if(n(),R!==U9)V=new AH(R,Q.width,Q.height,Z,W);let J0=new LK(k,S);this.xr=J0,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let M=c0.get("WEBGL_lose_context");if(M)M.loseContext()},this.forceContextRestore=function(){let M=c0.get("WEBGL_lose_context");if(M)M.restoreContext()},this.getPixelRatio=function(){return p0},this.setPixelRatio=function(M){if(M===void 0)return;p0=M,this.setSize(O0,r0,!1)},this.getSize=function(M){return M.set(O0,r0)},this.setSize=function(M,j,g=!0){if(J0.isPresenting){w0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(O0=M,r0=j,Q.width=Math.floor(M*p0),Q.height=Math.floor(j*p0),g===!0)Q.style.width=M+"px",Q.style.height=j+"px";if(V!==null)V.setSize(Q.width,Q.height);this.setViewport(0,0,M,j)},this.getDrawingBufferSize=function(M){return M.set(O0*p0,r0*p0).floor()},this.setDrawingBufferSize=function(M,j,g){O0=M,r0=j,p0=g,Q.width=Math.floor(M*g),Q.height=Math.floor(j*g),this.setViewport(0,0,M,j)},this.setEffects=function(M){if(R===U9){P0("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let j=0;j<M.length;j++)if(M[j].isOutputPass===!0){w0("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}V.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(p)},this.getViewport=function(M){return M.copy(V0)},this.setViewport=function(M,j,g,x){if(M.isVector4)V0.set(M.x,M.y,M.z,M.w);else V0.set(M,j,g,x);H0.viewport(p.copy(V0).multiplyScalar(p0).round())},this.getScissor=function(M){return M.copy(q0)},this.setScissor=function(M,j,g,x){if(M.isVector4)q0.set(M.x,M.y,M.z,M.w);else q0.set(M,j,g,x);H0.scissor(a.copy(q0).multiplyScalar(p0).round())},this.getScissorTest=function(){return k0},this.setScissorTest=function(M){H0.setScissorTest(k0=M)},this.setOpaqueSort=function(M){s=M},this.setTransparentSort=function(M){N0=M},this.getClearColor=function(M){return M.copy($0.getClearColor())},this.setClearColor=function(){$0.setClearColor(...arguments)},this.getClearAlpha=function(){return $0.getClearAlpha()},this.setClearAlpha=function(){$0.setClearAlpha(...arguments)},this.clear=function(M=!0,j=!0,g=!0){let x=0;if(M){let h=!1;if(y!==null){let G0=y.texture.format;h=B.has(G0)}if(h){let G0=y.texture.type,F0=D.has(G0),U0=$0.getClearColor(),M0=$0.getClearAlpha(),B0=U0.r,y0=U0.g,g0=U0.b;if(F0)F[0]=B0,F[1]=y0,F[2]=g0,F[3]=M0,S.clearBufferuiv(S.COLOR,0,F);else O[0]=B0,O[1]=y0,O[2]=g0,O[3]=M0,S.clearBufferiv(S.COLOR,0,O)}else x|=S.COLOR_BUFFER_BIT}if(j)x|=S.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(g)x|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(x!==0)S.clear(x)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),A=M},this.dispose=function(){Q.removeEventListener("webglcontextlost",_0,!1),Q.removeEventListener("webglcontextrestored",t,!1),Q.removeEventListener("webglcontextcreationerror",L0,!1),$0.dispose(),u.dispose(),i.dispose(),A0.dispose(),_.dispose(),r.dispose(),T.dispose(),Z0.dispose(),e.dispose(),J0.dispose(),J0.removeEventListener("sessionstart",o$),J0.removeEventListener("sessionend",a$),o9.stop()};function _0(M){M.preventDefault(),U$("WebGLRenderer: Context Lost."),d=!0}function t(){U$("WebGLRenderer: Context Restored."),d=!1;let M=qJ.autoReset,j=R0.enabled,g=R0.autoUpdate,x=R0.needsUpdate,h=R0.type;n(),qJ.autoReset=M,R0.enabled=j,R0.autoUpdate=g,R0.needsUpdate=x,R0.type=h}function L0(M){P0("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function j0(M){let j=M.target;j.removeEventListener("dispose",j0),OJ(j)}function OJ(M){e0(M),A0.remove(M)}function e0(M){let j=A0.get(M).programs;if(j!==void 0){if(j.forEach(function(g){e.releaseProgram(g)}),M.isShaderMaterial)e.releaseShaderCache(M)}}this.renderBufferDirect=function(M,j,g,x,h,G0){if(j===null)j=IJ;let F0=h.isMesh&&h.matrixWorld.determinant()<0,U0=AK(M,j,g,x,h);H0.setMaterial(x,F0);let M0=g.index,B0=1;if(x.wireframe===!0){if(M0=o.getWireframeAttribute(g),M0===void 0)return;B0=2}let y0=g.drawRange,g0=g.attributes.position,z0=y0.start*B0,JJ=(y0.start+y0.count)*B0;if(G0!==null)z0=Math.max(z0,G0.start*B0),JJ=Math.min(JJ,(G0.start+G0.count)*B0);if(M0!==null)z0=Math.max(z0,0),JJ=Math.min(JJ,M0.count);else if(g0!==void 0&&g0!==null)z0=Math.max(z0,0),JJ=Math.min(JJ,g0.count);let FJ=JJ-z0;if(FJ<0||FJ===1/0)return;T.setup(h,x,U0,g,M0);let DJ,ZJ=T0;if(M0!==null)DJ=v.get(M0),ZJ=v0,ZJ.setIndex(DJ);if(h.isMesh)if(x.wireframe===!0)H0.setLineWidth(x.wireframeLinewidth*_J()),ZJ.setMode(S.LINES);else ZJ.setMode(S.TRIANGLES);else if(h.isLine){let CJ=x.linewidth;if(CJ===void 0)CJ=1;if(H0.setLineWidth(CJ*_J()),h.isLineSegments)ZJ.setMode(S.LINES);else if(h.isLineLoop)ZJ.setMode(S.LINE_LOOP);else ZJ.setMode(S.LINE_STRIP)}else if(h.isPoints)ZJ.setMode(S.POINTS);else if(h.isSprite)ZJ.setMode(S.TRIANGLES);if(h.isBatchedMesh)if(!c0.get("WEBGL_multi_draw")){let{_multiDrawStarts:CJ,_multiDrawCounts:D0,_multiDrawCount:pJ}=h,i0=M0?v.get(M0).bytesPerElement:1,sJ=A0.get(x).currentProgram.getUniforms();for(let N9=0;N9<pJ;N9++)sJ.setValue(S,"_gl_DrawID",N9),ZJ.render(CJ[N9]/i0,D0[N9])}else ZJ.renderMultiDraw(h._multiDrawStarts,h._multiDrawCounts,h._multiDrawCount);else if(h.isInstancedMesh)ZJ.renderInstances(z0,FJ,h.count);else if(g.isInstancedBufferGeometry){let CJ=g._maxInstanceCount!==void 0?g._maxInstanceCount:1/0,D0=Math.min(g.instanceCount,CJ);ZJ.renderInstances(z0,FJ,D0)}else ZJ.render(z0,FJ)};function G9(M,j,g){if(M.transparent===!0&&M.side===dJ&&M.forceSinglePass===!1)M.side=hJ,M.needsUpdate=!0,V7(M,j,g),M.side=f8,M.needsUpdate=!0,V7(M,j,g),M.side=dJ;else V7(M,j,g)}this.compile=function(M,j,g=null){if(g===null)g=M;if(w=i.get(g),w.init(j),C.push(w),g.traverseVisible(function(h){if(h.isLight&&h.layers.test(j.layers)){if(w.pushLight(h),h.castShadow)w.pushShadow(h)}}),M!==g)M.traverseVisible(function(h){if(h.isLight&&h.layers.test(j.layers)){if(w.pushLight(h),h.castShadow)w.pushShadow(h)}});w.setupLights();let x=new Set;return M.traverse(function(h){if(!(h.isMesh||h.isPoints||h.isLine||h.isSprite))return;let G0=h.material;if(G0)if(Array.isArray(G0))for(let F0=0;F0<G0.length;F0++){let U0=G0[F0];G9(U0,g,h),x.add(U0)}else G9(G0,g,h),x.add(G0)}),w=C.pop(),x},this.compileAsync=function(M,j,g=null){let x=this.compile(M,j,g);return new Promise((h)=>{function G0(){if(x.forEach(function(F0){if(A0.get(F0).currentProgram.isReady())x.delete(F0)}),x.size===0){h(M);return}setTimeout(G0,10)}if(c0.get("KHR_parallel_shader_compile")!==null)G0();else setTimeout(G0,10)})};let Q9=null;function IK(M){if(Q9)Q9(M)}function o$(){o9.stop()}function a$(){o9.start()}let o9=new HK;if(o9.setAnimationLoop(IK),typeof self<"u")o9.setContext(self);this.setAnimationLoop=function(M){Q9=M,J0.setAnimationLoop(M),M===null?o9.stop():o9.start()},J0.addEventListener("sessionstart",o$),J0.addEventListener("sessionend",a$),this.render=function(M,j){if(j!==void 0&&j.isCamera!==!0){P0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;if(A!==null)A.renderStart(M,j);let g=J0.enabled===!0&&J0.isPresenting===!0,x=V!==null&&(y===null||g)&&V.begin(k,y);if(M.matrixWorldAutoUpdate===!0)M.updateMatrixWorld();if(j.parent===null&&j.matrixWorldAutoUpdate===!0)j.updateMatrixWorld();if(J0.enabled===!0&&J0.isPresenting===!0&&(V===null||V.isCompositing()===!1)){if(J0.cameraAutoUpdate===!0)J0.updateCamera(j);j=J0.getCamera()}if(M.isScene===!0)M.onBeforeRender(k,M,j,y);if(w=i.get(M,C.length),w.init(j),w.state.textureUnits=I.getTextureUnits(),C.push(w),QJ.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),a0.setFromProjectionMatrix(QJ,X$,j.reversedDepth),l0=this.localClippingEnabled,h0=W0.init(this.clippingPlanes,l0),z=u.get(M,P.length),z.init(),P.push(z),J0.enabled===!0&&J0.isPresenting===!0){let F0=k.xr.getDepthSensingMesh();if(F0!==null)T6(F0,j,-1/0,k.sortObjects)}if(T6(M,j,0,k.sortObjects),z.finish(),k.sortObjects===!0)z.sort(s,N0);if(wJ=J0.enabled===!1||J0.isPresenting===!1||J0.hasDepthSensing()===!1,wJ)$0.addToRenderList(z,M);if(this.info.render.frame++,h0===!0)W0.beginShadows();let h=w.state.shadowsArray;if(R0.render(h,M,j),h0===!0)W0.endShadows();if(this.info.autoReset===!0)this.info.reset();if((x&&V.hasRenderPass())===!1){let{opaque:F0,transmissive:U0}=z;if(w.setupLights(),j.isArrayCamera){let M0=j.cameras;if(U0.length>0)for(let B0=0,y0=M0.length;B0<y0;B0++){let g0=M0[B0];t$(F0,U0,M,g0)}if(wJ)$0.render(M);for(let B0=0,y0=M0.length;B0<y0;B0++){let g0=M0[B0];r$(z,M,g0,g0.viewport)}}else{if(U0.length>0)t$(F0,U0,M,j);if(wJ)$0.render(M);r$(z,M,j)}}if(y!==null&&c===0)I.updateMultisampleRenderTarget(y),I.updateRenderTargetMipmap(y);if(x)V.end(k);if(M.isScene===!0)M.onAfterRender(k,M,j);if(T.resetDefaultState(),l=-1,b=null,C.pop(),C.length>0){if(w=C[C.length-1],I.setTextureUnits(w.state.textureUnits),h0===!0)W0.setGlobalState(k.clippingPlanes,w.state.camera)}else w=null;if(P.pop(),P.length>0)z=P[P.length-1];else z=null;if(A!==null)A.renderEnd()};function T6(M,j,g,x){if(M.visible===!1)return;if(M.layers.test(j.layers)){if(M.isGroup)g=M.renderOrder;else if(M.isLOD){if(M.autoUpdate===!0)M.update(j)}else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight){if(w.pushLight(M),M.castShadow)w.pushShadow(M)}else if(M.isSprite){if(!M.frustumCulled||a0.intersectsSprite(M)){if(x)f0.setFromMatrixPosition(M.matrixWorld).applyMatrix4(QJ);let F0=r.update(M),U0=M.material;if(U0.visible)z.push(M,F0,U0,g,f0.z,null)}}else if(M.isMesh||M.isLine||M.isPoints){if(!M.frustumCulled||a0.intersectsObject(M)){let F0=r.update(M),U0=M.material;if(x){if(M.boundingSphere!==void 0){if(M.boundingSphere===null)M.computeBoundingSphere();f0.copy(M.boundingSphere.center)}else{if(F0.boundingSphere===null)F0.computeBoundingSphere();f0.copy(F0.boundingSphere.center)}f0.applyMatrix4(M.matrixWorld).applyMatrix4(QJ)}if(Array.isArray(U0)){let M0=F0.groups;for(let B0=0,y0=M0.length;B0<y0;B0++){let g0=M0[B0],z0=U0[g0.materialIndex];if(z0&&z0.visible)z.push(M,F0,z0,g,f0.z,g0)}}else if(U0.visible)z.push(M,F0,U0,g,f0.z,null)}}}let G0=M.children;for(let F0=0,U0=G0.length;F0<U0;F0++)T6(G0[F0],j,g,x)}function r$(M,j,g,x){let{opaque:h,transmissive:G0,transparent:F0}=M;if(w.setupLightsView(g),h0===!0)W0.setGlobalState(k.clippingPlanes,g);if(x)H0.viewport(p.copy(x));if(h.length>0)M7(h,j,g);if(G0.length>0)M7(G0,j,g);if(F0.length>0)M7(F0,j,g);H0.buffers.depth.setTest(!0),H0.buffers.depth.setMask(!0),H0.buffers.color.setMask(!0),H0.setPolygonOffset(!1)}function t$(M,j,g,x){if((g.isScene===!0?g.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[x.id]===void 0){let z0=c0.has("EXT_color_buffer_half_float")||c0.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[x.id]=new rJ(1,1,{generateMipmaps:!0,type:z0?T9:U9,minFilter:Q8,samples:Math.max(4,o0.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:d0.workingColorSpace})}let G0=w.state.transmissionRenderTarget[x.id],F0=x.viewport||p;G0.setSize(F0.z*k.transmissionResolutionScale,F0.w*k.transmissionResolutionScale);let U0=k.getRenderTarget(),M0=k.getActiveCubeFace(),B0=k.getActiveMipmapLevel();if(k.setRenderTarget(G0),k.getClearColor(E0),I0=k.getClearAlpha(),I0<1)k.setClearColor(16777215,0.5);if(k.clear(),wJ)$0.render(g);let y0=k.toneMapping;k.toneMapping=X9;let g0=x.viewport;if(x.viewport!==void 0)x.viewport=void 0;if(w.setupLightsView(x),h0===!0)W0.setGlobalState(k.clippingPlanes,x);if(M7(M,g,x),I.updateMultisampleRenderTarget(G0),I.updateRenderTargetMipmap(G0),c0.has("WEBGL_multisampled_render_to_texture")===!1){let z0=!1;for(let JJ=0,FJ=j.length;JJ<FJ;JJ++){let DJ=j[JJ],{object:ZJ,geometry:CJ,material:D0,group:pJ}=DJ;if(D0.side===dJ&&ZJ.layers.test(x.layers)){let i0=D0.side;D0.side=hJ,D0.needsUpdate=!0,e$(ZJ,g,x,CJ,D0,pJ),D0.side=i0,D0.needsUpdate=!0,z0=!0}}if(z0===!0)I.updateMultisampleRenderTarget(G0),I.updateRenderTargetMipmap(G0)}if(k.setRenderTarget(U0,M0,B0),k.setClearColor(E0,I0),g0!==void 0)x.viewport=g0;k.toneMapping=y0}function M7(M,j,g){let x=j.isScene===!0?j.overrideMaterial:null;for(let h=0,G0=M.length;h<G0;h++){let F0=M[h],{object:U0,geometry:M0,group:B0}=F0,y0=F0.material;if(y0.allowOverride===!0&&x!==null)y0=x;if(U0.layers.test(g.layers))e$(U0,j,g,M0,y0,B0)}}function e$(M,j,g,x,h,G0){if(M.onBeforeRender(k,j,g,x,h,G0),M.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),h.onBeforeRender(k,j,g,x,M,G0),h.transparent===!0&&h.side===dJ&&h.forceSinglePass===!1)h.side=hJ,h.needsUpdate=!0,k.renderBufferDirect(g,j,x,h,M,G0),h.side=f8,h.needsUpdate=!0,k.renderBufferDirect(g,j,x,h,M,G0),h.side=dJ;else k.renderBufferDirect(g,j,x,h,M,G0);M.onAfterRender(k,j,g,x,h,G0)}function V7(M,j,g){if(j.isScene!==!0)j=IJ;let x=A0.get(M),h=w.state.lights,G0=w.state.shadowsArray,F0=h.state.version,U0=e.getParameters(M,h.state,G0,j,g,w.state.lightProbeGridArray),M0=e.getProgramCacheKey(U0),B0=x.programs;x.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?j.environment:null,x.fog=j.fog;let y0=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;if(x.envMap=_.get(M.envMap||x.environment,y0),x.envMapRotation=x.environment!==null&&M.envMap===null?j.environmentRotation:M.envMapRotation,B0===void 0)M.addEventListener("dispose",j0),B0=new Map,x.programs=B0;let g0=B0.get(M0);if(g0!==void 0){if(x.currentProgram===g0&&x.lightsStateVersion===F0)return QZ(M,U0),g0}else{if(U0.uniforms=e.getUniforms(M),A!==null&&M.isNodeMaterial)A.build(M,g,U0);M.onBeforeCompile(U0,k),g0=e.acquireProgram(U0,M0),B0.set(M0,g0),x.uniforms=U0.uniforms}let z0=x.uniforms;if(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)z0.clippingPlanes=W0.uniform;if(QZ(M,U0),x.needsLights=wK(M),x.lightsStateVersion=F0,x.needsLights)z0.ambientLightColor.value=h.state.ambient,z0.lightProbe.value=h.state.probe,z0.directionalLights.value=h.state.directional,z0.directionalLightShadows.value=h.state.directionalShadow,z0.spotLights.value=h.state.spot,z0.spotLightShadows.value=h.state.spotShadow,z0.rectAreaLights.value=h.state.rectArea,z0.ltc_1.value=h.state.rectAreaLTC1,z0.ltc_2.value=h.state.rectAreaLTC2,z0.pointLights.value=h.state.point,z0.pointLightShadows.value=h.state.pointShadow,z0.hemisphereLights.value=h.state.hemi,z0.directionalShadowMatrix.value=h.state.directionalShadowMatrix,z0.spotLightMatrix.value=h.state.spotLightMatrix,z0.spotLightMap.value=h.state.spotLightMap,z0.pointShadowMatrix.value=h.state.pointShadowMatrix;return x.lightProbeGrid=w.state.lightProbeGridArray.length>0,x.currentProgram=g0,x.uniformsList=null,g0}function JZ(M){if(M.uniformsList===null){let j=M.currentProgram.getUniforms();M.uniformsList=_7.seqWithValue(j.seq,M.uniforms)}return M.uniformsList}function QZ(M,j){let g=A0.get(M);g.outputColorSpace=j.outputColorSpace,g.batching=j.batching,g.batchingColor=j.batchingColor,g.instancing=j.instancing,g.instancingColor=j.instancingColor,g.instancingMorph=j.instancingMorph,g.skinning=j.skinning,g.morphTargets=j.morphTargets,g.morphNormals=j.morphNormals,g.morphColors=j.morphColors,g.morphTargetsCount=j.morphTargetsCount,g.numClippingPlanes=j.numClippingPlanes,g.numIntersection=j.numClipIntersection,g.vertexAlphas=j.vertexAlphas,g.vertexTangents=j.vertexTangents,g.toneMapping=j.toneMapping}function kK(M,j){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;L.setFromMatrixPosition(j.matrixWorld);for(let g=0,x=M.length;g<x;g++){let h=M[g];if(h.texture!==null&&h.boundingBox.containsPoint(L))return h}return null}function AK(M,j,g,x,h){if(j.isScene!==!0)j=IJ;I.resetTextureUnits();let G0=j.fog,F0=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?j.environment:null,U0=y===null?k.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:d0.workingColorSpace,M0=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,B0=_.get(x.envMap||F0,M0),y0=x.vertexColors===!0&&!!g.attributes.color&&g.attributes.color.itemSize===4,g0=!!g.attributes.tangent&&(!!x.normalMap||x.anisotropy>0),z0=!!g.morphAttributes.position,JJ=!!g.morphAttributes.normal,FJ=!!g.morphAttributes.color,DJ=X9;if(x.toneMapped){if(y===null||y.isXRRenderTarget===!0)DJ=k.toneMapping}let ZJ=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,CJ=ZJ!==void 0?ZJ.length:0,D0=A0.get(x),pJ=w.state.lights;if(h0===!0){if(l0===!0||M!==b){let XJ=M===b&&x.id===l;W0.setState(x,M,XJ)}}let i0=!1;if(x.version===D0.__version){if(D0.needsLights&&D0.lightsStateVersion!==pJ.state.version)i0=!0;else if(D0.outputColorSpace!==U0)i0=!0;else if(h.isBatchedMesh&&D0.batching===!1)i0=!0;else if(!h.isBatchedMesh&&D0.batching===!0)i0=!0;else if(h.isBatchedMesh&&D0.batchingColor===!0&&h.colorTexture===null)i0=!0;else if(h.isBatchedMesh&&D0.batchingColor===!1&&h.colorTexture!==null)i0=!0;else if(h.isInstancedMesh&&D0.instancing===!1)i0=!0;else if(!h.isInstancedMesh&&D0.instancing===!0)i0=!0;else if(h.isSkinnedMesh&&D0.skinning===!1)i0=!0;else if(!h.isSkinnedMesh&&D0.skinning===!0)i0=!0;else if(h.isInstancedMesh&&D0.instancingColor===!0&&h.instanceColor===null)i0=!0;else if(h.isInstancedMesh&&D0.instancingColor===!1&&h.instanceColor!==null)i0=!0;else if(h.isInstancedMesh&&D0.instancingMorph===!0&&h.morphTexture===null)i0=!0;else if(h.isInstancedMesh&&D0.instancingMorph===!1&&h.morphTexture!==null)i0=!0;else if(D0.envMap!==B0)i0=!0;else if(x.fog===!0&&D0.fog!==G0)i0=!0;else if(D0.numClippingPlanes!==void 0&&(D0.numClippingPlanes!==W0.numPlanes||D0.numIntersection!==W0.numIntersection))i0=!0;else if(D0.vertexAlphas!==y0)i0=!0;else if(D0.vertexTangents!==g0)i0=!0;else if(D0.morphTargets!==z0)i0=!0;else if(D0.morphNormals!==JJ)i0=!0;else if(D0.morphColors!==FJ)i0=!0;else if(D0.toneMapping!==DJ)i0=!0;else if(D0.morphTargetsCount!==CJ)i0=!0;else if(!!D0.lightProbeGrid!==w.state.lightProbeGridArray.length>0)i0=!0}else i0=!0,D0.__version=x.version;let sJ=D0.currentProgram;if(i0===!0){if(sJ=V7(x,j,h),A&&x.isNodeMaterial)A.onUpdateProgram(x,sJ,D0)}let N9=!1,f9=!1,D8=!1,WJ=sJ.getUniforms(),RJ=D0.uniforms;if(H0.useProgram(sJ.program))N9=!0,f9=!0,D8=!0;if(x.id!==l)l=x.id,f9=!0;if(D0.needsLights){let XJ=kK(w.state.lightProbeGridArray,h);if(D0.lightProbeGrid!==XJ)D0.lightProbeGrid=XJ,f9=!0}if(N9||b!==M){if(H0.buffers.depth.getReversed()&&M.reversedDepth!==!0)M._reversedDepth=!0,M.updateProjectionMatrix();WJ.setValue(S,"projectionMatrix",M.projectionMatrix),WJ.setValue(S,"viewMatrix",M.matrixWorldInverse);let h9=WJ.map.cameraPosition;if(h9!==void 0)h9.setValue(S,$J.setFromMatrixPosition(M.matrixWorld));if(o0.logarithmicDepthBuffer)WJ.setValue(S,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2));if(x.isMeshPhongMaterial||x.isMeshToonMaterial||x.isMeshLambertMaterial||x.isMeshBasicMaterial||x.isMeshStandardMaterial||x.isShaderMaterial)WJ.setValue(S,"isOrthographic",M.isOrthographicCamera===!0);if(b!==M)b=M,f9=!0,D8=!0}if(D0.needsLights){if(pJ.state.directionalShadowMap.length>0)WJ.setValue(S,"directionalShadowMap",pJ.state.directionalShadowMap,I);if(pJ.state.spotShadowMap.length>0)WJ.setValue(S,"spotShadowMap",pJ.state.spotShadowMap,I);if(pJ.state.pointShadowMap.length>0)WJ.setValue(S,"pointShadowMap",pJ.state.pointShadowMap,I)}if(h.isSkinnedMesh){WJ.setOptional(S,h,"bindMatrix"),WJ.setOptional(S,h,"bindMatrixInverse");let XJ=h.skeleton;if(XJ){if(XJ.boneTexture===null)XJ.computeBoneTexture();WJ.setValue(S,"boneTexture",XJ.boneTexture,I)}}if(h.isBatchedMesh){if(WJ.setOptional(S,h,"batchingTexture"),WJ.setValue(S,"batchingTexture",h._matricesTexture,I),WJ.setOptional(S,h,"batchingIdTexture"),WJ.setValue(S,"batchingIdTexture",h._indirectTexture,I),WJ.setOptional(S,h,"batchingColorTexture"),h._colorsTexture!==null)WJ.setValue(S,"batchingColorTexture",h._colorsTexture,I)}let x9=g.morphAttributes;if(x9.position!==void 0||x9.normal!==void 0||x9.color!==void 0)Y0.update(h,g,sJ);if(f9||D0.receiveShadow!==h.receiveShadow)D0.receiveShadow=h.receiveShadow,WJ.setValue(S,"receiveShadow",h.receiveShadow);if((x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial)&&x.envMap===null&&j.environment!==null)RJ.envMapIntensity.value=j.environmentIntensity;if(RJ.dfgLUT!==void 0)RJ.dfgLUT.value=q5();if(f9){if(WJ.setValue(S,"toneMappingExposure",k.toneMappingExposure),D0.needsLights)PK(RJ,D8);if(G0&&x.fog===!0)K0.refreshFogUniforms(RJ,G0);if(K0.refreshMaterialUniforms(RJ,x,p0,r0,w.state.transmissionRenderTarget[M.id]),D0.needsLights&&D0.lightProbeGrid){let XJ=D0.lightProbeGrid;RJ.probesSH.value=XJ.texture,RJ.probesMin.value.copy(XJ.boundingBox.min),RJ.probesMax.value.copy(XJ.boundingBox.max),RJ.probesResolution.value.copy(XJ.resolution)}_7.upload(S,JZ(D0),RJ,I)}if(x.isShaderMaterial&&x.uniformsNeedUpdate===!0)_7.upload(S,JZ(D0),RJ,I),x.uniformsNeedUpdate=!1;if(x.isSpriteMaterial)WJ.setValue(S,"center",h.center);if(WJ.setValue(S,"modelViewMatrix",h.modelViewMatrix),WJ.setValue(S,"normalMatrix",h.normalMatrix),WJ.setValue(S,"modelMatrix",h.matrixWorld),x.uniformsGroups!==void 0){let XJ=x.uniformsGroups;for(let h9=0,F8=XJ.length;h9<F8;h9++){let $Z=XJ[h9];Z0.update($Z,sJ),Z0.bind($Z,sJ)}}return sJ}function PK(M,j){M.ambientLightColor.needsUpdate=j,M.lightProbe.needsUpdate=j,M.directionalLights.needsUpdate=j,M.directionalLightShadows.needsUpdate=j,M.pointLights.needsUpdate=j,M.pointLightShadows.needsUpdate=j,M.spotLights.needsUpdate=j,M.spotLightShadows.needsUpdate=j,M.rectAreaLights.needsUpdate=j,M.hemisphereLights.needsUpdate=j}function wK(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return c},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(M,j,g){let x=A0.get(M);if(x.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,x.__autoAllocateDepthBuffer===!1)x.__useRenderToTexture=!1;A0.get(M.texture).__webglTexture=j,A0.get(M.depthTexture).__webglTexture=x.__autoAllocateDepthBuffer?void 0:g,x.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,j){let g=A0.get(M);g.__webglFramebuffer=j,g.__useDefaultFramebuffer=j===void 0};let CK=S.createFramebuffer();this.setRenderTarget=function(M,j=0,g=0){y=M,m=j,c=g;let x=null,h=!1,G0=!1;if(M){let U0=A0.get(M);if(U0.__useDefaultFramebuffer!==void 0){H0.bindFramebuffer(S.FRAMEBUFFER,U0.__webglFramebuffer),p.copy(M.viewport),a.copy(M.scissor),Q0=M.scissorTest,H0.viewport(p),H0.scissor(a),H0.setScissorTest(Q0),l=-1;return}else if(U0.__webglFramebuffer===void 0)I.setupRenderTarget(M);else if(U0.__hasExternalTextures)I.rebindTextures(M,A0.get(M.texture).__webglTexture,A0.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let y0=M.depthTexture;if(U0.__boundDepthTexture!==y0){if(y0!==null&&A0.has(y0)&&(M.width!==y0.image.width||M.height!==y0.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(M)}}let M0=M.texture;if(M0.isData3DTexture||M0.isDataArrayTexture||M0.isCompressedArrayTexture)G0=!0;let B0=A0.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget){if(Array.isArray(B0[j]))x=B0[j][g];else x=B0[j];h=!0}else if(M.samples>0&&I.useMultisampledRTT(M)===!1)x=A0.get(M).__webglMultisampledFramebuffer;else if(Array.isArray(B0))x=B0[g];else x=B0;p.copy(M.viewport),a.copy(M.scissor),Q0=M.scissorTest}else p.copy(V0).multiplyScalar(p0).floor(),a.copy(q0).multiplyScalar(p0).floor(),Q0=k0;if(g!==0)x=CK;if(H0.bindFramebuffer(S.FRAMEBUFFER,x))H0.drawBuffers(M,x);if(H0.viewport(p),H0.scissor(a),H0.setScissorTest(Q0),h){let U0=A0.get(M.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+j,U0.__webglTexture,g)}else if(G0){let U0=j;for(let M0=0;M0<M.textures.length;M0++){let B0=A0.get(M.textures[M0]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+M0,B0.__webglTexture,g,U0)}}else if(M!==null&&g!==0){let U0=A0.get(M.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,U0.__webglTexture,g)}l=-1},this.readRenderTargetPixels=function(M,j,g,x,h,G0,F0,U0=0){if(!(M&&M.isWebGLRenderTarget)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let M0=A0.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&F0!==void 0)M0=M0[F0];if(M0){H0.bindFramebuffer(S.FRAMEBUFFER,M0);try{let B0=M.textures[U0],y0=B0.format,g0=B0.type;if(M.textures.length>1)S.readBuffer(S.COLOR_ATTACHMENT0+U0);if(!o0.textureFormatReadable(y0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!o0.textureTypeReadable(g0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(j>=0&&j<=M.width-x&&(g>=0&&g<=M.height-h))S.readPixels(j,g,x,h,b0.convert(y0),b0.convert(g0),G0)}finally{let B0=y!==null?A0.get(y).__webglFramebuffer:null;H0.bindFramebuffer(S.FRAMEBUFFER,B0)}}},this.readRenderTargetPixelsAsync=async function(M,j,g,x,h,G0,F0,U0=0){if(!(M&&M.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let M0=A0.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&F0!==void 0)M0=M0[F0];if(M0)if(j>=0&&j<=M.width-x&&(g>=0&&g<=M.height-h)){H0.bindFramebuffer(S.FRAMEBUFFER,M0);let B0=M.textures[U0],y0=B0.format,g0=B0.type;if(M.textures.length>1)S.readBuffer(S.COLOR_ATTACHMENT0+U0);if(!o0.textureFormatReadable(y0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!o0.textureTypeReadable(g0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let z0=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,z0),S.bufferData(S.PIXEL_PACK_BUFFER,G0.byteLength,S.STREAM_READ),S.readPixels(j,g,x,h,b0.convert(y0),b0.convert(g0),0);let JJ=y!==null?A0.get(y).__webglFramebuffer:null;H0.bindFramebuffer(S.FRAMEBUFFER,JJ);let FJ=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await yW(S,FJ,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,z0),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,G0),S.deleteBuffer(z0),S.deleteSync(FJ),G0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,j=null,g=0){let x=Math.pow(2,-g),h=Math.floor(M.image.width*x),G0=Math.floor(M.image.height*x),F0=j!==null?j.x:0,U0=j!==null?j.y:0;I.setTexture2D(M,0),S.copyTexSubImage2D(S.TEXTURE_2D,g,0,0,F0,U0,h,G0),H0.unbindTexture()};let TK=S.createFramebuffer(),SK=S.createFramebuffer();if(this.copyTextureToTexture=function(M,j,g=null,x=null,h=0,G0=0){let F0,U0,M0,B0,y0,g0,z0,JJ,FJ,DJ=M.isCompressedTexture?M.mipmaps[G0]:M.image;if(g!==null)F0=g.max.x-g.min.x,U0=g.max.y-g.min.y,M0=g.isBox3?g.max.z-g.min.z:1,B0=g.min.x,y0=g.min.y,g0=g.isBox3?g.min.z:0;else{let RJ=Math.pow(2,-h);if(F0=Math.floor(DJ.width*RJ),U0=Math.floor(DJ.height*RJ),M.isDataArrayTexture)M0=DJ.depth;else if(M.isData3DTexture)M0=Math.floor(DJ.depth*RJ);else M0=1;B0=0,y0=0,g0=0}if(x!==null)z0=x.x,JJ=x.y,FJ=x.z;else z0=0,JJ=0,FJ=0;let ZJ=b0.convert(j.format),CJ=b0.convert(j.type),D0;if(j.isData3DTexture)I.setTexture3D(j,0),D0=S.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)I.setTexture2DArray(j,0),D0=S.TEXTURE_2D_ARRAY;else I.setTexture2D(j,0),D0=S.TEXTURE_2D;H0.activeTexture(S.TEXTURE0),H0.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,j.flipY),H0.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),H0.pixelStorei(S.UNPACK_ALIGNMENT,j.unpackAlignment);let pJ=H0.getParameter(S.UNPACK_ROW_LENGTH),i0=H0.getParameter(S.UNPACK_IMAGE_HEIGHT),sJ=H0.getParameter(S.UNPACK_SKIP_PIXELS),N9=H0.getParameter(S.UNPACK_SKIP_ROWS),f9=H0.getParameter(S.UNPACK_SKIP_IMAGES);H0.pixelStorei(S.UNPACK_ROW_LENGTH,DJ.width),H0.pixelStorei(S.UNPACK_IMAGE_HEIGHT,DJ.height),H0.pixelStorei(S.UNPACK_SKIP_PIXELS,B0),H0.pixelStorei(S.UNPACK_SKIP_ROWS,y0),H0.pixelStorei(S.UNPACK_SKIP_IMAGES,g0);let D8=M.isDataArrayTexture||M.isData3DTexture,WJ=j.isDataArrayTexture||j.isData3DTexture;if(M.isDepthTexture){let RJ=A0.get(M),x9=A0.get(j),XJ=A0.get(RJ.__renderTarget),h9=A0.get(x9.__renderTarget);H0.bindFramebuffer(S.READ_FRAMEBUFFER,XJ.__webglFramebuffer),H0.bindFramebuffer(S.DRAW_FRAMEBUFFER,h9.__webglFramebuffer);for(let F8=0;F8<M0;F8++){if(D8)S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,A0.get(M).__webglTexture,h,g0+F8),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,A0.get(j).__webglTexture,G0,FJ+F8);S.blitFramebuffer(B0,y0,F0,U0,z0,JJ,F0,U0,S.DEPTH_BUFFER_BIT,S.NEAREST)}H0.bindFramebuffer(S.READ_FRAMEBUFFER,null),H0.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(h!==0||M.isRenderTargetTexture||A0.has(M)){let RJ=A0.get(M),x9=A0.get(j);H0.bindFramebuffer(S.READ_FRAMEBUFFER,TK),H0.bindFramebuffer(S.DRAW_FRAMEBUFFER,SK);for(let XJ=0;XJ<M0;XJ++){if(D8)S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,RJ.__webglTexture,h,g0+XJ);else S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,RJ.__webglTexture,h);if(WJ)S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,x9.__webglTexture,G0,FJ+XJ);else S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,x9.__webglTexture,G0);if(h!==0)S.blitFramebuffer(B0,y0,F0,U0,z0,JJ,F0,U0,S.COLOR_BUFFER_BIT,S.NEAREST);else if(WJ)S.copyTexSubImage3D(D0,G0,z0,JJ,FJ+XJ,B0,y0,F0,U0);else S.copyTexSubImage2D(D0,G0,z0,JJ,B0,y0,F0,U0)}H0.bindFramebuffer(S.READ_FRAMEBUFFER,null),H0.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(WJ)if(M.isDataTexture||M.isData3DTexture)S.texSubImage3D(D0,G0,z0,JJ,FJ,F0,U0,M0,ZJ,CJ,DJ.data);else if(j.isCompressedArrayTexture)S.compressedTexSubImage3D(D0,G0,z0,JJ,FJ,F0,U0,M0,ZJ,DJ.data);else S.texSubImage3D(D0,G0,z0,JJ,FJ,F0,U0,M0,ZJ,CJ,DJ);else if(M.isDataTexture)S.texSubImage2D(S.TEXTURE_2D,G0,z0,JJ,F0,U0,ZJ,CJ,DJ.data);else if(M.isCompressedTexture)S.compressedTexSubImage2D(S.TEXTURE_2D,G0,z0,JJ,DJ.width,DJ.height,ZJ,DJ.data);else S.texSubImage2D(S.TEXTURE_2D,G0,z0,JJ,F0,U0,ZJ,CJ,DJ);if(H0.pixelStorei(S.UNPACK_ROW_LENGTH,pJ),H0.pixelStorei(S.UNPACK_IMAGE_HEIGHT,i0),H0.pixelStorei(S.UNPACK_SKIP_PIXELS,sJ),H0.pixelStorei(S.UNPACK_SKIP_ROWS,N9),H0.pixelStorei(S.UNPACK_SKIP_IMAGES,f9),G0===0&&j.generateMipmaps)S.generateMipmap(D0);H0.unbindTexture()},this.initRenderTarget=function(M){if(A0.get(M).__webglFramebuffer===void 0)I.setupRenderTarget(M)},this.initTexture=function(M){if(M.isCubeTexture)I.setTextureCube(M,0);else if(M.isData3DTexture)I.setTexture3D(M,0);else if(M.isDataArrayTexture||M.isCompressedArrayTexture)I.setTexture2DArray(M,0);else I.setTexture2D(M,0);H0.unbindTexture()},this.resetState=function(){m=0,c=0,y=null,H0.reset(),T.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return X$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=d0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=d0._getUnpackColorSpace()}}var H9=1,D5=0.06,cJ=H9+D5,P6=8*cJ/2,c$={roman:10692152,spartan:12870189,hun:14263320,gaul:4094522,egyptian:2793880,viking:2838401,persian:5978766,teuton:7238520};function i9(J,Q){return[J*cJ-P6+cJ/2,(7-Q)*cJ-P6+cJ/2]}class n${container;opts;scene=new G6;renderer;camera;texLoader=new _6;texCache=new Map;dynamic=new Y9;hiGroup=new Y9;sun;raycaster=new B6;pickPlane;clickCb;constructor(J,Q){this.container=J;this.opts=Q;let $=J.clientWidth||640,Z=J.clientHeight||560;this.renderer=new u$({antialias:!0,alpha:!1}),this.renderer.setSize($,Z),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=a7,this.renderer.outputColorSpace=Z7,J.appendChild(this.renderer.domElement),this.scene.background=new m0(1906707),this.scene.fog=new U7(1906707,14,26),this.camera=new vJ(42,$/Z,0.1,100),this.camera.position.set(0,9.5,9.2),this.camera.lookAt(0,0,-0.5),this.scene.add(new L6(12167562,0.7)),this.scene.add(new O6(16773584,2760984,0.5));let W=new V6(16773336,1.5);W.position.set(-6,12,6),W.castShadow=!0,W.shadow.mapSize.set(2048,2048);let K=8;Object.assign(W.shadow.camera,{left:-K,right:K,top:K,bottom:-K,near:1,far:40}),this.sun=W,this.scene.add(W),this.buildGround(),this.scene.add(this.dynamic),this.scene.add(this.hiGroup),this.pickPlane=new HJ(new v9(8*cJ,8*cJ),new y9({visible:!1})),this.pickPlane.rotation.x=-Math.PI/2,this.pickPlane.position.y=0.14,this.scene.add(this.pickPlane),this.renderer.domElement.addEventListener("click",(Y)=>this.handleClick(Y)),this.renderer.domElement.style.cursor="pointer",window.addEventListener("resize",()=>this.onResize()),this.animate()}onClick(J){this.clickCb=J}handleClick(J){if(!this.clickCb)return;let Q=this.renderer.domElement.getBoundingClientRect(),$=new u0((J.clientX-Q.left)/Q.width*2-1,-((J.clientY-Q.top)/Q.height)*2+1);this.raycaster.setFromCamera($,this.camera);let Z=this.raycaster.intersectObject(this.pickPlane)[0];if(!Z)return;let W=Math.round((Z.point.x+P6-cJ/2)/cJ),K=7-Math.round((Z.point.z+P6-cJ/2)/cJ);if(W>=0&&W<8&&K>=0&&K<8)this.clickCb([W,K])}setHighlights(J){this.hiGroup.clear();let Q=(Z,W,K)=>{for(let Y of Z??[]){let X=new HJ(new v9(H9*0.92,H9*0.92),new y9({color:W,transparent:!0,opacity:K,depthWrite:!1}));X.rotation.x=-Math.PI/2;let[U,H]=i9(Y[0],Y[1]);X.position.set(U,0.145,H),this.hiGroup.add(X)}},$=(Z,W)=>{for(let K of Z??[]){let Y=new HJ(new p8(H9*0.42,H9*0.5,24),new y9({color:W,transparent:!0,opacity:0.95,depthWrite:!1,side:dJ}));Y.rotation.x=-Math.PI/2;let[X,U]=i9(K[0],K[1]);Y.position.set(X,0.16,U),this.hiGroup.add(Y)}};if(Q(J.valid,13214247,0.18),Q(J.move,7315274,0.5),Q(J.stage,13214247,0.55),$(J.melee,12603466),$(J.shoot,14257978),$(J.charge,10120384),J.selected){let Z=new HJ(new p8(H9*0.5,H9*0.6,28),new y9({color:14401642,transparent:!0,opacity:1,depthWrite:!1,side:dJ}));Z.rotation.x=-Math.PI/2;let[W,K]=i9(J.selected[0],J.selected[1]);Z.position.set(W,0.17,K),this.hiGroup.add(Z)}}onResize(){let J=this.container.clientWidth,Q=this.container.clientHeight;if(!J||!Q)return;this.renderer.setSize(J,Q),this.camera.aspect=J/Q,this.camera.updateProjectionMatrix()}tex(J){let Q=this.texCache.get(J);if(!Q)Q=this.texLoader.load(J),Q.colorSpace=Z7,Q.anisotropy=4,this.texCache.set(J,Q);return Q}buildGround(){let J=new HJ(new v9(60,60),new uJ({color:2760984,roughness:1}));J.rotation.x=-Math.PI/2,J.position.y=-0.2,J.receiveShadow=!0,this.scene.add(J)}buildTiles(J){let Q=new gJ(H9,0.25,H9);for(let $=0;$<8;$++)for(let Z=0;Z<8;Z++){let K=(Z<J.stakes[$]?0:1)===0?7306554:5595962,Y=new HJ(Q,new uJ({color:K,roughness:0.95})),[X,U]=i9($,Z);if(Y.position.set(X,0,U),Y.receiveShadow=!0,Y.castShadow=!1,this.dynamic.add(Y),Z===J.stakes[$]-1){let H=new HJ(new gJ(H9,0.04,0.08),new uJ({color:14401642,emissive:3813136,roughness:0.5}));H.position.set(X,0.15,U-cJ/2),this.dynamic.add(H)}}}tribeOf(J){return J===0?this.opts.p0tribe:this.opts.p1tribe}standee(J){let Q=this.tribeOf(J.owner),$=k7[`${Q}_${J.arch}`],Z=new Y9,W=0.74,K=0.92,Y=new HJ(new gJ(0.74,0.92,0.05),[0,1,2,3,4,5].map((H)=>new uJ({color:H===4?16777215:c$[Q],roughness:0.6,map:H===4&&$?this.tex($):null})));Y.position.y=0.54,Y.castShadow=!0,Z.add(Y);let X=new HJ(new gJ(0.82,1,0.04),new uJ({color:c$[Q],roughness:0.5,metalness:0.2}));X.position.set(0,0.54,-0.03),X.castShadow=!0,Z.add(X);let U=new HJ(new g8(0.34,0.4,0.12,16),new uJ({color:c$[Q],roughness:0.4,metalness:0.3}));return U.position.y=0.06,U.castShadow=!0,U.receiveShadow=!0,Z.add(U),Z}wagon(J){let Q=new Y9,$=new HJ(new gJ(0.55,0.4,0.7),new uJ({color:7031333,roughness:0.9}));$.position.y=0.3,$.castShadow=!0,Q.add($);for(let Z of[-0.32,0.32])for(let W of[-0.3,0.3]){let K=new HJ(new g8(0.16,0.16,0.06,14),new uJ({color:2759952,roughness:0.8}));K.rotation.z=Math.PI/2,K.position.set(Z,0.16,W),K.castShadow=!0,Q.add(K)}return Q}update(J){this.dynamic.clear(),this.buildTiles(J);for(let Q of J.units.values()){if(!Q.pos)continue;let $=this.standee(Q),[Z,W]=i9(Q.pos[0],Q.pos[1]);$.position.set(Z,0.13,W),this.dynamic.add($)}for(let Q=0;Q<2;Q++)for(let $ of J.wagons[Q]){if($.hp<=0)continue;let Z=this.wagon(Q),[W,K]=i9($.col,$.row);Z.position.set(W,0.13,K),this.dynamic.add(Z)}for(let[Q,$]of J.fields.entries()){let[Z,W]=Q.split(",").map(Number),K=new HJ(new gJ(0.7,0.06,0.7),new uJ({color:$.type==="crop"?13148730:8219466,roughness:1})),[Y,X]=i9(Z,W);K.position.set(Y,0.15,X),K.receiveShadow=!0,this.dynamic.add(K)}for(let[Q,$]of J.palisades.entries()){let Z=J.stakes[Q],W=new HJ(new gJ(H9,0.5,0.12),new uJ({color:5915430,roughness:0.9})),[K,Y]=i9(Q,Z-1);W.position.set(K,0.32,Y-cJ/2),W.castShadow=!0,this.dynamic.add(W)}}animate=()=>{requestAnimationFrame(this.animate),this.renderer.render(this.scene,this.camera)}}var PJ=(J)=>`${J[0]},${J[1]}`,O7=(J)=>J[0].toUpperCase()+J.slice(1),s$=(J,Q)=>({2:Q.UNLOCK_3RD,3:Q.UNLOCK_4TH,4:Q.UNLOCK_5TH})[J];class w6{root;g;policies;cfg;banner="";log=[];mBuild=[];mPlan;mMode={kind:null};cOrders=new Map;cSel=null;onChange=null;board3d;shell;get use3d(){return this.cfg.view!=="2d"}constructor(J){this.root=J}get phaseKind(){if(this.banner.includes("Muster"))return"muster";if(this.banner.includes("Clash"))return"clash";if(this.banner.includes("Intervention"))return"iv";return"other"}get round(){return this.g.round}get bannerText(){return this.banner}get musterModeKind(){return this.mMode.kind}get stagedRecruitCount(){return this.mPlan?.recruits.length??0}get stagedBuildCount(){return this.mBuild?.length??0}get selectedUid(){return this.cSel}get orderCount(){return this.cOrders.size}isHuman(J){return this.cfg.mode==="hotseat"||J===this.cfg.humanSeat}tribe(J){return J===0?this.cfg.p0tribe:this.cfg.p1tribe}human(J){return this.policies[J]}start(J){this.init(J),this.g.setup(),this.begin()}startScenario(J,Q){this.init(J),this.g.setup(),Q(this.g),this.begin()}init(J){this.cfg=J,this.policies=[0,1].map((Q)=>this.isHuman(Q)?new v6(J.mode==="hotseat"?`Player ${Q+1}`:"You"):HZ(J.botName)),this.policies.forEach((Q,$)=>Q.reset(J.seed,$)),this.g=new q9(this.policies,J.seed)}begin(){this.log=[`Round 1 — ${O7(this.tribe(0))} vs ${O7(this.tribe(1))}.`],this.mountTooltip(),this.loop()}get stagedFieldCount(){return this.mBuild?.filter((J)=>J[0]==="field").length??0}get hasAttackOrder(){for(let J of this.cOrders.values())if(J[0]==="MELEE"||J[0]==="CHARGE"||J[0]==="SHOOT")return!0;return!1}tip;mountTooltip(){if(this.tip)return;this.tip=document.createElement("div"),this.tip.className="utip",this.tip.style.display="none",document.body.appendChild(this.tip),this.root.addEventListener("mousemove",(J)=>{let Q=J.target.closest?.(".cell[data-uid]");if(!Q){this.tip.style.display="none";return}let $=this.g.units.get(Number(Q.dataset.uid));if(!$){this.tip.style.display="none";return}this.tip.innerHTML=this.unitTooltip($),this.tip.style.display="block",this.tip.style.left=Math.min(J.clientX+14,window.innerWidth-210)+"px",this.tip.style.top=J.clientY+14+"px"}),this.root.addEventListener("mouseleave",()=>{if(this.tip)this.tip.style.display="none"})}unitTooltip(J){let Q={spear:"Cavalry",cav:"Archers",archer:"Spearmen"}[J.arch],$=J.rmin===J.rmax?`${J.rmax}`:`${J.rmin}–${J.rmax}`,Z=[J.exhausted?"∅ exhausted":"",J.braced?"⛨ braced":"",J.tier2?"★★ veteran":J.tier1?"★ promoted":""].filter(Boolean).join(" · ");return`<b>${$9[J.arch]}</b>
      <span class="utg">Atk ${J.base_atk}${J.base_guard?` · Guard ${J.base_guard}`:""} · HP ${J.hp}/${J.max_hp} · Move ${J.mv} · Range ${$}</span>
      ${Q?`<span class="utb">Beats ${Q}</span>`:""}
      ${J.xp?`<span class="utg">XP ${J.xp}</span>`:""}
      ${Z?`<span class="uts">${Z}</span>`:""}`}async loop(){try{for(;;)await this.playRoundInteractive()}catch(J){if(J instanceof fJ)this.winScreen(J.winner,J.wtype);else throw J}}async playRoundInteractive(){let J=this.g,Q=J.C;J.cap_dmg=[0,0],J.wagon_dmg_round=[0,0],J.rows_lost_round=[0,0],J.rows_taken_round=[0,0],J.unit_dmg_round=[0,0];for(let X of[J.komi,1-J.komi]){if(this.isHuman(X))await this.humanMuster(X);J.musterPlayer(X)}for(let X of J.units.values())X.face_down=!1;J.wards=[];try{await this.doWindow(1),await this.doPulse(1),await this.doWindow(2),await this.doPulse(2),await this.doWindow(3)}catch(X){if(!(X instanceof d8))throw X}J.wards=[],J.frontier();let[$,Z]=J.rows_lost_round;if($!==Z)J.komi=$>Z?0:1;let W=this.cfg.mode==="bot"?this.cfg.humanSeat:0,K=1-W,Y=[];if(J.rows_taken_round[W])Y.push(`you pushed ${J.rows_taken_round[W]} row(s) forward`);if(J.rows_lost_round[W])Y.push(`you lost ${J.rows_lost_round[W]} row(s)`);if(J.wagon_dmg_round[W])Y.push("\uD83D\uDCA5 you breached an enemy wagon!");if(J.wagon_dmg_round[K])Y.push("⚠ the enemy breached your wagon!");if(this.log.push(`Round ${J.round} frontier: ${Y.length?Y.join(", "):"the lines held — no ground changed."}`),J.round>=Q.GOLDEN_GOAL_ROUND){let X=J.rows_taken_round[0]>0||J.wagon_dmg_round[0]>0,U=J.rows_taken_round[1]>0||J.wagon_dmg_round[1]>0;if(X||U){let H;if(X&&U)if(J.rows_taken_round[0]!==J.rows_taken_round[1])H=J.rows_taken_round[0]>J.rows_taken_round[1]?0:1;else if(J.wagon_dmg_round[0]!==J.wagon_dmg_round[1])H=J.wagon_dmg_round[0]>J.wagon_dmg_round[1]?0:1;else H=J.komi;else H=X?0:1;throw new fJ(H,"golden-goal")}}for(let X=0;X<2;X++)J.res[X].tribute+=Q.TRIBUTE_PER_ROW*J.rows_lost_round[X];if(J.round===Q.CARAVAN_ROUND_1||J.round===Q.CARAVAN_ROUND_2)J.caravan(J.round===Q.CARAVAN_ROUND_1?1:2);if(J.round===1){let[X,U]=J.rows_taken_round;if(X!==U)J.r1_winner=X>U?0:1;else if(J.unit_dmg_round[0]!==J.unit_dmg_round[1]&&(!Q.R1_REQUIRE_ENGAGE||Math.min(...J.unit_dmg_round)>=1))J.r1_winner=J.unit_dmg_round[0]>J.unit_dmg_round[1]?0:1}if(J.lead_trace.push(J.leadHolder()),J.round>=Q.HARD_STOP_ROUND){let X=J.wagonsAlive(0),U=J.wagonsAlive(1);if(X!==U)throw new fJ(X>U?0:1,"ladder");let H=J.ownedRows(0),q=J.ownedRows(1);if(H!==q)throw new fJ(H>q?0:1,"ladder");throw new fJ(J.komi,"ladder")}J.updateEntrench(),J.round++,this.policies.forEach((X)=>X.clearPhase?.())}async doWindow(J){for(let Q of[this.g.komi,1-this.g.komi])if(this.isHuman(Q))await this.humanIntervention(Q,J);this.g.interventionWindow(J),this.policies.forEach((Q)=>{let $=Q;if($.pendingIntervention)$.pendingIntervention={}})}async doPulse(J){for(let $ of[0,1])if(this.isHuman($))await this.humanClash($,J);this.g.runPulse(J);let Q=[...this.g.units.values()].filter(($)=>$.pos===null&&$.wounded_round===this.g.round);if(Q.length)this.log.push(`Pulse ${J}: ${Q.length} unit(s) fell.`);this.render(),await this.pause(550)}pause(J){return new Promise((Q)=>setTimeout(Q,J))}humanMuster(J){return this.banner=`${this.seatName(J)} — Muster`,this.mBuild=[],this.mPlan={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0},this.mMode={kind:null},new Promise((Q)=>{let $=()=>{this.human(J).pendingBuild=this.mBuild,this.human(J).pendingReinforce=this.mPlan,Q()};this.musterDone=$,this.musterPlayer=J,this.render()})}musterDone=null;musterPlayer=0;musterBudget(J){let Q=this.g,$=Q.C,[Z,W]=Q.computeHarvest(J),K=0;for(let U of Q.onBoard(J))K+=$.UPKEEP_CROP+(Q.beyondOwn(U)?$.SUPPLY_STRAIN_CROP:0);let Y=Q.res[J].supply+Z-this.spentSupply(J),X=Q.res[J].crop+W-K;return{supply:Y,crop:X}}spentSupply(J){let Q=this.g,$=Q.C,Z=0;for(let K of this.mBuild)Z+=K[0]==="field"?$.FIELD_COST:$.PALISADE_COST;for(let K of this.mPlan.unlocks){let Y=Q.unlocked[J].size+this.mPlan.unlocks.indexOf(K);Z+=s$(Y,$)??0}let W=0;for(let[K]of this.mPlan.recruits)Z+=Q.costs[K]+$.COPY_SURCHARGE*(Q.copies[K]+W++);return Z-this.mPlan.tribute_spend}onCell(J,Q){let $=this.g,Z=this.banner.includes("Muster")?this.musterPlayer:-1;if(Z>=0)return this.musterCell(Z,J,Q);return this.clashCell(J,Q)}musterCell(J,Q,$){let Z=this.g,W=Z.C,K=this.mMode;if(K.kind==="palisade"){this.musterPalisade(Q[0]);return}if(K.kind==="recruit"&&K.arch){if(Z.heartlandRows(J).includes(Q[1])&&!Z.occupied(Q)&&!this.staged(Q)&&this.mPlan.recruits.length<W.DEPLOY_MAX+Z.extra_deploy[J])this.mPlan.recruits.push([K.arch,Q])}else if(K.kind==="field"&&K.ftype){if(Z.territoryOf(Q)===J&&!Z.fields.has(PJ(Q))&&!Z.wagon_at.has(PJ(Q))&&!this.staged(Q)&&this.mBuild.filter((Y)=>Y[0]==="field"||Y[0]==="palisade").length<W.BUILD_ACTIONS)this.mBuild.push(["field",Q,K.ftype])}else if(K.kind==="reposition"){if(K.uid===void 0){if($!==void 0&&Z.units.get($).owner===J&&Z.units.get($).pos)K.uid=$}else if(Z.territoryOf(Q)===J&&!Z.occupied(Q)&&!this.staged(Q)&&this.mPlan.repositions.length<W.REPOSITION_MAX)this.mPlan.repositions.push([K.uid,Q]),K.uid=void 0}this.render()}staged(J){return this.mBuild.some((Q)=>Q[0]==="field"&&PJ(Q[1])===PJ(J))||this.mPlan.recruits.some((Q)=>PJ(Q[1])===PJ(J))||this.mPlan.repositions.some((Q)=>PJ(Q[1])===PJ(J))}humanClash(J,Q){return this.banner=`${this.seatName(J)} — Clash, pulse ${Q}`,this.cOrders=new Map,this.cSel=null,this.clashPlayer=J,new Promise(($)=>{this.clashDone=()=>{let Z={};for(let[W,K]of this.cOrders)Z[W]=K;this.human(J).pendingOrders[Q]=Z,$()},this.render()})}clashDone=null;clashPlayer=0;clashCell(J,Q){let $=this.g,Z=this.clashPlayer;if(this.cSel===null){if(Q!==void 0&&$.units.get(Q).owner===Z)this.cSel=Q}else{let W=$.units.get(this.cSel),K=c8($,W);if(Q!==void 0&&$.units.get(Q).owner!==Z){let Y=K.chargeTargets.find((H)=>H.uid===Q),X=K.shootTargets.includes(Q),U=K.meleeTargets.find((H)=>H.uid===Q);if(X)this.cOrders.set(W.uid,["SHOOT",["U",Q]]);else if(Y)this.cOrders.set(W.uid,["CHARGE",Q,Y.path]);else if(U)this.cOrders.set(W.uid,["MELEE",Q,U.path]);this.cSel=null}else if(Q===this.cSel)this.cSel=null;else if(K.moves.has(PJ(J)))this.cOrders.set(W.uid,["MOVE",K.moves.get(PJ(J))]),this.cSel=null;else if(Q!==void 0&&$.units.get(Q).owner===Z)this.cSel=Q}this.render()}humanIntervention(J,Q){let $=this.g,Z=$.C,W=$.res[J].tribute,K=Q===3&&W>=Z.SURGE_COST,Y=Q<=2&&W>=Z.SHIELDBEARER_COST;if(!K&&!Y)return Promise.resolve();return this.banner=`${this.seatName(J)} — Intervention window ${Q}`,new Promise((X)=>{this.ivResolve=X,this.ivPlayer=J,this.ivWno=Q,this.ivSel=null,this.render()})}ivResolve=null;ivPlayer=0;ivWno=0;ivSel=null;render(){if(this.use3d)return this.render3d();let J=this.g;this.root.innerHTML=`
      <div class="topbar"><div class="phase-banner">${this.banner}</div>${x6()}</div>
      <div class="phase-hint">${this.phaseHint()}</div>
      ${f6(J,{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe})}
      <div class="panel">${this.panelHTML()}</div>
      <div class="gamelog">${this.log.slice(-4).map((Q)=>`<div>${Q}</div>`).join("")}</div>`,this.wireCells(),this.wirePanel(),h6(this.root),this.paintOverlays(),this.onChange?.()}mountShell(){this.root.innerHTML=`
      <div class="topbar"><div class="phase-banner"></div>${x6()}</div>
      <div class="phase-hint"></div>
      <div id="board3d" class="board3d-wrap"></div>
      <div class="panel"></div>
      <div class="gamelog"></div>`,this.shell={banner:this.root.querySelector(".phase-banner"),hint:this.root.querySelector(".phase-hint"),panel:this.root.querySelector(".panel"),log:this.root.querySelector(".gamelog")},this.board3d=new n$(this.root.querySelector("#board3d"),{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe}),this.board3d.onClick((J)=>this.onBoardClick(J)),h6(this.root)}render3d(){if(!this.board3d)this.mountShell();let J=this.shell;J.banner.innerHTML=this.banner,J.hint.innerHTML=this.phaseHint(),J.panel.innerHTML=this.panelHTML(),J.log.innerHTML=this.log.slice(-4).map((Q)=>`<div>${Q}</div>`).join(""),this.wirePanel(),this.board3d.update(this.g),this.board3d.setHighlights(this.computeHighlights()),this.onChange?.()}onBoardClick(J){let Q=this.g.board.get(PJ(J));if(this.banner.includes("Intervention"))this.ivCell(J,Q);else this.onCell(J,Q)}computeHighlights(){let J=this.g,Q={};if(this.banner.includes("Clash")&&this.cSel!==null){let $=J.units.get(this.cSel);Q.selected=$.pos;let Z=c8(J,$);Q.move=[...Z.moves.keys()].map((W)=>W.split(",").map(Number)),Q.melee=Z.meleeTargets.map((W)=>J.units.get(W.uid).pos),Q.shoot=Z.shootTargets.map((W)=>J.units.get(W).pos),Q.charge=Z.chargeTargets.map((W)=>J.units.get(W.uid).pos)}if(this.banner.includes("Muster")){let $=this.musterPlayer;Q.stage=[...this.mPlan.recruits.map((K)=>K[1]),...this.mBuild.filter((K)=>K[0]==="field").map((K)=>K[1]),...this.mPlan.repositions.map((K)=>K[1])];let Z=this.mMode,W=[];if(Z.kind==="recruit")for(let K=0;K<8;K++)for(let Y of J.heartlandRows($)){let X=[K,Y];if(!J.occupied(X)&&!this.staged(X))W.push(X)}if(Z.kind==="field")for(let K=0;K<8;K++)for(let Y=0;Y<8;Y++){let X=[K,Y];if(J.territoryOf(X)===$&&!J.fields.has(PJ(X))&&!J.wagon_at.has(PJ(X))&&!this.staged(X))W.push(X)}Q.valid=W}return Q}seatName(J){return this.cfg.mode==="hotseat"?`Player ${J+1} (${O7(this.tribe(J))})`:`You (${O7(this.tribe(J))})`}phaseHint(){if(this.banner.includes("Muster"))return"Spend \uD83D\uDEE1 <b>Supply</b> to recruit units (deploy in your back rows), unlock new types, or build fields & palisades. \uD83C\uDF3E <b>Crop</b> feeds your army each round — keep it above your unit count or they get exhausted and fight worse.";if(this.banner.includes("Clash"))return"Click a unit, then a \uD83D\uDFE2 tile to <b>move</b> or a \uD83D\uDD34 enemy to <b>attack</b>. Get units past the enemy's gold stake line and hold there to push it back next phase. Two pulses per round.";if(this.banner.includes("Intervention"))return"Optional: spend ◆ <b>Tribute</b> on a <b>Surge</b> (shove a unit one tile) or <b>Shieldbearer</b> (shield your Hero from a killing blow) — or just Skip.";return""}panelHTML(){if(this.banner.includes("Muster"))return this.musterPanel();if(this.banner.includes("Clash"))return this.clashPanel();if(this.banner.includes("Intervention"))return this.ivPanel();return""}musterPanel(){let J=this.g,Q=J.C,$=this.musterPlayer,Z=this.musterBudget($),W=this.mMode,K=[...J.unlocked[$]],Y=["spear","sword","archer","cav","siege"].filter((H)=>K.includes(H)),X=["archer","cav","siege"].filter((H)=>!K.includes(H)),U=(H,q,G)=>`<button class="pbtn${H?" on":""}" data-act="${q}">${G}</button>`;return`
      <div class="budget">Budget after harvest — \uD83D\uDEE1 <b>${Z.supply}</b> supply · \uD83C\uDF3E <b>${Z.crop}</b> crop ·
        deploy ${this.mPlan.recruits.length}/${Q.DEPLOY_MAX+J.extra_deploy[$]} · build ${this.mBuild.length}/${Q.BUILD_ACTIONS}</div>
      <div class="prow"><span class="plabel">Recruit:</span>
        ${Y.map((H)=>U(W.kind==="recruit"&&W.arch===H,`rec:${H}`,`${$9[H]} <i>${J.costs[H]+Q.COPY_SURCHARGE*J.copies[H]}\uD83D\uDEE1</i>`)).join("")}</div>
      ${X.length?`<div class="prow"><span class="plabel">Unlock:</span>
        ${X.map((H)=>U(this.mPlan.unlocks.includes(H),`unl:${H}`,`${$9[H]} <i>${s$(J.unlocked[$].size+this.mPlan.unlocks.indexOf(H)+(this.mPlan.unlocks.includes(H)?0:this.mPlan.unlocks.length-this.mPlan.unlocks.indexOf(H)),Q)??s$(J.unlocked[$].size,Q)}\uD83D\uDEE1</i>`)).join("")}</div>`:""}
      <div class="prow"><span class="plabel">Build:</span>
        ${U(W.kind==="field"&&W.ftype==="supply","fld:supply",`Supply field <i>${Q.FIELD_COST}\uD83D\uDEE1</i>`)}
        ${U(W.kind==="field"&&W.ftype==="crop","fld:crop",`Crop field <i>${Q.FIELD_COST}\uD83D\uDEE1</i>`)}
        ${U(W.kind==="palisade","pal",`Palisade <i>${Q.PALISADE_COST}\uD83D\uDEE1</i>`)}
        ${U(W.kind==="reposition","rep","Reposition")}</div>
      ${J.res[$].tribute>0?`<div class="prow"><span class="plabel">Tribute→Supply:</span>
        <button class="pbtn" data-act="trib-">−</button> <b>${this.mPlan.tribute_spend}</b>/${J.res[$].tribute}
        <button class="pbtn" data-act="trib+">+</button></div>`:""}
      <div class="prow staged">Staged: ${this.stagedSummary()}</div>
      <div class="prow"><button class="pbtn undo" data-act="undo">Undo last</button>
        <button class="pbtn confirm" data-act="muster-done">End Muster ▶</button></div>`}stagedSummary(){let J=[];for(let[Q]of this.mPlan.recruits)J.push($9[Q]);for(let Q of this.mPlan.unlocks)J.push(`unlock ${$9[Q]}`);for(let Q of this.mBuild)J.push(Q[0]==="field"?`${Q[2]} field`:"palisade");for(let Q of this.mPlan.repositions)J.push("reposition");if(this.mPlan.tribute_spend)J.push(`+${this.mPlan.tribute_spend} supply`);return J.length?J.join(", "):"<i>nothing yet — pick an action, then click the board</i>"}clashPanel(){let J=this.g,Q=this.clashPlayer,$=J.onBoard(Q),Z=[...this.cOrders.keys()],W="<i>Click one of your units to give it an order.</i>";if(this.cSel!==null){let K=J.units.get(this.cSel),Y=c8(J,K),X=[];if(Y.moves.size)X.push("\uD83D\uDFE2 move (green)");if(Y.meleeTargets.length)X.push("\uD83D\uDD34 attack (red)");if(Y.shootTargets.length)X.push("\uD83D\uDFE0 shoot (orange)");if(Y.chargeTargets.length)X.push("\uD83D\uDFE3 charge (purple)");W=`<b>${$9[K.arch]}</b> selected — ${X.join(" · ")||"no targets in range"} ·
        ${Y.canBrace?'<button class="pbtn" data-act="brace">⛨ Brace</button>':""}
        <button class="pbtn" data-act="hold">Hold</button>`}return`<div class="prow">${W}</div>
      <div class="prow staged">Orders: <b>${Z.length}/${$.length}</b> units ·
        ${Z.map((K)=>`${$9[J.units.get(K).arch]}:${this.cOrders.get(K)[0]}`).join(", ")||"<i>none</i>"}</div>
      <div class="prow"><button class="pbtn undo" data-act="clash-clear">Clear</button>
        <button class="pbtn confirm" data-act="clash-done">Resolve pulse ▶</button></div>`}ivPanel(){let J=this.g,Q=this.ivPlayer,$=this.ivWno,Z=[];if($===3&&J.res[Q].tribute>=J.C.SURGE_COST)Z.push(`<button class="pbtn" data-act="iv:surge">⚡ Surge <i>${J.C.SURGE_COST}◆</i></button>`);if($<=2&&J.res[Q].tribute>=J.C.SHIELDBEARER_COST)Z.push(`<button class="pbtn" data-act="iv:shield">⛨ Shieldbearer <i>${J.C.SHIELDBEARER_COST}◆</i></button>`);let W=this.ivSel?`<div class="prow staged">${this.ivSel.kind==="surge"?"Surge: click your unit, then an adjacent empty tile.":"Shieldbearer: click the unit to ward."}</div>`:"";return`<div class="prow">Tribute ◆${J.res[Q].tribute}. Optional intervention:</div>
      <div class="prow">${Z.join(" ")} <button class="pbtn confirm" data-act="iv-skip">Skip ▶</button></div>${W}`}wireCells(){this.root.querySelectorAll(".cell").forEach((J)=>{J.addEventListener("click",()=>{let Q=J.dataset.pos.split(",").map(Number),$=J.dataset.uid!==void 0?Number(J.dataset.uid):void 0;if(this.banner.includes("Intervention"))this.ivCell(Q,$);else this.onCell(Q,$)})})}wirePanel(){this.root.querySelectorAll(".pbtn").forEach((J)=>{J.addEventListener("click",()=>this.onAct(J.dataset.act))})}onAct(J){let Q=this.g,$=Q.C;if(J==="muster-done"){this.mMode={kind:null},this.musterDone?.();return}if(J==="clash-done"){this.clashDone?.();return}if(J==="clash-clear"){this.cOrders.clear(),this.cSel=null,this.render();return}if(J==="iv-skip"){this.ivResolve?.();return}if(J==="undo"){if(this.mPlan.repositions.length)this.mPlan.repositions.pop();else if(this.mPlan.recruits.length)this.mPlan.recruits.pop();else if(this.mBuild.length)this.mBuild.pop();else if(this.mPlan.unlocks.length)this.mPlan.unlocks.pop();this.render();return}if(J==="brace"&&this.cSel!==null){this.cOrders.set(this.cSel,["BRACE"]),this.cSel=null,this.render();return}if(J==="hold"&&this.cSel!==null){this.cOrders.delete(this.cSel),this.cSel=null,this.render();return}if(J.startsWith("rec:")){this.mMode={kind:"recruit",arch:J.slice(4)},this.render();return}if(J.startsWith("fld:")){this.mMode={kind:"field",ftype:J.slice(4)},this.render();return}if(J==="pal"){this.mMode={kind:"palisade"},this.render();return}if(J==="rep"){this.mMode={kind:"reposition"},this.render();return}if(J.startsWith("unl:")){let Z=J.slice(4);if(!this.mPlan.unlocks.includes(Z))this.mPlan.unlocks.push(Z);this.render();return}if(J==="trib+"){this.mPlan.tribute_spend=Math.min(this.mPlan.tribute_spend+1,Q.res[this.musterPlayer].tribute),this.render();return}if(J==="trib-"){this.mPlan.tribute_spend=Math.max(0,this.mPlan.tribute_spend-1),this.render();return}if(J==="iv:surge"){this.ivSel={kind:"surge"},this.render();return}if(J==="iv:shield"){this.ivSel={kind:"shield"},this.render();return}}musterPalisade(J){let Q=this.g.C;if(!this.g.palisades.has(J)&&!this.mBuild.some(($)=>$[0]==="palisade"&&$[1]===J)&&this.mBuild.length<Q.BUILD_ACTIONS)this.mBuild.push(["palisade",J]);this.render()}ivCell(J,Q){let $=this.g,Z=this.ivPlayer,W=this.human(Z);if(!this.ivSel)return;if(this.ivSel.kind==="shield"){if(Q!==void 0&&$.units.get(Q).owner===Z)W.pendingIntervention[this.ivWno]=["SHIELDBEARER",Q],this.ivResolve?.()}else if(this.ivSel.uid===void 0){if(Q!==void 0&&$.units.get(Q).owner===Z)this.ivSel.uid=Q,this.render()}else{let K=$.units.get(this.ivSel.uid);if(Math.abs(K.pos[0]-J[0])+Math.abs(K.pos[1]-J[1])===1&&!$.occupied(J))W.pendingIntervention[this.ivWno]=["SURGE",this.ivSel.uid,J],this.ivResolve?.()}}paintOverlays(){let J=(Q,$)=>{let Z=this.root.querySelector(`.cell[data-pos="${PJ(Q)}"]`);if(Z)Z.classList.add($)};if(this.banner.includes("Clash")&&this.cSel!==null){let Q=this.g.units.get(this.cSel);this.root.querySelector(`.cell[data-pos="${PJ(Q.pos)}"]`)?.classList.add("sel");let Z=c8(this.g,Q);for(let W of Z.moves.keys())J(W.split(",").map(Number),"hl-move");for(let W of Z.meleeTargets)J(this.g.units.get(W.uid).pos,"hl-melee");for(let W of Z.shootTargets)J(this.g.units.get(W).pos,"hl-shoot");for(let W of Z.chargeTargets)J(this.g.units.get(W.uid).pos,"hl-charge")}if(this.banner.includes("Clash"))for(let[Q,$]of this.cOrders){let Z=this.root.querySelector(`.cell[data-uid="${Q}"] .unit`);if(Z)Z.insertAdjacentHTML("beforeend",`<span class="orderbadge">${$[0][0]}</span>`)}if(this.banner.includes("Muster")){for(let W of this.mPlan.recruits)J(W[1],"hl-stage");for(let W of this.mBuild)if(W[0]==="field")J(W[1],"hl-stage");for(let W of this.mPlan.repositions)J(W[1],"hl-stage");let Q=this.mMode,$=this.musterPlayer,Z=this.g;if(Q.kind==="recruit")for(let W=0;W<8;W++)for(let K of Z.heartlandRows($)){let Y=[W,K];if(!Z.occupied(Y)&&!this.staged(Y))J(Y,"hl-valid")}if(Q.kind==="field")for(let W=0;W<8;W++)for(let K=0;K<8;K++){let Y=[W,K];if(Z.territoryOf(Y)===$&&!Z.fields.has(PJ(Y))&&!Z.wagon_at.has(PJ(Y))&&!this.staged(Y))J(Y,"hl-valid")}}}winScreen(J,Q){let $=this.cfg.mode==="bot"?this.cfg.humanSeat:null,W=`<div class="winscreen">
        <h2>${$===null?`Player ${J+1} wins`:J===$?"Victory":"Defeat"}</h2>
        <p>${O7(this.tribe(J))} (P${J+1}) — <b>${Q}</b> after ${this.g.round} rounds.</p>
        <button class="pbtn confirm" onclick="location.reload()">New game</button>
      </div>`;if(this.use3d&&this.board3d){this.board3d.update(this.g),this.board3d.setHighlights({});let K=document.createElement("div");K.className="overlay",K.innerHTML=`<div class="modal">${W}</div>`,document.body.appendChild(K)}else this.root.innerHTML=f6(this.g,{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe})+W}}function F5(J){let Q=($,Z,W)=>{let K=J.newUnit($,Z);J.place(K,W)};J.unlocked[0].add("archer"),J.unlocked[0].add("cav"),Q(0,"sword",[1,3]),Q(1,"archer",[1,4]),Q(0,"cav",[3,2]),Q(1,"archer",[3,5]),Q(0,"archer",[5,3]),Q(1,"spear",[5,5])}var E8=[{text:"<b>Welcome, commander.</b> I'll teach you everything — assume you know nothing. LIMES is a <b>dice-free</b> wargame: no luck, every result follows from the rules. Click <b>Next ▶</b>.",manual:!0},{text:'<b>The board is 8×8.</b> You command the <b>bottom</b> half; the enemy holds the top. The <span class="g-c g-move">gold line</span> across each column is the <b>frontier (stake line)</b> — below it is your land, above it theirs.',board:!0,manual:!0},{text:"On each back row sit <b>Supply Wagons</b> (▣) — 3 per side. <b>Win</b> by destroying all 3 enemy wagons (top). If nobody does, the leader at the round-18 limit wins. So: <b>attack their wagons, defend yours.</b>",board:!0,manual:!0},{text:"I've set up a <b>practice skirmish</b> — your troops are already near the enemy so you can try every action. <b>Tip: hover any unit</b> to see its stats.",board:!0,manual:!0},{text:"Two resources run your war: \uD83D\uDEE1 <b>Supply</b> (builds things) and \uD83C\uDF3E <b>Crop</b> (feeds your army — <b>1 per unit each round</b>; unfed units get <b>exhausted</b> and fight worse). Every round starts with <b>Muster</b>, where you spend them.",manual:!0},{text:"Let's recruit. Click the <b>Spearman</b> button below.",hi:'[data-act="rec:spear"]',done:(J)=>J.musterModeKind==="recruit"},{text:"The glowing tiles are your back rows. <b>Click a glowing tile</b> to deploy your Spearman there.",board:!0,done:(J)=>J.stagedRecruitCount>=1},{text:"Good. Now economy: more Crop = a bigger army you can feed. Click <b>Crop field</b>.",hi:'[data-act="fld:crop"]',done:(J)=>J.musterModeKind==="field"},{text:"<b>Click a glowing tile in your territory</b> to build the field (it yields Crop every Muster).",board:!0,done:(J)=>J.stagedFieldCount>=1},{text:"You can also <b>Unlock</b> new unit types (Cavalry, Archers, Siege), build <b>Palisades</b> (block a column), or convert <b>Tribute → Supply</b>. The key rule of who-beats-who: <b>Spear ▸ Cavalry ▸ Archer ▸ Spear</b>. Now click <b>End Muster ▶</b>.",hi:'[data-act="muster-done"]',done:(J)=>J.phaseKind==="clash"},{text:"<b>Clash</b> — combat, fought over <b>two pulses</b>. Both sides' orders resolve <b>at the same time</b> (no first-mover advantage). <b>Click one of your units</b> to select it.",board:!0,done:(J)=>J.selectedUid!==null},{text:'Highlights show what it can do: <span class="g-c g-move">green</span> move · <span class="g-c g-melee">red</span> melee · <span class="g-c g-shoot">orange</span> shoot · <span class="g-c g-charge">purple</span> charge. Your forward units have enemies in range! <b>Select a unit with a coloured enemy and click that enemy to attack.</b>',board:!0,done:(J)=>J.hasAttackOrder},{text:"Attack queued. <b>Damage = your Atk − their Guard.</b> Edges: <b>+1</b> if you counter their type, <b>+1</b> when flanking (2+ attackers), Cavalry <b>Charge</b> adds punch and shoves — but a <b>Braced Spearman</b> stops a charge cold and wrecks the rider. <b>Archers/Siege shoot</b> from range without retaliation.",manual:!0},{text:'You can also just <b>advance</b>: select a unit and click a <span class="g-c g-move">green</span> tile to move toward the enemy line. Order as many units as you like, then click <b>Resolve pulse ▶</b>.',hi:'[data-act="clash-done"]',done:(J)=>J.bannerText.includes("pulse 2")||J.phaseKind!=="clash"},{text:"<b>Pulse 1 resolved!</b> Check the units — HP bars dropped, maybe one fell. Wounding enemies earns <b>XP</b> → <b>promotions</b> (★ tougher, ★★ upgraded). Now <b>pulse 2</b>: same again, then <b>Resolve pulse ▶</b> to end the round.",hi:'[data-act="clash-done"]',done:(J)=>J.round>=2},{text:"<b>Round over.</b> The <b>Frontier</b> just resolved automatically: in any column where one side has a unit past the line with a friend nearby (a <b>carry</b>) and the enemy doesn't contest it, the <b>stake steps</b> — you take a row. Units in the enemy's back rows <b>breach</b> a wagon. See the <b>log line</b> under the board.",manual:!0},{text:"When you <b>lose</b> a row you gain ◆ <b>Tribute</b> — spend it during Clash on a <b>Surge</b> (shove a unit a tile) or <b>Shieldbearer</b> (save your Hero from a death blow), or bank it and convert to Supply. Losing ground isn't all bad.",manual:!0},{text:"Two more things: your <b>Hero</b> is your standard — if it's ever fully surrounded by enemies you <b>rout</b> (your wagons take damage), so keep a friend beside it. And on <b>rounds 4 & 8</b> a <b>Caravan</b> lets both sides draft one-time <b>Artifacts</b> (the trailing side picks first).",manual:!0},{text:"<b>The clock:</b> from round 14 a single uncontested push can end it (golden goal); at round 18 the leader wins outright — so don't stall if you're behind. That's the <b>whole game</b>!",manual:!0},{text:"You know LIMES now: <b>feed your army, win the match-ups, push toward their wagons.</b> Keep playing this skirmish, and open <b>❓ Guide</b> anytime for stats & tips. Good luck, commander. ⚔",manual:!0}];class i${c;i=0;box;constructor(J){this.c=J}start(J){this.box=document.createElement("div"),this.box.id="coach",document.body.appendChild(this.box),this.c.onChange=()=>this.refresh(),this.c.startScenario(J,F5),this.render()}refresh(){let J=E8[this.i];if(!J)return;if(!J.manual&&J.done&&J.done(this.c)){this.advance();return}this.spotlight()}advance(){if(this.i++,this.i>=E8.length)return this.finish();this.render()}boardEl(){return document.querySelector("#board3d")||document.querySelector(".board-grid")}clearSpot(){document.querySelectorAll(".coachmark").forEach((J)=>J.classList.remove("coachmark")),this.boardEl()?.classList.remove("coach-board")}spotlight(){this.clearSpot();let J=E8[this.i];if(J.hi)document.querySelector(J.hi)?.classList.add("coachmark");if(J.board)this.boardEl()?.classList.add("coach-board")}render(){let J=E8[this.i];this.box.innerHTML=`
      <div class="coach-inner">
        <div class="coach-step">Tutorial · ${this.i+1}/${E8.length}</div>
        <div class="coach-text">${J.text}</div>
        <div class="coach-btns">
          ${J.manual?`<button class="pbtn confirm" id="coach-next">${this.i===E8.length-1?"Finish ✓":"Next ▶"}</button>`:'<span class="coach-hint">↳ do the highlighted action to continue</span>'}
          <button class="pbtn" id="coach-guide">❓ Guide</button>
          <button class="pbtn coach-skip" id="coach-skip">Skip</button>
        </div>
      </div>`,this.box.querySelector("#coach-next")?.addEventListener("click",()=>this.i===E8.length-1?this.finish():this.advance()),this.box.querySelector("#coach-guide")?.addEventListener("click",n8),this.box.querySelector("#coach-skip")?.addEventListener("click",()=>this.finish()),this.spotlight()}finish(){this.c.onChange=null,this.clearSpot(),this.box.remove()}}var R5=["HONEST","AGGRO","TURTLE","PROBER","SANDBAGGER","RUNNER"],_5={HONEST:"Balanced value play",AGGRO:"Relentless stake-pusher",TURTLE:"Economy & walls",PROBER:"Punishes overextension",SANDBAGGER:"Banks tribute, then strikes",RUNNER:"Cavalry cheese"},nJ=document.getElementById("app"),YJ={mode:"bot",humanSeat:0,botName:"HONEST",p0tribe:"roman",p1tribe:"viking",seed:12345};function zK(J){return I7.map((Q)=>`<option value="${Q}"${Q===J?" selected":""}>${GZ(Q)}</option>`).join("")}function C6(){nJ.innerHTML=`
    <div class="setup">
      <h1>LIMES</h1>
      <p class="sub">A deterministic, dice-free frontier wargame. Hold the line; carry the stakes.</p>

      <div class="srow"><span class="slabel">Opponent</span>
        <div class="seg">
          <button class="segbtn${YJ.mode==="bot"?" on":""}" data-mode="bot">vs Bot</button>
          <button class="segbtn${YJ.mode==="hotseat"?" on":""}" data-mode="hotseat">Hotseat (2P)</button>
        </div></div>

      <div id="botrow" class="srow"${YJ.mode==="bot"?"":" hidden"}>
        <span class="slabel">Bot</span>
        <select id="bot">${R5.map((J)=>`<option value="${J}"${J===YJ.botName?" selected":""}>${J} — ${_5[J]}</option>`).join("")}</select>
      </div>

      <div id="seatrow" class="srow"${YJ.mode==="bot"?"":" hidden"}>
        <span class="slabel">Your seat</span>
        <div class="seg">
          <button class="segbtn${YJ.humanSeat===0?" on":""}" data-seat="0">P1 · bottom</button>
          <button class="segbtn${YJ.humanSeat===1?" on":""}" data-seat="1">P2 · top</button>
        </div></div>

      <div class="srow"><span class="slabel">P1 tribe</span>
        <select id="p0t">${zK(YJ.p0tribe)}</select></div>
      <div class="srow"><span class="slabel">P2 tribe</span>
        <select id="p1t">${zK(YJ.p1tribe)}</select></div>

      <div class="srow"><span class="slabel">Seed</span>
        <input id="seed" type="number" value="${YJ.seed}">
        <button class="pbtn" id="rnd">⟳</button></div>

      <button class="pbtn confirm big" id="start">Begin campaign ▶</button>
      <div class="setup-links">
        <button class="pbtn" id="tut">\uD83C\uDF93 Tutorial — learn by playing</button>
        <button class="pbtn" id="guide">\uD83D\uDCD6 Read the rules</button>
      </div>
      <p class="hint">New here? Start with the <b>Tutorial</b>. Pick an action, then click the board.
        Two pulses of Clash per round; first to wipe the enemy Supply Wagons — or lead at the time limit — wins.</p>
    </div>`,nJ.querySelectorAll("[data-mode]").forEach((J)=>J.onclick=()=>{YJ.mode=J.dataset.mode,C6()}),nJ.querySelectorAll("[data-seat]").forEach((J)=>J.onclick=()=>{YJ.humanSeat=Number(J.dataset.seat),C6()}),nJ.querySelector("#bot").onchange=(J)=>YJ.botName=J.target.value,nJ.querySelector("#p0t").onchange=(J)=>YJ.p0tribe=J.target.value,nJ.querySelector("#p1t").onchange=(J)=>YJ.p1tribe=J.target.value,nJ.querySelector("#seed").onchange=(J)=>YJ.seed=Number(J.target.value)|0,nJ.querySelector("#rnd").onclick=()=>{YJ.seed=Math.floor(Math.random()*1e6),C6()},nJ.querySelector("#start").onclick=()=>{if(YJ.p0tribe===YJ.p1tribe)YJ.p1tribe=I7.find((J)=>J!==YJ.p0tribe);new w6(nJ).start({...YJ})},nJ.querySelector("#guide").onclick=n8,nJ.querySelector("#tut").onclick=()=>{new i$(new w6(nJ)).start({mode:"bot",humanSeat:0,botName:"TURTLE",p0tribe:YJ.p0tribe,p1tribe:YJ.p1tribe===YJ.p0tribe?I7.find((J)=>J!==YJ.p0tribe):YJ.p1tribe,seed:4242})}}C6();})();
