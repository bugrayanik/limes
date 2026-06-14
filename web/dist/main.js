(()=>{function bZ(J){let Q=new TextEncoder().encode(J),$=Q.length*8,Z=Q.length+1,W=Z+(56-Z%64+64)%64+8,K=new Uint8Array(W);K.set(Q),K[Q.length]=128;let Y=new DataView(K.buffer);Y.setUint32(W-4,$>>>0,!1),Y.setUint32(W-8,Math.floor($/4294967296)>>>0,!1);let X=1732584193,H=4023233417,U=2562383102,N=271733878,G=3285377520,q=new Uint32Array(80),F=(B,E)=>B<<E|B>>>32-E;for(let B=0;B<W;B+=64){for(let A=0;A<16;A++)q[A]=Y.getUint32(B+A*4,!1);for(let A=16;A<80;A++)q[A]=F(q[A-3]^q[A-8]^q[A-14]^q[A-16],1);let E=X,D=H,O=U,V=N,z=G;for(let A=0;A<80;A++){let P,C;if(A<20)P=D&O|~D&V,C=1518500249;else if(A<40)P=D^O^V,C=1859775393;else if(A<60)P=D&O|D&V|O&V,C=2400959708;else P=D^O^V,C=3395469782;let _=F(E,5)+P+z+C+q[A]|0;z=V,V=O,O=F(D,30),D=E,E=_}X=X+E|0,H=H+D|0,U=U+O|0,N=N+V|0,G=G+z|0}let R=(B)=>(B>>>0).toString(16).padStart(8,"0");return R(X)+R(H)+R(U)+R(N)+R(G)}class UQ{mt=new Uint32Array(624);mti=625;constructor(J){let Q=[],$=J>>>0,Z=Math.floor(J/4294967296);Q.push($);while(Z>0)Q.push(Z>>>0),Z=Math.floor(Z/4294967296);this.initByArray(Q.length?Q:[0])}initGenrand(J){this.mt[0]=J>>>0;for(let Q=1;Q<624;Q++){let $=this.mt[Q-1]^this.mt[Q-1]>>>30;this.mt[Q]=Math.imul(1812433253,$)+Q>>>0}this.mti=624}initByArray(J){this.initGenrand(19650218);let Q=1,$=0,Z=Math.max(624,J.length);for(;Z;Z--){let W=this.mt[Q-1]^this.mt[Q-1]>>>30;if(this.mt[Q]=(this.mt[Q]^Math.imul(W,1664525))+J[$]+$>>>0,Q++,$++,Q>=624)this.mt[0]=this.mt[623],Q=1;if($>=J.length)$=0}for(Z=623;Z;Z--){let W=this.mt[Q-1]^this.mt[Q-1]>>>30;if(this.mt[Q]=(this.mt[Q]^Math.imul(W,1566083941))-Q>>>0,Q++,Q>=624)this.mt[0]=this.mt[623],Q=1}this.mt[0]=2147483648}genrandUint32(){let J;if(this.mti>=624){let Q=0;for(;Q<227;Q++)J=this.mt[Q]&2147483648|this.mt[Q+1]&2147483647,this.mt[Q]=this.mt[Q+397]^J>>>1^(J&1?2567483615:0);for(;Q<623;Q++)J=this.mt[Q]&2147483648|this.mt[Q+1]&2147483647,this.mt[Q]=this.mt[Q+-227]^J>>>1^(J&1?2567483615:0);J=this.mt[623]&2147483648|this.mt[0]&2147483647,this.mt[623]=this.mt[396]^J>>>1^(J&1?2567483615:0),this.mti=0}return J=this.mt[this.mti++],J^=J>>>11,J^=J<<7&2636928640,J^=J<<15&4022730752,J^=J>>>18,J>>>0}getrandbits(J){return this.genrandUint32()>>>32-J}randbelow(J){if(!J)return 0;let Q=32-Math.clz32(J),$=this.getrandbits(Q);while($>=J)$=this.getrandbits(Q);return $}shuffle(J){for(let Q=J.length-1;Q>=1;Q--){let $=this.randbelow(Q+1),Z=J[Q];J[Q]=J[$],J[$]=Z}}}var LY={BOARD_COLS:8,BOARD_ROWS:8,HEARTLAND_ROWS:2,STAKE_START:4,STAKE_MIN:2,STAKE_MAX:6,STAKE_STEP_MAX:1,LONE_RUNNER_RADIUS:2,WAGON_COUNT:3,WAGON_HP:3,WAGON_BOUNTY:3,BREACH_DMG:1,BREACH_CAP:2,BREACH_CAP_LATE:3,BREACH_CAP_RISE_ROUND:13,ROUT_WAGON_DMG:2,START_SUPPLY:8,START_CROP:6,FIELD_COST:2,FIELD_YIELD:2,FARMSTEAD_SIZE:3,FARMSTEAD_BONUS:2,ANNEX_YIELD:1,RAID_GAIN:3,PALISADE_COST:3,BUILD_ACTIONS:2,UPKEEP_CROP:1,SUPPLY_STRAIN_CROP:1,EXHAUSTION_START_ROUND:12,EXHAUSTION_INITIAL:1,EXHAUSTION_ACCEL_ROUND:13,EXHAUSTION_ACCEL:2,MUSTER_COPIES:6,COPY_SURCHARGE:1,UNLOCK_3RD:6,UNLOCK_4TH:10,UNLOCK_5TH:15,COST_SPEARMAN:2,COST_SWORDSMAN:3,COST_ARCHER:3,COST_CAVALRY:4,COST_SIEGE:5,DEPLOY_MAX:2,REPOSITION_MAX:2,RUSH_RETURN_COST:1,WOUND_RETURN_DELAY:2,TRIBUTE_PER_ROW:1,TRIBUTE_SUPPLY_VALUE:1,SURGE_COST:1,SHIELDBEARER_COST:2,INTERVENTIONS_PER_WINDOW:1,PULSES_PER_CLASH:2,ATK_BONUS_CAP:2,GUARD_CAP:2,MOD_FLANK:1,MOD_SUPPORT:1,MOD_BRACE_GUARD:1,MOD_CHARGE:1,MOD_COUNTER:1,MOD_HILL:1,MOD_RIVER:1,MOD_ROAD:1,FLANK_THRESHOLD:2,FLANK_MIN_DMG:1,EXHAUST_ATK_PENALTY:1,EXHAUST_GUARD_PENALTY:1,DISPLACE_DMG:1,RIVER_PUSH_DMG:2,TRAP_PUSH_DMG:2,CHARGE_MOVE_MIN:2,PUSH_BACK:1,RANGED_RETALIATION:1,SPEAR_ATK:1,SPEAR_HP:4,SPEAR_MV:1,SPEAR_RNG:1,SWORD_ATK:2,SWORD_HP:5,SWORD_MV:1,SWORD_RNG:1,CAV_ATK:2,CAV_HP:4,CAV_MV:3,CAV_RNG:1,ARCHER_ATK:2,ARCHER_HP:3,ARCHER_MV:1,ARCHER_RNG_MAX:2,SIEGE_ATK:3,SIEGE_HP:3,SIEGE_MV:1,SIEGE_RNG_MIN:2,SIEGE_RNG_MAX:3,HERO_ATK:3,HERO_HP:7,HERO_MV:2,HERO_RNG:1,XP_PER_WOUND:1,XP_TIER1:2,XP_TIER2:4,PROMO_T1_HP:1,PROMO_T2_STAT:1,CARAVAN_ROUND_1:4,CARAVAN_ROUND_2:8,CARAVAN_ARTIFACTS:4,CARAVAN_DISCARD:1,ARTIFACT_POOL:8,ARTIFACT_SUPPLY:4,ARTIFACT_CROP:4,ARTIFACT_XP:2,ARTIFACT_TRIBUTE:2,ARTIFACT_DISCOUNT:2,GOLDEN_GOAL_ROUND:16,HARD_STOP_ROUND:20,LASTSTAND_BOONS:3,ENTRENCH_PALISADES:2,ENTRENCH_HOLD:0,FIRST_BLOOD_SUPPLY:0,TIMER_MUSTER:60,TIMER_COMMIT:15,TIMER_MUSTER_CASUAL:90,TIMER_COMMIT_CASUAL:30,TACTICA_POOL:9,TACTICA_RACK:5,TACTICA_HELD:2,TACTICA_HELD_CONTINGENCY:3,DOCTRINE_DISPLAY:8,DOCTRINE_BASE_PRICE:4,DOCTRINE_AGING:1,DOCTRINE_MIN_PRICE:1,T2_POOL:5,T2_UNLOCKABLE:3,GAUL_TRAPS:2,HUN_REPOSITIONS:2,ZOC_ENABLED:1,SIEGE_PUSH_UNITS:1,CHARGE_ADJ_OK:1,EXHAUSTED_CARRY:0,R1_REQUIRE_ENGAGE:0},lZ={SWORD_HP:6,SIEGE_PUSH_UNITS:0,CHARGE_ADJ_OK:0,EXHAUSTED_CARRY:1,R1_REQUIRE_ENGAGE:1,EXHAUSTION_ACCEL:0,WAGON_HP:2,WAGON_BOUNTY:5,GOLDEN_GOAL_ROUND:14,HARD_STOP_ROUND:18,BREACH_CAP_RISE_ROUND:11,LONE_RUNNER_RADIUS:3};function BY(J){return{...LY,...J??{}}}var gZ=["spear","sword","cav","archer","siege"],GQ={spear:"cav",cav:"archer",archer:"spear"};function zY(J){return{spear:J.COST_SPEARMAN,sword:J.COST_SWORDSMAN,archer:J.COST_ARCHER,cav:J.COST_CAVALRY,siege:J.COST_SIEGE,hero:9}}function kY(J){return{spear:[J.SPEAR_ATK,J.SPEAR_HP,J.SPEAR_MV,1,1],sword:[J.SWORD_ATK,J.SWORD_HP,J.SWORD_MV,1,1],cav:[J.CAV_ATK,J.CAV_HP,J.CAV_MV,1,1],archer:[J.ARCHER_ATK,J.ARCHER_HP,J.ARCHER_MV,2,J.ARCHER_RNG_MAX],siege:[J.SIEGE_ATK,J.SIEGE_HP,J.SIEGE_MV,J.SIEGE_RNG_MIN,J.SIEGE_RNG_MAX],hero:[J.HERO_ATK,J.HERO_HP,J.HERO_MV,1,1]}}var T0=(J)=>`${J[0]},${J[1]}`,pZ=(J,Q)=>T0(J)<=T0(Q)?`${T0(J)}|${T0(Q)}`:`${T0(Q)}|${T0(J)}`;function C9(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++){let Z=J[$],W=Q[$];if(Array.isArray(Z)&&Array.isArray(W)){let K=C9(Z,W);if(K)return K}else if(Z!==W)return Z<W?-1:1}return 0}class lJ extends Error{winner;wtype;constructor(J,Q){super("GameOver");this.winner=J;this.wtype=Q}}class K7 extends Error{constructor(){super("ClashEnd")}}class dZ{uid;owner;arch;base_atk;base_guard=0;hp;max_hp;mv;rmin;rmax;pos=null;exhausted=!1;braced=!1;xp=0;tier1=!1;tier2=!1;wounded_round=null;face_down=!1;constructor(J,Q,$,Z){this.uid=J,this.owner=Q,this.arch=$,this.base_atk=Z[0],this.hp=Z[1],this.max_hp=Z[1],this.mv=Z[2],this.rmin=Z[3],this.rmax=Z[4]}}class _9{C;seed;bots;stats;costs;units=new Map;next_uid=0;board=new Map;stakes;fields=new Map;palisades=new Map;entrench=new Map;res;wagons=[[],[]];wagon_at=new Map;komi=1;round=1;copies={spear:0,sword:0,cav:0,archer:0,siege:0};unlocked=[new Set(["sword","spear"]),new Set(["sword","spear"])];extra_deploy=[0,0];recruit_discount=[0,0];standard_bearer=[null,null];wards=[];last_stand_used=[!1,!1];last_wagon_kill_src=null;cap_dmg=[0,0];wagon_dmg_round=[0,0];rows_lost_round=[0,0];rows_taken_round=[0,0];unit_dmg_round=[0,0];terrain_on=!1;ttype=new Map;rivers=new Set;artifact_order=[];lead_trace=[];r1_winner=null;r1_rows_winner=null;constructor(J,Q,$){this.C=BY($),this.seed=Q,this.bots=J,this.stats=kY(this.C),this.costs=zY(this.C),this.stakes=Array(8).fill(this.C.STAKE_START),this.res=[{supply:this.C.START_SUPPLY,crop:this.C.START_CROP,tribute:0},{supply:this.C.START_SUPPLY,crop:this.C.START_CROP,tribute:0}],this.artifact_order=[...Array(this.C.ARTIFACT_POOL).keys()].map((Z)=>Z+1),new UQ(Q).shuffle(this.artifact_order)}heartlandRows(J){return J===0?[0,1]:[6,7]}backRow(J){return J===0?0:7}occupied(J){return this.board.has(T0(J))||this.wagon_at.has(T0(J))}inBounds(J){return J[0]>=0&&J[0]<8&&J[1]>=0&&J[1]<8}newUnit(J,Q){let $=new dZ(this.next_uid,J,Q,this.stats[Q]);return this.next_uid++,this.units.set($.uid,$),$}place(J,Q){this.board.set(T0(Q),J.uid),J.pos=Q}freeHeartlandTile(J){for(let Q=0;Q<8;Q++)for(let $ of this.heartlandRows(J))if(!this.occupied([Q,$]))return[Q,$];return null}setup(){let J=this.C;for(let Q=0;Q<2;Q++){let $=this.bots[Q].setup(this,Q),Z=this.heartlandRows(Q),W=this.backRow(Q),K=[];for(let H of $.wagons)if(H>=0&&H<8&&!K.includes(H))K.push(H);for(let H=0;H<8&&K.length<J.WAGON_COUNT;H++)if(!K.includes(H))K.push(H);K.length=Math.min(K.length,J.WAGON_COUNT),K.forEach((H,U)=>{this.wagons[Q].push({col:H,row:W,hp:J.WAGON_HP}),this.wagon_at.set(T0([H,W]),[Q,U])});let Y=["hero","spear","sword","sword"],X=$.units.slice();for(let H of Y){let U=null;for(let N=0;N<X.length;N++){let G=X[N];if(G.arch===H&&Z.includes(G.pos[1])&&this.inBounds(G.pos)&&!this.occupied(G.pos)){U=G.pos,X.splice(N,1);break}}if(U===null)U=this.freeHeartlandTile(Q);this.place(this.newUnit(Q,H),U)}}}moveUnit(J,Q){this.board.delete(T0(J.pos)),this.board.set(T0(Q),J.uid),J.pos=Q}unbroken(J){return J.pos!==null&&!J.exhausted}loneRunner(J){let Q=this.C.LONE_RUNNER_RADIUS;for(let $ of this.units.values())if($.uid!==J.uid&&$.owner===J.owner&&$.pos!==null&&s0($.pos,J.pos)<=Q)return!1;return!0}carryEligible(J){if(J.pos===null||this.loneRunner(J))return!1;return!J.exhausted||!!this.C.EXHAUSTED_CARRY}exhaustionPenalty(J){let Q=this.C,$=J??this.round;if($<Q.EXHAUSTION_START_ROUND)return 0;let Z=Q.EXHAUSTION_INITIAL;if($>=Q.EXHAUSTION_ACCEL_ROUND)Z+=Q.EXHAUSTION_ACCEL*($-Q.EXHAUSTION_ACCEL_ROUND+1);return Z}columnClaims(J){let Q=this.stakes[J],$=!1,Z=!1,W=!1,K=!1,Y=!1,X=!1;for(let H=0;H<8;H++){let U=this.board.get(T0([J,H]));if(U===void 0)continue;let N=this.units.get(U),G=this.unbroken(N),q=this.carryEligible(N);if(!G&&!q)continue;if(N.owner===0){if(H>=Q){if(G)W=!0;if(q)$=!0}else if(G)Y=!0}else if(H<Q){if(G)X=!0;if(q)Z=!0}else if(G)K=!0}return[$&&!K,Z&&!Y]}computeHarvest(J,Q){let $=this.C,Z=this.exhaustionPenalty(Q),W=0,K=0,Y=[];for(let[U,N]of this.fields.entries()){let G=U.split(",").map(Number);if((N.annexed!==null?N.annexed:N.owner)!==J||this.territoryOf(G)!==J)continue;let F=N.annexed===J?$.ANNEX_YIELD:$.FIELD_YIELD;if(N.type==="crop")K+=Math.max(0,F-Z);else W+=F;if(N.annexed===null&&N.owner===J)Y.push([G,N.type])}let X=new Set,H=new Map(Y.map(([U,N])=>[T0(U),N]));for(let[U,N]of Y){if(X.has(T0(U)))continue;let G=0,q=[U];X.add(T0(U));while(q.length){let F=q.pop();G++;for(let R of qJ(F))if(!X.has(T0(R))&&H.get(T0(R))===N)X.add(T0(R)),q.push(R)}if(G>=$.FARMSTEAD_SIZE)if(N==="crop")K+=Math.max(0,$.FARMSTEAD_BONUS-Z);else W+=$.FARMSTEAD_BONUS}return[W,K]}musterPlayer(J){let Q=this.C,$=this.bots[J],Z=this.res[J],[W,K]=this.computeHarvest(J);Z.supply+=W,Z.crop+=K;let Y=this.onBoard(J),X=[],H=new Set;for(let O of $.feedOrder(this,J)){let V=this.units.get(O);if(H.has(O)||!V||V.owner!==J||V.pos===null)continue;H.add(O),X.push(O)}for(let O of Y)if(!H.has(O.uid))X.push(O.uid);let U=Z.crop;for(let O of X){let V=this.units.get(O),z=Q.UPKEEP_CROP+(this.beyondOwn(V)?Q.SUPPLY_STRAIN_CROP:0);if(U>=z)U-=z,V.exhausted=!1;else V.exhausted=!0}Z.crop=U;for(let O of $.build(this,J).slice(0,Q.BUILD_ACTIONS)){if(!O)continue;if(O[0]==="field"){let V=O[1],z=O[2];if(T9(V)&&this.territoryOf(V)===J&&!this.fields.has(T0(V))&&!this.wagon_at.has(T0(V))&&Z.supply>=Q.FIELD_COST&&(z==="supply"||z==="crop"))Z.supply-=Q.FIELD_COST,this.fields.set(T0(V),{type:z,owner:J,annexed:null})}else if(O[0]==="palisade"){let V=O[1];if(V>=0&&V<8&&!this.palisades.has(V)&&Z.supply>=Q.PALISADE_COST)Z.supply-=Q.PALISADE_COST,this.palisades.set(V,J)}}let N=$.reinforce(this,J),G=Math.min(Math.trunc(N.tribute_spend??0),Z.tribute);if(G>0)Z.tribute-=G,Z.supply+=G*Q.TRIBUTE_SUPPLY_VALUE;for(let O of this.reserve(J))if(O.wounded_round!==null&&O.wounded_round<=this.round-Q.WOUND_RETURN_DELAY){let V=this.freeHeartlandTile(J);if(V===null)break;O.hp=O.max_hp,O.wounded_round=null,this.place(O,V)}for(let O of N.rush??[]){let V=this.units.get(O);if(V&&V.owner===J&&V.pos===null&&V.wounded_round===this.round-1&&Z.crop>=Q.RUSH_RETURN_COST){let z=this.freeHeartlandTile(J);if(z===null)break;Z.crop-=Q.RUSH_RETURN_COST,V.hp=V.max_hp,V.wounded_round=null,this.place(V,z)}}for(let O of N.unlocks??[]){if(!gZ.includes(O)||this.unlocked[J].has(O))continue;let V=this.unlocked[J].size,z={2:Q.UNLOCK_3RD,3:Q.UNLOCK_4TH,4:Q.UNLOCK_5TH}[V];if(z!==void 0&&Z.supply>=z)Z.supply-=z,this.unlocked[J].add(O)}let q=Q.DEPLOY_MAX+this.extra_deploy[J];this.extra_deploy[J]=0;let F=0,R=new Set,B=this.heartlandRows(J);for(let[O,V]of N.recruits??[]){if(F>=q||!gZ.includes(O))continue;if(!this.unlocked[J].has(O)||this.copies[O]>=Q.MUSTER_COPIES)continue;if(!T9(V)||!B.includes(V[1])||this.occupied(V))continue;let z=this.costs[O]+Q.COPY_SURCHARGE*this.copies[O];if(this.recruit_discount[J])z=Math.max(1,z-this.recruit_discount[J]);if(Z.supply<z)continue;if(Z.supply-=z,this.recruit_discount[J])this.recruit_discount[J]=0;this.copies[O]++;let A=this.newUnit(J,O);A.face_down=!0,this.place(A,V),R.add(A.uid),F++}let E=0;for(let[O,V]of N.repositions??[]){if(E>=Q.REPOSITION_MAX)break;let z=this.units.get(O);if(!z||z.owner!==J||z.pos===null||R.has(O)||!T9(V)||this.occupied(V)||this.territoryOf(V)!==J)continue;this.moveUnit(z,V),z.braced=!1,E++}let D;for(let O of this.units.values())if(O.owner===J&&O.arch==="hero"){D=O;break}if(!D||D.pos===null){let O=$.standardBearer(this,J),V=O!==null?this.units.get(O):void 0;if(!V||V.owner!==J||V.pos===null)V=this.onBoard(J).sort((A,P)=>this.costs[P.arch]-this.costs[A.arch]||A.pos[0]-P.pos[0]||A.pos[1]-P.pos[1])[0];this.standard_bearer[J]=V?V.uid:null}else this.standard_bearer[J]=null}counter(J,Q){return GQ[J]===Q?this.C.MOD_COUNTER:0}flanked(J){let Q=0;for(let $ of qJ(J.pos)){let Z=this.board.get(T0($));if(Z!==void 0&&this.units.get(Z).owner!==J.owner)Q++}return Q>=this.C.FLANK_THRESHOLD}hasAdjacentFriend(J){for(let Q of qJ(J.pos)){let $=this.board.get(T0(Q));if($!==void 0&&this.units.get($).owner===J.owner)return!0}return!1}effGuard(J,Q=!1){let $=this.C,Z=0;if(!this.beyondOwn(J)&&this.hasAdjacentFriend(J))Z+=$.MOD_SUPPORT;if(J.braced)Z+=$.MOD_BRACE_GUARD;if(this.terrain_on){let K=this.ttype.get(T0(J.pos));if(K==="hills")Z+=$.MOD_HILL;if(K==="woods"&&Q)Z+=1}let W=J.base_guard+Math.min($.GUARD_CAP,Z);if(J.exhausted)W-=$.EXHAUST_GUARD_PENALTY;return Math.max(0,W)}effAtk(J,Q,$=!1,Z=!1){let W=this.C,K=this.counter(J.arch,Q.arch);if($)K+=W.MOD_CHARGE;if(this.flanked(Q))K+=W.MOD_FLANK;let Y=J.base_atk+Math.min(W.ATK_BONUS_CAP,K);if(J.exhausted)Y-=W.EXHAUST_ATK_PENALTY;if(Z&&this.terrain_on&&this.rivers.has(pZ(J.pos,Q.pos)))Y-=W.MOD_RIVER;return Math.max(0,Y)}attackDamage(J,Q,$=!1,Z=!1){let W=this.effAtk(J,Q,$,Z)-this.effGuard(Q,!Z&&!$),K=this.flanked(Q)?this.C.FLANK_MIN_DMG:0;return Math.max(K,W)}applyDamage(J,Q){let $=(W)=>{let[K,Y]=W,X=this.units.get(Y),H=K!==null?this.units.get(K).pos??[-1,-1]:[-1,-1];return[X.pos??[-1,-1],H]},Z=J.map((W,K)=>({inst:W,i:K})).sort((W,K)=>C9($(W.inst),$(K.inst))||W.i-K.i);for(let{inst:W}of Z)this.damageUnit(this.units.get(W[1]),W[2],W[0],Q)}damageUnit(J,Q,$,Z){if(Q<=0||J.pos===null)return;let W=this.wards.find((Y)=>Y.uid===J.uid&&Y.active);if(W&&J.hp-Q<=0){W.active=!1;let Y=this.wardBearer(J);if(Y)J=Y}J.hp-=Q;let K=`${$===null?"n":$}_${J.uid}`;if(Z.set(K,(Z.get(K)??0)+Q),$!==null){let Y=this.units.get($);if(Y.owner!==J.owner)this.unit_dmg_round[Y.owner]+=Q}}wardBearer(J){let Q=[];for(let $ of qJ(J.pos)){let Z=this.board.get(T0($));if(Z===void 0)continue;let W=this.units.get(Z);if(W.owner===J.owner&&(W.arch==="spear"||W.arch==="sword"))Q.push(W)}if(!Q.length)return null;return Q.sort(($,Z)=>Z.hp-$.hp||C9($.pos,Z.pos)),Q[0]}removeDead(J){let Q=[];for(let $ of[...this.onBoard()])if($.hp<=0)this.board.delete(T0($.pos)),$.pos=null,$.braced=!1,$.exhausted=!1,$.wounded_round=this.round,Q.push($);for(let $ of Q)for(let[Z,W]of J.entries()){let[K,Y]=Z.split("_");if(Number(Y)===$.uid&&W>=1&&K!=="n"){let X=this.units.get(Number(K));if(X.owner!==$.owner)this.gainXp(X,this.C.XP_PER_WOUND)}}}gainXp(J,Q){let $=this.C;if(J.xp+=Q,!J.tier1&&J.xp>=$.XP_TIER1)this.grantTier(J);if(!J.tier2&&J.xp>=$.XP_TIER2)this.grantTier(J)}grantTier(J){let Q=this.C;if(!J.tier1)J.tier1=!0,J.max_hp+=Q.PROMO_T1_HP,J.hp=Math.min(J.hp+1,J.max_hp);else if(!J.tier2)if(J.tier2=!0,this.bots[J.owner].promoT2(this,J.owner,J)==="guard")J.base_guard+=Q.PROMO_T2_STAT;else J.base_atk+=Q.PROMO_T2_STAT}applyPushes(J,Q){let $=this.C,Z=(K)=>{return this.units.get(K.uid).pos??K.tgt_tile??[9,9]},W=J.map((K,Y)=>({p:K,i:Y})).sort((K,Y)=>C9(Z(K.p),Z(Y.p))||K.i-Y.i);for(let{p:K}of W){let Y=this.units.get(K.uid);if(Y.pos===null){if(K.kind==="charge"&&K.charger!=null){let F=this.units.get(K.charger);if(F.pos!==null&&K.tgt_tile&&!this.occupied(K.tgt_tile))this.moveUnit(F,K.tgt_tile)}continue}let[X,H]=K.dir,U=[Y.pos[0]+X,Y.pos[1]+H],N=K.pusher??null;if(!T9(U)||this.occupied(U)){this.damageUnit(Y,$.DISPLACE_DMG,N,Q);let F=this.board.get(T0(U));if(F!==void 0)this.damageUnit(this.units.get(F),$.DISPLACE_DMG,N,Q);continue}let G=Y.pos,q=this.terrain_on&&this.rivers.has(pZ(G,U));if(this.moveUnit(Y,U),Y.braced=!1,q)this.damageUnit(Y,$.RIVER_PUSH_DMG,N,Q);if(K.kind==="charge"&&K.charger!=null){let F=this.units.get(K.charger);if(F.pos!==null&&!this.occupied(G))this.moveUnit(F,G)}}}capRemaining(J){let Q=this.C;return(this.round>=Q.BREACH_CAP_RISE_ROUND?Q.BREACH_CAP_LATE:Q.BREACH_CAP)-this.cap_dmg[J]}damageWagon(J,Q,$,Z=!0){let W=this.wagons[Q][$];if(W.hp<=0)return!1;if(Z){if(this.capRemaining(J)<=0)return!1;this.cap_dmg[J]++}if(this.wagon_dmg_round[J]++,W.hp--,W.hp<=0){if(this.wagon_at.delete(T0([W.col,this.backRow(Q)])),this.res[J].supply+=this.C.WAGON_BOUNTY,this.last_wagon_kill_src="normal",!this.last_stand_used[Q]&&this.wagonsAlive(Q)>0)this.last_stand_used[Q]=!0,this.resolveLastStand(Q)}return!0}wagonWinCheck(J){let Q=this.wagonsAlive(0),$=this.wagonsAlive(1);if(Q===0&&$===0)throw new lJ(this.komi,J);if($===0)throw new lJ(0,J);if(Q===0)throw new lJ(1,J)}resolveLastStand(J){let Q=this.bots[J].lastStand(this,J);if(Q===1){for(let $ of this.reserve(J)){let Z=this.freeHeartlandTile(J);if(Z===null)break;$.hp=$.max_hp,$.exhausted=!1,$.braced=!1,$.face_down=!1,$.wounded_round=null,this.place($,Z)}this.extra_deploy[J]++}else if(Q===2){let $=this.onBoard(J).filter((Z)=>!Z.tier2).sort((Z,W)=>W.xp-Z.xp||this.costs[W.arch]-this.costs[Z.arch]||C9(Z.pos,W.pos));if($.length)this.grantTier($[0])}else{let $=this.bots[J].entrenchCols(this,J),Z=0;for(let W of $){if(Z>=this.C.ENTRENCH_PALISADES)break;if(W>=0&&W<8&&!this.palisades.has(W))this.palisades.set(W,J),Z++}}}standardUnit(J){let Q;for(let Z of this.units.values())if(Z.owner===J&&Z.arch==="hero"){Q=Z;break}if(Q&&Q.pos!==null)return Q;let $=this.standard_bearer[J];if($!==null){let Z=this.units.get($);if(Z&&Z.pos!==null)return Z}return null}validateOrder(J,Q){let $=this.C,Z=["HOLD"];if(!Q||J.pos===null)return Z;let W=Q[0];if(W==="HOLD")return Z;if(W==="BRACE")return J.arch==="spear"?Q:Z;let K=J.braced?0:J.mv,Y=(X,H)=>{let U=H;if(this.terrain_on&&H>0&&X.length===H+1&&X.every((G)=>this.ttype.get(T0(G))==="road"))U=H+1;if(X.length>U)return!1;let N=J.pos;for(let G of X){if(!T9(G)||s0(N,G)!==1)return!1;N=G}return!0};if(W==="SHOOT"){if(J.arch!=="archer"&&J.arch!=="siege")return Z;let X=Q[1];if(X[0]==="U"){let H=this.units.get(X[1]);if(!H||H.pos===null||H.owner===J.owner)return Z;if(!(J.rmin<=s0(J.pos,H.pos)&&s0(J.pos,H.pos)<=J.rmax))return Z}else if(X[0]==="W"){if(J.arch!=="siege")return Z}else if(X[0]==="P"){if(J.arch!=="siege")return Z}else return Z;return Q}if(W==="MOVE"){let X=Q[1];return X&&X.length&&Y(X,K)?Q:Z}if(W==="MELEE"){if(J.arch==="siege")return Z;let X=Q[1],H=Q[2],U=this.units.get(X);if(!U||U.owner===J.owner)return Z;if(H&&H.length&&!Y(H,K))return Z;return["MELEE",X,H&&H.length?[...H]:[]]}if(W==="CHARGE"){if(J.arch!=="cav"||J.braced)return Z;let X=Q[1],H=Q[2],U=this.units.get(X);if(!U||U.owner===J.owner)return Z;if(!this.C.CHARGE_ADJ_OK&&U.pos!==null&&s0(J.pos,U.pos)===1)return["MELEE",X,[]];if(!H||!H.length||!Y(H,K))return Z;return["CHARGE",X,[...H]]}return Z}runPulse(J){let Q=this.bots[0].orders(this,0,J),$=this.bots[1].orders(this,1,J),Z=new Map;for(let G of this.onBoard())Z.set(G.uid,this.validateOrder(G,(G.owner===0?Q:$)[G.uid]));for(let G of this.onBoard()){let q=Z.get(G.uid)[0];if(q==="BRACE")G.braced=!0;else if(G.braced&&q!=="MELEE")G.braced=!1}this.endSubphase(new Map,[]);let W=new Map,K=[],Y=[],X=[];for(let G of this.onBoard()){let q=Z.get(G.uid);if(!q||q[0]!=="SHOOT")continue;let F=q[1];if(F[0]==="U"){let R=this.units.get(F[1]);if(!R||R.pos===null||!(G.rmin<=s0(G.pos,R.pos)&&s0(G.pos,R.pos)<=G.rmax))continue;let B;if(this.terrain_on&&this.ttype.get(T0(R.pos))==="woods")B=Math.max(this.flanked(R)?this.C.FLANK_MIN_DMG:0,this.effAtk(G,R)-this.effGuard(R,!0));else B=this.attackDamage(G,R);if(K.push([G.uid,R.uid,B]),G.arch==="siege"&&this.C.SIEGE_PUSH_UNITS){let E=R.pos[0]-G.pos[0],D=R.pos[1]-G.pos[1],O=Math.abs(E)>Math.abs(D)?[E>0?1:-1,0]:[0,D>0?1:-1];Y.push({uid:R.uid,dir:O,pusher:G.uid,kind:"siege",tgt_tile:R.pos})}}else if(F[0]==="W"){let R=F[1],B=F[2];if(R===G.owner||B>=this.wagons[R].length)continue;let E=this.wagons[R][B],D=[E.col,this.backRow(R)];if(E.hp>0&&G.rmin<=s0(G.pos,D)&&s0(G.pos,D)<=G.rmax)X.push([G.owner,R,B])}else if(F[0]==="P"){let R=F[1];if(this.palisades.has(R)){let B=this.stakes[R];for(let E of[[R,B-1],[R,B]])if(G.rmin<=s0(G.pos,E)&&s0(G.pos,E)<=G.rmax){this.palisades.delete(R);break}}}}for(let[G,q,F]of X)this.damageWagon(G,q,F,!0);if(X.length)this.wagonWinCheck("wagons");this.applyDamage(K,W),this.endSubphase(W,Y),W=new Map;let H=new Map;for(let G of this.onBoard()){let q=Z.get(G.uid);if(q&&(q[0]==="MOVE"||q[0]==="MELEE"||q[0]==="CHARGE")){let F=q[0]==="MOVE"?q[1]:q[2];if(F&&F.length)H.set(G.uid,{path:F,stopped:!1,moved:0})}}let U=0;for(let G of H.values())U=Math.max(U,G.path.length);for(let G=0;G<U;G++){let q=new Map;for(let B of[...H.keys()].sort((E,D)=>E-D)){let E=H.get(B),D=this.units.get(B);if(E.stopped||G>=E.path.length||D.pos===null)continue;let O=E.path[G];if(s0(D.pos,O)!==1){E.stopped=!0;continue}if(this.occupied(O)){E.stopped=!0;continue}let V=T0(O);if(!q.has(V))q.set(V,[]);q.get(V).push(B)}let F=[],R=[...q.keys()].sort((B,E)=>C9(B.split(",").map(Number),E.split(",").map(Number)));for(let B of R){let E=q.get(B);if(E.length>=2)for(let D of E)H.get(D).stopped=!0;else F.push([E[0],B.split(",").map(Number)])}for(let[B,E]of F)this.moveUnit(this.units.get(B),E),H.get(B).moved++;if(!this.C.ZOC_ENABLED)F=[];for(let[B]of F){let E=this.units.get(B);for(let D of qJ(E.pos)){let O=this.board.get(T0(D));if(O!==void 0&&this.units.get(O).owner!==E.owner){H.get(B).stopped=!0;break}}}}K=[],Y=[];for(let G of[...H.keys()].sort((q,F)=>q-F)){let q=Z.get(G);if(!q||q[0]!=="CHARGE")continue;let F=this.units.get(G);if(F.pos===null)continue;let R=this.units.get(q[1]);if(!R||R.pos===null||H.get(G).moved<this.C.CHARGE_MOVE_MIN||s0(F.pos,R.pos)!==1)continue;if(this.terrain_on&&this.ttype.get(T0(R.pos))==="woods")continue;if(R.arch==="spear"&&R.braced){let B=Math.max(0,R.base_atk+this.counter(R.arch,F.arch)-this.effGuard(F));K.push([R.uid,F.uid,B]);let E=[F.pos[0]-R.pos[0],F.pos[1]-R.pos[1]];Y.push({uid:F.uid,dir:E,pusher:R.uid,kind:"brace",tgt_tile:F.pos})}else{let B=this.attackDamage(F,R,!0,!0);K.push([F.uid,R.uid,B]);let E=[R.pos[0]-F.pos[0],R.pos[1]-F.pos[1]];Y.push({uid:R.uid,dir:E,pusher:F.uid,kind:"charge",charger:F.uid,tgt_tile:R.pos})}}this.applyDamage(K,W),this.endSubphase(W,Y),W=new Map,K=[],Y=[];let N=[];for(let G of this.onBoard()){let q=Z.get(G.uid);if(!q||q[0]!=="MELEE")continue;let F=this.units.get(q[1]);if(!F||F.pos===null||G.pos===null||s0(G.pos,F.pos)!==1)continue;N.push([G,F])}for(let[G,q]of N){K.push([G.uid,q.uid,this.attackDamage(G,q,!1,!0)]);let F=q.arch==="archer"||q.arch==="siege"?this.C.RANGED_RETALIATION:Math.max(0,q.base_atk+this.counter(q.arch,G.arch)-this.effGuard(G));K.push([q.uid,G.uid,F])}this.applyDamage(K,W);for(let[G,q]of N)if(q.arch==="spear"&&q.braced&&q.pos!==null&&G.pos!==null&&G.hp>0&&s0(G.pos,q.pos)===1){let F=[G.pos[0]-q.pos[0],G.pos[1]-q.pos[1]];Y.push({uid:G.uid,dir:F,pusher:q.uid,kind:"brace",tgt_tile:G.pos})}this.endSubphase(W,Y)}endSubphase(J,Q){if(this.removeDead(J),Q.length)this.applyPushes(Q,J),this.removeDead(J);this.routTest()}routTest(){let J=[];for(let Q=0;Q<2;Q++){let $=this.standardUnit(Q);if($===null)continue;let Z=!1,W=!0;for(let K of qJ($.pos)){let Y=this.board.get(T0(K));if(Y!==void 0)if(this.units.get(Y).owner!==Q)Z=!0;else{W=!1;break}else if(this.wagon_at.has(T0(K)));else{W=!1;break}}if(W&&Z)J.push(Q)}if(!J.length)return;for(let Q of J){let $=1-Q,Z=this.C.ROUT_WAGON_DMG,W=this.bots[$].routAllocate,K=W?[...W.call(this.bots[$],this,$,Q,Z)]:[];for(let Y=0;Y<Z;Y++){let X=this.wagons[Q].map((U,N)=>[N,U]).filter(([,U])=>U.hp>0);if(!X.length)break;let H=null;while(K.length){let U=K.shift();if(X.some(([N])=>N===U)){H=U;break}}if(H===null)X.sort((U,N)=>U[1].hp-N[1].hp||U[0]-N[0]),H=X[0][0];this.damageWagon($,Q,H,!1)}}throw this.wagonWinCheck("rout"),new K7}interventionWindow(J){let Q=this.C;for(let $ of[this.komi,1-this.komi]){let Z=this.bots[$].intervention(this,$,J);if(!Z)continue;let W=this.res[$];if(Z[0]==="SURGE"&&W.tribute>=Q.SURGE_COST){let K=this.units.get(Z[1]),Y=Z[2];if(K&&K.owner===$&&K.pos!==null&&T9(Y)&&s0(K.pos,Y)===1&&!this.occupied(Y))W.tribute-=Q.SURGE_COST,this.moveUnit(K,Y)}else if(Z[0]==="SHIELDBEARER"&&W.tribute>=Q.SHIELDBEARER_COST){let K=this.units.get(Z[1]);if(K&&K.owner===$&&K.pos!==null)W.tribute-=Q.SHIELDBEARER_COST,this.wards.push({uid:K.uid,owner:$,active:!0})}}}clash(){this.wards=[];try{this.interventionWindow(1),this.runPulse(1),this.interventionWindow(2),this.runPulse(2),this.interventionWindow(3)}catch(J){if(!(J instanceof K7))throw J}this.wards=[]}frontier(){let J=this.C,Q=[];for(let $=0;$<8;$++){let Z=this.stakes[$],[W,K]=this.columnClaims($);if(W===K)continue;let Y=W?0:1,X=Y===0?Z+1:Z-1;if(!(J.STAKE_MIN<=X&&X<=J.STAKE_MAX))continue;let H=1-Y;if(this.palisades.get($)===H){this.palisades.delete($);continue}let U=Y===0?[$,Z]:[$,Z-1];if(J.ENTRENCH_HOLD&&(this.entrench.get(T0(U))??0)>=J.ENTRENCH_HOLD){this.entrench.set(T0(U),0);continue}this.stakes[$]=X,this.rows_lost_round[H]++,this.rows_taken_round[Y]++,Q.push([Y,Y===0?[$,Z]:[$,Z-1]])}for(let[$,Z]of Q){let W=this.fields.get(T0(Z));if(!W)continue;if(W.owner===$){if(W.annexed!==null)W.annexed=null;continue}if((W.annexed!==null?W.annexed:W.owner)===$)continue;if(this.bots[$].trampleChoice(this,$,Z,W)==="annex")W.annexed=$;else this.res[$][W.type]+=J.RAID_GAIN,this.fields.delete(T0(Z))}for(let $ of[this.komi,1-this.komi]){let Z=1-$,W=this.heartlandRows(Z),K=this.onBoard($).filter((X)=>W.includes(X.pos[1])),Y=!1;for(let X of K){if(this.capRemaining($)<=0)break;let H=this.wagons[Z].map((G,q)=>[q,G]).filter(([,G])=>G.hp>0);if(!H.length)break;let U=H.filter(([,G])=>G.col===X.pos[0]),N;if(U.length)N=U[0][0];else{let G=Math.min(...H.map(([,F])=>Math.abs(F.col-X.pos[0]))),q=H.filter(([,F])=>Math.abs(F.col-X.pos[0])===G).sort((F,R)=>F[1].col-R[1].col);if(N=q[0][0],q.length>1){let F=this.bots[$].breachTarget(this,$,X,q);if(q.some(([R])=>R===F))N=F}}Y=this.damageWagon($,Z,N,!0)||Y}if(Y)this.wagonWinCheck("wagons")}}leadHolder(){let J=($)=>[this.wagonsAlive($),this.wagonHp($),this.ownedRows($)],Q=C9(J(0),J(1));return Q>0?0:Q<0?1:null}updateEntrench(){let J=this.C;if(!J.ENTRENCH_HOLD)return;let Q=J.STAKE_START,$=new Map;for(let Z=0;Z<8;Z++){let W=this.stakes[Z],K;if(W>Q)K=[...Array(W-Q).keys()].map((Y)=>Y+Q);else if(W<Q)K=[...Array(Q-W).keys()].map((Y)=>Y+W);else continue;for(let Y of K)$.set(T0([Z,Y]),Math.min((this.entrench.get(T0([Z,Y]))??0)+1,J.ENTRENCH_HOLD))}this.entrench=$}caravan(J){let Q=this.C,$=Q.CARAVAN_ARTIFACTS,Z=J===1?0:$,W=this.artifact_order.slice(Z,Z+$),K=(X)=>[this.wagonsAlive(X),this.ownedRows(X),X===this.komi?0:1],Y=C9(K(0),K(1))<=0?0:1;for(let X of[Y,1-Y,Y]){if(!W.length)break;let H=this.bots[X].artifactPick(this,X,W.slice());if(!W.includes(H))H=W[0];W=W.filter((U)=>U!==H),this.applyArtifact(X,H)}}applyArtifact(J,Q){let $=this.C,Z=this.res[J];if(Q===1)Z.supply+=$.ARTIFACT_SUPPLY;else if(Q===2)Z.crop+=$.ARTIFACT_CROP;else if(Q===3){let W;for(let K of this.units.values())if(K.owner===J&&K.arch==="hero"){W=K;break}if(W)W.base_guard+=1}else if(Q===4){let W=this.onBoard(J).sort((K,Y)=>Y.xp-K.xp||this.costs[Y.arch]-this.costs[K.arch]||C9(K.pos,Y.pos));if(W.length)this.gainXp(W[0],$.ARTIFACT_XP)}else if(Q===5){for(let W of this.bots[J].entrenchCols(this,J))if(W>=0&&W<8&&!this.palisades.has(W)){this.palisades.set(W,J);break}}else if(Q===6)Z.tribute+=$.ARTIFACT_TRIBUTE;else if(Q===7)this.recruit_discount[J]=$.ARTIFACT_DISCOUNT;else if(Q===8){let[,W]=this.computeHarvest(J),K=W<this.onBoard(J).length?"crop":"supply";for(let Y=0;Y<8;Y++)for(let X of this.heartlandRows(J)){let H=[Y,X];if(!this.fields.has(T0(H))&&!this.wagon_at.has(T0(H))){this.fields.set(T0(H),{type:K,owner:J,annexed:null});return}}}}playRound(){let J=this.C;this.cap_dmg=[0,0],this.wagon_dmg_round=[0,0],this.rows_lost_round=[0,0],this.rows_taken_round=[0,0],this.unit_dmg_round=[0,0],this.musterPlayer(this.komi),this.musterPlayer(1-this.komi);for(let Z of this.units.values())Z.face_down=!1;this.clash(),this.frontier();let[Q,$]=this.rows_lost_round;if(Q!==$)this.komi=Q>$?0:1;if(this.round>=J.GOLDEN_GOAL_ROUND){let Z=this.rows_taken_round[0]>0||this.wagon_dmg_round[0]>0,W=this.rows_taken_round[1]>0||this.wagon_dmg_round[1]>0;if(Z||W){let K;if(Z&&W)if(this.rows_taken_round[0]!==this.rows_taken_round[1])K=this.rows_taken_round[0]>this.rows_taken_round[1]?0:1;else if(this.wagon_dmg_round[0]!==this.wagon_dmg_round[1])K=this.wagon_dmg_round[0]>this.wagon_dmg_round[1]?0:1;else K=this.komi;else K=Z?0:1;throw new lJ(K,"golden-goal")}}for(let Z=0;Z<2;Z++)this.res[Z].tribute+=J.TRIBUTE_PER_ROW*this.rows_lost_round[Z];if(this.round===J.CARAVAN_ROUND_1)this.caravan(1);else if(this.round===J.CARAVAN_ROUND_2)this.caravan(2);if(this.round===1){let[Z,W]=this.rows_taken_round;if(Z!==W)this.r1_winner=Z>W?0:1,this.r1_rows_winner=this.r1_winner;else if(this.unit_dmg_round[0]!==this.unit_dmg_round[1]&&(!J.R1_REQUIRE_ENGAGE||Math.min(...this.unit_dmg_round)>=1))this.r1_winner=this.unit_dmg_round[0]>this.unit_dmg_round[1]?0:1;if(J.FIRST_BLOOD_SUPPLY&&this.r1_winner!==null)this.res[this.r1_winner].supply+=J.FIRST_BLOOD_SUPPLY}if(this.lead_trace.push(this.leadHolder()),this.round>=J.HARD_STOP_ROUND){let Z=this.wagonsAlive(0),W=this.wagonsAlive(1);if(Z!==W)throw new lJ(Z>W?0:1,"ladder");let K=this.ownedRows(0),Y=this.ownedRows(1);if(K!==Y)throw new lJ(K>Y?0:1,"ladder");throw new lJ(this.komi,"ladder")}this.updateEntrench(),this.round++}phaseHashesR1(){let J=[];this.musterPlayer(this.komi),this.musterPlayer(1-this.komi),J.push(["muster",this.stateHash()]);for(let Z of this.units.values())Z.face_down=!1;J.push(["reveal",this.stateHash()]),this.clash(),J.push(["clash",this.stateHash()]),this.frontier();let[Q,$]=this.rows_lost_round;if(Q!==$)this.komi=Q>$?0:1;J.push(["frontier",this.stateHash()]);for(let Z=0;Z<2;Z++)this.res[Z].tribute+=this.C.TRIBUTE_PER_ROW*this.rows_lost_round[Z];return J.push(["pass",this.stateHash()]),J}snapshot(){let J=[...this.units.values()].map((Q)=>({uid:Q.uid,owner:Q.owner,arch:Q.arch,base_atk:Q.base_atk,base_guard:Q.base_guard,hp:Q.hp,max_hp:Q.max_hp,mv:Q.mv,rmin:Q.rmin,rmax:Q.rmax,pos:Q.pos===null?null:[Q.pos[0],Q.pos[1]],exhausted:Q.exhausted,braced:Q.braced,xp:Q.xp,tier1:Q.tier1,tier2:Q.tier2,wounded_round:Q.wounded_round,face_down:Q.face_down})).sort((Q,$)=>Q.uid-$.uid);return{round:this.round,komi:this.komi,stakes:[...this.stakes],res:this.res.map((Q)=>({supply:Q.supply,crop:Q.crop,tribute:Q.tribute})),units:J,wagons:this.wagons.map((Q)=>Q.map(($)=>({col:$.col,row:$.row,hp:$.hp}))),fields:[...this.fields.entries()].map(([Q,$])=>[Q.split(",").map(Number),$]).sort(mZ),palisades:[...this.palisades.entries()].sort((Q,$)=>Q[0]-$[0]),entrench:[...this.entrench.entries()].map(([Q,$])=>[Q.split(",").map(Number),$]).sort(mZ)}}stateHash(){return bZ(Y7(this.snapshot())).slice(0,16)}}function mZ(J,Q){return Y7(J)<Y7(Q)?-1:1}function Y7(J){if(J===null)return"null";if(typeof J==="boolean")return J?"true":"false";if(typeof J==="number")return String(J);if(typeof J==="string")return JSON.stringify(J);if(Array.isArray(J))return"["+J.map(Y7).join(",")+"]";return"{"+Object.keys(J).sort().map(($)=>JSON.stringify($)+":"+Y7(J[$])).join(",")+"}"}function s0(J,Q){return Math.abs(J[0]-Q[0])+Math.abs(J[1]-Q[1])}function T9(J){return J[0]>=0&&J[0]<8&&J[1]>=0&&J[1]<8}function qJ(J){let[Q,$]=J,Z=[];if(Q>0)Z.push([Q-1,$]);if(Q<7)Z.push([Q+1,$]);if($>0)Z.push([Q,$-1]);if($<7)Z.push([Q,$+1]);return Z}_9.prototype.territoryOf=function(J){return J[1]<this.stakes[J[0]]?0:1};_9.prototype.beyondOwn=function(J){return this.territoryOf(J.pos)!==J.owner};_9.prototype.onBoard=function(J){let Q=[...this.board.values()].map(($)=>this.units.get($));if(J!==void 0)Q=Q.filter(($)=>$.owner===J);return Q.sort(($,Z)=>$.pos[0]-Z.pos[0]||$.pos[1]-Z.pos[1])};_9.prototype.reserve=function(J){return[...this.units.values()].filter((Q)=>Q.pos===null&&Q.owner===J).sort((Q,$)=>Q.uid-$.uid)};_9.prototype.wagonsAlive=function(J){return this.wagons[J].filter((Q)=>Q.hp>0).length};_9.prototype.wagonHp=function(J){return this.wagons[J].reduce((Q,$)=>Q+Math.max(0,$.hp),0)};_9.prototype.ownedRows=function(J){return J===0?this.stakes.reduce((Q,$)=>Q+$,0):this.stakes.reduce((Q,$)=>Q+(8-$),0)};function s7(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(K>Z)Z=K,$=J[W]}return $}function i7(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(K<Z)Z=K,$=J[W]}return $}function NQ(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(IY(K,Z)<0)Z=K,$=J[W]}return $}function IY(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++)if(J[$]!==Q[$])return J[$]<Q[$]?-1:1;return 0}var NJ=(J)=>`${J[0]},${J[1]}`,AY=(()=>{let J=[];for(let Q=0;Q<256;Q++){let $=Q;for(let Z=0;Z<8;Z++)$=$&1?3988292384^$>>>1:$>>>1;J[Q]=$>>>0}return J})();function PY(J){let Q=new TextEncoder().encode(J),$=4294967295;for(let Z=0;Z<Q.length;Z++)$=AY[($^Q[Z])&255]^$>>>8;return($^4294967295)>>>0}function uZ(J){return Array.isArray(J)?"("+J.map(uZ).join(", ")+")":String(J)}function A8(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++){let Z=J[$],W=Q[$];if(Array.isArray(Z)&&Array.isArray(W)){let K=A8(Z,W);if(K)return K}else if(Z!==W)return Z<W?-1:1}return 0}var wY=["HONEST","AGGRO","TURTLE","PROBER","SANDBAGGER","RUNNER"];function CY(J){let Q={mode:"auto",depth:1,fields_target:9,palisades:!0,unlock_plan:["archer"],unlock_round:3,recruit_priority:["sword","spear","archer","cav","siege"],army_overshoot:0,attack_scope:"any",brace_radius:2,trample:"annex",desperation_round:11,sandbag_until:0,wagon_hunt:!1,avoid_lone:!0,feed_forward_first:!0,rush:!0,rearguard:0,push_margin:1,convert_mult:1.8,breach_round:12,force_push_round:12};if(J==="HONEST")Object.assign(Q,{rearguard:1});else if(J==="AGGRO")Object.assign(Q,{mode:"push",depth:2,fields_target:9,unlock_plan:["cav"],unlock_round:1,recruit_priority:["cav","sword","spear","archer"],army_overshoot:1,trample:"raid",wagon_hunt:!0,palisades:!1,desperation_round:1,brace_radius:1,convert_mult:1.4,breach_round:10,force_push_round:1});else if(J==="TURTLE")Object.assign(Q,{mode:"hold",fields_target:14,unlock_plan:["archer","siege"],unlock_round:2,recruit_priority:["spear","archer","sword","siege"],attack_scope:"own_half",desperation_round:12,feed_forward_first:!1,brace_radius:3,convert_mult:2,force_push_round:14,breach_round:14});else if(J==="PROBER")Object.assign(Q,{mode:"hold",fields_target:11,unlock_plan:["archer"],unlock_round:2,recruit_priority:["spear","archer","sword","cav"],attack_scope:"own_half_superior",desperation_round:11,feed_forward_first:!1,brace_radius:3,convert_mult:1.8,force_push_round:13});else if(J==="SANDBAGGER")Object.assign(Q,{mode:"sandbag",depth:2,fields_target:9,unlock_plan:["cav"],unlock_round:5,recruit_priority:["sword","cav","spear","archer"],trample:"raid",sandbag_until:5,desperation_round:6,wagon_hunt:!0,convert_mult:1.5});else if(J==="RUNNER")Object.assign(Q,{mode:"runner",depth:6,fields_target:6,unlock_plan:["cav"],unlock_round:1,recruit_priority:["cav","sword","spear"],trample:"raid",avoid_lone:!1,desperation_round:99,palisades:!1,convert_mult:99,force_push_round:99});return Q}class o7{name;cfg;seed=0;me=0;_convert=!1;constructor(J){if(!wY.includes(J))throw Error("unknown bot: "+J);this.name=J,this.cfg=CY(J)}reset(J,Q){this.seed=J,this.me=Q,this._convert=!1}clock(J,Q){return this.cfg[Q]+(J.C.GOLDEN_GOAL_ROUND-16)}tb(...J){let Q=`${this.seed}|${this.name}|${this.me}|${J.map(uZ).join("|")}`;return PY(Q)/4294967296}setup(J,Q){let $=Q===0?1:6,Z=[[1,4,6],[0,3,6],[2,4,7],[1,3,5]],W=Z[Math.floor(this.tb("wagons")*Z.length)].slice(),K=3+(this.tb("side")<0.5?0:1),Y=[{arch:"hero",pos:[K,$]},{arch:"spear",pos:[K-1,$]},{arch:"sword",pos:[K+1,$]},{arch:"sword",pos:[K-2,$]}];return{wagons:W,units:Y}}threatenedCols(J,Q){let $=[];for(let Z=0;Z<8;Z++){let[W,K]=J.columnClaims(Z);if(Q===0&&K||Q===1&&W)$.push(Z)}return $}dangerCols(J,Q){let $=[,,,,,,,,].fill(0);for(let Z of J.onBoard(1-Q)){let[W,K]=Z.pos,Y=J.stakes[W],X,H;if(Q===0)X=K<Y,H=Y<=K&&K<=Y+2;else X=K>=Y,H=Y-3<=K&&K<Y;if(X)$[W]+=3;else if(H)$[W]+=1}return $}pickPushCenter(J,Q){let $=null,Z=null,W=J.onBoard(Q);for(let K=0;K<8;K++){let Y=0,X=0;for(let U=Math.max(0,K-1);U<Math.min(8,K+2);U++){let N=U===K?1:0.5;for(let G of J.onBoard(1-Q))if(G.pos[0]===U&&J.territoryOf(G.pos)===1-Q)Y+=N;for(let G of W)if(G.pos[0]===U)X+=0.4*N}let H=-Y+X+0.3*this.tb("pushcol",K);if(Z===null||H>Z)$=K,Z=H}return $}feedOrder(J,Q){let Z=J.onBoard(Q).map((W)=>{let K=qJ(W.pos).some((U)=>{let N=J.board.get(NJ(U));return N!==void 0&&J.units.get(N).owner!==Q}),Y=J.beyondOwn(W),X=this.cfg.feed_forward_first?0:Y?1:0,H=[W.arch==="hero"?0:1,K?0:1,X,-J.costs[W.arch],W.pos];return{uid:W.uid,key:H}});return Z.sort((W,K)=>A8(W.key,K.key)),Z.map((W)=>W.uid)}_projCropIncome(J,Q){return J.computeHarvest(Q,J.round+1)[1]}build(J,Q){let $=this.cfg,Z=J.C,W=[],K=J.res[Q].supply,Y=0;for(let U of J.fields.values())if(U.owner===Q&&U.annexed===null)Y++;let X=0;for(let U of J.units.values())if(U.owner===Q)X++;if($.palisades&&K>=Z.PALISADE_COST+Z.FIELD_COST){let U=this.dangerCols(J,Q),N=[...Array(8).keys()].filter((G)=>!J.palisades.has(G)&&U[G]>=2).sort((G,q)=>A8([-U[G],this.tb("pal",G)],[-U[q],this.tb("pal",q)]));if(N.length)W.push(["palisade",N[0]]),K-=Z.PALISADE_COST}let H=[];while(W.length<Z.BUILD_ACTIONS&&K>=Z.FIELD_COST&&Y<$.fields_target){let G=this._projCropIncome(J,Q)+2*H.filter(([,F])=>F==="crop").length<X+2&&J.round<Z.EXHAUSTION_START_ROUND-2?"crop":"supply",q=this._fieldSpot(J,Q,G,new Set(H.map(([F])=>NJ(F))));if(q===null)break;W.push(["field",q,G]),H.push([q,G]),K-=Z.FIELD_COST,Y++}if($.palisades&&W.length<Z.BUILD_ACTIONS&&K>=Z.PALISADE_COST+4){let U=this.dangerCols(J,Q),N=[...Array(8).keys()].filter((G)=>!J.palisades.has(G)&&U[G]>=1).sort((G,q)=>A8([-U[G],this.tb("pal2",G)],[-U[q],this.tb("pal2",q)]));if(N.length)W.push(["palisade",N[0]])}return W}_fieldSpot(J,Q,$,Z){let W=null,K=null;for(let Y=0;Y<8;Y++)for(let X=0;X<8;X++){let H=[Y,X];if(J.territoryOf(H)!==Q||J.fields.has(NJ(H))||J.wagon_at.has(NJ(H))||Z.has(NJ(H)))continue;let U=0;for(let q of qJ(H)){let F=J.fields.get(NJ(q));if(F&&F.type===$&&F.owner===Q&&F.annexed===null)U++}let N=J.heartlandRows(Q).includes(X)?2:0,G=2*U+N+this.tb("field",H);if(K===null||G>K)W=H,K=G}return W}reinforce(J,Q){let $=this.cfg,Z=J.C,W=J.res[Q],K={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0},Y=W.supply,X=W.tribute,H=0;if($.mode==="sandbag"&&J.round>$.sandbag_until)H=Math.max(0,X-2);else if(J.round>=this.clock(J,"desperation_round")&&X>2)H=X-2;if(K.tribute_spend=H,Y+=H,$.rush){let D=W.crop;for(let O of J.reserve(Q))if(O.wounded_round===J.round-1&&D>J.onBoard(Q).length)K.rush.push(O.uid),D--}let U=J.unlocked[Q],N=$.unlock_plan.filter((D)=>!U.has(D));if(N.length&&J.round>=$.unlock_round){let D=U.size,O={2:Z.UNLOCK_3RD,3:Z.UNLOCK_4TH,4:Z.UNLOCK_5TH}[D]??999;if(Y>=O+3)K.unlocks.push(N[0]),Y-=O}let G=this._projCropIncome(J,Q),q=0;for(let D of J.units.values())if(D.owner===Q)q++;let F=Z.DEPLOY_MAX+J.extra_deploy[Q],R=new Set;for(let D=0;D<F;D++){let O=Math.max(4,G+Math.floor(W.crop/6)+$.army_overshoot);if(q+1>O)break;let V=null;for(let A of $.recruit_priority){if(!U.has(A)&&!K.unlocks.includes(A))continue;if(J.copies[A]>=Z.MUSTER_COPIES)continue;let P=J.costs[A]+Z.COPY_SURCHARGE*J.copies[A];if(J.recruit_discount[Q])P=Math.max(1,P-J.recruit_discount[Q]);if(Y>=P){V=A,Y-=P;break}}if(V===null)break;let z=this._deploySpot(J,Q,R);if(z===null)break;R.add(NJ(z)),K.recruits.push([V,z]),q++}let B=this.threatenedCols(J,Q),E=new Set;for(let D of B.slice(0,Z.REPOSITION_MAX)){let O=this._spareBlocker(J,Q,D,E);if(O===null)continue;let V=this._blockTile(J,Q,D);if(V===null)continue;E.add(O.uid),K.repositions.push([O.uid,V])}if(K.repositions.length<Z.REPOSITION_MAX&&($.mode==="push"||$.mode==="sandbag"||this._convert||J.round>=this.clock(J,"force_push_round"))){let D=this.pickPushCenter(J,Q);for(let O of J.onBoard(Q)){if(K.repositions.length>=Z.REPOSITION_MAX)break;if(E.has(O.uid)||J.beyondOwn(O)||O.arch==="siege")continue;if(qJ(O.pos).some((A)=>{let P=J.board.get(NJ(A));return P!==void 0&&J.units.get(P).owner!==Q})||Math.abs(O.pos[0]-D)<=1)continue;if(!(Q===0?O.pos[1]<=1:O.pos[1]>=6))continue;for(let A of[D,D-1,D+1]){if(A<0||A>=8)continue;let P=this._blockTile(J,Q,A);if(P!==null){E.add(O.uid),K.repositions.push([O.uid,P]);break}}}}return K}_deploySpot(J,Q,$){let Z=J.heartlandRows(Q),W=Q===0?Z[1]:Z[0],K=null;if(this.cfg.mode==="push"||this.cfg.mode==="runner"||this.cfg.mode==="auto")K=this.pickPushCenter(J,Q);let Y=this.threatenedCols(J,Q);if(Y.length)K=Y[0];let X=null,H=null,U=[W,Q===0?Z[0]:Z[1]];for(let N=0;N<8;N++)for(let G of U){let q=[N,G];if(J.occupied(q)||$.has(NJ(q)))continue;let F=-Math.abs(N-(K!==null?K:3))+(G===W?1:0)+this.tb("deploy",q);if(H===null||F>H)X=q,H=F}return X}_spareBlocker(J,Q,$,Z){let W=[];for(let K of J.onBoard(Q)){if(Z.has(K.uid)||K.arch==="hero"||J.beyondOwn(K))continue;if(qJ(K.pos).some((N)=>{let G=J.board.get(NJ(N));return G!==void 0&&J.units.get(G).owner!==Q}))continue;let X=K.pos[0],H=0;for(let N of J.onBoard(Q))if(N.uid!==K.uid&&N.pos[0]===X&&!J.beyondOwn(N))H++;if(J.onBoard(1-Q).some((N)=>N.pos[0]===X)&&H===0)continue;W.push(K)}if(!W.length)return null;return W.sort((K,Y)=>A8([J.costs[K.arch],Math.abs(K.pos[0]-$),this.tb("blk",K.uid)],[J.costs[Y.arch],Math.abs(Y.pos[0]-$),this.tb("blk",Y.uid)])),W[0]}_blockTile(J,Q,$){let Z=J.stakes[$],W=Q===0?[...Array(Z).keys()].reverse():[...Array(8-Z).keys()].map((K)=>K+Z);for(let K of W){let Y=[$,K];if(!J.occupied(Y))return Y}return null}standardBearer(J,Q){return null}dirn(J){return J===0?1:-1}ownFrontRow(J,Q,$){let Z=J.stakes[$];return Q===0?Z-1:Z}firstBeyondRow(J,Q,$){let Z=J.stakes[$];return Q===0?Z:Z-1}stakeAtMax(J,Q,$){let Z=J.stakes[$];return Q===0?Z===J.C.STAKE_MAX:Z===J.C.STAKE_MIN}behind(J,Q){let $=1-Q,Z=J.wagonsAlive(Q),W=J.wagonsAlive($);if(Z!==W)return Z<W;let K=J.wagonHp(Q),Y=J.wagonHp($);if(K!==Y)return K<Y;return J.ownedRows(Q)<J.ownedRows($)}pushCols(J,Q){let $=this.pickPushCenter(J,Q);return[$-1,$,$+1].filter((Z)=>Z>=0&&Z<8)}plan(J,Q){let $=this.cfg,Z=$.mode,W=0,K=0;for(let H of J.onBoard(Q))W+=J.costs[H.arch]+H.hp;for(let H of J.onBoard(1-Q))K+=J.costs[H.arch]+H.hp;let Y=W>=$.convert_mult*Math.max(1,K);if(Z==="sandbag"&&J.round>$.sandbag_until)Z="push";if((Z==="auto"||Z==="hold")&&J.round>=this.clock(J,"desperation_round")&&this.behind(J,Q))Z="push";if((Z==="auto"||Z==="hold")&&J.round>=this.clock(J,"force_push_round"))Z="push";if(Y&&Z!=="runner")Z="push";if(Z==="auto")Z=W>=$.push_margin*K?"push":"hold";this._convert=Y;let X={mode:Z,convert:Y,threats:this.threatenedCols(J,Q)};if(Z==="push"||Z==="runner"){X.push_cols=this.pushCols(J,Q);let H=J.wagons[1-Q].filter((U)=>U.hp>0);if(H.length){let U=X.push_cols[Math.floor(X.push_cols.length/2)];X.wagon_target=NQ(H,(N)=>[Math.abs(N.col-U),N.col]).col}}return X}orders(J,Q,$){let Z=this.plan(J,Q),W={},K=this._assignDefenders(J,Q,Z),Y={};for(let X of J.onBoard(Q))W[X.uid]=this._unitOrder(J,Q,X,Z,K,Y);return W}_assignDefenders(J,Q,$){let Z={},W=new Set;for(let K of $.threats){let Y=null,X=null;for(let H of J.onBoard(Q)){if(W.has(H.uid)||J.beyondOwn(H))continue;let U=Math.abs(H.pos[0]-K)+0.1*J.costs[H.arch];if(X===null||U<X)Y=H,X=U}if(Y!==null&&X!==null&&X<=3.5)Z[Y.uid]=K,W.add(Y.uid)}if(this.cfg.rearguard&&$.mode==="push"){let K=0;for(let H of J.onBoard(1-Q))if(J.territoryOf(H.pos)===1-Q)K++;let Y=[...new Set(J.wagons[Q].filter((H)=>H.hp>0).map((H)=>H.col))].sort((H,U)=>H-U),X=Math.min(this.cfg.rearguard,Math.floor(K/2),Y.length);for(let H of Y){if(X<=0)break;if(Object.values(Z).includes(H))continue;let U=null,N=null;for(let G of J.onBoard(Q)){if(W.has(G.uid)||J.beyondOwn(G))continue;let q=Math.abs(G.pos[0]-H)+0.1*J.costs[G.arch];if(N===null||q<N)U=G,N=q}if(U!==null)Z[U.uid]=H,W.add(U.uid),X--}}return Z}_targetScore(J,Q,$,Z,W=!1){let K=J.attackDamage($,Z,W,!W);return(K>=Z.hp?10:0)+2*(GQ[$.arch]===Z.arch?1:0)+(6-Z.hp)*0.5+K+(Z.uid===(J.standard_bearer[1-Q]??-1)?3:0)+(Z.arch==="hero"?2:0)+this.tb("tgt",$.uid,Z.uid)}_attackAllowed(J,Q,$){let Z=this.cfg.attack_scope;if(this._convert)Z="any";if(Z==="any")return!0;let W=J.territoryOf($.pos)===Q;if(Z==="own_half")return W;if(Z==="own_half_superior"){if(!W)return!1;let K=0,Y=0;for(let X of J.onBoard(Q))if(s0(X.pos,$.pos)<=2)K++;for(let X of J.onBoard(1-Q))if(s0(X.pos,$.pos)<=2)Y++;return K>=Y+1}return!0}bfs(J,Q,$){if($<=0)return new Map([[NJ(Q.pos),[]]]);let Z=new Set;for(let Y of J.onBoard(1-Q.owner))for(let X of qJ(Y.pos))Z.add(NJ(X));let W=new Map([[NJ(Q.pos),[]]]),K=[[Q.pos,[]]];for(let Y=0;Y<$;Y++){let X=[];for(let[H,U]of K){if(NJ(H)!==NJ(Q.pos)&&Z.has(NJ(H)))continue;for(let N of qJ(H)){if(W.has(NJ(N))||J.occupied(N))continue;let G=[...U,N];W.set(NJ(N),G),X.push([N,G])}}K=X}return W}_unitOrder(J,Q,$,Z,W,K){let Y=this.cfg,X=[];for(let N of qJ($.pos)){let G=J.board.get(NJ(N));if(G!==void 0&&J.units.get(G).owner!==Q)X.push(J.units.get(G))}if($.arch==="siege")return this._siegeOrder(J,Q,$,Z);if($.arch==="archer"){let N=J.onBoard(1-Q).filter((G)=>s0($.pos,G.pos)===2&&this._attackAllowed(J,Q,G));if(N.length)return["SHOOT",["U",s7(N,(G)=>this._targetScore(J,Q,$,G)).uid]];if(X.length){let G=s7(X,(q)=>this._targetScore(J,Q,$,q));if(this._attackAllowed(J,Q,G))return["MELEE",G.uid,[]]}return this._moveOrder(J,Q,$,Z,W,K,2)}if($.arch==="cav"&&!$.exhausted){let N=this._findCharge(J,Q,$);if(N!==null)return N}if(X.length){let N=X.filter((G)=>this._attackAllowed(J,Q,G));if(N.length)return["MELEE",s7(N,(G)=>this._targetScore(J,Q,$,G)).uid,[]]}let H=this.bfs(J,$,$.mv),U=null;for(let N of J.onBoard(1-Q)){if(!this._attackAllowed(J,Q,N))continue;for(let G of qJ(N.pos)){if(NJ(G)===NJ($.pos))continue;let q=H.get(NJ(G));if(q!==void 0){let F=this._targetScore(J,Q,$,N)-0.3*q.length;if(N.arch==="spear"&&N.braced&&$.arch==="cav")F-=6;if(U===null||F>U[0])U=[F,N,q]}}}if(U!==null&&U[0]>1.5)return["MELEE",U[1].uid,U[2]];if($.arch==="spear"&&!$.exhausted){let N=J.onBoard(1-Q).some((q)=>s0($.pos,q.pos)<=Y.brace_radius),G=Z.mode==="hold"||!J.beyondOwn($);if(N&&G&&!($.uid in W))return["BRACE"]}return this._moveOrder(J,Q,$,Z,W,K,0,H)}_findCharge(J,Q,$){let Z=this.bfs(J,$,$.mv),W=null;for(let K of J.onBoard(1-Q)){if(!this._attackAllowed(J,Q,K))continue;if(K.arch==="spear"&&K.braced)continue;if(J.terrain_on&&J.ttype.get(NJ(K.pos))==="woods")continue;for(let Y of qJ(K.pos)){let X=Z.get(NJ(Y));if(X===void 0||X.length<J.C.CHARGE_MOVE_MIN)continue;let H=this._targetScore(J,Q,$,K,!0)-0.2*X.length;if(W===null||H>W[0])W=[H,K,X]}}if(W!==null&&W[0]>2)return["CHARGE",W[1].uid,W[2]];return null}_siegeOrder(J,Q,$,Z){let W=this.cfg;if(Z.mode==="push"){for(let Y of Z.push_cols??[])if(J.palisades.get(Y)===1-Q){let X=J.stakes[Y];if([[Y,X-1],[Y,X]].some((H)=>$.rmin<=s0($.pos,H)&&s0($.pos,H)<=$.rmax))return["SHOOT",["P",Y]]}}if((W.wagon_hunt||Z.convert)&&J.capRemaining(Q)>0)for(let Y=0;Y<J.wagons[1-Q].length;Y++){let X=J.wagons[1-Q][Y];if(X.hp<=0)continue;let H=[X.col,J.backRow(1-Q)];if($.rmin<=s0($.pos,H)&&s0($.pos,H)<=$.rmax)return["SHOOT",["W",1-Q,Y]]}let K=J.onBoard(1-Q).filter((Y)=>$.rmin<=s0($.pos,Y.pos)&&s0($.pos,Y.pos)<=$.rmax&&this._attackAllowed(J,Q,Y));if(K.length)return["SHOOT",["U",s7(K,(Y)=>this._targetScore(J,Q,$,Y)).uid]];return this._moveOrder(J,Q,$,Z,{},{},2)}_moveOrder(J,Q,$,Z,W,K,Y=0,X){let H=this.cfg,U=this._goalTile(J,Q,$,Z,W,K);if(U===null)return["HOLD"];if(X===void 0)X=this.bfs(J,$,$.mv);let N=J.onBoard(1-Q),G=null,q=null;for(let[F,R]of X){let B=F.split(",").map(Number),D=-s0(B,U);if(Y&&N.length){let O=Math.min(...N.map((V)=>s0(B,V.pos)));if(O<Y)D-=(Y-O)*2}if(H.avoid_lone&&J.territoryOf(B)!==Q){if(!J.onBoard(Q).some((V)=>V.uid!==$.uid&&V.owner===Q&&s0(V.pos,B)<=J.C.LONE_RUNNER_RADIUS))D-=4}if(D+=0.1*this.tb("mv",$.uid,B),q===null||D>q)G=[B,R],q=D}if(G===null||!G[1].length)return["HOLD"];return["MOVE",G[1]]}_goalTile(J,Q,$,Z,W,K){let Y=this.cfg;if($.uid in W){let G=W[$.uid];return[G,this.ownFrontRow(J,Q,G)]}let X=Z.mode;if(X==="sandbag"){let G=[...new Set(J.wagons[Q].filter((F)=>F.hp>0).map((F)=>F.col))].sort((F,R)=>F-R);if(!G.length)G=[3];let q=i7(G,(F)=>Math.abs(F-$.pos[0]));return[q,this.ownFrontRow(J,Q,q)]}if(X==="runner"&&$.arch==="cav")return[i7([...Array(8).keys()],(q)=>J.onBoard(1-Q).filter((F)=>F.pos[0]===q).length+0.1*this.tb("run",$.uid,q)),J.backRow(1-Q)];if(X==="push"||X==="runner"){let G=Z.push_cols&&Z.push_cols.length?Z.push_cols:[3,4],q=i7(G,(B)=>Math.abs(B-$.pos[0])+0.7*(K[String(B)]??0));if(K[String(q)]=(K[String(q)]??0)+1,Z.convert||J.round>=this.clock(J,"breach_round")||this.stakeAtMax(J,Q,q)){let B=Z.wagon_target;if(B!==void 0&&B!==null){let E=K.breach??0;K.breach=E+1;let D=[0,1,-1,0,1,-1,2,-2][E%8],O=Math.max(0,Math.min(7,B+D)),V=J.backRow(1-Q)-this.dirn(Q);return[O,V]}return[q,J.backRow(1-Q)]}let F=Y.depth,R=this.firstBeyondRow(J,Q,q)+(F-1)*this.dirn(Q);return R=Math.max(0,Math.min(7,R)),[q,R]}let H=this.dangerCols(J,Q),U=[...Array(8).keys()].filter((G)=>H[G]>0);if(!U.length)U=[$.pos[0]];let N=i7(U,(G)=>Math.abs(G-$.pos[0])+0.7*(K[String(G)]??0));return K[String(N)]=(K[String(N)]??0)+1,[N,this.ownFrontRow(J,Q,N)]}intervention(J,Q,$){let Z=J.C,W=J.res[Q].tribute;if($<=2&&W>=Z.SHIELDBEARER_COST){let K=J.standardUnit(Q);if(K!==null&&K.hp<=4){let Y=0;for(let H of qJ(K.pos)){let U=J.board.get(NJ(H));if(U!==void 0&&J.units.get(U).owner!==Q)Y++}let X=qJ(K.pos).some((H)=>{let U=J.board.get(NJ(H));if(U===void 0)return!1;let N=J.units.get(U);return N.owner===Q&&(N.arch==="spear"||N.arch==="sword")});if(Y>=2&&X&&!J.wards.some((H)=>H.uid===K.uid&&H.active))return["SHIELDBEARER",K.uid]}}if($===3&&W>=Z.SURGE_COST){for(let K of this.threatenedCols(J,Q))for(let Y of J.onBoard(Q)){if(!J.unbroken(Y))continue;for(let X of qJ(Y.pos)){if(J.occupied(X)||!T9(X))continue;if(X[0]===K&&J.territoryOf(X)===Q)return["SURGE",Y.uid,X]}}for(let K=0;K<8;K++){let[Y,X]=J.columnClaims(K);if(Q===0?Y:X)continue;let U=!0;for(let N of J.onBoard(1-Q))if(N.pos[0]===K&&J.territoryOf(N.pos)===1-Q&&J.unbroken(N)){U=!1;break}if(!U)continue;for(let N of J.onBoard(Q)){if(N.exhausted||J.beyondOwn(N))continue;for(let G of qJ(N.pos)){if(J.occupied(G))continue;if(G[0]===K&&J.territoryOf(G)!==Q){if(J.onBoard(Q).some((F)=>F.uid!==N.uid&&F.owner===Q&&s0(F.pos,G)<=J.C.LONE_RUNNER_RADIUS))return["SURGE",N.uid,G]}}}}}return null}trampleChoice(J,Q,$,Z){if(this.cfg.trample==="raid")return"raid";if(this.cfg.trample==="annex"){if(Z.type==="crop"&&J.round>=J.C.EXHAUSTION_START_ROUND-2)return"raid";return"annex"}return"raid"}lastStand(J,Q){if(J.reserve(Q).length>=2)return 1;if(this.cfg.mode==="hold")return 3;return 2}entrenchCols(J,Q){let $=this.dangerCols(J,Q);return[...Array(8).keys()].filter((Z)=>!J.palisades.has(Z)).sort((Z,W)=>A8([-$[Z],this.tb("ent",Z)],[-$[W],this.tb("ent",W)]))}promoT2(J,Q,$){return $.arch==="spear"||$.arch==="hero"?"guard":"atk"}breachTarget(J,Q,$,Z){return NQ(Z,(W)=>[W[1].hp,W[1].col])[0]}artifactPick(J,Q,$){let Z=this._projCropIncome(J,Q)<J.onBoard(Q).length,W=this.cfg.mode,K;if(W==="push"||W==="runner"||W==="sandbag")K=Z?[2,1,4,7,6,3,8,5]:[1,4,7,3,6,2,8,5];else K=Z?[2,8,5,1,3,6,4,7]:[8,5,1,3,2,6,4,7];for(let Y of K)if($.includes(Y))return Y;return $[0]}routAllocate(J,Q,$,Z){let W=new Map;J.wagons[$].forEach((Y,X)=>{if(Y.hp>0)W.set(X,Y.hp)});let K=[];for(let Y=0;Y<Z;Y++){if(!W.size)break;let X=NQ([...W.keys()],(H)=>[W.get(H),H]);if(K.push(X),W.set(X,W.get(X)-1),W.get(X)<=0)W.delete(X)}return K}}function cZ(J){return new o7(J)}var TY={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0};class qQ extends o7{label;pendingFeed=null;pendingBuild=null;pendingReinforce=null;pendingSB=null;pendingOrders={};pendingIntervention={};tramplePref="annex";constructor(J="You"){super("HONEST");this.label=J}feedOrder(J,Q){return this.pendingFeed??super.feedOrder(J,Q)}build(J,Q){return this.pendingBuild??[]}reinforce(J,Q){return this.pendingReinforce??{...TY}}standardBearer(J,Q){return this.pendingSB}orders(J,Q,$){return this.pendingOrders[$]??{}}intervention(J,Q,$){return this.pendingIntervention[$]??null}trampleChoice(J,Q,$,Z){if(this.tramplePref==="raid")return"raid";if(Z.type==="crop"&&J.round>=J.C.EXHAUSTION_START_ROUND-2)return"raid";return"annex"}clearPhase(){this.pendingFeed=null,this.pendingBuild=null,this.pendingReinforce=null,this.pendingSB=null,this.pendingOrders={},this.pendingIntervention={}}}var V9=(J)=>`${J[0]},${J[1]}`;function SY(J,Q,$){if($<=0)return new Map([[V9(Q.pos),[]]]);let Z=new Set;for(let Y of J.onBoard(1-Q.owner))for(let X of qJ(Y.pos))Z.add(V9(X));let W=new Map([[V9(Q.pos),[]]]),K=[[Q.pos,[]]];for(let Y=0;Y<$;Y++){let X=[];for(let[H,U]of K){if(V9(H)!==V9(Q.pos)&&Z.has(V9(H)))continue;for(let N of qJ(H)){if(W.has(V9(N))||J.occupied(N))continue;let G=[...U,N];W.set(V9(N),G),X.push([N,G])}}K=X}return W}function X7(J,Q){let $=Q.braced?0:Q.mv,Z=SY(J,Q,$),W=new Map;for(let[H,U]of Z)if(U.length)W.set(H,U);let K=[],Y=[],X=[];if(Q.arch==="archer"||Q.arch==="siege"){for(let H of J.onBoard(1-Q.owner))if(Q.rmin<=s0(Q.pos,H.pos)&&s0(Q.pos,H.pos)<=Q.rmax)X.push(H.uid)}if(Q.arch!=="siege")for(let H of J.onBoard(1-Q.owner)){if(s0(Q.pos,H.pos)===1){K.push({uid:H.uid,path:[]});continue}let U=null;for(let N of qJ(H.pos)){let G=Z.get(V9(N));if(G&&(U===null||G.length<U.length))U=G}if(U)K.push({uid:H.uid,path:U})}if(Q.arch==="cav"&&!Q.exhausted)for(let H of J.onBoard(1-Q.owner)){if(H.arch==="spear"&&H.braced)continue;let U=null;for(let N of qJ(H.pos)){let G=Z.get(V9(N));if(G&&G.length>=J.C.CHARGE_MOVE_MIN&&(U===null||G.length<U.length))U=G}if(U)Y.push({uid:H.uid,path:U})}return{moves:W,meleeTargets:K,shootTargets:X,chargeTargets:Y,canBrace:Q.arch==="spear"&&!Q.braced}}var a7=["egyptian","gaul","hun","persian","roman","spartan","teuton","viking"],r7={egyptian_archer:"../art/renders/limes_roster_28_egyptian_archer_00001_.png",egyptian_cav:"../art/renders/limes_roster_27_egyptian_cavalry_00001_.png",egyptian_hero:"../art/renders/limes_roster_30_egyptian_hero_high_priest_sebek_00001_.png",egyptian_siege:"../art/renders/limes_roster_29_egyptian_siege_00001_.png",egyptian_spear:"../art/renders/limes_roster_25_egyptian_spearman_00001_.png",egyptian_sword:"../art/renders/limes_roster_26_egyptian_swordsman_00001_.png",gaul_archer:"../art/renders/limes_roster_10_gaul_archer_00001_.png",gaul_cav:"../art/renders/limes_roster_09_gaul_cavalry_00001_.png",gaul_hero:"../art/renders/limes_roster_12_gaul_hero_druidess_eponia_00001_.png",gaul_siege:"../art/renders/limes_roster_11_gaul_siege_00001_.png",gaul_spear:"../art/renders/limes_roster_07_gaul_spearman_00001_.png",gaul_sword:"../art/renders/limes_roster_08_gaul_swordsman_00001_.png",hun_archer:"../art/renders/limes_roster_22_hun_archer_00001_.png",hun_cav:"../art/renders/limes_roster_21_hun_cavalry_00001_.png",hun_hero:"../art/renders/limes_roster_24_hun_hero_khan_bayan_00001_.png",hun_siege:"../art/renders/limes_roster_23_hun_siege_00001_.png",hun_spear:"../art/renders/limes_roster_19_hun_spearman_00001_.png",hun_sword:"../art/renders/limes_roster_20_hun_swordsman_00001_.png",persian_archer:"../art/renders/limes_roster_46_persian_archer_00001_.png",persian_cav:"../art/renders/limes_roster_45_persian_cavalry_00001_.png",persian_hero:"../art/renders/limes_roster_48_persian_hero_satrap_darius_00001_.png",persian_siege:"../art/renders/limes_roster_47_persian_siege_00001_.png",persian_spear:"../art/renders/limes_roster_43_persian_spearman_00001_.png",persian_sword:"../art/renders/limes_roster_44_persian_swordsman_00001_.png",roman_archer:"../art/renders/limes_roster_04_roman_archer_00001_.png",roman_cav:"../art/renders/limes_roster_03_roman_cavalry_00001_.png",roman_hero:"../art/renders/limes_roster_06_roman_hero_legatus_marcus_00001_.png",roman_siege:"../art/renders/limes_roster_05_roman_siege_00001_.png",roman_spear:"../art/renders/limes_roster_01_roman_spearman_00001_.png",roman_sword:"../art/renders/limes_roster_02_roman_swordsman_00001_.png",spartan_archer:"../art/renders/limes_roster_40_spartan_archer_00001_.png",spartan_cav:"../art/renders/limes_roster_39_spartan_cavalry_00001_.png",spartan_hero:"../art/renders/limes_roster_42_spartan_hero_king_leonis_00001_.png",spartan_siege:"../art/renders/limes_roster_41_spartan_siege_00001_.png",spartan_spear:"../art/renders/limes_roster_37_spartan_spearman_00001_.png",spartan_sword:"../art/renders/limes_roster_38_spartan_swordsman_00001_.png",teuton_archer:"../art/renders/limes_roster_16_teuton_archer_00001_.png",teuton_cav:"../art/renders/limes_roster_15_teuton_cavalry_00001_.png",teuton_hero:"../art/renders/limes_roster_18_teuton_hero_warlord_drengr_00001_.png",teuton_siege:"../art/renders/limes_roster_17_teuton_siege_00001_.png",teuton_spear:"../art/renders/limes_roster_13_teuton_spearman_00001_.png",teuton_sword:"../art/renders/limes_roster_14_teuton_swordsman_00001_.png",viking_archer:"../art/renders/limes_roster_34_viking_archer_00001_.png",viking_cav:"../art/renders/limes_roster_33_viking_cavalry_00001_.png",viking_hero:"../art/renders/limes_roster_36_viking_hero_jarl_sigrid_00001_.png",viking_siege:"../art/renders/limes_roster_35_viking_siege_00001_.png",viking_spear:"../art/renders/limes_roster_31_viking_spearman_00001_.png",viking_sword:"../art/renders/limes_roster_32_viking_swordsman_00001_.png"};var aJ={spear:"Spearman",sword:"Swordsman",cav:"Cavalry",archer:"Archer",siege:"Siege",hero:"Hero"},t7={roman:"#a32638",spartan:"#c4622d",hun:"#d9a418",gaul:"#3e7a3a",egyptian:"#2aa198",viking:"#2b4f81",persian:"#5b3a8e",teuton:"#6e7378"},jY={p0tribe:"roman",p1tribe:"viking"},P8=(J)=>J.replace(/[&<>"]/g,(Q)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[Q]),nZ=(J)=>J.charAt(0).toUpperCase()+J.slice(1);function yY(J,Q,$){let Z=r7[`${$}_${Q.arch}`]??"",W=Math.max(0,Math.round(Q.hp/Q.max_hp*100)),K=Q.tier2?"★★":Q.tier1?"★":"",Y=[Q.exhausted?'<span class="flag ex" title="Exhausted">∅</span>':"",Q.braced?'<span class="flag br" title="Braced">⛨</span>':"",Q.face_down?'<span class="flag fd" title="Face-down">?</span>':""].join(""),X=Z?`<img class="billboard" src="${P8(Z)}" alt="${P8(aJ[Q.arch])}" loading="lazy">`:`<div class="billboard noimg">${P8(aJ[Q.arch][0])}</div>`;return`<div class="unit owner${Q.owner}" style="--c:${t7[$]}">
    ${X}
    <div class="hpbar"><i style="width:${W}%"></i></div>
    <div class="ulabel">${P8(aJ[Q.arch])}<span class="hp">${Q.hp}/${Q.max_hp}</span></div>
    ${K?`<span class="tier">${K}</span>`:""}
    ${Y?`<div class="flags">${Y}</div>`:""}
  </div>`}function fY(J,Q,$,Z){return`<div class="wagon owner${J}" style="--c:${t7[Z]}" title="Supply Wagon">
    <div class="wgicon">▣</div><div class="wghp">${Q}/${$}</div></div>`}function vY(J){let Q=J.annexed!==null?J.annexed:J.owner,$=J.type==="crop"?"\uD83C\uDF3E":"⛏";return`<div class="field f-owner${Q}${J.annexed!==null?" annexed":""}" title="${P8(J.type)} field">${$}</div>`}function FQ(J,Q={}){let $={...jY,...Q},Z=(H)=>H===0?$.p0tribe:$.p1tribe,W=new Map;for(let H of J.units.values())if(H.pos)W.set(`${H.pos[0]},${H.pos[1]}`,H);let K=new Map;for(let H=0;H<2;H++)for(let U of J.wagons[H])K.set(`${U.col},${U.row}`,{p:H,hp:U.hp});let Y=[];for(let H=7;H>=0;H--)for(let U=0;U<8;U++){let N=`${U},${H}`,G=H<J.stakes[U]?0:1,q=H===J.stakes[U]-1,F=J.palisades.get(U),R=q&&F!==void 0,B=["cell",`terr${G}`,q?"stakeline":"",R?"has-pal":""].filter(Boolean).join(" "),E="",D=W.get(N),O=K.get(N),V=J.fields.get(N),z=`data-pos="${N}"`;if(D)E=yY(J,D,Z(D.owner)),z+=` data-uid="${D.uid}" data-owner="${D.owner}"`;else if(O)E=fY(O.p,O.hp,J.C.WAGON_HP,Z(O.p));else if(V)E=vY(V);let A=R?`<span class="pal owner${F}" style="--c:${t7[Z(F)]}" title="Palisade"></span>`:"";Y.push(`<div class="${B}" ${z}>${A}${E}</div>`)}let X=(H)=>{let U=Z(H),N=J.res[H];return`<div class="side owner${H}" style="--c:${t7[U]}">
      <div class="stitle">P${H+1} · ${P8(U[0].toUpperCase()+U.slice(1))}${J.komi===H?' <span class="komi" title="Komi holder">⚖</span>':""}</div>
      <div class="stats">
        <span title="Supply">\uD83D\uDEE1 ${N.supply}</span><span title="Crop">\uD83C\uDF3E ${N.crop}</span>
        <span title="Tribute">◆ ${N.tribute}</span><span title="Owned rows">▦ ${J.ownedRows(H)}</span>
        <span title="Wagons alive">▣ ${J.wagonsAlive(H)}/${J.wagons[H].length}</span>
      </div></div>`};return`<div class="hud">
    <div class="round">Round ${J.round}</div>
    ${X(1)}${X(0)}
  </div>
  <div class="board-grid">${Y.join("")}</div>`}function H7(){if(document.getElementById("guide-ov"))return;let J=document.createElement("div");J.id="guide-ov",J.className="overlay",J.innerHTML=`<div class="modal guide"><button class="modal-x" id="guide-x">✕</button>${`
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
<p>Lose rows → gain <b>Tribute (◆)</b>. Spend it during Clash on <b>Surge</b> (move one of your own units 1 tile to an empty square) or
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

<h3>⑪ Artifacts — the Caravan (rounds 4 &amp; 8)</h3>
<p>Twice a match a <b>Caravan</b> arrives and each side <b>drafts one Artifact</b> — a free, one-time boost. The side that's <b>behind picks first</b>, so losing ground has a silver lining. The 8 in the pool:</p>
<table class="g-table">
  <tr><th>Artifact</th><th>Effect</th><th>Take it when…</th></tr>
  <tr><td>\uD83D\uDEE1 Supply Cache</td><td>+4 Supply now</td><td>You want a big build/recruit this Muster</td></tr>
  <tr><td>\uD83C\uDF3E Granary</td><td>+4 Crop now</td><td>Your army is outgrowing its food</td></tr>
  <tr><td>\uD83D\uDEE1 Hero's Aegis</td><td>+1 Guard to your Hero (permanent)</td><td>Your Hero leads the push / rout risk</td></tr>
  <tr><td>⭐ Veteran's Mark</td><td>+2 XP to your strongest unit</td><td>A unit is one step from ★ or ★★</td></tr>
  <tr><td>\uD83E\uDEB5 Palisade</td><td>Free wall on a key column</td><td>Sealing a flank you can't hold</td></tr>
  <tr><td>◆ War Chest</td><td>+2 Tribute</td><td>You want clutch Surge / Shieldbearer plays</td></tr>
  <tr><td>\uD83C\uDFF7 Levy</td><td>Next recruits cost less</td><td>You're about to mass units</td></tr>
  <tr><td>\uD83C\uDF31 Homestead</td><td>Auto-builds a crop/supply field</td><td>Safe, always-useful economy pick</td></tr>
</table>
<p><b>Drafting tips:</b></p>
<ul>
  <li><b>Pick to your plan, not the flashiest.</b> Attacking next round? Take Supply or Levy for more troops. Grinding it out? Granary or Homestead compounds every round after.</li>
  <li><b>Veteran's Mark snowballs</b> — a unit at XP 1 (→★ at 2) or XP 3 (→★★ at 4) promotes <i>instantly</i>. Best on an Archer/Siege that wounds from range without taking hits.</li>
  <li><b>Hero's Aegis</b> if your Hero spearheads — +1 Guard softens every hit it takes and lowers rout risk.</li>
  <li><b>Behind on the board? You choose first</b> — grab the single best piece before the leader can.</li>
  <li><b>Round 8 &gt; round 4 for tempo</b> — the match is later, so favour immediate impact (Supply / XP / Aegis) over slow economy.</li>
</ul>

<h3>⑫ Glossary</h3>
<ul>
  <li><b>Stake / frontier:</b> a column's border row. Carry a column uncontested to step it toward the enemy.</li>
  <li><b>Carry vs contest:</b> a unit past the line with a nearby friend "carries" (pushes); an enemy unit there "contests" (cancels the push).</li>
  <li><b>Breach:</b> a unit reaching the enemy's back rows damages a Supply Wagon in the Frontier phase.</li>
  <li><b>Rout:</b> your standard (Hero) surrounded → automatic wagon damage to you.</li>
  <li><b>Komi:</b> the first-move / tie-break token; it flips to whoever lost more ground that round.</li>
  <li><b>Caravan:</b> on rounds 4 & 8, both sides draft Artifacts (one-time boosts); the trailing side picks first.</li>
</ul>`}</div>`,document.body.appendChild(J),J.addEventListener("click",(Q)=>{if(Q.target===J)sZ()}),document.getElementById("guide-x").addEventListener("click",sZ)}function sZ(){document.getElementById("guide-ov")?.remove()}function DQ(){return'<button class="pbtn guide-btn" id="open-guide">❓ Guide</button>'}function EQ(J=document){J.querySelector("#open-guide")?.addEventListener("click",H7)}var VW="184",a9={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},r9={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},LW=0,pQ=1,BW=2;var V7=1,k6=2,o8=3,a8=0,dJ=1,uJ=2,B9=0,L7=1,B7=2,mQ=3,lQ=4,zW=5;var r8=100,kW=101,IW=102,AW=103,PW=104,wW=200,CW=201,TW=202,SW=203,jW=204,yW=205,fW=206,vW=207,hW=208,xW=209,bW=210,gW=211,pW=212,mW=213,lW=214,dW=0,uW=1,cW=2,dQ=3,nW=4,sW=5,iW=6,oW=7,aW=0,rW=1,tW=2,E9=0,uQ=1,cQ=2,nQ=3,sQ=4,iQ=5,oQ=6,aQ=7;var t8=301,G8=302,I6=303,A6=304,z7=306,eW=1000,P6=1001,JK=1002,t9=1003,QK=1004;var k7=1005;var cJ=1006,w6=1007;var N8=1008;var R9=1009,$K=1010,ZK=1011,I7=1012,rQ=1013,e9=1014,g9=1015,p9=1016,tQ=1017,eQ=1018,e8=1020,WK=35902,KK=35899,YK=1021,XK=1022,z9=1023,q8=1026,F8=1027,HK=1028,J$=1029,D8=1030,Q$=1031;var $$=1033,C6=33776,T6=33777,S6=33778,j6=33779,Z$=35840,W$=35841,K$=35842,Y$=35843,X$=36196,H$=37492,U$=37496,G$=37488,N$=37489,y6=37490,q$=37491,F$=37808,D$=37809,E$=37810,R$=37811,O$=37812,M$=37813,_$=37814,V$=37815,L$=37816,B$=37817,z$=37818,k$=37819,I$=37820,A$=37821,P$=36492,w$=36494,C$=36495,T$=36283,S$=36284,f6=36285,j$=36286;var y$=0,UK=1,E8="",A7="srgb",f$="srgb-linear",v$="linear",HJ="srgb";var GK=512,NK=513,qK=514,v6=515,FK=516,DK=517,h6=518,EK=519;var h$="300 es",x$=2000;function hY(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function xY(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function n8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function RK(){let J=n8("canvas");return J.style.display="block",J}var iZ={},s8=null;function M7(...J){let Q="THREE."+J.shift();if(s8)s8("log",Q,...J);else console.log(Q,...J)}function OK(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function A0(...J){J=OK(J);let Q="THREE."+J.shift();if(s8)s8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function C0(...J){J=OK(J);let Q="THREE."+J.shift();if(s8)s8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function z6(...J){let Q=J.join(" ");if(Q in iZ)return;iZ[Q]=!0,A0(...J)}function MK(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}var _K={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class k9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}var vJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oZ=1234567,R7=Math.PI/180,i8=180/Math.PI;function h9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(vJ[J&255]+vJ[J>>8&255]+vJ[J>>16&255]+vJ[J>>24&255]+"-"+vJ[Q&255]+vJ[Q>>8&255]+"-"+vJ[Q>>16&15|64]+vJ[Q>>24&255]+"-"+vJ[$&63|128]+vJ[$>>8&255]+"-"+vJ[$>>16&255]+vJ[$>>24&255]+vJ[Z&255]+vJ[Z>>8&255]+vJ[Z>>16&255]+vJ[Z>>24&255]).toLowerCase()}function l0(J,Q,$){return Math.max(Q,Math.min($,J))}function b$(J,Q){return(J%Q+Q)%Q}function bY(J,Q,$,Z,W){return Z+(J-Q)*(W-Z)/($-Q)}function gY(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function O7(J,Q,$){return(1-$)*J+$*Q}function pY(J,Q,$,Z){return O7(J,Q,1-Math.exp(-$*Z))}function mY(J,Q=1){return Q-Math.abs(b$(J,Q*2)-Q)}function lY(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function dY(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function uY(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function cY(J,Q){return J+Math.random()*(Q-J)}function nY(J){return J*(0.5-Math.random())}function sY(J){if(J!==void 0)oZ=J;let Q=oZ+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function iY(J){return J*R7}function oY(J){return J*i8}function aY(J){return(J&J-1)===0&&J!==0}function rY(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function tY(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function eY(J,Q,$,Z,W){let{cos:K,sin:Y}=Math,X=K($/2),H=Y($/2),U=K((Q+Z)/2),N=Y((Q+Z)/2),G=K((Q-Z)/2),q=Y((Q-Z)/2),F=K((Z-Q)/2),R=Y((Z-Q)/2);switch(W){case"XYX":J.set(X*N,H*G,H*q,X*U);break;case"YZY":J.set(H*q,X*N,H*G,X*U);break;case"ZXZ":J.set(H*G,H*q,X*N,X*U);break;case"XZX":J.set(X*N,H*R,H*F,X*U);break;case"YXY":J.set(H*F,X*N,H*R,X*U);break;case"ZYZ":J.set(H*R,H*F,X*N,X*U);break;default:A0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function D9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function e0(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var g$={DEG2RAD:R7,RAD2DEG:i8,generateUUID:h9,clamp:l0,euclideanModulo:b$,mapLinear:bY,inverseLerp:gY,lerp:O7,damp:pY,pingpong:mY,smoothstep:lY,smootherstep:dY,randInt:uY,randFloat:cY,randFloatSpread:nY,seededRandom:sY,degToRad:iY,radToDeg:oY,isPowerOfTwo:aY,ceilPowerOfTwo:rY,floorPowerOfTwo:tY,setQuaternionFromProperEuler:eY,normalize:e0,denormalize:D9};class B0{static{B0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=l0(this.x,J.x,Q.x),this.y=l0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=l0(this.x,J,Q),this.y=l0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(l0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(l0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class K9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,Y){let X=$[Z+0],H=$[Z+1],U=$[Z+2],N=$[Z+3],G=W[K+0],q=W[K+1],F=W[K+2],R=W[K+3];if(N!==R||X!==G||H!==q||U!==F){let B=X*G+H*q+U*F+N*R;if(B<0)G=-G,q=-q,F=-F,R=-R,B=-B;let E=1-Y;if(B<0.9995){let D=Math.acos(B),O=Math.sin(D);E=Math.sin(E*D)/O,Y=Math.sin(Y*D)/O,X=X*E+G*Y,H=H*E+q*Y,U=U*E+F*Y,N=N*E+R*Y}else{X=X*E+G*Y,H=H*E+q*Y,U=U*E+F*Y,N=N*E+R*Y;let D=1/Math.sqrt(X*X+H*H+U*U+N*N);X*=D,H*=D,U*=D,N*=D}}J[Q]=X,J[Q+1]=H,J[Q+2]=U,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let Y=$[Z],X=$[Z+1],H=$[Z+2],U=$[Z+3],N=W[K],G=W[K+1],q=W[K+2],F=W[K+3];return J[Q]=Y*F+U*N+X*q-H*G,J[Q+1]=X*F+U*G+H*N-Y*q,J[Q+2]=H*F+U*q+Y*G-X*N,J[Q+3]=U*F-Y*N-X*G-H*q,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,Y=Math.cos,X=Math.sin,H=Y($/2),U=Y(Z/2),N=Y(W/2),G=X($/2),q=X(Z/2),F=X(W/2);switch(K){case"XYZ":this._x=G*U*N+H*q*F,this._y=H*q*N-G*U*F,this._z=H*U*F+G*q*N,this._w=H*U*N-G*q*F;break;case"YXZ":this._x=G*U*N+H*q*F,this._y=H*q*N-G*U*F,this._z=H*U*F-G*q*N,this._w=H*U*N+G*q*F;break;case"ZXY":this._x=G*U*N-H*q*F,this._y=H*q*N+G*U*F,this._z=H*U*F+G*q*N,this._w=H*U*N-G*q*F;break;case"ZYX":this._x=G*U*N-H*q*F,this._y=H*q*N+G*U*F,this._z=H*U*F-G*q*N,this._w=H*U*N+G*q*F;break;case"YZX":this._x=G*U*N+H*q*F,this._y=H*q*N+G*U*F,this._z=H*U*F-G*q*N,this._w=H*U*N-G*q*F;break;case"XZY":this._x=G*U*N-H*q*F,this._y=H*q*N-G*U*F,this._z=H*U*F+G*q*N,this._w=H*U*N+G*q*F;break;default:A0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],Y=Q[5],X=Q[9],H=Q[2],U=Q[6],N=Q[10],G=$+Y+N;if(G>0){let q=0.5/Math.sqrt(G+1);this._w=0.25/q,this._x=(U-X)*q,this._y=(W-H)*q,this._z=(K-Z)*q}else if($>Y&&$>N){let q=2*Math.sqrt(1+$-Y-N);this._w=(U-X)/q,this._x=0.25*q,this._y=(Z+K)/q,this._z=(W+H)/q}else if(Y>N){let q=2*Math.sqrt(1+Y-$-N);this._w=(W-H)/q,this._x=(Z+K)/q,this._y=0.25*q,this._z=(X+U)/q}else{let q=2*Math.sqrt(1+N-$-Y);this._w=(K-Z)/q,this._x=(W+H)/q,this._y=(X+U)/q,this._z=0.25*q}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(l0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,Y=Q._x,X=Q._y,H=Q._z,U=Q._w;return this._x=$*U+K*Y+Z*H-W*X,this._y=Z*U+K*X+W*Y-$*H,this._z=W*U+K*H+$*X-Z*Y,this._w=K*U-$*Y-Z*X-W*H,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,Y=this.dot(J);if(Y<0)$=-$,Z=-Z,W=-W,K=-K,Y=-Y;let X=1-Q;if(Y<0.9995){let H=Math.acos(Y),U=Math.sin(H);X=Math.sin(X*H)/U,Q=Math.sin(Q*H)/U,this._x=this._x*X+$*Q,this._y=this._y*X+Z*Q,this._z=this._z*X+W*Q,this._w=this._w*X+K*Q,this._onChangeCallback()}else this._x=this._x*X+$*Q,this._y=this._y*X+Z*Q,this._z=this._z*X+W*Q,this._w=this._w*X+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{static{j.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(aZ.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(aZ.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,Y=J.z,X=J.w,H=2*(K*Z-Y*$),U=2*(Y*Q-W*Z),N=2*(W*$-K*Q);return this.x=Q+X*H+K*N-Y*U,this.y=$+X*U+Y*H-W*N,this.z=Z+X*N+W*U-K*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=l0(this.x,J.x,Q.x),this.y=l0(this.y,J.y,Q.y),this.z=l0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=l0(this.x,J,Q),this.y=l0(this.y,J,Q),this.z=l0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(l0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,Y=Q.y,X=Q.z;return this.x=Z*X-W*Y,this.y=W*K-$*X,this.z=$*Y-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return RQ.copy(this).projectOnVector(J),this.sub(RQ)}reflect(J){return this.sub(RQ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(l0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var RQ=new j,aZ=new K9;class j0{static{j0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,Y,X,H){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,Y,X,H)}set(J,Q,$,Z,W,K,Y,X,H){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=Y,U[3]=Q,U[4]=W,U[5]=X,U[6]=$,U[7]=K,U[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],Y=$[3],X=$[6],H=$[1],U=$[4],N=$[7],G=$[2],q=$[5],F=$[8],R=Z[0],B=Z[3],E=Z[6],D=Z[1],O=Z[4],V=Z[7],z=Z[2],A=Z[5],P=Z[8];return W[0]=K*R+Y*D+X*z,W[3]=K*B+Y*O+X*A,W[6]=K*E+Y*V+X*P,W[1]=H*R+U*D+N*z,W[4]=H*B+U*O+N*A,W[7]=H*E+U*V+N*P,W[2]=G*R+q*D+F*z,W[5]=G*B+q*O+F*A,W[8]=G*E+q*V+F*P,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],H=J[7],U=J[8];return Q*K*U-Q*Y*H-$*W*U+$*Y*X+Z*W*H-Z*K*X}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],H=J[7],U=J[8],N=U*K-Y*H,G=Y*X-U*W,q=H*W-K*X,F=Q*N+$*G+Z*q;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/F;return J[0]=N*R,J[1]=(Z*H-U*$)*R,J[2]=(Y*$-Z*K)*R,J[3]=G*R,J[4]=(U*Q-Z*X)*R,J[5]=(Z*W-Y*Q)*R,J[6]=q*R,J[7]=($*X-H*Q)*R,J[8]=(K*Q-$*W)*R,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,Y){let X=Math.cos(W),H=Math.sin(W);return this.set($*X,$*H,-$*(X*K+H*Y)+K+J,-Z*H,Z*X,-Z*(-H*K+X*Y)+Y+Q,0,0,1),this}scale(J,Q){return this.premultiply(OQ.makeScale(J,Q)),this}rotate(J){return this.premultiply(OQ.makeRotation(-J)),this}translate(J,Q){return this.premultiply(OQ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var OQ=new j0,rZ=new j0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),tZ=new j0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function JX(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,Y){if(this.enabled===!1||K===Y||!K||!Y)return W;if(this.spaces[K].transfer==="srgb")W.r=x9(W.r),W.g=x9(W.g),W.b=x9(W.b);if(this.spaces[K].primaries!==this.spaces[Y].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[Y].fromXYZ);if(this.spaces[Y].transfer==="srgb")W.r=c8(W.r),W.g=c8(W.g),W.b=c8(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,Y){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[Y].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return z6("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return z6("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:rZ,fromXYZ:tZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:rZ,fromXYZ:tZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var c0=JX();function x9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function c8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var w8;class p${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(w8===void 0)w8=n8("canvas");w8.width=J.width,w8.height=J.height;let Z=w8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=w8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=n8("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=x9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(x9(Q[$]/255)*255);else Q[$]=x9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return A0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var QX=0;class P7{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:QX++}),this.uuid=h9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,Y=Z.length;K<Y;K++)if(Z[K].isDataTexture)W.push(MQ(Z[K].image));else W.push(MQ(Z[K]))}else W=MQ(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function MQ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return p$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return A0("Texture: Unable to serialize Texture."),{}}var $X=0,_Q=new j;class CJ extends k9{constructor(J=CJ.DEFAULT_IMAGE,Q=CJ.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,Y=1023,X=1009,H=CJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:$X++}),this.uuid=h9(),this.name="",this.source=new P7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=H,this.format=Y,this.internalFormat=null,this.type=X,this.offset=new B0(0,0),this.repeat=new B0(1,1),this.center=new B0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new j0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_Q).x}get height(){return this.source.getSize(_Q).y}get depth(){return this.source.getSize(_Q).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){A0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){A0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}CJ.DEFAULT_IMAGE=null;CJ.DEFAULT_MAPPING=300;CJ.DEFAULT_ANISOTROPY=1;class EJ{static{EJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,Y=0.1,X=J.elements,H=X[0],U=X[4],N=X[8],G=X[1],q=X[5],F=X[9],R=X[2],B=X[6],E=X[10];if(Math.abs(U-G)<0.01&&Math.abs(N-R)<0.01&&Math.abs(F-B)<0.01){if(Math.abs(U+G)<0.1&&Math.abs(N+R)<0.1&&Math.abs(F+B)<0.1&&Math.abs(H+q+E-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let O=(H+1)/2,V=(q+1)/2,z=(E+1)/2,A=(U+G)/4,P=(N+R)/4,C=(F+B)/4;if(O>V&&O>z)if(O<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(O),Z=A/$,W=P/$;else if(V>z)if(V<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(V),$=A/Z,W=C/Z;else if(z<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(z),$=P/W,Z=C/W;return this.set($,Z,W,Q),this}let D=Math.sqrt((B-F)*(B-F)+(N-R)*(N-R)+(G-U)*(G-U));if(Math.abs(D)<0.001)D=1;return this.x=(B-F)/D,this.y=(N-R)/D,this.z=(G-U)/D,this.w=Math.acos((H+q+E-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=l0(this.x,J.x,Q.x),this.y=l0(this.y,J.y,Q.y),this.z=l0(this.z,J.z,Q.z),this.w=l0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=l0(this.x,J,Q),this.y=l0(this.y,J,Q),this.z=l0(this.z,J,Q),this.w=l0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(l0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class m$ extends k9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new EJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new EJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new CJ(Z),K=$.count;for(let Y=0;Y<K;Y++)this.textures[Y]=W.clone(),this.textures[Y].isRenderTargetTexture=!0,this.textures[Y].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new P7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Y9 extends m${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class x6 extends CJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class l$ extends CJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class FJ{static{FJ.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,Y,X,H,U,N,G,q,F,R,B){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,Y,X,H,U,N,G,q,F,R,B)}set(J,Q,$,Z,W,K,Y,X,H,U,N,G,q,F,R,B){let E=this.elements;return E[0]=J,E[4]=Q,E[8]=$,E[12]=Z,E[1]=W,E[5]=K,E[9]=Y,E[13]=X,E[2]=H,E[6]=U,E[10]=N,E[14]=G,E[3]=q,E[7]=F,E[11]=R,E[15]=B,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new FJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinant()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinant()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/C8.setFromMatrixColumn(J,0).length(),W=1/C8.setFromMatrixColumn(J,1).length(),K=1/C8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),Y=Math.sin($),X=Math.cos(Z),H=Math.sin(Z),U=Math.cos(W),N=Math.sin(W);if(J.order==="XYZ"){let G=K*U,q=K*N,F=Y*U,R=Y*N;Q[0]=X*U,Q[4]=-X*N,Q[8]=H,Q[1]=q+F*H,Q[5]=G-R*H,Q[9]=-Y*X,Q[2]=R-G*H,Q[6]=F+q*H,Q[10]=K*X}else if(J.order==="YXZ"){let G=X*U,q=X*N,F=H*U,R=H*N;Q[0]=G+R*Y,Q[4]=F*Y-q,Q[8]=K*H,Q[1]=K*N,Q[5]=K*U,Q[9]=-Y,Q[2]=q*Y-F,Q[6]=R+G*Y,Q[10]=K*X}else if(J.order==="ZXY"){let G=X*U,q=X*N,F=H*U,R=H*N;Q[0]=G-R*Y,Q[4]=-K*N,Q[8]=F+q*Y,Q[1]=q+F*Y,Q[5]=K*U,Q[9]=R-G*Y,Q[2]=-K*H,Q[6]=Y,Q[10]=K*X}else if(J.order==="ZYX"){let G=K*U,q=K*N,F=Y*U,R=Y*N;Q[0]=X*U,Q[4]=F*H-q,Q[8]=G*H+R,Q[1]=X*N,Q[5]=R*H+G,Q[9]=q*H-F,Q[2]=-H,Q[6]=Y*X,Q[10]=K*X}else if(J.order==="YZX"){let G=K*X,q=K*H,F=Y*X,R=Y*H;Q[0]=X*U,Q[4]=R-G*N,Q[8]=F*N+q,Q[1]=N,Q[5]=K*U,Q[9]=-Y*U,Q[2]=-H*U,Q[6]=q*N+F,Q[10]=G-R*N}else if(J.order==="XZY"){let G=K*X,q=K*H,F=Y*X,R=Y*H;Q[0]=X*U,Q[4]=-N,Q[8]=H*U,Q[1]=G*N+R,Q[5]=K*U,Q[9]=q*N-F,Q[2]=F*N-q,Q[6]=Y*U,Q[10]=R*N+G}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(ZX,J,WX)}lookAt(J,Q,$){let Z=this.elements;if(rJ.subVectors(J,Q),rJ.lengthSq()===0)rJ.z=1;if(rJ.normalize(),u9.crossVectors($,rJ),u9.lengthSq()===0){if(Math.abs($.z)===1)rJ.x+=0.0001;else rJ.z+=0.0001;rJ.normalize(),u9.crossVectors($,rJ)}return u9.normalize(),e7.crossVectors(rJ,u9),Z[0]=u9.x,Z[4]=e7.x,Z[8]=rJ.x,Z[1]=u9.y,Z[5]=e7.y,Z[9]=rJ.y,Z[2]=u9.z,Z[6]=e7.z,Z[10]=rJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],Y=$[4],X=$[8],H=$[12],U=$[1],N=$[5],G=$[9],q=$[13],F=$[2],R=$[6],B=$[10],E=$[14],D=$[3],O=$[7],V=$[11],z=$[15],A=Z[0],P=Z[4],C=Z[8],_=Z[12],k=Z[1],l=Z[5],w=Z[9],m=Z[13],c=Z[2],f=Z[6],d=Z[10],b=Z[14],p=Z[3],a=Z[7],Q0=Z[11],F0=Z[15];return W[0]=K*A+Y*k+X*c+H*p,W[4]=K*P+Y*l+X*f+H*a,W[8]=K*C+Y*w+X*d+H*Q0,W[12]=K*_+Y*m+X*b+H*F0,W[1]=U*A+N*k+G*c+q*p,W[5]=U*P+N*l+G*f+q*a,W[9]=U*C+N*w+G*d+q*Q0,W[13]=U*_+N*m+G*b+q*F0,W[2]=F*A+R*k+B*c+E*p,W[6]=F*P+R*l+B*f+E*a,W[10]=F*C+R*w+B*d+E*Q0,W[14]=F*_+R*m+B*b+E*F0,W[3]=D*A+O*k+V*c+z*p,W[7]=D*P+O*l+V*f+z*a,W[11]=D*C+O*w+V*d+z*Q0,W[15]=D*_+O*m+V*b+z*F0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],Y=J[5],X=J[9],H=J[13],U=J[2],N=J[6],G=J[10],q=J[14],F=J[3],R=J[7],B=J[11],E=J[15],D=X*q-H*G,O=Y*q-H*N,V=Y*G-X*N,z=K*q-H*U,A=K*G-X*U,P=K*N-Y*U;return Q*(R*D-B*O+E*V)-$*(F*D-B*z+E*A)+Z*(F*O-R*z+E*P)-W*(F*V-R*A+B*P)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],H=J[7],U=J[8],N=J[9],G=J[10],q=J[11],F=J[12],R=J[13],B=J[14],E=J[15],D=Q*Y-$*K,O=Q*X-Z*K,V=Q*H-W*K,z=$*X-Z*Y,A=$*H-W*Y,P=Z*H-W*X,C=U*R-N*F,_=U*B-G*F,k=U*E-q*F,l=N*B-G*R,w=N*E-q*R,m=G*E-q*B,c=D*m-O*w+V*l+z*k-A*_+P*C;if(c===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let f=1/c;return J[0]=(Y*m-X*w+H*l)*f,J[1]=(Z*w-$*m-W*l)*f,J[2]=(R*P-B*A+E*z)*f,J[3]=(G*A-N*P-q*z)*f,J[4]=(X*k-K*m-H*_)*f,J[5]=(Q*m-Z*k+W*_)*f,J[6]=(B*V-F*P-E*O)*f,J[7]=(U*P-G*V+q*O)*f,J[8]=(K*w-Y*k+H*C)*f,J[9]=($*k-Q*w-W*C)*f,J[10]=(F*A-R*V+E*D)*f,J[11]=(N*V-U*A-q*D)*f,J[12]=(Y*_-K*l-X*C)*f,J[13]=(Q*l-$*_+Z*C)*f,J[14]=(R*O-F*z-B*D)*f,J[15]=(U*z-N*O+G*D)*f,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,Y=J.y,X=J.z,H=W*K,U=W*Y;return this.set(H*K+$,H*Y-Z*X,H*X+Z*Y,0,H*Y+Z*X,U*Y+$,U*X-Z*K,0,H*X-Z*Y,U*X+Z*K,W*X*X+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,Y=Q._z,X=Q._w,H=W+W,U=K+K,N=Y+Y,G=W*H,q=W*U,F=W*N,R=K*U,B=K*N,E=Y*N,D=X*H,O=X*U,V=X*N,z=$.x,A=$.y,P=$.z;return Z[0]=(1-(R+E))*z,Z[1]=(q+V)*z,Z[2]=(F-O)*z,Z[3]=0,Z[4]=(q-V)*A,Z[5]=(1-(G+E))*A,Z[6]=(B+D)*A,Z[7]=0,Z[8]=(F+O)*P,Z[9]=(B-D)*P,Z[10]=(1-(G+R))*P,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinant();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=C8.set(Z[0],Z[1],Z[2]).length(),Y=C8.set(Z[4],Z[5],Z[6]).length(),X=C8.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;G9.copy(this);let H=1/K,U=1/Y,N=1/X;return G9.elements[0]*=H,G9.elements[1]*=H,G9.elements[2]*=H,G9.elements[4]*=U,G9.elements[5]*=U,G9.elements[6]*=U,G9.elements[8]*=N,G9.elements[9]*=N,G9.elements[10]*=N,Q.setFromRotationMatrix(G9),$.x=K,$.y=Y,$.z=X,this}makePerspective(J,Q,$,Z,W,K,Y=2000,X=!1){let H=this.elements,U=2*W/(Q-J),N=2*W/($-Z),G=(Q+J)/(Q-J),q=($+Z)/($-Z),F,R;if(X)F=W/(K-W),R=K*W/(K-W);else if(Y===2000)F=-(K+W)/(K-W),R=-2*K*W/(K-W);else if(Y===2001)F=-K/(K-W),R=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return H[0]=U,H[4]=0,H[8]=G,H[12]=0,H[1]=0,H[5]=N,H[9]=q,H[13]=0,H[2]=0,H[6]=0,H[10]=F,H[14]=R,H[3]=0,H[7]=0,H[11]=-1,H[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,Y=2000,X=!1){let H=this.elements,U=2/(Q-J),N=2/($-Z),G=-(Q+J)/(Q-J),q=-($+Z)/($-Z),F,R;if(X)F=1/(K-W),R=K/(K-W);else if(Y===2000)F=-2/(K-W),R=-(K+W)/(K-W);else if(Y===2001)F=-1/(K-W),R=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return H[0]=U,H[4]=0,H[8]=0,H[12]=G,H[1]=0,H[5]=N,H[9]=0,H[13]=q,H[2]=0,H[6]=0,H[10]=F,H[14]=R,H[3]=0,H[7]=0,H[11]=0,H[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var C8=new j,G9=new FJ,ZX=new j(0,0,0),WX=new j(1,1,1),u9=new j,e7=new j,rJ=new j,eZ=new FJ,JW=new K9;class b9{constructor(J=0,Q=0,$=0,Z=b9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],Y=Z[8],X=Z[1],H=Z[5],U=Z[9],N=Z[2],G=Z[6],q=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(l0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,q),this._z=Math.atan2(-K,W);else this._x=Math.atan2(G,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-l0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(Y,q),this._z=Math.atan2(X,H);else this._y=Math.atan2(-N,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(l0(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(-N,q),this._z=Math.atan2(-K,H);else this._y=0,this._z=Math.atan2(X,W);break;case"ZYX":if(this._y=Math.asin(-l0(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(G,q),this._z=Math.atan2(X,W);else this._x=0,this._z=Math.atan2(-K,H);break;case"YZX":if(this._z=Math.asin(l0(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-U,H),this._y=Math.atan2(-N,W);else this._x=0,this._y=Math.atan2(Y,q);break;case"XZY":if(this._z=Math.asin(-l0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(G,H),this._y=Math.atan2(Y,W);else this._x=Math.atan2(-U,q),this._y=0;break;default:A0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return eZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(eZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return JW.setFromEuler(this),this.setFromQuaternion(JW,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}b9.DEFAULT_ORDER="XYZ";class w7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var KX=0,QW=new j,T8=new K9,S9=new FJ,J6=new j,U7=new j,YX=new j,XX=new K9,$W=new j(1,0,0),ZW=new j(0,1,0),WW=new j(0,0,1),KW={type:"added"},HX={type:"removed"},S8={type:"childadded",child:null},VQ={type:"childremoved",child:null};class kJ extends k9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:KX++}),this.uuid=h9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kJ.DEFAULT_UP.clone();let J=new j,Q=new b9,$=new K9,Z=new j(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new FJ},normalMatrix:{value:new j0}}),this.matrix=new FJ,this.matrixWorld=new FJ,this.matrixAutoUpdate=kJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new w7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return T8.setFromAxisAngle(J,Q),this.quaternion.multiply(T8),this}rotateOnWorldAxis(J,Q){return T8.setFromAxisAngle(J,Q),this.quaternion.premultiply(T8),this}rotateX(J){return this.rotateOnAxis($W,J)}rotateY(J){return this.rotateOnAxis(ZW,J)}rotateZ(J){return this.rotateOnAxis(WW,J)}translateOnAxis(J,Q){return QW.copy(J).applyQuaternion(this.quaternion),this.position.add(QW.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis($W,J)}translateY(J){return this.translateOnAxis(ZW,J)}translateZ(J){return this.translateOnAxis(WW,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(S9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)J6.copy(J);else J6.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),U7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)S9.lookAt(U7,J6,this.up);else S9.lookAt(J6,U7,this.up);if(this.quaternion.setFromRotationMatrix(S9),Z)S9.extractRotation(Z.matrixWorld),T8.setFromRotationMatrix(S9),this.quaternion.premultiply(T8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return C0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(KW),S8.child=J,this.dispatchEvent(S8),S8.child=null;else C0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(HX),VQ.child=J,this.dispatchEvent(VQ),VQ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),S9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),S9.multiply(J.parent.matrixWorld);return J.applyMatrix4(S9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(KW),S8.child=J,this.dispatchEvent(S8),S8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(U7,J,YX),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(U7,XX,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q){let $=this.parent;if(J===!0&&$!==null)$.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(Q===!0){let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].updateWorldMatrix(!1,!0)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((Y)=>({...Y,boundingBox:Y.boundingBox?Y.boundingBox.toJSON():void 0,boundingSphere:Y.boundingSphere?Y.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((Y)=>({...Y})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(Y,X){if(Y[X.uuid]===void 0)Y[X.uuid]=X.toJSON(J);return X.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let X=Y.shapes;if(Array.isArray(X))for(let H=0,U=X.length;H<U;H++){let N=X[H];W(J.shapes,N)}else W(J.shapes,X)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let X=0,H=this.material.length;X<H;X++)Y.push(W(J.materials,this.material[X]));Z.material=Y}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let Y=0;Y<this.children.length;Y++)Z.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let Y=0;Y<this.animations.length;Y++){let X=this.animations[Y];Z.animations.push(W(J.animations,X))}}if(Q){let Y=K(J.geometries),X=K(J.materials),H=K(J.textures),U=K(J.images),N=K(J.shapes),G=K(J.skeletons),q=K(J.animations),F=K(J.nodes);if(Y.length>0)$.geometries=Y;if(X.length>0)$.materials=X;if(H.length>0)$.textures=H;if(U.length>0)$.images=U;if(N.length>0)$.shapes=N;if(G.length>0)$.skeletons=G;if(q.length>0)$.animations=q;if(F.length>0)$.nodes=F}return $.object=Z,$;function K(Y){let X=[];for(let H in Y){let U=Y[H];delete U.metadata,X.push(U)}return X}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}kJ.DEFAULT_UP=new j(0,1,0);kJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;kJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mJ extends kJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var UX={type:"move"};class C7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new mJ,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new mJ,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new mJ,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,Y=this._targetRay,X=this._grip,H=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(H&&J.hand){K=!0;for(let R of J.hand.values()){let B=Q.getJointPose(R,$),E=this._getHandJoint(H,R);if(B!==null)E.matrix.fromArray(B.transform.matrix),E.matrix.decompose(E.position,E.rotation,E.scale),E.matrixWorldNeedsUpdate=!0,E.jointRadius=B.radius;E.visible=B!==null}let U=H.joints["index-finger-tip"],N=H.joints["thumb-tip"],G=U.position.distanceTo(N.position),q=0.02,F=0.005;if(H.inputState.pinching&&G>q+F)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&G<=q-F)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(X!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(X.matrix.fromArray(W.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,W.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(W.linearVelocity);else X.hasLinearVelocity=!1;if(W.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(W.angularVelocity);else X.hasAngularVelocity=!1;if(X.eventsEnabled)X.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(Y!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(UX)}}}if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=W!==null;if(H!==null)H.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new mJ;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var VK={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},c9={h:0,s:0,l:0},Q6={h:0,s:0,l:0};function LQ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class x0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,c0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=c0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,c0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=c0.workingColorSpace){if(J=b$(J,1),Q=l0(Q,0,1),$=l0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=LQ(K,W,J+0.3333333333333333),this.g=LQ(K,W,J),this.b=LQ(K,W,J-0.3333333333333333)}return c0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)A0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],Y=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:A0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else A0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=VK[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else A0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=x9(J.r),this.g=x9(J.g),this.b=x9(J.b),this}copyLinearToSRGB(J){return this.r=c8(J.r),this.g=c8(J.g),this.b=c8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return c0.workingToColorSpace(hJ.copy(this),J),Math.round(l0(hJ.r*255,0,255))*65536+Math.round(l0(hJ.g*255,0,255))*256+Math.round(l0(hJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=c0.workingColorSpace){c0.workingToColorSpace(hJ.copy(this),Q);let{r:$,g:Z,b:W}=hJ,K=Math.max($,Z,W),Y=Math.min($,Z,W),X,H,U=(Y+K)/2;if(Y===K)X=0,H=0;else{let N=K-Y;switch(H=U<=0.5?N/(K+Y):N/(2-K-Y),K){case $:X=(Z-W)/N+(Z<W?6:0);break;case Z:X=(W-$)/N+2;break;case W:X=($-Z)/N+4;break}X/=6}return J.h=X,J.s=H,J.l=U,J}getRGB(J,Q=c0.workingColorSpace){return c0.workingToColorSpace(hJ.copy(this),Q),J.r=hJ.r,J.g=hJ.g,J.b=hJ.b,J}getStyle(J="srgb"){c0.workingToColorSpace(hJ.copy(this),J);let{r:Q,g:$,b:Z}=hJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(c9),this.setHSL(c9.h+J,c9.s+Q,c9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(c9),J.getHSL(Q6);let $=O7(c9.h,Q6.h,Q),Z=O7(c9.s,Q6.s,Q),W=O7(c9.l,Q6.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var hJ=new x0;x0.NAMES=VK;class T7{constructor(J,Q=1,$=1000){this.isFog=!0,this.name="",this.color=new x0(J),this.near=Q,this.far=$}clone(){return new T7(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class b6 extends kJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new b9,this.environmentIntensity=1,this.environmentRotation=new b9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var N9=new j,j9=new j,BQ=new j,y9=new j,j8=new j,y8=new j,YW=new j,zQ=new j,kQ=new j,IQ=new j,AQ=new EJ,PQ=new EJ,wQ=new EJ;class eJ{constructor(J=new j,Q=new j,$=new j){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),N9.subVectors(J,Q),Z.cross(N9);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){N9.subVectors(Z,Q),j9.subVectors($,Q),BQ.subVectors(J,Q);let K=N9.dot(N9),Y=N9.dot(j9),X=N9.dot(BQ),H=j9.dot(j9),U=j9.dot(BQ),N=K*H-Y*Y;if(N===0)return W.set(0,0,0),null;let G=1/N,q=(H*X-Y*U)*G,F=(K*U-Y*X)*G;return W.set(1-q-F,F,q)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,y9)===null)return!1;return y9.x>=0&&y9.y>=0&&y9.x+y9.y<=1}static getInterpolation(J,Q,$,Z,W,K,Y,X){if(this.getBarycoord(J,Q,$,Z,y9)===null){if(X.x=0,X.y=0,"z"in X)X.z=0;if("w"in X)X.w=0;return null}return X.setScalar(0),X.addScaledVector(W,y9.x),X.addScaledVector(K,y9.y),X.addScaledVector(Y,y9.z),X}static getInterpolatedAttribute(J,Q,$,Z,W,K){return AQ.setScalar(0),PQ.setScalar(0),wQ.setScalar(0),AQ.fromBufferAttribute(J,Q),PQ.fromBufferAttribute(J,$),wQ.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(AQ,W.x),K.addScaledVector(PQ,W.y),K.addScaledVector(wQ,W.z),K}static isFrontFacing(J,Q,$,Z){return N9.subVectors($,Q),j9.subVectors(J,Q),N9.cross(j9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return N9.subVectors(this.c,this.b),j9.subVectors(this.a,this.b),N9.cross(j9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return eJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return eJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return eJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return eJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return eJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,Y;j8.subVectors(Z,$),y8.subVectors(W,$),zQ.subVectors(J,$);let X=j8.dot(zQ),H=y8.dot(zQ);if(X<=0&&H<=0)return Q.copy($);kQ.subVectors(J,Z);let U=j8.dot(kQ),N=y8.dot(kQ);if(U>=0&&N<=U)return Q.copy(Z);let G=X*N-U*H;if(G<=0&&X>=0&&U<=0)return K=X/(X-U),Q.copy($).addScaledVector(j8,K);IQ.subVectors(J,W);let q=j8.dot(IQ),F=y8.dot(IQ);if(F>=0&&q<=F)return Q.copy(W);let R=q*H-X*F;if(R<=0&&H>=0&&F<=0)return Y=H/(H-F),Q.copy($).addScaledVector(y8,Y);let B=U*F-q*N;if(B<=0&&N-U>=0&&q-F>=0)return YW.subVectors(W,Z),Y=(N-U)/(N-U+(q-F)),Q.copy(Z).addScaledVector(YW,Y);let E=1/(B+R+G);return K=R*E,Y=G*E,Q.copy($).addScaledVector(j8,K).addScaledVector(y8,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class R8{constructor(J=new j(1/0,1/0,1/0),Q=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(q9.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(q9.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=q9.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,Y=W.count;K<Y;K++){if(J.isMesh===!0)J.getVertexPosition(K,q9);else q9.fromBufferAttribute(W,K);q9.applyMatrix4(J.matrixWorld),this.expandByPoint(q9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();$6.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();$6.copy($.boundingBox)}$6.applyMatrix4(J.matrixWorld),this.union($6)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,q9),q9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(G7),Z6.subVectors(this.max,G7),f8.subVectors(J.a,G7),v8.subVectors(J.b,G7),h8.subVectors(J.c,G7),n9.subVectors(v8,f8),s9.subVectors(h8,v8),Y8.subVectors(f8,h8);let Q=[0,-n9.z,n9.y,0,-s9.z,s9.y,0,-Y8.z,Y8.y,n9.z,0,-n9.x,s9.z,0,-s9.x,Y8.z,0,-Y8.x,-n9.y,n9.x,0,-s9.y,s9.x,0,-Y8.y,Y8.x,0];if(!CQ(Q,f8,v8,h8,Z6))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!CQ(Q,f8,v8,h8,Z6))return!1;return W6.crossVectors(n9,s9),Q=[W6.x,W6.y,W6.z],CQ(Q,f8,v8,h8,Z6)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,q9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(q9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return f9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),f9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),f9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),f9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),f9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),f9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),f9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),f9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(f9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var f9=[new j,new j,new j,new j,new j,new j,new j,new j],q9=new j,$6=new R8,f8=new j,v8=new j,h8=new j,n9=new j,s9=new j,Y8=new j,G7=new j,Z6=new j,W6=new j,X8=new j;function CQ(J,Q,$,Z,W){for(let K=0,Y=J.length-3;K<=Y;K+=3){X8.fromArray(J,K);let X=W.x*Math.abs(X8.x)+W.y*Math.abs(X8.y)+W.z*Math.abs(X8.z),H=Q.dot(X8),U=$.dot(X8),N=Z.dot(X8);if(Math.max(-Math.max(H,U,N),Math.min(H,U,N))>X)return!1}return!0}var BJ=new j,K6=new B0,GX=0;class J9 extends k9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:GX++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)K6.fromBufferAttribute(this,Q),K6.applyMatrix3(J),this.setXY(Q,K6.x,K6.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)BJ.fromBufferAttribute(this,Q),BJ.applyMatrix3(J),this.setXYZ(Q,BJ.x,BJ.y,BJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)BJ.fromBufferAttribute(this,Q),BJ.applyMatrix4(J),this.setXYZ(Q,BJ.x,BJ.y,BJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)BJ.fromBufferAttribute(this,Q),BJ.applyNormalMatrix(J),this.setXYZ(Q,BJ.x,BJ.y,BJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)BJ.fromBufferAttribute(this,Q),BJ.transformDirection(J),this.setXYZ(Q,BJ.x,BJ.y,BJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=D9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=e0($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=D9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=D9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=D9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=D9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=e0(Q,this.array),$=e0($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=e0(Q,this.array),$=e0($,this.array),Z=e0(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=e0(Q,this.array),$=e0($,this.array),Z=e0(Z,this.array),W=e0(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class g6 extends J9{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class p6 extends J9{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class zJ extends J9{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var NX=new R8,N7=new j,TQ=new j;class S7{constructor(J=new j,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else NX.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;N7.subVectors(J,this.center);let Q=N7.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(N7,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else TQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(N7.copy(J.center).add(TQ)),this.expandByPoint(N7.copy(J.center).sub(TQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var qX=0,W9=new FJ,SQ=new kJ,x8=new j,tJ=new R8,q7=new R8,wJ=new j;class nJ extends k9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qX++}),this.uuid=h9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((hY(J))?p6:g6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new j0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return W9.makeRotationFromQuaternion(J),this.applyMatrix4(W9),this}rotateX(J){return W9.makeRotationX(J),this.applyMatrix4(W9),this}rotateY(J){return W9.makeRotationY(J),this.applyMatrix4(W9),this}rotateZ(J){return W9.makeRotationZ(J),this.applyMatrix4(W9),this}translate(J,Q,$){return W9.makeTranslation(J,Q,$),this.applyMatrix4(W9),this}scale(J,Q,$){return W9.makeScale(J,Q,$),this.applyMatrix4(W9),this}lookAt(J){return SQ.lookAt(J),SQ.updateMatrix(),this.applyMatrix4(SQ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(x8).negate(),this.translate(x8.x,x8.y,x8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new zJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)A0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new R8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){C0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(tJ.setFromBufferAttribute(W),this.morphTargetsRelative)wJ.addVectors(this.boundingBox.min,tJ.min),this.boundingBox.expandByPoint(wJ),wJ.addVectors(this.boundingBox.max,tJ.max),this.boundingBox.expandByPoint(wJ);else this.boundingBox.expandByPoint(tJ.min),this.boundingBox.expandByPoint(tJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))C0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new S7;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){C0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(J){let $=this.boundingSphere.center;if(tJ.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let Y=Q[W];if(q7.setFromBufferAttribute(Y),this.morphTargetsRelative)wJ.addVectors(tJ.min,q7.min),tJ.expandByPoint(wJ),wJ.addVectors(tJ.max,q7.max),tJ.expandByPoint(wJ);else tJ.expandByPoint(q7.min),tJ.expandByPoint(q7.max)}tJ.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)wJ.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(wJ));if(Q)for(let W=0,K=Q.length;W<K;W++){let Y=Q[W],X=this.morphTargetsRelative;for(let H=0,U=Y.count;H<U;H++){if(wJ.fromBufferAttribute(Y,H),X)x8.fromBufferAttribute(J,H),wJ.add(x8);Z=Math.max(Z,$.distanceToSquared(wJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))C0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){C0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new J9(new Float32Array(4*$.count),4));let K=this.getAttribute("tangent"),Y=[],X=[];for(let C=0;C<$.count;C++)Y[C]=new j,X[C]=new j;let H=new j,U=new j,N=new j,G=new B0,q=new B0,F=new B0,R=new j,B=new j;function E(C,_,k){H.fromBufferAttribute($,C),U.fromBufferAttribute($,_),N.fromBufferAttribute($,k),G.fromBufferAttribute(W,C),q.fromBufferAttribute(W,_),F.fromBufferAttribute(W,k),U.sub(H),N.sub(H),q.sub(G),F.sub(G);let l=1/(q.x*F.y-F.x*q.y);if(!isFinite(l))return;R.copy(U).multiplyScalar(F.y).addScaledVector(N,-q.y).multiplyScalar(l),B.copy(N).multiplyScalar(q.x).addScaledVector(U,-F.x).multiplyScalar(l),Y[C].add(R),Y[_].add(R),Y[k].add(R),X[C].add(B),X[_].add(B),X[k].add(B)}let D=this.groups;if(D.length===0)D=[{start:0,count:J.count}];for(let C=0,_=D.length;C<_;++C){let k=D[C],l=k.start,w=k.count;for(let m=l,c=l+w;m<c;m+=3)E(J.getX(m+0),J.getX(m+1),J.getX(m+2))}let O=new j,V=new j,z=new j,A=new j;function P(C){z.fromBufferAttribute(Z,C),A.copy(z);let _=Y[C];O.copy(_),O.sub(z.multiplyScalar(z.dot(_))).normalize(),V.crossVectors(A,_);let l=V.dot(X[C])<0?-1:1;K.setXYZW(C,O.x,O.y,O.z,l)}for(let C=0,_=D.length;C<_;++C){let k=D[C],l=k.start,w=k.count;for(let m=l,c=l+w;m<c;m+=3)P(J.getX(m+0)),P(J.getX(m+1)),P(J.getX(m+2))}}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0)$=new J9(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let G=0,q=$.count;G<q;G++)$.setXYZ(G,0,0,0);let Z=new j,W=new j,K=new j,Y=new j,X=new j,H=new j,U=new j,N=new j;if(J)for(let G=0,q=J.count;G<q;G+=3){let F=J.getX(G+0),R=J.getX(G+1),B=J.getX(G+2);Z.fromBufferAttribute(Q,F),W.fromBufferAttribute(Q,R),K.fromBufferAttribute(Q,B),U.subVectors(K,W),N.subVectors(Z,W),U.cross(N),Y.fromBufferAttribute($,F),X.fromBufferAttribute($,R),H.fromBufferAttribute($,B),Y.add(U),X.add(U),H.add(U),$.setXYZ(F,Y.x,Y.y,Y.z),$.setXYZ(R,X.x,X.y,X.z),$.setXYZ(B,H.x,H.y,H.z)}else for(let G=0,q=Q.count;G<q;G+=3)Z.fromBufferAttribute(Q,G+0),W.fromBufferAttribute(Q,G+1),K.fromBufferAttribute(Q,G+2),U.subVectors(K,W),N.subVectors(Z,W),U.cross(N),$.setXYZ(G+0,U.x,U.y,U.z),$.setXYZ(G+1,U.x,U.y,U.z),$.setXYZ(G+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)wJ.fromBufferAttribute(J,Q),wJ.normalize(),J.setXYZ(Q,wJ.x,wJ.y,wJ.z)}toNonIndexed(){function J(Y,X){let{array:H,itemSize:U,normalized:N}=Y,G=new H.constructor(X.length*U),q=0,F=0;for(let R=0,B=X.length;R<B;R++){if(Y.isInterleavedBufferAttribute)q=X[R]*Y.data.stride+Y.offset;else q=X[R]*U;for(let E=0;E<U;E++)G[F++]=H[q++]}return new J9(G,U,N)}if(this.index===null)return A0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new nJ,$=this.index.array,Z=this.attributes;for(let Y in Z){let X=Z[Y],H=J(X,$);Q.setAttribute(Y,H)}let W=this.morphAttributes;for(let Y in W){let X=[],H=W[Y];for(let U=0,N=H.length;U<N;U++){let G=H[U],q=J(G,$);X.push(q)}Q.morphAttributes[Y]=X}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let Y=0,X=K.length;Y<X;Y++){let H=K[Y];Q.addGroup(H.start,H.count,H.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let X=this.parameters;for(let H in X)if(X[H]!==void 0)J[H]=X[H];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let X in $){let H=$[X];J.data.attributes[X]=H.toJSON(J.data)}let Z={},W=!1;for(let X in this.morphAttributes){let H=this.morphAttributes[X],U=[];for(let N=0,G=H.length;N<G;N++){let q=H[N];U.push(q.toJSON(J.data))}if(U.length>0)Z[X]=U,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere=Y.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let H in Z){let U=Z[H];this.setAttribute(H,U.clone(Q))}let W=J.morphAttributes;for(let H in W){let U=[],N=W[H];for(let G=0,q=N.length;G<q;G++)U.push(N[G].clone(Q));this.morphAttributes[H]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let H=0,U=K.length;H<U;H++){let N=K[H];this.addGroup(N.start,N.count,N.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let X=J.boundingSphere;if(X!==null)this.boundingSphere=X.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class d${constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=h9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,W=this.stride;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=h9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=h9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var gJ=new j;class _7{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)gJ.fromBufferAttribute(this,Q),gJ.applyMatrix4(J),this.setXYZ(Q,gJ.x,gJ.y,gJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)gJ.fromBufferAttribute(this,Q),gJ.applyNormalMatrix(J),this.setXYZ(Q,gJ.x,gJ.y,gJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)gJ.fromBufferAttribute(this,Q),gJ.transformDirection(J),this.setXYZ(Q,gJ.x,gJ.y,gJ.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=D9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=e0($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=e0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=D9(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=D9(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=D9(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=D9(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=e0(Q,this.array),$=e0($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=e0(Q,this.array),$=e0($,this.array),Z=e0(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J=J*this.data.stride+this.offset,this.normalized)Q=e0(Q,this.array),$=e0($,this.array),Z=e0(Z,this.array),W=e0(W,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=W,this}clone(J){if(J===void 0){M7("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[Z+W])}return new J9(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new _7(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){M7("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[Z+W])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var FX=0;class J8 extends k9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:FX++}),this.uuid=h9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new x0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){A0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){A0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let Y in W){let X=W[Y];delete X.metadata,K.push(X)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class J7 extends J8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new x0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var b8,F7=new j,g8=new j,p8=new j,m8=new B0,D7=new B0,LK=new FJ,Y6=new j,E7=new j,X6=new j,XW=new B0,jQ=new B0,HW=new B0;class j7 extends kJ{constructor(J=new J7){super();if(this.isSprite=!0,this.type="Sprite",b8===void 0){b8=new nJ;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new d$(Q,5);b8.setIndex([0,1,2,0,2,3]),b8.setAttribute("position",new _7($,3,0,!1)),b8.setAttribute("uv",new _7($,2,3,!1))}this.geometry=b8,this.material=J,this.center=new B0(0.5,0.5),this.count=1}raycast(J,Q){if(J.camera===null)C0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(g8.setFromMatrixScale(this.matrixWorld),LK.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),p8.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)g8.multiplyScalar(-p8.z);let $=this.material.rotation,Z,W;if($!==0)W=Math.cos($),Z=Math.sin($);let K=this.center;H6(Y6.set(-0.5,-0.5,0),p8,K,g8,Z,W),H6(E7.set(0.5,-0.5,0),p8,K,g8,Z,W),H6(X6.set(0.5,0.5,0),p8,K,g8,Z,W),XW.set(0,0),jQ.set(1,0),HW.set(1,1);let Y=J.ray.intersectTriangle(Y6,E7,X6,!1,F7);if(Y===null){if(H6(E7.set(-0.5,0.5,0),p8,K,g8,Z,W),jQ.set(0,1),Y=J.ray.intersectTriangle(Y6,X6,E7,!1,F7),Y===null)return}let X=J.ray.origin.distanceTo(F7);if(X<J.near||X>J.far)return;Q.push({distance:X,point:F7.clone(),uv:eJ.getInterpolation(F7,Y6,E7,X6,XW,jQ,HW,new B0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function H6(J,Q,$,Z,W,K){if(m8.subVectors(J,$).addScalar(0.5).multiply(Z),W!==void 0)D7.x=K*m8.x-W*m8.y,D7.y=W*m8.x+K*m8.y;else D7.copy(m8);J.copy(Q),J.x+=D7.x,J.y+=D7.y,J.applyMatrix4(LK)}var v9=new j,yQ=new j,U6=new j,i9=new j,fQ=new j,G6=new j,vQ=new j;class Q7{constructor(J=new j,Q=new j(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,v9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=v9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return v9.copy(this.origin).addScaledVector(this.direction,Q),v9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){yQ.copy(J).add(Q).multiplyScalar(0.5),U6.copy(Q).sub(J).normalize(),i9.copy(this.origin).sub(yQ);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(U6),Y=i9.dot(this.direction),X=-i9.dot(U6),H=i9.lengthSq(),U=Math.abs(1-K*K),N,G,q,F;if(U>0)if(N=K*X-Y,G=K*Y-X,F=W*U,N>=0)if(G>=-F)if(G<=F){let R=1/U;N*=R,G*=R,q=N*(N+K*G+2*Y)+G*(K*N+G+2*X)+H}else G=W,N=Math.max(0,-(K*G+Y)),q=-N*N+G*(G+2*X)+H;else G=-W,N=Math.max(0,-(K*G+Y)),q=-N*N+G*(G+2*X)+H;else if(G<=-F)N=Math.max(0,-(-K*W+Y)),G=N>0?-W:Math.min(Math.max(-W,-X),W),q=-N*N+G*(G+2*X)+H;else if(G<=F)N=0,G=Math.min(Math.max(-W,-X),W),q=G*(G+2*X)+H;else N=Math.max(0,-(K*W+Y)),G=N>0?W:Math.min(Math.max(-W,-X),W),q=-N*N+G*(G+2*X)+H;else G=K>0?-W:W,N=Math.max(0,-(K*G+Y)),q=-N*N+G*(G+2*X)+H;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(yQ).addScaledVector(U6,G);return q}intersectSphere(J,Q){v9.subVectors(J.center,this.origin);let $=v9.dot(this.direction),Z=v9.dot(v9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),Y=$-K,X=$+K;if(X<0)return null;if(Y<0)return this.at(X,Q);return this.at(Y,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,Y,X,H=1/this.direction.x,U=1/this.direction.y,N=1/this.direction.z,G=this.origin;if(H>=0)$=(J.min.x-G.x)*H,Z=(J.max.x-G.x)*H;else $=(J.max.x-G.x)*H,Z=(J.min.x-G.x)*H;if(U>=0)W=(J.min.y-G.y)*U,K=(J.max.y-G.y)*U;else W=(J.max.y-G.y)*U,K=(J.min.y-G.y)*U;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(N>=0)Y=(J.min.z-G.z)*N,X=(J.max.z-G.z)*N;else Y=(J.max.z-G.z)*N,X=(J.min.z-G.z)*N;if($>X||Y>Z)return null;if(Y>$||$!==$)$=Y;if(X<Z||Z!==Z)Z=X;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,v9)!==null}intersectTriangle(J,Q,$,Z,W){fQ.subVectors(Q,J),G6.subVectors($,J),vQ.crossVectors(fQ,G6);let K=this.direction.dot(vQ),Y;if(K>0){if(Z)return null;Y=1}else if(K<0)Y=-1,K=-K;else return null;i9.subVectors(this.origin,J);let X=Y*this.direction.dot(G6.crossVectors(i9,G6));if(X<0)return null;let H=Y*this.direction.dot(fQ.cross(i9));if(H<0)return null;if(X+H>K)return null;let U=-Y*i9.dot(vQ);if(U<0)return null;return this.at(U/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class I9 extends J8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new x0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new b9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var UW=new FJ,H8=new Q7,N6=new S7,GW=new j,q6=new j,F6=new j,D6=new j,hQ=new j,E6=new j,NW=new j,R6=new j;class i0 extends kJ{constructor(J=new nJ,Q=new I9){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let Y=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let Y=this.morphTargetInfluences;if(W&&Y){E6.set(0,0,0);for(let X=0,H=W.length;X<H;X++){let U=Y[X],N=W[X];if(U===0)continue;if(hQ.fromBufferAttribute(N,J),K)E6.addScaledVector(hQ,U);else E6.addScaledVector(hQ.sub(Q),U)}Q.add(E6)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(N6.copy($.boundingSphere),N6.applyMatrix4(W),H8.copy(J.ray).recast(J.near),N6.containsPoint(H8.origin)===!1){if(H8.intersectSphere(N6,GW)===null)return;if(H8.origin.distanceToSquared(GW)>(J.far-J.near)**2)return}if(UW.copy(W).invert(),H8.copy(J.ray).applyMatrix4(UW),$.boundingBox!==null){if(H8.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,H8)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,Y=W.index,X=W.attributes.position,H=W.attributes.uv,U=W.attributes.uv1,N=W.attributes.normal,G=W.groups,q=W.drawRange;if(Y!==null)if(Array.isArray(K))for(let F=0,R=G.length;F<R;F++){let B=G[F],E=K[B.materialIndex],D=Math.max(B.start,q.start),O=Math.min(Y.count,Math.min(B.start+B.count,q.start+q.count));for(let V=D,z=O;V<z;V+=3){let A=Y.getX(V),P=Y.getX(V+1),C=Y.getX(V+2);if(Z=O6(this,E,J,$,H,U,N,A,P,C),Z)Z.faceIndex=Math.floor(V/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let F=Math.max(0,q.start),R=Math.min(Y.count,q.start+q.count);for(let B=F,E=R;B<E;B+=3){let D=Y.getX(B),O=Y.getX(B+1),V=Y.getX(B+2);if(Z=O6(this,K,J,$,H,U,N,D,O,V),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}else if(X!==void 0)if(Array.isArray(K))for(let F=0,R=G.length;F<R;F++){let B=G[F],E=K[B.materialIndex],D=Math.max(B.start,q.start),O=Math.min(X.count,Math.min(B.start+B.count,q.start+q.count));for(let V=D,z=O;V<z;V+=3){let A=V,P=V+1,C=V+2;if(Z=O6(this,E,J,$,H,U,N,A,P,C),Z)Z.faceIndex=Math.floor(V/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let F=Math.max(0,q.start),R=Math.min(X.count,q.start+q.count);for(let B=F,E=R;B<E;B+=3){let D=B,O=B+1,V=B+2;if(Z=O6(this,K,J,$,H,U,N,D,O,V),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}}}function DX(J,Q,$,Z,W,K,Y,X){let H;if(Q.side===1)H=Z.intersectTriangle(Y,K,W,!0,X);else H=Z.intersectTriangle(W,K,Y,Q.side===0,X);if(H===null)return null;R6.copy(X),R6.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(R6);if(U<$.near||U>$.far)return null;return{distance:U,point:R6.clone(),object:J}}function O6(J,Q,$,Z,W,K,Y,X,H,U){J.getVertexPosition(X,q6),J.getVertexPosition(H,F6),J.getVertexPosition(U,D6);let N=DX(J,Q,$,Z,q6,F6,D6,NW);if(N){let G=new j;if(eJ.getBarycoord(NW,q6,F6,D6,G),W)N.uv=eJ.getInterpolatedAttribute(W,X,H,U,G,new B0);if(K)N.uv1=eJ.getInterpolatedAttribute(K,X,H,U,G,new B0);if(Y){if(N.normal=eJ.getInterpolatedAttribute(Y,X,H,U,G,new j),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let q={a:X,b:H,c:U,normal:new j,materialIndex:0};eJ.getNormal(q6,F6,D6,q.normal),N.face=q,N.barycoord=G}return N}class u$ extends CJ{constructor(J=null,Q=1,$=1,Z,W,K,Y,X,H=1003,U=1003,N,G){super(null,K,Y,X,H,U,Z,W,N,G);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var xQ=new j,EX=new j,RX=new j0;class F9{constructor(J=new j(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=xQ.subVectors($,Q).cross(EX.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(xQ),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||RX.getNormalMatrix(J),Z=this.coplanarPoint(xQ).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var U8=new S7,OX=new B0(0.5,0.5),M6=new j;class y7{constructor(J=new F9,Q=new F9,$=new F9,Z=new F9,W=new F9,K=new F9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let Y=this.planes;return Y[0].copy(J),Y[1].copy(Q),Y[2].copy($),Y[3].copy(Z),Y[4].copy(W),Y[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],Y=W[1],X=W[2],H=W[3],U=W[4],N=W[5],G=W[6],q=W[7],F=W[8],R=W[9],B=W[10],E=W[11],D=W[12],O=W[13],V=W[14],z=W[15];if(Z[0].setComponents(H-K,q-U,E-F,z-D).normalize(),Z[1].setComponents(H+K,q+U,E+F,z+D).normalize(),Z[2].setComponents(H+Y,q+N,E+R,z+O).normalize(),Z[3].setComponents(H-Y,q-N,E-R,z-O).normalize(),$)Z[4].setComponents(X,G,B,V).normalize(),Z[5].setComponents(H-X,q-G,E-B,z-V).normalize();else if(Z[4].setComponents(H-X,q-G,E-B,z-V).normalize(),Q===2000)Z[5].setComponents(H+X,q+G,E+B,z+V).normalize();else if(Q===2001)Z[5].setComponents(X,G,B,V).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();U8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();U8.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(U8)}intersectsSprite(J){U8.center.set(0,0,0);let Q=OX.distanceTo(J.center);return U8.radius=0.7071067811865476+Q,U8.applyMatrix4(J.matrixWorld),this.intersectsSphere(U8)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(M6.x=Z.normal.x>0?J.max.x:J.min.x,M6.y=Z.normal.y>0?J.max.y:J.min.y,M6.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(M6)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class m6 extends CJ{constructor(J=[],Q=301,$,Z,W,K,Y,X,H,U){super(J,Q,$,Z,W,K,Y,X,H,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class f7 extends CJ{constructor(J,Q,$,Z,W,K,Y,X,H){super(J,Q,$,Z,W,K,Y,X,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class Q8 extends CJ{constructor(J,Q,$=1014,Z,W,K,Y=1003,X=1003,H,U=1026,N=1){if(U!==1026&&U!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let G={width:J,height:Q,depth:N};super(G,Z,W,K,Y,X,U,$,H);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new P7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class c$ extends Q8{constructor(J,Q=1014,$=301,Z,W,K=1003,Y=1003,X,H=1026){let U={width:J,height:J,depth:1},N=[U,U,U,U,U,U];super(J,J,Q,$,Z,W,K,Y,X,H);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class l6 extends CJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class jJ extends nJ{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let Y=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let X=[],H=[],U=[],N=[],G=0,q=0;F("z","y","x",-1,-1,$,Q,J,K,W,0),F("z","y","x",1,-1,$,Q,-J,K,W,1),F("x","z","y",1,1,J,$,Q,Z,K,2),F("x","z","y",1,-1,J,$,-Q,Z,K,3),F("x","y","z",1,-1,J,Q,$,Z,W,4),F("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(X),this.setAttribute("position",new zJ(H,3)),this.setAttribute("normal",new zJ(U,3)),this.setAttribute("uv",new zJ(N,2));function F(R,B,E,D,O,V,z,A,P,C,_){let k=V/P,l=z/C,w=V/2,m=z/2,c=A/2,f=P+1,d=C+1,b=0,p=0,a=new j;for(let Q0=0;Q0<d;Q0++){let F0=Q0*l-m;for(let I0=0;I0<f;I0++){let M0=I0*k-w;a[R]=M0*D,a[B]=F0*O,a[E]=c,H.push(a.x,a.y,a.z),a[R]=0,a[B]=0,a[E]=A>0?1:-1,U.push(a.x,a.y,a.z),N.push(I0/P),N.push(1-Q0/C),b+=1}}for(let Q0=0;Q0<C;Q0++)for(let F0=0;F0<P;F0++){let I0=G+F0+f*Q0,M0=G+F0+f*(Q0+1),t0=G+(F0+1)+f*(Q0+1),d0=G+(F0+1)+f*Q0;X.push(I0,M0,d0),X.push(M0,t0,d0),p+=6}Y.addGroup(q,p,_),q+=p,G+=b}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new jJ(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class $8 extends nJ{constructor(J=1,Q=1,$=1,Z=32,W=1,K=!1,Y=0,X=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:W,openEnded:K,thetaStart:Y,thetaLength:X};let H=this;Z=Math.floor(Z),W=Math.floor(W);let U=[],N=[],G=[],q=[],F=0,R=[],B=$/2,E=0;if(D(),K===!1){if(J>0)O(!0);if(Q>0)O(!1)}this.setIndex(U),this.setAttribute("position",new zJ(N,3)),this.setAttribute("normal",new zJ(G,3)),this.setAttribute("uv",new zJ(q,2));function D(){let V=new j,z=new j,A=0,P=(Q-J)/$;for(let C=0;C<=W;C++){let _=[],k=C/W,l=k*(Q-J)+J;for(let w=0;w<=Z;w++){let m=w/Z,c=m*X+Y,f=Math.sin(c),d=Math.cos(c);z.x=l*f,z.y=-k*$+B,z.z=l*d,N.push(z.x,z.y,z.z),V.set(f,P,d).normalize(),G.push(V.x,V.y,V.z),q.push(m,1-k),_.push(F++)}R.push(_)}for(let C=0;C<Z;C++)for(let _=0;_<W;_++){let k=R[_][C],l=R[_+1][C],w=R[_+1][C+1],m=R[_][C+1];if(J>0||_!==0)U.push(k,l,m),A+=3;if(Q>0||_!==W-1)U.push(l,w,m),A+=3}H.addGroup(E,A,0),E+=A}function O(V){let z=F,A=new B0,P=new j,C=0,_=V===!0?J:Q,k=V===!0?1:-1;for(let w=1;w<=Z;w++)N.push(0,B*k,0),G.push(0,k,0),q.push(0.5,0.5),F++;let l=F;for(let w=0;w<=Z;w++){let c=w/Z*X+Y,f=Math.cos(c),d=Math.sin(c);P.x=_*d,P.y=B*k,P.z=_*f,N.push(P.x,P.y,P.z),G.push(0,k,0),A.x=f*0.5+0.5,A.y=d*0.5*k+0.5,q.push(A.x,A.y),F++}for(let w=0;w<Z;w++){let m=z+w,c=l+w;if(V===!0)U.push(c,c+1,m);else U.push(c+1,c,m);C+=3}H.addGroup(E,C,V===!0?1:2),E+=C}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new $8(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class O8 extends $8{constructor(J=1,Q=1,$=32,Z=1,W=!1,K=0,Y=Math.PI*2){super(0,J,Q,$,Z,W,K,Y);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:$,heightSegments:Z,openEnded:W,thetaStart:K,thetaLength:Y}}static fromJSON(J){return new O8(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class d6 extends nJ{constructor(J=[],Q=[],$=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:Q,radius:$,detail:Z};let W=[],K=[];if(Y(Z),H($),U(),this.setAttribute("position",new zJ(W,3)),this.setAttribute("normal",new zJ(W.slice(),3)),this.setAttribute("uv",new zJ(K,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function Y(D){let O=new j,V=new j,z=new j;for(let A=0;A<Q.length;A+=3)q(Q[A+0],O),q(Q[A+1],V),q(Q[A+2],z),X(O,V,z,D)}function X(D,O,V,z){let A=z+1,P=[];for(let C=0;C<=A;C++){P[C]=[];let _=D.clone().lerp(V,C/A),k=O.clone().lerp(V,C/A),l=A-C;for(let w=0;w<=l;w++)if(w===0&&C===A)P[C][w]=_;else P[C][w]=_.clone().lerp(k,w/l)}for(let C=0;C<A;C++)for(let _=0;_<2*(A-C)-1;_++){let k=Math.floor(_/2);if(_%2===0)G(P[C][k+1]),G(P[C+1][k]),G(P[C][k]);else G(P[C][k+1]),G(P[C+1][k+1]),G(P[C+1][k])}}function H(D){let O=new j;for(let V=0;V<W.length;V+=3)O.x=W[V+0],O.y=W[V+1],O.z=W[V+2],O.normalize().multiplyScalar(D),W[V+0]=O.x,W[V+1]=O.y,W[V+2]=O.z}function U(){let D=new j;for(let O=0;O<W.length;O+=3){D.x=W[O+0],D.y=W[O+1],D.z=W[O+2];let V=B(D)/2/Math.PI+0.5,z=E(D)/Math.PI+0.5;K.push(V,1-z)}F(),N()}function N(){for(let D=0;D<K.length;D+=6){let O=K[D+0],V=K[D+2],z=K[D+4],A=Math.max(O,V,z),P=Math.min(O,V,z);if(A>0.9&&P<0.1){if(O<0.2)K[D+0]+=1;if(V<0.2)K[D+2]+=1;if(z<0.2)K[D+4]+=1}}}function G(D){W.push(D.x,D.y,D.z)}function q(D,O){let V=D*3;O.x=J[V+0],O.y=J[V+1],O.z=J[V+2]}function F(){let D=new j,O=new j,V=new j,z=new j,A=new B0,P=new B0,C=new B0;for(let _=0,k=0;_<W.length;_+=9,k+=6){D.set(W[_+0],W[_+1],W[_+2]),O.set(W[_+3],W[_+4],W[_+5]),V.set(W[_+6],W[_+7],W[_+8]),A.set(K[k+0],K[k+1]),P.set(K[k+2],K[k+3]),C.set(K[k+4],K[k+5]),z.copy(D).add(O).add(V).divideScalar(3);let l=B(z);R(A,k+0,D,l),R(P,k+2,O,l),R(C,k+4,V,l)}}function R(D,O,V,z){if(z<0&&D.x===1)K[O]=D.x-1;if(V.x===0&&V.z===0)K[O]=z/2/Math.PI+0.5}function B(D){return Math.atan2(D.z,-D.x)}function E(D){return Math.atan2(-D.y,Math.sqrt(D.x*D.x+D.z*D.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new d6(J.vertices,J.indices,J.radius,J.detail)}}class v7 extends d6{constructor(J=1,Q=0){let $=(1+Math.sqrt(5))/2,Z=[-1,$,0,1,$,0,-1,-$,0,1,-$,0,0,-1,$,0,1,$,0,-1,-$,0,1,-$,$,0,-1,$,0,1,-$,0,-1,-$,0,1],W=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(Z,W,J,Q);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new v7(J.radius,J.detail)}}class A9 extends nJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,Y=Math.floor($),X=Math.floor(Z),H=Y+1,U=X+1,N=J/Y,G=Q/X,q=[],F=[],R=[],B=[];for(let E=0;E<U;E++){let D=E*G-K;for(let O=0;O<H;O++){let V=O*N-W;F.push(V,-D,0),R.push(0,0,1),B.push(O/Y),B.push(1-E/X)}}for(let E=0;E<X;E++)for(let D=0;D<Y;D++){let O=D+H*E,V=D+H*(E+1),z=D+1+H*(E+1),A=D+1+H*E;q.push(O,V,A),q.push(V,z,A)}this.setIndex(q),this.setAttribute("position",new zJ(F,3)),this.setAttribute("normal",new zJ(R,3)),this.setAttribute("uv",new zJ(B,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new A9(J.width,J.height,J.widthSegments,J.heightSegments)}}class $7 extends nJ{constructor(J=0.5,Q=1,$=32,Z=1,W=0,K=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:$,phiSegments:Z,thetaStart:W,thetaLength:K},$=Math.max(3,$),Z=Math.max(1,Z);let Y=[],X=[],H=[],U=[],N=J,G=(Q-J)/Z,q=new j,F=new B0;for(let R=0;R<=Z;R++){for(let B=0;B<=$;B++){let E=W+B/$*K;q.x=N*Math.cos(E),q.y=N*Math.sin(E),X.push(q.x,q.y,q.z),H.push(0,0,1),F.x=(q.x/Q+1)/2,F.y=(q.y/Q+1)/2,U.push(F.x,F.y)}N+=G}for(let R=0;R<Z;R++){let B=R*($+1);for(let E=0;E<$;E++){let D=E+B,O=D,V=D+$+1,z=D+$+2,A=D+1;Y.push(O,V,A),Y.push(V,z,A)}}this.setIndex(Y),this.setAttribute("position",new zJ(X,3)),this.setAttribute("normal",new zJ(H,3)),this.setAttribute("uv",new zJ(U,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new $7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}function M8(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(qW(W))if(W.isRenderTargetTexture)A0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(qW(W[0])){let K=[];for(let Y=0,X=W.length;Y<X;Y++)K[Y]=W[Y].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function xJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=M8(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function qW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function MX(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function n$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return c0.workingColorSpace}var BK={clone:M8,merge:xJ},_X=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,VX=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class X9 extends J8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_X,this.fragmentShader=VX,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=M8(J.uniforms),this.uniformsGroups=MX(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}}class s$ extends X9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _J extends J8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new x0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new x0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new b9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class i$ extends J8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class o$ extends J8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function _6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class _8{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let Y=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===Y)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let Y=Q[1];if(J<Y)$=2,W=Y;for(let X=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===X)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let Y=$+K>>>1;if(J<Q[Y])K=Y;else $=Y+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class a$ extends _8{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,Y=Z[W],X=Z[K];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,Y=2*Q-$;break;case 2402:W=Z.length-2,Y=Q+Z[W]-Z[W+1];break;default:W=J,Y=$}if(X===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,X=2*$-Q;break;case 2402:K=1,X=$+Z[1]-Z[0];break;default:K=J-1,X=Q}let H=($-Q)*0.5,U=this.valueSize;this._weightPrev=H/(Q-Y),this._weightNext=H/(X-$),this._offsetPrev=W*U,this._offsetNext=K*U}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,U=this._offsetPrev,N=this._offsetNext,G=this._weightPrev,q=this._weightNext,F=($-Q)/(Z-Q),R=F*F,B=R*F,E=-G*B+2*G*R-G*F,D=(1+G)*B+(-1.5-2*G)*R+(-0.5+G)*F+1,O=(-1-q)*B+(1.5+q)*R+0.5*F,V=q*B-q*R;for(let z=0;z!==Y;++z)W[z]=E*K[U+z]+D*K[H+z]+O*K[X+z]+V*K[N+z];return W}}class r$ extends _8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,U=($-Q)/(Z-Q),N=1-U;for(let G=0;G!==Y;++G)W[G]=K[H+G]*N+K[X+G]*U;return W}}class t$ extends _8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class e$ extends _8{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,U=this.settings||this.DefaultSettings_,N=U.inTangents,G=U.outTangents;if(!N||!G){let R=($-Q)/(Z-Q),B=1-R;for(let E=0;E!==Y;++E)W[E]=K[H+E]*B+K[X+E]*R;return W}let q=Y*2,F=J-1;for(let R=0;R!==Y;++R){let B=K[H+R],E=K[X+R],D=F*q+R*2,O=G[D],V=G[D+1],z=J*q+R*2,A=N[z],P=N[z+1],C=($-Q)/(Z-Q),_,k,l,w,m;for(let c=0;c<8;c++){_=C*C,k=_*C,l=1-C,w=l*l,m=w*l;let d=m*Q+3*w*C*O+3*l*_*A+k*Z-$;if(Math.abs(d)<0.0000000001)break;let b=3*w*(O-Q)+6*l*C*(A-O)+3*_*(Z-A);if(Math.abs(b)<0.0000000001)break;C=C-d/b,C=Math.max(0,Math.min(1,C))}W[R]=m*B+3*w*C*V+3*l*_*P+k*E}return W}}class H9{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=_6(Q,this.TimeBufferType),this.values=_6($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:_6(J.times,Array),values:_6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new t$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new r$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new a$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new e$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.settings=this.settings;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return A0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let Y=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*Y,K*Y)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)C0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)C0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let Y=0;Y!==W;Y++){let X=$[Y];if(typeof X==="number"&&isNaN(X)){C0("KeyframeTrack: Time is not a valid number.",this,Y,X),J=!1;break}if(K!==null&&K>X){C0("KeyframeTrack: Out of order keys.",this,Y,X,K),J=!1;break}K=X}if(Z!==void 0){if(xY(Z))for(let Y=0,X=Z.length;Y!==X;++Y){let H=Z[Y];if(isNaN(H)){C0("KeyframeTrack: Value is not a valid number.",this,Y,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let Y=1;Y<W;++Y){let X=!1,H=J[Y],U=J[Y+1];if(H!==U&&(Y!==1||H!==J[0]))if(!Z){let N=Y*$,G=N-$,q=N+$;for(let F=0;F!==$;++F){let R=Q[N+F];if(R!==Q[G+F]||R!==Q[q+F]){X=!0;break}}}else X=!0;if(X){if(Y!==K){J[K]=J[Y];let N=Y*$,G=K*$;for(let q=0;q!==$;++q)Q[G+q]=Q[N+q]}++K}}if(W>0){J[K]=J[W];for(let Y=W*$,X=K*$,H=0;H!==$;++H)Q[X+H]=Q[Y+H];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}H9.prototype.ValueTypeName="";H9.prototype.TimeBufferType=Float32Array;H9.prototype.ValueBufferType=Float32Array;H9.prototype.DefaultInterpolation=2301;class V8 extends H9{constructor(J,Q,$){super(J,Q,$)}}V8.prototype.ValueTypeName="bool";V8.prototype.ValueBufferType=Array;V8.prototype.DefaultInterpolation=2300;V8.prototype.InterpolantFactoryMethodLinear=void 0;V8.prototype.InterpolantFactoryMethodSmooth=void 0;class JZ extends H9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}JZ.prototype.ValueTypeName="color";class QZ extends H9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}QZ.prototype.ValueTypeName="number";class $Z extends _8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=($-Q)/(Z-Q),H=J*Y;for(let U=H+Y;H!==U;H+=4)K9.slerpFlat(W,0,K,H-Y,K,H,X);return W}}class u6 extends H9{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new $Z(this.times,this.values,this.getValueSize(),J)}}u6.prototype.ValueTypeName="quaternion";u6.prototype.InterpolantFactoryMethodSmooth=void 0;class L8 extends H9{constructor(J,Q,$){super(J,Q,$)}}L8.prototype.ValueTypeName="string";L8.prototype.ValueBufferType=Array;L8.prototype.DefaultInterpolation=2300;L8.prototype.InterpolantFactoryMethodLinear=void 0;L8.prototype.InterpolantFactoryMethodSmooth=void 0;class ZZ extends H9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}ZZ.prototype.ValueTypeName="vector";var B6={enabled:!1,files:{},add:function(J,Q){if(this.enabled===!1)return;if(FW(J))return;this.files[J]=Q},get:function(J){if(this.enabled===!1)return;if(FW(J))return;return this.files[J]},remove:function(J){delete this.files[J]},clear:function(){this.files={}}};function FW(J){try{let Q=J.slice(J.indexOf(":")+1);return new URL(Q).protocol==="blob:"}catch(Q){return!1}}class WZ{constructor(J,Q,$){let Z=this,W=!1,K=0,Y=0,X=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(Y++,W===!1){if(Z.onStart!==void 0)Z.onStart(U,K,Y)}W=!0},this.itemEnd=function(U){if(K++,Z.onProgress!==void 0)Z.onProgress(U,K,Y);if(K===Y){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(X)return X(U);return U},this.setURLModifier=function(U){return X=U,this},this.addHandler=function(U,N){return H.push(U,N),this},this.removeHandler=function(U){let N=H.indexOf(U);if(N!==-1)H.splice(N,2);return this},this.getHandler=function(U){for(let N=0,G=H.length;N<G;N+=2){let q=H[N],F=H[N+1];if(q.global)q.lastIndex=0;if(q.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var zK=new WZ;class h7{constructor(J){if(this.manager=J!==void 0?J:zK,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}h7.DEFAULT_MATERIAL_NAME="__DEFAULT";var l8=new WeakMap;class KZ extends h7{constructor(J){super(J)}load(J,Q,$,Z){if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,K=B6.get(`image:${J}`);if(K!==void 0){if(K.complete===!0)W.manager.itemStart(J),setTimeout(function(){if(Q)Q(K);W.manager.itemEnd(J)},0);else{let N=l8.get(K);if(N===void 0)N=[],l8.set(K,N);N.push({onLoad:Q,onError:Z})}return K}let Y=n8("img");function X(){if(U(),Q)Q(this);let N=l8.get(this)||[];for(let G=0;G<N.length;G++){let q=N[G];if(q.onLoad)q.onLoad(this)}l8.delete(this),W.manager.itemEnd(J)}function H(N){if(U(),Z)Z(N);B6.remove(`image:${J}`);let G=l8.get(this)||[];for(let q=0;q<G.length;q++){let F=G[q];if(F.onError)F.onError(N)}l8.delete(this),W.manager.itemError(J),W.manager.itemEnd(J)}function U(){Y.removeEventListener("load",X,!1),Y.removeEventListener("error",H,!1)}if(Y.addEventListener("load",X,!1),Y.addEventListener("error",H,!1),J.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)Y.crossOrigin=this.crossOrigin}return B6.add(`image:${J}`,Y),W.manager.itemStart(J),Y.src=J,Y}}class c6 extends h7{constructor(J){super(J)}load(J,Q,$,Z){let W=new CJ,K=new KZ(this.manager);return K.setCrossOrigin(this.crossOrigin),K.setPath(this.path),K.load(J,function(Y){if(W.image=Y,W.needsUpdate=!0,Q!==void 0)Q(W)},$,Z),W}}class x7 extends kJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new x0(J),this.intensity=Q}dispose(){this.dispatchEvent({type:"dispose"})}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class n6 extends x7{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new x0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var bQ=new FJ,DW=new j,EW=new j;class kK{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new FJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new y7,this._frameExtents=new B0(1,1),this._viewportCount=1,this._viewports=[new EJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera,$=this.matrix;if(DW.setFromMatrixPosition(J.matrixWorld),Q.position.copy(DW),EW.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(EW),Q.updateMatrixWorld(),bQ.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bQ,Q.coordinateSystem,Q.reversedDepth),Q.coordinateSystem===2001||Q.reversedDepth)$.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else $.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);$.multiply(bQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.intensity!==1)J.intensity=this.intensity;if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var V6=new j,L6=new K9,L9=new j;class s6 extends kJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new FJ,this.projectionMatrix=new FJ,this.projectionMatrixInverse=new FJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(V6,L6,L9),L9.x===1&&L9.y===1&&L9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(V6,L6,L9.set(1,1,1)).invert()}updateWorldMatrix(J,Q){if(super.updateWorldMatrix(J,Q),this.matrixWorld.decompose(V6,L6,L9),L9.x===1&&L9.y===1&&L9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(V6,L6,L9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var o9=new j,RW=new B0,OW=new B0;class pJ extends s6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=i8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(R7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return i8*2*Math.atan(Math.tan(R7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){o9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(o9.x,o9.y).multiplyScalar(-J/o9.z),o9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(o9.x,o9.y).multiplyScalar(-J/o9.z)}getViewSize(J,Q){return this.getViewBounds(J,RW,OW),Q.subVectors(OW,RW)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(R7*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:X,fullHeight:H}=K;W+=K.offsetX*Z/X,Q-=K.offsetY*$/H,Z*=K.width/X,$*=K.height/H}let Y=this.filmOffset;if(Y!==0)W+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class b7 extends s6{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,Y=Z+Q,X=Z-Q;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=H*this.view.offsetX,K=W+H*this.view.width,Y-=U*this.view.offsetY,X=Y-U*this.view.height}this.projectionMatrix.makeOrthographic(W,K,Y,X,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class IK extends kK{constructor(){super(new b7(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class i6 extends x7{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kJ.DEFAULT_UP),this.updateMatrix(),this.target=new kJ,this.shadow=new IK}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class o6 extends x7{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var d8=-90,u8=1;class YZ extends kJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new pJ(d8,u8,J,Q);Z.layers=this.layers,this.add(Z);let W=new pJ(d8,u8,J,Q);W.layers=this.layers,this.add(W);let K=new pJ(d8,u8,J,Q);K.layers=this.layers,this.add(K);let Y=new pJ(d8,u8,J,Q);Y.layers=this.layers,this.add(Y);let X=new pJ(d8,u8,J,Q);X.layers=this.layers,this.add(X);let H=new pJ(d8,u8,J,Q);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,Y,X]=Q;for(let H of Q)this.remove(H);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),X.up.set(0,1,0),X.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),X.up.set(0,-1,0),X.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of Q)this.add(H),H.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,Y,X,H,U]=this.children,N=J.getRenderTarget(),G=J.getActiveCubeFace(),q=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let R=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let B=!1;if(J.isWebGLRenderer===!0)B=J.state.buffers.depth.getReversed();else B=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,3,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),J.setRenderTarget($,4,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),$.texture.generateMipmaps=R,J.setRenderTarget($,5,Z),B&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(N,G,q),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class XZ extends pJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var HZ="\\[\\]\\.:\\/",LX=new RegExp("["+HZ+"]","g"),UZ="[^"+HZ+"]",BX="[^"+HZ.replace("\\.","")+"]",zX=/((?:WC+[\/:])*)/.source.replace("WC",UZ),kX=/(WCOD+)?/.source.replace("WCOD",BX),IX=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",UZ),AX=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",UZ),PX=new RegExp("^"+zX+kX+IX+AX+"$"),wX=["material","materials","bones","map"];class AK{constructor(J,Q,$){let Z=$||JJ.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class JJ{constructor(J,Q,$){this.path=Q,this.parsedPath=$||JJ.parseTrackName(Q),this.node=JJ.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new JJ(J,Q,$);else return new JJ.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(LX,"")}static parseTrackName(J){let Q=PX.exec(J);if(Q===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(wX.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let Y=W[K];if(Y.name===Q||Y.uuid===Q)return Y;let X=$(Y.children);if(X)return X}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=JJ.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){A0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let H=Q.objectIndex;switch($){case"materials":if(!J.material){C0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){C0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){C0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===H){H=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){C0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){C0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){C0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(H!==void 0){if(J[H]===void 0){C0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let K=J[Z];if(K===void 0){let H=Q.nodeName;C0("PropertyBinding: Trying to update property for track: "+H+"."+Z+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)Y=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)Y=this.Versioning.MatrixWorldNeedsUpdate;let X=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){C0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){C0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}X=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)X=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))X=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[X],this.setValue=this.SetterByBindingTypeAndVersioning[X][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}JJ.Composite=AK;JJ.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};JJ.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};JJ.prototype.GetterByBindingType=[JJ.prototype._getValue_direct,JJ.prototype._getValue_array,JJ.prototype._getValue_arrayElement,JJ.prototype._getValue_toArray];JJ.prototype.SetterByBindingTypeAndVersioning=[[JJ.prototype._setValue_direct,JJ.prototype._setValue_direct_setNeedsUpdate,JJ.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[JJ.prototype._setValue_array,JJ.prototype._setValue_array_setNeedsUpdate,JJ.prototype._setValue_array_setMatrixWorldNeedsUpdate],[JJ.prototype._setValue_arrayElement,JJ.prototype._setValue_arrayElement_setNeedsUpdate,JJ.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[JJ.prototype._setValue_fromArray,JJ.prototype._setValue_fromArray_setNeedsUpdate,JJ.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var oN=new Float32Array(1);var MW=new FJ;class a6{constructor(J,Q,$=0,Z=1/0){this.ray=new Q7(J,Q),this.near=$,this.far=Z,this.camera=null,this.layers=new w7,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,Q){this.ray.set(J,Q)}setFromCamera(J,Q){if(Q.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(Q.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject(Q).sub(this.ray.origin).normalize(),this.camera=Q;else if(Q.isOrthographicCamera)this.ray.origin.set(J.x,J.y,(Q.near+Q.far)/(Q.near-Q.far)).unproject(Q),this.ray.direction.set(0,0,-1).transformDirection(Q.matrixWorld),this.camera=Q;else C0("Raycaster: Unsupported camera type: "+Q.type)}setFromXRController(J){return MW.identity().extractRotation(J.matrixWorld),this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(MW),this}intersectObject(J,Q=!0,$=[]){return gQ(J,this,$,Q),$.sort(_W),$}intersectObjects(J,Q=!0,$=[]){for(let Z=0,W=J.length;Z<W;Z++)gQ(J[Z],this,$,Q);return $.sort(_W),$}}function _W(J,Q){return J.distance-Q.distance}function gQ(J,Q,$,Z){let W=!0;if(J.layers.test(Q.layers)){if(J.raycast(Q,$)===!1)W=!1}if(W===!0&&Z===!0){let K=J.children;for(let Y=0,X=K.length;Y<X;Y++)gQ(K[Y],Q,$,!0)}}class r6{constructor(J=!0){this.autoStart=J,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,A0("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let J=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let Q=performance.now();J=(Q-this.oldTime)/1000,this.oldTime=Q,this.elapsedTime+=J}return J}}class g7{constructor(J=1,Q=0,$=0){this.radius=J,this.phi=Q,this.theta=$}set(J,Q,$){return this.radius=J,this.phi=Q,this.theta=$,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=l0(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,Q,$){if(this.radius=Math.sqrt(J*J+Q*Q+$*$),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,$),this.phi=Math.acos(l0(Q/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}class GZ{static{GZ.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}class t6 extends k9{constructor(J,Q=null){super();this.object=J,this.domElement=Q,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(J){if(J===void 0){A0("Controls: connect() now requires an element.");return}if(this.domElement!==null)this.disconnect();this.domElement=J}disconnect(){}dispose(){}update(){}}function NZ(J,Q,$,Z){let W=CX(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function CX(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));if(typeof window<"u")if(window.__THREE__)A0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="184";function oK(){let J=null,Q=!1,$=null,Z=null;function W(K,Y){$(K,Y),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function TX(J){let Q=new WeakMap;function $(X,H){let{array:U,usage:N}=X,G=U.byteLength,q=J.createBuffer();J.bindBuffer(H,q),J.bufferData(H,U,N),X.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(X.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:q,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:X.version,size:G}}function Z(X,H,U){let{array:N,updateRanges:G}=H;if(J.bindBuffer(U,X),G.length===0)J.bufferSubData(U,0,N);else{G.sort((F,R)=>F.start-R.start);let q=0;for(let F=1;F<G.length;F++){let R=G[q],B=G[F];if(B.start<=R.start+R.count+1)R.count=Math.max(R.count,B.start+B.count-R.start);else++q,G[q]=B}G.length=q+1;for(let F=0,R=G.length;F<R;F++){let B=G[F];J.bufferSubData(U,B.start*N.BYTES_PER_ELEMENT,N,B.start,B.count)}H.clearUpdateRanges()}H.onUploadCallback()}function W(X){if(X.isInterleavedBufferAttribute)X=X.data;return Q.get(X)}function K(X){if(X.isInterleavedBufferAttribute)X=X.data;let H=Q.get(X);if(H)J.deleteBuffer(H.buffer),Q.delete(X)}function Y(X,H){if(X.isInterleavedBufferAttribute)X=X.data;if(X.isGLBufferAttribute){let N=Q.get(X);if(!N||N.version<X.version)Q.set(X,{buffer:X.buffer,type:X.type,bytesPerElement:X.elementSize,version:X.version});return}let U=Q.get(X);if(U===void 0)Q.set(X,$(X,H));else if(U.version<X.version){if(U.size!==X.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,X,H),U.version=X.version}}return{get:W,remove:K,update:Y}}var SX=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jX=`#ifdef USE_ALPHAHASH
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
#endif`,yX=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fX=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vX=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hX=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xX=`#ifdef USE_AOMAP
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
#endif`,bX=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gX=`#ifdef USE_BATCHING
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
#endif`,pX=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mX=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lX=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uX=`#ifdef USE_IRIDESCENCE
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
#endif`,cX=`#ifdef USE_BUMPMAP
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
#endif`,nX=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,sX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,oX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,eX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,JH=`#define PI 3.141592653589793
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
} // validated`,QH=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$H=`vec3 transformedNormal = objectNormal;
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
#endif`,ZH=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,WH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,KH=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,YH=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,XH="gl_FragColor = linearToOutputTexel( gl_FragColor );",HH=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,UH=`#ifdef USE_ENVMAP
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
#endif`,GH=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,NH=`#ifdef USE_ENVMAP
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
#endif`,qH=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,FH=`#ifdef USE_ENVMAP
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
#endif`,DH=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,EH=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,RH=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,OH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,MH=`#ifdef USE_GRADIENTMAP
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
}`,_H=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,VH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,BH=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zH=`#ifdef USE_ENVMAP
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
#endif`,kH=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,IH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,AH=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wH=`PhysicalMaterial material;
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
#endif`,CH=`uniform sampler2D dfgLUT;
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
}`,TH=`
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
#endif`,SH=`#if defined( RE_IndirectDiffuse )
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
#endif`,jH=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yH=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,fH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bH=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gH=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pH=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,mH=`#if defined( USE_POINTS_UV )
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
#endif`,lH=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dH=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uH=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cH=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nH=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sH=`#ifdef USE_MORPHTARGETS
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
#endif`,iH=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,oH=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,aH=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eH=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,JU=`#ifdef USE_NORMALMAP
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
#endif`,QU=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$U=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ZU=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,WU=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,KU=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,YU=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,XU=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,HU=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,UU=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,GU=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,NU=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qU=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,FU=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,DU=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,EU=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,RU=`float getShadowMask() {
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
}`,OU=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MU=`#ifdef USE_SKINNING
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
#endif`,_U=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,VU=`#ifdef USE_SKINNING
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
#endif`,LU=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,BU=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zU=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kU=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,IU=`#ifdef USE_TRANSMISSION
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
#endif`,AU=`#ifdef USE_TRANSMISSION
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
#endif`,PU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,TU=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,SU=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jU=`uniform sampler2D t2D;
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
}`,yU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fU=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hU=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xU=`#include <common>
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
}`,bU=`#if DEPTH_PACKING == 3200
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
}`,gU=`#define DISTANCE
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
}`,pU=`#define DISTANCE
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
}`,mU=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lU=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dU=`uniform float scale;
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
}`,uU=`uniform vec3 diffuse;
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
}`,cU=`#include <common>
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
}`,nU=`uniform vec3 diffuse;
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
}`,sU=`#define LAMBERT
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
}`,iU=`#define LAMBERT
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
}`,oU=`#define MATCAP
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
}`,aU=`#define MATCAP
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
}`,rU=`#define NORMAL
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
}`,tU=`#define NORMAL
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
}`,eU=`#define PHONG
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
}`,JG=`#define PHONG
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
}`,QG=`#define STANDARD
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
}`,$G=`#define STANDARD
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
}`,ZG=`#define TOON
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
}`,WG=`#define TOON
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
}`,KG=`uniform float size;
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
}`,YG=`uniform vec3 diffuse;
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
}`,XG=`#include <common>
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
}`,HG=`uniform vec3 color;
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
}`,UG=`uniform float rotation;
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
}`,GG=`uniform vec3 diffuse;
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
}`,b0={alphahash_fragment:SX,alphahash_pars_fragment:jX,alphamap_fragment:yX,alphamap_pars_fragment:fX,alphatest_fragment:vX,alphatest_pars_fragment:hX,aomap_fragment:xX,aomap_pars_fragment:bX,batching_pars_vertex:gX,batching_vertex:pX,begin_vertex:mX,beginnormal_vertex:lX,bsdfs:dX,iridescence_fragment:uX,bumpmap_pars_fragment:cX,clipping_planes_fragment:nX,clipping_planes_pars_fragment:sX,clipping_planes_pars_vertex:iX,clipping_planes_vertex:oX,color_fragment:aX,color_pars_fragment:rX,color_pars_vertex:tX,color_vertex:eX,common:JH,cube_uv_reflection_fragment:QH,defaultnormal_vertex:$H,displacementmap_pars_vertex:ZH,displacementmap_vertex:WH,emissivemap_fragment:KH,emissivemap_pars_fragment:YH,colorspace_fragment:XH,colorspace_pars_fragment:HH,envmap_fragment:UH,envmap_common_pars_fragment:GH,envmap_pars_fragment:NH,envmap_pars_vertex:qH,envmap_physical_pars_fragment:zH,envmap_vertex:FH,fog_vertex:DH,fog_pars_vertex:EH,fog_fragment:RH,fog_pars_fragment:OH,gradientmap_pars_fragment:MH,lightmap_pars_fragment:_H,lights_lambert_fragment:VH,lights_lambert_pars_fragment:LH,lights_pars_begin:BH,lights_toon_fragment:kH,lights_toon_pars_fragment:IH,lights_phong_fragment:AH,lights_phong_pars_fragment:PH,lights_physical_fragment:wH,lights_physical_pars_fragment:CH,lights_fragment_begin:TH,lights_fragment_maps:SH,lights_fragment_end:jH,lightprobes_pars_fragment:yH,logdepthbuf_fragment:fH,logdepthbuf_pars_fragment:vH,logdepthbuf_pars_vertex:hH,logdepthbuf_vertex:xH,map_fragment:bH,map_pars_fragment:gH,map_particle_fragment:pH,map_particle_pars_fragment:mH,metalnessmap_fragment:lH,metalnessmap_pars_fragment:dH,morphinstance_vertex:uH,morphcolor_vertex:cH,morphnormal_vertex:nH,morphtarget_pars_vertex:sH,morphtarget_vertex:iH,normal_fragment_begin:oH,normal_fragment_maps:aH,normal_pars_fragment:rH,normal_pars_vertex:tH,normal_vertex:eH,normalmap_pars_fragment:JU,clearcoat_normal_fragment_begin:QU,clearcoat_normal_fragment_maps:$U,clearcoat_pars_fragment:ZU,iridescence_pars_fragment:WU,opaque_fragment:KU,packing:YU,premultiplied_alpha_fragment:XU,project_vertex:HU,dithering_fragment:UU,dithering_pars_fragment:GU,roughnessmap_fragment:NU,roughnessmap_pars_fragment:qU,shadowmap_pars_fragment:FU,shadowmap_pars_vertex:DU,shadowmap_vertex:EU,shadowmask_pars_fragment:RU,skinbase_vertex:OU,skinning_pars_vertex:MU,skinning_vertex:_U,skinnormal_vertex:VU,specularmap_fragment:LU,specularmap_pars_fragment:BU,tonemapping_fragment:zU,tonemapping_pars_fragment:kU,transmission_fragment:IU,transmission_pars_fragment:AU,uv_pars_fragment:PU,uv_pars_vertex:wU,uv_vertex:CU,worldpos_vertex:TU,background_vert:SU,background_frag:jU,backgroundCube_vert:yU,backgroundCube_frag:fU,cube_vert:vU,cube_frag:hU,depth_vert:xU,depth_frag:bU,distance_vert:gU,distance_frag:pU,equirect_vert:mU,equirect_frag:lU,linedashed_vert:dU,linedashed_frag:uU,meshbasic_vert:cU,meshbasic_frag:nU,meshlambert_vert:sU,meshlambert_frag:iU,meshmatcap_vert:oU,meshmatcap_frag:aU,meshnormal_vert:rU,meshnormal_frag:tU,meshphong_vert:eU,meshphong_frag:JG,meshphysical_vert:QG,meshphysical_frag:$G,meshtoon_vert:ZG,meshtoon_frag:WG,points_vert:KG,points_frag:YG,shadow_vert:XG,shadow_frag:HG,sprite_vert:UG,sprite_frag:GG},X0={common:{diffuse:{value:new x0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new j0},alphaMap:{value:null},alphaMapTransform:{value:new j0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new j0}},envmap:{envMap:{value:null},envMapRotation:{value:new j0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new j0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new j0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new j0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new j0},normalScale:{value:new B0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new j0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new j0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new j0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new j0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new x0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new x0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new j0},alphaTest:{value:0},uvTransform:{value:new j0}},sprite:{diffuse:{value:new x0(16777215)},opacity:{value:1},center:{value:new B0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new j0},alphaMap:{value:null},alphaMapTransform:{value:new j0},alphaTest:{value:0}}},w9={basic:{uniforms:xJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.fog]),vertexShader:b0.meshbasic_vert,fragmentShader:b0.meshbasic_frag},lambert:{uniforms:xJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,X0.lights,{emissive:{value:new x0(0)},envMapIntensity:{value:1}}]),vertexShader:b0.meshlambert_vert,fragmentShader:b0.meshlambert_frag},phong:{uniforms:xJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,X0.lights,{emissive:{value:new x0(0)},specular:{value:new x0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:b0.meshphong_vert,fragmentShader:b0.meshphong_frag},standard:{uniforms:xJ([X0.common,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.roughnessmap,X0.metalnessmap,X0.fog,X0.lights,{emissive:{value:new x0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:b0.meshphysical_vert,fragmentShader:b0.meshphysical_frag},toon:{uniforms:xJ([X0.common,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.gradientmap,X0.fog,X0.lights,{emissive:{value:new x0(0)}}]),vertexShader:b0.meshtoon_vert,fragmentShader:b0.meshtoon_frag},matcap:{uniforms:xJ([X0.common,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,{matcap:{value:null}}]),vertexShader:b0.meshmatcap_vert,fragmentShader:b0.meshmatcap_frag},points:{uniforms:xJ([X0.points,X0.fog]),vertexShader:b0.points_vert,fragmentShader:b0.points_frag},dashed:{uniforms:xJ([X0.common,X0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:b0.linedashed_vert,fragmentShader:b0.linedashed_frag},depth:{uniforms:xJ([X0.common,X0.displacementmap]),vertexShader:b0.depth_vert,fragmentShader:b0.depth_frag},normal:{uniforms:xJ([X0.common,X0.bumpmap,X0.normalmap,X0.displacementmap,{opacity:{value:1}}]),vertexShader:b0.meshnormal_vert,fragmentShader:b0.meshnormal_frag},sprite:{uniforms:xJ([X0.sprite,X0.fog]),vertexShader:b0.sprite_vert,fragmentShader:b0.sprite_frag},background:{uniforms:{uvTransform:{value:new j0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:b0.background_vert,fragmentShader:b0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new j0}},vertexShader:b0.backgroundCube_vert,fragmentShader:b0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:b0.cube_vert,fragmentShader:b0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:b0.equirect_vert,fragmentShader:b0.equirect_frag},distance:{uniforms:xJ([X0.common,X0.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:b0.distance_vert,fragmentShader:b0.distance_frag},shadow:{uniforms:xJ([X0.lights,X0.fog,{color:{value:new x0(0)},opacity:{value:1}}]),vertexShader:b0.shadow_vert,fragmentShader:b0.shadow_frag}};w9.physical={uniforms:xJ([w9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new j0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new j0},clearcoatNormalScale:{value:new B0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new j0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new j0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new j0},sheen:{value:0},sheenColor:{value:new x0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new j0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new j0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new j0},transmissionSamplerSize:{value:new B0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new j0},attenuationDistance:{value:0},attenuationColor:{value:new x0(0)},specularColor:{value:new x0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new j0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new j0},anisotropyVector:{value:new B0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new j0}}]),vertexShader:b0.meshphysical_vert,fragmentShader:b0.meshphysical_frag};var e6={r:0,b:0,g:0},NG=new FJ,aK=new j0;aK.set(-1,0,0,0,1,0,0,0,1);function qG(J,Q,$,Z,W,K){let Y=new x0(0),X=W===!0?0:1,H,U,N=null,G=0,q=null;function F(O){let V=O.isScene===!0?O.background:null;if(V&&V.isTexture){let z=O.backgroundBlurriness>0;V=Q.get(V,z)}return V}function R(O){let V=!1,z=F(O);if(z===null)E(Y,X);else if(z&&z.isColor)E(z,1),V=!0;let A=J.xr.getEnvironmentBlendMode();if(A==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(A==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||V)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function B(O,V){let z=F(V);if(z&&(z.isCubeTexture||z.mapping===z7)){if(U===void 0)U=new i0(new jJ(1,1,1),new X9({name:"BackgroundCubeMaterial",uniforms:M8(w9.backgroundCube.uniforms),vertexShader:w9.backgroundCube.vertexShader,fragmentShader:w9.backgroundCube.fragmentShader,side:dJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(A,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=z,U.material.uniforms.backgroundBlurriness.value=V.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(NG.makeRotationFromEuler(V.backgroundRotation)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(aK);if(U.material.toneMapped=c0.getTransfer(z.colorSpace)!==HJ,N!==z||G!==z.version||q!==J.toneMapping)U.material.needsUpdate=!0,N=z,G=z.version,q=J.toneMapping;U.layers.enableAll(),O.unshift(U,U.geometry,U.material,0,0,null)}else if(z&&z.isTexture){if(H===void 0)H=new i0(new A9(2,2),new X9({name:"BackgroundMaterial",uniforms:M8(w9.background.uniforms),vertexShader:w9.background.vertexShader,fragmentShader:w9.background.fragmentShader,side:a8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),H.geometry.deleteAttribute("normal"),Object.defineProperty(H.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(H);if(H.material.uniforms.t2D.value=z,H.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,H.material.toneMapped=c0.getTransfer(z.colorSpace)!==HJ,z.matrixAutoUpdate===!0)z.updateMatrix();if(H.material.uniforms.uvTransform.value.copy(z.matrix),N!==z||G!==z.version||q!==J.toneMapping)H.material.needsUpdate=!0,N=z,G=z.version,q=J.toneMapping;H.layers.enableAll(),O.unshift(H,H.geometry,H.material,0,0,null)}}function E(O,V){O.getRGB(e6,n$(J)),$.buffers.color.setClear(e6.r,e6.g,e6.b,V,K)}function D(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(H!==void 0)H.geometry.dispose(),H.material.dispose(),H=void 0}return{getClearColor:function(){return Y},setClearColor:function(O,V=1){Y.set(O),X=V,E(Y,X)},getClearAlpha:function(){return X},setClearAlpha:function(O){X=O,E(Y,X)},render:R,addToRenderList:B,dispose:D}}function FG(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=q(null),K=W,Y=!1;function X(w,m,c,f,d){let b=!1,p=G(w,f,c,m);if(K!==p)K=p,U(K.object);if(b=F(w,f,c,d),b)R(w,f,c,d);if(d!==null)Q.update(d,J.ELEMENT_ARRAY_BUFFER);if(b||Y){if(Y=!1,z(w,m,c,f),d!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(d).buffer)}}function H(){return J.createVertexArray()}function U(w){return J.bindVertexArray(w)}function N(w){return J.deleteVertexArray(w)}function G(w,m,c,f){let d=f.wireframe===!0,b=Z[m.id];if(b===void 0)b={},Z[m.id]=b;let p=w.isInstancedMesh===!0?w.id:0,a=b[p];if(a===void 0)a={},b[p]=a;let Q0=a[c.id];if(Q0===void 0)Q0={},a[c.id]=Q0;let F0=Q0[d];if(F0===void 0)F0=q(H()),Q0[d]=F0;return F0}function q(w){let m=[],c=[],f=[];for(let d=0;d<$;d++)m[d]=0,c[d]=0,f[d]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:c,attributeDivisors:f,object:w,attributes:{},index:null}}function F(w,m,c,f){let d=K.attributes,b=m.attributes,p=0,a=c.getAttributes();for(let Q0 in a)if(a[Q0].location>=0){let I0=d[Q0],M0=b[Q0];if(M0===void 0){if(Q0==="instanceMatrix"&&w.instanceMatrix)M0=w.instanceMatrix;if(Q0==="instanceColor"&&w.instanceColor)M0=w.instanceColor}if(I0===void 0)return!0;if(I0.attribute!==M0)return!0;if(M0&&I0.data!==M0.data)return!0;p++}if(K.attributesNum!==p)return!0;if(K.index!==f)return!0;return!1}function R(w,m,c,f){let d={},b=m.attributes,p=0,a=c.getAttributes();for(let Q0 in a)if(a[Q0].location>=0){let I0=b[Q0];if(I0===void 0){if(Q0==="instanceMatrix"&&w.instanceMatrix)I0=w.instanceMatrix;if(Q0==="instanceColor"&&w.instanceColor)I0=w.instanceColor}let M0={};if(M0.attribute=I0,I0&&I0.data)M0.data=I0.data;d[Q0]=M0,p++}K.attributes=d,K.attributesNum=p,K.index=f}function B(){let w=K.newAttributes;for(let m=0,c=w.length;m<c;m++)w[m]=0}function E(w){D(w,0)}function D(w,m){let{newAttributes:c,enabledAttributes:f,attributeDivisors:d}=K;if(c[w]=1,f[w]===0)J.enableVertexAttribArray(w),f[w]=1;if(d[w]!==m)J.vertexAttribDivisor(w,m),d[w]=m}function O(){let{newAttributes:w,enabledAttributes:m}=K;for(let c=0,f=m.length;c<f;c++)if(m[c]!==w[c])J.disableVertexAttribArray(c),m[c]=0}function V(w,m,c,f,d,b,p){if(p===!0)J.vertexAttribIPointer(w,m,c,d,b);else J.vertexAttribPointer(w,m,c,f,d,b)}function z(w,m,c,f){B();let d=f.attributes,b=c.getAttributes(),p=m.defaultAttributeValues;for(let a in b){let Q0=b[a];if(Q0.location>=0){let F0=d[a];if(F0===void 0){if(a==="instanceMatrix"&&w.instanceMatrix)F0=w.instanceMatrix;if(a==="instanceColor"&&w.instanceColor)F0=w.instanceColor}if(F0!==void 0){let{normalized:I0,itemSize:M0}=F0,t0=Q.get(F0);if(t0===void 0)continue;let{buffer:d0,type:s,bytesPerElement:N0}=t0,V0=s===J.INT||s===J.UNSIGNED_INT||F0.gpuType===rQ;if(F0.isInterleavedBufferAttribute){let q0=F0.data,P0=q0.stride,r0=F0.offset;if(q0.isInstancedInterleavedBuffer){for(let g0=0;g0<Q0.locationSize;g0++)D(Q0.location+g0,q0.meshPerAttribute);if(w.isInstancedMesh!==!0&&f._maxInstanceCount===void 0)f._maxInstanceCount=q0.meshPerAttribute*q0.count}else for(let g0=0;g0<Q0.locationSize;g0++)E(Q0.location+g0);J.bindBuffer(J.ARRAY_BUFFER,d0);for(let g0=0;g0<Q0.locationSize;g0++)V(Q0.location+g0,M0/Q0.locationSize,s,I0,P0*N0,(r0+M0/Q0.locationSize*g0)*N0,V0)}else{if(F0.isInstancedBufferAttribute){for(let q0=0;q0<Q0.locationSize;q0++)D(Q0.location+q0,F0.meshPerAttribute);if(w.isInstancedMesh!==!0&&f._maxInstanceCount===void 0)f._maxInstanceCount=F0.meshPerAttribute*F0.count}else for(let q0=0;q0<Q0.locationSize;q0++)E(Q0.location+q0);J.bindBuffer(J.ARRAY_BUFFER,d0);for(let q0=0;q0<Q0.locationSize;q0++)V(Q0.location+q0,M0/Q0.locationSize,s,I0,M0*N0,M0/Q0.locationSize*q0*N0,V0)}}else if(p!==void 0){let I0=p[a];if(I0!==void 0)switch(I0.length){case 2:J.vertexAttrib2fv(Q0.location,I0);break;case 3:J.vertexAttrib3fv(Q0.location,I0);break;case 4:J.vertexAttrib4fv(Q0.location,I0);break;default:J.vertexAttrib1fv(Q0.location,I0)}}}}O()}function A(){k();for(let w in Z){let m=Z[w];for(let c in m){let f=m[c];for(let d in f){let b=f[d];for(let p in b)N(b[p].object),delete b[p];delete f[d]}}delete Z[w]}}function P(w){if(Z[w.id]===void 0)return;let m=Z[w.id];for(let c in m){let f=m[c];for(let d in f){let b=f[d];for(let p in b)N(b[p].object),delete b[p];delete f[d]}}delete Z[w.id]}function C(w){for(let m in Z){let c=Z[m];for(let f in c){let d=c[f];if(d[w.id]===void 0)continue;let b=d[w.id];for(let p in b)N(b[p].object),delete b[p];delete d[w.id]}}}function _(w){for(let m in Z){let c=Z[m],f=w.isInstancedMesh===!0?w.id:0,d=c[f];if(d===void 0)continue;for(let b in d){let p=d[b];for(let a in p)N(p[a].object),delete p[a];delete d[b]}if(delete c[f],Object.keys(c).length===0)delete Z[m]}}function k(){if(l(),Y=!0,K===W)return;K=W,U(K.object)}function l(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:X,reset:k,resetDefaultState:l,dispose:A,releaseStatesOfGeometry:P,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:B,enableAttribute:E,disableUnusedAttributes:O}}function DG(J,Q,$){let Z;function W(H){Z=H}function K(H,U){J.drawArrays(Z,H,U),$.update(U,Z,1)}function Y(H,U,N){if(N===0)return;J.drawArraysInstanced(Z,H,U,N),$.update(U,Z,N)}function X(H,U,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,H,0,U,0,N);let q=0;for(let F=0;F<N;F++)q+=U[F];$.update(q,Z,1)}this.setMode=W,this.render=K,this.renderInstances=Y,this.renderMultiDraw=X}function EG(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let C=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function Y(C){if(C!==z9&&Z.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function X(C){let _=C===p9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(C!==R9&&Z.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==g9&&!_)return!1;return!0}function H(C){if(C==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";C="mediump"}if(C==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",N=H(U);if(N!==U)A0("WebGLRenderer:",U,"not supported, using",N,"instead."),U=N;let G=$.logarithmicDepthBuffer===!0,q=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&q===!1)A0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),B=J.getParameter(J.MAX_TEXTURE_SIZE),E=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),D=J.getParameter(J.MAX_VERTEX_ATTRIBS),O=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),V=J.getParameter(J.MAX_VARYING_VECTORS),z=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),A=J.getParameter(J.MAX_SAMPLES),P=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:H,textureFormatReadable:Y,textureTypeReadable:X,precision:U,logarithmicDepthBuffer:G,reversedDepthBuffer:q,maxTextures:F,maxVertexTextures:R,maxTextureSize:B,maxCubemapSize:E,maxAttributes:D,maxVertexUniforms:O,maxVaryings:V,maxFragmentUniforms:z,maxSamples:A,samples:P}}function RG(J){let Q=this,$=null,Z=0,W=!1,K=!1,Y=new F9,X=new j0,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(G,q){let F=G.length!==0||q||Z!==0||W;return W=q,Z=G.length,F},this.beginShadows=function(){K=!0,N(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(G,q){$=N(G,q,0)},this.setState=function(G,q,F){let{clippingPlanes:R,clipIntersection:B,clipShadows:E}=G,D=J.get(G);if(!W||R===null||R.length===0||K&&!E)if(K)N(null);else U();else{let O=K?0:Z,V=O*4,z=D.clippingState||null;H.value=z,z=N(R,q,V,F);for(let A=0;A!==V;++A)z[A]=$[A];D.clippingState=z,this.numIntersection=B?this.numPlanes:0,this.numPlanes+=O}};function U(){if(H.value!==$)H.value=$,H.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function N(G,q,F,R){let B=G!==null?G.length:0,E=null;if(B!==0){if(E=H.value,R!==!0||E===null){let D=F+B*4,O=q.matrixWorldInverse;if(X.getNormalMatrix(O),E===null||E.length<D)E=new Float32Array(D);for(let V=0,z=F;V!==B;++V,z+=4)Y.copy(G[V]).applyMatrix4(O,X),Y.normal.toArray(E,z),E[z+3]=Y.constant}H.value=E,H.needsUpdate=!0}return Q.numPlanes=B,Q.numIntersection=0,E}}var Z8=4,PK=[0.125,0.215,0.35,0.446,0.526,0.582],B8=20,OG=256,p7=new b7,wK=new x0,qZ=null,FZ=0,DZ=0,EZ=!1,MG=new j;class MZ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:Y=MG}=W;qZ=this._renderer.getRenderTarget(),FZ=this._renderer.getActiveCubeFace(),DZ=this._renderer.getActiveMipmapLevel(),EZ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let X=this._allocateTargets();if(X.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,X,Y),Q>0)this._blur(X,0,0,Q);return this._applyPMREM(X),this._cleanup(X),X}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=SK(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=TK(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(qZ,FZ,DZ),this._renderer.xr.enabled=EZ,J.scissorTest=!1,Z7(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===t8||J.mapping===G8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);qZ=this._renderer.getRenderTarget(),FZ=this._renderer.getActiveCubeFace(),DZ=this._renderer.getActiveMipmapLevel(),EZ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:cJ,minFilter:cJ,generateMipmaps:!1,type:p9,format:z9,colorSpace:f$,depthBuffer:!1},Z=CK(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=CK(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_G(W)),this._blurMaterial=LG(W,J,Q),this._ggxMaterial=VG(W,J,Q)}return Z}_compileMaterial(J){let Q=new i0(new nJ,J);this._renderer.compile(Q,p7)}_sceneToCubeUV(J,Q,$,Z,W){let X=new pJ(90,1,Q,$),H=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],N=this._renderer,G=N.autoClear,q=N.toneMapping;if(N.getClearColor(wK),N.toneMapping=E9,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new i0(new jJ,new I9({name:"PMREM.Background",side:dJ,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,B=R.material,E=!1,D=J.background;if(D){if(D.isColor)B.color.copy(D),J.background=null,E=!0}else B.color.copy(wK),E=!0;for(let O=0;O<6;O++){let V=O%3;if(V===0)X.up.set(0,H[O],0),X.position.set(W.x,W.y,W.z),X.lookAt(W.x+U[O],W.y,W.z);else if(V===1)X.up.set(0,0,H[O]),X.position.set(W.x,W.y,W.z),X.lookAt(W.x,W.y+U[O],W.z);else X.up.set(0,H[O],0),X.position.set(W.x,W.y,W.z),X.lookAt(W.x,W.y,W.z+U[O]);let z=this._cubeSize;if(Z7(Z,V*z,O>2?z:0,z,z),N.setRenderTarget(Z),E)N.render(R,X);N.render(J,X)}N.toneMapping=q,N.autoClear=G,J.background=D}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===t8||J.mapping===G8;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=SK();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=TK();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let Y=W.uniforms;Y.envMap.value=J;let X=this._cubeSize;Z7(Q,0,0,3*X,2*X),$.setRenderTarget(Q),$.render(K,p7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,Y=this._lodMeshes[$];Y.material=K;let X=K.uniforms,H=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),N=Math.sqrt(H*H-U*U),G=0+H*1.25,q=N*G,{_lodMax:F}=this,R=this._sizeLods[$],B=3*R*($>F-Z8?$-F+Z8:0),E=4*(this._cubeSize-R);X.envMap.value=J.texture,X.roughness.value=q,X.mipInt.value=F-Q,Z7(W,B,E,3*R,2*R),Z.setRenderTarget(W),Z.render(Y,p7),X.envMap.value=W.texture,X.roughness.value=0,X.mipInt.value=F-$,Z7(J,B,E,3*R,2*R),Z.setRenderTarget(J),Z.render(Y,p7)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,Y){let X=this._renderer,H=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")C0("blur direction must be either latitudinal or longitudinal!");let U=3,N=this._lodMeshes[Z];N.material=H;let G=H.uniforms,q=this._sizeLods[$]-1,F=isFinite(W)?Math.PI/(2*q):2*Math.PI/(2*B8-1),R=W/F,B=isFinite(W)?1+Math.floor(U*R):B8;if(B>B8)A0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${B} samples when the maximum is set to ${B8}`);let E=[],D=0;for(let P=0;P<B8;++P){let C=P/R,_=Math.exp(-C*C/2);if(E.push(_),P===0)D+=_;else if(P<B)D+=2*_}for(let P=0;P<E.length;P++)E[P]=E[P]/D;if(G.envMap.value=J.texture,G.samples.value=B,G.weights.value=E,G.latitudinal.value=K==="latitudinal",Y)G.poleAxis.value=Y;let{_lodMax:O}=this;G.dTheta.value=F,G.mipInt.value=O-$;let V=this._sizeLods[Z],z=3*V*(Z>O-Z8?Z-O+Z8:0),A=4*(this._cubeSize-V);Z7(Q,z,A,3*V,2*V),X.setRenderTarget(Q),X.render(N,p7)}}function _G(J){let Q=[],$=[],Z=[],W=J,K=J-Z8+1+PK.length;for(let Y=0;Y<K;Y++){let X=Math.pow(2,W);Q.push(X);let H=1/X;if(Y>J-Z8)H=PK[Y-J+Z8-1];else if(Y===0)H=0;$.push(H);let U=1/(X-2),N=-U,G=1+U,q=[N,N,G,N,G,G,N,N,G,G,N,G],F=6,R=6,B=3,E=2,D=1,O=new Float32Array(B*R*F),V=new Float32Array(E*R*F),z=new Float32Array(D*R*F);for(let P=0;P<F;P++){let C=P%3*2/3-1,_=P>2?0:-1,k=[C,_,0,C+0.6666666666666666,_,0,C+0.6666666666666666,_+1,0,C,_,0,C+0.6666666666666666,_+1,0,C,_+1,0];O.set(k,B*R*P),V.set(q,E*R*P);let l=[P,P,P,P,P,P];z.set(l,D*R*P)}let A=new nJ;if(A.setAttribute("position",new J9(O,B)),A.setAttribute("uv",new J9(V,E)),A.setAttribute("faceIndex",new J9(z,D)),Z.push(new i0(A,null)),W>Z8)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function CK(J,Q,$){let Z=new Y9(J,Q,$);return Z.texture.mapping=z7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function Z7(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function VG(J,Q,$){return new X9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:OG,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:QQ(),fragmentShader:`

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
		`,blending:B9,depthTest:!1,depthWrite:!1})}function LG(J,Q,$){let Z=new Float32Array(B8),W=new j(0,1,0);return new X9({name:"SphericalGaussianBlur",defines:{n:B8,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:QQ(),fragmentShader:`

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
		`,blending:B9,depthTest:!1,depthWrite:!1})}function TK(){return new X9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:QQ(),fragmentShader:`

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
		`,blending:B9,depthTest:!1,depthWrite:!1})}function SK(){return new X9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:QQ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:B9,depthTest:!1,depthWrite:!1})}function QQ(){return`

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
	`}class LZ extends Y9{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new m6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new jJ(5,5,5),W=new X9({name:"CubemapFromEquirect",uniforms:M8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:dJ,blending:B9});W.uniforms.tEquirect.value=Q;let K=new i0(Z,W),Y=Q.minFilter;if(Q.minFilter===N8)Q.minFilter=cJ;return new YZ(1,10,this).update(J,K),Q.minFilter=Y,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}}function BG(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(q,F=!1){if(q===null||q===void 0)return null;if(F)return Y(q);return K(q)}function K(q){if(q&&q.isTexture){let F=q.mapping;if(F===I6||F===A6)if(Q.has(q)){let R=Q.get(q).texture;return X(R,q.mapping)}else{let R=q.image;if(R&&R.height>0){let B=new LZ(R.height);return B.fromEquirectangularTexture(J,q),Q.set(q,B),q.addEventListener("dispose",U),X(B.texture,q.mapping)}else return null}}return q}function Y(q){if(q&&q.isTexture){let F=q.mapping,R=F===I6||F===A6,B=F===t8||F===G8;if(R||B){let E=$.get(q),D=E!==void 0?E.texture.pmremVersion:0;if(q.isRenderTargetTexture&&q.pmremVersion!==D){if(Z===null)Z=new MZ(J);return E=R?Z.fromEquirectangular(q,E):Z.fromCubemap(q,E),E.texture.pmremVersion=q.pmremVersion,$.set(q,E),E.texture}else if(E!==void 0)return E.texture;else{let O=q.image;if(R&&O&&O.height>0||B&&O&&H(O)){if(Z===null)Z=new MZ(J);return E=R?Z.fromEquirectangular(q):Z.fromCubemap(q),E.texture.pmremVersion=q.pmremVersion,$.set(q,E),q.addEventListener("dispose",N),E.texture}else return null}}}return q}function X(q,F){if(F===I6)q.mapping=t8;else if(F===A6)q.mapping=G8;return q}function H(q){let F=0,R=6;for(let B=0;B<R;B++)if(q[B]!==void 0)F++;return F===R}function U(q){let F=q.target;F.removeEventListener("dispose",U);let R=Q.get(F);if(R!==void 0)Q.delete(F),R.dispose()}function N(q){let F=q.target;F.removeEventListener("dispose",N);let R=$.get(F);if(R!==void 0)$.delete(F),R.dispose()}function G(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:G}}function zG(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)z6("WebGLRenderer: "+Z+" extension not supported.");return W}}}function kG(J,Q,$,Z){let W={},K=new WeakMap;function Y(G){let q=G.target;if(q.index!==null)Q.remove(q.index);for(let R in q.attributes)Q.remove(q.attributes[R]);q.removeEventListener("dispose",Y),delete W[q.id];let F=K.get(q);if(F)Q.remove(F),K.delete(q);if(Z.releaseStatesOfGeometry(q),q.isInstancedBufferGeometry===!0)delete q._maxInstanceCount;$.memory.geometries--}function X(G,q){if(W[q.id]===!0)return q;return q.addEventListener("dispose",Y),W[q.id]=!0,$.memory.geometries++,q}function H(G){let q=G.attributes;for(let F in q)Q.update(q[F],J.ARRAY_BUFFER)}function U(G){let q=[],F=G.index,R=G.attributes.position,B=0;if(R===void 0)return;if(F!==null){let O=F.array;B=F.version;for(let V=0,z=O.length;V<z;V+=3){let A=O[V+0],P=O[V+1],C=O[V+2];q.push(A,P,P,C,C,A)}}else{let O=R.array;B=R.version;for(let V=0,z=O.length/3-1;V<z;V+=3){let A=V+0,P=V+1,C=V+2;q.push(A,P,P,C,C,A)}}let E=new(R.count>=65535?p6:g6)(q,1);E.version=B;let D=K.get(G);if(D)Q.remove(D);K.set(G,E)}function N(G){let q=K.get(G);if(q){let F=G.index;if(F!==null){if(q.version<F.version)U(G)}}else U(G);return K.get(G)}return{get:X,update:H,getWireframeAttribute:N}}function IG(J,Q,$){let Z;function W(G){Z=G}let K,Y;function X(G){K=G.type,Y=G.bytesPerElement}function H(G,q){J.drawElements(Z,q,K,G*Y),$.update(q,Z,1)}function U(G,q,F){if(F===0)return;J.drawElementsInstanced(Z,q,K,G*Y,F),$.update(q,Z,F)}function N(G,q,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,q,0,K,G,0,F);let B=0;for(let E=0;E<F;E++)B+=q[E];$.update(B,Z,1)}this.setMode=W,this.setIndex=X,this.render=H,this.renderInstances=U,this.renderMultiDraw=N}function AG(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,Y,X){switch($.calls++,Y){case J.TRIANGLES:$.triangles+=X*(K/3);break;case J.LINES:$.lines+=X*(K/2);break;case J.LINE_STRIP:$.lines+=X*(K-1);break;case J.LINE_LOOP:$.lines+=X*K;break;case J.POINTS:$.points+=X*K;break;default:C0("WebGLInfo: Unknown draw mode:",Y);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function PG(J,Q,$){let Z=new WeakMap,W=new EJ;function K(Y,X,H){let U=Y.morphTargetInfluences,N=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,G=N!==void 0?N.length:0,q=Z.get(X);if(q===void 0||q.count!==G){let k=function(){C.dispose(),Z.delete(X),X.removeEventListener("dispose",k)};if(q!==void 0)q.texture.dispose();let F=X.morphAttributes.position!==void 0,R=X.morphAttributes.normal!==void 0,B=X.morphAttributes.color!==void 0,E=X.morphAttributes.position||[],D=X.morphAttributes.normal||[],O=X.morphAttributes.color||[],V=0;if(F===!0)V=1;if(R===!0)V=2;if(B===!0)V=3;let z=X.attributes.position.count*V,A=1;if(z>Q.maxTextureSize)A=Math.ceil(z/Q.maxTextureSize),z=Q.maxTextureSize;let P=new Float32Array(z*A*4*G),C=new x6(P,z,A,G);C.type=g9,C.needsUpdate=!0;let _=V*4;for(let l=0;l<G;l++){let w=E[l],m=D[l],c=O[l],f=z*A*4*l;for(let d=0;d<w.count;d++){let b=d*_;if(F===!0)W.fromBufferAttribute(w,d),P[f+b+0]=W.x,P[f+b+1]=W.y,P[f+b+2]=W.z,P[f+b+3]=0;if(R===!0)W.fromBufferAttribute(m,d),P[f+b+4]=W.x,P[f+b+5]=W.y,P[f+b+6]=W.z,P[f+b+7]=0;if(B===!0)W.fromBufferAttribute(c,d),P[f+b+8]=W.x,P[f+b+9]=W.y,P[f+b+10]=W.z,P[f+b+11]=c.itemSize===4?W.w:1}}q={count:G,texture:C,size:new B0(z,A)},Z.set(X,q),X.addEventListener("dispose",k)}if(Y.isInstancedMesh===!0&&Y.morphTexture!==null)H.getUniforms().setValue(J,"morphTexture",Y.morphTexture,$);else{let F=0;for(let B=0;B<U.length;B++)F+=U[B];let R=X.morphTargetsRelative?1:1-F;H.getUniforms().setValue(J,"morphTargetBaseInfluence",R),H.getUniforms().setValue(J,"morphTargetInfluences",U)}H.getUniforms().setValue(J,"morphTargetsTexture",q.texture,$),H.getUniforms().setValue(J,"morphTargetsTextureSize",q.size)}return{update:K}}function wG(J,Q,$,Z,W){let K=new WeakMap;function Y(U){let N=W.render.frame,G=U.geometry,q=Q.get(U,G);if(K.get(q)!==N)Q.update(q),K.set(q,N);if(U.isInstancedMesh){if(U.hasEventListener("dispose",H)===!1)U.addEventListener("dispose",H);if(K.get(U)!==N){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,N)}}if(U.isSkinnedMesh){let F=U.skeleton;if(K.get(F)!==N)F.update(),K.set(F,N)}return q}function X(){K=new WeakMap}function H(U){let N=U.target;if(N.removeEventListener("dispose",H),Z.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:Y,dispose:X}}var CG={[uQ]:"LINEAR_TONE_MAPPING",[cQ]:"REINHARD_TONE_MAPPING",[nQ]:"CINEON_TONE_MAPPING",[sQ]:"ACES_FILMIC_TONE_MAPPING",[oQ]:"AGX_TONE_MAPPING",[aQ]:"NEUTRAL_TONE_MAPPING",[iQ]:"CUSTOM_TONE_MAPPING"};function TG(J,Q,$,Z,W){let K=new Y9(Q,$,{type:J,depthBuffer:Z,stencilBuffer:W,depthTexture:Z?new Q8(Q,$):void 0}),Y=new Y9(Q,$,{type:p9,depthBuffer:!1,stencilBuffer:!1}),X=new nJ;X.setAttribute("position",new zJ([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new zJ([0,2,0,0,2,0],2));let H=new s$({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),U=new i0(X,H),N=new b7(-1,1,1,-1,0,1),G=null,q=null,F=!1,R,B=null,E=[],D=!1;this.setSize=function(O,V){K.setSize(O,V),Y.setSize(O,V);for(let z=0;z<E.length;z++){let A=E[z];if(A.setSize)A.setSize(O,V)}},this.setEffects=function(O){E=O,D=E.length>0&&E[0].isRenderPass===!0;let{width:V,height:z}=K;for(let A=0;A<E.length;A++){let P=E[A];if(P.setSize)P.setSize(V,z)}},this.begin=function(O,V){if(F)return!1;if(O.toneMapping===E9&&E.length===0)return!1;if(B=V,V!==null){let{width:z,height:A}=V;if(K.width!==z||K.height!==A)this.setSize(z,A)}if(D===!1)O.setRenderTarget(K);return R=O.toneMapping,O.toneMapping=E9,!0},this.hasRenderPass=function(){return D},this.end=function(O,V){O.toneMapping=R,F=!0;let z=K,A=Y;for(let P=0;P<E.length;P++){let C=E[P];if(C.enabled===!1)continue;if(C.render(O,A,z,V),C.needsSwap!==!1){let _=z;z=A,A=_}}if(G!==O.outputColorSpace||q!==O.toneMapping){if(G=O.outputColorSpace,q=O.toneMapping,H.defines={},c0.getTransfer(G)===HJ)H.defines.SRGB_TRANSFER="";let P=CG[q];if(P)H.defines[P]="";H.needsUpdate=!0}H.uniforms.tDiffuse.value=z.texture,O.setRenderTarget(B),O.render(U,N),B=null,F=!1},this.isCompositing=function(){return F},this.dispose=function(){if(K.depthTexture)K.depthTexture.dispose();K.dispose(),Y.dispose(),X.dispose(),H.dispose()}}var rK=new CJ,_Z=new Q8(1,1),tK=new x6,eK=new l$,JY=new m6,jK=[],yK=[],fK=new Float32Array(16),vK=new Float32Array(9),hK=new Float32Array(4);function W7(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=jK[W];if(K===void 0)K=new Float32Array(W),jK[W]=K;if(Q!==0){Z.toArray(K,0);for(let Y=1,X=0;Y!==Q;++Y)X+=$,J[Y].toArray(K,X)}return K}function IJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function AJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function $Q(J,Q){let $=yK[Q];if($===void 0)$=new Int32Array(Q),yK[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function SG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function jG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(IJ($,Q))return;J.uniform2fv(this.addr,Q),AJ($,Q)}}function yG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(IJ($,Q))return;J.uniform3fv(this.addr,Q),AJ($,Q)}}function fG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(IJ($,Q))return;J.uniform4fv(this.addr,Q),AJ($,Q)}}function vG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(IJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),AJ($,Q)}else{if(IJ($,Z))return;hK.set(Z),J.uniformMatrix2fv(this.addr,!1,hK),AJ($,Z)}}function hG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(IJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),AJ($,Q)}else{if(IJ($,Z))return;vK.set(Z),J.uniformMatrix3fv(this.addr,!1,vK),AJ($,Z)}}function xG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(IJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),AJ($,Q)}else{if(IJ($,Z))return;fK.set(Z),J.uniformMatrix4fv(this.addr,!1,fK),AJ($,Z)}}function bG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function gG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(IJ($,Q))return;J.uniform2iv(this.addr,Q),AJ($,Q)}}function pG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(IJ($,Q))return;J.uniform3iv(this.addr,Q),AJ($,Q)}}function mG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(IJ($,Q))return;J.uniform4iv(this.addr,Q),AJ($,Q)}}function lG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function dG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(IJ($,Q))return;J.uniform2uiv(this.addr,Q),AJ($,Q)}}function uG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(IJ($,Q))return;J.uniform3uiv(this.addr,Q),AJ($,Q)}}function cG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(IJ($,Q))return;J.uniform4uiv(this.addr,Q),AJ($,Q)}}function nG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)_Z.compareFunction=$.isReversedDepthBuffer()?h6:v6,K=_Z;else K=rK;$.setTexture2D(Q||K,W)}function sG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||eK,W)}function iG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||JY,W)}function oG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||tK,W)}function aG(J){switch(J){case 5126:return SG;case 35664:return jG;case 35665:return yG;case 35666:return fG;case 35674:return vG;case 35675:return hG;case 35676:return xG;case 5124:case 35670:return bG;case 35667:case 35671:return gG;case 35668:case 35672:return pG;case 35669:case 35673:return mG;case 5125:return lG;case 36294:return dG;case 36295:return uG;case 36296:return cG;case 35678:case 36198:case 36298:case 36306:case 35682:return nG;case 35679:case 36299:case 36307:return sG;case 35680:case 36300:case 36308:case 36293:return iG;case 36289:case 36303:case 36311:case 36292:return oG}}function rG(J,Q){J.uniform1fv(this.addr,Q)}function tG(J,Q){let $=W7(Q,this.size,2);J.uniform2fv(this.addr,$)}function eG(J,Q){let $=W7(Q,this.size,3);J.uniform3fv(this.addr,$)}function J5(J,Q){let $=W7(Q,this.size,4);J.uniform4fv(this.addr,$)}function Q5(J,Q){let $=W7(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function $5(J,Q){let $=W7(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function Z5(J,Q){let $=W7(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function W5(J,Q){J.uniform1iv(this.addr,Q)}function K5(J,Q){J.uniform2iv(this.addr,Q)}function Y5(J,Q){J.uniform3iv(this.addr,Q)}function X5(J,Q){J.uniform4iv(this.addr,Q)}function H5(J,Q){J.uniform1uiv(this.addr,Q)}function U5(J,Q){J.uniform2uiv(this.addr,Q)}function G5(J,Q){J.uniform3uiv(this.addr,Q)}function N5(J,Q){J.uniform4uiv(this.addr,Q)}function q5(J,Q,$){let Z=this.cache,W=Q.length,K=$Q($,W);if(!IJ(Z,K))J.uniform1iv(this.addr,K),AJ(Z,K);let Y;if(this.type===J.SAMPLER_2D_SHADOW)Y=_Z;else Y=rK;for(let X=0;X!==W;++X)$.setTexture2D(Q[X]||Y,K[X])}function F5(J,Q,$){let Z=this.cache,W=Q.length,K=$Q($,W);if(!IJ(Z,K))J.uniform1iv(this.addr,K),AJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTexture3D(Q[Y]||eK,K[Y])}function D5(J,Q,$){let Z=this.cache,W=Q.length,K=$Q($,W);if(!IJ(Z,K))J.uniform1iv(this.addr,K),AJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTextureCube(Q[Y]||JY,K[Y])}function E5(J,Q,$){let Z=this.cache,W=Q.length,K=$Q($,W);if(!IJ(Z,K))J.uniform1iv(this.addr,K),AJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTexture2DArray(Q[Y]||tK,K[Y])}function R5(J){switch(J){case 5126:return rG;case 35664:return tG;case 35665:return eG;case 35666:return J5;case 35674:return Q5;case 35675:return $5;case 35676:return Z5;case 5124:case 35670:return W5;case 35667:case 35671:return K5;case 35668:case 35672:return Y5;case 35669:case 35673:return X5;case 5125:return H5;case 36294:return U5;case 36295:return G5;case 36296:return N5;case 35678:case 36198:case 36298:case 36306:case 35682:return q5;case 35679:case 36299:case 36307:return F5;case 35680:case 36300:case 36308:case 36293:return D5;case 36289:case 36303:case 36311:case 36292:return E5}}class QY{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=aG(Q.type)}}class $Y{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=R5(Q.type)}}class ZY{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let Y=Z[W];Y.setValue(J,Q[Y.id],$)}}}var RZ=/(\w+)(\])?(\[|\.)?/g;function xK(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function O5(J,Q,$){let Z=J.name,W=Z.length;RZ.lastIndex=0;while(!0){let K=RZ.exec(Z),Y=RZ.lastIndex,X=K[1],H=K[2]==="]",U=K[3];if(H)X=X|0;if(U===void 0||U==="["&&Y+2===W){xK($,U===void 0?new QY(X,J,Q):new $Y(X,J,Q));break}else{let G=$.map[X];if(G===void 0)G=new ZY(X),xK($,G);$=G}}}class d7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let Y=J.getActiveUniform(Q,K),X=J.getUniformLocation(Q,Y.name);O5(Y,X,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let Y=Q[W],X=$[Y.id];if(X.needsUpdate!==!1)Y.setValue(J,X.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function bK(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var M5=37297,_5=0;function V5(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let Y=W;Y<K;Y++){let X=Y+1;Z.push(`${X===Q?">":" "} ${X}: ${$[Y]}`)}return Z.join(`
`)}var gK=new j0;function L5(J){c0._getMatrix(gK,c0.workingColorSpace,J);let Q=`mat3( ${gK.elements.map(($)=>$.toFixed(4))} )`;switch(c0.getTransfer(J)){case v$:return[Q,"LinearTransferOETF"];case HJ:return[Q,"sRGBTransferOETF"];default:return A0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function pK(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let Y=/ERROR: 0:(\d+)/.exec(K);if(Y){let X=parseInt(Y[1]);return $.toUpperCase()+`

`+K+`

`+V5(J.getShaderSource(Q),X)}else return K}function B5(J,Q){let $=L5(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var z5={[uQ]:"Linear",[cQ]:"Reinhard",[nQ]:"Cineon",[sQ]:"ACESFilmic",[oQ]:"AgX",[aQ]:"Neutral",[iQ]:"Custom"};function k5(J,Q){let $=z5[Q];if($===void 0)return A0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var JQ=new j;function I5(){c0.getLuminanceCoefficients(JQ);let J=JQ.x.toFixed(4),Q=JQ.y.toFixed(4),$=JQ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function A5(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(l7).join(`
`)}function P5(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function w5(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),Y=K.name,X=1;if(K.type===J.FLOAT_MAT2)X=2;if(K.type===J.FLOAT_MAT3)X=3;if(K.type===J.FLOAT_MAT4)X=4;$[Y]={type:K.type,location:J.getAttribLocation(Q,Y),locationSize:X}}return $}function l7(J){return J!==""}function mK(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function lK(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var C5=/^[ \t]*#include +<([\w\d./]+)>/gm;function VZ(J){return J.replace(C5,S5)}var T5=new Map;function S5(J,Q){let $=b0[Q];if($===void 0){let Z=T5.get(Q);if(Z!==void 0)$=b0[Z],A0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("Can not resolve #include <"+Q+">")}return VZ($)}var j5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dK(J){return J.replace(j5,y5)}function y5(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function uK(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var f5={[V7]:"SHADOWMAP_TYPE_PCF",[o8]:"SHADOWMAP_TYPE_VSM"};function v5(J){return f5[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var h5={[t8]:"ENVMAP_TYPE_CUBE",[G8]:"ENVMAP_TYPE_CUBE",[z7]:"ENVMAP_TYPE_CUBE_UV"};function x5(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return h5[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var b5={[G8]:"ENVMAP_MODE_REFRACTION"};function g5(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return b5[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var p5={[aW]:"ENVMAP_BLENDING_MULTIPLY",[rW]:"ENVMAP_BLENDING_MIX",[tW]:"ENVMAP_BLENDING_ADD"};function m5(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return p5[J.combine]||"ENVMAP_BLENDING_NONE"}function l5(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function d5(J,Q,$,Z){let W=J.getContext(),K=$.defines,Y=$.vertexShader,X=$.fragmentShader,H=v5($),U=x5($),N=g5($),G=m5($),q=l5($),F=A5($),R=P5(K),B=W.createProgram(),E,D,O=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(E=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(l7).join(`
`),E.length>0)E+=`
`;if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(l7).join(`
`),D.length>0)D+=`
`}else E=[uK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+H:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(l7).join(`
`),D=[uK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+N:"",$.envMap?"#define "+G:"",q?"#define CUBEUV_TEXEL_WIDTH "+q.texelWidth:"",q?"#define CUBEUV_TEXEL_HEIGHT "+q.texelHeight:"",q?"#define CUBEUV_MAX_MIP "+q.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+H:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==E9?"#define TONE_MAPPING":"",$.toneMapping!==E9?b0.tonemapping_pars_fragment:"",$.toneMapping!==E9?k5("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",b0.colorspace_pars_fragment,B5("linearToOutputTexel",$.outputColorSpace),I5(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(l7).join(`
`);if(Y=VZ(Y),Y=mK(Y,$),Y=lK(Y,$),X=VZ(X),X=mK(X,$),X=lK(X,$),Y=dK(Y),X=dK(X),$.isRawShaderMaterial!==!0)O=`#version 300 es
`,E=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,D=["#define varying in",$.glslVersion===h$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===h$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+D;let V=O+E+Y,z=O+D+X,A=bK(W,W.VERTEX_SHADER,V),P=bK(W,W.FRAGMENT_SHADER,z);if(W.attachShader(B,A),W.attachShader(B,P),$.index0AttributeName!==void 0)W.bindAttribLocation(B,0,$.index0AttributeName);else if($.morphTargets===!0)W.bindAttribLocation(B,0,"position");W.linkProgram(B);function C(w){if(J.debug.checkShaderErrors){let m=W.getProgramInfoLog(B)||"",c=W.getShaderInfoLog(A)||"",f=W.getShaderInfoLog(P)||"",d=m.trim(),b=c.trim(),p=f.trim(),a=!0,Q0=!0;if(W.getProgramParameter(B,W.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,B,A,P);else{let F0=pK(W,A,"vertex"),I0=pK(W,P,"fragment");C0("THREE.WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(B,W.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+d+`
`+F0+`
`+I0)}else if(d!=="")A0("WebGLProgram: Program Info Log:",d);else if(b===""||p==="")Q0=!1;if(Q0)w.diagnostics={runnable:a,programLog:d,vertexShader:{log:b,prefix:E},fragmentShader:{log:p,prefix:D}}}W.deleteShader(A),W.deleteShader(P),_=new d7(W,B),k=w5(W,B)}let _;this.getUniforms=function(){if(_===void 0)C(this);return _};let k;this.getAttributes=function(){if(k===void 0)C(this);return k};let l=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(l===!1)l=W.getProgramParameter(B,M5);return l},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(B),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=_5++,this.cacheKey=Q,this.usedTimes=1,this.program=B,this.vertexShader=A,this.fragmentShader=P,this}var u5=0;class WY{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:Q,fragmentShader:$}=J,Z=this._getShaderStage(Q),W=this._getShaderStage($),K=this._getShaderCacheForMaterial(J);if(K.has(Z)===!1)K.add(Z),Z.usedTimes++;if(K.has(W)===!1)K.add(W),W.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new KY(J),Q.set(J,$);return $}}class KY{constructor(J){this.id=u5++,this.code=J,this.usedTimes=0}}function c5(J){return J===D8||J===y6||J===f6}function n5(J,Q,$,Z,W,K){let Y=new w7,X=new WY,H=new Set,U=[],N=new Map,G=Z.logarithmicDepthBuffer,q=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(_){if(H.add(_),_===0)return"uv";return`uv${_}`}function B(_,k,l,w,m,c){let f=w.fog,d=m.geometry,b=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?w.environment:null,p=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,a=Q.get(_.envMap||b,p),Q0=!!a&&a.mapping===z7?a.image.height:null,F0=F[_.type];if(_.precision!==null){if(q=Z.getMaxPrecision(_.precision),q!==_.precision)A0("WebGLProgram.getParameters:",_.precision,"not supported, using",q,"instead.")}let I0=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,M0=I0!==void 0?I0.length:0,t0=0;if(d.morphAttributes.position!==void 0)t0=1;if(d.morphAttributes.normal!==void 0)t0=2;if(d.morphAttributes.color!==void 0)t0=3;let d0,s,N0,V0;if(F0){let y0=w9[F0];d0=y0.vertexShader,s=y0.fragmentShader}else d0=_.vertexShader,s=_.fragmentShader,X.update(_),N0=X.getVertexShaderID(_),V0=X.getFragmentShaderID(_);let q0=J.getRenderTarget(),P0=J.state.buffers.depth.getReversed(),r0=m.isInstancedMesh===!0,g0=m.isBatchedMesh===!0,u0=!!_.map,WJ=!!_.matcap,KJ=!!a,h0=!!_.aoMap,SJ=!!_.lightMap,yJ=!!_.bumpMap,VJ=!!_.normalMap,S=!!_.displacementMap,bJ=!!_.emissiveMap,n0=!!_.metalnessMap,a0=!!_.roughnessMap,U0=_.anisotropy>0,DJ=_.clearcoat>0,w0=_.dispersion>0,I=_.iridescence>0,M=_.sheen>0,v=_.transmission>0,o=U0&&!!_.anisotropyMap,r=DJ&&!!_.clearcoatMap,e=DJ&&!!_.clearcoatNormalMap,K0=DJ&&!!_.clearcoatRoughnessMap,u=I&&!!_.iridescenceMap,i=I&&!!_.iridescenceThicknessMap,W0=M&&!!_.sheenColorMap,R0=M&&!!_.sheenRoughnessMap,$0=!!_.specularMap,Y0=!!_.specularColorMap,S0=!!_.specularIntensityMap,v0=v&&!!_.transmissionMap,p0=v&&!!_.thicknessMap,T=!!_.gradientMap,Z0=!!_.alphaMap,n=_.alphaTest>0,J0=!!_.alphaHash,O0=!!_.extensions,t=E9;if(_.toneMapped){if(q0===null||q0.isXRRenderTarget===!0)t=J.toneMapping}let L0={shaderID:F0,shaderType:_.type,shaderName:_.name,vertexShader:d0,fragmentShader:s,defines:_.defines,customVertexShaderID:N0,customFragmentShaderID:V0,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:q,batching:g0,batchingColor:g0&&m._colorsTexture!==null,instancing:r0,instancingColor:r0&&m.instanceColor!==null,instancingMorph:r0&&m.morphTexture!==null,outputColorSpace:q0===null?J.outputColorSpace:q0.isXRRenderTarget===!0?q0.texture.colorSpace:c0.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:u0,matcap:WJ,envMap:KJ,envMapMode:KJ&&a.mapping,envMapCubeUVHeight:Q0,aoMap:h0,lightMap:SJ,bumpMap:yJ,normalMap:VJ,displacementMap:S,emissiveMap:bJ,normalMapObjectSpace:VJ&&_.normalMapType===UK,normalMapTangentSpace:VJ&&_.normalMapType===y$,packedNormalMap:VJ&&_.normalMapType===y$&&c5(_.normalMap.format),metalnessMap:n0,roughnessMap:a0,anisotropy:U0,anisotropyMap:o,clearcoat:DJ,clearcoatMap:r,clearcoatNormalMap:e,clearcoatRoughnessMap:K0,dispersion:w0,iridescence:I,iridescenceMap:u,iridescenceThicknessMap:i,sheen:M,sheenColorMap:W0,sheenRoughnessMap:R0,specularMap:$0,specularColorMap:Y0,specularIntensityMap:S0,transmission:v,transmissionMap:v0,thicknessMap:p0,gradientMap:T,opaque:_.transparent===!1&&_.blending===L7&&_.alphaToCoverage===!1,alphaMap:Z0,alphaTest:n,alphaHash:J0,combine:_.combine,mapUv:u0&&R(_.map.channel),aoMapUv:h0&&R(_.aoMap.channel),lightMapUv:SJ&&R(_.lightMap.channel),bumpMapUv:yJ&&R(_.bumpMap.channel),normalMapUv:VJ&&R(_.normalMap.channel),displacementMapUv:S&&R(_.displacementMap.channel),emissiveMapUv:bJ&&R(_.emissiveMap.channel),metalnessMapUv:n0&&R(_.metalnessMap.channel),roughnessMapUv:a0&&R(_.roughnessMap.channel),anisotropyMapUv:o&&R(_.anisotropyMap.channel),clearcoatMapUv:r&&R(_.clearcoatMap.channel),clearcoatNormalMapUv:e&&R(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K0&&R(_.clearcoatRoughnessMap.channel),iridescenceMapUv:u&&R(_.iridescenceMap.channel),iridescenceThicknessMapUv:i&&R(_.iridescenceThicknessMap.channel),sheenColorMapUv:W0&&R(_.sheenColorMap.channel),sheenRoughnessMapUv:R0&&R(_.sheenRoughnessMap.channel),specularMapUv:$0&&R(_.specularMap.channel),specularColorMapUv:Y0&&R(_.specularColorMap.channel),specularIntensityMapUv:S0&&R(_.specularIntensityMap.channel),transmissionMapUv:v0&&R(_.transmissionMap.channel),thicknessMapUv:p0&&R(_.thicknessMap.channel),alphaMapUv:Z0&&R(_.alphaMap.channel),vertexTangents:!!d.attributes.tangent&&(VJ||U0),vertexNormals:!!d.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!d.attributes.color&&d.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!d.attributes.uv&&(u0||Z0),fog:!!f,useFog:_.fog===!0,fogExp2:!!f&&f.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||d.attributes.normal===void 0&&VJ===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:G,reversedDepthBuffer:P0,skinning:m.isSkinnedMesh===!0,morphTargets:d.morphAttributes.position!==void 0,morphNormals:d.morphAttributes.normal!==void 0,morphColors:d.morphAttributes.color!==void 0,morphTargetsCount:M0,morphTextureStride:t0,numDirLights:k.directional.length,numPointLights:k.point.length,numSpotLights:k.spot.length,numSpotLightMaps:k.spotLightMap.length,numRectAreaLights:k.rectArea.length,numHemiLights:k.hemi.length,numDirLightShadows:k.directionalShadowMap.length,numPointLightShadows:k.pointShadowMap.length,numSpotLightShadows:k.spotShadowMap.length,numSpotLightShadowsWithMaps:k.numSpotLightShadowsWithMaps,numLightProbes:k.numLightProbes,numLightProbeGrids:c.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:_.dithering,shadowMapEnabled:J.shadowMap.enabled&&l.length>0,shadowMapType:J.shadowMap.type,toneMapping:t,decodeVideoTexture:u0&&_.map.isVideoTexture===!0&&c0.getTransfer(_.map.colorSpace)===HJ,decodeVideoTextureEmissive:bJ&&_.emissiveMap.isVideoTexture===!0&&c0.getTransfer(_.emissiveMap.colorSpace)===HJ,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===uJ,flipSided:_.side===dJ,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:O0&&_.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O0&&_.extensions.multiDraw===!0||g0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return L0.vertexUv1s=H.has(1),L0.vertexUv2s=H.has(2),L0.vertexUv3s=H.has(3),H.clear(),L0}function E(_){let k=[];if(_.shaderID)k.push(_.shaderID);else k.push(_.customVertexShaderID),k.push(_.customFragmentShaderID);if(_.defines!==void 0)for(let l in _.defines)k.push(l),k.push(_.defines[l]);if(_.isRawShaderMaterial===!1)D(k,_),O(k,_),k.push(J.outputColorSpace);return k.push(_.customProgramCacheKey),k.join()}function D(_,k){_.push(k.precision),_.push(k.outputColorSpace),_.push(k.envMapMode),_.push(k.envMapCubeUVHeight),_.push(k.mapUv),_.push(k.alphaMapUv),_.push(k.lightMapUv),_.push(k.aoMapUv),_.push(k.bumpMapUv),_.push(k.normalMapUv),_.push(k.displacementMapUv),_.push(k.emissiveMapUv),_.push(k.metalnessMapUv),_.push(k.roughnessMapUv),_.push(k.anisotropyMapUv),_.push(k.clearcoatMapUv),_.push(k.clearcoatNormalMapUv),_.push(k.clearcoatRoughnessMapUv),_.push(k.iridescenceMapUv),_.push(k.iridescenceThicknessMapUv),_.push(k.sheenColorMapUv),_.push(k.sheenRoughnessMapUv),_.push(k.specularMapUv),_.push(k.specularColorMapUv),_.push(k.specularIntensityMapUv),_.push(k.transmissionMapUv),_.push(k.thicknessMapUv),_.push(k.combine),_.push(k.fogExp2),_.push(k.sizeAttenuation),_.push(k.morphTargetsCount),_.push(k.morphAttributeCount),_.push(k.numDirLights),_.push(k.numPointLights),_.push(k.numSpotLights),_.push(k.numSpotLightMaps),_.push(k.numHemiLights),_.push(k.numRectAreaLights),_.push(k.numDirLightShadows),_.push(k.numPointLightShadows),_.push(k.numSpotLightShadows),_.push(k.numSpotLightShadowsWithMaps),_.push(k.numLightProbes),_.push(k.shadowMapType),_.push(k.toneMapping),_.push(k.numClippingPlanes),_.push(k.numClipIntersection),_.push(k.depthPacking)}function O(_,k){if(Y.disableAll(),k.instancing)Y.enable(0);if(k.instancingColor)Y.enable(1);if(k.instancingMorph)Y.enable(2);if(k.matcap)Y.enable(3);if(k.envMap)Y.enable(4);if(k.normalMapObjectSpace)Y.enable(5);if(k.normalMapTangentSpace)Y.enable(6);if(k.clearcoat)Y.enable(7);if(k.iridescence)Y.enable(8);if(k.alphaTest)Y.enable(9);if(k.vertexColors)Y.enable(10);if(k.vertexAlphas)Y.enable(11);if(k.vertexUv1s)Y.enable(12);if(k.vertexUv2s)Y.enable(13);if(k.vertexUv3s)Y.enable(14);if(k.vertexTangents)Y.enable(15);if(k.anisotropy)Y.enable(16);if(k.alphaHash)Y.enable(17);if(k.batching)Y.enable(18);if(k.dispersion)Y.enable(19);if(k.batchingColor)Y.enable(20);if(k.gradientMap)Y.enable(21);if(k.packedNormalMap)Y.enable(22);if(k.vertexNormals)Y.enable(23);if(_.push(Y.mask),Y.disableAll(),k.fog)Y.enable(0);if(k.useFog)Y.enable(1);if(k.flatShading)Y.enable(2);if(k.logarithmicDepthBuffer)Y.enable(3);if(k.reversedDepthBuffer)Y.enable(4);if(k.skinning)Y.enable(5);if(k.morphTargets)Y.enable(6);if(k.morphNormals)Y.enable(7);if(k.morphColors)Y.enable(8);if(k.premultipliedAlpha)Y.enable(9);if(k.shadowMapEnabled)Y.enable(10);if(k.doubleSided)Y.enable(11);if(k.flipSided)Y.enable(12);if(k.useDepthPacking)Y.enable(13);if(k.dithering)Y.enable(14);if(k.transmission)Y.enable(15);if(k.sheen)Y.enable(16);if(k.opaque)Y.enable(17);if(k.pointsUvs)Y.enable(18);if(k.decodeVideoTexture)Y.enable(19);if(k.decodeVideoTextureEmissive)Y.enable(20);if(k.alphaToCoverage)Y.enable(21);if(k.numLightProbeGrids>0)Y.enable(22);_.push(Y.mask)}function V(_){let k=F[_.type],l;if(k){let w=w9[k];l=BK.clone(w.uniforms)}else l=_.uniforms;return l}function z(_,k){let l=N.get(k);if(l!==void 0)++l.usedTimes;else l=new d5(J,k,_,W),U.push(l),N.set(k,l);return l}function A(_){if(--_.usedTimes===0){let k=U.indexOf(_);U[k]=U[U.length-1],U.pop(),N.delete(_.cacheKey),_.destroy()}}function P(_){X.remove(_)}function C(){X.dispose()}return{getParameters:B,getProgramCacheKey:E,getUniforms:V,acquireProgram:z,releaseProgram:A,releaseShaderCache:P,programs:U,dispose:C}}function s5(){let J=new WeakMap;function Q(Y){return J.has(Y)}function $(Y){let X=J.get(Y);if(X===void 0)X={},J.set(Y,X);return X}function Z(Y){J.delete(Y)}function W(Y,X,H){J.get(Y)[X]=H}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function i5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function cK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function nK(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function Y(q){let F=0;if(q.isInstancedMesh)F+=2;if(q.isSkinnedMesh)F+=1;return F}function X(q,F,R,B,E,D){let O=J[Q];if(O===void 0)O={id:q.id,object:q,geometry:F,material:R,materialVariant:Y(q),groupOrder:B,renderOrder:q.renderOrder,z:E,group:D},J[Q]=O;else O.id=q.id,O.object=q,O.geometry=F,O.material=R,O.materialVariant=Y(q),O.groupOrder=B,O.renderOrder=q.renderOrder,O.z=E,O.group=D;return Q++,O}function H(q,F,R,B,E,D){let O=X(q,F,R,B,E,D);if(R.transmission>0)Z.push(O);else if(R.transparent===!0)W.push(O);else $.push(O)}function U(q,F,R,B,E,D){let O=X(q,F,R,B,E,D);if(R.transmission>0)Z.unshift(O);else if(R.transparent===!0)W.unshift(O);else $.unshift(O)}function N(q,F){if($.length>1)$.sort(q||i5);if(Z.length>1)Z.sort(F||cK);if(W.length>1)W.sort(F||cK)}function G(){for(let q=Q,F=J.length;q<F;q++){let R=J[q];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:H,unshift:U,finish:G,sort:N}}function o5(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),Y;if(K===void 0)Y=new nK,J.set(Z,[Y]);else if(W>=K.length)Y=new nK,K.push(Y);else Y=K[W];return Y}function $(){J=new WeakMap}return{get:Q,dispose:$}}function a5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new j,color:new x0};break;case"SpotLight":$={position:new j,direction:new j,color:new x0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new j,color:new x0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new j,skyColor:new x0,groundColor:new x0};break;case"RectAreaLight":$={color:new x0,position:new j,halfWidth:new j,halfHeight:new j};break}return J[Q.id]=$,$}}}function r5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var t5=0;function e5(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function JN(J){let Q=new a5,$=r5(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new j);let W=new j,K=new FJ,Y=new FJ;function X(U){let N=0,G=0,q=0;for(let k=0;k<9;k++)Z.probe[k].set(0,0,0);let F=0,R=0,B=0,E=0,D=0,O=0,V=0,z=0,A=0,P=0,C=0;U.sort(e5);for(let k=0,l=U.length;k<l;k++){let w=U[k],m=w.color,c=w.intensity,f=w.distance,d=null;if(w.shadow&&w.shadow.map)if(w.shadow.map.texture.format===D8)d=w.shadow.map.texture;else d=w.shadow.map.depthTexture||w.shadow.map.texture;if(w.isAmbientLight)N+=m.r*c,G+=m.g*c,q+=m.b*c;else if(w.isLightProbe){for(let b=0;b<9;b++)Z.probe[b].addScaledVector(w.sh.coefficients[b],c);C++}else if(w.isDirectionalLight){let b=Q.get(w);if(b.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let p=w.shadow,a=$.get(w);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,Z.directionalShadow[F]=a,Z.directionalShadowMap[F]=d,Z.directionalShadowMatrix[F]=w.shadow.matrix,O++}Z.directional[F]=b,F++}else if(w.isSpotLight){let b=Q.get(w);b.position.setFromMatrixPosition(w.matrixWorld),b.color.copy(m).multiplyScalar(c),b.distance=f,b.coneCos=Math.cos(w.angle),b.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),b.decay=w.decay,Z.spot[B]=b;let p=w.shadow;if(w.map){if(Z.spotLightMap[A]=w.map,A++,p.updateMatrices(w),w.castShadow)P++}if(Z.spotLightMatrix[B]=p.matrix,w.castShadow){let a=$.get(w);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,Z.spotShadow[B]=a,Z.spotShadowMap[B]=d,z++}B++}else if(w.isRectAreaLight){let b=Q.get(w);b.color.copy(m).multiplyScalar(c),b.halfWidth.set(w.width*0.5,0,0),b.halfHeight.set(0,w.height*0.5,0),Z.rectArea[E]=b,E++}else if(w.isPointLight){let b=Q.get(w);if(b.color.copy(w.color).multiplyScalar(w.intensity),b.distance=w.distance,b.decay=w.decay,w.castShadow){let p=w.shadow,a=$.get(w);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,a.shadowCameraNear=p.camera.near,a.shadowCameraFar=p.camera.far,Z.pointShadow[R]=a,Z.pointShadowMap[R]=d,Z.pointShadowMatrix[R]=w.shadow.matrix,V++}Z.point[R]=b,R++}else if(w.isHemisphereLight){let b=Q.get(w);b.skyColor.copy(w.color).multiplyScalar(c),b.groundColor.copy(w.groundColor).multiplyScalar(c),Z.hemi[D]=b,D++}}if(E>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=X0.LTC_FLOAT_1,Z.rectAreaLTC2=X0.LTC_FLOAT_2;else Z.rectAreaLTC1=X0.LTC_HALF_1,Z.rectAreaLTC2=X0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=G,Z.ambient[2]=q;let _=Z.hash;if(_.directionalLength!==F||_.pointLength!==R||_.spotLength!==B||_.rectAreaLength!==E||_.hemiLength!==D||_.numDirectionalShadows!==O||_.numPointShadows!==V||_.numSpotShadows!==z||_.numSpotMaps!==A||_.numLightProbes!==C)Z.directional.length=F,Z.spot.length=B,Z.rectArea.length=E,Z.point.length=R,Z.hemi.length=D,Z.directionalShadow.length=O,Z.directionalShadowMap.length=O,Z.pointShadow.length=V,Z.pointShadowMap.length=V,Z.spotShadow.length=z,Z.spotShadowMap.length=z,Z.directionalShadowMatrix.length=O,Z.pointShadowMatrix.length=V,Z.spotLightMatrix.length=z+A-P,Z.spotLightMap.length=A,Z.numSpotLightShadowsWithMaps=P,Z.numLightProbes=C,_.directionalLength=F,_.pointLength=R,_.spotLength=B,_.rectAreaLength=E,_.hemiLength=D,_.numDirectionalShadows=O,_.numPointShadows=V,_.numSpotShadows=z,_.numSpotMaps=A,_.numLightProbes=C,Z.version=t5++}function H(U,N){let G=0,q=0,F=0,R=0,B=0,E=N.matrixWorldInverse;for(let D=0,O=U.length;D<O;D++){let V=U[D];if(V.isDirectionalLight){let z=Z.directional[G];z.direction.setFromMatrixPosition(V.matrixWorld),W.setFromMatrixPosition(V.target.matrixWorld),z.direction.sub(W),z.direction.transformDirection(E),G++}else if(V.isSpotLight){let z=Z.spot[F];z.position.setFromMatrixPosition(V.matrixWorld),z.position.applyMatrix4(E),z.direction.setFromMatrixPosition(V.matrixWorld),W.setFromMatrixPosition(V.target.matrixWorld),z.direction.sub(W),z.direction.transformDirection(E),F++}else if(V.isRectAreaLight){let z=Z.rectArea[R];z.position.setFromMatrixPosition(V.matrixWorld),z.position.applyMatrix4(E),Y.identity(),K.copy(V.matrixWorld),K.premultiply(E),Y.extractRotation(K),z.halfWidth.set(V.width*0.5,0,0),z.halfHeight.set(0,V.height*0.5,0),z.halfWidth.applyMatrix4(Y),z.halfHeight.applyMatrix4(Y),R++}else if(V.isPointLight){let z=Z.point[q];z.position.setFromMatrixPosition(V.matrixWorld),z.position.applyMatrix4(E),q++}else if(V.isHemisphereLight){let z=Z.hemi[B];z.direction.setFromMatrixPosition(V.matrixWorld),z.direction.transformDirection(E),B++}}}return{setup:X,setupView:H,state:Z}}function sK(J){let Q=new JN(J),$=[],Z=[],W=[];function K(q){G.camera=q,$.length=0,Z.length=0,W.length=0}function Y(q){$.push(q)}function X(q){Z.push(q)}function H(q){W.push(q)}function U(){Q.setup($)}function N(q){Q.setupView($,q)}let G={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:G,setupLights:U,setupLightsView:N,pushLight:Y,pushShadow:X,pushLightProbeGrid:H}}function QN(J){let Q=new WeakMap;function $(W,K=0){let Y=Q.get(W),X;if(Y===void 0)X=new sK(J),Q.set(W,[X]);else if(K>=Y.length)X=new sK(J),Y.push(X);else X=Y[K];return X}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var $N=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZN=`uniform sampler2D shadow_pass;
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
}`,WN=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],KN=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],iK=new FJ,m7=new j,OZ=new j;function YN(J,Q,$){let Z=new y7,W=new B0,K=new B0,Y=new EJ,X=new i$,H=new o$,U={},N=$.maxTextureSize,G={[a8]:dJ,[dJ]:a8,[uJ]:uJ},q=new X9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B0},radius:{value:4}},vertexShader:$N,fragmentShader:ZN}),F=q.clone();F.defines.HORIZONTAL_PASS=1;let R=new nJ;R.setAttribute("position",new J9(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let B=new i0(R,q),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=V7;let D=this.type;this.render=function(P,C,_){if(E.enabled===!1)return;if(E.autoUpdate===!1&&E.needsUpdate===!1)return;if(P.length===0)return;if(this.type===k6)A0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=V7;let k=J.getRenderTarget(),l=J.getActiveCubeFace(),w=J.getActiveMipmapLevel(),m=J.state;if(m.setBlending(B9),m.buffers.depth.getReversed()===!0)m.buffers.color.setClear(0,0,0,0);else m.buffers.color.setClear(1,1,1,1);m.buffers.depth.setTest(!0),m.setScissorTest(!1);let c=D!==this.type;if(c)C.traverse(function(f){if(f.material)if(Array.isArray(f.material))f.material.forEach((d)=>d.needsUpdate=!0);else f.material.needsUpdate=!0});for(let f=0,d=P.length;f<d;f++){let b=P[f],p=b.shadow;if(p===void 0){A0("WebGLShadowMap:",b,"has no shadow.");continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;W.copy(p.mapSize);let a=p.getFrameExtents();if(W.multiply(a),K.copy(p.mapSize),W.x>N||W.y>N){if(W.x>N)K.x=Math.floor(N/a.x),W.x=K.x*a.x,p.mapSize.x=K.x;if(W.y>N)K.y=Math.floor(N/a.y),W.y=K.y*a.y,p.mapSize.y=K.y}let Q0=J.state.buffers.depth.getReversed();if(p.camera._reversedDepth=Q0,p.map===null||c===!0){if(p.map!==null){if(p.map.depthTexture!==null)p.map.depthTexture.dispose(),p.map.depthTexture=null;p.map.dispose()}if(this.type===o8){if(b.isPointLight){A0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}p.map=new Y9(W.x,W.y,{format:D8,type:p9,minFilter:cJ,magFilter:cJ,generateMipmaps:!1}),p.map.texture.name=b.name+".shadowMap",p.map.depthTexture=new Q8(W.x,W.y,g9),p.map.depthTexture.name=b.name+".shadowMapDepth",p.map.depthTexture.format=q8,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=t9,p.map.depthTexture.magFilter=t9}else{if(b.isPointLight)p.map=new LZ(W.x),p.map.depthTexture=new c$(W.x,e9);else p.map=new Y9(W.x,W.y),p.map.depthTexture=new Q8(W.x,W.y,e9);if(p.map.depthTexture.name=b.name+".shadowMap",p.map.depthTexture.format=q8,this.type===V7)p.map.depthTexture.compareFunction=Q0?h6:v6,p.map.depthTexture.minFilter=cJ,p.map.depthTexture.magFilter=cJ;else p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=t9,p.map.depthTexture.magFilter=t9}p.camera.updateProjectionMatrix()}let F0=p.map.isWebGLCubeRenderTarget?6:1;for(let I0=0;I0<F0;I0++){if(p.map.isWebGLCubeRenderTarget)J.setRenderTarget(p.map,I0),J.clear();else{if(I0===0)J.setRenderTarget(p.map),J.clear();let M0=p.getViewport(I0);Y.set(K.x*M0.x,K.y*M0.y,K.x*M0.z,K.y*M0.w),m.viewport(Y)}if(b.isPointLight){let{camera:M0,matrix:t0}=p,d0=b.distance||M0.far;if(d0!==M0.far)M0.far=d0,M0.updateProjectionMatrix();m7.setFromMatrixPosition(b.matrixWorld),M0.position.copy(m7),OZ.copy(M0.position),OZ.add(WN[I0]),M0.up.copy(KN[I0]),M0.lookAt(OZ),M0.updateMatrixWorld(),t0.makeTranslation(-m7.x,-m7.y,-m7.z),iK.multiplyMatrices(M0.projectionMatrix,M0.matrixWorldInverse),p._frustum.setFromProjectionMatrix(iK,M0.coordinateSystem,M0.reversedDepth)}else p.updateMatrices(b);Z=p.getFrustum(),z(C,_,p.camera,b,this.type)}if(p.isPointLightShadow!==!0&&this.type===o8)O(p,_);p.needsUpdate=!1}D=this.type,E.needsUpdate=!1,J.setRenderTarget(k,l,w)};function O(P,C){let _=Q.update(B);if(q.defines.VSM_SAMPLES!==P.blurSamples)q.defines.VSM_SAMPLES=P.blurSamples,F.defines.VSM_SAMPLES=P.blurSamples,q.needsUpdate=!0,F.needsUpdate=!0;if(P.mapPass===null)P.mapPass=new Y9(W.x,W.y,{format:D8,type:p9});q.uniforms.shadow_pass.value=P.map.depthTexture,q.uniforms.resolution.value=P.mapSize,q.uniforms.radius.value=P.radius,J.setRenderTarget(P.mapPass),J.clear(),J.renderBufferDirect(C,null,_,q,B,null),F.uniforms.shadow_pass.value=P.mapPass.texture,F.uniforms.resolution.value=P.mapSize,F.uniforms.radius.value=P.radius,J.setRenderTarget(P.map),J.clear(),J.renderBufferDirect(C,null,_,F,B,null)}function V(P,C,_,k){let l=null,w=_.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(w!==void 0)l=w;else if(l=_.isPointLight===!0?H:X,J.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let m=l.uuid,c=C.uuid,f=U[m];if(f===void 0)f={},U[m]=f;let d=f[c];if(d===void 0)d=l.clone(),f[c]=d,C.addEventListener("dispose",A);l=d}if(l.visible=C.visible,l.wireframe=C.wireframe,k===o8)l.side=C.shadowSide!==null?C.shadowSide:C.side;else l.side=C.shadowSide!==null?C.shadowSide:G[C.side];if(l.alphaMap=C.alphaMap,l.alphaTest=C.alphaToCoverage===!0?0.5:C.alphaTest,l.map=C.map,l.clipShadows=C.clipShadows,l.clippingPlanes=C.clippingPlanes,l.clipIntersection=C.clipIntersection,l.displacementMap=C.displacementMap,l.displacementScale=C.displacementScale,l.displacementBias=C.displacementBias,l.wireframeLinewidth=C.wireframeLinewidth,l.linewidth=C.linewidth,_.isPointLight===!0&&l.isMeshDistanceMaterial===!0){let m=J.properties.get(l);m.light=_}return l}function z(P,C,_,k,l){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)){if((P.castShadow||P.receiveShadow&&l===o8)&&(!P.frustumCulled||Z.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,P.matrixWorld);let c=Q.update(P),f=P.material;if(Array.isArray(f)){let d=c.groups;for(let b=0,p=d.length;b<p;b++){let a=d[b],Q0=f[a.materialIndex];if(Q0&&Q0.visible){let F0=V(P,Q0,k,l);P.onBeforeShadow(J,P,C,_,c,F0,a),J.renderBufferDirect(_,null,c,F0,P,a),P.onAfterShadow(J,P,C,_,c,F0,a)}}}else if(f.visible){let d=V(P,f,k,l);P.onBeforeShadow(J,P,C,_,c,d,null),J.renderBufferDirect(_,null,c,d,P,null),P.onAfterShadow(J,P,C,_,c,d,null)}}}let m=P.children;for(let c=0,f=m.length;c<f;c++)z(m[c],C,_,k,l)}function A(P){P.target.removeEventListener("dispose",A);for(let _ in U){let k=U[_],l=P.target.uuid;if(l in k)k[l].dispose(),delete k[l]}}}function XN(J,Q){function $(){let T=!1,Z0=new EJ,n=null,J0=new EJ(0,0,0,0);return{setMask:function(O0){if(n!==O0&&!T)J.colorMask(O0,O0,O0,O0),n=O0},setLocked:function(O0){T=O0},setClear:function(O0,t,L0,y0,LJ){if(LJ===!0)O0*=y0,t*=y0,L0*=y0;if(Z0.set(O0,t,L0,y0),J0.equals(Z0)===!1)J.clearColor(O0,t,L0,y0),J0.copy(Z0)},reset:function(){T=!1,n=null,J0.set(-1,0,0,0)}}}function Z(){let T=!1,Z0=!1,n=null,J0=null,O0=null;return{setReversed:function(t){if(Z0!==t){let L0=Q.get("EXT_clip_control");if(t)L0.clipControlEXT(L0.LOWER_LEFT_EXT,L0.ZERO_TO_ONE_EXT);else L0.clipControlEXT(L0.LOWER_LEFT_EXT,L0.NEGATIVE_ONE_TO_ONE_EXT);Z0=t;let y0=O0;O0=null,this.setClear(y0)}},getReversed:function(){return Z0},setTest:function(t){if(t)q0(J.DEPTH_TEST);else P0(J.DEPTH_TEST)},setMask:function(t){if(n!==t&&!T)J.depthMask(t),n=t},setFunc:function(t){if(Z0)t=_K[t];if(J0!==t){switch(t){case dW:J.depthFunc(J.NEVER);break;case uW:J.depthFunc(J.ALWAYS);break;case cW:J.depthFunc(J.LESS);break;case dQ:J.depthFunc(J.LEQUAL);break;case nW:J.depthFunc(J.EQUAL);break;case sW:J.depthFunc(J.GEQUAL);break;case iW:J.depthFunc(J.GREATER);break;case oW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}J0=t}},setLocked:function(t){T=t},setClear:function(t){if(O0!==t){if(O0=t,Z0)t=1-t;J.clearDepth(t)}},reset:function(){T=!1,n=null,J0=null,O0=null,Z0=!1}}}function W(){let T=!1,Z0=null,n=null,J0=null,O0=null,t=null,L0=null,y0=null,LJ=null;return{setTest:function(QJ){if(!T)if(QJ)q0(J.STENCIL_TEST);else P0(J.STENCIL_TEST)},setMask:function(QJ){if(Z0!==QJ&&!T)J.stencilMask(QJ),Z0=QJ},setFunc:function(QJ,O9,U9){if(n!==QJ||J0!==O9||O0!==U9)J.stencilFunc(QJ,O9,U9),n=QJ,J0=O9,O0=U9},setOp:function(QJ,O9,U9){if(t!==QJ||L0!==O9||y0!==U9)J.stencilOp(QJ,O9,U9),t=QJ,L0=O9,y0=U9},setLocked:function(QJ){T=QJ},setClear:function(QJ){if(LJ!==QJ)J.clearStencil(QJ),LJ=QJ},reset:function(){T=!1,Z0=null,n=null,J0=null,O0=null,t=null,L0=null,y0=null,LJ=null}}}let K=new $,Y=new Z,X=new W,H=new WeakMap,U=new WeakMap,N={},G={},q={},F=new WeakMap,R=[],B=null,E=!1,D=null,O=null,V=null,z=null,A=null,P=null,C=null,_=new x0(0,0,0),k=0,l=!1,w=null,m=null,c=null,f=null,d=null,b=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),p=!1,a=0,Q0=J.getParameter(J.VERSION);if(Q0.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(Q0)[1]),p=a>=1;else if(Q0.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(Q0)[1]),p=a>=2;let F0=null,I0={},M0=J.getParameter(J.SCISSOR_BOX),t0=J.getParameter(J.VIEWPORT),d0=new EJ().fromArray(M0),s=new EJ().fromArray(t0);function N0(T,Z0,n,J0){let O0=new Uint8Array(4),t=J.createTexture();J.bindTexture(T,t),J.texParameteri(T,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(T,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let L0=0;L0<n;L0++)if(T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY)J.texImage3D(Z0,0,J.RGBA,1,1,J0,0,J.RGBA,J.UNSIGNED_BYTE,O0);else J.texImage2D(Z0+L0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,O0);return t}let V0={};V0[J.TEXTURE_2D]=N0(J.TEXTURE_2D,J.TEXTURE_2D,1),V0[J.TEXTURE_CUBE_MAP]=N0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),V0[J.TEXTURE_2D_ARRAY]=N0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),V0[J.TEXTURE_3D]=N0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),Y.setClear(1),X.setClear(0),q0(J.DEPTH_TEST),Y.setFunc(dQ),yJ(!1),VJ(pQ),q0(J.CULL_FACE),h0(B9);function q0(T){if(N[T]!==!0)J.enable(T),N[T]=!0}function P0(T){if(N[T]!==!1)J.disable(T),N[T]=!1}function r0(T,Z0){if(q[T]!==Z0){if(J.bindFramebuffer(T,Z0),q[T]=Z0,T===J.DRAW_FRAMEBUFFER)q[J.FRAMEBUFFER]=Z0;if(T===J.FRAMEBUFFER)q[J.DRAW_FRAMEBUFFER]=Z0;return!0}return!1}function g0(T,Z0){let n=R,J0=!1;if(T){if(n=F.get(Z0),n===void 0)n=[],F.set(Z0,n);let O0=T.textures;if(n.length!==O0.length||n[0]!==J.COLOR_ATTACHMENT0){for(let t=0,L0=O0.length;t<L0;t++)n[t]=J.COLOR_ATTACHMENT0+t;n.length=O0.length,J0=!0}}else if(n[0]!==J.BACK)n[0]=J.BACK,J0=!0;if(J0)J.drawBuffers(n)}function u0(T){if(B!==T)return J.useProgram(T),B=T,!0;return!1}let WJ={[r8]:J.FUNC_ADD,[kW]:J.FUNC_SUBTRACT,[IW]:J.FUNC_REVERSE_SUBTRACT};WJ[AW]=J.MIN,WJ[PW]=J.MAX;let KJ={[wW]:J.ZERO,[CW]:J.ONE,[TW]:J.SRC_COLOR,[jW]:J.SRC_ALPHA,[bW]:J.SRC_ALPHA_SATURATE,[hW]:J.DST_COLOR,[fW]:J.DST_ALPHA,[SW]:J.ONE_MINUS_SRC_COLOR,[yW]:J.ONE_MINUS_SRC_ALPHA,[xW]:J.ONE_MINUS_DST_COLOR,[vW]:J.ONE_MINUS_DST_ALPHA,[gW]:J.CONSTANT_COLOR,[pW]:J.ONE_MINUS_CONSTANT_COLOR,[mW]:J.CONSTANT_ALPHA,[lW]:J.ONE_MINUS_CONSTANT_ALPHA};function h0(T,Z0,n,J0,O0,t,L0,y0,LJ,QJ){if(T===B9){if(E===!0)P0(J.BLEND),E=!1;return}if(E===!1)q0(J.BLEND),E=!0;if(T!==zW){if(T!==D||QJ!==l){if(O!==r8||A!==r8)J.blendEquation(J.FUNC_ADD),O=r8,A=r8;if(QJ)switch(T){case L7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case B7:J.blendFunc(J.ONE,J.ONE);break;case mQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case lQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:C0("WebGLState: Invalid blending: ",T);break}else switch(T){case L7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case B7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case mQ:C0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lQ:C0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:C0("WebGLState: Invalid blending: ",T);break}V=null,z=null,P=null,C=null,_.set(0,0,0),k=0,D=T,l=QJ}return}if(O0=O0||Z0,t=t||n,L0=L0||J0,Z0!==O||O0!==A)J.blendEquationSeparate(WJ[Z0],WJ[O0]),O=Z0,A=O0;if(n!==V||J0!==z||t!==P||L0!==C)J.blendFuncSeparate(KJ[n],KJ[J0],KJ[t],KJ[L0]),V=n,z=J0,P=t,C=L0;if(y0.equals(_)===!1||LJ!==k)J.blendColor(y0.r,y0.g,y0.b,LJ),_.copy(y0),k=LJ;D=T,l=!1}function SJ(T,Z0){T.side===uJ?P0(J.CULL_FACE):q0(J.CULL_FACE);let n=T.side===dJ;if(Z0)n=!n;yJ(n),T.blending===L7&&T.transparent===!1?h0(B9):h0(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),Y.setFunc(T.depthFunc),Y.setTest(T.depthTest),Y.setMask(T.depthWrite),K.setMask(T.colorWrite);let J0=T.stencilWrite;if(X.setTest(J0),J0)X.setMask(T.stencilWriteMask),X.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),X.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass);bJ(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?q0(J.SAMPLE_ALPHA_TO_COVERAGE):P0(J.SAMPLE_ALPHA_TO_COVERAGE)}function yJ(T){if(w!==T){if(T)J.frontFace(J.CW);else J.frontFace(J.CCW);w=T}}function VJ(T){if(T!==LW){if(q0(J.CULL_FACE),T!==m)if(T===pQ)J.cullFace(J.BACK);else if(T===BW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else P0(J.CULL_FACE);m=T}function S(T){if(T!==c){if(p)J.lineWidth(T);c=T}}function bJ(T,Z0,n){if(T){if(q0(J.POLYGON_OFFSET_FILL),f!==Z0||d!==n){if(f=Z0,d=n,Y.getReversed())Z0=-Z0;J.polygonOffset(Z0,n)}}else P0(J.POLYGON_OFFSET_FILL)}function n0(T){if(T)q0(J.SCISSOR_TEST);else P0(J.SCISSOR_TEST)}function a0(T){if(T===void 0)T=J.TEXTURE0+b-1;if(F0!==T)J.activeTexture(T),F0=T}function U0(T,Z0,n){if(n===void 0)if(F0===null)n=J.TEXTURE0+b-1;else n=F0;let J0=I0[n];if(J0===void 0)J0={type:void 0,texture:void 0},I0[n]=J0;if(J0.type!==T||J0.texture!==Z0){if(F0!==n)J.activeTexture(n),F0=n;J.bindTexture(T,Z0||V0[T]),J0.type=T,J0.texture=Z0}}function DJ(){let T=I0[F0];if(T!==void 0&&T.type!==void 0)J.bindTexture(T.type,null),T.type=void 0,T.texture=void 0}function w0(){try{J.compressedTexImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function I(){try{J.compressedTexImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function M(){try{J.texSubImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function v(){try{J.texSubImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function o(){try{J.compressedTexSubImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function r(){try{J.compressedTexSubImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function e(){try{J.texStorage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function K0(){try{J.texStorage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function u(){try{J.texImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function i(){try{J.texImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function W0(T){if(G[T]!==void 0)return G[T];else return J.getParameter(T)}function R0(T,Z0){if(G[T]!==Z0)J.pixelStorei(T,Z0),G[T]=Z0}function $0(T){if(d0.equals(T)===!1)J.scissor(T.x,T.y,T.z,T.w),d0.copy(T)}function Y0(T){if(s.equals(T)===!1)J.viewport(T.x,T.y,T.z,T.w),s.copy(T)}function S0(T,Z0){let n=U.get(Z0);if(n===void 0)n=new WeakMap,U.set(Z0,n);let J0=n.get(T);if(J0===void 0)J0=J.getUniformBlockIndex(Z0,T.name),n.set(T,J0)}function v0(T,Z0){let J0=U.get(Z0).get(T);if(H.get(Z0)!==J0)J.uniformBlockBinding(Z0,J0,T.__bindingPointIndex),H.set(Z0,J0)}function p0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),Y.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},G={},F0=null,I0={},q={},F=new WeakMap,R=[],B=null,E=!1,D=null,O=null,V=null,z=null,A=null,P=null,C=null,_=new x0(0,0,0),k=0,l=!1,w=null,m=null,c=null,f=null,d=null,d0.set(0,0,J.canvas.width,J.canvas.height),s.set(0,0,J.canvas.width,J.canvas.height),K.reset(),Y.reset(),X.reset()}return{buffers:{color:K,depth:Y,stencil:X},enable:q0,disable:P0,bindFramebuffer:r0,drawBuffers:g0,useProgram:u0,setBlending:h0,setMaterial:SJ,setFlipSided:yJ,setCullFace:VJ,setLineWidth:S,setPolygonOffset:bJ,setScissorTest:n0,activeTexture:a0,bindTexture:U0,unbindTexture:DJ,compressedTexImage2D:w0,compressedTexImage3D:I,texImage2D:u,texImage3D:i,pixelStorei:R0,getParameter:W0,updateUBOMapping:S0,uniformBlockBinding:v0,texStorage2D:e,texStorage3D:K0,texSubImage2D:M,texSubImage3D:v,compressedTexSubImage2D:o,compressedTexSubImage3D:r,scissor:$0,viewport:Y0,reset:p0}}function HN(J,Q,$,Z,W,K,Y){let X=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,H=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new B0,N=new WeakMap,G=new Set,q,F=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(I){}function B(I,M){return R?new OffscreenCanvas(I,M):n8("canvas")}function E(I,M,v){let o=1,r=w0(I);if(r.width>v||r.height>v)o=v/Math.max(r.width,r.height);if(o<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let e=Math.floor(o*r.width),K0=Math.floor(o*r.height);if(q===void 0)q=B(e,K0);let u=M?B(e,K0):q;return u.width=e,u.height=K0,u.getContext("2d").drawImage(I,0,0,e,K0),A0("WebGLRenderer: Texture has been resized from ("+r.width+"x"+r.height+") to ("+e+"x"+K0+")."),u}else{if("data"in I)A0("WebGLRenderer: Image in DataTexture is too big ("+r.width+"x"+r.height+").");return I}return I}function D(I){return I.generateMipmaps}function O(I){J.generateMipmap(I)}function V(I){if(I.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(I.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function z(I,M,v,o,r,e=!1){if(I!==null){if(J[I]!==void 0)return J[I];A0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let K0;if(o){if(K0=Q.get("EXT_texture_norm16"),!K0)A0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let u=M;if(M===J.RED){if(v===J.FLOAT)u=J.R32F;if(v===J.HALF_FLOAT)u=J.R16F;if(v===J.UNSIGNED_BYTE)u=J.R8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.R16_EXT;if(v===J.SHORT&&K0)u=K0.R16_SNORM_EXT}if(M===J.RED_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.R8UI;if(v===J.UNSIGNED_SHORT)u=J.R16UI;if(v===J.UNSIGNED_INT)u=J.R32UI;if(v===J.BYTE)u=J.R8I;if(v===J.SHORT)u=J.R16I;if(v===J.INT)u=J.R32I}if(M===J.RG){if(v===J.FLOAT)u=J.RG32F;if(v===J.HALF_FLOAT)u=J.RG16F;if(v===J.UNSIGNED_BYTE)u=J.RG8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.RG16_EXT;if(v===J.SHORT&&K0)u=K0.RG16_SNORM_EXT}if(M===J.RG_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RG8UI;if(v===J.UNSIGNED_SHORT)u=J.RG16UI;if(v===J.UNSIGNED_INT)u=J.RG32UI;if(v===J.BYTE)u=J.RG8I;if(v===J.SHORT)u=J.RG16I;if(v===J.INT)u=J.RG32I}if(M===J.RGB_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RGB8UI;if(v===J.UNSIGNED_SHORT)u=J.RGB16UI;if(v===J.UNSIGNED_INT)u=J.RGB32UI;if(v===J.BYTE)u=J.RGB8I;if(v===J.SHORT)u=J.RGB16I;if(v===J.INT)u=J.RGB32I}if(M===J.RGBA_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RGBA8UI;if(v===J.UNSIGNED_SHORT)u=J.RGBA16UI;if(v===J.UNSIGNED_INT)u=J.RGBA32UI;if(v===J.BYTE)u=J.RGBA8I;if(v===J.SHORT)u=J.RGBA16I;if(v===J.INT)u=J.RGBA32I}if(M===J.RGB){if(v===J.UNSIGNED_SHORT&&K0)u=K0.RGB16_EXT;if(v===J.SHORT&&K0)u=K0.RGB16_SNORM_EXT;if(v===J.UNSIGNED_INT_5_9_9_9_REV)u=J.RGB9_E5;if(v===J.UNSIGNED_INT_10F_11F_11F_REV)u=J.R11F_G11F_B10F}if(M===J.RGBA){let i=e?v$:c0.getTransfer(r);if(v===J.FLOAT)u=J.RGBA32F;if(v===J.HALF_FLOAT)u=J.RGBA16F;if(v===J.UNSIGNED_BYTE)u=i===HJ?J.SRGB8_ALPHA8:J.RGBA8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.RGBA16_EXT;if(v===J.SHORT&&K0)u=K0.RGBA16_SNORM_EXT;if(v===J.UNSIGNED_SHORT_4_4_4_4)u=J.RGBA4;if(v===J.UNSIGNED_SHORT_5_5_5_1)u=J.RGB5_A1}if(u===J.R16F||u===J.R32F||u===J.RG16F||u===J.RG32F||u===J.RGBA16F||u===J.RGBA32F)Q.get("EXT_color_buffer_float");return u}function A(I,M){let v;if(I){if(M===null||M===e9||M===e8)v=J.DEPTH24_STENCIL8;else if(M===g9)v=J.DEPTH32F_STENCIL8;else if(M===I7)v=J.DEPTH24_STENCIL8,A0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(M===null||M===e9||M===e8)v=J.DEPTH_COMPONENT24;else if(M===g9)v=J.DEPTH_COMPONENT32F;else if(M===I7)v=J.DEPTH_COMPONENT16;return v}function P(I,M){if(D(I)===!0||I.isFramebufferTexture&&I.minFilter!==t9&&I.minFilter!==cJ)return Math.log2(Math.max(M.width,M.height))+1;else if(I.mipmaps!==void 0&&I.mipmaps.length>0)return I.mipmaps.length;else if(I.isCompressedTexture&&Array.isArray(I.image))return M.mipmaps.length;else return 1}function C(I){let M=I.target;if(M.removeEventListener("dispose",C),k(M),M.isVideoTexture)N.delete(M);if(M.isHTMLTexture)G.delete(M)}function _(I){let M=I.target;M.removeEventListener("dispose",_),w(M)}function k(I){let M=Z.get(I);if(M.__webglInit===void 0)return;let v=I.source,o=F.get(v);if(o){let r=o[M.__cacheKey];if(r.usedTimes--,r.usedTimes===0)l(I);if(Object.keys(o).length===0)F.delete(v)}Z.remove(I)}function l(I){let M=Z.get(I);J.deleteTexture(M.__webglTexture);let v=I.source,o=F.get(v);delete o[M.__cacheKey],Y.memory.textures--}function w(I){let M=Z.get(I);if(I.depthTexture)I.depthTexture.dispose(),Z.remove(I.depthTexture);if(I.isWebGLCubeRenderTarget)for(let o=0;o<6;o++){if(Array.isArray(M.__webglFramebuffer[o]))for(let r=0;r<M.__webglFramebuffer[o].length;r++)J.deleteFramebuffer(M.__webglFramebuffer[o][r]);else J.deleteFramebuffer(M.__webglFramebuffer[o]);if(M.__webglDepthbuffer)J.deleteRenderbuffer(M.__webglDepthbuffer[o])}else{if(Array.isArray(M.__webglFramebuffer))for(let o=0;o<M.__webglFramebuffer.length;o++)J.deleteFramebuffer(M.__webglFramebuffer[o]);else J.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer)J.deleteRenderbuffer(M.__webglDepthbuffer);if(M.__webglMultisampledFramebuffer)J.deleteFramebuffer(M.__webglMultisampledFramebuffer);if(M.__webglColorRenderbuffer){for(let o=0;o<M.__webglColorRenderbuffer.length;o++)if(M.__webglColorRenderbuffer[o])J.deleteRenderbuffer(M.__webglColorRenderbuffer[o])}if(M.__webglDepthRenderbuffer)J.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let v=I.textures;for(let o=0,r=v.length;o<r;o++){let e=Z.get(v[o]);if(e.__webglTexture)J.deleteTexture(e.__webglTexture),Y.memory.textures--;Z.remove(v[o])}Z.remove(I)}let m=0;function c(){m=0}function f(){return m}function d(I){m=I}function b(){let I=m;if(I>=W.maxTextures)A0("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+W.maxTextures);return m+=1,I}function p(I){let M=[];return M.push(I.wrapS),M.push(I.wrapT),M.push(I.wrapR||0),M.push(I.magFilter),M.push(I.minFilter),M.push(I.anisotropy),M.push(I.internalFormat),M.push(I.format),M.push(I.type),M.push(I.generateMipmaps),M.push(I.premultiplyAlpha),M.push(I.flipY),M.push(I.unpackAlignment),M.push(I.colorSpace),M.join()}function a(I,M){let v=Z.get(I);if(I.isVideoTexture)U0(I);if(I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&v.__version!==I.version){let o=I.image;if(o===null)A0("WebGLRenderer: Texture marked for update but no image data found.");else if(o.complete===!1)A0("WebGLRenderer: Texture marked for update but image is incomplete");else{P0(v,I,M);return}}else if(I.isExternalTexture)v.__webglTexture=I.sourceTexture?I.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,v.__webglTexture,J.TEXTURE0+M)}function Q0(I,M){let v=Z.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&v.__version!==I.version){P0(v,I,M);return}else if(I.isExternalTexture)v.__webglTexture=I.sourceTexture?I.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,v.__webglTexture,J.TEXTURE0+M)}function F0(I,M){let v=Z.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&v.__version!==I.version){P0(v,I,M);return}$.bindTexture(J.TEXTURE_3D,v.__webglTexture,J.TEXTURE0+M)}function I0(I,M){let v=Z.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&v.__version!==I.version){r0(v,I,M);return}$.bindTexture(J.TEXTURE_CUBE_MAP,v.__webglTexture,J.TEXTURE0+M)}let M0={[eW]:J.REPEAT,[P6]:J.CLAMP_TO_EDGE,[JK]:J.MIRRORED_REPEAT},t0={[t9]:J.NEAREST,[QK]:J.NEAREST_MIPMAP_NEAREST,[k7]:J.NEAREST_MIPMAP_LINEAR,[cJ]:J.LINEAR,[w6]:J.LINEAR_MIPMAP_NEAREST,[N8]:J.LINEAR_MIPMAP_LINEAR},d0={[GK]:J.NEVER,[EK]:J.ALWAYS,[NK]:J.LESS,[v6]:J.LEQUAL,[qK]:J.EQUAL,[h6]:J.GEQUAL,[FK]:J.GREATER,[DK]:J.NOTEQUAL};function s(I,M){if(M.type===g9&&Q.has("OES_texture_float_linear")===!1&&(M.magFilter===cJ||M.magFilter===w6||M.magFilter===k7||M.magFilter===N8||M.minFilter===cJ||M.minFilter===w6||M.minFilter===k7||M.minFilter===N8))A0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(I,J.TEXTURE_WRAP_S,M0[M.wrapS]),J.texParameteri(I,J.TEXTURE_WRAP_T,M0[M.wrapT]),I===J.TEXTURE_3D||I===J.TEXTURE_2D_ARRAY)J.texParameteri(I,J.TEXTURE_WRAP_R,M0[M.wrapR]);if(J.texParameteri(I,J.TEXTURE_MAG_FILTER,t0[M.magFilter]),J.texParameteri(I,J.TEXTURE_MIN_FILTER,t0[M.minFilter]),M.compareFunction)J.texParameteri(I,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(I,J.TEXTURE_COMPARE_FUNC,d0[M.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===t9)return;if(M.minFilter!==k7&&M.minFilter!==N8)return;if(M.type===g9&&Q.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||Z.get(M).__currentAnisotropy){let v=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(I,v.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,W.getMaxAnisotropy())),Z.get(M).__currentAnisotropy=M.anisotropy}}}function N0(I,M){let v=!1;if(I.__webglInit===void 0)I.__webglInit=!0,M.addEventListener("dispose",C);let o=M.source,r=F.get(o);if(r===void 0)r={},F.set(o,r);let e=p(M);if(e!==I.__cacheKey){if(r[e]===void 0)r[e]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,v=!0;r[e].usedTimes++;let K0=r[I.__cacheKey];if(K0!==void 0){if(r[I.__cacheKey].usedTimes--,K0.usedTimes===0)l(M)}I.__cacheKey=e,I.__webglTexture=r[e].texture}return v}function V0(I,M,v){return Math.floor(Math.floor(I/v)/M)}function q0(I,M,v,o){let e=I.updateRanges;if(e.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,M.width,M.height,v,o,M.data);else{e.sort((R0,$0)=>R0.start-$0.start);let K0=0;for(let R0=1;R0<e.length;R0++){let $0=e[K0],Y0=e[R0],S0=$0.start+$0.count,v0=V0(Y0.start,M.width,4),p0=V0($0.start,M.width,4);if(Y0.start<=S0+1&&v0===p0&&V0(Y0.start+Y0.count-1,M.width,4)===v0)$0.count=Math.max($0.count,Y0.start+Y0.count-$0.start);else++K0,e[K0]=Y0}e.length=K0+1;let u=$.getParameter(J.UNPACK_ROW_LENGTH),i=$.getParameter(J.UNPACK_SKIP_PIXELS),W0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,M.width);for(let R0=0,$0=e.length;R0<$0;R0++){let Y0=e[R0],S0=Math.floor(Y0.start/4),v0=Math.ceil(Y0.count/4),p0=S0%M.width,T=Math.floor(S0/M.width),Z0=v0,n=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,p0),$.pixelStorei(J.UNPACK_SKIP_ROWS,T),$.texSubImage2D(J.TEXTURE_2D,0,p0,T,Z0,1,v,o,M.data)}I.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,u),$.pixelStorei(J.UNPACK_SKIP_PIXELS,i),$.pixelStorei(J.UNPACK_SKIP_ROWS,W0)}}function P0(I,M,v){let o=J.TEXTURE_2D;if(M.isDataArrayTexture||M.isCompressedArrayTexture)o=J.TEXTURE_2D_ARRAY;if(M.isData3DTexture)o=J.TEXTURE_3D;let r=N0(I,M),e=M.source;$.bindTexture(o,I.__webglTexture,J.TEXTURE0+v);let K0=Z.get(e);if(e.version!==K0.__version||r===!0){if($.activeTexture(J.TEXTURE0+v),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let n=c0.getPrimaries(c0.workingColorSpace),J0=M.colorSpace===E8?null:c0.getPrimaries(M.colorSpace),O0=M.colorSpace===E8||n===J0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,O0)}$.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment);let i=E(M.image,!1,W.maxTextureSize);i=DJ(M,i);let W0=K.convert(M.format,M.colorSpace),R0=K.convert(M.type),$0=z(M.internalFormat,W0,R0,M.normalized,M.colorSpace,M.isVideoTexture);s(o,M);let Y0,S0=M.mipmaps,v0=M.isVideoTexture!==!0,p0=K0.__version===void 0||r===!0,T=e.dataReady,Z0=P(M,i);if(M.isDepthTexture){if($0=A(M.format===F8,M.type),p0)if(v0)$.texStorage2D(J.TEXTURE_2D,1,$0,i.width,i.height);else $.texImage2D(J.TEXTURE_2D,0,$0,i.width,i.height,0,W0,R0,null)}else if(M.isDataTexture)if(S0.length>0){if(v0&&p0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,S0[0].width,S0[0].height);for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,R0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,W0,R0,Y0.data);M.generateMipmaps=!1}else if(v0){if(p0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,i.width,i.height);if(T)q0(M,i,W0,R0)}else $.texImage2D(J.TEXTURE_2D,0,$0,i.width,i.height,0,W0,R0,i.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){if(v0&&p0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,$0,S0[0].width,S0[0].height,i.depth);for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],M.format!==z9)if(W0!==null)if(v0){if(T)if(M.layerUpdates.size>0){let O0=NZ(Y0.width,Y0.height,M.format,M.type);for(let t of M.layerUpdates){let L0=Y0.data.subarray(t*O0/Y0.data.BYTES_PER_ELEMENT,(t+1)*O0/Y0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,t,Y0.width,Y0.height,1,W0,L0)}M.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,0,Y0.width,Y0.height,i.depth,W0,Y0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,n,$0,Y0.width,Y0.height,i.depth,0,Y0.data,0,0);else A0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(v0){if(T)$.texSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,0,Y0.width,Y0.height,i.depth,W0,R0,Y0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,n,$0,Y0.width,Y0.height,i.depth,0,W0,R0,Y0.data)}else{if(v0&&p0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,S0[0].width,S0[0].height);for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],M.format!==z9)if(W0!==null)if(v0){if(T)$.compressedTexSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,Y0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,Y0.data);else A0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,R0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,W0,R0,Y0.data)}else if(M.isDataArrayTexture)if(v0){if(p0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,$0,i.width,i.height,i.depth);if(T)if(M.layerUpdates.size>0){let n=NZ(i.width,i.height,M.format,M.type);for(let J0 of M.layerUpdates){let O0=i.data.subarray(J0*n/i.data.BYTES_PER_ELEMENT,(J0+1)*n/i.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,J0,i.width,i.height,1,W0,R0,O0)}M.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,W0,R0,i.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,$0,i.width,i.height,i.depth,0,W0,R0,i.data);else if(M.isData3DTexture)if(v0){if(p0)$.texStorage3D(J.TEXTURE_3D,Z0,$0,i.width,i.height,i.depth);if(T)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,W0,R0,i.data)}else $.texImage3D(J.TEXTURE_3D,0,$0,i.width,i.height,i.depth,0,W0,R0,i.data);else if(M.isFramebufferTexture){if(p0)if(v0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,i.width,i.height);else{let{width:n,height:J0}=i;for(let O0=0;O0<Z0;O0++)$.texImage2D(J.TEXTURE_2D,O0,$0,n,J0,0,W0,R0,null),n>>=1,J0>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in J){let n=J.canvas;if(!n.hasAttribute("layoutsubtree"))n.setAttribute("layoutsubtree","true");if(i.parentNode!==n){n.appendChild(i),G.add(M),n.onpaint=(y0)=>{let LJ=y0.changedElements;for(let QJ of G)if(LJ.includes(QJ.image))QJ.needsUpdate=!0},n.requestPaint();return}let J0=0,O0=J.RGBA,t=J.RGBA,L0=J.UNSIGNED_BYTE;J.texElementImage2D(J.TEXTURE_2D,J0,O0,t,L0,i),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(S0.length>0){if(v0&&p0){let n=w0(S0[0]);$.texStorage2D(J.TEXTURE_2D,Z0,$0,n.width,n.height)}for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,W0,R0,Y0)}else $.texImage2D(J.TEXTURE_2D,n,$0,W0,R0,Y0);M.generateMipmaps=!1}else if(v0){if(p0){let n=w0(i);$.texStorage2D(J.TEXTURE_2D,Z0,$0,n.width,n.height)}if(T)$.texSubImage2D(J.TEXTURE_2D,0,0,0,W0,R0,i)}else $.texImage2D(J.TEXTURE_2D,0,$0,W0,R0,i);if(D(M))O(o);if(K0.__version=e.version,M.onUpdate)M.onUpdate(M)}I.__version=M.version}function r0(I,M,v){if(M.image.length!==6)return;let o=N0(I,M),r=M.source;$.bindTexture(J.TEXTURE_CUBE_MAP,I.__webglTexture,J.TEXTURE0+v);let e=Z.get(r);if(r.version!==e.__version||o===!0){$.activeTexture(J.TEXTURE0+v);let K0=c0.getPrimaries(c0.workingColorSpace),u=M.colorSpace===E8?null:c0.getPrimaries(M.colorSpace),i=M.colorSpace===E8||K0===u?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,i);let W0=M.isCompressedTexture||M.image[0].isCompressedTexture,R0=M.image[0]&&M.image[0].isDataTexture,$0=[];for(let t=0;t<6;t++){if(!W0&&!R0)$0[t]=E(M.image[t],!0,W.maxCubemapSize);else $0[t]=R0?M.image[t].image:M.image[t];$0[t]=DJ(M,$0[t])}let Y0=$0[0],S0=K.convert(M.format,M.colorSpace),v0=K.convert(M.type),p0=z(M.internalFormat,S0,v0,M.normalized,M.colorSpace),T=M.isVideoTexture!==!0,Z0=e.__version===void 0||o===!0,n=r.dataReady,J0=P(M,Y0);s(J.TEXTURE_CUBE_MAP,M);let O0;if(W0){if(T&&Z0)$.texStorage2D(J.TEXTURE_CUBE_MAP,J0,p0,Y0.width,Y0.height);for(let t=0;t<6;t++){O0=$0[t].mipmaps;for(let L0=0;L0<O0.length;L0++){let y0=O0[L0];if(M.format!==z9)if(S0!==null)if(T){if(n)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,0,0,y0.width,y0.height,S0,y0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,p0,y0.width,y0.height,0,y0.data);else A0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,0,0,y0.width,y0.height,S0,v0,y0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,p0,y0.width,y0.height,0,S0,v0,y0.data)}}}else{if(O0=M.mipmaps,T&&Z0){if(O0.length>0)J0++;let t=w0($0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,J0,p0,t.width,t.height)}for(let t=0;t<6;t++)if(R0){if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,$0[t].width,$0[t].height,S0,v0,$0[t].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,p0,$0[t].width,$0[t].height,0,S0,v0,$0[t].data);for(let L0=0;L0<O0.length;L0++){let LJ=O0[L0].image[t].image;if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,0,0,LJ.width,LJ.height,S0,v0,LJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,p0,LJ.width,LJ.height,0,S0,v0,LJ.data)}}else{if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,S0,v0,$0[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,p0,S0,v0,$0[t]);for(let L0=0;L0<O0.length;L0++){let y0=O0[L0];if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,0,0,S0,v0,y0.image[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,p0,S0,v0,y0.image[t])}}}if(D(M))O(J.TEXTURE_CUBE_MAP);if(e.__version=r.version,M.onUpdate)M.onUpdate(M)}I.__version=M.version}function g0(I,M,v,o,r,e){let K0=K.convert(v.format,v.colorSpace),u=K.convert(v.type),i=z(v.internalFormat,K0,u,v.normalized,v.colorSpace),W0=Z.get(M),R0=Z.get(v);if(R0.__renderTarget=M,!W0.__hasExternalTextures){let $0=Math.max(1,M.width>>e),Y0=Math.max(1,M.height>>e);if(r===J.TEXTURE_3D||r===J.TEXTURE_2D_ARRAY)$.texImage3D(r,e,i,$0,Y0,M.depth,0,K0,u,null);else $.texImage2D(r,e,i,$0,Y0,0,K0,u,null)}if($.bindFramebuffer(J.FRAMEBUFFER,I),a0(M))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,r,R0.__webglTexture,0,n0(M));else if(r===J.TEXTURE_2D||r>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&r<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,o,r,R0.__webglTexture,e);$.bindFramebuffer(J.FRAMEBUFFER,null)}function u0(I,M,v){if(J.bindRenderbuffer(J.RENDERBUFFER,I),M.depthBuffer){let o=M.depthTexture,r=o&&o.isDepthTexture?o.type:null,e=A(M.stencilBuffer,r),K0=M.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(a0(M))X.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,n0(M),e,M.width,M.height);else if(v)J.renderbufferStorageMultisample(J.RENDERBUFFER,n0(M),e,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,e,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,K0,J.RENDERBUFFER,I)}else{let o=M.textures;for(let r=0;r<o.length;r++){let e=o[r],K0=K.convert(e.format,e.colorSpace),u=K.convert(e.type),i=z(e.internalFormat,K0,u,e.normalized,e.colorSpace);if(a0(M))X.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,n0(M),i,M.width,M.height);else if(v)J.renderbufferStorageMultisample(J.RENDERBUFFER,n0(M),i,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,i,M.width,M.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function WJ(I,M,v){let o=M.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,I),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let r=Z.get(M.depthTexture);if(r.__renderTarget=M,!r.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0;if(o){if(r.__webglInit===void 0)r.__webglInit=!0,M.depthTexture.addEventListener("dispose",C);if(r.__webglTexture===void 0){r.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,r.__webglTexture),s(J.TEXTURE_CUBE_MAP,M.depthTexture);let W0=K.convert(M.depthTexture.format),R0=K.convert(M.depthTexture.type),$0;if(M.depthTexture.format===q8)$0=J.DEPTH_COMPONENT24;else if(M.depthTexture.format===F8)$0=J.DEPTH24_STENCIL8;for(let Y0=0;Y0<6;Y0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Y0,0,$0,M.width,M.height,0,W0,R0,null)}}else a(M.depthTexture,0);let e=r.__webglTexture,K0=n0(M),u=o?J.TEXTURE_CUBE_MAP_POSITIVE_X+v:J.TEXTURE_2D,i=M.depthTexture.format===F8?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(M.depthTexture.format===q8)if(a0(M))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,e,0,K0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,e,0);else if(M.depthTexture.format===F8)if(a0(M))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,e,0,K0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,e,0);else throw Error("Unknown depthTexture format")}function KJ(I){let M=Z.get(I),v=I.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==I.depthTexture){let o=I.depthTexture;if(M.__depthDisposeCallback)M.__depthDisposeCallback();if(o){let r=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,o.removeEventListener("dispose",r)};o.addEventListener("dispose",r),M.__depthDisposeCallback=r}M.__boundDepthTexture=o}if(I.depthTexture&&!M.__autoAllocateDepthBuffer)if(v)for(let o=0;o<6;o++)WJ(M.__webglFramebuffer[o],I,o);else{let o=I.texture.mipmaps;if(o&&o.length>0)WJ(M.__webglFramebuffer[0],I,0);else WJ(M.__webglFramebuffer,I,0)}else if(v){M.__webglDepthbuffer=[];for(let o=0;o<6;o++)if($.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[o]),M.__webglDepthbuffer[o]===void 0)M.__webglDepthbuffer[o]=J.createRenderbuffer(),u0(M.__webglDepthbuffer[o],I,!1);else{let r=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,e=M.__webglDepthbuffer[o];J.bindRenderbuffer(J.RENDERBUFFER,e),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,e)}}else{let o=I.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer);if(M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=J.createRenderbuffer(),u0(M.__webglDepthbuffer,I,!1);else{let r=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,e=M.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,e),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,e)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function h0(I,M,v){let o=Z.get(I);if(M!==void 0)g0(o.__webglFramebuffer,I,I.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(v!==void 0)KJ(I)}function SJ(I){let M=I.texture,v=Z.get(I),o=Z.get(M);I.addEventListener("dispose",_);let r=I.textures,e=I.isWebGLCubeRenderTarget===!0,K0=r.length>1;if(!K0){if(o.__webglTexture===void 0)o.__webglTexture=J.createTexture();o.__version=M.version,Y.memory.textures++}if(e){v.__webglFramebuffer=[];for(let u=0;u<6;u++)if(M.mipmaps&&M.mipmaps.length>0){v.__webglFramebuffer[u]=[];for(let i=0;i<M.mipmaps.length;i++)v.__webglFramebuffer[u][i]=J.createFramebuffer()}else v.__webglFramebuffer[u]=J.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){v.__webglFramebuffer=[];for(let u=0;u<M.mipmaps.length;u++)v.__webglFramebuffer[u]=J.createFramebuffer()}else v.__webglFramebuffer=J.createFramebuffer();if(K0)for(let u=0,i=r.length;u<i;u++){let W0=Z.get(r[u]);if(W0.__webglTexture===void 0)W0.__webglTexture=J.createTexture(),Y.memory.textures++}if(I.samples>0&&a0(I)===!1){v.__webglMultisampledFramebuffer=J.createFramebuffer(),v.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,v.__webglMultisampledFramebuffer);for(let u=0;u<r.length;u++){let i=r[u];v.__webglColorRenderbuffer[u]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,v.__webglColorRenderbuffer[u]);let W0=K.convert(i.format,i.colorSpace),R0=K.convert(i.type),$0=z(i.internalFormat,W0,R0,i.normalized,i.colorSpace,I.isXRRenderTarget===!0),Y0=n0(I);J.renderbufferStorageMultisample(J.RENDERBUFFER,Y0,$0,I.width,I.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u,J.RENDERBUFFER,v.__webglColorRenderbuffer[u])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),I.depthBuffer)v.__webglDepthRenderbuffer=J.createRenderbuffer(),u0(v.__webglDepthRenderbuffer,I,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(e){$.bindTexture(J.TEXTURE_CUBE_MAP,o.__webglTexture),s(J.TEXTURE_CUBE_MAP,M);for(let u=0;u<6;u++)if(M.mipmaps&&M.mipmaps.length>0)for(let i=0;i<M.mipmaps.length;i++)g0(v.__webglFramebuffer[u][i],I,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,i);else g0(v.__webglFramebuffer[u],I,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,0);if(D(M))O(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(K0){for(let u=0,i=r.length;u<i;u++){let W0=r[u],R0=Z.get(W0),$0=J.TEXTURE_2D;if(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)$0=I.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture($0,R0.__webglTexture),s($0,W0),g0(v.__webglFramebuffer,I,W0,J.COLOR_ATTACHMENT0+u,$0,0),D(W0))O($0)}$.unbindTexture()}else{let u=J.TEXTURE_2D;if(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)u=I.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(u,o.__webglTexture),s(u,M),M.mipmaps&&M.mipmaps.length>0)for(let i=0;i<M.mipmaps.length;i++)g0(v.__webglFramebuffer[i],I,M,J.COLOR_ATTACHMENT0,u,i);else g0(v.__webglFramebuffer,I,M,J.COLOR_ATTACHMENT0,u,0);if(D(M))O(u);$.unbindTexture()}if(I.depthBuffer)KJ(I)}function yJ(I){let M=I.textures;for(let v=0,o=M.length;v<o;v++){let r=M[v];if(D(r)){let e=V(I),K0=Z.get(r).__webglTexture;$.bindTexture(e,K0),O(e),$.unbindTexture()}}}let VJ=[],S=[];function bJ(I){if(I.samples>0){if(a0(I)===!1){let{textures:M,width:v,height:o}=I,r=J.COLOR_BUFFER_BIT,e=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,K0=Z.get(I),u=M.length>1;if(u)for(let W0=0;W0<M.length;W0++)$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,K0.__webglMultisampledFramebuffer);let i=I.texture.mipmaps;if(i&&i.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglFramebuffer);for(let W0=0;W0<M.length;W0++){if(I.resolveDepthBuffer){if(I.depthBuffer)r|=J.DEPTH_BUFFER_BIT;if(I.stencilBuffer&&I.resolveStencilBuffer)r|=J.STENCIL_BUFFER_BIT}if(u){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,K0.__webglColorRenderbuffer[W0]);let R0=Z.get(M[W0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,R0,0)}if(J.blitFramebuffer(0,0,v,o,0,0,v,o,r,J.NEAREST),H===!0){if(VJ.length=0,S.length=0,VJ.push(J.COLOR_ATTACHMENT0+W0),I.depthBuffer&&I.resolveDepthBuffer===!1)VJ.push(e),S.push(e),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,S);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,VJ)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),u)for(let W0=0;W0<M.length;W0++){$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,K0.__webglColorRenderbuffer[W0]);let R0=Z.get(M[W0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.TEXTURE_2D,R0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&H){let M=I.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[M])}}}function n0(I){return Math.min(W.maxSamples,I.samples)}function a0(I){let M=Z.get(I);return I.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function U0(I){let M=Y.render.frame;if(N.get(I)!==M)N.set(I,M),I.update()}function DJ(I,M){let{colorSpace:v,format:o,type:r}=I;if(I.isCompressedTexture===!0||I.isVideoTexture===!0)return M;if(v!==f$&&v!==E8)if(c0.getTransfer(v)===HJ){if(o!==z9||r!==R9)A0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else C0("WebGLTextures: Unsupported texture color space:",v);return M}function w0(I){if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement)U.width=I.naturalWidth||I.width,U.height=I.naturalHeight||I.height;else if(typeof VideoFrame<"u"&&I instanceof VideoFrame)U.width=I.displayWidth,U.height=I.displayHeight;else U.width=I.width,U.height=I.height;return U}this.allocateTextureUnit=b,this.resetTextureUnits=c,this.getTextureUnits=f,this.setTextureUnits=d,this.setTexture2D=a,this.setTexture2DArray=Q0,this.setTexture3D=F0,this.setTextureCube=I0,this.rebindTextures=h0,this.setupRenderTarget=SJ,this.updateRenderTargetMipmap=yJ,this.updateMultisampleRenderTarget=bJ,this.setupDepthRenderbuffer=KJ,this.setupFrameBufferTexture=g0,this.useMultisampledRTT=a0,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function UN(J,Q){function $(Z,W=E8){let K,Y=c0.getTransfer(W);if(Z===R9)return J.UNSIGNED_BYTE;if(Z===tQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===eQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===WK)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===KK)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===$K)return J.BYTE;if(Z===ZK)return J.SHORT;if(Z===I7)return J.UNSIGNED_SHORT;if(Z===rQ)return J.INT;if(Z===e9)return J.UNSIGNED_INT;if(Z===g9)return J.FLOAT;if(Z===p9)return J.HALF_FLOAT;if(Z===YK)return J.ALPHA;if(Z===XK)return J.RGB;if(Z===z9)return J.RGBA;if(Z===q8)return J.DEPTH_COMPONENT;if(Z===F8)return J.DEPTH_STENCIL;if(Z===HK)return J.RED;if(Z===J$)return J.RED_INTEGER;if(Z===D8)return J.RG;if(Z===Q$)return J.RG_INTEGER;if(Z===$$)return J.RGBA_INTEGER;if(Z===C6||Z===T6||Z===S6||Z===j6)if(Y===HJ)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===C6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===T6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===S6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===j6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===C6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===T6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===S6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===j6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===Z$||Z===W$||Z===K$||Z===Y$)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===Z$)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===W$)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===K$)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===Y$)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===X$||Z===H$||Z===U$||Z===G$||Z===N$||Z===y6||Z===q$)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===X$||Z===H$)return Y===HJ?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===U$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===G$)return K.COMPRESSED_R11_EAC;if(Z===N$)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===y6)return K.COMPRESSED_RG11_EAC;if(Z===q$)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===F$||Z===D$||Z===E$||Z===R$||Z===O$||Z===M$||Z===_$||Z===V$||Z===L$||Z===B$||Z===z$||Z===k$||Z===I$||Z===A$)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===F$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===D$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===E$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===R$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===O$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===M$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===_$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===V$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===L$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===B$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===z$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===k$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===I$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===A$)return Y===HJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===P$||Z===w$||Z===C$)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===P$)return Y===HJ?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===w$)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===C$)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===T$||Z===S$||Z===f6||Z===j$)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===T$)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===S$)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===f6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===j$)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===e8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var GN=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,NN=`
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

}`;class YY{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new l6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new X9({vertexShader:GN,fragmentShader:NN,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new i0(new A9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class XY extends k9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,Y="local-floor",X=1,H=null,U=null,N=null,G=null,q=null,F=null,R=typeof XRWebGLBinding<"u",B=new YY,E={},D=Q.getContextAttributes(),O=null,V=null,z=[],A=[],P=new B0,C=null,_=new pJ;_.viewport=new EJ;let k=new pJ;k.viewport=new EJ;let l=[_,k],w=new XZ,m=null,c=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(s){let N0=z[s];if(N0===void 0)N0=new C7,z[s]=N0;return N0.getTargetRaySpace()},this.getControllerGrip=function(s){let N0=z[s];if(N0===void 0)N0=new C7,z[s]=N0;return N0.getGripSpace()},this.getHand=function(s){let N0=z[s];if(N0===void 0)N0=new C7,z[s]=N0;return N0.getHandSpace()};function f(s){let N0=A.indexOf(s.inputSource);if(N0===-1)return;let V0=z[N0];if(V0!==void 0)V0.update(s.inputSource,s.frame,H||K),V0.dispatchEvent({type:s.type,data:s.inputSource})}function d(){Z.removeEventListener("select",f),Z.removeEventListener("selectstart",f),Z.removeEventListener("selectend",f),Z.removeEventListener("squeeze",f),Z.removeEventListener("squeezestart",f),Z.removeEventListener("squeezeend",f),Z.removeEventListener("end",d),Z.removeEventListener("inputsourceschange",b);for(let s=0;s<z.length;s++){let N0=A[s];if(N0===null)continue;A[s]=null,z[s].disconnect(N0)}m=null,c=null,B.reset();for(let s in E)delete E[s];J.setRenderTarget(O),q=null,G=null,N=null,Z=null,V=null,d0.stop(),$.isPresenting=!1,J.setPixelRatio(C),J.setSize(P.width,P.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(s){if(W=s,$.isPresenting===!0)A0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(s){if(Y=s,$.isPresenting===!0)A0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||K},this.setReferenceSpace=function(s){H=s},this.getBaseLayer=function(){return G!==null?G:q},this.getBinding=function(){if(N===null&&R)N=new XRWebGLBinding(Z,Q);return N},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(s){if(Z=s,Z!==null){if(O=J.getRenderTarget(),Z.addEventListener("select",f),Z.addEventListener("selectstart",f),Z.addEventListener("selectend",f),Z.addEventListener("squeeze",f),Z.addEventListener("squeezestart",f),Z.addEventListener("squeezeend",f),Z.addEventListener("end",d),Z.addEventListener("inputsourceschange",b),D.xrCompatible!==!0)await Q.makeXRCompatible();if(C=J.getPixelRatio(),J.getSize(P),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let V0={antialias:D.antialias,alpha:!0,depth:D.depth,stencil:D.stencil,framebufferScaleFactor:W};q=new XRWebGLLayer(Z,Q,V0),Z.updateRenderState({baseLayer:q}),J.setPixelRatio(1),J.setSize(q.framebufferWidth,q.framebufferHeight,!1),V=new Y9(q.framebufferWidth,q.framebufferHeight,{format:z9,type:R9,colorSpace:J.outputColorSpace,stencilBuffer:D.stencil,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1})}else{let V0=null,q0=null,P0=null;if(D.depth)P0=D.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,V0=D.stencil?F8:q8,q0=D.stencil?e8:e9;let r0={colorFormat:Q.RGBA8,depthFormat:P0,scaleFactor:W};N=this.getBinding(),G=N.createProjectionLayer(r0),Z.updateRenderState({layers:[G]}),J.setPixelRatio(1),J.setSize(G.textureWidth,G.textureHeight,!1),V=new Y9(G.textureWidth,G.textureHeight,{format:z9,type:R9,depthTexture:new Q8(G.textureWidth,G.textureHeight,q0,void 0,void 0,void 0,void 0,void 0,void 0,V0),stencilBuffer:D.stencil,colorSpace:J.outputColorSpace,samples:D.antialias?4:0,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}V.isXRRenderTarget=!0,this.setFoveation(X),H=null,K=await Z.requestReferenceSpace(Y),d0.setContext(Z),d0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return B.getDepthTexture()};function b(s){for(let N0=0;N0<s.removed.length;N0++){let V0=s.removed[N0],q0=A.indexOf(V0);if(q0>=0)A[q0]=null,z[q0].disconnect(V0)}for(let N0=0;N0<s.added.length;N0++){let V0=s.added[N0],q0=A.indexOf(V0);if(q0===-1){for(let r0=0;r0<z.length;r0++)if(r0>=A.length){A.push(V0),q0=r0;break}else if(A[r0]===null){A[r0]=V0,q0=r0;break}if(q0===-1)break}let P0=z[q0];if(P0)P0.connect(V0)}}let p=new j,a=new j;function Q0(s,N0,V0){p.setFromMatrixPosition(N0.matrixWorld),a.setFromMatrixPosition(V0.matrixWorld);let q0=p.distanceTo(a),P0=N0.projectionMatrix.elements,r0=V0.projectionMatrix.elements,g0=P0[14]/(P0[10]-1),u0=P0[14]/(P0[10]+1),WJ=(P0[9]+1)/P0[5],KJ=(P0[9]-1)/P0[5],h0=(P0[8]-1)/P0[0],SJ=(r0[8]+1)/r0[0],yJ=g0*h0,VJ=g0*SJ,S=q0/(-h0+SJ),bJ=S*-h0;if(N0.matrixWorld.decompose(s.position,s.quaternion,s.scale),s.translateX(bJ),s.translateZ(S),s.matrixWorld.compose(s.position,s.quaternion,s.scale),s.matrixWorldInverse.copy(s.matrixWorld).invert(),P0[10]===-1)s.projectionMatrix.copy(N0.projectionMatrix),s.projectionMatrixInverse.copy(N0.projectionMatrixInverse);else{let n0=g0+S,a0=u0+S,U0=yJ-bJ,DJ=VJ+(q0-bJ),w0=WJ*u0/a0*n0,I=KJ*u0/a0*n0;s.projectionMatrix.makePerspective(U0,DJ,w0,I,n0,a0),s.projectionMatrixInverse.copy(s.projectionMatrix).invert()}}function F0(s,N0){if(N0===null)s.matrixWorld.copy(s.matrix);else s.matrixWorld.multiplyMatrices(N0.matrixWorld,s.matrix);s.matrixWorldInverse.copy(s.matrixWorld).invert()}this.updateCamera=function(s){if(Z===null)return;let{near:N0,far:V0}=s;if(B.texture!==null){if(B.depthNear>0)N0=B.depthNear;if(B.depthFar>0)V0=B.depthFar}if(w.near=k.near=_.near=N0,w.far=k.far=_.far=V0,m!==w.near||c!==w.far)Z.updateRenderState({depthNear:w.near,depthFar:w.far}),m=w.near,c=w.far;w.layers.mask=s.layers.mask|6,_.layers.mask=w.layers.mask&-5,k.layers.mask=w.layers.mask&-3;let q0=s.parent,P0=w.cameras;F0(w,q0);for(let r0=0;r0<P0.length;r0++)F0(P0[r0],q0);if(P0.length===2)Q0(w,_,k);else w.projectionMatrix.copy(_.projectionMatrix);I0(s,w,q0)};function I0(s,N0,V0){if(V0===null)s.matrix.copy(N0.matrixWorld);else s.matrix.copy(V0.matrixWorld),s.matrix.invert(),s.matrix.multiply(N0.matrixWorld);if(s.matrix.decompose(s.position,s.quaternion,s.scale),s.updateMatrixWorld(!0),s.projectionMatrix.copy(N0.projectionMatrix),s.projectionMatrixInverse.copy(N0.projectionMatrixInverse),s.isPerspectiveCamera)s.fov=i8*2*Math.atan(1/s.projectionMatrix.elements[5]),s.zoom=1}this.getCamera=function(){return w},this.getFoveation=function(){if(G===null&&q===null)return;return X},this.setFoveation=function(s){if(X=s,G!==null)G.fixedFoveation=s;if(q!==null&&q.fixedFoveation!==void 0)q.fixedFoveation=s},this.hasDepthSensing=function(){return B.texture!==null},this.getDepthSensingMesh=function(){return B.getMesh(w)},this.getCameraTexture=function(s){return E[s]};let M0=null;function t0(s,N0){if(U=N0.getViewerPose(H||K),F=N0,U!==null){let V0=U.views;if(q!==null)J.setRenderTargetFramebuffer(V,q.framebuffer),J.setRenderTarget(V);let q0=!1;if(V0.length!==w.cameras.length)w.cameras.length=0,q0=!0;for(let u0=0;u0<V0.length;u0++){let WJ=V0[u0],KJ=null;if(q!==null)KJ=q.getViewport(WJ);else{let SJ=N.getViewSubImage(G,WJ);if(KJ=SJ.viewport,u0===0)J.setRenderTargetTextures(V,SJ.colorTexture,SJ.depthStencilTexture),J.setRenderTarget(V)}let h0=l[u0];if(h0===void 0)h0=new pJ,h0.layers.enable(u0),h0.viewport=new EJ,l[u0]=h0;if(h0.matrix.fromArray(WJ.transform.matrix),h0.matrix.decompose(h0.position,h0.quaternion,h0.scale),h0.projectionMatrix.fromArray(WJ.projectionMatrix),h0.projectionMatrixInverse.copy(h0.projectionMatrix).invert(),h0.viewport.set(KJ.x,KJ.y,KJ.width,KJ.height),u0===0)w.matrix.copy(h0.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale);if(q0===!0)w.cameras.push(h0)}let P0=Z.enabledFeatures;if(P0&&P0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&R){N=$.getBinding();let u0=N.getDepthInformation(V0[0]);if(u0&&u0.isValid&&u0.texture)B.init(u0,Z.renderState)}if(P0&&P0.includes("camera-access")&&R){J.state.unbindTexture(),N=$.getBinding();for(let u0=0;u0<V0.length;u0++){let WJ=V0[u0].camera;if(WJ){let KJ=E[WJ];if(!KJ)KJ=new l6,E[WJ]=KJ;let h0=N.getCameraImage(WJ);KJ.sourceTexture=h0}}}}for(let V0=0;V0<z.length;V0++){let q0=A[V0],P0=z[V0];if(q0!==null&&P0!==void 0)P0.update(q0,N0,H||K)}if(M0)M0(s,N0);if(N0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:N0});F=null}let d0=new oK;d0.setAnimationLoop(t0),this.setAnimationLoop=function(s){M0=s},this.dispose=function(){}}}var qN=new FJ,HY=new j0;HY.set(-1,0,0,0,1,0,0,0,1);function FN(J,Q){function $(E,D){if(E.matrixAutoUpdate===!0)E.updateMatrix();D.value.copy(E.matrix)}function Z(E,D){if(D.color.getRGB(E.fogColor.value,n$(J)),D.isFog)E.fogNear.value=D.near,E.fogFar.value=D.far;else if(D.isFogExp2)E.fogDensity.value=D.density}function W(E,D,O,V,z){if(D.isNodeMaterial)D.uniformsNeedUpdate=!1;else if(D.isMeshBasicMaterial)K(E,D);else if(D.isMeshLambertMaterial){if(K(E,D),D.envMap)E.envMapIntensity.value=D.envMapIntensity}else if(D.isMeshToonMaterial)K(E,D),G(E,D);else if(D.isMeshPhongMaterial){if(K(E,D),N(E,D),D.envMap)E.envMapIntensity.value=D.envMapIntensity}else if(D.isMeshStandardMaterial){if(K(E,D),q(E,D),D.isMeshPhysicalMaterial)F(E,D,z)}else if(D.isMeshMatcapMaterial)K(E,D),R(E,D);else if(D.isMeshDepthMaterial)K(E,D);else if(D.isMeshDistanceMaterial)K(E,D),B(E,D);else if(D.isMeshNormalMaterial)K(E,D);else if(D.isLineBasicMaterial){if(Y(E,D),D.isLineDashedMaterial)X(E,D)}else if(D.isPointsMaterial)H(E,D,O,V);else if(D.isSpriteMaterial)U(E,D);else if(D.isShadowMaterial)E.color.value.copy(D.color),E.opacity.value=D.opacity;else if(D.isShaderMaterial)D.uniformsNeedUpdate=!1}function K(E,D){if(E.opacity.value=D.opacity,D.color)E.diffuse.value.copy(D.color);if(D.emissive)E.emissive.value.copy(D.emissive).multiplyScalar(D.emissiveIntensity);if(D.map)E.map.value=D.map,$(D.map,E.mapTransform);if(D.alphaMap)E.alphaMap.value=D.alphaMap,$(D.alphaMap,E.alphaMapTransform);if(D.bumpMap){if(E.bumpMap.value=D.bumpMap,$(D.bumpMap,E.bumpMapTransform),E.bumpScale.value=D.bumpScale,D.side===dJ)E.bumpScale.value*=-1}if(D.normalMap){if(E.normalMap.value=D.normalMap,$(D.normalMap,E.normalMapTransform),E.normalScale.value.copy(D.normalScale),D.side===dJ)E.normalScale.value.negate()}if(D.displacementMap)E.displacementMap.value=D.displacementMap,$(D.displacementMap,E.displacementMapTransform),E.displacementScale.value=D.displacementScale,E.displacementBias.value=D.displacementBias;if(D.emissiveMap)E.emissiveMap.value=D.emissiveMap,$(D.emissiveMap,E.emissiveMapTransform);if(D.specularMap)E.specularMap.value=D.specularMap,$(D.specularMap,E.specularMapTransform);if(D.alphaTest>0)E.alphaTest.value=D.alphaTest;let O=Q.get(D),V=O.envMap,z=O.envMapRotation;if(V){if(E.envMap.value=V,E.envMapRotation.value.setFromMatrix4(qN.makeRotationFromEuler(z)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1)E.envMapRotation.value.premultiply(HY);E.reflectivity.value=D.reflectivity,E.ior.value=D.ior,E.refractionRatio.value=D.refractionRatio}if(D.lightMap)E.lightMap.value=D.lightMap,E.lightMapIntensity.value=D.lightMapIntensity,$(D.lightMap,E.lightMapTransform);if(D.aoMap)E.aoMap.value=D.aoMap,E.aoMapIntensity.value=D.aoMapIntensity,$(D.aoMap,E.aoMapTransform)}function Y(E,D){if(E.diffuse.value.copy(D.color),E.opacity.value=D.opacity,D.map)E.map.value=D.map,$(D.map,E.mapTransform)}function X(E,D){E.dashSize.value=D.dashSize,E.totalSize.value=D.dashSize+D.gapSize,E.scale.value=D.scale}function H(E,D,O,V){if(E.diffuse.value.copy(D.color),E.opacity.value=D.opacity,E.size.value=D.size*O,E.scale.value=V*0.5,D.map)E.map.value=D.map,$(D.map,E.uvTransform);if(D.alphaMap)E.alphaMap.value=D.alphaMap,$(D.alphaMap,E.alphaMapTransform);if(D.alphaTest>0)E.alphaTest.value=D.alphaTest}function U(E,D){if(E.diffuse.value.copy(D.color),E.opacity.value=D.opacity,E.rotation.value=D.rotation,D.map)E.map.value=D.map,$(D.map,E.mapTransform);if(D.alphaMap)E.alphaMap.value=D.alphaMap,$(D.alphaMap,E.alphaMapTransform);if(D.alphaTest>0)E.alphaTest.value=D.alphaTest}function N(E,D){E.specular.value.copy(D.specular),E.shininess.value=Math.max(D.shininess,0.0001)}function G(E,D){if(D.gradientMap)E.gradientMap.value=D.gradientMap}function q(E,D){if(E.metalness.value=D.metalness,D.metalnessMap)E.metalnessMap.value=D.metalnessMap,$(D.metalnessMap,E.metalnessMapTransform);if(E.roughness.value=D.roughness,D.roughnessMap)E.roughnessMap.value=D.roughnessMap,$(D.roughnessMap,E.roughnessMapTransform);if(D.envMap)E.envMapIntensity.value=D.envMapIntensity}function F(E,D,O){if(E.ior.value=D.ior,D.sheen>0){if(E.sheenColor.value.copy(D.sheenColor).multiplyScalar(D.sheen),E.sheenRoughness.value=D.sheenRoughness,D.sheenColorMap)E.sheenColorMap.value=D.sheenColorMap,$(D.sheenColorMap,E.sheenColorMapTransform);if(D.sheenRoughnessMap)E.sheenRoughnessMap.value=D.sheenRoughnessMap,$(D.sheenRoughnessMap,E.sheenRoughnessMapTransform)}if(D.clearcoat>0){if(E.clearcoat.value=D.clearcoat,E.clearcoatRoughness.value=D.clearcoatRoughness,D.clearcoatMap)E.clearcoatMap.value=D.clearcoatMap,$(D.clearcoatMap,E.clearcoatMapTransform);if(D.clearcoatRoughnessMap)E.clearcoatRoughnessMap.value=D.clearcoatRoughnessMap,$(D.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform);if(D.clearcoatNormalMap){if(E.clearcoatNormalMap.value=D.clearcoatNormalMap,$(D.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(D.clearcoatNormalScale),D.side===dJ)E.clearcoatNormalScale.value.negate()}}if(D.dispersion>0)E.dispersion.value=D.dispersion;if(D.iridescence>0){if(E.iridescence.value=D.iridescence,E.iridescenceIOR.value=D.iridescenceIOR,E.iridescenceThicknessMinimum.value=D.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=D.iridescenceThicknessRange[1],D.iridescenceMap)E.iridescenceMap.value=D.iridescenceMap,$(D.iridescenceMap,E.iridescenceMapTransform);if(D.iridescenceThicknessMap)E.iridescenceThicknessMap.value=D.iridescenceThicknessMap,$(D.iridescenceThicknessMap,E.iridescenceThicknessMapTransform)}if(D.transmission>0){if(E.transmission.value=D.transmission,E.transmissionSamplerMap.value=O.texture,E.transmissionSamplerSize.value.set(O.width,O.height),D.transmissionMap)E.transmissionMap.value=D.transmissionMap,$(D.transmissionMap,E.transmissionMapTransform);if(E.thickness.value=D.thickness,D.thicknessMap)E.thicknessMap.value=D.thicknessMap,$(D.thicknessMap,E.thicknessMapTransform);E.attenuationDistance.value=D.attenuationDistance,E.attenuationColor.value.copy(D.attenuationColor)}if(D.anisotropy>0){if(E.anisotropyVector.value.set(D.anisotropy*Math.cos(D.anisotropyRotation),D.anisotropy*Math.sin(D.anisotropyRotation)),D.anisotropyMap)E.anisotropyMap.value=D.anisotropyMap,$(D.anisotropyMap,E.anisotropyMapTransform)}if(E.specularIntensity.value=D.specularIntensity,E.specularColor.value.copy(D.specularColor),D.specularColorMap)E.specularColorMap.value=D.specularColorMap,$(D.specularColorMap,E.specularColorMapTransform);if(D.specularIntensityMap)E.specularIntensityMap.value=D.specularIntensityMap,$(D.specularIntensityMap,E.specularIntensityMapTransform)}function R(E,D){if(D.matcap)E.matcap.value=D.matcap}function B(E,D){let O=Q.get(D).light;E.referencePosition.value.setFromMatrixPosition(O.matrixWorld),E.nearDistance.value=O.shadow.camera.near,E.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function DN(J,Q,$,Z){let W={},K={},Y=[],X=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function H(O,V){let z=V.program;Z.uniformBlockBinding(O,z)}function U(O,V){let z=W[O.id];if(z===void 0)R(O),z=N(O),W[O.id]=z,O.addEventListener("dispose",E);let A=V.program;Z.updateUBOMapping(O,A);let P=Q.render.frame;if(K[O.id]!==P)q(O),K[O.id]=P}function N(O){let V=G();O.__bindingPointIndex=V;let z=J.createBuffer(),A=O.__size,P=O.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,A,P),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,V,z),z}function G(){for(let O=0;O<X;O++)if(Y.indexOf(O)===-1)return Y.push(O),O;return C0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function q(O){let V=W[O.id],z=O.uniforms,A=O.__cache;J.bindBuffer(J.UNIFORM_BUFFER,V);for(let P=0,C=z.length;P<C;P++){let _=Array.isArray(z[P])?z[P]:[z[P]];for(let k=0,l=_.length;k<l;k++){let w=_[k];if(F(w,P,k,A)===!0){let m=w.__offset,c=Array.isArray(w.value)?w.value:[w.value],f=0;for(let d=0;d<c.length;d++){let b=c[d],p=B(b);if(typeof b==="number"||typeof b==="boolean")w.__data[0]=b,J.bufferSubData(J.UNIFORM_BUFFER,m+f,w.__data);else if(b.isMatrix3)w.__data[0]=b.elements[0],w.__data[1]=b.elements[1],w.__data[2]=b.elements[2],w.__data[3]=0,w.__data[4]=b.elements[3],w.__data[5]=b.elements[4],w.__data[6]=b.elements[5],w.__data[7]=0,w.__data[8]=b.elements[6],w.__data[9]=b.elements[7],w.__data[10]=b.elements[8],w.__data[11]=0;else if(ArrayBuffer.isView(b))w.__data.set(new b.constructor(b.buffer,b.byteOffset,w.__data.length));else b.toArray(w.__data,f),f+=p.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,m,w.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(O,V,z,A){let P=O.value,C=V+"_"+z;if(A[C]===void 0){if(typeof P==="number"||typeof P==="boolean")A[C]=P;else if(ArrayBuffer.isView(P))A[C]=P.slice();else A[C]=P.clone();return!0}else{let _=A[C];if(typeof P==="number"||typeof P==="boolean"){if(_!==P)return A[C]=P,!0}else if(ArrayBuffer.isView(P))return!0;else if(_.equals(P)===!1)return _.copy(P),!0}return!1}function R(O){let V=O.uniforms,z=0,A=16;for(let C=0,_=V.length;C<_;C++){let k=Array.isArray(V[C])?V[C]:[V[C]];for(let l=0,w=k.length;l<w;l++){let m=k[l],c=Array.isArray(m.value)?m.value:[m.value];for(let f=0,d=c.length;f<d;f++){let b=c[f],p=B(b),a=z%A,Q0=a%p.boundary,F0=a+Q0;if(z+=Q0,F0!==0&&A-F0<p.storage)z+=A-F0;m.__data=new Float32Array(p.storage/Float32Array.BYTES_PER_ELEMENT),m.__offset=z,z+=p.storage}}}let P=z%A;if(P>0)z+=A-P;return O.__size=z,O.__cache={},this}function B(O){let V={boundary:0,storage:0};if(typeof O==="number"||typeof O==="boolean")V.boundary=4,V.storage=4;else if(O.isVector2)V.boundary=8,V.storage=8;else if(O.isVector3||O.isColor)V.boundary=16,V.storage=12;else if(O.isVector4)V.boundary=16,V.storage=16;else if(O.isMatrix3)V.boundary=48,V.storage=48;else if(O.isMatrix4)V.boundary=64,V.storage=64;else if(O.isTexture)A0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(O))V.boundary=16,V.storage=O.byteLength;else A0("WebGLRenderer: Unsupported uniform value type.",O);return V}function E(O){let V=O.target;V.removeEventListener("dispose",E);let z=Y.indexOf(V.__bindingPointIndex);Y.splice(z,1),J.deleteBuffer(W[V.id]),delete W[V.id],delete K[V.id]}function D(){for(let O in W)J.deleteBuffer(W[O]);Y=[],W={},K={}}return{bind:H,update:U,dispose:D}}var EN=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),P9=null;function RN(){if(P9===null)P9=new u$(EN,16,16,D8,p9),P9.name="DFG_LUT",P9.minFilter=cJ,P9.magFilter=cJ,P9.wrapS=P6,P9.wrapT=P6,P9.generateMipmaps=!1,P9.needsUpdate=!0;return P9}class BZ{constructor(J={}){let{canvas:Q=RK(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:Y=!1,premultipliedAlpha:X=!0,preserveDrawingBuffer:H=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:G=!1,outputBufferType:q=R9}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=K;let R=q,B=new Set([$$,Q$,J$]),E=new Set([R9,e9,I7,e8,tQ,eQ]),D=new Uint32Array(4),O=new Int32Array(4),V=new j,z=null,A=null,P=[],C=[],_=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=E9,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,l=!1,w=null;this._outputColorSpace=A7;let m=0,c=0,f=null,d=-1,b=null,p=new EJ,a=new EJ,Q0=null,F0=new x0(0),I0=0,M0=Q.width,t0=Q.height,d0=1,s=null,N0=null,V0=new EJ(0,0,M0,t0),q0=new EJ(0,0,M0,t0),P0=!1,r0=new y7,g0=!1,u0=!1,WJ=new FJ,KJ=new j,h0=new EJ,SJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yJ=!1;function VJ(){return f===null?d0:1}let S=$;function bJ(L,y){return Q.getContext(L,y)}try{let L={alpha:!0,depth:Z,stencil:W,antialias:Y,premultipliedAlpha:X,preserveDrawingBuffer:H,powerPreference:U,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${VW}`);if(Q.addEventListener("webglcontextlost",O0,!1),Q.addEventListener("webglcontextrestored",t,!1),Q.addEventListener("webglcontextcreationerror",L0,!1),S===null){if(S=bJ("webgl2",L),S===null)if(bJ("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(L){throw C0("WebGLRenderer: "+L.message),L}let n0,a0,U0,DJ,w0,I,M,v,o,r,e,K0,u,i,W0,R0,$0,Y0,S0,v0,p0,T,Z0;function n(){if(n0=new zG(S),n0.init(),p0=new UN(S,n0),a0=new EG(S,n0,J,p0),U0=new XN(S,n0),a0.reversedDepthBuffer&&G)U0.buffers.depth.setReversed(!0);DJ=new AG(S),w0=new s5,I=new HN(S,n0,U0,w0,a0,p0,DJ),M=new BG(k),v=new TX(S),T=new FG(S,v),o=new kG(S,v,DJ,T),r=new wG(S,o,v,T,DJ),Y0=new PG(S,a0,I),W0=new RG(w0),e=new n5(k,M,n0,a0,T,W0),K0=new FN(k,w0),u=new o5,i=new QN(n0),$0=new qG(k,M,U0,r,F,X),R0=new YN(k,r,a0),Z0=new DN(S,DJ,a0,U0),S0=new DG(S,n0,DJ),v0=new IG(S,n0,DJ),DJ.programs=e.programs,k.capabilities=a0,k.extensions=n0,k.properties=w0,k.renderLists=u,k.shadowMap=R0,k.state=U0,k.info=DJ}if(n(),R!==R9)_=new TG(R,Q.width,Q.height,Z,W);let J0=new XY(k,S);this.xr=J0,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let L=n0.get("WEBGL_lose_context");if(L)L.loseContext()},this.forceContextRestore=function(){let L=n0.get("WEBGL_lose_context");if(L)L.restoreContext()},this.getPixelRatio=function(){return d0},this.setPixelRatio=function(L){if(L===void 0)return;d0=L,this.setSize(M0,t0,!1)},this.getSize=function(L){return L.set(M0,t0)},this.setSize=function(L,y,g=!0){if(J0.isPresenting){A0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(M0=L,t0=y,Q.width=Math.floor(L*d0),Q.height=Math.floor(y*d0),g===!0)Q.style.width=L+"px",Q.style.height=y+"px";if(_!==null)_.setSize(Q.width,Q.height);this.setViewport(0,0,L,y)},this.getDrawingBufferSize=function(L){return L.set(M0*d0,t0*d0).floor()},this.setDrawingBufferSize=function(L,y,g){M0=L,t0=y,d0=g,Q.width=Math.floor(L*g),Q.height=Math.floor(y*g),this.setViewport(0,0,L,y)},this.setEffects=function(L){if(R===R9){C0("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(L){for(let y=0;y<L.length;y++)if(L[y].isOutputPass===!0){A0("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(L||[])},this.getCurrentViewport=function(L){return L.copy(p)},this.getViewport=function(L){return L.copy(V0)},this.setViewport=function(L,y,g,h){if(L.isVector4)V0.set(L.x,L.y,L.z,L.w);else V0.set(L,y,g,h);U0.viewport(p.copy(V0).multiplyScalar(d0).round())},this.getScissor=function(L){return L.copy(q0)},this.setScissor=function(L,y,g,h){if(L.isVector4)q0.set(L.x,L.y,L.z,L.w);else q0.set(L,y,g,h);U0.scissor(a.copy(q0).multiplyScalar(d0).round())},this.getScissorTest=function(){return P0},this.setScissorTest=function(L){U0.setScissorTest(P0=L)},this.setOpaqueSort=function(L){s=L},this.setTransparentSort=function(L){N0=L},this.getClearColor=function(L){return L.copy($0.getClearColor())},this.setClearColor=function(){$0.setClearColor(...arguments)},this.getClearAlpha=function(){return $0.getClearAlpha()},this.setClearAlpha=function(){$0.setClearAlpha(...arguments)},this.clear=function(L=!0,y=!0,g=!0){let h=0;if(L){let x=!1;if(f!==null){let G0=f.texture.format;x=B.has(G0)}if(x){let G0=f.texture.type,E0=E.has(G0),H0=$0.getClearColor(),_0=$0.getClearAlpha(),z0=H0.r,f0=H0.g,m0=H0.b;if(E0)D[0]=z0,D[1]=f0,D[2]=m0,D[3]=_0,S.clearBufferuiv(S.COLOR,0,D);else O[0]=z0,O[1]=f0,O[2]=m0,O[3]=_0,S.clearBufferiv(S.COLOR,0,O)}else h|=S.COLOR_BUFFER_BIT}if(y)h|=S.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(g)h|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(h!==0)S.clear(h)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(L){L.setRenderer(this),w=L},this.dispose=function(){Q.removeEventListener("webglcontextlost",O0,!1),Q.removeEventListener("webglcontextrestored",t,!1),Q.removeEventListener("webglcontextcreationerror",L0,!1),$0.dispose(),u.dispose(),i.dispose(),w0.dispose(),M.dispose(),r.dispose(),T.dispose(),Z0.dispose(),e.dispose(),J0.dispose(),J0.removeEventListener("sessionstart",TZ),J0.removeEventListener("sessionend",SZ),K8.stop()};function O0(L){L.preventDefault(),M7("WebGLRenderer: Context Lost."),l=!0}function t(){M7("WebGLRenderer: Context Restored."),l=!1;let L=DJ.autoReset,y=R0.enabled,g=R0.autoUpdate,h=R0.needsUpdate,x=R0.type;n(),DJ.autoReset=L,R0.enabled=y,R0.autoUpdate=g,R0.needsUpdate=h,R0.type=x}function L0(L){C0("WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function y0(L){let y=L.target;y.removeEventListener("dispose",y0),LJ(y)}function LJ(L){QJ(L),w0.remove(L)}function QJ(L){let y=w0.get(L).programs;if(y!==void 0){if(y.forEach(function(g){e.releaseProgram(g)}),L.isShaderMaterial)e.releaseShaderCache(L)}}this.renderBufferDirect=function(L,y,g,h,x,G0){if(y===null)y=SJ;let E0=x.isMesh&&x.matrixWorld.determinant()<0,H0=EY(L,y,g,h,x);U0.setMaterial(h,E0);let _0=g.index,z0=1;if(h.wireframe===!0){if(_0=o.getWireframeAttribute(g),_0===void 0)return;z0=2}let f0=g.drawRange,m0=g.attributes.position,k0=f0.start*z0,$J=(f0.start+f0.count)*z0;if(G0!==null)k0=Math.max(k0,G0.start*z0),$J=Math.min($J,(G0.start+G0.count)*z0);if(_0!==null)k0=Math.max(k0,0),$J=Math.min($J,_0.count);else if(m0!==void 0&&m0!==null)k0=Math.max(k0,0),$J=Math.min($J,m0.count);let OJ=$J-k0;if(OJ<0||OJ===1/0)return;T.setup(x,h,H0,g,_0);let RJ,YJ=S0;if(_0!==null)RJ=v.get(_0),YJ=v0,YJ.setIndex(RJ);if(x.isMesh)if(h.wireframe===!0)U0.setLineWidth(h.wireframeLinewidth*VJ()),YJ.setMode(S.LINES);else YJ.setMode(S.TRIANGLES);else if(x.isLine){let fJ=h.linewidth;if(fJ===void 0)fJ=1;if(U0.setLineWidth(fJ*VJ()),x.isLineSegments)YJ.setMode(S.LINES);else if(x.isLineLoop)YJ.setMode(S.LINE_LOOP);else YJ.setMode(S.LINE_STRIP)}else if(x.isPoints)YJ.setMode(S.POINTS);else if(x.isSprite)YJ.setMode(S.TRIANGLES);if(x.isBatchedMesh)if(!n0.get("WEBGL_multi_draw")){let{_multiDrawStarts:fJ,_multiDrawCounts:D0,_multiDrawCount:oJ}=x,o0=_0?v.get(_0).bytesPerElement:1,Z9=w0.get(h).currentProgram.getUniforms();for(let M9=0;M9<oJ;M9++)Z9.setValue(S,"_gl_DrawID",M9),YJ.render(fJ[M9]/o0,D0[M9])}else YJ.renderMultiDraw(x._multiDrawStarts,x._multiDrawCounts,x._multiDrawCount);else if(x.isInstancedMesh)YJ.renderInstances(k0,OJ,x.count);else if(g.isInstancedBufferGeometry){let fJ=g._maxInstanceCount!==void 0?g._maxInstanceCount:1/0,D0=Math.min(g.instanceCount,fJ);YJ.renderInstances(k0,OJ,D0)}else YJ.render(k0,OJ)};function O9(L,y,g){if(L.transparent===!0&&L.side===uJ&&L.forceSinglePass===!1)L.side=dJ,L.needsUpdate=!0,n7(L,y,g),L.side=a8,L.needsUpdate=!0,n7(L,y,g),L.side=uJ;else n7(L,y,g)}this.compile=function(L,y,g=null){if(g===null)g=L;if(A=i.get(g),A.init(y),C.push(A),g.traverseVisible(function(x){if(x.isLight&&x.layers.test(y.layers)){if(A.pushLight(x),x.castShadow)A.pushShadow(x)}}),L!==g)L.traverseVisible(function(x){if(x.isLight&&x.layers.test(y.layers)){if(A.pushLight(x),x.castShadow)A.pushShadow(x)}});A.setupLights();let h=new Set;return L.traverse(function(x){if(!(x.isMesh||x.isPoints||x.isLine||x.isSprite))return;let G0=x.material;if(G0)if(Array.isArray(G0))for(let E0=0;E0<G0.length;E0++){let H0=G0[E0];O9(H0,g,x),h.add(H0)}else O9(G0,g,x),h.add(G0)}),A=C.pop(),h},this.compileAsync=function(L,y,g=null){let h=this.compile(L,y,g);return new Promise((x)=>{function G0(){if(h.forEach(function(E0){if(w0.get(E0).currentProgram.isReady())h.delete(E0)}),h.size===0){x(L);return}setTimeout(G0,10)}if(n0.get("KHR_parallel_shader_compile")!==null)G0();else setTimeout(G0,10)})};let U9=null;function FY(L){if(U9)U9(L)}function TZ(){K8.stop()}function SZ(){K8.start()}let K8=new oK;if(K8.setAnimationLoop(FY),typeof self<"u")K8.setContext(self);this.setAnimationLoop=function(L){U9=L,J0.setAnimationLoop(L),L===null?K8.stop():K8.start()},J0.addEventListener("sessionstart",TZ),J0.addEventListener("sessionend",SZ),this.render=function(L,y){if(y!==void 0&&y.isCamera!==!0){C0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(l===!0)return;if(w!==null)w.renderStart(L,y);let g=J0.enabled===!0&&J0.isPresenting===!0,h=_!==null&&(f===null||g)&&_.begin(k,f);if(L.matrixWorldAutoUpdate===!0)L.updateMatrixWorld();if(y.parent===null&&y.matrixWorldAutoUpdate===!0)y.updateMatrixWorld();if(J0.enabled===!0&&J0.isPresenting===!0&&(_===null||_.isCompositing()===!1)){if(J0.cameraAutoUpdate===!0)J0.updateCamera(y);y=J0.getCamera()}if(L.isScene===!0)L.onBeforeRender(k,L,y,f);if(A=i.get(L,C.length),A.init(y),A.state.textureUnits=I.getTextureUnits(),C.push(A),WJ.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),r0.setFromProjectionMatrix(WJ,x$,y.reversedDepth),u0=this.localClippingEnabled,g0=W0.init(this.clippingPlanes,u0),z=u.get(L,P.length),z.init(),P.push(z),J0.enabled===!0&&J0.isPresenting===!0){let E0=k.xr.getDepthSensingMesh();if(E0!==null)HQ(E0,y,-1/0,k.sortObjects)}if(HQ(L,y,0,k.sortObjects),z.finish(),k.sortObjects===!0)z.sort(s,N0);if(yJ=J0.enabled===!1||J0.isPresenting===!1||J0.hasDepthSensing()===!1,yJ)$0.addToRenderList(z,L);if(this.info.render.frame++,g0===!0)W0.beginShadows();let x=A.state.shadowsArray;if(R0.render(x,L,y),g0===!0)W0.endShadows();if(this.info.autoReset===!0)this.info.reset();if((h&&_.hasRenderPass())===!1){let{opaque:E0,transmissive:H0}=z;if(A.setupLights(),y.isArrayCamera){let _0=y.cameras;if(H0.length>0)for(let z0=0,f0=_0.length;z0<f0;z0++){let m0=_0[z0];yZ(E0,H0,L,m0)}if(yJ)$0.render(L);for(let z0=0,f0=_0.length;z0<f0;z0++){let m0=_0[z0];jZ(z,L,m0,m0.viewport)}}else{if(H0.length>0)yZ(E0,H0,L,y);if(yJ)$0.render(L);jZ(z,L,y)}}if(f!==null&&c===0)I.updateMultisampleRenderTarget(f),I.updateRenderTargetMipmap(f);if(h)_.end(k);if(L.isScene===!0)L.onAfterRender(k,L,y);if(T.resetDefaultState(),d=-1,b=null,C.pop(),C.length>0){if(A=C[C.length-1],I.setTextureUnits(A.state.textureUnits),g0===!0)W0.setGlobalState(k.clippingPlanes,A.state.camera)}else A=null;if(P.pop(),P.length>0)z=P[P.length-1];else z=null;if(w!==null)w.renderEnd()};function HQ(L,y,g,h){if(L.visible===!1)return;if(L.layers.test(y.layers)){if(L.isGroup)g=L.renderOrder;else if(L.isLOD){if(L.autoUpdate===!0)L.update(y)}else if(L.isLightProbeGrid)A.pushLightProbeGrid(L);else if(L.isLight){if(A.pushLight(L),L.castShadow)A.pushShadow(L)}else if(L.isSprite){if(!L.frustumCulled||r0.intersectsSprite(L)){if(h)h0.setFromMatrixPosition(L.matrixWorld).applyMatrix4(WJ);let E0=r.update(L),H0=L.material;if(H0.visible)z.push(L,E0,H0,g,h0.z,null)}}else if(L.isMesh||L.isLine||L.isPoints){if(!L.frustumCulled||r0.intersectsObject(L)){let E0=r.update(L),H0=L.material;if(h){if(L.boundingSphere!==void 0){if(L.boundingSphere===null)L.computeBoundingSphere();h0.copy(L.boundingSphere.center)}else{if(E0.boundingSphere===null)E0.computeBoundingSphere();h0.copy(E0.boundingSphere.center)}h0.applyMatrix4(L.matrixWorld).applyMatrix4(WJ)}if(Array.isArray(H0)){let _0=E0.groups;for(let z0=0,f0=_0.length;z0<f0;z0++){let m0=_0[z0],k0=H0[m0.materialIndex];if(k0&&k0.visible)z.push(L,E0,k0,g,h0.z,m0)}}else if(H0.visible)z.push(L,E0,H0,g,h0.z,null)}}}let G0=L.children;for(let E0=0,H0=G0.length;E0<H0;E0++)HQ(G0[E0],y,g,h)}function jZ(L,y,g,h){let{opaque:x,transmissive:G0,transparent:E0}=L;if(A.setupLightsView(g),g0===!0)W0.setGlobalState(k.clippingPlanes,g);if(h)U0.viewport(p.copy(h));if(x.length>0)c7(x,y,g);if(G0.length>0)c7(G0,y,g);if(E0.length>0)c7(E0,y,g);U0.buffers.depth.setTest(!0),U0.buffers.depth.setMask(!0),U0.buffers.color.setMask(!0),U0.setPolygonOffset(!1)}function yZ(L,y,g,h){if((g.isScene===!0?g.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[h.id]===void 0){let k0=n0.has("EXT_color_buffer_half_float")||n0.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[h.id]=new Y9(1,1,{generateMipmaps:!0,type:k0?p9:R9,minFilter:N8,samples:Math.max(4,a0.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:c0.workingColorSpace})}let G0=A.state.transmissionRenderTarget[h.id],E0=h.viewport||p;G0.setSize(E0.z*k.transmissionResolutionScale,E0.w*k.transmissionResolutionScale);let H0=k.getRenderTarget(),_0=k.getActiveCubeFace(),z0=k.getActiveMipmapLevel();if(k.setRenderTarget(G0),k.getClearColor(F0),I0=k.getClearAlpha(),I0<1)k.setClearColor(16777215,0.5);if(k.clear(),yJ)$0.render(g);let f0=k.toneMapping;k.toneMapping=E9;let m0=h.viewport;if(h.viewport!==void 0)h.viewport=void 0;if(A.setupLightsView(h),g0===!0)W0.setGlobalState(k.clippingPlanes,h);if(c7(L,g,h),I.updateMultisampleRenderTarget(G0),I.updateRenderTargetMipmap(G0),n0.has("WEBGL_multisampled_render_to_texture")===!1){let k0=!1;for(let $J=0,OJ=y.length;$J<OJ;$J++){let RJ=y[$J],{object:YJ,geometry:fJ,material:D0,group:oJ}=RJ;if(D0.side===uJ&&YJ.layers.test(h.layers)){let o0=D0.side;D0.side=dJ,D0.needsUpdate=!0,fZ(YJ,g,h,fJ,D0,oJ),D0.side=o0,D0.needsUpdate=!0,k0=!0}}if(k0===!0)I.updateMultisampleRenderTarget(G0),I.updateRenderTargetMipmap(G0)}if(k.setRenderTarget(H0,_0,z0),k.setClearColor(F0,I0),m0!==void 0)h.viewport=m0;k.toneMapping=f0}function c7(L,y,g){let h=y.isScene===!0?y.overrideMaterial:null;for(let x=0,G0=L.length;x<G0;x++){let E0=L[x],{object:H0,geometry:_0,group:z0}=E0,f0=E0.material;if(f0.allowOverride===!0&&h!==null)f0=h;if(H0.layers.test(g.layers))fZ(H0,y,g,_0,f0,z0)}}function fZ(L,y,g,h,x,G0){if(L.onBeforeRender(k,y,g,h,x,G0),L.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),x.onBeforeRender(k,y,g,h,L,G0),x.transparent===!0&&x.side===uJ&&x.forceSinglePass===!1)x.side=dJ,x.needsUpdate=!0,k.renderBufferDirect(g,y,h,x,L,G0),x.side=a8,x.needsUpdate=!0,k.renderBufferDirect(g,y,h,x,L,G0),x.side=uJ;else k.renderBufferDirect(g,y,h,x,L,G0);L.onAfterRender(k,y,g,h,x,G0)}function n7(L,y,g){if(y.isScene!==!0)y=SJ;let h=w0.get(L),x=A.state.lights,G0=A.state.shadowsArray,E0=x.state.version,H0=e.getParameters(L,x.state,G0,y,g,A.state.lightProbeGridArray),_0=e.getProgramCacheKey(H0),z0=h.programs;h.environment=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?y.environment:null,h.fog=y.fog;let f0=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap;if(h.envMap=M.get(L.envMap||h.environment,f0),h.envMapRotation=h.environment!==null&&L.envMap===null?y.environmentRotation:L.envMapRotation,z0===void 0)L.addEventListener("dispose",y0),z0=new Map,h.programs=z0;let m0=z0.get(_0);if(m0!==void 0){if(h.currentProgram===m0&&h.lightsStateVersion===E0)return hZ(L,H0),m0}else{if(H0.uniforms=e.getUniforms(L),w!==null&&L.isNodeMaterial)w.build(L,g,H0);L.onBeforeCompile(H0,k),m0=e.acquireProgram(H0,_0),z0.set(_0,m0),h.uniforms=H0.uniforms}let k0=h.uniforms;if(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)k0.clippingPlanes=W0.uniform;if(hZ(L,H0),h.needsLights=OY(L),h.lightsStateVersion=E0,h.needsLights)k0.ambientLightColor.value=x.state.ambient,k0.lightProbe.value=x.state.probe,k0.directionalLights.value=x.state.directional,k0.directionalLightShadows.value=x.state.directionalShadow,k0.spotLights.value=x.state.spot,k0.spotLightShadows.value=x.state.spotShadow,k0.rectAreaLights.value=x.state.rectArea,k0.ltc_1.value=x.state.rectAreaLTC1,k0.ltc_2.value=x.state.rectAreaLTC2,k0.pointLights.value=x.state.point,k0.pointLightShadows.value=x.state.pointShadow,k0.hemisphereLights.value=x.state.hemi,k0.directionalShadowMatrix.value=x.state.directionalShadowMatrix,k0.spotLightMatrix.value=x.state.spotLightMatrix,k0.spotLightMap.value=x.state.spotLightMap,k0.pointShadowMatrix.value=x.state.pointShadowMatrix;return h.lightProbeGrid=A.state.lightProbeGridArray.length>0,h.currentProgram=m0,h.uniformsList=null,m0}function vZ(L){if(L.uniformsList===null){let y=L.currentProgram.getUniforms();L.uniformsList=d7.seqWithValue(y.seq,L.uniforms)}return L.uniformsList}function hZ(L,y){let g=w0.get(L);g.outputColorSpace=y.outputColorSpace,g.batching=y.batching,g.batchingColor=y.batchingColor,g.instancing=y.instancing,g.instancingColor=y.instancingColor,g.instancingMorph=y.instancingMorph,g.skinning=y.skinning,g.morphTargets=y.morphTargets,g.morphNormals=y.morphNormals,g.morphColors=y.morphColors,g.morphTargetsCount=y.morphTargetsCount,g.numClippingPlanes=y.numClippingPlanes,g.numIntersection=y.numClipIntersection,g.vertexAlphas=y.vertexAlphas,g.vertexTangents=y.vertexTangents,g.toneMapping=y.toneMapping}function DY(L,y){if(L.length===0)return null;if(L.length===1)return L[0].texture!==null?L[0]:null;V.setFromMatrixPosition(y.matrixWorld);for(let g=0,h=L.length;g<h;g++){let x=L[g];if(x.texture!==null&&x.boundingBox.containsPoint(V))return x}return null}function EY(L,y,g,h,x){if(y.isScene!==!0)y=SJ;I.resetTextureUnits();let G0=y.fog,E0=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?y.environment:null,H0=f===null?k.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:c0.workingColorSpace,_0=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,z0=M.get(h.envMap||E0,_0),f0=h.vertexColors===!0&&!!g.attributes.color&&g.attributes.color.itemSize===4,m0=!!g.attributes.tangent&&(!!h.normalMap||h.anisotropy>0),k0=!!g.morphAttributes.position,$J=!!g.morphAttributes.normal,OJ=!!g.morphAttributes.color,RJ=E9;if(h.toneMapped){if(f===null||f.isXRRenderTarget===!0)RJ=k.toneMapping}let YJ=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,fJ=YJ!==void 0?YJ.length:0,D0=w0.get(h),oJ=A.state.lights;if(g0===!0){if(u0===!0||L!==b){let GJ=L===b&&h.id===d;W0.setState(h,L,GJ)}}let o0=!1;if(h.version===D0.__version){if(D0.needsLights&&D0.lightsStateVersion!==oJ.state.version)o0=!0;else if(D0.outputColorSpace!==H0)o0=!0;else if(x.isBatchedMesh&&D0.batching===!1)o0=!0;else if(!x.isBatchedMesh&&D0.batching===!0)o0=!0;else if(x.isBatchedMesh&&D0.batchingColor===!0&&x.colorTexture===null)o0=!0;else if(x.isBatchedMesh&&D0.batchingColor===!1&&x.colorTexture!==null)o0=!0;else if(x.isInstancedMesh&&D0.instancing===!1)o0=!0;else if(!x.isInstancedMesh&&D0.instancing===!0)o0=!0;else if(x.isSkinnedMesh&&D0.skinning===!1)o0=!0;else if(!x.isSkinnedMesh&&D0.skinning===!0)o0=!0;else if(x.isInstancedMesh&&D0.instancingColor===!0&&x.instanceColor===null)o0=!0;else if(x.isInstancedMesh&&D0.instancingColor===!1&&x.instanceColor!==null)o0=!0;else if(x.isInstancedMesh&&D0.instancingMorph===!0&&x.morphTexture===null)o0=!0;else if(x.isInstancedMesh&&D0.instancingMorph===!1&&x.morphTexture!==null)o0=!0;else if(D0.envMap!==z0)o0=!0;else if(h.fog===!0&&D0.fog!==G0)o0=!0;else if(D0.numClippingPlanes!==void 0&&(D0.numClippingPlanes!==W0.numPlanes||D0.numIntersection!==W0.numIntersection))o0=!0;else if(D0.vertexAlphas!==f0)o0=!0;else if(D0.vertexTangents!==m0)o0=!0;else if(D0.morphTargets!==k0)o0=!0;else if(D0.morphNormals!==$J)o0=!0;else if(D0.morphColors!==OJ)o0=!0;else if(D0.toneMapping!==RJ)o0=!0;else if(D0.morphTargetsCount!==fJ)o0=!0;else if(!!D0.lightProbeGrid!==A.state.lightProbeGridArray.length>0)o0=!0}else o0=!0,D0.__version=h.version;let Z9=D0.currentProgram;if(o0===!0){if(Z9=n7(h,y,x),w&&h.isNodeMaterial)w.onUpdateProgram(h,Z9,D0)}let M9=!1,m9=!1,k8=!1,XJ=Z9.getUniforms(),MJ=D0.uniforms;if(U0.useProgram(Z9.program))M9=!0,m9=!0,k8=!0;if(h.id!==d)d=h.id,m9=!0;if(D0.needsLights){let GJ=DY(A.state.lightProbeGridArray,x);if(D0.lightProbeGrid!==GJ)D0.lightProbeGrid=GJ,m9=!0}if(M9||b!==L){if(U0.buffers.depth.getReversed()&&L.reversedDepth!==!0)L._reversedDepth=!0,L.updateProjectionMatrix();XJ.setValue(S,"projectionMatrix",L.projectionMatrix),XJ.setValue(S,"viewMatrix",L.matrixWorldInverse);let d9=XJ.map.cameraPosition;if(d9!==void 0)d9.setValue(S,KJ.setFromMatrixPosition(L.matrixWorld));if(a0.logarithmicDepthBuffer)XJ.setValue(S,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2));if(h.isMeshPhongMaterial||h.isMeshToonMaterial||h.isMeshLambertMaterial||h.isMeshBasicMaterial||h.isMeshStandardMaterial||h.isShaderMaterial)XJ.setValue(S,"isOrthographic",L.isOrthographicCamera===!0);if(b!==L)b=L,m9=!0,k8=!0}if(D0.needsLights){if(oJ.state.directionalShadowMap.length>0)XJ.setValue(S,"directionalShadowMap",oJ.state.directionalShadowMap,I);if(oJ.state.spotShadowMap.length>0)XJ.setValue(S,"spotShadowMap",oJ.state.spotShadowMap,I);if(oJ.state.pointShadowMap.length>0)XJ.setValue(S,"pointShadowMap",oJ.state.pointShadowMap,I)}if(x.isSkinnedMesh){XJ.setOptional(S,x,"bindMatrix"),XJ.setOptional(S,x,"bindMatrixInverse");let GJ=x.skeleton;if(GJ){if(GJ.boneTexture===null)GJ.computeBoneTexture();XJ.setValue(S,"boneTexture",GJ.boneTexture,I)}}if(x.isBatchedMesh){if(XJ.setOptional(S,x,"batchingTexture"),XJ.setValue(S,"batchingTexture",x._matricesTexture,I),XJ.setOptional(S,x,"batchingIdTexture"),XJ.setValue(S,"batchingIdTexture",x._indirectTexture,I),XJ.setOptional(S,x,"batchingColorTexture"),x._colorsTexture!==null)XJ.setValue(S,"batchingColorTexture",x._colorsTexture,I)}let l9=g.morphAttributes;if(l9.position!==void 0||l9.normal!==void 0||l9.color!==void 0)Y0.update(x,g,Z9);if(m9||D0.receiveShadow!==x.receiveShadow)D0.receiveShadow=x.receiveShadow,XJ.setValue(S,"receiveShadow",x.receiveShadow);if((h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial)&&h.envMap===null&&y.environment!==null)MJ.envMapIntensity.value=y.environmentIntensity;if(MJ.dfgLUT!==void 0)MJ.dfgLUT.value=RN();if(m9){if(XJ.setValue(S,"toneMappingExposure",k.toneMappingExposure),D0.needsLights)RY(MJ,k8);if(G0&&h.fog===!0)K0.refreshFogUniforms(MJ,G0);if(K0.refreshMaterialUniforms(MJ,h,d0,t0,A.state.transmissionRenderTarget[L.id]),D0.needsLights&&D0.lightProbeGrid){let GJ=D0.lightProbeGrid;MJ.probesSH.value=GJ.texture,MJ.probesMin.value.copy(GJ.boundingBox.min),MJ.probesMax.value.copy(GJ.boundingBox.max),MJ.probesResolution.value.copy(GJ.resolution)}d7.upload(S,vZ(D0),MJ,I)}if(h.isShaderMaterial&&h.uniformsNeedUpdate===!0)d7.upload(S,vZ(D0),MJ,I),h.uniformsNeedUpdate=!1;if(h.isSpriteMaterial)XJ.setValue(S,"center",x.center);if(XJ.setValue(S,"modelViewMatrix",x.modelViewMatrix),XJ.setValue(S,"normalMatrix",x.normalMatrix),XJ.setValue(S,"modelMatrix",x.matrixWorld),h.uniformsGroups!==void 0){let GJ=h.uniformsGroups;for(let d9=0,I8=GJ.length;d9<I8;d9++){let xZ=GJ[d9];Z0.update(xZ,Z9),Z0.bind(xZ,Z9)}}return Z9}function RY(L,y){L.ambientLightColor.needsUpdate=y,L.lightProbe.needsUpdate=y,L.directionalLights.needsUpdate=y,L.directionalLightShadows.needsUpdate=y,L.pointLights.needsUpdate=y,L.pointLightShadows.needsUpdate=y,L.spotLights.needsUpdate=y,L.spotLightShadows.needsUpdate=y,L.rectAreaLights.needsUpdate=y,L.hemisphereLights.needsUpdate=y}function OY(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return c},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(L,y,g){let h=w0.get(L);if(h.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,h.__autoAllocateDepthBuffer===!1)h.__useRenderToTexture=!1;w0.get(L.texture).__webglTexture=y,w0.get(L.depthTexture).__webglTexture=h.__autoAllocateDepthBuffer?void 0:g,h.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,y){let g=w0.get(L);g.__webglFramebuffer=y,g.__useDefaultFramebuffer=y===void 0};let MY=S.createFramebuffer();this.setRenderTarget=function(L,y=0,g=0){f=L,m=y,c=g;let h=null,x=!1,G0=!1;if(L){let H0=w0.get(L);if(H0.__useDefaultFramebuffer!==void 0){U0.bindFramebuffer(S.FRAMEBUFFER,H0.__webglFramebuffer),p.copy(L.viewport),a.copy(L.scissor),Q0=L.scissorTest,U0.viewport(p),U0.scissor(a),U0.setScissorTest(Q0),d=-1;return}else if(H0.__webglFramebuffer===void 0)I.setupRenderTarget(L);else if(H0.__hasExternalTextures)I.rebindTextures(L,w0.get(L.texture).__webglTexture,w0.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){let f0=L.depthTexture;if(H0.__boundDepthTexture!==f0){if(f0!==null&&w0.has(f0)&&(L.width!==f0.image.width||L.height!==f0.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(L)}}let _0=L.texture;if(_0.isData3DTexture||_0.isDataArrayTexture||_0.isCompressedArrayTexture)G0=!0;let z0=w0.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget){if(Array.isArray(z0[y]))h=z0[y][g];else h=z0[y];x=!0}else if(L.samples>0&&I.useMultisampledRTT(L)===!1)h=w0.get(L).__webglMultisampledFramebuffer;else if(Array.isArray(z0))h=z0[g];else h=z0;p.copy(L.viewport),a.copy(L.scissor),Q0=L.scissorTest}else p.copy(V0).multiplyScalar(d0).floor(),a.copy(q0).multiplyScalar(d0).floor(),Q0=P0;if(g!==0)h=MY;if(U0.bindFramebuffer(S.FRAMEBUFFER,h))U0.drawBuffers(L,h);if(U0.viewport(p),U0.scissor(a),U0.setScissorTest(Q0),x){let H0=w0.get(L.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+y,H0.__webglTexture,g)}else if(G0){let H0=y;for(let _0=0;_0<L.textures.length;_0++){let z0=w0.get(L.textures[_0]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+_0,z0.__webglTexture,g,H0)}}else if(L!==null&&g!==0){let H0=w0.get(L.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,H0.__webglTexture,g)}d=-1},this.readRenderTargetPixels=function(L,y,g,h,x,G0,E0,H0=0){if(!(L&&L.isWebGLRenderTarget)){C0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _0=w0.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&E0!==void 0)_0=_0[E0];if(_0){U0.bindFramebuffer(S.FRAMEBUFFER,_0);try{let z0=L.textures[H0],f0=z0.format,m0=z0.type;if(L.textures.length>1)S.readBuffer(S.COLOR_ATTACHMENT0+H0);if(!a0.textureFormatReadable(f0)){C0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!a0.textureTypeReadable(m0)){C0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(y>=0&&y<=L.width-h&&(g>=0&&g<=L.height-x))S.readPixels(y,g,h,x,p0.convert(f0),p0.convert(m0),G0)}finally{let z0=f!==null?w0.get(f).__webglFramebuffer:null;U0.bindFramebuffer(S.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(L,y,g,h,x,G0,E0,H0=0){if(!(L&&L.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _0=w0.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&E0!==void 0)_0=_0[E0];if(_0)if(y>=0&&y<=L.width-h&&(g>=0&&g<=L.height-x)){U0.bindFramebuffer(S.FRAMEBUFFER,_0);let z0=L.textures[H0],f0=z0.format,m0=z0.type;if(L.textures.length>1)S.readBuffer(S.COLOR_ATTACHMENT0+H0);if(!a0.textureFormatReadable(f0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!a0.textureTypeReadable(m0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let k0=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,k0),S.bufferData(S.PIXEL_PACK_BUFFER,G0.byteLength,S.STREAM_READ),S.readPixels(y,g,h,x,p0.convert(f0),p0.convert(m0),0);let $J=f!==null?w0.get(f).__webglFramebuffer:null;U0.bindFramebuffer(S.FRAMEBUFFER,$J);let OJ=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await MK(S,OJ,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,k0),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,G0),S.deleteBuffer(k0),S.deleteSync(OJ),G0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,y=null,g=0){let h=Math.pow(2,-g),x=Math.floor(L.image.width*h),G0=Math.floor(L.image.height*h),E0=y!==null?y.x:0,H0=y!==null?y.y:0;I.setTexture2D(L,0),S.copyTexSubImage2D(S.TEXTURE_2D,g,0,0,E0,H0,x,G0),U0.unbindTexture()};let _Y=S.createFramebuffer(),VY=S.createFramebuffer();if(this.copyTextureToTexture=function(L,y,g=null,h=null,x=0,G0=0){let E0,H0,_0,z0,f0,m0,k0,$J,OJ,RJ=L.isCompressedTexture?L.mipmaps[G0]:L.image;if(g!==null)E0=g.max.x-g.min.x,H0=g.max.y-g.min.y,_0=g.isBox3?g.max.z-g.min.z:1,z0=g.min.x,f0=g.min.y,m0=g.isBox3?g.min.z:0;else{let MJ=Math.pow(2,-x);if(E0=Math.floor(RJ.width*MJ),H0=Math.floor(RJ.height*MJ),L.isDataArrayTexture)_0=RJ.depth;else if(L.isData3DTexture)_0=Math.floor(RJ.depth*MJ);else _0=1;z0=0,f0=0,m0=0}if(h!==null)k0=h.x,$J=h.y,OJ=h.z;else k0=0,$J=0,OJ=0;let YJ=p0.convert(y.format),fJ=p0.convert(y.type),D0;if(y.isData3DTexture)I.setTexture3D(y,0),D0=S.TEXTURE_3D;else if(y.isDataArrayTexture||y.isCompressedArrayTexture)I.setTexture2DArray(y,0),D0=S.TEXTURE_2D_ARRAY;else I.setTexture2D(y,0),D0=S.TEXTURE_2D;U0.activeTexture(S.TEXTURE0),U0.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,y.flipY),U0.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),U0.pixelStorei(S.UNPACK_ALIGNMENT,y.unpackAlignment);let oJ=U0.getParameter(S.UNPACK_ROW_LENGTH),o0=U0.getParameter(S.UNPACK_IMAGE_HEIGHT),Z9=U0.getParameter(S.UNPACK_SKIP_PIXELS),M9=U0.getParameter(S.UNPACK_SKIP_ROWS),m9=U0.getParameter(S.UNPACK_SKIP_IMAGES);U0.pixelStorei(S.UNPACK_ROW_LENGTH,RJ.width),U0.pixelStorei(S.UNPACK_IMAGE_HEIGHT,RJ.height),U0.pixelStorei(S.UNPACK_SKIP_PIXELS,z0),U0.pixelStorei(S.UNPACK_SKIP_ROWS,f0),U0.pixelStorei(S.UNPACK_SKIP_IMAGES,m0);let k8=L.isDataArrayTexture||L.isData3DTexture,XJ=y.isDataArrayTexture||y.isData3DTexture;if(L.isDepthTexture){let MJ=w0.get(L),l9=w0.get(y),GJ=w0.get(MJ.__renderTarget),d9=w0.get(l9.__renderTarget);U0.bindFramebuffer(S.READ_FRAMEBUFFER,GJ.__webglFramebuffer),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,d9.__webglFramebuffer);for(let I8=0;I8<_0;I8++){if(k8)S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,w0.get(L).__webglTexture,x,m0+I8),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,w0.get(y).__webglTexture,G0,OJ+I8);S.blitFramebuffer(z0,f0,E0,H0,k0,$J,E0,H0,S.DEPTH_BUFFER_BIT,S.NEAREST)}U0.bindFramebuffer(S.READ_FRAMEBUFFER,null),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(x!==0||L.isRenderTargetTexture||w0.has(L)){let MJ=w0.get(L),l9=w0.get(y);U0.bindFramebuffer(S.READ_FRAMEBUFFER,_Y),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,VY);for(let GJ=0;GJ<_0;GJ++){if(k8)S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,MJ.__webglTexture,x,m0+GJ);else S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,MJ.__webglTexture,x);if(XJ)S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,l9.__webglTexture,G0,OJ+GJ);else S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,l9.__webglTexture,G0);if(x!==0)S.blitFramebuffer(z0,f0,E0,H0,k0,$J,E0,H0,S.COLOR_BUFFER_BIT,S.NEAREST);else if(XJ)S.copyTexSubImage3D(D0,G0,k0,$J,OJ+GJ,z0,f0,E0,H0);else S.copyTexSubImage2D(D0,G0,k0,$J,z0,f0,E0,H0)}U0.bindFramebuffer(S.READ_FRAMEBUFFER,null),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(XJ)if(L.isDataTexture||L.isData3DTexture)S.texSubImage3D(D0,G0,k0,$J,OJ,E0,H0,_0,YJ,fJ,RJ.data);else if(y.isCompressedArrayTexture)S.compressedTexSubImage3D(D0,G0,k0,$J,OJ,E0,H0,_0,YJ,RJ.data);else S.texSubImage3D(D0,G0,k0,$J,OJ,E0,H0,_0,YJ,fJ,RJ);else if(L.isDataTexture)S.texSubImage2D(S.TEXTURE_2D,G0,k0,$J,E0,H0,YJ,fJ,RJ.data);else if(L.isCompressedTexture)S.compressedTexSubImage2D(S.TEXTURE_2D,G0,k0,$J,RJ.width,RJ.height,YJ,RJ.data);else S.texSubImage2D(S.TEXTURE_2D,G0,k0,$J,E0,H0,YJ,fJ,RJ);if(U0.pixelStorei(S.UNPACK_ROW_LENGTH,oJ),U0.pixelStorei(S.UNPACK_IMAGE_HEIGHT,o0),U0.pixelStorei(S.UNPACK_SKIP_PIXELS,Z9),U0.pixelStorei(S.UNPACK_SKIP_ROWS,M9),U0.pixelStorei(S.UNPACK_SKIP_IMAGES,m9),G0===0&&y.generateMipmaps)S.generateMipmap(D0);U0.unbindTexture()},this.initRenderTarget=function(L){if(w0.get(L).__webglFramebuffer===void 0)I.setupRenderTarget(L)},this.initTexture=function(L){if(L.isCubeTexture)I.setTextureCube(L,0);else if(L.isData3DTexture)I.setTexture3D(L,0);else if(L.isDataArrayTexture||L.isCompressedArrayTexture)I.setTexture2DArray(L,0);else I.setTexture2D(L,0);U0.unbindTexture()},this.resetState=function(){m=0,c=0,f=null,U0.reset(),T.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return x$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=c0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=c0._getUnpackColorSpace()}}var UY={type:"change"},kZ={type:"start"},NY={type:"end"},ZQ=new Q7,GY=new F9,MN=Math.cos(70*g$.DEG2RAD),PJ=new j,sJ=2*Math.PI,ZJ={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zZ=0.000001;class IZ extends t6{constructor(J,Q=null){super(J,Q);if(this.state=ZJ.NONE,this.target=new j,this.cursor=new j,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:a9.ROTATE,MIDDLE:a9.DOLLY,RIGHT:a9.PAN},this.touches={ONE:r9.ROTATE,TWO:r9.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new j,this._lastQuaternion=new K9,this._lastTargetPosition=new j,this._quat=new K9().setFromUnitVectors(J.up,new j(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new g7,this._sphericalDelta=new g7,this._scale=1,this._panOffset=new j,this._rotateStart=new B0,this._rotateEnd=new B0,this._rotateDelta=new B0,this._panStart=new B0,this._panEnd=new B0,this._panDelta=new B0,this._dollyStart=new B0,this._dollyEnd=new B0,this._dollyDelta=new B0,this._dollyDirection=new j,this._mouse=new B0,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=VN.bind(this),this._onPointerDown=_N.bind(this),this._onPointerUp=LN.bind(this),this._onContextMenu=wN.bind(this),this._onMouseWheel=kN.bind(this),this._onKeyDown=IN.bind(this),this._onTouchStart=AN.bind(this),this._onTouchMove=PN.bind(this),this._onMouseDown=BN.bind(this),this._onMouseMove=zN.bind(this),this._interceptControlDown=CN.bind(this),this._interceptControlUp=TN.bind(this),this.domElement!==null)this.connect(this.domElement);this.update()}set cursorStyle(J){if(this._cursorStyle=J,J==="grab")this.domElement.style.cursor="grab";else this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(J){super.connect(J),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(J){J.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=J}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null)this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(UY),this.update(),this.state=ZJ.NONE}pan(J,Q){this._pan(J,Q),this.update()}dollyIn(J){this._dollyIn(J),this.update()}dollyOut(J){this._dollyOut(J),this.update()}rotateLeft(J){this._rotateLeft(J),this.update()}rotateUp(J){this._rotateUp(J),this.update()}update(J=null){let Q=this.object.position;if(PJ.copy(Q).sub(this.target),PJ.applyQuaternion(this._quat),this._spherical.setFromVector3(PJ),this.autoRotate&&this.state===ZJ.NONE)this._rotateLeft(this._getAutoRotationAngle(J));if(this.enableDamping)this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor;else this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi;let $=this.minAzimuthAngle,Z=this.maxAzimuthAngle;if(isFinite($)&&isFinite(Z)){if($<-Math.PI)$+=sJ;else if($>Math.PI)$-=sJ;if(Z<-Math.PI)Z+=sJ;else if(Z>Math.PI)Z-=sJ;if($<=Z)this._spherical.theta=Math.max($,Math.min(Z,this._spherical.theta));else this._spherical.theta=this._spherical.theta>($+Z)/2?Math.max($,this._spherical.theta):Math.min(Z,this._spherical.theta)}if(this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0)this.target.addScaledVector(this._panOffset,this.dampingFactor);else this.target.add(this._panOffset);this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let W=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let K=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),W=K!=this._spherical.radius}if(PJ.setFromSpherical(this._spherical),PJ.applyQuaternion(this._quatInverse),Q.copy(this.target).add(PJ),this.object.lookAt(this.target),this.enableDamping===!0)this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor);else this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0);if(this.zoomToCursor&&this._performCursorZoom){let K=null;if(this.object.isPerspectiveCamera){let Y=PJ.length();K=this._clampDistance(Y*this._scale);let X=Y-K;this.object.position.addScaledVector(this._dollyDirection,X),this.object.updateMatrixWorld(),W=!!X}else if(this.object.isOrthographicCamera){let Y=new j(this._mouse.x,this._mouse.y,0);Y.unproject(this.object);let X=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),W=X!==this.object.zoom;let H=new j(this._mouse.x,this._mouse.y,0);H.unproject(this.object),this.object.position.sub(H).add(Y),this.object.updateMatrixWorld(),K=PJ.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;if(K!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(K).add(this.object.position);else if(ZQ.origin.copy(this.object.position),ZQ.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ZQ.direction))<MN)this.object.lookAt(this.target);else GY.setFromNormalAndCoplanarPoint(this.object.up,this.target),ZQ.intersectPlane(GY,this.target)}else if(this.object.isOrthographicCamera){let K=this.object.zoom;if(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),K!==this.object.zoom)this.object.updateProjectionMatrix(),W=!0}if(this._scale=1,this._performCursorZoom=!1,W||this._lastPosition.distanceToSquared(this.object.position)>zZ||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zZ||this._lastTargetPosition.distanceToSquared(this.target)>zZ)return this.dispatchEvent(UY),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0;return!1}_getAutoRotationAngle(J){if(J!==null)return sJ/60*this.autoRotateSpeed*J;else return sJ/60/60*this.autoRotateSpeed}_getZoomScale(J){let Q=Math.abs(J*0.01);return Math.pow(0.95,this.zoomSpeed*Q)}_rotateLeft(J){this._sphericalDelta.theta-=J}_rotateUp(J){this._sphericalDelta.phi-=J}_panLeft(J,Q){PJ.setFromMatrixColumn(Q,0),PJ.multiplyScalar(-J),this._panOffset.add(PJ)}_panUp(J,Q){if(this.screenSpacePanning===!0)PJ.setFromMatrixColumn(Q,1);else PJ.setFromMatrixColumn(Q,0),PJ.crossVectors(this.object.up,PJ);PJ.multiplyScalar(J),this._panOffset.add(PJ)}_pan(J,Q){let $=this.domElement;if(this.object.isPerspectiveCamera){let Z=this.object.position;PJ.copy(Z).sub(this.target);let W=PJ.length();W*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*J*W/$.clientHeight,this.object.matrix),this._panUp(2*Q*W/$.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera)this._panLeft(J*(this.object.right-this.object.left)/this.object.zoom/$.clientWidth,this.object.matrix),this._panUp(Q*(this.object.top-this.object.bottom)/this.object.zoom/$.clientHeight,this.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1}_dollyOut(J){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=J;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_dollyIn(J){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=J;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_updateZoomParameters(J,Q){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let $=this.domElement.getBoundingClientRect(),Z=J-$.left,W=Q-$.top,K=$.width,Y=$.height;this._mouse.x=Z/K*2-1,this._mouse.y=-(W/Y)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(J){return Math.max(this.minDistance,Math.min(this.maxDistance,J))}_handleMouseDownRotate(J){this._rotateStart.set(J.clientX,J.clientY)}_handleMouseDownDolly(J){this._updateZoomParameters(J.clientX,J.clientX),this._dollyStart.set(J.clientX,J.clientY)}_handleMouseDownPan(J){this._panStart.set(J.clientX,J.clientY)}_handleMouseMoveRotate(J){this._rotateEnd.set(J.clientX,J.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let Q=this.domElement;this._rotateLeft(sJ*this._rotateDelta.x/Q.clientHeight),this._rotateUp(sJ*this._rotateDelta.y/Q.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(J){if(this._dollyEnd.set(J.clientX,J.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0)this._dollyOut(this._getZoomScale(this._dollyDelta.y));else if(this._dollyDelta.y<0)this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(J){this._panEnd.set(J.clientX,J.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(J){if(this._updateZoomParameters(J.clientX,J.clientY),J.deltaY<0)this._dollyIn(this._getZoomScale(J.deltaY));else if(J.deltaY>0)this._dollyOut(this._getZoomScale(J.deltaY));this.update()}_handleKeyDown(J){let Q=!1;switch(J.code){case this.keys.UP:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateUp(sJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,this.keyPanSpeed);Q=!0;break;case this.keys.BOTTOM:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateUp(-sJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,-this.keyPanSpeed);Q=!0;break;case this.keys.LEFT:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateLeft(sJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(this.keyPanSpeed,0);Q=!0;break;case this.keys.RIGHT:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateLeft(-sJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(-this.keyPanSpeed,0);Q=!0;break}if(Q)J.preventDefault(),this.update()}_handleTouchStartRotate(J){if(this._pointers.length===1)this._rotateStart.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._rotateStart.set($,Z)}}_handleTouchStartPan(J){if(this._pointers.length===1)this._panStart.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._panStart.set($,Z)}}_handleTouchStartDolly(J){let Q=this._getSecondPointerPosition(J),$=J.pageX-Q.x,Z=J.pageY-Q.y,W=Math.sqrt($*$+Z*Z);this._dollyStart.set(0,W)}_handleTouchStartDollyPan(J){if(this.enableZoom)this._handleTouchStartDolly(J);if(this.enablePan)this._handleTouchStartPan(J)}_handleTouchStartDollyRotate(J){if(this.enableZoom)this._handleTouchStartDolly(J);if(this.enableRotate)this._handleTouchStartRotate(J)}_handleTouchMoveRotate(J){if(this._pointers.length==1)this._rotateEnd.set(J.pageX,J.pageY);else{let $=this._getSecondPointerPosition(J),Z=0.5*(J.pageX+$.x),W=0.5*(J.pageY+$.y);this._rotateEnd.set(Z,W)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let Q=this.domElement;this._rotateLeft(sJ*this._rotateDelta.x/Q.clientHeight),this._rotateUp(sJ*this._rotateDelta.y/Q.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(J){if(this._pointers.length===1)this._panEnd.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._panEnd.set($,Z)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(J){let Q=this._getSecondPointerPosition(J),$=J.pageX-Q.x,Z=J.pageY-Q.y,W=Math.sqrt($*$+Z*Z);this._dollyEnd.set(0,W),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let K=(J.pageX+Q.x)*0.5,Y=(J.pageY+Q.y)*0.5;this._updateZoomParameters(K,Y)}_handleTouchMoveDollyPan(J){if(this.enableZoom)this._handleTouchMoveDolly(J);if(this.enablePan)this._handleTouchMovePan(J)}_handleTouchMoveDollyRotate(J){if(this.enableZoom)this._handleTouchMoveDolly(J);if(this.enableRotate)this._handleTouchMoveRotate(J)}_addPointer(J){this._pointers.push(J.pointerId)}_removePointer(J){delete this._pointerPositions[J.pointerId];for(let Q=0;Q<this._pointers.length;Q++)if(this._pointers[Q]==J.pointerId){this._pointers.splice(Q,1);return}}_isTrackingPointer(J){for(let Q=0;Q<this._pointers.length;Q++)if(this._pointers[Q]==J.pointerId)return!0;return!1}_trackPointer(J){let Q=this._pointerPositions[J.pointerId];if(Q===void 0)Q=new B0,this._pointerPositions[J.pointerId]=Q;Q.set(J.pageX,J.pageY)}_getSecondPointerPosition(J){let Q=J.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[Q]}_customWheelEvent(J){let Q=J.deltaMode,$={clientX:J.clientX,clientY:J.clientY,deltaY:J.deltaY};switch(Q){case 1:$.deltaY*=16;break;case 2:$.deltaY*=100;break}if(J.ctrlKey&&!this._controlActive)$.deltaY*=10;return $}}function _N(J){if(this.enabled===!1)return;if(this._pointers.length===0)this.domElement.setPointerCapture(J.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp);if(this._isTrackingPointer(J))return;if(this._addPointer(J),J.pointerType==="touch")this._onTouchStart(J);else this._onMouseDown(J);if(this._cursorStyle==="grab")this.domElement.style.cursor="grabbing"}function VN(J){if(this.enabled===!1)return;if(J.pointerType==="touch")this._onTouchMove(J);else this._onMouseMove(J)}function LN(J){switch(this._removePointer(J),this._pointers.length){case 0:if(this.domElement.releasePointerCapture(J.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(NY),this.state=ZJ.NONE,this._cursorStyle==="grab")this.domElement.style.cursor="grab";break;case 1:let Q=this._pointers[0],$=this._pointerPositions[Q];this._onTouchStart({pointerId:Q,pageX:$.x,pageY:$.y});break}}function BN(J){let Q;switch(J.button){case 0:Q=this.mouseButtons.LEFT;break;case 1:Q=this.mouseButtons.MIDDLE;break;case 2:Q=this.mouseButtons.RIGHT;break;default:Q=-1}switch(Q){case a9.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(J),this.state=ZJ.DOLLY;break;case a9.ROTATE:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(J),this.state=ZJ.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(J),this.state=ZJ.ROTATE}break;case a9.PAN:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(J),this.state=ZJ.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(J),this.state=ZJ.PAN}break;default:this.state=ZJ.NONE}if(this.state!==ZJ.NONE)this.dispatchEvent(kZ)}function zN(J){switch(this.state){case ZJ.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(J);break;case ZJ.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(J);break;case ZJ.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(J);break}}function kN(J){if(this.enabled===!1||this.enableZoom===!1||this.state!==ZJ.NONE)return;J.preventDefault(),this.dispatchEvent(kZ),this._handleMouseWheel(this._customWheelEvent(J)),this.dispatchEvent(NY)}function IN(J){if(this.enabled===!1)return;this._handleKeyDown(J)}function AN(J){switch(this._trackPointer(J),this._pointers.length){case 1:switch(this.touches.ONE){case r9.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(J),this.state=ZJ.TOUCH_ROTATE;break;case r9.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(J),this.state=ZJ.TOUCH_PAN;break;default:this.state=ZJ.NONE}break;case 2:switch(this.touches.TWO){case r9.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(J),this.state=ZJ.TOUCH_DOLLY_PAN;break;case r9.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(J),this.state=ZJ.TOUCH_DOLLY_ROTATE;break;default:this.state=ZJ.NONE}break;default:this.state=ZJ.NONE}if(this.state!==ZJ.NONE)this.dispatchEvent(kZ)}function PN(J){switch(this._trackPointer(J),this.state){case ZJ.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(J),this.update();break;case ZJ.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(J),this.update();break;case ZJ.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(J),this.update();break;case ZJ.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(J),this.update();break;default:this.state=ZJ.NONE}}function wN(J){if(this.enabled===!1)return;J.preventDefault()}function CN(J){if(J.key==="Control")this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function TN(J){if(J.key==="Control")this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}var Q9=1,SN=0.06,iJ=Q9+SN,KQ=8*iJ/2,WQ=0.13,AZ={roman:10692152,spartan:12870189,hun:14263320,gaul:4094522,egyptian:2793880,viking:2838401,persian:5978766,teuton:7238520};function W8(J,Q){return[J*iJ-KQ+iJ/2,(7-Q)*iJ-KQ+iJ/2]}class PZ{container;opts;scene=new b6;renderer;camera;controls;texLoader=new c6;texCache=new Map;props=new mJ;hiGroup=new mJ;pulseTiles=[];unitG=new mJ;fxG=new mJ;units=new Map;dmg=[];raycaster=new a6;pickPlane;clickCb;hoverCb;clock=new r6;downXY={x:0,y:0};constructor(J,Q){this.container=J;this.opts=Q;let $=J.clientWidth||640,Z=J.clientHeight||520;this.renderer=new BZ({antialias:!0}),this.renderer.setSize($,Z),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=k6,this.renderer.outputColorSpace=A7,J.appendChild(this.renderer.domElement),this.scene.background=new x0(1906707),this.scene.fog=new T7(1906707,16,30),this.camera=new pJ(42,$/Z,0.1,100),this.camera.position.set(0,9.5,9.2),this.controls=new IZ(this.camera,this.renderer.domElement),this.controls.target.set(0,0,-0.3),this.controls.enableDamping=!0,this.controls.dampingFactor=0.08,this.controls.minDistance=7,this.controls.maxDistance=20,this.controls.maxPolarAngle=Math.PI*0.46,this.controls.enablePan=!1,this.controls.update(),this.scene.add(new o6(12167562,0.7)),this.scene.add(new n6(16773584,2760984,0.5));let W=new i6(16773336,1.5);W.position.set(-6,12,6),W.castShadow=!0,W.shadow.mapSize.set(2048,2048);let K=8;Object.assign(W.shadow.camera,{left:-K,right:K,top:K,bottom:-K,near:1,far:40}),this.scene.add(W);let Y=new i0(new A9(120,120),new _J({color:2371642,roughness:0.85,metalness:0.1}));Y.rotation.x=-Math.PI/2,Y.position.y=-1.6,Y.receiveShadow=!0,this.scene.add(Y),this.buildScenery(),this.scene.add(this.props,this.unitG,this.hiGroup,this.fxG),this.pickPlane=new i0(new A9(8*iJ,8*iJ),new I9({visible:!1})),this.pickPlane.rotation.x=-Math.PI/2,this.pickPlane.position.y=0.14,this.scene.add(this.pickPlane);let X=this.renderer.domElement;X.addEventListener("pointerdown",(H)=>{this.downXY={x:H.clientX,y:H.clientY}}),X.addEventListener("pointerup",(H)=>{if(Math.hypot(H.clientX-this.downXY.x,H.clientY-this.downXY.y)<5)this.handleClick(H)}),X.addEventListener("pointermove",(H)=>this.handleHover(H)),X.addEventListener("pointerleave",(H)=>this.hoverCb?.(null,H)),window.addEventListener("resize",()=>this.onResize()),this.animate()}onClick(J){this.clickCb=J}onHover(J){this.hoverCb=J}pointerTile(J){let Q=this.renderer.domElement.getBoundingClientRect(),$=new B0((J.clientX-Q.left)/Q.width*2-1,-((J.clientY-Q.top)/Q.height)*2+1);this.raycaster.setFromCamera($,this.camera);let Z=this.raycaster.intersectObject(this.pickPlane)[0];if(!Z)return null;let W=Math.round((Z.point.x+KQ-iJ/2)/iJ),K=7-Math.round((Z.point.z+KQ-iJ/2)/iJ);return W>=0&&W<8&&K>=0&&K<8?[W,K]:null}handleHover(J){this.hoverCb?.(this.pointerTile(J),J)}onResize(){let J=this.container.clientWidth,Q=this.container.clientHeight;if(!J||!Q)return;this.renderer.setSize(J,Q),this.camera.aspect=J/Q,this.camera.updateProjectionMatrix()}tex(J){let Q=this.texCache.get(J);if(!Q)Q=this.texLoader.load(J),Q.colorSpace=A7,Q.anisotropy=4,this.texCache.set(J,Q);return Q}tribeOf(J){return J===0?this.opts.p0tribe:this.opts.p1tribe}handleClick(J){if(!this.clickCb)return;let Q=this.pointerTile(J);if(Q)this.clickCb(Q)}buildScenery(){let J=8*iJ,$=new i0(new jJ(J+2,0.16,J+2),new _J({color:6257207,roughness:1}));$.position.y=-0.09,$.receiveShadow=!0,this.scene.add($);let Z=new i0(new jJ(J+2-0.3,1.5,J+2-0.3),new _J({color:4863266,roughness:1}));Z.position.y=-0.92,Z.castShadow=!0,Z.receiveShadow=!0,this.scene.add(Z);let W=new i0(new jJ(J+2-0.15,0.25,J+2-0.15),new _J({color:5984328,roughness:1,flatShading:!0}));W.position.y=-0.34,this.scene.add(W);let K=()=>{let Y=J/2,X=(J+2)/2-0.25,H=Math.floor(Math.random()*4),U=(Math.random()*2-1)*X,N=Y+0.1+Math.random()*(X-Y-0.1);return H===0?[U,N]:H===1?[U,-N]:H===2?[N,U]:[-N,U]};for(let Y=0;Y<26;Y++){let X=this.makeTree(),[H,U]=K();X.position.set(H,-0.01,U),X.rotation.y=Math.random()*6.28;let N=0.8+Math.random()*0.6;X.scale.setScalar(N),this.scene.add(X)}for(let Y=0;Y<34;Y++){let X=this.makeRock(),[H,U]=K();X.position.set(H,0,U),this.scene.add(X)}for(let Y=0;Y<40;Y++){let X=this.makeGrass(),[H,U]=K();X.position.set(H,0,U),this.scene.add(X)}}makeTree(){let J=new mJ,Q=new i0(new $8(0.06,0.09,0.4,6),new _J({color:5914405,roughness:1}));Q.position.y=0.2,Q.castShadow=!0,J.add(Q);let $=new i0(new O8(0.32,0.5,7),new _J({color:4090676,roughness:1,flatShading:!0}));$.position.y=0.58,$.castShadow=!0,J.add($);let Z=new i0(new O8(0.24,0.42,7),new _J({color:4880954,roughness:1,flatShading:!0}));return Z.position.y=0.86,Z.castShadow=!0,J.add(Z),J}makeRock(){let J=new i0(new v7(0.14+Math.random()*0.14,0),new _J({color:7038560,roughness:1,flatShading:!0}));return J.position.y=0.06,J.castShadow=!0,J.receiveShadow=!0,J.rotation.set(Math.random(),Math.random(),Math.random()),J}makeGrass(){let J=new mJ,Q=new _J({color:7312450,roughness:1,side:uJ});for(let $=0;$<4;$++){let Z=new i0(new O8(0.03,0.22,3),Q);Z.position.set((Math.random()-0.5)*0.18,0.11,(Math.random()-0.5)*0.18),Z.rotation.z=(Math.random()-0.5)*0.5,J.add(Z)}return J}standee(J){let Q=this.tribeOf(J.owner),$=r7[`${Q}_${J.arch}`],Z=new mJ,W=0.74,K=0.92,Y=new i0(new jJ(0.74,0.92,0.05),[0,1,2,3,4,5].map((U)=>new _J({color:U===4?16777215:AZ[Q],roughness:0.6,map:U===4&&$?this.tex($):null})));Y.position.y=0.54,Y.castShadow=!0,Z.add(Y);let X=new i0(new jJ(0.82,1,0.04),new _J({color:AZ[Q],roughness:0.5,metalness:0.2}));X.position.set(0,0.54,-0.03),X.castShadow=!0,Z.add(X);let H=new i0(new $8(0.34,0.4,0.12,16),new _J({color:AZ[Q],roughness:0.4,metalness:0.3}));return H.position.y=0.06,H.castShadow=!0,H.receiveShadow=!0,Z.add(H),{group:Z,card:Y}}wagon(){let J=new mJ,Q=new i0(new jJ(0.55,0.4,0.7),new _J({color:7031333,roughness:0.9}));Q.position.y=0.3,Q.castShadow=!0,J.add(Q);for(let $ of[-0.32,0.32])for(let Z of[-0.3,0.3]){let W=new i0(new $8(0.16,0.16,0.06,14),new _J({color:2759952,roughness:0.8}));W.rotation.z=Math.PI/2,W.position.set($,0.16,Z),W.castShadow=!0,J.add(W)}return J}buildProps(J){this.props.clear();let Q=new jJ(Q9,0.25,Q9);for(let $=0;$<8;$++)for(let Z=0;Z<8;Z++){let W=Z<J.stakes[$]?0:1,K=new x0(W===0?7306554:5595962),Y=(($*7+Z*13)%6-2.5)*0.012;K.offsetHSL(Y*0.3,0,Y);let X=new i0(Q,new _J({color:K,roughness:0.95})),[H,U]=W8($,Z);if(X.position.set(H,0,U),X.receiveShadow=!0,this.props.add(X),Z===J.stakes[$]-1){let N=new i0(new jJ(Q9,0.04,0.08),new _J({color:14401642,emissive:3813136,roughness:0.5}));N.position.set(H,0.15,U-iJ/2),this.props.add(N)}}for(let $=0;$<2;$++)for(let Z of J.wagons[$]){if(Z.hp<=0)continue;let W=this.wagon(),[K,Y]=W8(Z.col,Z.row);W.position.set(K,WQ,Y),this.props.add(W)}for(let[$,Z]of J.fields.entries()){let[W,K]=$.split(",").map(Number),Y=new i0(new jJ(0.7,0.06,0.7),new _J({color:Z.type==="crop"?13148730:8219466,roughness:1})),[X,H]=W8(W,K);Y.position.set(X,0.15,H),Y.receiveShadow=!0,this.props.add(Y)}for(let[$]of J.palisades.entries()){let Z=J.stakes[$],W=new i0(new jJ(Q9,0.5,0.12),new _J({color:5915430,roughness:0.9})),[K,Y]=W8($,Z-1);W.position.set(K,0.32,Y-iJ/2),W.castShadow=!0,this.props.add(W)}}makeBar(){let J=document.createElement("canvas");J.width=192,J.height=56;let Q=J.getContext("2d"),$=new f7(J),Z=new j7(new J7({map:$,transparent:!0,depthWrite:!1,depthTest:!1}));return Z.scale.set(0.8,0.235,1),Z.renderOrder=10,{spr:Z,tex:$,ctx:Q}}syncBar(J,Q){if(!J.bar||!J.barCtx||!J.barTex)return;let $=[Q.tier2?"★★":Q.tier1?"★":"",Q.braced?"⛨":"",Q.exhausted?"∅":""].filter(Boolean).join(" "),Z=`${Q.hp}/${Q.max_hp}|${$}`;if(Z===J.barKey)return;J.barKey=Z;let W=J.barCtx,K=192,Y=56;if(W.clearRect(0,0,K,Y),$)W.font="bold 28px sans-serif",W.textAlign="center",W.textBaseline="top",W.lineWidth=5,W.strokeStyle="rgba(0,0,0,0.9)",W.strokeText($,K/2,-1),W.fillStyle="#ffd24a",W.fillText($,K/2,-1);let X=Math.max(0,Math.min(1,Q.hp/Q.max_hp)),H=8,U=27,N=K-16,G=22,q=7,F=(R,B,E,D,O)=>{W.beginPath(),W.moveTo(R+O,B),W.arcTo(R+E,B,R+E,B+D,O),W.arcTo(R+E,B+D,R,B+D,O),W.arcTo(R,B+D,R,B,O),W.arcTo(R,B,R+E,B,O),W.closePath()};if(W.fillStyle="rgba(8,6,4,0.9)",F(H,U,N,G,q),W.fill(),W.fillStyle=X>0.5?"#5fbf4a":X>0.25?"#d8b53a":"#c8463a",X>0)F(H+3,U+3,Math.max(2,(N-6)*X),G-6,q-3),W.fill();W.fillStyle="#fff",W.font="bold 16px sans-serif",W.textAlign="center",W.textBaseline="middle",W.fillText(`${Q.hp}/${Q.max_hp}`,K/2,U+G/2+1),J.barTex.needsUpdate=!0}update(J){this.buildProps(J);let Q=new Set;for(let $ of J.units.values()){if(!$.pos)continue;Q.add($.uid);let[Z,W]=W8($.pos[0],$.pos[1]),K=this.units.get($.uid);if(!K){let{group:Y,card:X}=this.standee($);Y.position.set(Z,WQ,W),this.unitG.add(Y),K={group:Y,card:X,hp:$.hp,max:$.max_hp,tile:[$.pos[0],$.pos[1]],bob:Math.random()*6.28};let H=this.makeBar();H.spr.position.set(0,1.22,0),Y.add(H.spr),K.bar=H.spr,K.barTex=H.tex,K.barCtx=H.ctx,this.units.set($.uid,K)}else{if(K.tile[0]!==$.pos[0]||K.tile[1]!==$.pos[1])K.tween={fx:K.group.position.x,fz:K.group.position.z,tx:Z,tz:W,t0:this.clock.elapsedTime,dur:0.34},K.tile=[$.pos[0],$.pos[1]];if($.hp<K.hp)this.spawnDamage(Z,W,K.hp-$.hp),this.flash(K);K.hp=$.hp}this.syncBar(K,$)}for(let[$,Z]of[...this.units])if(!Q.has($)&&!Z.dying)Z.dying={t0:this.clock.elapsedTime}}setHighlights(J){this.hiGroup.clear(),this.pulseTiles=[];let Q=(W,K)=>{for(let Y of W??[]){let[X,H]=W8(Y[0],Y[1]),U=new i0(new A9(Q9*0.9,Q9*0.9),new I9({color:K,transparent:!0,opacity:0.5,depthWrite:!1,blending:B7}));U.rotation.x=-Math.PI/2,U.position.set(X,0.15,H),this.hiGroup.add(U),this.pulseTiles.push(U);let N=new i0(new $7(Q9*0.4,Q9*0.49,4),new I9({color:K,transparent:!0,opacity:0.9,depthWrite:!1,side:uJ}));N.rotation.x=-Math.PI/2,N.rotation.z=Math.PI/4,N.position.set(X,0.155,H),this.hiGroup.add(N),this.pulseTiles.push(N)}},$=(W,K,Y)=>{for(let X of W??[]){let H=new i0(new A9(Q9*0.92,Q9*0.92),new I9({color:K,transparent:!0,opacity:Y,depthWrite:!1}));H.rotation.x=-Math.PI/2;let[U,N]=W8(X[0],X[1]);H.position.set(U,0.145,N),this.hiGroup.add(H)}},Z=(W,K,Y=0.42,X=0.5)=>{for(let H of W??[]){let U=new i0(new $7(Q9*Y,Q9*X,28),new I9({color:K,transparent:!0,opacity:0.95,depthWrite:!1,side:uJ}));U.rotation.x=-Math.PI/2;let[N,G]=W8(H[0],H[1]);U.position.set(N,0.16,G),this.hiGroup.add(U)}};if(Q(J.valid,15910473),$(J.move,7315274,0.5),$(J.stage,13214247,0.55),Z(J.melee,12603466),Z(J.shoot,14257978),Z(J.charge,10120384),J.selected)Z([J.selected],14401642,0.5,0.6)}spawnDamage(J,Q,$){let Z=document.createElement("canvas");Z.width=128,Z.height=64;let W=Z.getContext("2d");W.font="bold 48px Cinzel, serif",W.textAlign="center",W.textBaseline="middle",W.fillStyle="#1a1408",W.fillText(`-${$}`,65,34),W.fillStyle="#ff5a4a",W.fillText(`-${$}`,64,32);let K=new f7(Z),Y=new j7(new J7({map:K,transparent:!0,depthTest:!1}));Y.scale.set(0.8,0.4,1),Y.position.set(J,1.2,Q),this.fxG.add(Y),this.dmg.push({spr:Y,t0:this.clock.elapsedTime})}flash(J){for(let Q of J.card.material)Q.emissive=new x0(16724000),Q.__flash=1}animate=()=>{requestAnimationFrame(this.animate);let J=this.clock.getDelta(),Q=this.clock.elapsedTime;this.controls.update();for(let[$,Z]of[...this.units]){if(Z.dying){let K=(Q-Z.dying.t0)/0.5;if(Z.group.position.y=WQ-K*0.6,Z.group.scale.setScalar(Math.max(0.01,1-K)),Z.group.traverse((Y)=>{let X=Y.material;if(X)X.transparent=!0,X.opacity=Math.max(0,1-K)}),K>=1)this.unitG.remove(Z.group),this.units.delete($);continue}let W=WQ;if(Z.tween){let K=Math.min(1,(Q-Z.tween.t0)/Z.tween.dur),Y=K<0.5?2*K*K:1-(-2*K+2)**2/2;if(Z.group.position.x=Z.tween.fx+(Z.tween.tx-Z.tween.fx)*Y,Z.group.position.z=Z.tween.fz+(Z.tween.tz-Z.tween.fz)*Y,W+=Math.sin(K*Math.PI)*0.28,K>=1)Z.tween=void 0}Z.group.position.y=W+Math.sin(Q*2+Z.bob)*0.02;for(let K of Z.card.material)if(K.__flash>0)K.__flash=Math.max(0,K.__flash-J*3),K.emissive.setScalar(K.__flash*0.6),K.emissive.r=K.__flash,K.emissive.g=K.__flash*0.2,K.emissive.b=K.__flash*0.12}if(this.pulseTiles.length){let $=0.5+0.5*Math.sin(Q*3.2);for(let Z of this.pulseTiles)Z.material.opacity=0.3+$*0.45,Z.scale.setScalar(0.95+$*0.08)}for(let $ of[...this.dmg]){let Z=(Q-$.t0)/1;if($.spr.position.y=1.2+Z*0.8,$.spr.material.opacity=1-Z,Z>=1)this.fxG.remove($.spr),this.dmg.splice(this.dmg.indexOf($),1)}this.renderer.render(this.scene,this.camera)}}var TJ=(J)=>`${J[0]},${J[1]}`,u7=(J)=>J[0].toUpperCase()+J.slice(1),wZ=(J,Q)=>({2:Q.UNLOCK_3RD,3:Q.UNLOCK_4TH,4:Q.UNLOCK_5TH})[J];class YQ{root;g;policies;cfg;banner="";log=[];mBuild=[];mPlan;mMode={kind:null};cOrders=new Map;cSel=null;onChange=null;board3d;shell;get use3d(){return this.cfg.view!=="2d"}constructor(J){this.root=J}get phaseKind(){if(this.banner.includes("Muster"))return"muster";if(this.banner.includes("Clash"))return"clash";if(this.banner.includes("Intervention"))return"iv";return"other"}get round(){return this.g.round}get bannerText(){return this.banner}get musterModeKind(){return this.mMode.kind}get stagedRecruitCount(){return this.mPlan?.recruits.length??0}get stagedBuildCount(){return this.mBuild?.length??0}get selectedUid(){return this.cSel}get orderCount(){return this.cOrders.size}isHuman(J){return this.cfg.mode==="hotseat"||J===this.cfg.humanSeat}tribe(J){return J===0?this.cfg.p0tribe:this.cfg.p1tribe}human(J){return this.policies[J]}start(J){this.init(J),this.g.setup(),this.begin()}startScenario(J,Q){this.init(J),this.g.setup(),Q(this.g),this.begin()}init(J){this.cfg=J,this.policies=[0,1].map((Q)=>this.isHuman(Q)?new qQ(J.mode==="hotseat"?`Player ${Q+1}`:"You"):cZ(J.botName)),this.policies.forEach((Q,$)=>Q.reset(J.seed,$)),this.g=new _9(this.policies,J.seed,lZ)}begin(){this.log=[`Round 1 — ${u7(this.tribe(0))} vs ${u7(this.tribe(1))}.`],this.mountTooltip(),this.loop()}get stagedFieldCount(){return this.mBuild?.filter((J)=>J[0]==="field").length??0}get hasAttackOrder(){for(let J of this.cOrders.values())if(J[0]==="MELEE"||J[0]==="CHARGE"||J[0]==="SHOOT")return!0;return!1}tip;mountTooltip(){if(this.tip)return;if(this.tip=document.createElement("div"),this.tip.className="utip",this.tip.style.display="none",document.body.appendChild(this.tip),this.use3d)return;this.root.addEventListener("mousemove",(J)=>{let Q=J.target.closest?.(".cell[data-uid]");if(!Q){this.tip.style.display="none";return}let $=this.g.units.get(Number(Q.dataset.uid));if(!$){this.tip.style.display="none";return}this.tip.innerHTML=this.unitTooltip($),this.tip.style.display="block",this.tip.style.left=Math.min(J.clientX+14,window.innerWidth-210)+"px",this.tip.style.top=J.clientY+14+"px"}),this.root.addEventListener("mouseleave",()=>{if(this.tip)this.tip.style.display="none"})}unitTooltip(J){let Q=this.g.C,$={spear:"Cavalry",cav:"Archers",archer:"Spearmen"}[J.arch],Z=J.rmin===J.rmax?`${J.rmax}`:`${J.rmin}–${J.rmax}`,W=J.tier2?' <span class="utr">★★</span>':J.tier1?' <span class="utr">★</span>':"",K=[J.exhausted?"∅ exhausted — fights weaker":"",J.braced?"⛨ braced — stops a charge":""].filter(Boolean).join(" · "),Y=J.tier2?"★★ max rank":`XP ${J.xp}/${J.tier1?Q.XP_TIER2:Q.XP_TIER1} → ${J.tier1?"★★":"★"} (wound enemies to rank up)`;return`<b>${aJ[J.arch]}</b>${W}
      <div class="utstats">
        <span class="utstat atk">⚔ Atk <b>${J.base_atk}</b></span>
        <span class="utstat">\uD83D\uDEE1 Guard <b>${J.base_guard}</b></span>
        <span class="utstat">❤️ HP <b>${J.hp}/${J.max_hp}</b></span>
        <span class="utstat">\uD83D\uDC5F Move <b>${J.mv}</b></span>
        <span class="utstat">\uD83C\uDFAF Range <b>${Z}</b></span>
      </div>
      ${$?`<span class="utb">Beats ${$} — +1 dmg into them</span>`:""}
      <span class="utg">${Y}</span>
      ${K?`<span class="uts">${K}</span>`:""}`}async loop(){try{for(;;)await this.playRoundInteractive()}catch(J){if(J instanceof lJ)this.winScreen(J.winner,J.wtype);else throw J}}async playRoundInteractive(){let J=this.g,Q=J.C;J.cap_dmg=[0,0],J.wagon_dmg_round=[0,0],J.rows_lost_round=[0,0],J.rows_taken_round=[0,0],J.unit_dmg_round=[0,0];for(let X of[J.komi,1-J.komi]){if(this.isHuman(X))await this.humanMuster(X);J.musterPlayer(X)}for(let X of J.units.values())X.face_down=!1;J.wards=[];try{await this.doWindow(1),await this.doPulse(1),await this.doWindow(2),await this.doPulse(2),await this.doWindow(3)}catch(X){if(!(X instanceof K7))throw X}J.wards=[],J.frontier();let[$,Z]=J.rows_lost_round;if($!==Z)J.komi=$>Z?0:1;let W=this.cfg.mode==="bot"?this.cfg.humanSeat:0,K=1-W,Y=[];if(J.rows_taken_round[W])Y.push(`you pushed ${J.rows_taken_round[W]} row(s) forward`);if(J.rows_lost_round[W])Y.push(`you lost ${J.rows_lost_round[W]} row(s)`);if(J.wagon_dmg_round[W])Y.push("\uD83D\uDCA5 you breached an enemy wagon!");if(J.wagon_dmg_round[K])Y.push("⚠ the enemy breached your wagon!");if(this.log.push(`Round ${J.round} frontier: ${Y.length?Y.join(", "):"the lines held — no ground changed."}`),J.round>=Q.GOLDEN_GOAL_ROUND){let X=J.rows_taken_round[0]>0||J.wagon_dmg_round[0]>0,H=J.rows_taken_round[1]>0||J.wagon_dmg_round[1]>0;if(X||H){let U;if(X&&H)if(J.rows_taken_round[0]!==J.rows_taken_round[1])U=J.rows_taken_round[0]>J.rows_taken_round[1]?0:1;else if(J.wagon_dmg_round[0]!==J.wagon_dmg_round[1])U=J.wagon_dmg_round[0]>J.wagon_dmg_round[1]?0:1;else U=J.komi;else U=X?0:1;throw new lJ(U,"golden-goal")}}for(let X=0;X<2;X++)J.res[X].tribute+=Q.TRIBUTE_PER_ROW*J.rows_lost_round[X];if(J.round===Q.CARAVAN_ROUND_1||J.round===Q.CARAVAN_ROUND_2)J.caravan(J.round===Q.CARAVAN_ROUND_1?1:2);if(J.round===1){let[X,H]=J.rows_taken_round;if(X!==H)J.r1_winner=X>H?0:1;else if(J.unit_dmg_round[0]!==J.unit_dmg_round[1]&&(!Q.R1_REQUIRE_ENGAGE||Math.min(...J.unit_dmg_round)>=1))J.r1_winner=J.unit_dmg_round[0]>J.unit_dmg_round[1]?0:1}if(J.lead_trace.push(J.leadHolder()),J.round>=Q.HARD_STOP_ROUND){let X=J.wagonsAlive(0),H=J.wagonsAlive(1);if(X!==H)throw new lJ(X>H?0:1,"ladder");let U=J.ownedRows(0),N=J.ownedRows(1);if(U!==N)throw new lJ(U>N?0:1,"ladder");throw new lJ(J.komi,"ladder")}J.updateEntrench(),J.round++,this.policies.forEach((X)=>X.clearPhase?.())}async doWindow(J){for(let Q of[this.g.komi,1-this.g.komi])if(this.isHuman(Q))await this.humanIntervention(Q,J);this.g.interventionWindow(J),this.policies.forEach((Q)=>{let $=Q;if($.pendingIntervention)$.pendingIntervention={}})}async doPulse(J){for(let $ of[0,1])if(this.isHuman($))await this.humanClash($,J);this.g.runPulse(J);let Q=[...this.g.units.values()].filter(($)=>$.pos===null&&$.wounded_round===this.g.round);if(Q.length)this.log.push(`Pulse ${J}: ${Q.length} unit(s) fell.`);this.render(),await this.pause(550)}pause(J){return new Promise((Q)=>setTimeout(Q,J))}humanMuster(J){return this.banner=`${this.seatName(J)} — Muster`,this.mBuild=[],this.mPlan={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0},this.mMode={kind:null},new Promise((Q)=>{let $=()=>{this.human(J).pendingBuild=this.mBuild,this.human(J).pendingReinforce=this.mPlan,Q()};this.musterDone=$,this.musterPlayer=J,this.render()})}musterDone=null;musterPlayer=0;musterBudget(J){let Q=this.g,$=Q.C,[Z,W]=Q.computeHarvest(J),K=0;for(let H of Q.onBoard(J))K+=$.UPKEEP_CROP+(Q.beyondOwn(H)?$.SUPPLY_STRAIN_CROP:0);let Y=Q.res[J].supply+Z-this.spentSupply(J),X=Q.res[J].crop+W-K;return{supply:Y,crop:X}}spentSupply(J){let Q=this.g,$=Q.C,Z=0;for(let K of this.mBuild)Z+=K[0]==="field"?$.FIELD_COST:$.PALISADE_COST;for(let K of this.mPlan.unlocks){let Y=Q.unlocked[J].size+this.mPlan.unlocks.indexOf(K);Z+=wZ(Y,$)??0}let W=0;for(let[K]of this.mPlan.recruits)Z+=Q.costs[K]+$.COPY_SURCHARGE*(Q.copies[K]+W++);return Z-this.mPlan.tribute_spend}onCell(J,Q){let $=this.g,Z=this.banner.includes("Muster")?this.musterPlayer:-1;if(Z>=0)return this.musterCell(Z,J,Q);return this.clashCell(J,Q)}musterCell(J,Q,$){let Z=this.g,W=Z.C,K=this.mMode;if(K.kind==="palisade"){this.musterPalisade(Q[0]);return}if(K.kind==="recruit"&&K.arch){if(Z.heartlandRows(J).includes(Q[1])&&!Z.occupied(Q)&&!this.staged(Q)&&this.mPlan.recruits.length<W.DEPLOY_MAX+Z.extra_deploy[J])this.mPlan.recruits.push([K.arch,Q])}else if(K.kind==="field"&&K.ftype){if(Z.territoryOf(Q)===J&&!Z.fields.has(TJ(Q))&&!Z.wagon_at.has(TJ(Q))&&!this.staged(Q)&&this.mBuild.filter((Y)=>Y[0]==="field"||Y[0]==="palisade").length<W.BUILD_ACTIONS)this.mBuild.push(["field",Q,K.ftype])}else if(K.kind==="reposition"){if(K.uid===void 0){if($!==void 0&&Z.units.get($).owner===J&&Z.units.get($).pos)K.uid=$}else if(Z.territoryOf(Q)===J&&!Z.occupied(Q)&&!this.staged(Q)&&this.mPlan.repositions.length<W.REPOSITION_MAX)this.mPlan.repositions.push([K.uid,Q]),K.uid=void 0}this.render()}staged(J){return this.mBuild.some((Q)=>Q[0]==="field"&&TJ(Q[1])===TJ(J))||this.mPlan.recruits.some((Q)=>TJ(Q[1])===TJ(J))||this.mPlan.repositions.some((Q)=>TJ(Q[1])===TJ(J))}humanClash(J,Q){return this.banner=`${this.seatName(J)} — Clash, pulse ${Q}`,this.cOrders=new Map,this.cSel=null,this.clashPlayer=J,new Promise(($)=>{this.clashDone=()=>{let Z={};for(let[W,K]of this.cOrders)Z[W]=K;this.human(J).pendingOrders[Q]=Z,$()},this.render()})}clashDone=null;clashPlayer=0;clashCell(J,Q){let $=this.g,Z=this.clashPlayer;if(this.cSel===null){if(Q!==void 0&&$.units.get(Q).owner===Z)this.cSel=Q}else{let W=$.units.get(this.cSel),K=X7($,W);if(Q!==void 0&&$.units.get(Q).owner!==Z){let Y=K.chargeTargets.find((U)=>U.uid===Q),X=K.shootTargets.includes(Q),H=K.meleeTargets.find((U)=>U.uid===Q);if(X)this.cOrders.set(W.uid,["SHOOT",["U",Q]]);else if(Y)this.cOrders.set(W.uid,["CHARGE",Q,Y.path]);else if(H)this.cOrders.set(W.uid,["MELEE",Q,H.path]);this.cSel=null}else if(Q===this.cSel)this.cSel=null;else if(K.moves.has(TJ(J)))this.cOrders.set(W.uid,["MOVE",K.moves.get(TJ(J))]),this.cSel=null;else if(Q!==void 0&&$.units.get(Q).owner===Z)this.cSel=Q}this.render()}humanIntervention(J,Q){let $=this.g,Z=$.C,W=$.res[J].tribute,K=Q===3&&W>=Z.SURGE_COST,Y=Q<=2&&W>=Z.SHIELDBEARER_COST;if(!K&&!Y)return Promise.resolve();return this.banner=`${this.seatName(J)} — Intervention window ${Q}`,new Promise((X)=>{this.ivResolve=X,this.ivPlayer=J,this.ivWno=Q,this.ivSel=null,this.render()})}ivResolve=null;ivPlayer=0;ivWno=0;ivSel=null;render(){if(this.use3d)return this.render3d();let J=this.g;this.root.innerHTML=`
      <div class="topbar"><div class="phase-banner">${this.banner}</div>${DQ()}</div>
      <div class="phasebar">${this.phaseStepper()}</div>
      <div class="phase-hint">${this.phaseHint()}</div>
      ${FQ(J,{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe})}
      <div class="panel">${this.panelHTML()}</div>
      <div class="gamelog">${this.log.slice(-4).map((Q)=>`<div>${Q}</div>`).join("")}</div>`,this.wireCells(),this.wirePanel(),EQ(this.root),this.paintOverlays(),this.onChange?.()}mountShell(){this.root.innerHTML=`
      <div class="topbar"><div class="phase-banner"></div>${DQ()}</div>
      <div class="phasebar"></div>
      <div class="phase-hint"></div>
      <div id="board3d" class="board3d-wrap"></div>
      <div class="panel"></div>
      <div class="gamelog"></div>`,this.shell={banner:this.root.querySelector(".phase-banner"),phasebar:this.root.querySelector(".phasebar"),hint:this.root.querySelector(".phase-hint"),panel:this.root.querySelector(".panel"),log:this.root.querySelector(".gamelog")},this.board3d=new PZ(this.root.querySelector("#board3d"),{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe}),this.board3d.onClick((J)=>this.onBoardClick(J)),this.board3d.onHover((J,Q)=>{let $=J?this.g.board.get(TJ(J)):void 0,Z=$!==void 0?this.g.units.get($):void 0;if(!Z||!this.tip){if(this.tip)this.tip.style.display="none";return}this.tip.innerHTML=this.unitTooltip(Z),this.tip.style.display="block",this.tip.style.left=Math.min(Q.clientX+14,window.innerWidth-210)+"px",this.tip.style.top=Q.clientY+14+"px"}),EQ(this.root)}render3d(){if(!this.board3d)this.mountShell();let J=this.shell;J.banner.innerHTML=this.banner,J.phasebar.innerHTML=this.phaseStepper(),J.hint.innerHTML=this.phaseHint(),J.panel.innerHTML=this.panelHTML(),J.log.innerHTML=this.log.slice(-4).map((Q)=>`<div>${Q}</div>`).join(""),this.wirePanel(),this.board3d.update(this.g),this.board3d.setHighlights(this.computeHighlights()),this.onChange?.()}onBoardClick(J){let Q=this.g.board.get(TJ(J));if(this.banner.includes("Intervention"))this.ivCell(J,Q);else this.onCell(J,Q)}computeHighlights(){let J=this.g,Q={};if(this.banner.includes("Clash")&&this.cSel!==null){let $=J.units.get(this.cSel);Q.selected=$.pos;let Z=X7(J,$);Q.move=[...Z.moves.keys()].map((W)=>W.split(",").map(Number)),Q.melee=Z.meleeTargets.map((W)=>J.units.get(W.uid).pos),Q.shoot=Z.shootTargets.map((W)=>J.units.get(W).pos),Q.charge=Z.chargeTargets.map((W)=>J.units.get(W.uid).pos)}if(this.banner.includes("Muster")){let $=this.musterPlayer;Q.stage=[...this.mPlan.recruits.map((K)=>K[1]),...this.mBuild.filter((K)=>K[0]==="field").map((K)=>K[1]),...this.mPlan.repositions.map((K)=>K[1])];let Z=this.mMode,W=[];if(Z.kind==="recruit")for(let K=0;K<8;K++)for(let Y of J.heartlandRows($)){let X=[K,Y];if(!J.occupied(X)&&!this.staged(X))W.push(X)}if(Z.kind==="field")for(let K=0;K<8;K++)for(let Y=0;Y<8;Y++){let X=[K,Y];if(J.territoryOf(X)===$&&!J.fields.has(TJ(X))&&!J.wagon_at.has(TJ(X))&&!this.staged(X))W.push(X)}Q.valid=W}return Q}seatName(J){return this.cfg.mode==="hotseat"?`Player ${J+1} (${u7(this.tribe(J))})`:`You (${u7(this.tribe(J))})`}phaseStepper(){return`<div class="rtrack">${this.roundTrack()}</div><div class="psteps">${this.phaseChips()}</div>`}roundTrack(){let J=this.g.C,Q=this.round,$=J.HARD_STOP_ROUND,Z=[J.CARAVAN_ROUND_1,J.CARAVAN_ROUND_2],W="";for(let X=1;X<=$;X++){let H=Z.includes(X),U=X===J.GOLDEN_GOAL_ROUND,N=X===$,G=X===Q?"cur":X<Q?"past":"future",q=H?"◆":N?"\uD83C\uDFC1":U?"⚡":String(X),F=H?`Round ${X}: Caravan — draft an Artifact (free boost)`:N?`Round ${X}: final round — the leader wins`:U?`Round ${X}+: golden goal — one uncontested push can win outright`:`Round ${X}`;W+=`<span class="rdot ${G}${H?" cara":""}${U?" gold":""}${N?" stop":""}" title="${F}">${q}</span>`}let K=Z.find((X)=>X>=Q),Y=K?K===Q?'<span class="rnote">◆ Caravan now — draft an Artifact!</span>':`<span class="rnote">◆ next Artifact in ${K-Q} round${K-Q>1?"s":""}</span>`:"";return`<span class="rlbl">Round ${Q}/${$}</span>${W}${Y}`}phaseChips(){let J=this.banner,Q=0,$=0;if(J.includes("Muster"))Q=0;else if(J.includes("Clash")||J.includes("Intervention")){Q=2;let W=J.match(/pulse (\d)/);$=W?+W[1]:0}return[{k:"Muster",i:"\uD83C\uDFF0",auto:!1},{k:"Reveal",i:"\uD83D\uDC41",auto:!0},{k:"Clash",i:"⚔",auto:!1},{k:"Frontier",i:"\uD83D\uDEA9",auto:!0},{k:"Tribute",i:"◆",auto:!0}].map((W,K)=>{let Y=K===Q?"active":K<Q?"done":"soon",X=K===2&&$?` <i>${$}/2</i>`:"";return`<span class="pchip ${Y}${W.auto?" auto":""}"><b>${W.i}</b> ${W.k}${X}</span>`}).join('<span class="parr">›</span>')}phaseHint(){if(this.banner.includes("Muster"))return"Spend \uD83D\uDEE1 <b>Supply</b> to recruit units (deploy in your back rows), unlock new types, or build fields & palisades. \uD83C\uDF3E <b>Crop</b> feeds your army each round — keep it above your unit count or they get exhausted and fight worse.";if(this.banner.includes("Clash"))return"Click a unit, then a \uD83D\uDFE2 tile to <b>move</b> or a \uD83D\uDD34 enemy to <b>attack</b>. Get units past the enemy's gold stake line and hold there to push it back next phase. Two pulses per round.";if(this.banner.includes("Intervention"))return"Optional: spend ◆ <b>Tribute</b> on a <b>Surge</b> (move one of <i>your</i> units one tile to an empty square) or <b>Shieldbearer</b> (shield your Hero from a killing blow) — or just Skip.";return""}panelHTML(){if(this.banner.includes("Muster"))return this.musterPanel();if(this.banner.includes("Clash"))return this.clashPanel();if(this.banner.includes("Intervention"))return this.ivPanel();return""}musterPanel(){let J=this.g,Q=J.C,$=this.musterPlayer,Z=this.musterBudget($),W=this.mMode,K=[...J.unlocked[$]],Y=["spear","sword","archer","cav","siege"].filter((F)=>K.includes(F)),X=["archer","cav","siege"].filter((F)=>!K.includes(F)),H={"fld:supply":"Build a Supply field on your land — yields \uD83D\uDEE1 Supply every Muster. Economy for building & recruiting.","fld:crop":"Build a Crop field on your land — yields \uD83C\uDF3E Crop every Muster. Crop feeds your army (1 per unit); under-fed units get exhausted.",pal:"Palisade — a wooden wall on one of your columns. Blocks enemy movement & charges through that column; Siege can smash it. Good for sealing a flank.",rep:"Reposition — move one unit you already have to another tile in your territory before the clash. Rearrange your line; no Supply cost."},U=(F)=>`Recruit a ${aJ[F]} — deploys face-down in your back rows, flips up next Reveal. Costs \uD83D\uDEE1 Supply.`,N=(F)=>`Unlock ${aJ[F]} so you can recruit them now and in future Musters (one-time \uD83D\uDEE1 cost).`,G=(F)=>H[F]||(F.startsWith("rec:")?U(F.slice(4)):F.startsWith("unl:")?N(F.slice(4)):""),q=(F,R,B)=>`<button class="pbtn${F?" on":""}" data-act="${R}" title="${G(R)}">${B}</button>`;return`
      <div class="budget">Budget after harvest — \uD83D\uDEE1 <b>${Z.supply}</b> supply · \uD83C\uDF3E <b>${Z.crop}</b> crop ·
        deploy ${this.mPlan.recruits.length}/${Q.DEPLOY_MAX+J.extra_deploy[$]} · build ${this.mBuild.length}/${Q.BUILD_ACTIONS}</div>
      <div class="prow"><span class="plabel">Recruit:</span>
        ${Y.map((F)=>q(W.kind==="recruit"&&W.arch===F,`rec:${F}`,`${aJ[F]} <i>${J.costs[F]+Q.COPY_SURCHARGE*J.copies[F]}\uD83D\uDEE1</i>`)).join("")}</div>
      ${X.length?`<div class="prow"><span class="plabel">Unlock:</span>
        ${X.map((F)=>q(this.mPlan.unlocks.includes(F),`unl:${F}`,`${aJ[F]} <i>${wZ(J.unlocked[$].size+this.mPlan.unlocks.indexOf(F)+(this.mPlan.unlocks.includes(F)?0:this.mPlan.unlocks.length-this.mPlan.unlocks.indexOf(F)),Q)??wZ(J.unlocked[$].size,Q)}\uD83D\uDEE1</i>`)).join("")}</div>`:""}
      <div class="prow"><span class="plabel">Build:</span>
        ${q(W.kind==="field"&&W.ftype==="supply","fld:supply",`Supply field <i>${Q.FIELD_COST}\uD83D\uDEE1</i>`)}
        ${q(W.kind==="field"&&W.ftype==="crop","fld:crop",`Crop field <i>${Q.FIELD_COST}\uD83D\uDEE1</i>`)}
        ${q(W.kind==="palisade","pal",`Palisade <i>${Q.PALISADE_COST}\uD83D\uDEE1</i>`)}
        ${q(W.kind==="reposition","rep","Reposition")}</div>
      ${J.res[$].tribute>0?`<div class="prow"><span class="plabel">Tribute→Supply:</span>
        <button class="pbtn" data-act="trib-">−</button> <b>${this.mPlan.tribute_spend}</b>/${J.res[$].tribute}
        <button class="pbtn" data-act="trib+">+</button></div>`:""}
      <div class="prow staged">Staged: ${this.stagedSummary()}</div>
      <div class="prow"><button class="pbtn undo" data-act="undo">Undo last</button>
        <button class="pbtn confirm" data-act="muster-done">End Muster ▶</button></div>`}stagedSummary(){let J=[];for(let[Q]of this.mPlan.recruits)J.push(aJ[Q]);for(let Q of this.mPlan.unlocks)J.push(`unlock ${aJ[Q]}`);for(let Q of this.mBuild)J.push(Q[0]==="field"?`${Q[2]} field`:"palisade");for(let Q of this.mPlan.repositions)J.push("reposition");if(this.mPlan.tribute_spend)J.push(`+${this.mPlan.tribute_spend} supply`);return J.length?J.join(", "):"<i>nothing yet — pick an action, then click the board</i>"}clashPanel(){let J=this.g,Q=this.clashPlayer,$=J.onBoard(Q),Z=[...this.cOrders.keys()],W="<i>Click one of your units to give it an order.</i>";if(this.cSel!==null){let K=J.units.get(this.cSel),Y=X7(J,K),X=[];if(Y.moves.size)X.push("\uD83D\uDFE2 move (green)");if(Y.meleeTargets.length)X.push("\uD83D\uDD34 attack (red)");if(Y.shootTargets.length)X.push("\uD83D\uDFE0 shoot (orange)");if(Y.chargeTargets.length)X.push("\uD83D\uDFE3 charge (purple)");W=`<b>${aJ[K.arch]}</b> selected — ${X.join(" · ")||"no targets in range"} ·
        ${Y.canBrace?'<button class="pbtn" data-act="brace">⛨ Brace</button>':""}
        <button class="pbtn" data-act="hold">Hold</button>`}return`<div class="prow">${W}</div>
      <div class="prow staged">Orders: <b>${Z.length}/${$.length}</b> units ·
        ${Z.map((K)=>`${aJ[J.units.get(K).arch]}:${this.cOrders.get(K)[0]}`).join(", ")||"<i>none</i>"}</div>
      <div class="prow"><button class="pbtn undo" data-act="clash-clear">Clear</button>
        <button class="pbtn confirm" data-act="clash-done">Resolve pulse ▶</button></div>`}ivPanel(){let J=this.g,Q=this.ivPlayer,$=this.ivWno,Z=[];if($===3&&J.res[Q].tribute>=J.C.SURGE_COST)Z.push(`<button class="pbtn" data-act="iv:surge">⚡ Surge <i>${J.C.SURGE_COST}◆</i></button>`);if($<=2&&J.res[Q].tribute>=J.C.SHIELDBEARER_COST)Z.push(`<button class="pbtn" data-act="iv:shield">⛨ Shieldbearer <i>${J.C.SHIELDBEARER_COST}◆</i></button>`);let W=this.ivSel?`<div class="prow staged">${this.ivSel.kind==="surge"?"Surge: click your unit, then an adjacent empty tile.":"Shieldbearer: click the unit to ward."}</div>`:"";return`<div class="prow">Tribute ◆${J.res[Q].tribute}. Optional intervention:</div>
      <div class="prow">${Z.join(" ")} <button class="pbtn confirm" data-act="iv-skip">Skip ▶</button></div>${W}`}wireCells(){this.root.querySelectorAll(".cell").forEach((J)=>{J.addEventListener("click",()=>{let Q=J.dataset.pos.split(",").map(Number),$=J.dataset.uid!==void 0?Number(J.dataset.uid):void 0;if(this.banner.includes("Intervention"))this.ivCell(Q,$);else this.onCell(Q,$)})})}wirePanel(){this.root.querySelectorAll(".pbtn").forEach((J)=>{J.addEventListener("click",()=>this.onAct(J.dataset.act))})}onAct(J){let Q=this.g,$=Q.C;if(J==="muster-done"){this.mMode={kind:null},this.musterDone?.();return}if(J==="clash-done"){this.clashDone?.();return}if(J==="clash-clear"){this.cOrders.clear(),this.cSel=null,this.render();return}if(J==="iv-skip"){this.ivResolve?.();return}if(J==="undo"){if(this.mPlan.repositions.length)this.mPlan.repositions.pop();else if(this.mPlan.recruits.length)this.mPlan.recruits.pop();else if(this.mBuild.length)this.mBuild.pop();else if(this.mPlan.unlocks.length)this.mPlan.unlocks.pop();this.render();return}if(J==="brace"&&this.cSel!==null){this.cOrders.set(this.cSel,["BRACE"]),this.cSel=null,this.render();return}if(J==="hold"&&this.cSel!==null){this.cOrders.delete(this.cSel),this.cSel=null,this.render();return}if(J.startsWith("rec:")){this.mMode={kind:"recruit",arch:J.slice(4)},this.render();return}if(J.startsWith("fld:")){this.mMode={kind:"field",ftype:J.slice(4)},this.render();return}if(J==="pal"){this.mMode={kind:"palisade"},this.render();return}if(J==="rep"){this.mMode={kind:"reposition"},this.render();return}if(J.startsWith("unl:")){let Z=J.slice(4);if(!this.mPlan.unlocks.includes(Z))this.mPlan.unlocks.push(Z);this.render();return}if(J==="trib+"){this.mPlan.tribute_spend=Math.min(this.mPlan.tribute_spend+1,Q.res[this.musterPlayer].tribute),this.render();return}if(J==="trib-"){this.mPlan.tribute_spend=Math.max(0,this.mPlan.tribute_spend-1),this.render();return}if(J==="iv:surge"){this.ivSel={kind:"surge"},this.render();return}if(J==="iv:shield"){this.ivSel={kind:"shield"},this.render();return}}musterPalisade(J){let Q=this.g.C;if(!this.g.palisades.has(J)&&!this.mBuild.some(($)=>$[0]==="palisade"&&$[1]===J)&&this.mBuild.length<Q.BUILD_ACTIONS)this.mBuild.push(["palisade",J]);this.render()}ivCell(J,Q){let $=this.g,Z=this.ivPlayer,W=this.human(Z);if(!this.ivSel)return;if(this.ivSel.kind==="shield"){if(Q!==void 0&&$.units.get(Q).owner===Z)W.pendingIntervention[this.ivWno]=["SHIELDBEARER",Q],this.ivResolve?.()}else if(this.ivSel.uid===void 0){if(Q!==void 0&&$.units.get(Q).owner===Z)this.ivSel.uid=Q,this.render()}else{let K=$.units.get(this.ivSel.uid);if(Math.abs(K.pos[0]-J[0])+Math.abs(K.pos[1]-J[1])===1&&!$.occupied(J))W.pendingIntervention[this.ivWno]=["SURGE",this.ivSel.uid,J],this.ivResolve?.()}}paintOverlays(){let J=(Q,$)=>{let Z=this.root.querySelector(`.cell[data-pos="${TJ(Q)}"]`);if(Z)Z.classList.add($)};if(this.banner.includes("Clash")&&this.cSel!==null){let Q=this.g.units.get(this.cSel);this.root.querySelector(`.cell[data-pos="${TJ(Q.pos)}"]`)?.classList.add("sel");let Z=X7(this.g,Q);for(let W of Z.moves.keys())J(W.split(",").map(Number),"hl-move");for(let W of Z.meleeTargets)J(this.g.units.get(W.uid).pos,"hl-melee");for(let W of Z.shootTargets)J(this.g.units.get(W).pos,"hl-shoot");for(let W of Z.chargeTargets)J(this.g.units.get(W.uid).pos,"hl-charge")}if(this.banner.includes("Clash"))for(let[Q,$]of this.cOrders){let Z=this.root.querySelector(`.cell[data-uid="${Q}"] .unit`);if(Z)Z.insertAdjacentHTML("beforeend",`<span class="orderbadge">${$[0][0]}</span>`)}if(this.banner.includes("Muster")){for(let W of this.mPlan.recruits)J(W[1],"hl-stage");for(let W of this.mBuild)if(W[0]==="field")J(W[1],"hl-stage");for(let W of this.mPlan.repositions)J(W[1],"hl-stage");let Q=this.mMode,$=this.musterPlayer,Z=this.g;if(Q.kind==="recruit")for(let W=0;W<8;W++)for(let K of Z.heartlandRows($)){let Y=[W,K];if(!Z.occupied(Y)&&!this.staged(Y))J(Y,"hl-valid")}if(Q.kind==="field")for(let W=0;W<8;W++)for(let K=0;K<8;K++){let Y=[W,K];if(Z.territoryOf(Y)===$&&!Z.fields.has(TJ(Y))&&!Z.wagon_at.has(TJ(Y))&&!this.staged(Y))J(Y,"hl-valid")}}}winScreen(J,Q){let $=this.cfg.mode==="bot"?this.cfg.humanSeat:null,W=`<div class="winscreen">
        <h2>${$===null?`Player ${J+1} wins`:J===$?"Victory":"Defeat"}</h2>
        <p>${u7(this.tribe(J))} (P${J+1}) — <b>${Q}</b> after ${this.g.round} rounds.</p>
        <button class="pbtn confirm" onclick="location.reload()">New game</button>
      </div>`;if(this.use3d&&this.board3d){this.board3d.update(this.g),this.board3d.setHighlights({});let K=document.createElement("div");K.className="overlay",K.innerHTML=`<div class="modal">${W}</div>`,document.body.appendChild(K)}else this.root.innerHTML=FQ(this.g,{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe})+W}}function jN(J){let Q=($,Z,W)=>{let K=J.newUnit($,Z);J.place(K,W)};J.unlocked[0].add("archer"),J.unlocked[0].add("cav"),Q(0,"sword",[1,3]),Q(1,"archer",[1,4]),Q(0,"cav",[3,2]),Q(1,"archer",[3,5]),Q(0,"archer",[5,3]),Q(1,"spear",[5,5])}var z8=[{text:"<b>Welcome, commander.</b> I'll teach you everything — assume you know nothing. LIMES is a <b>dice-free</b> wargame: no luck, every result follows from the rules. Click <b>Next ▶</b>.",manual:!0},{text:'<b>The board is 8×8.</b> You command the <b>bottom</b> half; the enemy holds the top. The <span class="g-c g-move">gold line</span> across each column is the <b>frontier (stake line)</b> — below it is your land, above it theirs.',board:!0,manual:!0},{text:"On each back row sit <b>Supply Wagons</b> (▣) — 3 per side. <b>Win</b> by destroying all 3 enemy wagons (top). If nobody does, the leader at the round-18 limit wins. So: <b>attack their wagons, defend yours.</b>",board:!0,manual:!0},{text:"I've set up a <b>practice skirmish</b> — your troops are already near the enemy so you can try every action. <b>Tip: hover any unit</b> to see its stats.",board:!0,manual:!0},{text:"<b>Every round runs 5 phases:</b> ① <b>Muster</b> — spend resources & recruit · ② <b>Reveal</b> — new recruits flip face-up · ③ <b>Clash</b> — combat over 2 pulses · ④ <b>Frontier</b> — the stake lines step and wagons get breached · ⑤ <b>Tribute</b> — you're paid for ground you lost. You make decisions in <b>Muster</b> and <b>Clash</b>; the rest is automatic.",manual:!0},{text:"Two resources run your war: \uD83D\uDEE1 <b>Supply</b> (builds things) and \uD83C\uDF3E <b>Crop</b> (feeds your army — <b>1 per unit each round</b>, <b>2</b> for a unit past your line; unfed units get <b>exhausted</b> ∅ and fight worse). Every round starts with <b>Muster</b>, where you spend them.",manual:!0},{text:"<b>Your roster — 6 unit types.</b> <b>Spearman</b>: cheap wall, can <b>Brace</b> ⛨ to stop a charge · <b>Swordsman</b>: sturdy frontline · <b>Cavalry</b>: fast (moves 3), <b>Charges</b> for bonus damage · <b>Archer</b>: shoots at range 2 · <b>Siege</b>: hits Wagons & Palisades from afar · <b>Hero</b>: your standard — if it's ever surrounded you <b>rout</b>.",manual:!0},{text:`<b>The golden rule — the triangle:</b> <span class="g-c g-melee">Spear</span> ▸ beats ▸ <span class="g-c g-charge">Cavalry</span> ▸ beats ▸ <span class="g-c g-shoot">Archer</span> ▸ beats ▸ <span class="g-c g-melee">Spear</span>. Attacking the type you beat gives <b>+1 damage</b>. Lead with the unit that counters what's in front of you — match-ups matter more than raw stats.`,manual:!0},{text:"Let's recruit. Click the <b>Spearman</b> button below.",hi:'[data-act="rec:spear"]',done:(J)=>J.musterModeKind==="recruit"},{text:"The glowing tiles are your back rows. <b>Click a glowing tile</b> to deploy your Spearman there.",board:!0,done:(J)=>J.stagedRecruitCount>=1},{text:"Good. Now economy: more Crop = a bigger army you can feed. Click <b>Crop field</b>.",hi:'[data-act="fld:crop"]',done:(J)=>J.musterModeKind==="field"},{text:"<b>Click a glowing tile in your territory</b> to build the field (it yields Crop every Muster).",board:!0,done:(J)=>J.stagedFieldCount>=1},{text:"You can also <b>Unlock</b> new unit types (Cavalry, Archers, Siege), build <b>Palisades</b> (block a column), or convert <b>Tribute → Supply</b>. The key rule of who-beats-who: <b>Spear ▸ Cavalry ▸ Archer ▸ Spear</b>. Now click <b>End Muster ▶</b>.",hi:'[data-act="muster-done"]',done:(J)=>J.phaseKind==="clash"},{text:"<b>Clash</b> — combat, fought over <b>two pulses</b>. Both sides' orders resolve <b>at the same time</b> (no first-mover advantage). <b>Click one of your units</b> to select it.",board:!0,done:(J)=>J.selectedUid!==null},{text:'Highlights show what it can do: <span class="g-c g-move">green</span> move · <span class="g-c g-melee">red</span> melee · <span class="g-c g-shoot">orange</span> shoot · <span class="g-c g-charge">purple</span> charge. Your forward units have enemies in range! <b>Select a unit with a coloured enemy and click that enemy to attack.</b>',board:!0,done:(J)=>J.hasAttackOrder},{text:"Attack queued. <b>Damage = your Atk − their Guard.</b> Edges: <b>+1</b> if you counter their type, <b>+1</b> when flanking (2+ attackers), Cavalry <b>Charge</b> adds punch and shoves — but a <b>Braced Spearman</b> stops a charge cold and wrecks the rider. <b>Archers/Siege shoot</b> from range without retaliation.",manual:!0},{text:"<b>Reading a unit at a glance:</b> the <b>green bar</b> is HP (label shows e.g. <i>SWORDSMAN 4/6</i>). Badges — <b>★/★★</b> promoted (earned by wounding foes; tougher, then upgraded) · <b>⛨</b> braced · <b>∅</b> exhausted · <b>?</b> face-down recruit. Top bar per side: \uD83D\uDEE1 Supply · \uD83C\uDF3E Crop · ◆ Tribute · ▦ rows of land · ▣ wagons left. The <b>⚖</b> marks who acts first and wins exact ties.",manual:!0},{text:'You can also just <b>advance</b>: select a unit and click a <span class="g-c g-move">green</span> tile to move toward the enemy line. Order as many units as you like, then click <b>Resolve pulse ▶</b>.',hi:'[data-act="clash-done"]',done:(J)=>J.bannerText.includes("pulse 2")||J.phaseKind!=="clash"},{text:"<b>Pulse 1 resolved!</b> Check the units — HP bars dropped, maybe one fell. Wounding enemies earns <b>XP</b> → <b>promotions</b> (★ tougher, ★★ upgraded). Now <b>pulse 2</b>: same again, then <b>Resolve pulse ▶</b> to end the round.",hi:'[data-act="clash-done"]',done:(J)=>J.round>=2},{text:"<b>Round over.</b> The <b>Frontier</b> just resolved automatically: in any column where one side has a unit past the line with a friend nearby (a <b>carry</b>) and the enemy doesn't contest it, the <b>stake steps</b> — you take a row. Units in the enemy's back rows <b>breach</b> a wagon. See the <b>log line</b> under the board.",manual:!0},{text:"When you <b>lose</b> a row you gain ◆ <b>Tribute</b> — spend it during Clash on a <b>Surge</b> (slip one of your own units one tile to an empty square) or <b>Shieldbearer</b> (save your Hero from a death blow), or bank it and convert to Supply. Losing ground isn't all bad.",manual:!0},{text:"Two more things: your <b>Hero</b> is your standard — if it's ever fully surrounded by enemies you <b>rout</b> (your wagons take damage), so keep a friend beside it. And on <b>rounds 4 & 8</b> a <b>Caravan</b> lets both sides draft one-time <b>Artifacts</b> (the trailing side picks first).",manual:!0},{text:"<b>The clock:</b> from round 14 a single uncontested push can end it (golden goal); at round 18 the leader wins outright — so don't stall if you're behind. That's the <b>whole game</b>!",manual:!0},{text:"You know LIMES now: <b>feed your army, win the match-ups, push toward their wagons.</b> Keep playing this skirmish, and open <b>❓ Guide</b> anytime for stats & tips. Good luck, commander. ⚔",manual:!0}];class CZ{c;i=0;box;constructor(J){this.c=J}start(J){this.box=document.createElement("div"),this.box.id="coach",document.body.appendChild(this.box),this.c.onChange=()=>this.refresh(),this.c.startScenario(J,jN),this.render()}refresh(){let J=z8[this.i];if(!J)return;if(!J.manual&&J.done&&J.done(this.c)){this.advance();return}this.spotlight()}advance(){if(this.i++,this.i>=z8.length)return this.finish();this.render()}back(){if(this.i>0)this.i--,this.render()}boardEl(){return document.querySelector("#board3d")||document.querySelector(".board-grid")}clearSpot(){document.querySelectorAll(".coachmark").forEach((J)=>J.classList.remove("coachmark")),this.boardEl()?.classList.remove("coach-board")}spotlight(){this.clearSpot();let J=z8[this.i];if(J.hi)document.querySelector(J.hi)?.classList.add("coachmark");if(J.board)this.boardEl()?.classList.add("coach-board")}render(){let J=z8[this.i];this.box.innerHTML=`
      <div class="coach-inner">
        <div class="coach-step">Tutorial · ${this.i+1}/${z8.length}</div>
        <div class="coach-text">${J.text}</div>
        <div class="coach-btns">
          ${this.i>0?'<button class="pbtn" id="coach-back">◀ Back</button>':""}
          ${J.manual?`<button class="pbtn confirm" id="coach-next">${this.i===z8.length-1?"Finish ✓":"Next ▶"}</button>`:'<span class="coach-hint">↳ do the highlighted action to continue</span>'}
          <button class="pbtn" id="coach-guide">❓ Guide</button>
          <button class="pbtn coach-skip" id="coach-skip">Skip</button>
        </div>
      </div>`,this.box.querySelector("#coach-back")?.addEventListener("click",()=>this.back()),this.box.querySelector("#coach-next")?.addEventListener("click",()=>this.i===z8.length-1?this.finish():this.advance()),this.box.querySelector("#coach-guide")?.addEventListener("click",H7),this.box.querySelector("#coach-skip")?.addEventListener("click",()=>this.finish()),this.spotlight()}finish(){this.c.onChange=null,this.clearSpot(),this.box.remove()}}var yN=["HONEST","AGGRO","TURTLE","PROBER","SANDBAGGER","RUNNER"],fN={HONEST:"Balanced value play",AGGRO:"Relentless stake-pusher",TURTLE:"Economy & walls",PROBER:"Punishes overextension",SANDBAGGER:"Banks tribute, then strikes",RUNNER:"Cavalry cheese"},$9=document.getElementById("app"),UJ={mode:"bot",humanSeat:0,botName:"HONEST",p0tribe:"roman",p1tribe:"viking",seed:12345};function qY(J){return a7.map((Q)=>`<option value="${Q}"${Q===J?" selected":""}>${nZ(Q)}</option>`).join("")}function XQ(){$9.innerHTML=`
    <div class="setup">
      <h1>LIMES</h1>
      <p class="sub">A deterministic, dice-free frontier wargame. Hold the line; carry the stakes.</p>

      <div class="srow"><span class="slabel">Opponent</span>
        <div class="seg">
          <button class="segbtn${UJ.mode==="bot"?" on":""}" data-mode="bot">vs Bot</button>
          <button class="segbtn${UJ.mode==="hotseat"?" on":""}" data-mode="hotseat">Hotseat (2P)</button>
        </div></div>

      <div id="botrow" class="srow"${UJ.mode==="bot"?"":" hidden"}>
        <span class="slabel">Bot</span>
        <select id="bot">${yN.map((J)=>`<option value="${J}"${J===UJ.botName?" selected":""}>${J} — ${fN[J]}</option>`).join("")}</select>
      </div>

      <div id="seatrow" class="srow"${UJ.mode==="bot"?"":" hidden"}>
        <span class="slabel">Your seat</span>
        <div class="seg">
          <button class="segbtn${UJ.humanSeat===0?" on":""}" data-seat="0">P1 · bottom</button>
          <button class="segbtn${UJ.humanSeat===1?" on":""}" data-seat="1">P2 · top</button>
        </div></div>

      <div class="srow"><span class="slabel">P1 tribe</span>
        <select id="p0t">${qY(UJ.p0tribe)}</select></div>
      <div class="srow"><span class="slabel">P2 tribe</span>
        <select id="p1t">${qY(UJ.p1tribe)}</select></div>

      <div class="srow"><span class="slabel">Seed</span>
        <input id="seed" type="number" value="${UJ.seed}">
        <button class="pbtn" id="rnd">⟳</button></div>

      <button class="pbtn confirm big" id="start">Begin campaign ▶</button>
      <div class="setup-links">
        <button class="pbtn" id="tut">\uD83C\uDF93 Tutorial — learn by playing</button>
        <button class="pbtn" id="guide">\uD83D\uDCD6 Read the rules</button>
      </div>
      <p class="hint">New here? Start with the <b>Tutorial</b>. Pick an action, then click the board.
        Two pulses of Clash per round; first to wipe the enemy Supply Wagons — or lead at the time limit — wins.</p>
    </div>`,$9.querySelectorAll("[data-mode]").forEach((J)=>J.onclick=()=>{UJ.mode=J.dataset.mode,XQ()}),$9.querySelectorAll("[data-seat]").forEach((J)=>J.onclick=()=>{UJ.humanSeat=Number(J.dataset.seat),XQ()}),$9.querySelector("#bot").onchange=(J)=>UJ.botName=J.target.value,$9.querySelector("#p0t").onchange=(J)=>UJ.p0tribe=J.target.value,$9.querySelector("#p1t").onchange=(J)=>UJ.p1tribe=J.target.value,$9.querySelector("#seed").onchange=(J)=>UJ.seed=Number(J.target.value)|0,$9.querySelector("#rnd").onclick=()=>{UJ.seed=Math.floor(Math.random()*1e6),XQ()},$9.querySelector("#start").onclick=()=>{if(UJ.p0tribe===UJ.p1tribe)UJ.p1tribe=a7.find((J)=>J!==UJ.p0tribe);new YQ($9).start({...UJ})},$9.querySelector("#guide").onclick=H7,$9.querySelector("#tut").onclick=()=>{new CZ(new YQ($9)).start({mode:"bot",humanSeat:0,botName:"TURTLE",p0tribe:UJ.p0tribe,p1tribe:UJ.p1tribe===UJ.p0tribe?a7.find((J)=>J!==UJ.p0tribe):UJ.p1tribe,seed:4242})}}XQ();})();
