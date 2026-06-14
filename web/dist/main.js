(()=>{function vZ(J){let Q=new TextEncoder().encode(J),$=Q.length*8,Z=Q.length+1,W=Z+(56-Z%64+64)%64+8,K=new Uint8Array(W);K.set(Q),K[Q.length]=128;let Y=new DataView(K.buffer);Y.setUint32(W-4,$>>>0,!1),Y.setUint32(W-8,Math.floor($/4294967296)>>>0,!1);let X=1732584193,H=4023233417,U=2562383102,q=271733878,G=3285377520,N=new Uint32Array(80),F=(B,D)=>B<<D|B>>>32-D;for(let B=0;B<W;B+=64){for(let w=0;w<16;w++)N[w]=Y.getUint32(B+w*4,!1);for(let w=16;w<80;w++)N[w]=F(N[w-3]^N[w-8]^N[w-14]^N[w-16],1);let D=X,E=H,M=U,L=q,z=G;for(let w=0;w<80;w++){let P,C;if(w<20)P=E&M|~E&L,C=1518500249;else if(w<40)P=E^M^L,C=1859775393;else if(w<60)P=E&M|E&L|M&L,C=2400959708;else P=E^M^L,C=3395469782;let V=F(D,5)+P+z+C+N[w]|0;z=L,L=M,M=F(E,30),E=D,D=V}X=X+D|0,H=H+E|0,U=U+M|0,q=q+L|0,G=G+z|0}let R=(B)=>(B>>>0).toString(16).padStart(8,"0");return R(X)+R(H)+R(U)+R(q)+R(G)}class KQ{mt=new Uint32Array(624);mti=625;constructor(J){let Q=[],$=J>>>0,Z=Math.floor(J/4294967296);Q.push($);while(Z>0)Q.push(Z>>>0),Z=Math.floor(Z/4294967296);this.initByArray(Q.length?Q:[0])}initGenrand(J){this.mt[0]=J>>>0;for(let Q=1;Q<624;Q++){let $=this.mt[Q-1]^this.mt[Q-1]>>>30;this.mt[Q]=Math.imul(1812433253,$)+Q>>>0}this.mti=624}initByArray(J){this.initGenrand(19650218);let Q=1,$=0,Z=Math.max(624,J.length);for(;Z;Z--){let W=this.mt[Q-1]^this.mt[Q-1]>>>30;if(this.mt[Q]=(this.mt[Q]^Math.imul(W,1664525))+J[$]+$>>>0,Q++,$++,Q>=624)this.mt[0]=this.mt[623],Q=1;if($>=J.length)$=0}for(Z=623;Z;Z--){let W=this.mt[Q-1]^this.mt[Q-1]>>>30;if(this.mt[Q]=(this.mt[Q]^Math.imul(W,1566083941))-Q>>>0,Q++,Q>=624)this.mt[0]=this.mt[623],Q=1}this.mt[0]=2147483648}genrandUint32(){let J;if(this.mti>=624){let Q=0;for(;Q<227;Q++)J=this.mt[Q]&2147483648|this.mt[Q+1]&2147483647,this.mt[Q]=this.mt[Q+397]^J>>>1^(J&1?2567483615:0);for(;Q<623;Q++)J=this.mt[Q]&2147483648|this.mt[Q+1]&2147483647,this.mt[Q]=this.mt[Q+-227]^J>>>1^(J&1?2567483615:0);J=this.mt[623]&2147483648|this.mt[0]&2147483647,this.mt[623]=this.mt[396]^J>>>1^(J&1?2567483615:0),this.mti=0}return J=this.mt[this.mti++],J^=J>>>11,J^=J<<7&2636928640,J^=J<<15&4022730752,J^=J>>>18,J>>>0}getrandbits(J){return this.genrandUint32()>>>32-J}randbelow(J){if(!J)return 0;let Q=32-Math.clz32(J),$=this.getrandbits(Q);while($>=J)$=this.getrandbits(Q);return $}shuffle(J){for(let Q=J.length-1;Q>=1;Q--){let $=this.randbelow(Q+1),Z=J[Q];J[Q]=J[$],J[$]=Z}}}var OY={BOARD_COLS:8,BOARD_ROWS:8,HEARTLAND_ROWS:2,STAKE_START:4,STAKE_MIN:2,STAKE_MAX:6,STAKE_STEP_MAX:1,LONE_RUNNER_RADIUS:2,WAGON_COUNT:3,WAGON_HP:3,WAGON_BOUNTY:3,BREACH_DMG:1,BREACH_CAP:2,BREACH_CAP_LATE:3,BREACH_CAP_RISE_ROUND:13,ROUT_WAGON_DMG:2,START_SUPPLY:8,START_CROP:6,FIELD_COST:2,FIELD_YIELD:2,FARMSTEAD_SIZE:3,FARMSTEAD_BONUS:2,ANNEX_YIELD:1,RAID_GAIN:3,PALISADE_COST:3,BUILD_ACTIONS:2,UPKEEP_CROP:1,SUPPLY_STRAIN_CROP:1,EXHAUSTION_START_ROUND:12,EXHAUSTION_INITIAL:1,EXHAUSTION_ACCEL_ROUND:13,EXHAUSTION_ACCEL:2,MUSTER_COPIES:6,COPY_SURCHARGE:1,UNLOCK_3RD:6,UNLOCK_4TH:10,UNLOCK_5TH:15,COST_SPEARMAN:2,COST_SWORDSMAN:3,COST_ARCHER:3,COST_CAVALRY:4,COST_SIEGE:5,DEPLOY_MAX:2,REPOSITION_MAX:2,RUSH_RETURN_COST:1,WOUND_RETURN_DELAY:2,TRIBUTE_PER_ROW:1,TRIBUTE_SUPPLY_VALUE:1,SURGE_COST:1,SHIELDBEARER_COST:2,INTERVENTIONS_PER_WINDOW:1,PULSES_PER_CLASH:2,ATK_BONUS_CAP:2,GUARD_CAP:2,MOD_FLANK:1,MOD_SUPPORT:1,MOD_BRACE_GUARD:1,MOD_CHARGE:1,MOD_COUNTER:1,MOD_HILL:1,MOD_RIVER:1,MOD_ROAD:1,FLANK_THRESHOLD:2,FLANK_MIN_DMG:1,EXHAUST_ATK_PENALTY:1,EXHAUST_GUARD_PENALTY:1,DISPLACE_DMG:1,RIVER_PUSH_DMG:2,TRAP_PUSH_DMG:2,CHARGE_MOVE_MIN:2,PUSH_BACK:1,RANGED_RETALIATION:1,SPEAR_ATK:1,SPEAR_HP:4,SPEAR_MV:1,SPEAR_RNG:1,SWORD_ATK:2,SWORD_HP:5,SWORD_MV:1,SWORD_RNG:1,CAV_ATK:2,CAV_HP:4,CAV_MV:3,CAV_RNG:1,ARCHER_ATK:2,ARCHER_HP:3,ARCHER_MV:1,ARCHER_RNG_MAX:2,SIEGE_ATK:3,SIEGE_HP:3,SIEGE_MV:1,SIEGE_RNG_MIN:2,SIEGE_RNG_MAX:3,HERO_ATK:3,HERO_HP:7,HERO_MV:2,HERO_RNG:1,XP_PER_WOUND:1,XP_TIER1:2,XP_TIER2:4,PROMO_T1_HP:1,PROMO_T2_STAT:1,CARAVAN_ROUND_1:4,CARAVAN_ROUND_2:8,CARAVAN_ARTIFACTS:4,CARAVAN_DISCARD:1,ARTIFACT_POOL:8,ARTIFACT_SUPPLY:4,ARTIFACT_CROP:4,ARTIFACT_XP:2,ARTIFACT_TRIBUTE:2,ARTIFACT_DISCOUNT:2,GOLDEN_GOAL_ROUND:16,HARD_STOP_ROUND:20,LASTSTAND_BOONS:3,ENTRENCH_PALISADES:2,ENTRENCH_HOLD:0,FIRST_BLOOD_SUPPLY:0,TIMER_MUSTER:60,TIMER_COMMIT:15,TIMER_MUSTER_CASUAL:90,TIMER_COMMIT_CASUAL:30,TACTICA_POOL:9,TACTICA_RACK:5,TACTICA_HELD:2,TACTICA_HELD_CONTINGENCY:3,DOCTRINE_DISPLAY:8,DOCTRINE_BASE_PRICE:4,DOCTRINE_AGING:1,DOCTRINE_MIN_PRICE:1,T2_POOL:5,T2_UNLOCKABLE:3,GAUL_TRAPS:2,HUN_REPOSITIONS:2,ZOC_ENABLED:1,SIEGE_PUSH_UNITS:1,CHARGE_ADJ_OK:1,EXHAUSTED_CARRY:0,R1_REQUIRE_ENGAGE:0};function MY(J){return{...OY,...J??{}}}var xZ=["spear","sword","cav","archer","siege"],YQ={spear:"cav",cav:"archer",archer:"spear"};function _Y(J){return{spear:J.COST_SPEARMAN,sword:J.COST_SWORDSMAN,archer:J.COST_ARCHER,cav:J.COST_CAVALRY,siege:J.COST_SIEGE,hero:9}}function VY(J){return{spear:[J.SPEAR_ATK,J.SPEAR_HP,J.SPEAR_MV,1,1],sword:[J.SWORD_ATK,J.SWORD_HP,J.SWORD_MV,1,1],cav:[J.CAV_ATK,J.CAV_HP,J.CAV_MV,1,1],archer:[J.ARCHER_ATK,J.ARCHER_HP,J.ARCHER_MV,2,J.ARCHER_RNG_MAX],siege:[J.SIEGE_ATK,J.SIEGE_HP,J.SIEGE_MV,J.SIEGE_RNG_MIN,J.SIEGE_RNG_MAX],hero:[J.HERO_ATK,J.HERO_HP,J.HERO_MV,1,1]}}var T0=(J)=>`${J[0]},${J[1]}`,hZ=(J,Q)=>T0(J)<=T0(Q)?`${T0(J)}|${T0(Q)}`:`${T0(Q)}|${T0(J)}`;function A9(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++){let Z=J[$],W=Q[$];if(Array.isArray(Z)&&Array.isArray(W)){let K=A9(Z,W);if(K)return K}else if(Z!==W)return Z<W?-1:1}return 0}class gJ extends Error{winner;wtype;constructor(J,Q){super("GameOver");this.winner=J;this.wtype=Q}}class $7 extends Error{constructor(){super("ClashEnd")}}class gZ{uid;owner;arch;base_atk;base_guard=0;hp;max_hp;mv;rmin;rmax;pos=null;exhausted=!1;braced=!1;xp=0;tier1=!1;tier2=!1;wounded_round=null;face_down=!1;constructor(J,Q,$,Z){this.uid=J,this.owner=Q,this.arch=$,this.base_atk=Z[0],this.hp=Z[1],this.max_hp=Z[1],this.mv=Z[2],this.rmin=Z[3],this.rmax=Z[4]}}class M9{C;seed;bots;stats;costs;units=new Map;next_uid=0;board=new Map;stakes;fields=new Map;palisades=new Map;entrench=new Map;res;wagons=[[],[]];wagon_at=new Map;komi=1;round=1;copies={spear:0,sword:0,cav:0,archer:0,siege:0};unlocked=[new Set(["sword","spear"]),new Set(["sword","spear"])];extra_deploy=[0,0];recruit_discount=[0,0];standard_bearer=[null,null];wards=[];last_stand_used=[!1,!1];last_wagon_kill_src=null;cap_dmg=[0,0];wagon_dmg_round=[0,0];rows_lost_round=[0,0];rows_taken_round=[0,0];unit_dmg_round=[0,0];terrain_on=!1;ttype=new Map;rivers=new Set;artifact_order=[];lead_trace=[];r1_winner=null;r1_rows_winner=null;constructor(J,Q,$){this.C=MY($),this.seed=Q,this.bots=J,this.stats=VY(this.C),this.costs=_Y(this.C),this.stakes=Array(8).fill(this.C.STAKE_START),this.res=[{supply:this.C.START_SUPPLY,crop:this.C.START_CROP,tribute:0},{supply:this.C.START_SUPPLY,crop:this.C.START_CROP,tribute:0}],this.artifact_order=[...Array(this.C.ARTIFACT_POOL).keys()].map((Z)=>Z+1),new KQ(Q).shuffle(this.artifact_order)}heartlandRows(J){return J===0?[0,1]:[6,7]}backRow(J){return J===0?0:7}occupied(J){return this.board.has(T0(J))||this.wagon_at.has(T0(J))}inBounds(J){return J[0]>=0&&J[0]<8&&J[1]>=0&&J[1]<8}newUnit(J,Q){let $=new gZ(this.next_uid,J,Q,this.stats[Q]);return this.next_uid++,this.units.set($.uid,$),$}place(J,Q){this.board.set(T0(Q),J.uid),J.pos=Q}freeHeartlandTile(J){for(let Q=0;Q<8;Q++)for(let $ of this.heartlandRows(J))if(!this.occupied([Q,$]))return[Q,$];return null}setup(){let J=this.C;for(let Q=0;Q<2;Q++){let $=this.bots[Q].setup(this,Q),Z=this.heartlandRows(Q),W=this.backRow(Q),K=[];for(let H of $.wagons)if(H>=0&&H<8&&!K.includes(H))K.push(H);for(let H=0;H<8&&K.length<J.WAGON_COUNT;H++)if(!K.includes(H))K.push(H);K.length=Math.min(K.length,J.WAGON_COUNT),K.forEach((H,U)=>{this.wagons[Q].push({col:H,row:W,hp:J.WAGON_HP}),this.wagon_at.set(T0([H,W]),[Q,U])});let Y=["hero","spear","sword","sword"],X=$.units.slice();for(let H of Y){let U=null;for(let q=0;q<X.length;q++){let G=X[q];if(G.arch===H&&Z.includes(G.pos[1])&&this.inBounds(G.pos)&&!this.occupied(G.pos)){U=G.pos,X.splice(q,1);break}}if(U===null)U=this.freeHeartlandTile(Q);this.place(this.newUnit(Q,H),U)}}}moveUnit(J,Q){this.board.delete(T0(J.pos)),this.board.set(T0(Q),J.uid),J.pos=Q}unbroken(J){return J.pos!==null&&!J.exhausted}loneRunner(J){let Q=this.C.LONE_RUNNER_RADIUS;for(let $ of this.units.values())if($.uid!==J.uid&&$.owner===J.owner&&$.pos!==null&&s0($.pos,J.pos)<=Q)return!1;return!0}carryEligible(J){if(J.pos===null||this.loneRunner(J))return!1;return!J.exhausted||!!this.C.EXHAUSTED_CARRY}exhaustionPenalty(J){let Q=this.C,$=J??this.round;if($<Q.EXHAUSTION_START_ROUND)return 0;let Z=Q.EXHAUSTION_INITIAL;if($>=Q.EXHAUSTION_ACCEL_ROUND)Z+=Q.EXHAUSTION_ACCEL*($-Q.EXHAUSTION_ACCEL_ROUND+1);return Z}columnClaims(J){let Q=this.stakes[J],$=!1,Z=!1,W=!1,K=!1,Y=!1,X=!1;for(let H=0;H<8;H++){let U=this.board.get(T0([J,H]));if(U===void 0)continue;let q=this.units.get(U),G=this.unbroken(q),N=this.carryEligible(q);if(!G&&!N)continue;if(q.owner===0){if(H>=Q){if(G)W=!0;if(N)$=!0}else if(G)Y=!0}else if(H<Q){if(G)X=!0;if(N)Z=!0}else if(G)K=!0}return[$&&!K,Z&&!Y]}computeHarvest(J,Q){let $=this.C,Z=this.exhaustionPenalty(Q),W=0,K=0,Y=[];for(let[U,q]of this.fields.entries()){let G=U.split(",").map(Number);if((q.annexed!==null?q.annexed:q.owner)!==J||this.territoryOf(G)!==J)continue;let F=q.annexed===J?$.ANNEX_YIELD:$.FIELD_YIELD;if(q.type==="crop")K+=Math.max(0,F-Z);else W+=F;if(q.annexed===null&&q.owner===J)Y.push([G,q.type])}let X=new Set,H=new Map(Y.map(([U,q])=>[T0(U),q]));for(let[U,q]of Y){if(X.has(T0(U)))continue;let G=0,N=[U];X.add(T0(U));while(N.length){let F=N.pop();G++;for(let R of NJ(F))if(!X.has(T0(R))&&H.get(T0(R))===q)X.add(T0(R)),N.push(R)}if(G>=$.FARMSTEAD_SIZE)if(q==="crop")K+=Math.max(0,$.FARMSTEAD_BONUS-Z);else W+=$.FARMSTEAD_BONUS}return[W,K]}musterPlayer(J){let Q=this.C,$=this.bots[J],Z=this.res[J],[W,K]=this.computeHarvest(J);Z.supply+=W,Z.crop+=K;let Y=this.onBoard(J),X=[],H=new Set;for(let M of $.feedOrder(this,J)){let L=this.units.get(M);if(H.has(M)||!L||L.owner!==J||L.pos===null)continue;H.add(M),X.push(M)}for(let M of Y)if(!H.has(M.uid))X.push(M.uid);let U=Z.crop;for(let M of X){let L=this.units.get(M),z=Q.UPKEEP_CROP+(this.beyondOwn(L)?Q.SUPPLY_STRAIN_CROP:0);if(U>=z)U-=z,L.exhausted=!1;else L.exhausted=!0}Z.crop=U;for(let M of $.build(this,J).slice(0,Q.BUILD_ACTIONS)){if(!M)continue;if(M[0]==="field"){let L=M[1],z=M[2];if(P9(L)&&this.territoryOf(L)===J&&!this.fields.has(T0(L))&&!this.wagon_at.has(T0(L))&&Z.supply>=Q.FIELD_COST&&(z==="supply"||z==="crop"))Z.supply-=Q.FIELD_COST,this.fields.set(T0(L),{type:z,owner:J,annexed:null})}else if(M[0]==="palisade"){let L=M[1];if(L>=0&&L<8&&!this.palisades.has(L)&&Z.supply>=Q.PALISADE_COST)Z.supply-=Q.PALISADE_COST,this.palisades.set(L,J)}}let q=$.reinforce(this,J),G=Math.min(Math.trunc(q.tribute_spend??0),Z.tribute);if(G>0)Z.tribute-=G,Z.supply+=G*Q.TRIBUTE_SUPPLY_VALUE;for(let M of this.reserve(J))if(M.wounded_round!==null&&M.wounded_round<=this.round-Q.WOUND_RETURN_DELAY){let L=this.freeHeartlandTile(J);if(L===null)break;M.hp=M.max_hp,M.wounded_round=null,this.place(M,L)}for(let M of q.rush??[]){let L=this.units.get(M);if(L&&L.owner===J&&L.pos===null&&L.wounded_round===this.round-1&&Z.crop>=Q.RUSH_RETURN_COST){let z=this.freeHeartlandTile(J);if(z===null)break;Z.crop-=Q.RUSH_RETURN_COST,L.hp=L.max_hp,L.wounded_round=null,this.place(L,z)}}for(let M of q.unlocks??[]){if(!xZ.includes(M)||this.unlocked[J].has(M))continue;let L=this.unlocked[J].size,z={2:Q.UNLOCK_3RD,3:Q.UNLOCK_4TH,4:Q.UNLOCK_5TH}[L];if(z!==void 0&&Z.supply>=z)Z.supply-=z,this.unlocked[J].add(M)}let N=Q.DEPLOY_MAX+this.extra_deploy[J];this.extra_deploy[J]=0;let F=0,R=new Set,B=this.heartlandRows(J);for(let[M,L]of q.recruits??[]){if(F>=N||!xZ.includes(M))continue;if(!this.unlocked[J].has(M)||this.copies[M]>=Q.MUSTER_COPIES)continue;if(!P9(L)||!B.includes(L[1])||this.occupied(L))continue;let z=this.costs[M]+Q.COPY_SURCHARGE*this.copies[M];if(this.recruit_discount[J])z=Math.max(1,z-this.recruit_discount[J]);if(Z.supply<z)continue;if(Z.supply-=z,this.recruit_discount[J])this.recruit_discount[J]=0;this.copies[M]++;let w=this.newUnit(J,M);w.face_down=!0,this.place(w,L),R.add(w.uid),F++}let D=0;for(let[M,L]of q.repositions??[]){if(D>=Q.REPOSITION_MAX)break;let z=this.units.get(M);if(!z||z.owner!==J||z.pos===null||R.has(M)||!P9(L)||this.occupied(L)||this.territoryOf(L)!==J)continue;this.moveUnit(z,L),z.braced=!1,D++}let E;for(let M of this.units.values())if(M.owner===J&&M.arch==="hero"){E=M;break}if(!E||E.pos===null){let M=$.standardBearer(this,J),L=M!==null?this.units.get(M):void 0;if(!L||L.owner!==J||L.pos===null)L=this.onBoard(J).sort((w,P)=>this.costs[P.arch]-this.costs[w.arch]||w.pos[0]-P.pos[0]||w.pos[1]-P.pos[1])[0];this.standard_bearer[J]=L?L.uid:null}else this.standard_bearer[J]=null}counter(J,Q){return YQ[J]===Q?this.C.MOD_COUNTER:0}flanked(J){let Q=0;for(let $ of NJ(J.pos)){let Z=this.board.get(T0($));if(Z!==void 0&&this.units.get(Z).owner!==J.owner)Q++}return Q>=this.C.FLANK_THRESHOLD}hasAdjacentFriend(J){for(let Q of NJ(J.pos)){let $=this.board.get(T0(Q));if($!==void 0&&this.units.get($).owner===J.owner)return!0}return!1}effGuard(J,Q=!1){let $=this.C,Z=0;if(!this.beyondOwn(J)&&this.hasAdjacentFriend(J))Z+=$.MOD_SUPPORT;if(J.braced)Z+=$.MOD_BRACE_GUARD;if(this.terrain_on){let K=this.ttype.get(T0(J.pos));if(K==="hills")Z+=$.MOD_HILL;if(K==="woods"&&Q)Z+=1}let W=J.base_guard+Math.min($.GUARD_CAP,Z);if(J.exhausted)W-=$.EXHAUST_GUARD_PENALTY;return Math.max(0,W)}effAtk(J,Q,$=!1,Z=!1){let W=this.C,K=this.counter(J.arch,Q.arch);if($)K+=W.MOD_CHARGE;if(this.flanked(Q))K+=W.MOD_FLANK;let Y=J.base_atk+Math.min(W.ATK_BONUS_CAP,K);if(J.exhausted)Y-=W.EXHAUST_ATK_PENALTY;if(Z&&this.terrain_on&&this.rivers.has(hZ(J.pos,Q.pos)))Y-=W.MOD_RIVER;return Math.max(0,Y)}attackDamage(J,Q,$=!1,Z=!1){let W=this.effAtk(J,Q,$,Z)-this.effGuard(Q,!Z&&!$),K=this.flanked(Q)?this.C.FLANK_MIN_DMG:0;return Math.max(K,W)}applyDamage(J,Q){let $=(W)=>{let[K,Y]=W,X=this.units.get(Y),H=K!==null?this.units.get(K).pos??[-1,-1]:[-1,-1];return[X.pos??[-1,-1],H]},Z=J.map((W,K)=>({inst:W,i:K})).sort((W,K)=>A9($(W.inst),$(K.inst))||W.i-K.i);for(let{inst:W}of Z)this.damageUnit(this.units.get(W[1]),W[2],W[0],Q)}damageUnit(J,Q,$,Z){if(Q<=0||J.pos===null)return;let W=this.wards.find((Y)=>Y.uid===J.uid&&Y.active);if(W&&J.hp-Q<=0){W.active=!1;let Y=this.wardBearer(J);if(Y)J=Y}J.hp-=Q;let K=`${$===null?"n":$}_${J.uid}`;if(Z.set(K,(Z.get(K)??0)+Q),$!==null){let Y=this.units.get($);if(Y.owner!==J.owner)this.unit_dmg_round[Y.owner]+=Q}}wardBearer(J){let Q=[];for(let $ of NJ(J.pos)){let Z=this.board.get(T0($));if(Z===void 0)continue;let W=this.units.get(Z);if(W.owner===J.owner&&(W.arch==="spear"||W.arch==="sword"))Q.push(W)}if(!Q.length)return null;return Q.sort(($,Z)=>Z.hp-$.hp||A9($.pos,Z.pos)),Q[0]}removeDead(J){let Q=[];for(let $ of[...this.onBoard()])if($.hp<=0)this.board.delete(T0($.pos)),$.pos=null,$.braced=!1,$.exhausted=!1,$.wounded_round=this.round,Q.push($);for(let $ of Q)for(let[Z,W]of J.entries()){let[K,Y]=Z.split("_");if(Number(Y)===$.uid&&W>=1&&K!=="n"){let X=this.units.get(Number(K));if(X.owner!==$.owner)this.gainXp(X,this.C.XP_PER_WOUND)}}}gainXp(J,Q){let $=this.C;if(J.xp+=Q,!J.tier1&&J.xp>=$.XP_TIER1)this.grantTier(J);if(!J.tier2&&J.xp>=$.XP_TIER2)this.grantTier(J)}grantTier(J){let Q=this.C;if(!J.tier1)J.tier1=!0,J.max_hp+=Q.PROMO_T1_HP,J.hp=Math.min(J.hp+1,J.max_hp);else if(!J.tier2)if(J.tier2=!0,this.bots[J.owner].promoT2(this,J.owner,J)==="guard")J.base_guard+=Q.PROMO_T2_STAT;else J.base_atk+=Q.PROMO_T2_STAT}applyPushes(J,Q){let $=this.C,Z=(K)=>{return this.units.get(K.uid).pos??K.tgt_tile??[9,9]},W=J.map((K,Y)=>({p:K,i:Y})).sort((K,Y)=>A9(Z(K.p),Z(Y.p))||K.i-Y.i);for(let{p:K}of W){let Y=this.units.get(K.uid);if(Y.pos===null){if(K.kind==="charge"&&K.charger!=null){let F=this.units.get(K.charger);if(F.pos!==null&&K.tgt_tile&&!this.occupied(K.tgt_tile))this.moveUnit(F,K.tgt_tile)}continue}let[X,H]=K.dir,U=[Y.pos[0]+X,Y.pos[1]+H],q=K.pusher??null;if(!P9(U)||this.occupied(U)){this.damageUnit(Y,$.DISPLACE_DMG,q,Q);let F=this.board.get(T0(U));if(F!==void 0)this.damageUnit(this.units.get(F),$.DISPLACE_DMG,q,Q);continue}let G=Y.pos,N=this.terrain_on&&this.rivers.has(hZ(G,U));if(this.moveUnit(Y,U),Y.braced=!1,N)this.damageUnit(Y,$.RIVER_PUSH_DMG,q,Q);if(K.kind==="charge"&&K.charger!=null){let F=this.units.get(K.charger);if(F.pos!==null&&!this.occupied(G))this.moveUnit(F,G)}}}capRemaining(J){let Q=this.C;return(this.round>=Q.BREACH_CAP_RISE_ROUND?Q.BREACH_CAP_LATE:Q.BREACH_CAP)-this.cap_dmg[J]}damageWagon(J,Q,$,Z=!0){let W=this.wagons[Q][$];if(W.hp<=0)return!1;if(Z){if(this.capRemaining(J)<=0)return!1;this.cap_dmg[J]++}if(this.wagon_dmg_round[J]++,W.hp--,W.hp<=0){if(this.wagon_at.delete(T0([W.col,this.backRow(Q)])),this.res[J].supply+=this.C.WAGON_BOUNTY,this.last_wagon_kill_src="normal",!this.last_stand_used[Q]&&this.wagonsAlive(Q)>0)this.last_stand_used[Q]=!0,this.resolveLastStand(Q)}return!0}wagonWinCheck(J){let Q=this.wagonsAlive(0),$=this.wagonsAlive(1);if(Q===0&&$===0)throw new gJ(this.komi,J);if($===0)throw new gJ(0,J);if(Q===0)throw new gJ(1,J)}resolveLastStand(J){let Q=this.bots[J].lastStand(this,J);if(Q===1){for(let $ of this.reserve(J)){let Z=this.freeHeartlandTile(J);if(Z===null)break;$.hp=$.max_hp,$.exhausted=!1,$.braced=!1,$.face_down=!1,$.wounded_round=null,this.place($,Z)}this.extra_deploy[J]++}else if(Q===2){let $=this.onBoard(J).filter((Z)=>!Z.tier2).sort((Z,W)=>W.xp-Z.xp||this.costs[W.arch]-this.costs[Z.arch]||A9(Z.pos,W.pos));if($.length)this.grantTier($[0])}else{let $=this.bots[J].entrenchCols(this,J),Z=0;for(let W of $){if(Z>=this.C.ENTRENCH_PALISADES)break;if(W>=0&&W<8&&!this.palisades.has(W))this.palisades.set(W,J),Z++}}}standardUnit(J){let Q;for(let Z of this.units.values())if(Z.owner===J&&Z.arch==="hero"){Q=Z;break}if(Q&&Q.pos!==null)return Q;let $=this.standard_bearer[J];if($!==null){let Z=this.units.get($);if(Z&&Z.pos!==null)return Z}return null}validateOrder(J,Q){let $=this.C,Z=["HOLD"];if(!Q||J.pos===null)return Z;let W=Q[0];if(W==="HOLD")return Z;if(W==="BRACE")return J.arch==="spear"?Q:Z;let K=J.braced?0:J.mv,Y=(X,H)=>{let U=H;if(this.terrain_on&&H>0&&X.length===H+1&&X.every((G)=>this.ttype.get(T0(G))==="road"))U=H+1;if(X.length>U)return!1;let q=J.pos;for(let G of X){if(!P9(G)||s0(q,G)!==1)return!1;q=G}return!0};if(W==="SHOOT"){if(J.arch!=="archer"&&J.arch!=="siege")return Z;let X=Q[1];if(X[0]==="U"){let H=this.units.get(X[1]);if(!H||H.pos===null||H.owner===J.owner)return Z;if(!(J.rmin<=s0(J.pos,H.pos)&&s0(J.pos,H.pos)<=J.rmax))return Z}else if(X[0]==="W"){if(J.arch!=="siege")return Z}else if(X[0]==="P"){if(J.arch!=="siege")return Z}else return Z;return Q}if(W==="MOVE"){let X=Q[1];return X&&X.length&&Y(X,K)?Q:Z}if(W==="MELEE"){if(J.arch==="siege")return Z;let X=Q[1],H=Q[2],U=this.units.get(X);if(!U||U.owner===J.owner)return Z;if(H&&H.length&&!Y(H,K))return Z;return["MELEE",X,H&&H.length?[...H]:[]]}if(W==="CHARGE"){if(J.arch!=="cav"||J.braced)return Z;let X=Q[1],H=Q[2],U=this.units.get(X);if(!U||U.owner===J.owner)return Z;if(!this.C.CHARGE_ADJ_OK&&U.pos!==null&&s0(J.pos,U.pos)===1)return["MELEE",X,[]];if(!H||!H.length||!Y(H,K))return Z;return["CHARGE",X,[...H]]}return Z}runPulse(J){let Q=this.bots[0].orders(this,0,J),$=this.bots[1].orders(this,1,J),Z=new Map;for(let G of this.onBoard())Z.set(G.uid,this.validateOrder(G,(G.owner===0?Q:$)[G.uid]));for(let G of this.onBoard()){let N=Z.get(G.uid)[0];if(N==="BRACE")G.braced=!0;else if(G.braced&&N!=="MELEE")G.braced=!1}this.endSubphase(new Map,[]);let W=new Map,K=[],Y=[],X=[];for(let G of this.onBoard()){let N=Z.get(G.uid);if(!N||N[0]!=="SHOOT")continue;let F=N[1];if(F[0]==="U"){let R=this.units.get(F[1]);if(!R||R.pos===null||!(G.rmin<=s0(G.pos,R.pos)&&s0(G.pos,R.pos)<=G.rmax))continue;let B;if(this.terrain_on&&this.ttype.get(T0(R.pos))==="woods")B=Math.max(this.flanked(R)?this.C.FLANK_MIN_DMG:0,this.effAtk(G,R)-this.effGuard(R,!0));else B=this.attackDamage(G,R);if(K.push([G.uid,R.uid,B]),G.arch==="siege"&&this.C.SIEGE_PUSH_UNITS){let D=R.pos[0]-G.pos[0],E=R.pos[1]-G.pos[1],M=Math.abs(D)>Math.abs(E)?[D>0?1:-1,0]:[0,E>0?1:-1];Y.push({uid:R.uid,dir:M,pusher:G.uid,kind:"siege",tgt_tile:R.pos})}}else if(F[0]==="W"){let R=F[1],B=F[2];if(R===G.owner||B>=this.wagons[R].length)continue;let D=this.wagons[R][B],E=[D.col,this.backRow(R)];if(D.hp>0&&G.rmin<=s0(G.pos,E)&&s0(G.pos,E)<=G.rmax)X.push([G.owner,R,B])}else if(F[0]==="P"){let R=F[1];if(this.palisades.has(R)){let B=this.stakes[R];for(let D of[[R,B-1],[R,B]])if(G.rmin<=s0(G.pos,D)&&s0(G.pos,D)<=G.rmax){this.palisades.delete(R);break}}}}for(let[G,N,F]of X)this.damageWagon(G,N,F,!0);if(X.length)this.wagonWinCheck("wagons");this.applyDamage(K,W),this.endSubphase(W,Y),W=new Map;let H=new Map;for(let G of this.onBoard()){let N=Z.get(G.uid);if(N&&(N[0]==="MOVE"||N[0]==="MELEE"||N[0]==="CHARGE")){let F=N[0]==="MOVE"?N[1]:N[2];if(F&&F.length)H.set(G.uid,{path:F,stopped:!1,moved:0})}}let U=0;for(let G of H.values())U=Math.max(U,G.path.length);for(let G=0;G<U;G++){let N=new Map;for(let B of[...H.keys()].sort((D,E)=>D-E)){let D=H.get(B),E=this.units.get(B);if(D.stopped||G>=D.path.length||E.pos===null)continue;let M=D.path[G];if(s0(E.pos,M)!==1){D.stopped=!0;continue}if(this.occupied(M)){D.stopped=!0;continue}let L=T0(M);if(!N.has(L))N.set(L,[]);N.get(L).push(B)}let F=[],R=[...N.keys()].sort((B,D)=>A9(B.split(",").map(Number),D.split(",").map(Number)));for(let B of R){let D=N.get(B);if(D.length>=2)for(let E of D)H.get(E).stopped=!0;else F.push([D[0],B.split(",").map(Number)])}for(let[B,D]of F)this.moveUnit(this.units.get(B),D),H.get(B).moved++;if(!this.C.ZOC_ENABLED)F=[];for(let[B]of F){let D=this.units.get(B);for(let E of NJ(D.pos)){let M=this.board.get(T0(E));if(M!==void 0&&this.units.get(M).owner!==D.owner){H.get(B).stopped=!0;break}}}}K=[],Y=[];for(let G of[...H.keys()].sort((N,F)=>N-F)){let N=Z.get(G);if(!N||N[0]!=="CHARGE")continue;let F=this.units.get(G);if(F.pos===null)continue;let R=this.units.get(N[1]);if(!R||R.pos===null||H.get(G).moved<this.C.CHARGE_MOVE_MIN||s0(F.pos,R.pos)!==1)continue;if(this.terrain_on&&this.ttype.get(T0(R.pos))==="woods")continue;if(R.arch==="spear"&&R.braced){let B=Math.max(0,R.base_atk+this.counter(R.arch,F.arch)-this.effGuard(F));K.push([R.uid,F.uid,B]);let D=[F.pos[0]-R.pos[0],F.pos[1]-R.pos[1]];Y.push({uid:F.uid,dir:D,pusher:R.uid,kind:"brace",tgt_tile:F.pos})}else{let B=this.attackDamage(F,R,!0,!0);K.push([F.uid,R.uid,B]);let D=[R.pos[0]-F.pos[0],R.pos[1]-F.pos[1]];Y.push({uid:R.uid,dir:D,pusher:F.uid,kind:"charge",charger:F.uid,tgt_tile:R.pos})}}this.applyDamage(K,W),this.endSubphase(W,Y),W=new Map,K=[],Y=[];let q=[];for(let G of this.onBoard()){let N=Z.get(G.uid);if(!N||N[0]!=="MELEE")continue;let F=this.units.get(N[1]);if(!F||F.pos===null||G.pos===null||s0(G.pos,F.pos)!==1)continue;q.push([G,F])}for(let[G,N]of q){K.push([G.uid,N.uid,this.attackDamage(G,N,!1,!0)]);let F=N.arch==="archer"||N.arch==="siege"?this.C.RANGED_RETALIATION:Math.max(0,N.base_atk+this.counter(N.arch,G.arch)-this.effGuard(G));K.push([N.uid,G.uid,F])}this.applyDamage(K,W);for(let[G,N]of q)if(N.arch==="spear"&&N.braced&&N.pos!==null&&G.pos!==null&&G.hp>0&&s0(G.pos,N.pos)===1){let F=[G.pos[0]-N.pos[0],G.pos[1]-N.pos[1]];Y.push({uid:G.uid,dir:F,pusher:N.uid,kind:"brace",tgt_tile:G.pos})}this.endSubphase(W,Y)}endSubphase(J,Q){if(this.removeDead(J),Q.length)this.applyPushes(Q,J),this.removeDead(J);this.routTest()}routTest(){let J=[];for(let Q=0;Q<2;Q++){let $=this.standardUnit(Q);if($===null)continue;let Z=!1,W=!0;for(let K of NJ($.pos)){let Y=this.board.get(T0(K));if(Y!==void 0)if(this.units.get(Y).owner!==Q)Z=!0;else{W=!1;break}else if(this.wagon_at.has(T0(K)));else{W=!1;break}}if(W&&Z)J.push(Q)}if(!J.length)return;for(let Q of J){let $=1-Q,Z=this.C.ROUT_WAGON_DMG,W=this.bots[$].routAllocate,K=W?[...W.call(this.bots[$],this,$,Q,Z)]:[];for(let Y=0;Y<Z;Y++){let X=this.wagons[Q].map((U,q)=>[q,U]).filter(([,U])=>U.hp>0);if(!X.length)break;let H=null;while(K.length){let U=K.shift();if(X.some(([q])=>q===U)){H=U;break}}if(H===null)X.sort((U,q)=>U[1].hp-q[1].hp||U[0]-q[0]),H=X[0][0];this.damageWagon($,Q,H,!1)}}throw this.wagonWinCheck("rout"),new $7}interventionWindow(J){let Q=this.C;for(let $ of[this.komi,1-this.komi]){let Z=this.bots[$].intervention(this,$,J);if(!Z)continue;let W=this.res[$];if(Z[0]==="SURGE"&&W.tribute>=Q.SURGE_COST){let K=this.units.get(Z[1]),Y=Z[2];if(K&&K.owner===$&&K.pos!==null&&P9(Y)&&s0(K.pos,Y)===1&&!this.occupied(Y))W.tribute-=Q.SURGE_COST,this.moveUnit(K,Y)}else if(Z[0]==="SHIELDBEARER"&&W.tribute>=Q.SHIELDBEARER_COST){let K=this.units.get(Z[1]);if(K&&K.owner===$&&K.pos!==null)W.tribute-=Q.SHIELDBEARER_COST,this.wards.push({uid:K.uid,owner:$,active:!0})}}}clash(){this.wards=[];try{this.interventionWindow(1),this.runPulse(1),this.interventionWindow(2),this.runPulse(2),this.interventionWindow(3)}catch(J){if(!(J instanceof $7))throw J}this.wards=[]}frontier(){let J=this.C,Q=[];for(let $=0;$<8;$++){let Z=this.stakes[$],[W,K]=this.columnClaims($);if(W===K)continue;let Y=W?0:1,X=Y===0?Z+1:Z-1;if(!(J.STAKE_MIN<=X&&X<=J.STAKE_MAX))continue;let H=1-Y;if(this.palisades.get($)===H){this.palisades.delete($);continue}let U=Y===0?[$,Z]:[$,Z-1];if(J.ENTRENCH_HOLD&&(this.entrench.get(T0(U))??0)>=J.ENTRENCH_HOLD){this.entrench.set(T0(U),0);continue}this.stakes[$]=X,this.rows_lost_round[H]++,this.rows_taken_round[Y]++,Q.push([Y,Y===0?[$,Z]:[$,Z-1]])}for(let[$,Z]of Q){let W=this.fields.get(T0(Z));if(!W)continue;if(W.owner===$){if(W.annexed!==null)W.annexed=null;continue}if((W.annexed!==null?W.annexed:W.owner)===$)continue;if(this.bots[$].trampleChoice(this,$,Z,W)==="annex")W.annexed=$;else this.res[$][W.type]+=J.RAID_GAIN,this.fields.delete(T0(Z))}for(let $ of[this.komi,1-this.komi]){let Z=1-$,W=this.heartlandRows(Z),K=this.onBoard($).filter((X)=>W.includes(X.pos[1])),Y=!1;for(let X of K){if(this.capRemaining($)<=0)break;let H=this.wagons[Z].map((G,N)=>[N,G]).filter(([,G])=>G.hp>0);if(!H.length)break;let U=H.filter(([,G])=>G.col===X.pos[0]),q;if(U.length)q=U[0][0];else{let G=Math.min(...H.map(([,F])=>Math.abs(F.col-X.pos[0]))),N=H.filter(([,F])=>Math.abs(F.col-X.pos[0])===G).sort((F,R)=>F[1].col-R[1].col);if(q=N[0][0],N.length>1){let F=this.bots[$].breachTarget(this,$,X,N);if(N.some(([R])=>R===F))q=F}}Y=this.damageWagon($,Z,q,!0)||Y}if(Y)this.wagonWinCheck("wagons")}}leadHolder(){let J=($)=>[this.wagonsAlive($),this.wagonHp($),this.ownedRows($)],Q=A9(J(0),J(1));return Q>0?0:Q<0?1:null}updateEntrench(){let J=this.C;if(!J.ENTRENCH_HOLD)return;let Q=J.STAKE_START,$=new Map;for(let Z=0;Z<8;Z++){let W=this.stakes[Z],K;if(W>Q)K=[...Array(W-Q).keys()].map((Y)=>Y+Q);else if(W<Q)K=[...Array(Q-W).keys()].map((Y)=>Y+W);else continue;for(let Y of K)$.set(T0([Z,Y]),Math.min((this.entrench.get(T0([Z,Y]))??0)+1,J.ENTRENCH_HOLD))}this.entrench=$}caravan(J){let Q=this.C,$=Q.CARAVAN_ARTIFACTS,Z=J===1?0:$,W=this.artifact_order.slice(Z,Z+$),K=(X)=>[this.wagonsAlive(X),this.ownedRows(X),X===this.komi?0:1],Y=A9(K(0),K(1))<=0?0:1;for(let X of[Y,1-Y,Y]){if(!W.length)break;let H=this.bots[X].artifactPick(this,X,W.slice());if(!W.includes(H))H=W[0];W=W.filter((U)=>U!==H),this.applyArtifact(X,H)}}applyArtifact(J,Q){let $=this.C,Z=this.res[J];if(Q===1)Z.supply+=$.ARTIFACT_SUPPLY;else if(Q===2)Z.crop+=$.ARTIFACT_CROP;else if(Q===3){let W;for(let K of this.units.values())if(K.owner===J&&K.arch==="hero"){W=K;break}if(W)W.base_guard+=1}else if(Q===4){let W=this.onBoard(J).sort((K,Y)=>Y.xp-K.xp||this.costs[Y.arch]-this.costs[K.arch]||A9(K.pos,Y.pos));if(W.length)this.gainXp(W[0],$.ARTIFACT_XP)}else if(Q===5){for(let W of this.bots[J].entrenchCols(this,J))if(W>=0&&W<8&&!this.palisades.has(W)){this.palisades.set(W,J);break}}else if(Q===6)Z.tribute+=$.ARTIFACT_TRIBUTE;else if(Q===7)this.recruit_discount[J]=$.ARTIFACT_DISCOUNT;else if(Q===8){let[,W]=this.computeHarvest(J),K=W<this.onBoard(J).length?"crop":"supply";for(let Y=0;Y<8;Y++)for(let X of this.heartlandRows(J)){let H=[Y,X];if(!this.fields.has(T0(H))&&!this.wagon_at.has(T0(H))){this.fields.set(T0(H),{type:K,owner:J,annexed:null});return}}}}playRound(){let J=this.C;this.cap_dmg=[0,0],this.wagon_dmg_round=[0,0],this.rows_lost_round=[0,0],this.rows_taken_round=[0,0],this.unit_dmg_round=[0,0],this.musterPlayer(this.komi),this.musterPlayer(1-this.komi);for(let Z of this.units.values())Z.face_down=!1;this.clash(),this.frontier();let[Q,$]=this.rows_lost_round;if(Q!==$)this.komi=Q>$?0:1;if(this.round>=J.GOLDEN_GOAL_ROUND){let Z=this.rows_taken_round[0]>0||this.wagon_dmg_round[0]>0,W=this.rows_taken_round[1]>0||this.wagon_dmg_round[1]>0;if(Z||W){let K;if(Z&&W)if(this.rows_taken_round[0]!==this.rows_taken_round[1])K=this.rows_taken_round[0]>this.rows_taken_round[1]?0:1;else if(this.wagon_dmg_round[0]!==this.wagon_dmg_round[1])K=this.wagon_dmg_round[0]>this.wagon_dmg_round[1]?0:1;else K=this.komi;else K=Z?0:1;throw new gJ(K,"golden-goal")}}for(let Z=0;Z<2;Z++)this.res[Z].tribute+=J.TRIBUTE_PER_ROW*this.rows_lost_round[Z];if(this.round===J.CARAVAN_ROUND_1)this.caravan(1);else if(this.round===J.CARAVAN_ROUND_2)this.caravan(2);if(this.round===1){let[Z,W]=this.rows_taken_round;if(Z!==W)this.r1_winner=Z>W?0:1,this.r1_rows_winner=this.r1_winner;else if(this.unit_dmg_round[0]!==this.unit_dmg_round[1]&&(!J.R1_REQUIRE_ENGAGE||Math.min(...this.unit_dmg_round)>=1))this.r1_winner=this.unit_dmg_round[0]>this.unit_dmg_round[1]?0:1;if(J.FIRST_BLOOD_SUPPLY&&this.r1_winner!==null)this.res[this.r1_winner].supply+=J.FIRST_BLOOD_SUPPLY}if(this.lead_trace.push(this.leadHolder()),this.round>=J.HARD_STOP_ROUND){let Z=this.wagonsAlive(0),W=this.wagonsAlive(1);if(Z!==W)throw new gJ(Z>W?0:1,"ladder");let K=this.ownedRows(0),Y=this.ownedRows(1);if(K!==Y)throw new gJ(K>Y?0:1,"ladder");throw new gJ(this.komi,"ladder")}this.updateEntrench(),this.round++}phaseHashesR1(){let J=[];this.musterPlayer(this.komi),this.musterPlayer(1-this.komi),J.push(["muster",this.stateHash()]);for(let Z of this.units.values())Z.face_down=!1;J.push(["reveal",this.stateHash()]),this.clash(),J.push(["clash",this.stateHash()]),this.frontier();let[Q,$]=this.rows_lost_round;if(Q!==$)this.komi=Q>$?0:1;J.push(["frontier",this.stateHash()]);for(let Z=0;Z<2;Z++)this.res[Z].tribute+=this.C.TRIBUTE_PER_ROW*this.rows_lost_round[Z];return J.push(["pass",this.stateHash()]),J}snapshot(){let J=[...this.units.values()].map((Q)=>({uid:Q.uid,owner:Q.owner,arch:Q.arch,base_atk:Q.base_atk,base_guard:Q.base_guard,hp:Q.hp,max_hp:Q.max_hp,mv:Q.mv,rmin:Q.rmin,rmax:Q.rmax,pos:Q.pos===null?null:[Q.pos[0],Q.pos[1]],exhausted:Q.exhausted,braced:Q.braced,xp:Q.xp,tier1:Q.tier1,tier2:Q.tier2,wounded_round:Q.wounded_round,face_down:Q.face_down})).sort((Q,$)=>Q.uid-$.uid);return{round:this.round,komi:this.komi,stakes:[...this.stakes],res:this.res.map((Q)=>({supply:Q.supply,crop:Q.crop,tribute:Q.tribute})),units:J,wagons:this.wagons.map((Q)=>Q.map(($)=>({col:$.col,row:$.row,hp:$.hp}))),fields:[...this.fields.entries()].map(([Q,$])=>[Q.split(",").map(Number),$]).sort(bZ),palisades:[...this.palisades.entries()].sort((Q,$)=>Q[0]-$[0]),entrench:[...this.entrench.entries()].map(([Q,$])=>[Q.split(",").map(Number),$]).sort(bZ)}}stateHash(){return vZ(Z7(this.snapshot())).slice(0,16)}}function bZ(J,Q){return Z7(J)<Z7(Q)?-1:1}function Z7(J){if(J===null)return"null";if(typeof J==="boolean")return J?"true":"false";if(typeof J==="number")return String(J);if(typeof J==="string")return JSON.stringify(J);if(Array.isArray(J))return"["+J.map(Z7).join(",")+"]";return"{"+Object.keys(J).sort().map(($)=>JSON.stringify($)+":"+Z7(J[$])).join(",")+"}"}function s0(J,Q){return Math.abs(J[0]-Q[0])+Math.abs(J[1]-Q[1])}function P9(J){return J[0]>=0&&J[0]<8&&J[1]>=0&&J[1]<8}function NJ(J){let[Q,$]=J,Z=[];if(Q>0)Z.push([Q-1,$]);if(Q<7)Z.push([Q+1,$]);if($>0)Z.push([Q,$-1]);if($<7)Z.push([Q,$+1]);return Z}M9.prototype.territoryOf=function(J){return J[1]<this.stakes[J[0]]?0:1};M9.prototype.beyondOwn=function(J){return this.territoryOf(J.pos)!==J.owner};M9.prototype.onBoard=function(J){let Q=[...this.board.values()].map(($)=>this.units.get($));if(J!==void 0)Q=Q.filter(($)=>$.owner===J);return Q.sort(($,Z)=>$.pos[0]-Z.pos[0]||$.pos[1]-Z.pos[1])};M9.prototype.reserve=function(J){return[...this.units.values()].filter((Q)=>Q.pos===null&&Q.owner===J).sort((Q,$)=>Q.uid-$.uid)};M9.prototype.wagonsAlive=function(J){return this.wagons[J].filter((Q)=>Q.hp>0).length};M9.prototype.wagonHp=function(J){return this.wagons[J].reduce((Q,$)=>Q+Math.max(0,$.hp),0)};M9.prototype.ownedRows=function(J){return J===0?this.stakes.reduce((Q,$)=>Q+$,0):this.stakes.reduce((Q,$)=>Q+(8-$),0)};function l7(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(K>Z)Z=K,$=J[W]}return $}function d7(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(K<Z)Z=K,$=J[W]}return $}function XQ(J,Q){let $=J[0],Z=Q(J[0]);for(let W=1;W<J.length;W++){let K=Q(J[W]);if(LY(K,Z)<0)Z=K,$=J[W]}return $}function LY(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++)if(J[$]!==Q[$])return J[$]<Q[$]?-1:1;return 0}var GJ=(J)=>`${J[0]},${J[1]}`,BY=(()=>{let J=[];for(let Q=0;Q<256;Q++){let $=Q;for(let Z=0;Z<8;Z++)$=$&1?3988292384^$>>>1:$>>>1;J[Q]=$>>>0}return J})();function zY(J){let Q=new TextEncoder().encode(J),$=4294967295;for(let Z=0;Z<Q.length;Z++)$=BY[($^Q[Z])&255]^$>>>8;return($^4294967295)>>>0}function pZ(J){return Array.isArray(J)?"("+J.map(pZ).join(", ")+")":String(J)}function k8(J,Q){for(let $=0;$<Math.max(J.length,Q.length);$++){let Z=J[$],W=Q[$];if(Array.isArray(Z)&&Array.isArray(W)){let K=k8(Z,W);if(K)return K}else if(Z!==W)return Z<W?-1:1}return 0}var kY=["HONEST","AGGRO","TURTLE","PROBER","SANDBAGGER","RUNNER"];function IY(J){let Q={mode:"auto",depth:1,fields_target:9,palisades:!0,unlock_plan:["archer"],unlock_round:3,recruit_priority:["sword","spear","archer","cav","siege"],army_overshoot:0,attack_scope:"any",brace_radius:2,trample:"annex",desperation_round:11,sandbag_until:0,wagon_hunt:!1,avoid_lone:!0,feed_forward_first:!0,rush:!0,rearguard:0,push_margin:1,convert_mult:1.8,breach_round:12,force_push_round:12};if(J==="HONEST")Object.assign(Q,{rearguard:1});else if(J==="AGGRO")Object.assign(Q,{mode:"push",depth:2,fields_target:9,unlock_plan:["cav"],unlock_round:1,recruit_priority:["cav","sword","spear","archer"],army_overshoot:1,trample:"raid",wagon_hunt:!0,palisades:!1,desperation_round:1,brace_radius:1,convert_mult:1.4,breach_round:10,force_push_round:1});else if(J==="TURTLE")Object.assign(Q,{mode:"hold",fields_target:14,unlock_plan:["archer","siege"],unlock_round:2,recruit_priority:["spear","archer","sword","siege"],attack_scope:"own_half",desperation_round:12,feed_forward_first:!1,brace_radius:3,convert_mult:2,force_push_round:14,breach_round:14});else if(J==="PROBER")Object.assign(Q,{mode:"hold",fields_target:11,unlock_plan:["archer"],unlock_round:2,recruit_priority:["spear","archer","sword","cav"],attack_scope:"own_half_superior",desperation_round:11,feed_forward_first:!1,brace_radius:3,convert_mult:1.8,force_push_round:13});else if(J==="SANDBAGGER")Object.assign(Q,{mode:"sandbag",depth:2,fields_target:9,unlock_plan:["cav"],unlock_round:5,recruit_priority:["sword","cav","spear","archer"],trample:"raid",sandbag_until:5,desperation_round:6,wagon_hunt:!0,convert_mult:1.5});else if(J==="RUNNER")Object.assign(Q,{mode:"runner",depth:6,fields_target:6,unlock_plan:["cav"],unlock_round:1,recruit_priority:["cav","sword","spear"],trample:"raid",avoid_lone:!1,desperation_round:99,palisades:!1,convert_mult:99,force_push_round:99});return Q}class u7{name;cfg;seed=0;me=0;_convert=!1;constructor(J){if(!kY.includes(J))throw Error("unknown bot: "+J);this.name=J,this.cfg=IY(J)}reset(J,Q){this.seed=J,this.me=Q,this._convert=!1}clock(J,Q){return this.cfg[Q]+(J.C.GOLDEN_GOAL_ROUND-16)}tb(...J){let Q=`${this.seed}|${this.name}|${this.me}|${J.map(pZ).join("|")}`;return zY(Q)/4294967296}setup(J,Q){let $=Q===0?1:6,Z=[[1,4,6],[0,3,6],[2,4,7],[1,3,5]],W=Z[Math.floor(this.tb("wagons")*Z.length)].slice(),K=3+(this.tb("side")<0.5?0:1),Y=[{arch:"hero",pos:[K,$]},{arch:"spear",pos:[K-1,$]},{arch:"sword",pos:[K+1,$]},{arch:"sword",pos:[K-2,$]}];return{wagons:W,units:Y}}threatenedCols(J,Q){let $=[];for(let Z=0;Z<8;Z++){let[W,K]=J.columnClaims(Z);if(Q===0&&K||Q===1&&W)$.push(Z)}return $}dangerCols(J,Q){let $=[,,,,,,,,].fill(0);for(let Z of J.onBoard(1-Q)){let[W,K]=Z.pos,Y=J.stakes[W],X,H;if(Q===0)X=K<Y,H=Y<=K&&K<=Y+2;else X=K>=Y,H=Y-3<=K&&K<Y;if(X)$[W]+=3;else if(H)$[W]+=1}return $}pickPushCenter(J,Q){let $=null,Z=null,W=J.onBoard(Q);for(let K=0;K<8;K++){let Y=0,X=0;for(let U=Math.max(0,K-1);U<Math.min(8,K+2);U++){let q=U===K?1:0.5;for(let G of J.onBoard(1-Q))if(G.pos[0]===U&&J.territoryOf(G.pos)===1-Q)Y+=q;for(let G of W)if(G.pos[0]===U)X+=0.4*q}let H=-Y+X+0.3*this.tb("pushcol",K);if(Z===null||H>Z)$=K,Z=H}return $}feedOrder(J,Q){let Z=J.onBoard(Q).map((W)=>{let K=NJ(W.pos).some((U)=>{let q=J.board.get(GJ(U));return q!==void 0&&J.units.get(q).owner!==Q}),Y=J.beyondOwn(W),X=this.cfg.feed_forward_first?0:Y?1:0,H=[W.arch==="hero"?0:1,K?0:1,X,-J.costs[W.arch],W.pos];return{uid:W.uid,key:H}});return Z.sort((W,K)=>k8(W.key,K.key)),Z.map((W)=>W.uid)}_projCropIncome(J,Q){return J.computeHarvest(Q,J.round+1)[1]}build(J,Q){let $=this.cfg,Z=J.C,W=[],K=J.res[Q].supply,Y=0;for(let U of J.fields.values())if(U.owner===Q&&U.annexed===null)Y++;let X=0;for(let U of J.units.values())if(U.owner===Q)X++;if($.palisades&&K>=Z.PALISADE_COST+Z.FIELD_COST){let U=this.dangerCols(J,Q),q=[...Array(8).keys()].filter((G)=>!J.palisades.has(G)&&U[G]>=2).sort((G,N)=>k8([-U[G],this.tb("pal",G)],[-U[N],this.tb("pal",N)]));if(q.length)W.push(["palisade",q[0]]),K-=Z.PALISADE_COST}let H=[];while(W.length<Z.BUILD_ACTIONS&&K>=Z.FIELD_COST&&Y<$.fields_target){let G=this._projCropIncome(J,Q)+2*H.filter(([,F])=>F==="crop").length<X+2&&J.round<Z.EXHAUSTION_START_ROUND-2?"crop":"supply",N=this._fieldSpot(J,Q,G,new Set(H.map(([F])=>GJ(F))));if(N===null)break;W.push(["field",N,G]),H.push([N,G]),K-=Z.FIELD_COST,Y++}if($.palisades&&W.length<Z.BUILD_ACTIONS&&K>=Z.PALISADE_COST+4){let U=this.dangerCols(J,Q),q=[...Array(8).keys()].filter((G)=>!J.palisades.has(G)&&U[G]>=1).sort((G,N)=>k8([-U[G],this.tb("pal2",G)],[-U[N],this.tb("pal2",N)]));if(q.length)W.push(["palisade",q[0]])}return W}_fieldSpot(J,Q,$,Z){let W=null,K=null;for(let Y=0;Y<8;Y++)for(let X=0;X<8;X++){let H=[Y,X];if(J.territoryOf(H)!==Q||J.fields.has(GJ(H))||J.wagon_at.has(GJ(H))||Z.has(GJ(H)))continue;let U=0;for(let N of NJ(H)){let F=J.fields.get(GJ(N));if(F&&F.type===$&&F.owner===Q&&F.annexed===null)U++}let q=J.heartlandRows(Q).includes(X)?2:0,G=2*U+q+this.tb("field",H);if(K===null||G>K)W=H,K=G}return W}reinforce(J,Q){let $=this.cfg,Z=J.C,W=J.res[Q],K={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0},Y=W.supply,X=W.tribute,H=0;if($.mode==="sandbag"&&J.round>$.sandbag_until)H=Math.max(0,X-2);else if(J.round>=this.clock(J,"desperation_round")&&X>2)H=X-2;if(K.tribute_spend=H,Y+=H,$.rush){let E=W.crop;for(let M of J.reserve(Q))if(M.wounded_round===J.round-1&&E>J.onBoard(Q).length)K.rush.push(M.uid),E--}let U=J.unlocked[Q],q=$.unlock_plan.filter((E)=>!U.has(E));if(q.length&&J.round>=$.unlock_round){let E=U.size,M={2:Z.UNLOCK_3RD,3:Z.UNLOCK_4TH,4:Z.UNLOCK_5TH}[E]??999;if(Y>=M+3)K.unlocks.push(q[0]),Y-=M}let G=this._projCropIncome(J,Q),N=0;for(let E of J.units.values())if(E.owner===Q)N++;let F=Z.DEPLOY_MAX+J.extra_deploy[Q],R=new Set;for(let E=0;E<F;E++){let M=Math.max(4,G+Math.floor(W.crop/6)+$.army_overshoot);if(N+1>M)break;let L=null;for(let w of $.recruit_priority){if(!U.has(w)&&!K.unlocks.includes(w))continue;if(J.copies[w]>=Z.MUSTER_COPIES)continue;let P=J.costs[w]+Z.COPY_SURCHARGE*J.copies[w];if(J.recruit_discount[Q])P=Math.max(1,P-J.recruit_discount[Q]);if(Y>=P){L=w,Y-=P;break}}if(L===null)break;let z=this._deploySpot(J,Q,R);if(z===null)break;R.add(GJ(z)),K.recruits.push([L,z]),N++}let B=this.threatenedCols(J,Q),D=new Set;for(let E of B.slice(0,Z.REPOSITION_MAX)){let M=this._spareBlocker(J,Q,E,D);if(M===null)continue;let L=this._blockTile(J,Q,E);if(L===null)continue;D.add(M.uid),K.repositions.push([M.uid,L])}if(K.repositions.length<Z.REPOSITION_MAX&&($.mode==="push"||$.mode==="sandbag"||this._convert||J.round>=this.clock(J,"force_push_round"))){let E=this.pickPushCenter(J,Q);for(let M of J.onBoard(Q)){if(K.repositions.length>=Z.REPOSITION_MAX)break;if(D.has(M.uid)||J.beyondOwn(M)||M.arch==="siege")continue;if(NJ(M.pos).some((w)=>{let P=J.board.get(GJ(w));return P!==void 0&&J.units.get(P).owner!==Q})||Math.abs(M.pos[0]-E)<=1)continue;if(!(Q===0?M.pos[1]<=1:M.pos[1]>=6))continue;for(let w of[E,E-1,E+1]){if(w<0||w>=8)continue;let P=this._blockTile(J,Q,w);if(P!==null){D.add(M.uid),K.repositions.push([M.uid,P]);break}}}}return K}_deploySpot(J,Q,$){let Z=J.heartlandRows(Q),W=Q===0?Z[1]:Z[0],K=null;if(this.cfg.mode==="push"||this.cfg.mode==="runner"||this.cfg.mode==="auto")K=this.pickPushCenter(J,Q);let Y=this.threatenedCols(J,Q);if(Y.length)K=Y[0];let X=null,H=null,U=[W,Q===0?Z[0]:Z[1]];for(let q=0;q<8;q++)for(let G of U){let N=[q,G];if(J.occupied(N)||$.has(GJ(N)))continue;let F=-Math.abs(q-(K!==null?K:3))+(G===W?1:0)+this.tb("deploy",N);if(H===null||F>H)X=N,H=F}return X}_spareBlocker(J,Q,$,Z){let W=[];for(let K of J.onBoard(Q)){if(Z.has(K.uid)||K.arch==="hero"||J.beyondOwn(K))continue;if(NJ(K.pos).some((q)=>{let G=J.board.get(GJ(q));return G!==void 0&&J.units.get(G).owner!==Q}))continue;let X=K.pos[0],H=0;for(let q of J.onBoard(Q))if(q.uid!==K.uid&&q.pos[0]===X&&!J.beyondOwn(q))H++;if(J.onBoard(1-Q).some((q)=>q.pos[0]===X)&&H===0)continue;W.push(K)}if(!W.length)return null;return W.sort((K,Y)=>k8([J.costs[K.arch],Math.abs(K.pos[0]-$),this.tb("blk",K.uid)],[J.costs[Y.arch],Math.abs(Y.pos[0]-$),this.tb("blk",Y.uid)])),W[0]}_blockTile(J,Q,$){let Z=J.stakes[$],W=Q===0?[...Array(Z).keys()].reverse():[...Array(8-Z).keys()].map((K)=>K+Z);for(let K of W){let Y=[$,K];if(!J.occupied(Y))return Y}return null}standardBearer(J,Q){return null}dirn(J){return J===0?1:-1}ownFrontRow(J,Q,$){let Z=J.stakes[$];return Q===0?Z-1:Z}firstBeyondRow(J,Q,$){let Z=J.stakes[$];return Q===0?Z:Z-1}stakeAtMax(J,Q,$){let Z=J.stakes[$];return Q===0?Z===J.C.STAKE_MAX:Z===J.C.STAKE_MIN}behind(J,Q){let $=1-Q,Z=J.wagonsAlive(Q),W=J.wagonsAlive($);if(Z!==W)return Z<W;let K=J.wagonHp(Q),Y=J.wagonHp($);if(K!==Y)return K<Y;return J.ownedRows(Q)<J.ownedRows($)}pushCols(J,Q){let $=this.pickPushCenter(J,Q);return[$-1,$,$+1].filter((Z)=>Z>=0&&Z<8)}plan(J,Q){let $=this.cfg,Z=$.mode,W=0,K=0;for(let H of J.onBoard(Q))W+=J.costs[H.arch]+H.hp;for(let H of J.onBoard(1-Q))K+=J.costs[H.arch]+H.hp;let Y=W>=$.convert_mult*Math.max(1,K);if(Z==="sandbag"&&J.round>$.sandbag_until)Z="push";if((Z==="auto"||Z==="hold")&&J.round>=this.clock(J,"desperation_round")&&this.behind(J,Q))Z="push";if((Z==="auto"||Z==="hold")&&J.round>=this.clock(J,"force_push_round"))Z="push";if(Y&&Z!=="runner")Z="push";if(Z==="auto")Z=W>=$.push_margin*K?"push":"hold";this._convert=Y;let X={mode:Z,convert:Y,threats:this.threatenedCols(J,Q)};if(Z==="push"||Z==="runner"){X.push_cols=this.pushCols(J,Q);let H=J.wagons[1-Q].filter((U)=>U.hp>0);if(H.length){let U=X.push_cols[Math.floor(X.push_cols.length/2)];X.wagon_target=XQ(H,(q)=>[Math.abs(q.col-U),q.col]).col}}return X}orders(J,Q,$){let Z=this.plan(J,Q),W={},K=this._assignDefenders(J,Q,Z),Y={};for(let X of J.onBoard(Q))W[X.uid]=this._unitOrder(J,Q,X,Z,K,Y);return W}_assignDefenders(J,Q,$){let Z={},W=new Set;for(let K of $.threats){let Y=null,X=null;for(let H of J.onBoard(Q)){if(W.has(H.uid)||J.beyondOwn(H))continue;let U=Math.abs(H.pos[0]-K)+0.1*J.costs[H.arch];if(X===null||U<X)Y=H,X=U}if(Y!==null&&X!==null&&X<=3.5)Z[Y.uid]=K,W.add(Y.uid)}if(this.cfg.rearguard&&$.mode==="push"){let K=0;for(let H of J.onBoard(1-Q))if(J.territoryOf(H.pos)===1-Q)K++;let Y=[...new Set(J.wagons[Q].filter((H)=>H.hp>0).map((H)=>H.col))].sort((H,U)=>H-U),X=Math.min(this.cfg.rearguard,Math.floor(K/2),Y.length);for(let H of Y){if(X<=0)break;if(Object.values(Z).includes(H))continue;let U=null,q=null;for(let G of J.onBoard(Q)){if(W.has(G.uid)||J.beyondOwn(G))continue;let N=Math.abs(G.pos[0]-H)+0.1*J.costs[G.arch];if(q===null||N<q)U=G,q=N}if(U!==null)Z[U.uid]=H,W.add(U.uid),X--}}return Z}_targetScore(J,Q,$,Z,W=!1){let K=J.attackDamage($,Z,W,!W);return(K>=Z.hp?10:0)+2*(YQ[$.arch]===Z.arch?1:0)+(6-Z.hp)*0.5+K+(Z.uid===(J.standard_bearer[1-Q]??-1)?3:0)+(Z.arch==="hero"?2:0)+this.tb("tgt",$.uid,Z.uid)}_attackAllowed(J,Q,$){let Z=this.cfg.attack_scope;if(this._convert)Z="any";if(Z==="any")return!0;let W=J.territoryOf($.pos)===Q;if(Z==="own_half")return W;if(Z==="own_half_superior"){if(!W)return!1;let K=0,Y=0;for(let X of J.onBoard(Q))if(s0(X.pos,$.pos)<=2)K++;for(let X of J.onBoard(1-Q))if(s0(X.pos,$.pos)<=2)Y++;return K>=Y+1}return!0}bfs(J,Q,$){if($<=0)return new Map([[GJ(Q.pos),[]]]);let Z=new Set;for(let Y of J.onBoard(1-Q.owner))for(let X of NJ(Y.pos))Z.add(GJ(X));let W=new Map([[GJ(Q.pos),[]]]),K=[[Q.pos,[]]];for(let Y=0;Y<$;Y++){let X=[];for(let[H,U]of K){if(GJ(H)!==GJ(Q.pos)&&Z.has(GJ(H)))continue;for(let q of NJ(H)){if(W.has(GJ(q))||J.occupied(q))continue;let G=[...U,q];W.set(GJ(q),G),X.push([q,G])}}K=X}return W}_unitOrder(J,Q,$,Z,W,K){let Y=this.cfg,X=[];for(let q of NJ($.pos)){let G=J.board.get(GJ(q));if(G!==void 0&&J.units.get(G).owner!==Q)X.push(J.units.get(G))}if($.arch==="siege")return this._siegeOrder(J,Q,$,Z);if($.arch==="archer"){let q=J.onBoard(1-Q).filter((G)=>s0($.pos,G.pos)===2&&this._attackAllowed(J,Q,G));if(q.length)return["SHOOT",["U",l7(q,(G)=>this._targetScore(J,Q,$,G)).uid]];if(X.length){let G=l7(X,(N)=>this._targetScore(J,Q,$,N));if(this._attackAllowed(J,Q,G))return["MELEE",G.uid,[]]}return this._moveOrder(J,Q,$,Z,W,K,2)}if($.arch==="cav"&&!$.exhausted){let q=this._findCharge(J,Q,$);if(q!==null)return q}if(X.length){let q=X.filter((G)=>this._attackAllowed(J,Q,G));if(q.length)return["MELEE",l7(q,(G)=>this._targetScore(J,Q,$,G)).uid,[]]}let H=this.bfs(J,$,$.mv),U=null;for(let q of J.onBoard(1-Q)){if(!this._attackAllowed(J,Q,q))continue;for(let G of NJ(q.pos)){if(GJ(G)===GJ($.pos))continue;let N=H.get(GJ(G));if(N!==void 0){let F=this._targetScore(J,Q,$,q)-0.3*N.length;if(q.arch==="spear"&&q.braced&&$.arch==="cav")F-=6;if(U===null||F>U[0])U=[F,q,N]}}}if(U!==null&&U[0]>1.5)return["MELEE",U[1].uid,U[2]];if($.arch==="spear"&&!$.exhausted){let q=J.onBoard(1-Q).some((N)=>s0($.pos,N.pos)<=Y.brace_radius),G=Z.mode==="hold"||!J.beyondOwn($);if(q&&G&&!($.uid in W))return["BRACE"]}return this._moveOrder(J,Q,$,Z,W,K,0,H)}_findCharge(J,Q,$){let Z=this.bfs(J,$,$.mv),W=null;for(let K of J.onBoard(1-Q)){if(!this._attackAllowed(J,Q,K))continue;if(K.arch==="spear"&&K.braced)continue;if(J.terrain_on&&J.ttype.get(GJ(K.pos))==="woods")continue;for(let Y of NJ(K.pos)){let X=Z.get(GJ(Y));if(X===void 0||X.length<J.C.CHARGE_MOVE_MIN)continue;let H=this._targetScore(J,Q,$,K,!0)-0.2*X.length;if(W===null||H>W[0])W=[H,K,X]}}if(W!==null&&W[0]>2)return["CHARGE",W[1].uid,W[2]];return null}_siegeOrder(J,Q,$,Z){let W=this.cfg;if(Z.mode==="push"){for(let Y of Z.push_cols??[])if(J.palisades.get(Y)===1-Q){let X=J.stakes[Y];if([[Y,X-1],[Y,X]].some((H)=>$.rmin<=s0($.pos,H)&&s0($.pos,H)<=$.rmax))return["SHOOT",["P",Y]]}}if((W.wagon_hunt||Z.convert)&&J.capRemaining(Q)>0)for(let Y=0;Y<J.wagons[1-Q].length;Y++){let X=J.wagons[1-Q][Y];if(X.hp<=0)continue;let H=[X.col,J.backRow(1-Q)];if($.rmin<=s0($.pos,H)&&s0($.pos,H)<=$.rmax)return["SHOOT",["W",1-Q,Y]]}let K=J.onBoard(1-Q).filter((Y)=>$.rmin<=s0($.pos,Y.pos)&&s0($.pos,Y.pos)<=$.rmax&&this._attackAllowed(J,Q,Y));if(K.length)return["SHOOT",["U",l7(K,(Y)=>this._targetScore(J,Q,$,Y)).uid]];return this._moveOrder(J,Q,$,Z,{},{},2)}_moveOrder(J,Q,$,Z,W,K,Y=0,X){let H=this.cfg,U=this._goalTile(J,Q,$,Z,W,K);if(U===null)return["HOLD"];if(X===void 0)X=this.bfs(J,$,$.mv);let q=J.onBoard(1-Q),G=null,N=null;for(let[F,R]of X){let B=F.split(",").map(Number),E=-s0(B,U);if(Y&&q.length){let M=Math.min(...q.map((L)=>s0(B,L.pos)));if(M<Y)E-=(Y-M)*2}if(H.avoid_lone&&J.territoryOf(B)!==Q){if(!J.onBoard(Q).some((L)=>L.uid!==$.uid&&L.owner===Q&&s0(L.pos,B)<=J.C.LONE_RUNNER_RADIUS))E-=4}if(E+=0.1*this.tb("mv",$.uid,B),N===null||E>N)G=[B,R],N=E}if(G===null||!G[1].length)return["HOLD"];return["MOVE",G[1]]}_goalTile(J,Q,$,Z,W,K){let Y=this.cfg;if($.uid in W){let G=W[$.uid];return[G,this.ownFrontRow(J,Q,G)]}let X=Z.mode;if(X==="sandbag"){let G=[...new Set(J.wagons[Q].filter((F)=>F.hp>0).map((F)=>F.col))].sort((F,R)=>F-R);if(!G.length)G=[3];let N=d7(G,(F)=>Math.abs(F-$.pos[0]));return[N,this.ownFrontRow(J,Q,N)]}if(X==="runner"&&$.arch==="cav")return[d7([...Array(8).keys()],(N)=>J.onBoard(1-Q).filter((F)=>F.pos[0]===N).length+0.1*this.tb("run",$.uid,N)),J.backRow(1-Q)];if(X==="push"||X==="runner"){let G=Z.push_cols&&Z.push_cols.length?Z.push_cols:[3,4],N=d7(G,(B)=>Math.abs(B-$.pos[0])+0.7*(K[String(B)]??0));if(K[String(N)]=(K[String(N)]??0)+1,Z.convert||J.round>=this.clock(J,"breach_round")||this.stakeAtMax(J,Q,N)){let B=Z.wagon_target;if(B!==void 0&&B!==null){let D=K.breach??0;K.breach=D+1;let E=[0,1,-1,0,1,-1,2,-2][D%8],M=Math.max(0,Math.min(7,B+E)),L=J.backRow(1-Q)-this.dirn(Q);return[M,L]}return[N,J.backRow(1-Q)]}let F=Y.depth,R=this.firstBeyondRow(J,Q,N)+(F-1)*this.dirn(Q);return R=Math.max(0,Math.min(7,R)),[N,R]}let H=this.dangerCols(J,Q),U=[...Array(8).keys()].filter((G)=>H[G]>0);if(!U.length)U=[$.pos[0]];let q=d7(U,(G)=>Math.abs(G-$.pos[0])+0.7*(K[String(G)]??0));return K[String(q)]=(K[String(q)]??0)+1,[q,this.ownFrontRow(J,Q,q)]}intervention(J,Q,$){let Z=J.C,W=J.res[Q].tribute;if($<=2&&W>=Z.SHIELDBEARER_COST){let K=J.standardUnit(Q);if(K!==null&&K.hp<=4){let Y=0;for(let H of NJ(K.pos)){let U=J.board.get(GJ(H));if(U!==void 0&&J.units.get(U).owner!==Q)Y++}let X=NJ(K.pos).some((H)=>{let U=J.board.get(GJ(H));if(U===void 0)return!1;let q=J.units.get(U);return q.owner===Q&&(q.arch==="spear"||q.arch==="sword")});if(Y>=2&&X&&!J.wards.some((H)=>H.uid===K.uid&&H.active))return["SHIELDBEARER",K.uid]}}if($===3&&W>=Z.SURGE_COST){for(let K of this.threatenedCols(J,Q))for(let Y of J.onBoard(Q)){if(!J.unbroken(Y))continue;for(let X of NJ(Y.pos)){if(J.occupied(X)||!P9(X))continue;if(X[0]===K&&J.territoryOf(X)===Q)return["SURGE",Y.uid,X]}}for(let K=0;K<8;K++){let[Y,X]=J.columnClaims(K);if(Q===0?Y:X)continue;let U=!0;for(let q of J.onBoard(1-Q))if(q.pos[0]===K&&J.territoryOf(q.pos)===1-Q&&J.unbroken(q)){U=!1;break}if(!U)continue;for(let q of J.onBoard(Q)){if(q.exhausted||J.beyondOwn(q))continue;for(let G of NJ(q.pos)){if(J.occupied(G))continue;if(G[0]===K&&J.territoryOf(G)!==Q){if(J.onBoard(Q).some((F)=>F.uid!==q.uid&&F.owner===Q&&s0(F.pos,G)<=J.C.LONE_RUNNER_RADIUS))return["SURGE",q.uid,G]}}}}}return null}trampleChoice(J,Q,$,Z){if(this.cfg.trample==="raid")return"raid";if(this.cfg.trample==="annex"){if(Z.type==="crop"&&J.round>=J.C.EXHAUSTION_START_ROUND-2)return"raid";return"annex"}return"raid"}lastStand(J,Q){if(J.reserve(Q).length>=2)return 1;if(this.cfg.mode==="hold")return 3;return 2}entrenchCols(J,Q){let $=this.dangerCols(J,Q);return[...Array(8).keys()].filter((Z)=>!J.palisades.has(Z)).sort((Z,W)=>k8([-$[Z],this.tb("ent",Z)],[-$[W],this.tb("ent",W)]))}promoT2(J,Q,$){return $.arch==="spear"||$.arch==="hero"?"guard":"atk"}breachTarget(J,Q,$,Z){return XQ(Z,(W)=>[W[1].hp,W[1].col])[0]}artifactPick(J,Q,$){let Z=this._projCropIncome(J,Q)<J.onBoard(Q).length,W=this.cfg.mode,K;if(W==="push"||W==="runner"||W==="sandbag")K=Z?[2,1,4,7,6,3,8,5]:[1,4,7,3,6,2,8,5];else K=Z?[2,8,5,1,3,6,4,7]:[8,5,1,3,2,6,4,7];for(let Y of K)if($.includes(Y))return Y;return $[0]}routAllocate(J,Q,$,Z){let W=new Map;J.wagons[$].forEach((Y,X)=>{if(Y.hp>0)W.set(X,Y.hp)});let K=[];for(let Y=0;Y<Z;Y++){if(!W.size)break;let X=XQ([...W.keys()],(H)=>[W.get(H),H]);if(K.push(X),W.set(X,W.get(X)-1),W.get(X)<=0)W.delete(X)}return K}}function mZ(J){return new u7(J)}var AY={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0};class HQ extends u7{label;pendingFeed=null;pendingBuild=null;pendingReinforce=null;pendingSB=null;pendingOrders={};pendingIntervention={};tramplePref="annex";constructor(J="You"){super("HONEST");this.label=J}feedOrder(J,Q){return this.pendingFeed??super.feedOrder(J,Q)}build(J,Q){return this.pendingBuild??[]}reinforce(J,Q){return this.pendingReinforce??{...AY}}standardBearer(J,Q){return this.pendingSB}orders(J,Q,$){return this.pendingOrders[$]??{}}intervention(J,Q,$){return this.pendingIntervention[$]??null}trampleChoice(J,Q,$,Z){if(this.tramplePref==="raid")return"raid";if(Z.type==="crop"&&J.round>=J.C.EXHAUSTION_START_ROUND-2)return"raid";return"annex"}clearPhase(){this.pendingFeed=null,this.pendingBuild=null,this.pendingReinforce=null,this.pendingSB=null,this.pendingOrders={},this.pendingIntervention={}}}var _9=(J)=>`${J[0]},${J[1]}`;function PY(J,Q,$){if($<=0)return new Map([[_9(Q.pos),[]]]);let Z=new Set;for(let Y of J.onBoard(1-Q.owner))for(let X of NJ(Y.pos))Z.add(_9(X));let W=new Map([[_9(Q.pos),[]]]),K=[[Q.pos,[]]];for(let Y=0;Y<$;Y++){let X=[];for(let[H,U]of K){if(_9(H)!==_9(Q.pos)&&Z.has(_9(H)))continue;for(let q of NJ(H)){if(W.has(_9(q))||J.occupied(q))continue;let G=[...U,q];W.set(_9(q),G),X.push([q,G])}}K=X}return W}function W7(J,Q){let $=Q.braced?0:Q.mv,Z=PY(J,Q,$),W=new Map;for(let[H,U]of Z)if(U.length)W.set(H,U);let K=[],Y=[],X=[];if(Q.arch==="archer"||Q.arch==="siege"){for(let H of J.onBoard(1-Q.owner))if(Q.rmin<=s0(Q.pos,H.pos)&&s0(Q.pos,H.pos)<=Q.rmax)X.push(H.uid)}if(Q.arch!=="siege")for(let H of J.onBoard(1-Q.owner)){if(s0(Q.pos,H.pos)===1){K.push({uid:H.uid,path:[]});continue}let U=null;for(let q of NJ(H.pos)){let G=Z.get(_9(q));if(G&&(U===null||G.length<U.length))U=G}if(U)K.push({uid:H.uid,path:U})}if(Q.arch==="cav"&&!Q.exhausted)for(let H of J.onBoard(1-Q.owner)){if(H.arch==="spear"&&H.braced)continue;let U=null;for(let q of NJ(H.pos)){let G=Z.get(_9(q));if(G&&G.length>=J.C.CHARGE_MOVE_MIN&&(U===null||G.length<U.length))U=G}if(U)Y.push({uid:H.uid,path:U})}return{moves:W,meleeTargets:K,shootTargets:X,chargeTargets:Y,canBrace:Q.arch==="spear"&&!Q.braced}}var c7=["egyptian","gaul","hun","persian","roman","spartan","teuton","viking"],n7={egyptian_archer:"../art/renders/limes_roster_28_egyptian_archer_00001_.png",egyptian_cav:"../art/renders/limes_roster_27_egyptian_cavalry_00001_.png",egyptian_hero:"../art/renders/limes_roster_30_egyptian_hero_high_priest_sebek_00001_.png",egyptian_siege:"../art/renders/limes_roster_29_egyptian_siege_00001_.png",egyptian_spear:"../art/renders/limes_roster_25_egyptian_spearman_00001_.png",egyptian_sword:"../art/renders/limes_roster_26_egyptian_swordsman_00001_.png",gaul_archer:"../art/renders/limes_roster_10_gaul_archer_00001_.png",gaul_cav:"../art/renders/limes_roster_09_gaul_cavalry_00001_.png",gaul_hero:"../art/renders/limes_roster_12_gaul_hero_druidess_eponia_00001_.png",gaul_siege:"../art/renders/limes_roster_11_gaul_siege_00001_.png",gaul_spear:"../art/renders/limes_roster_07_gaul_spearman_00001_.png",gaul_sword:"../art/renders/limes_roster_08_gaul_swordsman_00001_.png",hun_archer:"../art/renders/limes_roster_22_hun_archer_00001_.png",hun_cav:"../art/renders/limes_roster_21_hun_cavalry_00001_.png",hun_hero:"../art/renders/limes_roster_24_hun_hero_khan_bayan_00001_.png",hun_siege:"../art/renders/limes_roster_23_hun_siege_00001_.png",hun_spear:"../art/renders/limes_roster_19_hun_spearman_00001_.png",hun_sword:"../art/renders/limes_roster_20_hun_swordsman_00001_.png",persian_archer:"../art/renders/limes_roster_46_persian_archer_00001_.png",persian_cav:"../art/renders/limes_roster_45_persian_cavalry_00001_.png",persian_hero:"../art/renders/limes_roster_48_persian_hero_satrap_darius_00001_.png",persian_siege:"../art/renders/limes_roster_47_persian_siege_00001_.png",persian_spear:"../art/renders/limes_roster_43_persian_spearman_00001_.png",persian_sword:"../art/renders/limes_roster_44_persian_swordsman_00001_.png",roman_archer:"../art/renders/limes_roster_04_roman_archer_00001_.png",roman_cav:"../art/renders/limes_roster_03_roman_cavalry_00001_.png",roman_hero:"../art/renders/limes_roster_06_roman_hero_legatus_marcus_00001_.png",roman_siege:"../art/renders/limes_roster_05_roman_siege_00001_.png",roman_spear:"../art/renders/limes_roster_01_roman_spearman_00001_.png",roman_sword:"../art/renders/limes_roster_02_roman_swordsman_00001_.png",spartan_archer:"../art/renders/limes_roster_40_spartan_archer_00001_.png",spartan_cav:"../art/renders/limes_roster_39_spartan_cavalry_00001_.png",spartan_hero:"../art/renders/limes_roster_42_spartan_hero_king_leonis_00001_.png",spartan_siege:"../art/renders/limes_roster_41_spartan_siege_00001_.png",spartan_spear:"../art/renders/limes_roster_37_spartan_spearman_00001_.png",spartan_sword:"../art/renders/limes_roster_38_spartan_swordsman_00001_.png",teuton_archer:"../art/renders/limes_roster_16_teuton_archer_00001_.png",teuton_cav:"../art/renders/limes_roster_15_teuton_cavalry_00001_.png",teuton_hero:"../art/renders/limes_roster_18_teuton_hero_warlord_drengr_00001_.png",teuton_siege:"../art/renders/limes_roster_17_teuton_siege_00001_.png",teuton_spear:"../art/renders/limes_roster_13_teuton_spearman_00001_.png",teuton_sword:"../art/renders/limes_roster_14_teuton_swordsman_00001_.png",viking_archer:"../art/renders/limes_roster_34_viking_archer_00001_.png",viking_cav:"../art/renders/limes_roster_33_viking_cavalry_00001_.png",viking_hero:"../art/renders/limes_roster_36_viking_hero_jarl_sigrid_00001_.png",viking_siege:"../art/renders/limes_roster_35_viking_siege_00001_.png",viking_spear:"../art/renders/limes_roster_31_viking_spearman_00001_.png",viking_sword:"../art/renders/limes_roster_32_viking_swordsman_00001_.png"};var H9={spear:"Spearman",sword:"Swordsman",cav:"Cavalry",archer:"Archer",siege:"Siege",hero:"Hero"},s7={roman:"#a32638",spartan:"#c4622d",hun:"#d9a418",gaul:"#3e7a3a",egyptian:"#2aa198",viking:"#2b4f81",persian:"#5b3a8e",teuton:"#6e7378"},wY={p0tribe:"roman",p1tribe:"viking"},I8=(J)=>J.replace(/[&<>"]/g,(Q)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[Q]),lZ=(J)=>J.charAt(0).toUpperCase()+J.slice(1);function CY(J,Q,$){let Z=n7[`${$}_${Q.arch}`]??"",W=Math.max(0,Math.round(Q.hp/Q.max_hp*100)),K=Q.tier2?"★★":Q.tier1?"★":"",Y=[Q.exhausted?'<span class="flag ex" title="Exhausted">∅</span>':"",Q.braced?'<span class="flag br" title="Braced">⛨</span>':"",Q.face_down?'<span class="flag fd" title="Face-down">?</span>':""].join(""),X=Z?`<img class="billboard" src="${I8(Z)}" alt="${I8(H9[Q.arch])}" loading="lazy">`:`<div class="billboard noimg">${I8(H9[Q.arch][0])}</div>`;return`<div class="unit owner${Q.owner}" style="--c:${s7[$]}">
    ${X}
    <div class="hpbar"><i style="width:${W}%"></i></div>
    <div class="ulabel">${I8(H9[Q.arch])}<span class="hp">${Q.hp}/${Q.max_hp}</span></div>
    ${K?`<span class="tier">${K}</span>`:""}
    ${Y?`<div class="flags">${Y}</div>`:""}
  </div>`}function TY(J,Q,$,Z){return`<div class="wagon owner${J}" style="--c:${s7[Z]}" title="Supply Wagon">
    <div class="wgicon">▣</div><div class="wghp">${Q}/${$}</div></div>`}function SY(J){let Q=J.annexed!==null?J.annexed:J.owner,$=J.type==="crop"?"\uD83C\uDF3E":"⛏";return`<div class="field f-owner${Q}${J.annexed!==null?" annexed":""}" title="${I8(J.type)} field">${$}</div>`}function UQ(J,Q={}){let $={...wY,...Q},Z=(H)=>H===0?$.p0tribe:$.p1tribe,W=new Map;for(let H of J.units.values())if(H.pos)W.set(`${H.pos[0]},${H.pos[1]}`,H);let K=new Map;for(let H=0;H<2;H++)for(let U of J.wagons[H])K.set(`${U.col},${U.row}`,{p:H,hp:U.hp});let Y=[];for(let H=7;H>=0;H--)for(let U=0;U<8;U++){let q=`${U},${H}`,G=H<J.stakes[U]?0:1,N=H===J.stakes[U]-1,F=J.palisades.get(U),R=N&&F!==void 0,B=["cell",`terr${G}`,N?"stakeline":"",R?"has-pal":""].filter(Boolean).join(" "),D="",E=W.get(q),M=K.get(q),L=J.fields.get(q),z=`data-pos="${q}"`;if(E)D=CY(J,E,Z(E.owner)),z+=` data-uid="${E.uid}" data-owner="${E.owner}"`;else if(M)D=TY(M.p,M.hp,J.C.WAGON_HP,Z(M.p));else if(L)D=SY(L);let w=R?`<span class="pal owner${F}" style="--c:${s7[Z(F)]}" title="Palisade"></span>`:"";Y.push(`<div class="${B}" ${z}>${w}${D}</div>`)}let X=(H)=>{let U=Z(H),q=J.res[H];return`<div class="side owner${H}" style="--c:${s7[U]}">
      <div class="stitle">P${H+1} · ${I8(U[0].toUpperCase()+U.slice(1))}${J.komi===H?' <span class="komi" title="Komi holder">⚖</span>':""}</div>
      <div class="stats">
        <span title="Supply">\uD83D\uDEE1 ${q.supply}</span><span title="Crop">\uD83C\uDF3E ${q.crop}</span>
        <span title="Tribute">◆ ${q.tribute}</span><span title="Owned rows">▦ ${J.ownedRows(H)}</span>
        <span title="Wagons alive">▣ ${J.wagonsAlive(H)}/${J.wagons[H].length}</span>
      </div></div>`};return`<div class="hud">
    <div class="round">Round ${J.round}</div>
    ${X(1)}${X(0)}
  </div>
  <div class="board-grid">${Y.join("")}</div>`}function K7(){if(document.getElementById("guide-ov"))return;let J=document.createElement("div");J.id="guide-ov",J.className="overlay",J.innerHTML=`<div class="modal guide"><button class="modal-x" id="guide-x">✕</button>${`
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
</ul>`}</div>`,document.body.appendChild(J),J.addEventListener("click",(Q)=>{if(Q.target===J)dZ()}),document.getElementById("guide-x").addEventListener("click",dZ)}function dZ(){document.getElementById("guide-ov")?.remove()}function GQ(){return'<button class="pbtn guide-btn" id="open-guide">❓ Guide</button>'}function NQ(J=document){J.querySelector("#open-guide")?.addEventListener("click",K7)}var RW="184",o9={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},a9={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},OW=0,xQ=1,MW=2;var O7=1,_6=2,s8=3,i8=0,pJ=1,$9=2,L9=0,M7=1,hQ=2,bQ=3,gQ=4,_W=5;var o8=100,VW=101,LW=102,BW=103,zW=104,kW=200,IW=201,AW=202,PW=203,wW=204,CW=205,TW=206,SW=207,jW=208,yW=209,fW=210,vW=211,xW=212,hW=213,bW=214,gW=0,pW=1,mW=2,pQ=3,lW=4,dW=5,uW=6,cW=7,nW=0,sW=1,iW=2,D9=0,mQ=1,lQ=2,dQ=3,uQ=4,cQ=5,nQ=6,sQ=7;var a8=301,H8=302,V6=303,L6=304,_7=306,oW=1000,B6=1001,aW=1002,r9=1003,rW=1004;var V7=1005;var mJ=1006,z6=1007;var U8=1008;var E9=1009,tW=1010,eW=1011,L7=1012,iQ=1013,t9=1014,x9=1015,h9=1016,oQ=1017,aQ=1018,r8=1020,JK=35902,QK=35899,$K=1021,ZK=1022,B9=1023,G8=1026,N8=1027,WK=1028,rQ=1029,q8=1030,tQ=1031;var eQ=1033,k6=33776,I6=33777,A6=33778,P6=33779,J$=35840,Q$=35841,$$=35842,Z$=35843,W$=36196,K$=37492,Y$=37496,X$=37488,H$=37489,w6=37490,U$=37491,G$=37808,N$=37809,q$=37810,F$=37811,D$=37812,E$=37813,R$=37814,O$=37815,M$=37816,_$=37817,V$=37818,L$=37819,B$=37820,z$=37821,k$=36492,I$=36494,A$=36495,P$=36283,w$=36284,C6=36285,C$=36286;var T$=0,KK=1,F8="",B7="srgb",S$="srgb-linear",j$="linear",XJ="srgb";var YK=512,XK=513,HK=514,T6=515,UK=516,GK=517,S6=518,NK=519;var y$="300 es",f$=2000;function jY(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function yY(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function u8(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function qK(){let J=u8("canvas");return J.style.display="block",J}var uZ={},c8=null;function E7(...J){let Q="THREE."+J.shift();if(c8)c8("log",Q,...J);else console.log(Q,...J)}function FK(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function A0(...J){J=FK(J);let Q="THREE."+J.shift();if(c8)c8("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function C0(...J){J=FK(J);let Q="THREE."+J.shift();if(c8)c8("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function M6(...J){let Q=J.join(" ");if(Q in uZ)return;uZ[Q]=!0,A0(...J)}function DK(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}var EK={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class z9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}var yJ=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cZ=1234567,F7=Math.PI/180,n8=180/Math.PI;function y9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(yJ[J&255]+yJ[J>>8&255]+yJ[J>>16&255]+yJ[J>>24&255]+"-"+yJ[Q&255]+yJ[Q>>8&255]+"-"+yJ[Q>>16&15|64]+yJ[Q>>24&255]+"-"+yJ[$&63|128]+yJ[$>>8&255]+"-"+yJ[$>>16&255]+yJ[$>>24&255]+yJ[Z&255]+yJ[Z>>8&255]+yJ[Z>>16&255]+yJ[Z>>24&255]).toLowerCase()}function l0(J,Q,$){return Math.max(Q,Math.min($,J))}function v$(J,Q){return(J%Q+Q)%Q}function fY(J,Q,$,Z,W){return Z+(J-Q)*(W-Z)/($-Q)}function vY(J,Q,$){if(J!==Q)return($-J)/(Q-J);else return 0}function D7(J,Q,$){return(1-$)*J+$*Q}function xY(J,Q,$,Z){return D7(J,Q,1-Math.exp(-$*Z))}function hY(J,Q=1){return Q-Math.abs(v$(J,Q*2)-Q)}function bY(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*(3-2*J)}function gY(J,Q,$){if(J<=Q)return 0;if(J>=$)return 1;return J=(J-Q)/($-Q),J*J*J*(J*(J*6-15)+10)}function pY(J,Q){return J+Math.floor(Math.random()*(Q-J+1))}function mY(J,Q){return J+Math.random()*(Q-J)}function lY(J){return J*(0.5-Math.random())}function dY(J){if(J!==void 0)cZ=J;let Q=cZ+=1831565813;return Q=Math.imul(Q^Q>>>15,Q|1),Q^=Q+Math.imul(Q^Q>>>7,Q|61),((Q^Q>>>14)>>>0)/4294967296}function uY(J){return J*F7}function cY(J){return J*n8}function nY(J){return(J&J-1)===0&&J!==0}function sY(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function iY(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function oY(J,Q,$,Z,W){let{cos:K,sin:Y}=Math,X=K($/2),H=Y($/2),U=K((Q+Z)/2),q=Y((Q+Z)/2),G=K((Q-Z)/2),N=Y((Q-Z)/2),F=K((Z-Q)/2),R=Y((Z-Q)/2);switch(W){case"XYX":J.set(X*q,H*G,H*N,X*U);break;case"YZY":J.set(H*N,X*q,H*G,X*U);break;case"ZXZ":J.set(H*G,H*N,X*q,X*U);break;case"XZX":J.set(X*q,H*R,H*F,X*U);break;case"YXY":J.set(H*F,X*q,H*R,X*U);break;case"ZYZ":J.set(H*R,H*F,X*q,X*U);break;default:A0("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+W)}}function F9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("Invalid component type.")}}function t0(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("Invalid component type.")}}var x$={DEG2RAD:F7,RAD2DEG:n8,generateUUID:y9,clamp:l0,euclideanModulo:v$,mapLinear:fY,inverseLerp:vY,lerp:D7,damp:xY,pingpong:hY,smoothstep:bY,smootherstep:gY,randInt:pY,randFloat:mY,randFloatSpread:lY,seededRandom:dY,degToRad:uY,radToDeg:cY,isPowerOfTwo:nY,ceilPowerOfTwo:sY,floorPowerOfTwo:iY,setQuaternionFromProperEuler:oY,normalize:t0,denormalize:F9};class k0{static{k0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=l0(this.x,J.x,Q.x),this.y=l0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=l0(this.x,J,Q),this.y=l0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(l0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(l0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Z9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,Y){let X=$[Z+0],H=$[Z+1],U=$[Z+2],q=$[Z+3],G=W[K+0],N=W[K+1],F=W[K+2],R=W[K+3];if(q!==R||X!==G||H!==N||U!==F){let B=X*G+H*N+U*F+q*R;if(B<0)G=-G,N=-N,F=-F,R=-R,B=-B;let D=1-Y;if(B<0.9995){let E=Math.acos(B),M=Math.sin(E);D=Math.sin(D*E)/M,Y=Math.sin(Y*E)/M,X=X*D+G*Y,H=H*D+N*Y,U=U*D+F*Y,q=q*D+R*Y}else{X=X*D+G*Y,H=H*D+N*Y,U=U*D+F*Y,q=q*D+R*Y;let E=1/Math.sqrt(X*X+H*H+U*U+q*q);X*=E,H*=E,U*=E,q*=E}}J[Q]=X,J[Q+1]=H,J[Q+2]=U,J[Q+3]=q}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let Y=$[Z],X=$[Z+1],H=$[Z+2],U=$[Z+3],q=W[K],G=W[K+1],N=W[K+2],F=W[K+3];return J[Q]=Y*F+U*q+X*N-H*G,J[Q+1]=X*F+U*G+H*q-Y*N,J[Q+2]=H*F+U*N+Y*G-X*q,J[Q+3]=U*F-Y*q-X*G-H*N,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,Y=Math.cos,X=Math.sin,H=Y($/2),U=Y(Z/2),q=Y(W/2),G=X($/2),N=X(Z/2),F=X(W/2);switch(K){case"XYZ":this._x=G*U*q+H*N*F,this._y=H*N*q-G*U*F,this._z=H*U*F+G*N*q,this._w=H*U*q-G*N*F;break;case"YXZ":this._x=G*U*q+H*N*F,this._y=H*N*q-G*U*F,this._z=H*U*F-G*N*q,this._w=H*U*q+G*N*F;break;case"ZXY":this._x=G*U*q-H*N*F,this._y=H*N*q+G*U*F,this._z=H*U*F+G*N*q,this._w=H*U*q-G*N*F;break;case"ZYX":this._x=G*U*q-H*N*F,this._y=H*N*q+G*U*F,this._z=H*U*F-G*N*q,this._w=H*U*q+G*N*F;break;case"YZX":this._x=G*U*q+H*N*F,this._y=H*N*q+G*U*F,this._z=H*U*F-G*N*q,this._w=H*U*q-G*N*F;break;case"XZY":this._x=G*U*q-H*N*F,this._y=H*N*q-G*U*F,this._z=H*U*F+G*N*q,this._w=H*U*q+G*N*F;break;default:A0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],Y=Q[5],X=Q[9],H=Q[2],U=Q[6],q=Q[10],G=$+Y+q;if(G>0){let N=0.5/Math.sqrt(G+1);this._w=0.25/N,this._x=(U-X)*N,this._y=(W-H)*N,this._z=(K-Z)*N}else if($>Y&&$>q){let N=2*Math.sqrt(1+$-Y-q);this._w=(U-X)/N,this._x=0.25*N,this._y=(Z+K)/N,this._z=(W+H)/N}else if(Y>q){let N=2*Math.sqrt(1+Y-$-q);this._w=(W-H)/N,this._x=(Z+K)/N,this._y=0.25*N,this._z=(X+U)/N}else{let N=2*Math.sqrt(1+q-$-Y);this._w=(K-Z)/N,this._x=(W+H)/N,this._y=(X+U)/N,this._z=0.25*N}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(l0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,Y=Q._x,X=Q._y,H=Q._z,U=Q._w;return this._x=$*U+K*Y+Z*H-W*X,this._y=Z*U+K*X+W*Y-$*H,this._z=W*U+K*H+$*X-Z*Y,this._w=K*U-$*Y-Z*X-W*H,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,Y=this.dot(J);if(Y<0)$=-$,Z=-Z,W=-W,K=-K,Y=-Y;let X=1-Q;if(Y<0.9995){let H=Math.acos(Y),U=Math.sin(H);X=Math.sin(X*H)/U,Q=Math.sin(Q*H)/U,this._x=this._x*X+$*Q,this._y=this._y*X+Z*Q,this._z=this._z*X+W*Q,this._w=this._w*X+K*Q,this._onChangeCallback()}else this._x=this._x*X+$*Q,this._y=this._y*X+Z*Q,this._z=this._z*X+W*Q,this._w=this._w*X+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class y{static{y.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(nZ.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(nZ.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,Y=J.z,X=J.w,H=2*(K*Z-Y*$),U=2*(Y*Q-W*Z),q=2*(W*$-K*Q);return this.x=Q+X*H+K*q-Y*U,this.y=$+X*U+Y*H-W*q,this.z=Z+X*q+W*U-K*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=l0(this.x,J.x,Q.x),this.y=l0(this.y,J.y,Q.y),this.z=l0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=l0(this.x,J,Q),this.y=l0(this.y,J,Q),this.z=l0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(l0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,Y=Q.y,X=Q.z;return this.x=Z*X-W*Y,this.y=W*K-$*X,this.z=$*Y-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return qQ.copy(this).projectOnVector(J),this.sub(qQ)}reflect(J){return this.sub(qQ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(l0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var qQ=new y,nZ=new Z9;class j0{static{j0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,Y,X,H){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,Y,X,H)}set(J,Q,$,Z,W,K,Y,X,H){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=Y,U[3]=Q,U[4]=W,U[5]=X,U[6]=$,U[7]=K,U[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],Y=$[3],X=$[6],H=$[1],U=$[4],q=$[7],G=$[2],N=$[5],F=$[8],R=Z[0],B=Z[3],D=Z[6],E=Z[1],M=Z[4],L=Z[7],z=Z[2],w=Z[5],P=Z[8];return W[0]=K*R+Y*E+X*z,W[3]=K*B+Y*M+X*w,W[6]=K*D+Y*L+X*P,W[1]=H*R+U*E+q*z,W[4]=H*B+U*M+q*w,W[7]=H*D+U*L+q*P,W[2]=G*R+N*E+F*z,W[5]=G*B+N*M+F*w,W[8]=G*D+N*L+F*P,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],H=J[7],U=J[8];return Q*K*U-Q*Y*H-$*W*U+$*Y*X+Z*W*H-Z*K*X}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],H=J[7],U=J[8],q=U*K-Y*H,G=Y*X-U*W,N=H*W-K*X,F=Q*q+$*G+Z*N;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/F;return J[0]=q*R,J[1]=(Z*H-U*$)*R,J[2]=(Y*$-Z*K)*R,J[3]=G*R,J[4]=(U*Q-Z*X)*R,J[5]=(Z*W-Y*Q)*R,J[6]=N*R,J[7]=($*X-H*Q)*R,J[8]=(K*Q-$*W)*R,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,Y){let X=Math.cos(W),H=Math.sin(W);return this.set($*X,$*H,-$*(X*K+H*Y)+K+J,-Z*H,Z*X,-Z*(-H*K+X*Y)+Y+Q,0,0,1),this}scale(J,Q){return this.premultiply(FQ.makeScale(J,Q)),this}rotate(J){return this.premultiply(FQ.makeRotation(-J)),this}translate(J,Q){return this.premultiply(FQ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var FQ=new j0,sZ=new j0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),iZ=new j0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function aY(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,Y){if(this.enabled===!1||K===Y||!K||!Y)return W;if(this.spaces[K].transfer==="srgb")W.r=f9(W.r),W.g=f9(W.g),W.b=f9(W.b);if(this.spaces[K].primaries!==this.spaces[Y].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[Y].fromXYZ);if(this.spaces[Y].transfer==="srgb")W.r=d8(W.r),W.g=d8(W.g),W.b=d8(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,Y){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[Y].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return M6("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return M6("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:sZ,fromXYZ:iZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:sZ,fromXYZ:iZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var c0=aY();function f9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function d8(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var A8;class h${static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(A8===void 0)A8=u8("canvas");A8.width=J.width,A8.height=J.height;let Z=A8.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=A8}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=u8("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=f9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(f9(Q[$]/255)*255);else Q[$]=f9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return A0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var rY=0;class z7{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rY++}),this.uuid=y9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,Y=Z.length;K<Y;K++)if(Z[K].isDataTexture)W.push(DQ(Z[K].image));else W.push(DQ(Z[K]))}else W=DQ(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function DQ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return h$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return A0("Texture: Unable to serialize Texture."),{}}var tY=0,EQ=new y;class PJ extends z9{constructor(J=PJ.DEFAULT_IMAGE,Q=PJ.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,Y=1023,X=1009,H=PJ.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:tY++}),this.uuid=y9(),this.name="",this.source=new z7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=H,this.format=Y,this.internalFormat=null,this.type=X,this.offset=new k0(0,0),this.repeat=new k0(1,1),this.center=new k0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new j0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(EQ).x}get height(){return this.source.getSize(EQ).y}get depth(){return this.source.getSize(EQ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){A0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){A0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}PJ.DEFAULT_IMAGE=null;PJ.DEFAULT_MAPPING=300;PJ.DEFAULT_ANISOTROPY=1;class EJ{static{EJ.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,Y=0.1,X=J.elements,H=X[0],U=X[4],q=X[8],G=X[1],N=X[5],F=X[9],R=X[2],B=X[6],D=X[10];if(Math.abs(U-G)<0.01&&Math.abs(q-R)<0.01&&Math.abs(F-B)<0.01){if(Math.abs(U+G)<0.1&&Math.abs(q+R)<0.1&&Math.abs(F+B)<0.1&&Math.abs(H+N+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let M=(H+1)/2,L=(N+1)/2,z=(D+1)/2,w=(U+G)/4,P=(q+R)/4,C=(F+B)/4;if(M>L&&M>z)if(M<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(M),Z=w/$,W=P/$;else if(L>z)if(L<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(L),$=w/Z,W=C/Z;else if(z<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(z),$=P/W,Z=C/W;return this.set($,Z,W,Q),this}let E=Math.sqrt((B-F)*(B-F)+(q-R)*(q-R)+(G-U)*(G-U));if(Math.abs(E)<0.001)E=1;return this.x=(B-F)/E,this.y=(q-R)/E,this.z=(G-U)/E,this.w=Math.acos((H+N+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=l0(this.x,J.x,Q.x),this.y=l0(this.y,J.y,Q.y),this.z=l0(this.z,J.z,Q.z),this.w=l0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=l0(this.x,J,Q),this.y=l0(this.y,J,Q),this.z=l0(this.z,J,Q),this.w=l0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(l0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class b$ extends z9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new EJ(0,0,J,Q),this.scissorTest=!1,this.viewport=new EJ(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new PJ(Z),K=$.count;for(let Y=0;Y<K;Y++)this.textures[Y]=W.clone(),this.textures[Y].isRenderTargetTexture=!0,this.textures[Y].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new z7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class W9 extends b${constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class j6 extends PJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class g$ extends PJ{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qJ{static{qJ.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,Y,X,H,U,q,G,N,F,R,B){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,Y,X,H,U,q,G,N,F,R,B)}set(J,Q,$,Z,W,K,Y,X,H,U,q,G,N,F,R,B){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=Z,D[1]=W,D[5]=K,D[9]=Y,D[13]=X,D[2]=H,D[6]=U,D[10]=q,D[14]=G,D[3]=N,D[7]=F,D[11]=R,D[15]=B,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qJ().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinant()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinant()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/P8.setFromMatrixColumn(J,0).length(),W=1/P8.setFromMatrixColumn(J,1).length(),K=1/P8.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),Y=Math.sin($),X=Math.cos(Z),H=Math.sin(Z),U=Math.cos(W),q=Math.sin(W);if(J.order==="XYZ"){let G=K*U,N=K*q,F=Y*U,R=Y*q;Q[0]=X*U,Q[4]=-X*q,Q[8]=H,Q[1]=N+F*H,Q[5]=G-R*H,Q[9]=-Y*X,Q[2]=R-G*H,Q[6]=F+N*H,Q[10]=K*X}else if(J.order==="YXZ"){let G=X*U,N=X*q,F=H*U,R=H*q;Q[0]=G+R*Y,Q[4]=F*Y-N,Q[8]=K*H,Q[1]=K*q,Q[5]=K*U,Q[9]=-Y,Q[2]=N*Y-F,Q[6]=R+G*Y,Q[10]=K*X}else if(J.order==="ZXY"){let G=X*U,N=X*q,F=H*U,R=H*q;Q[0]=G-R*Y,Q[4]=-K*q,Q[8]=F+N*Y,Q[1]=N+F*Y,Q[5]=K*U,Q[9]=R-G*Y,Q[2]=-K*H,Q[6]=Y,Q[10]=K*X}else if(J.order==="ZYX"){let G=K*U,N=K*q,F=Y*U,R=Y*q;Q[0]=X*U,Q[4]=F*H-N,Q[8]=G*H+R,Q[1]=X*q,Q[5]=R*H+G,Q[9]=N*H-F,Q[2]=-H,Q[6]=Y*X,Q[10]=K*X}else if(J.order==="YZX"){let G=K*X,N=K*H,F=Y*X,R=Y*H;Q[0]=X*U,Q[4]=R-G*q,Q[8]=F*q+N,Q[1]=q,Q[5]=K*U,Q[9]=-Y*U,Q[2]=-H*U,Q[6]=N*q+F,Q[10]=G-R*q}else if(J.order==="XZY"){let G=K*X,N=K*H,F=Y*X,R=Y*H;Q[0]=X*U,Q[4]=-q,Q[8]=H*U,Q[1]=G*q+R,Q[5]=K*U,Q[9]=N*q-F,Q[2]=F*q-N,Q[6]=Y*U,Q[10]=R*q+G}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(eY,J,JX)}lookAt(J,Q,$){let Z=this.elements;if(cJ.subVectors(J,Q),cJ.lengthSq()===0)cJ.z=1;if(cJ.normalize(),d9.crossVectors($,cJ),d9.lengthSq()===0){if(Math.abs($.z)===1)cJ.x+=0.0001;else cJ.z+=0.0001;cJ.normalize(),d9.crossVectors($,cJ)}return d9.normalize(),i7.crossVectors(cJ,d9),Z[0]=d9.x,Z[4]=i7.x,Z[8]=cJ.x,Z[1]=d9.y,Z[5]=i7.y,Z[9]=cJ.y,Z[2]=d9.z,Z[6]=i7.z,Z[10]=cJ.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],Y=$[4],X=$[8],H=$[12],U=$[1],q=$[5],G=$[9],N=$[13],F=$[2],R=$[6],B=$[10],D=$[14],E=$[3],M=$[7],L=$[11],z=$[15],w=Z[0],P=Z[4],C=Z[8],V=Z[12],I=Z[1],d=Z[5],A=Z[9],m=Z[13],c=Z[2],f=Z[6],l=Z[10],b=Z[14],p=Z[3],a=Z[7],Q0=Z[11],F0=Z[15];return W[0]=K*w+Y*I+X*c+H*p,W[4]=K*P+Y*d+X*f+H*a,W[8]=K*C+Y*A+X*l+H*Q0,W[12]=K*V+Y*m+X*b+H*F0,W[1]=U*w+q*I+G*c+N*p,W[5]=U*P+q*d+G*f+N*a,W[9]=U*C+q*A+G*l+N*Q0,W[13]=U*V+q*m+G*b+N*F0,W[2]=F*w+R*I+B*c+D*p,W[6]=F*P+R*d+B*f+D*a,W[10]=F*C+R*A+B*l+D*Q0,W[14]=F*V+R*m+B*b+D*F0,W[3]=E*w+M*I+L*c+z*p,W[7]=E*P+M*d+L*f+z*a,W[11]=E*C+M*A+L*l+z*Q0,W[15]=E*V+M*m+L*b+z*F0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],Y=J[5],X=J[9],H=J[13],U=J[2],q=J[6],G=J[10],N=J[14],F=J[3],R=J[7],B=J[11],D=J[15],E=X*N-H*G,M=Y*N-H*q,L=Y*G-X*q,z=K*N-H*U,w=K*G-X*U,P=K*q-Y*U;return Q*(R*E-B*M+D*L)-$*(F*E-B*z+D*w)+Z*(F*M-R*z+D*P)-W*(F*L-R*w+B*P)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],Y=J[5],X=J[6],H=J[7],U=J[8],q=J[9],G=J[10],N=J[11],F=J[12],R=J[13],B=J[14],D=J[15],E=Q*Y-$*K,M=Q*X-Z*K,L=Q*H-W*K,z=$*X-Z*Y,w=$*H-W*Y,P=Z*H-W*X,C=U*R-q*F,V=U*B-G*F,I=U*D-N*F,d=q*B-G*R,A=q*D-N*R,m=G*D-N*B,c=E*m-M*A+L*d+z*I-w*V+P*C;if(c===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let f=1/c;return J[0]=(Y*m-X*A+H*d)*f,J[1]=(Z*A-$*m-W*d)*f,J[2]=(R*P-B*w+D*z)*f,J[3]=(G*w-q*P-N*z)*f,J[4]=(X*I-K*m-H*V)*f,J[5]=(Q*m-Z*I+W*V)*f,J[6]=(B*L-F*P-D*M)*f,J[7]=(U*P-G*L+N*M)*f,J[8]=(K*A-Y*I+H*C)*f,J[9]=($*I-Q*A-W*C)*f,J[10]=(F*w-R*L+D*E)*f,J[11]=(q*L-U*w-N*E)*f,J[12]=(Y*V-K*d-X*C)*f,J[13]=(Q*d-$*V+Z*C)*f,J[14]=(R*M-F*z-B*E)*f,J[15]=(U*z-q*M+G*E)*f,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,Y=J.y,X=J.z,H=W*K,U=W*Y;return this.set(H*K+$,H*Y-Z*X,H*X+Z*Y,0,H*Y+Z*X,U*Y+$,U*X-Z*K,0,H*X-Z*Y,U*X+Z*K,W*X*X+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,Y=Q._z,X=Q._w,H=W+W,U=K+K,q=Y+Y,G=W*H,N=W*U,F=W*q,R=K*U,B=K*q,D=Y*q,E=X*H,M=X*U,L=X*q,z=$.x,w=$.y,P=$.z;return Z[0]=(1-(R+D))*z,Z[1]=(N+L)*z,Z[2]=(F-M)*z,Z[3]=0,Z[4]=(N-L)*w,Z[5]=(1-(G+D))*w,Z[6]=(B+E)*w,Z[7]=0,Z[8]=(F+M)*P,Z[9]=(B-E)*P,Z[10]=(1-(G+R))*P,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinant();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=P8.set(Z[0],Z[1],Z[2]).length(),Y=P8.set(Z[4],Z[5],Z[6]).length(),X=P8.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;U9.copy(this);let H=1/K,U=1/Y,q=1/X;return U9.elements[0]*=H,U9.elements[1]*=H,U9.elements[2]*=H,U9.elements[4]*=U,U9.elements[5]*=U,U9.elements[6]*=U,U9.elements[8]*=q,U9.elements[9]*=q,U9.elements[10]*=q,Q.setFromRotationMatrix(U9),$.x=K,$.y=Y,$.z=X,this}makePerspective(J,Q,$,Z,W,K,Y=2000,X=!1){let H=this.elements,U=2*W/(Q-J),q=2*W/($-Z),G=(Q+J)/(Q-J),N=($+Z)/($-Z),F,R;if(X)F=W/(K-W),R=K*W/(K-W);else if(Y===2000)F=-(K+W)/(K-W),R=-2*K*W/(K-W);else if(Y===2001)F=-K/(K-W),R=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return H[0]=U,H[4]=0,H[8]=G,H[12]=0,H[1]=0,H[5]=q,H[9]=N,H[13]=0,H[2]=0,H[6]=0,H[10]=F,H[14]=R,H[3]=0,H[7]=0,H[11]=-1,H[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,Y=2000,X=!1){let H=this.elements,U=2/(Q-J),q=2/($-Z),G=-(Q+J)/(Q-J),N=-($+Z)/($-Z),F,R;if(X)F=1/(K-W),R=K/(K-W);else if(Y===2000)F=-2/(K-W),R=-(K+W)/(K-W);else if(Y===2001)F=-1/(K-W),R=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return H[0]=U,H[4]=0,H[8]=0,H[12]=G,H[1]=0,H[5]=q,H[9]=0,H[13]=N,H[2]=0,H[6]=0,H[10]=F,H[14]=R,H[3]=0,H[7]=0,H[11]=0,H[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var P8=new y,U9=new qJ,eY=new y(0,0,0),JX=new y(1,1,1),d9=new y,i7=new y,cJ=new y,oZ=new qJ,aZ=new Z9;class v9{constructor(J=0,Q=0,$=0,Z=v9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],Y=Z[8],X=Z[1],H=Z[5],U=Z[9],q=Z[2],G=Z[6],N=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(l0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,N),this._z=Math.atan2(-K,W);else this._x=Math.atan2(G,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-l0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(Y,N),this._z=Math.atan2(X,H);else this._y=Math.atan2(-q,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(l0(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(-q,N),this._z=Math.atan2(-K,H);else this._y=0,this._z=Math.atan2(X,W);break;case"ZYX":if(this._y=Math.asin(-l0(q,-1,1)),Math.abs(q)<0.9999999)this._x=Math.atan2(G,N),this._z=Math.atan2(X,W);else this._x=0,this._z=Math.atan2(-K,H);break;case"YZX":if(this._z=Math.asin(l0(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(-U,H),this._y=Math.atan2(-q,W);else this._x=0,this._y=Math.atan2(Y,N);break;case"XZY":if(this._z=Math.asin(-l0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(G,H),this._y=Math.atan2(Y,W);else this._x=Math.atan2(-U,N),this._y=0;break;default:A0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return oZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(oZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return aZ.setFromEuler(this),this.setFromQuaternion(aZ,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}v9.DEFAULT_ORDER="XYZ";class k7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var QX=0,rZ=new y,w8=new Z9,w9=new qJ,o7=new y,Y7=new y,$X=new y,ZX=new Z9,tZ=new y(1,0,0),eZ=new y(0,1,0),JW=new y(0,0,1),QW={type:"added"},WX={type:"removed"},C8={type:"childadded",child:null},RQ={type:"childremoved",child:null};class BJ extends z9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:QX++}),this.uuid=y9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=BJ.DEFAULT_UP.clone();let J=new y,Q=new v9,$=new Z9,Z=new y(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new qJ},normalMatrix:{value:new j0}}),this.matrix=new qJ,this.matrixWorld=new qJ,this.matrixAutoUpdate=BJ.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=BJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new k7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return w8.setFromAxisAngle(J,Q),this.quaternion.multiply(w8),this}rotateOnWorldAxis(J,Q){return w8.setFromAxisAngle(J,Q),this.quaternion.premultiply(w8),this}rotateX(J){return this.rotateOnAxis(tZ,J)}rotateY(J){return this.rotateOnAxis(eZ,J)}rotateZ(J){return this.rotateOnAxis(JW,J)}translateOnAxis(J,Q){return rZ.copy(J).applyQuaternion(this.quaternion),this.position.add(rZ.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(tZ,J)}translateY(J){return this.translateOnAxis(eZ,J)}translateZ(J){return this.translateOnAxis(JW,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(w9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)o7.copy(J);else o7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),Y7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)w9.lookAt(Y7,o7,this.up);else w9.lookAt(o7,Y7,this.up);if(this.quaternion.setFromRotationMatrix(w9),Z)w9.extractRotation(Z.matrixWorld),w8.setFromRotationMatrix(w9),this.quaternion.premultiply(w8.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return C0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(QW),C8.child=J,this.dispatchEvent(C8),C8.child=null;else C0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(WX),RQ.child=J,this.dispatchEvent(RQ),RQ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),w9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),w9.multiply(J.parent.matrixWorld);return J.applyMatrix4(w9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(QW),C8.child=J,this.dispatchEvent(C8),C8.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Y7,J,$X),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Y7,ZX,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q){let $=this.parent;if(J===!0&&$!==null)$.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(Q===!0){let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].updateWorldMatrix(!1,!0)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((Y)=>({...Y,boundingBox:Y.boundingBox?Y.boundingBox.toJSON():void 0,boundingSphere:Y.boundingSphere?Y.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((Y)=>({...Y})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(Y,X){if(Y[X.uuid]===void 0)Y[X.uuid]=X.toJSON(J);return X.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let X=Y.shapes;if(Array.isArray(X))for(let H=0,U=X.length;H<U;H++){let q=X[H];W(J.shapes,q)}else W(J.shapes,X)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let X=0,H=this.material.length;X<H;X++)Y.push(W(J.materials,this.material[X]));Z.material=Y}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let Y=0;Y<this.children.length;Y++)Z.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let Y=0;Y<this.animations.length;Y++){let X=this.animations[Y];Z.animations.push(W(J.animations,X))}}if(Q){let Y=K(J.geometries),X=K(J.materials),H=K(J.textures),U=K(J.images),q=K(J.shapes),G=K(J.skeletons),N=K(J.animations),F=K(J.nodes);if(Y.length>0)$.geometries=Y;if(X.length>0)$.materials=X;if(H.length>0)$.textures=H;if(U.length>0)$.images=U;if(q.length>0)$.shapes=q;if(G.length>0)$.skeletons=G;if(N.length>0)$.animations=N;if(F.length>0)$.nodes=F}return $.object=Z,$;function K(Y){let X=[];for(let H in Y){let U=Y[H];delete U.metadata,X.push(U)}return X}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}BJ.DEFAULT_UP=new y(0,1,0);BJ.DEFAULT_MATRIX_AUTO_UPDATE=!0;BJ.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class iJ extends BJ{constructor(){super();this.isGroup=!0,this.type="Group"}}var KX={type:"move"};class I7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new iJ,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new iJ,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new iJ,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,Y=this._targetRay,X=this._grip,H=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(H&&J.hand){K=!0;for(let R of J.hand.values()){let B=Q.getJointPose(R,$),D=this._getHandJoint(H,R);if(B!==null)D.matrix.fromArray(B.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=B.radius;D.visible=B!==null}let U=H.joints["index-finger-tip"],q=H.joints["thumb-tip"],G=U.position.distanceTo(q.position),N=0.02,F=0.005;if(H.inputState.pinching&&G>N+F)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&G<=N-F)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(X!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(X.matrix.fromArray(W.transform.matrix),X.matrix.decompose(X.position,X.rotation,X.scale),X.matrixWorldNeedsUpdate=!0,W.linearVelocity)X.hasLinearVelocity=!0,X.linearVelocity.copy(W.linearVelocity);else X.hasLinearVelocity=!1;if(W.angularVelocity)X.hasAngularVelocity=!0,X.angularVelocity.copy(W.angularVelocity);else X.hasAngularVelocity=!1;if(X.eventsEnabled)X.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(Y!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(KX)}}}if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=W!==null;if(H!==null)H.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new iJ;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var RK={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},u9={h:0,s:0,l:0},a7={h:0,s:0,l:0};function OQ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class m0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,c0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=c0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,c0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=c0.workingColorSpace){if(J=v$(J,1),Q=l0(Q,0,1),$=l0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=OQ(K,W,J+0.3333333333333333),this.g=OQ(K,W,J),this.b=OQ(K,W,J-0.3333333333333333)}return c0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)A0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],Y=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:A0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else A0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=RK[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else A0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=f9(J.r),this.g=f9(J.g),this.b=f9(J.b),this}copyLinearToSRGB(J){return this.r=d8(J.r),this.g=d8(J.g),this.b=d8(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return c0.workingToColorSpace(fJ.copy(this),J),Math.round(l0(fJ.r*255,0,255))*65536+Math.round(l0(fJ.g*255,0,255))*256+Math.round(l0(fJ.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=c0.workingColorSpace){c0.workingToColorSpace(fJ.copy(this),Q);let{r:$,g:Z,b:W}=fJ,K=Math.max($,Z,W),Y=Math.min($,Z,W),X,H,U=(Y+K)/2;if(Y===K)X=0,H=0;else{let q=K-Y;switch(H=U<=0.5?q/(K+Y):q/(2-K-Y),K){case $:X=(Z-W)/q+(Z<W?6:0);break;case Z:X=(W-$)/q+2;break;case W:X=($-Z)/q+4;break}X/=6}return J.h=X,J.s=H,J.l=U,J}getRGB(J,Q=c0.workingColorSpace){return c0.workingToColorSpace(fJ.copy(this),Q),J.r=fJ.r,J.g=fJ.g,J.b=fJ.b,J}getStyle(J="srgb"){c0.workingToColorSpace(fJ.copy(this),J);let{r:Q,g:$,b:Z}=fJ;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(u9),this.setHSL(u9.h+J,u9.s+Q,u9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(u9),J.getHSL(a7);let $=D7(u9.h,a7.h,Q),Z=D7(u9.s,a7.s,Q),W=D7(u9.l,a7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var fJ=new m0;m0.NAMES=RK;class A7{constructor(J,Q=1,$=1000){this.isFog=!0,this.name="",this.color=new m0(J),this.near=Q,this.far=$}clone(){return new A7(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class y6 extends BJ{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new v9,this.environmentIntensity=1,this.environmentRotation=new v9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var G9=new y,C9=new y,MQ=new y,T9=new y,T8=new y,S8=new y,$W=new y,_Q=new y,VQ=new y,LQ=new y,BQ=new EJ,zQ=new EJ,kQ=new EJ;class sJ{constructor(J=new y,Q=new y,$=new y){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),G9.subVectors(J,Q),Z.cross(G9);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){G9.subVectors(Z,Q),C9.subVectors($,Q),MQ.subVectors(J,Q);let K=G9.dot(G9),Y=G9.dot(C9),X=G9.dot(MQ),H=C9.dot(C9),U=C9.dot(MQ),q=K*H-Y*Y;if(q===0)return W.set(0,0,0),null;let G=1/q,N=(H*X-Y*U)*G,F=(K*U-Y*X)*G;return W.set(1-N-F,F,N)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,T9)===null)return!1;return T9.x>=0&&T9.y>=0&&T9.x+T9.y<=1}static getInterpolation(J,Q,$,Z,W,K,Y,X){if(this.getBarycoord(J,Q,$,Z,T9)===null){if(X.x=0,X.y=0,"z"in X)X.z=0;if("w"in X)X.w=0;return null}return X.setScalar(0),X.addScaledVector(W,T9.x),X.addScaledVector(K,T9.y),X.addScaledVector(Y,T9.z),X}static getInterpolatedAttribute(J,Q,$,Z,W,K){return BQ.setScalar(0),zQ.setScalar(0),kQ.setScalar(0),BQ.fromBufferAttribute(J,Q),zQ.fromBufferAttribute(J,$),kQ.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(BQ,W.x),K.addScaledVector(zQ,W.y),K.addScaledVector(kQ,W.z),K}static isFrontFacing(J,Q,$,Z){return G9.subVectors($,Q),C9.subVectors(J,Q),G9.cross(C9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return G9.subVectors(this.c,this.b),C9.subVectors(this.a,this.b),G9.cross(C9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return sJ.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return sJ.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return sJ.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return sJ.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return sJ.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,Y;T8.subVectors(Z,$),S8.subVectors(W,$),_Q.subVectors(J,$);let X=T8.dot(_Q),H=S8.dot(_Q);if(X<=0&&H<=0)return Q.copy($);VQ.subVectors(J,Z);let U=T8.dot(VQ),q=S8.dot(VQ);if(U>=0&&q<=U)return Q.copy(Z);let G=X*q-U*H;if(G<=0&&X>=0&&U<=0)return K=X/(X-U),Q.copy($).addScaledVector(T8,K);LQ.subVectors(J,W);let N=T8.dot(LQ),F=S8.dot(LQ);if(F>=0&&N<=F)return Q.copy(W);let R=N*H-X*F;if(R<=0&&H>=0&&F<=0)return Y=H/(H-F),Q.copy($).addScaledVector(S8,Y);let B=U*F-N*q;if(B<=0&&q-U>=0&&N-F>=0)return $W.subVectors(W,Z),Y=(q-U)/(q-U+(N-F)),Q.copy(Z).addScaledVector($W,Y);let D=1/(B+R+G);return K=R*D,Y=G*D,Q.copy($).addScaledVector(T8,K).addScaledVector(S8,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class D8{constructor(J=new y(1/0,1/0,1/0),Q=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(N9.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(N9.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=N9.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,Y=W.count;K<Y;K++){if(J.isMesh===!0)J.getVertexPosition(K,N9);else N9.fromBufferAttribute(W,K);N9.applyMatrix4(J.matrixWorld),this.expandByPoint(N9)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();r7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();r7.copy($.boundingBox)}r7.applyMatrix4(J.matrixWorld),this.union(r7)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,N9),N9.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(X7),t7.subVectors(this.max,X7),j8.subVectors(J.a,X7),y8.subVectors(J.b,X7),f8.subVectors(J.c,X7),c9.subVectors(y8,j8),n9.subVectors(f8,y8),W8.subVectors(j8,f8);let Q=[0,-c9.z,c9.y,0,-n9.z,n9.y,0,-W8.z,W8.y,c9.z,0,-c9.x,n9.z,0,-n9.x,W8.z,0,-W8.x,-c9.y,c9.x,0,-n9.y,n9.x,0,-W8.y,W8.x,0];if(!IQ(Q,j8,y8,f8,t7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!IQ(Q,j8,y8,f8,t7))return!1;return e7.crossVectors(c9,n9),Q=[e7.x,e7.y,e7.z],IQ(Q,j8,y8,f8,t7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,N9).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(N9).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return S9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),S9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),S9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),S9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),S9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),S9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),S9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),S9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(S9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var S9=[new y,new y,new y,new y,new y,new y,new y,new y],N9=new y,r7=new D8,j8=new y,y8=new y,f8=new y,c9=new y,n9=new y,W8=new y,X7=new y,t7=new y,e7=new y,K8=new y;function IQ(J,Q,$,Z,W){for(let K=0,Y=J.length-3;K<=Y;K+=3){K8.fromArray(J,K);let X=W.x*Math.abs(K8.x)+W.y*Math.abs(K8.y)+W.z*Math.abs(K8.z),H=Q.dot(K8),U=$.dot(K8),q=Z.dot(K8);if(Math.max(-Math.max(H,U,q),Math.min(H,U,q))>X)return!1}return!0}var LJ=new y,J6=new k0,YX=0;class oJ extends z9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:YX++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)J6.fromBufferAttribute(this,Q),J6.applyMatrix3(J),this.setXY(Q,J6.x,J6.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)LJ.fromBufferAttribute(this,Q),LJ.applyMatrix3(J),this.setXYZ(Q,LJ.x,LJ.y,LJ.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)LJ.fromBufferAttribute(this,Q),LJ.applyMatrix4(J),this.setXYZ(Q,LJ.x,LJ.y,LJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)LJ.fromBufferAttribute(this,Q),LJ.applyNormalMatrix(J),this.setXYZ(Q,LJ.x,LJ.y,LJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)LJ.fromBufferAttribute(this,Q),LJ.transformDirection(J),this.setXYZ(Q,LJ.x,LJ.y,LJ.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=F9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=t0($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=F9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=F9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=F9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=F9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=t0(Q,this.array),$=t0($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=t0(Q,this.array),$=t0($,this.array),Z=t0(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=t0(Q,this.array),$=t0($,this.array),Z=t0(Z,this.array),W=t0(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class f6 extends oJ{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class v6 extends oJ{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class CJ extends oJ{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var XX=new D8,H7=new y,AQ=new y;class P7{constructor(J=new y,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else XX.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;H7.subVectors(J,this.center);let Q=H7.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(H7,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else AQ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(H7.copy(J.center).add(AQ)),this.expandByPoint(H7.copy(J.center).sub(AQ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var HX=0,Q9=new qJ,PQ=new BJ,v8=new y,nJ=new D8,U7=new D8,AJ=new y;class aJ extends z9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:HX++}),this.uuid=y9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((jY(J))?v6:f6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new j0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(J){return Q9.makeRotationFromQuaternion(J),this.applyMatrix4(Q9),this}rotateX(J){return Q9.makeRotationX(J),this.applyMatrix4(Q9),this}rotateY(J){return Q9.makeRotationY(J),this.applyMatrix4(Q9),this}rotateZ(J){return Q9.makeRotationZ(J),this.applyMatrix4(Q9),this}translate(J,Q,$){return Q9.makeTranslation(J,Q,$),this.applyMatrix4(Q9),this}scale(J,Q,$){return Q9.makeScale(J,Q,$),this.applyMatrix4(Q9),this}lookAt(J){return PQ.lookAt(J),PQ.updateMatrix(),this.applyMatrix4(PQ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(v8).negate(),this.translate(v8.x,v8.y,v8.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new CJ($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)A0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new D8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){C0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(nJ.setFromBufferAttribute(W),this.morphTargetsRelative)AJ.addVectors(this.boundingBox.min,nJ.min),this.boundingBox.expandByPoint(AJ),AJ.addVectors(this.boundingBox.max,nJ.max),this.boundingBox.expandByPoint(AJ);else this.boundingBox.expandByPoint(nJ.min),this.boundingBox.expandByPoint(nJ.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))C0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new P7;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){C0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(J){let $=this.boundingSphere.center;if(nJ.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let Y=Q[W];if(U7.setFromBufferAttribute(Y),this.morphTargetsRelative)AJ.addVectors(nJ.min,U7.min),nJ.expandByPoint(AJ),AJ.addVectors(nJ.max,U7.max),nJ.expandByPoint(AJ);else nJ.expandByPoint(U7.min),nJ.expandByPoint(U7.max)}nJ.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)AJ.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(AJ));if(Q)for(let W=0,K=Q.length;W<K;W++){let Y=Q[W],X=this.morphTargetsRelative;for(let H=0,U=Y.count;H<U;H++){if(AJ.fromBufferAttribute(Y,H),X)v8.fromBufferAttribute(J,H),AJ.add(v8);Z=Math.max(Z,$.distanceToSquared(AJ))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))C0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){C0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new oJ(new Float32Array(4*$.count),4));let K=this.getAttribute("tangent"),Y=[],X=[];for(let C=0;C<$.count;C++)Y[C]=new y,X[C]=new y;let H=new y,U=new y,q=new y,G=new k0,N=new k0,F=new k0,R=new y,B=new y;function D(C,V,I){H.fromBufferAttribute($,C),U.fromBufferAttribute($,V),q.fromBufferAttribute($,I),G.fromBufferAttribute(W,C),N.fromBufferAttribute(W,V),F.fromBufferAttribute(W,I),U.sub(H),q.sub(H),N.sub(G),F.sub(G);let d=1/(N.x*F.y-F.x*N.y);if(!isFinite(d))return;R.copy(U).multiplyScalar(F.y).addScaledVector(q,-N.y).multiplyScalar(d),B.copy(q).multiplyScalar(N.x).addScaledVector(U,-F.x).multiplyScalar(d),Y[C].add(R),Y[V].add(R),Y[I].add(R),X[C].add(B),X[V].add(B),X[I].add(B)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let C=0,V=E.length;C<V;++C){let I=E[C],d=I.start,A=I.count;for(let m=d,c=d+A;m<c;m+=3)D(J.getX(m+0),J.getX(m+1),J.getX(m+2))}let M=new y,L=new y,z=new y,w=new y;function P(C){z.fromBufferAttribute(Z,C),w.copy(z);let V=Y[C];M.copy(V),M.sub(z.multiplyScalar(z.dot(V))).normalize(),L.crossVectors(w,V);let d=L.dot(X[C])<0?-1:1;K.setXYZW(C,M.x,M.y,M.z,d)}for(let C=0,V=E.length;C<V;++C){let I=E[C],d=I.start,A=I.count;for(let m=d,c=d+A;m<c;m+=3)P(J.getX(m+0)),P(J.getX(m+1)),P(J.getX(m+2))}}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0)$=new oJ(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let G=0,N=$.count;G<N;G++)$.setXYZ(G,0,0,0);let Z=new y,W=new y,K=new y,Y=new y,X=new y,H=new y,U=new y,q=new y;if(J)for(let G=0,N=J.count;G<N;G+=3){let F=J.getX(G+0),R=J.getX(G+1),B=J.getX(G+2);Z.fromBufferAttribute(Q,F),W.fromBufferAttribute(Q,R),K.fromBufferAttribute(Q,B),U.subVectors(K,W),q.subVectors(Z,W),U.cross(q),Y.fromBufferAttribute($,F),X.fromBufferAttribute($,R),H.fromBufferAttribute($,B),Y.add(U),X.add(U),H.add(U),$.setXYZ(F,Y.x,Y.y,Y.z),$.setXYZ(R,X.x,X.y,X.z),$.setXYZ(B,H.x,H.y,H.z)}else for(let G=0,N=Q.count;G<N;G+=3)Z.fromBufferAttribute(Q,G+0),W.fromBufferAttribute(Q,G+1),K.fromBufferAttribute(Q,G+2),U.subVectors(K,W),q.subVectors(Z,W),U.cross(q),$.setXYZ(G+0,U.x,U.y,U.z),$.setXYZ(G+1,U.x,U.y,U.z),$.setXYZ(G+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)AJ.fromBufferAttribute(J,Q),AJ.normalize(),J.setXYZ(Q,AJ.x,AJ.y,AJ.z)}toNonIndexed(){function J(Y,X){let{array:H,itemSize:U,normalized:q}=Y,G=new H.constructor(X.length*U),N=0,F=0;for(let R=0,B=X.length;R<B;R++){if(Y.isInterleavedBufferAttribute)N=X[R]*Y.data.stride+Y.offset;else N=X[R]*U;for(let D=0;D<U;D++)G[F++]=H[N++]}return new oJ(G,U,q)}if(this.index===null)return A0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new aJ,$=this.index.array,Z=this.attributes;for(let Y in Z){let X=Z[Y],H=J(X,$);Q.setAttribute(Y,H)}let W=this.morphAttributes;for(let Y in W){let X=[],H=W[Y];for(let U=0,q=H.length;U<q;U++){let G=H[U],N=J(G,$);X.push(N)}Q.morphAttributes[Y]=X}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let Y=0,X=K.length;Y<X;Y++){let H=K[Y];Q.addGroup(H.start,H.count,H.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0){let X=this.parameters;for(let H in X)if(X[H]!==void 0)J[H]=X[H];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let X in $){let H=$[X];J.data.attributes[X]=H.toJSON(J.data)}let Z={},W=!1;for(let X in this.morphAttributes){let H=this.morphAttributes[X],U=[];for(let q=0,G=H.length;q<G;q++){let N=H[q];U.push(N.toJSON(J.data))}if(U.length>0)Z[X]=U,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere=Y.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let H in Z){let U=Z[H];this.setAttribute(H,U.clone(Q))}let W=J.morphAttributes;for(let H in W){let U=[],q=W[H];for(let G=0,N=q.length;G<N;G++)U.push(q[G].clone(Q));this.morphAttributes[H]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let H=0,U=K.length;H<U;H++){let q=K[H];this.addGroup(q.start,q.count,q.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let X=J.boundingSphere;if(X!==null)this.boundingSphere=X.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class p${constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=y9()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,W=this.stride;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=y9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=y9();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var hJ=new y;class R7{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)hJ.fromBufferAttribute(this,Q),hJ.applyMatrix4(J),this.setXYZ(Q,hJ.x,hJ.y,hJ.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)hJ.fromBufferAttribute(this,Q),hJ.applyNormalMatrix(J),this.setXYZ(Q,hJ.x,hJ.y,hJ.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)hJ.fromBufferAttribute(this,Q),hJ.transformDirection(J),this.setXYZ(Q,hJ.x,hJ.y,hJ.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=F9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=t0($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=t0(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=F9(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=F9(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=F9(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=F9(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=t0(Q,this.array),$=t0($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=t0(Q,this.array),$=t0($,this.array),Z=t0(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J=J*this.data.stride+this.offset,this.normalized)Q=t0(Q,this.array),$=t0($,this.array),Z=t0(Z,this.array),W=t0(W,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=W,this}clone(J){if(J===void 0){E7("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[Z+W])}return new oJ(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new R7(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){E7("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let W=0;W<this.itemSize;W++)Q.push(this.data.array[Z+W])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var UX=0;class e9 extends z9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:UX++}),this.uuid=y9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new m0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){A0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){A0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let Y in W){let X=W[Y];delete X.metadata,K.push(X)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class w7 extends e9{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new m0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var x8,G7=new y,h8=new y,b8=new y,g8=new k0,N7=new k0,OK=new qJ,Q6=new y,q7=new y,$6=new y,ZW=new k0,wQ=new k0,WW=new k0;class x6 extends BJ{constructor(J=new w7){super();if(this.isSprite=!0,this.type="Sprite",x8===void 0){x8=new aJ;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new p$(Q,5);x8.setIndex([0,1,2,0,2,3]),x8.setAttribute("position",new R7($,3,0,!1)),x8.setAttribute("uv",new R7($,2,3,!1))}this.geometry=x8,this.material=J,this.center=new k0(0.5,0.5),this.count=1}raycast(J,Q){if(J.camera===null)C0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(h8.setFromMatrixScale(this.matrixWorld),OK.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),b8.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)h8.multiplyScalar(-b8.z);let $=this.material.rotation,Z,W;if($!==0)W=Math.cos($),Z=Math.sin($);let K=this.center;Z6(Q6.set(-0.5,-0.5,0),b8,K,h8,Z,W),Z6(q7.set(0.5,-0.5,0),b8,K,h8,Z,W),Z6($6.set(0.5,0.5,0),b8,K,h8,Z,W),ZW.set(0,0),wQ.set(1,0),WW.set(1,1);let Y=J.ray.intersectTriangle(Q6,q7,$6,!1,G7);if(Y===null){if(Z6(q7.set(-0.5,0.5,0),b8,K,h8,Z,W),wQ.set(0,1),Y=J.ray.intersectTriangle(Q6,$6,q7,!1,G7),Y===null)return}let X=J.ray.origin.distanceTo(G7);if(X<J.near||X>J.far)return;Q.push({distance:X,point:G7.clone(),uv:sJ.getInterpolation(G7,Q6,q7,$6,ZW,wQ,WW,new k0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function Z6(J,Q,$,Z,W,K){if(g8.subVectors(J,$).addScalar(0.5).multiply(Z),W!==void 0)N7.x=K*g8.x-W*g8.y,N7.y=W*g8.x+K*g8.y;else N7.copy(g8);J.copy(Q),J.x+=N7.x,J.y+=N7.y,J.applyMatrix4(OK)}var j9=new y,CQ=new y,W6=new y,s9=new y,TQ=new y,K6=new y,SQ=new y;class t8{constructor(J=new y,Q=new y(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,j9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=j9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return j9.copy(this.origin).addScaledVector(this.direction,Q),j9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){CQ.copy(J).add(Q).multiplyScalar(0.5),W6.copy(Q).sub(J).normalize(),s9.copy(this.origin).sub(CQ);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(W6),Y=s9.dot(this.direction),X=-s9.dot(W6),H=s9.lengthSq(),U=Math.abs(1-K*K),q,G,N,F;if(U>0)if(q=K*X-Y,G=K*Y-X,F=W*U,q>=0)if(G>=-F)if(G<=F){let R=1/U;q*=R,G*=R,N=q*(q+K*G+2*Y)+G*(K*q+G+2*X)+H}else G=W,q=Math.max(0,-(K*G+Y)),N=-q*q+G*(G+2*X)+H;else G=-W,q=Math.max(0,-(K*G+Y)),N=-q*q+G*(G+2*X)+H;else if(G<=-F)q=Math.max(0,-(-K*W+Y)),G=q>0?-W:Math.min(Math.max(-W,-X),W),N=-q*q+G*(G+2*X)+H;else if(G<=F)q=0,G=Math.min(Math.max(-W,-X),W),N=G*(G+2*X)+H;else q=Math.max(0,-(K*W+Y)),G=q>0?W:Math.min(Math.max(-W,-X),W),N=-q*q+G*(G+2*X)+H;else G=K>0?-W:W,q=Math.max(0,-(K*G+Y)),N=-q*q+G*(G+2*X)+H;if($)$.copy(this.origin).addScaledVector(this.direction,q);if(Z)Z.copy(CQ).addScaledVector(W6,G);return N}intersectSphere(J,Q){j9.subVectors(J.center,this.origin);let $=j9.dot(this.direction),Z=j9.dot(j9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),Y=$-K,X=$+K;if(X<0)return null;if(Y<0)return this.at(X,Q);return this.at(Y,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,Y,X,H=1/this.direction.x,U=1/this.direction.y,q=1/this.direction.z,G=this.origin;if(H>=0)$=(J.min.x-G.x)*H,Z=(J.max.x-G.x)*H;else $=(J.max.x-G.x)*H,Z=(J.min.x-G.x)*H;if(U>=0)W=(J.min.y-G.y)*U,K=(J.max.y-G.y)*U;else W=(J.max.y-G.y)*U,K=(J.min.y-G.y)*U;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(q>=0)Y=(J.min.z-G.z)*q,X=(J.max.z-G.z)*q;else Y=(J.max.z-G.z)*q,X=(J.min.z-G.z)*q;if($>X||Y>Z)return null;if(Y>$||$!==$)$=Y;if(X<Z||Z!==Z)Z=X;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,j9)!==null}intersectTriangle(J,Q,$,Z,W){TQ.subVectors(Q,J),K6.subVectors($,J),SQ.crossVectors(TQ,K6);let K=this.direction.dot(SQ),Y;if(K>0){if(Z)return null;Y=1}else if(K<0)Y=-1,K=-K;else return null;s9.subVectors(this.origin,J);let X=Y*this.direction.dot(K6.crossVectors(s9,K6));if(X<0)return null;let H=Y*this.direction.dot(TQ.cross(s9));if(H<0)return null;if(X+H>K)return null;let U=-Y*s9.dot(SQ);if(U<0)return null;return this.at(U/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class J8 extends e9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new m0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new v9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var KW=new qJ,Y8=new t8,Y6=new P7,YW=new y,X6=new y,H6=new y,U6=new y,jQ=new y,G6=new y,XW=new y,N6=new y;class FJ extends BJ{constructor(J=new aJ,Q=new J8){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let Y=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let Y=this.morphTargetInfluences;if(W&&Y){G6.set(0,0,0);for(let X=0,H=W.length;X<H;X++){let U=Y[X],q=W[X];if(U===0)continue;if(jQ.fromBufferAttribute(q,J),K)G6.addScaledVector(jQ,U);else G6.addScaledVector(jQ.sub(Q),U)}Q.add(G6)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(Y6.copy($.boundingSphere),Y6.applyMatrix4(W),Y8.copy(J.ray).recast(J.near),Y6.containsPoint(Y8.origin)===!1){if(Y8.intersectSphere(Y6,YW)===null)return;if(Y8.origin.distanceToSquared(YW)>(J.far-J.near)**2)return}if(KW.copy(W).invert(),Y8.copy(J.ray).applyMatrix4(KW),$.boundingBox!==null){if(Y8.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,Y8)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,Y=W.index,X=W.attributes.position,H=W.attributes.uv,U=W.attributes.uv1,q=W.attributes.normal,G=W.groups,N=W.drawRange;if(Y!==null)if(Array.isArray(K))for(let F=0,R=G.length;F<R;F++){let B=G[F],D=K[B.materialIndex],E=Math.max(B.start,N.start),M=Math.min(Y.count,Math.min(B.start+B.count,N.start+N.count));for(let L=E,z=M;L<z;L+=3){let w=Y.getX(L),P=Y.getX(L+1),C=Y.getX(L+2);if(Z=q6(this,D,J,$,H,U,q,w,P,C),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let F=Math.max(0,N.start),R=Math.min(Y.count,N.start+N.count);for(let B=F,D=R;B<D;B+=3){let E=Y.getX(B),M=Y.getX(B+1),L=Y.getX(B+2);if(Z=q6(this,K,J,$,H,U,q,E,M,L),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}else if(X!==void 0)if(Array.isArray(K))for(let F=0,R=G.length;F<R;F++){let B=G[F],D=K[B.materialIndex],E=Math.max(B.start,N.start),M=Math.min(X.count,Math.min(B.start+B.count,N.start+N.count));for(let L=E,z=M;L<z;L+=3){let w=L,P=L+1,C=L+2;if(Z=q6(this,D,J,$,H,U,q,w,P,C),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=B.materialIndex,Q.push(Z)}}else{let F=Math.max(0,N.start),R=Math.min(X.count,N.start+N.count);for(let B=F,D=R;B<D;B+=3){let E=B,M=B+1,L=B+2;if(Z=q6(this,K,J,$,H,U,q,E,M,L),Z)Z.faceIndex=Math.floor(B/3),Q.push(Z)}}}}function GX(J,Q,$,Z,W,K,Y,X){let H;if(Q.side===1)H=Z.intersectTriangle(Y,K,W,!0,X);else H=Z.intersectTriangle(W,K,Y,Q.side===0,X);if(H===null)return null;N6.copy(X),N6.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(N6);if(U<$.near||U>$.far)return null;return{distance:U,point:N6.clone(),object:J}}function q6(J,Q,$,Z,W,K,Y,X,H,U){J.getVertexPosition(X,X6),J.getVertexPosition(H,H6),J.getVertexPosition(U,U6);let q=GX(J,Q,$,Z,X6,H6,U6,XW);if(q){let G=new y;if(sJ.getBarycoord(XW,X6,H6,U6,G),W)q.uv=sJ.getInterpolatedAttribute(W,X,H,U,G,new k0);if(K)q.uv1=sJ.getInterpolatedAttribute(K,X,H,U,G,new k0);if(Y){if(q.normal=sJ.getInterpolatedAttribute(Y,X,H,U,G,new y),q.normal.dot(Z.direction)>0)q.normal.multiplyScalar(-1)}let N={a:X,b:H,c:U,normal:new y,materialIndex:0};sJ.getNormal(X6,H6,U6,N.normal),q.face=N,q.barycoord=G}return q}class m$ extends PJ{constructor(J=null,Q=1,$=1,Z,W,K,Y,X,H=1003,U=1003,q,G){super(null,K,Y,X,H,U,Z,W,q,G);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var yQ=new y,NX=new y,qX=new j0;class q9{constructor(J=new y(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=yQ.subVectors($,Q).cross(NX.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(yQ),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||qX.getNormalMatrix(J),Z=this.coplanarPoint(yQ).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var X8=new P7,FX=new k0(0.5,0.5),F6=new y;class C7{constructor(J=new q9,Q=new q9,$=new q9,Z=new q9,W=new q9,K=new q9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let Y=this.planes;return Y[0].copy(J),Y[1].copy(Q),Y[2].copy($),Y[3].copy(Z),Y[4].copy(W),Y[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],Y=W[1],X=W[2],H=W[3],U=W[4],q=W[5],G=W[6],N=W[7],F=W[8],R=W[9],B=W[10],D=W[11],E=W[12],M=W[13],L=W[14],z=W[15];if(Z[0].setComponents(H-K,N-U,D-F,z-E).normalize(),Z[1].setComponents(H+K,N+U,D+F,z+E).normalize(),Z[2].setComponents(H+Y,N+q,D+R,z+M).normalize(),Z[3].setComponents(H-Y,N-q,D-R,z-M).normalize(),$)Z[4].setComponents(X,G,B,L).normalize(),Z[5].setComponents(H-X,N-G,D-B,z-L).normalize();else if(Z[4].setComponents(H-X,N-G,D-B,z-L).normalize(),Q===2000)Z[5].setComponents(H+X,N+G,D+B,z+L).normalize();else if(Q===2001)Z[5].setComponents(X,G,B,L).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();X8.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();X8.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(X8)}intersectsSprite(J){X8.center.set(0,0,0);let Q=FX.distanceTo(J.center);return X8.radius=0.7071067811865476+Q,X8.applyMatrix4(J.matrixWorld),this.intersectsSphere(X8)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(F6.x=Z.normal.x>0?J.max.x:J.min.x,F6.y=Z.normal.y>0?J.max.y:J.min.y,F6.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(F6)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class h6 extends PJ{constructor(J=[],Q=301,$,Z,W,K,Y,X,H,U){super(J,Q,$,Z,W,K,Y,X,H,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class b6 extends PJ{constructor(J,Q,$,Z,W,K,Y,X,H){super(J,Q,$,Z,W,K,Y,X,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class Q8 extends PJ{constructor(J,Q,$=1014,Z,W,K,Y=1003,X=1003,H,U=1026,q=1){if(U!==1026&&U!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let G={width:J,height:Q,depth:q};super(G,Z,W,K,Y,X,U,$,H);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new z7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class l$ extends Q8{constructor(J,Q=1014,$=301,Z,W,K=1003,Y=1003,X,H=1026){let U={width:J,height:J,depth:1},q=[U,U,U,U,U,U];super(J,J,Q,$,Z,W,K,Y,X,H);this.image=q,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class g6 extends PJ{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class lJ extends aJ{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let Y=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let X=[],H=[],U=[],q=[],G=0,N=0;F("z","y","x",-1,-1,$,Q,J,K,W,0),F("z","y","x",1,-1,$,Q,-J,K,W,1),F("x","z","y",1,1,J,$,Q,Z,K,2),F("x","z","y",1,-1,J,$,-Q,Z,K,3),F("x","y","z",1,-1,J,Q,$,Z,W,4),F("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(X),this.setAttribute("position",new CJ(H,3)),this.setAttribute("normal",new CJ(U,3)),this.setAttribute("uv",new CJ(q,2));function F(R,B,D,E,M,L,z,w,P,C,V){let I=L/P,d=z/C,A=L/2,m=z/2,c=w/2,f=P+1,l=C+1,b=0,p=0,a=new y;for(let Q0=0;Q0<l;Q0++){let F0=Q0*d-m;for(let I0=0;I0<f;I0++){let M0=I0*I-A;a[R]=M0*E,a[B]=F0*M,a[D]=c,H.push(a.x,a.y,a.z),a[R]=0,a[B]=0,a[D]=w>0?1:-1,U.push(a.x,a.y,a.z),q.push(I0/P),q.push(1-Q0/C),b+=1}}for(let Q0=0;Q0<C;Q0++)for(let F0=0;F0<P;F0++){let I0=G+F0+f*Q0,M0=G+F0+f*(Q0+1),r0=G+(F0+1)+f*(Q0+1),d0=G+(F0+1)+f*Q0;X.push(I0,M0,d0),X.push(M0,r0,d0),p+=6}Y.addGroup(N,p,V),N+=p,G+=b}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new lJ(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class e8 extends aJ{constructor(J=1,Q=1,$=1,Z=32,W=1,K=!1,Y=0,X=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:W,openEnded:K,thetaStart:Y,thetaLength:X};let H=this;Z=Math.floor(Z),W=Math.floor(W);let U=[],q=[],G=[],N=[],F=0,R=[],B=$/2,D=0;if(E(),K===!1){if(J>0)M(!0);if(Q>0)M(!1)}this.setIndex(U),this.setAttribute("position",new CJ(q,3)),this.setAttribute("normal",new CJ(G,3)),this.setAttribute("uv",new CJ(N,2));function E(){let L=new y,z=new y,w=0,P=(Q-J)/$;for(let C=0;C<=W;C++){let V=[],I=C/W,d=I*(Q-J)+J;for(let A=0;A<=Z;A++){let m=A/Z,c=m*X+Y,f=Math.sin(c),l=Math.cos(c);z.x=d*f,z.y=-I*$+B,z.z=d*l,q.push(z.x,z.y,z.z),L.set(f,P,l).normalize(),G.push(L.x,L.y,L.z),N.push(m,1-I),V.push(F++)}R.push(V)}for(let C=0;C<Z;C++)for(let V=0;V<W;V++){let I=R[V][C],d=R[V+1][C],A=R[V+1][C+1],m=R[V][C+1];if(J>0||V!==0)U.push(I,d,m),w+=3;if(Q>0||V!==W-1)U.push(d,A,m),w+=3}H.addGroup(D,w,0),D+=w}function M(L){let z=F,w=new k0,P=new y,C=0,V=L===!0?J:Q,I=L===!0?1:-1;for(let A=1;A<=Z;A++)q.push(0,B*I,0),G.push(0,I,0),N.push(0.5,0.5),F++;let d=F;for(let A=0;A<=Z;A++){let c=A/Z*X+Y,f=Math.cos(c),l=Math.sin(c);P.x=V*l,P.y=B*I,P.z=V*f,q.push(P.x,P.y,P.z),G.push(0,I,0),w.x=f*0.5+0.5,w.y=l*0.5*I+0.5,N.push(w.x,w.y),F++}for(let A=0;A<Z;A++){let m=z+A,c=d+A;if(L===!0)U.push(c,c+1,m);else U.push(c+1,c,m);C+=3}H.addGroup(D,C,L===!0?1:2),D+=C}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new e8(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class b9 extends aJ{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,Y=Math.floor($),X=Math.floor(Z),H=Y+1,U=X+1,q=J/Y,G=Q/X,N=[],F=[],R=[],B=[];for(let D=0;D<U;D++){let E=D*G-K;for(let M=0;M<H;M++){let L=M*q-W;F.push(L,-E,0),R.push(0,0,1),B.push(M/Y),B.push(1-D/X)}}for(let D=0;D<X;D++)for(let E=0;E<Y;E++){let M=E+H*D,L=E+H*(D+1),z=E+1+H*(D+1),w=E+1+H*D;N.push(M,L,w),N.push(L,z,w)}this.setIndex(N),this.setAttribute("position",new CJ(F,3)),this.setAttribute("normal",new CJ(R,3)),this.setAttribute("uv",new CJ(B,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new b9(J.width,J.height,J.widthSegments,J.heightSegments)}}class T7 extends aJ{constructor(J=0.5,Q=1,$=32,Z=1,W=0,K=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:$,phiSegments:Z,thetaStart:W,thetaLength:K},$=Math.max(3,$),Z=Math.max(1,Z);let Y=[],X=[],H=[],U=[],q=J,G=(Q-J)/Z,N=new y,F=new k0;for(let R=0;R<=Z;R++){for(let B=0;B<=$;B++){let D=W+B/$*K;N.x=q*Math.cos(D),N.y=q*Math.sin(D),X.push(N.x,N.y,N.z),H.push(0,0,1),F.x=(N.x/Q+1)/2,F.y=(N.y/Q+1)/2,U.push(F.x,F.y)}q+=G}for(let R=0;R<Z;R++){let B=R*($+1);for(let D=0;D<$;D++){let E=D+B,M=E,L=E+$+1,z=E+$+2,w=E+1;Y.push(M,L,w),Y.push(L,z,w)}}this.setIndex(Y),this.setAttribute("position",new CJ(X,3)),this.setAttribute("normal",new CJ(H,3)),this.setAttribute("uv",new CJ(U,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new T7(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}function E8(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(HW(W))if(W.isRenderTargetTexture)A0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(HW(W[0])){let K=[];for(let Y=0,X=W.length;Y<X;Y++)K[Y]=W[Y].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function vJ(J){let Q={};for(let $=0;$<J.length;$++){let Z=E8(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function HW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function DX(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function d$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return c0.workingColorSpace}var MK={clone:E8,merge:vJ},EX=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,RX=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class K9 extends e9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=EX,this.fragmentShader=RX,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=E8(J.uniforms),this.uniformsGroups=DX(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}}class u$ extends K9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rJ extends e9{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new m0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new m0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new k0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new v9,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class c$ extends e9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class n$ extends e9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function D6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class R8{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let Y=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===Y)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let Y=Q[1];if(J<Y)$=2,W=Y;for(let X=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===X)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let Y=$+K>>>1;if(J<Q[Y])K=Y;else $=Y+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class s$ extends R8{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,Y=Z[W],X=Z[K];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,Y=2*Q-$;break;case 2402:W=Z.length-2,Y=Q+Z[W]-Z[W+1];break;default:W=J,Y=$}if(X===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,X=2*$-Q;break;case 2402:K=1,X=$+Z[1]-Z[0];break;default:K=J-1,X=Q}let H=($-Q)*0.5,U=this.valueSize;this._weightPrev=H/(Q-Y),this._weightNext=H/(X-$),this._offsetPrev=W*U,this._offsetNext=K*U}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,U=this._offsetPrev,q=this._offsetNext,G=this._weightPrev,N=this._weightNext,F=($-Q)/(Z-Q),R=F*F,B=R*F,D=-G*B+2*G*R-G*F,E=(1+G)*B+(-1.5-2*G)*R+(-0.5+G)*F+1,M=(-1-N)*B+(1.5+N)*R+0.5*F,L=N*B-N*R;for(let z=0;z!==Y;++z)W[z]=D*K[U+z]+E*K[H+z]+M*K[X+z]+L*K[q+z];return W}}class i$ extends R8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,U=($-Q)/(Z-Q),q=1-U;for(let G=0;G!==Y;++G)W[G]=K[H+G]*q+K[X+G]*U;return W}}class o$ extends R8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class a$ extends R8{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=J*Y,H=X-Y,U=this.settings||this.DefaultSettings_,q=U.inTangents,G=U.outTangents;if(!q||!G){let R=($-Q)/(Z-Q),B=1-R;for(let D=0;D!==Y;++D)W[D]=K[H+D]*B+K[X+D]*R;return W}let N=Y*2,F=J-1;for(let R=0;R!==Y;++R){let B=K[H+R],D=K[X+R],E=F*N+R*2,M=G[E],L=G[E+1],z=J*N+R*2,w=q[z],P=q[z+1],C=($-Q)/(Z-Q),V,I,d,A,m;for(let c=0;c<8;c++){V=C*C,I=V*C,d=1-C,A=d*d,m=A*d;let l=m*Q+3*A*C*M+3*d*V*w+I*Z-$;if(Math.abs(l)<0.0000000001)break;let b=3*A*(M-Q)+6*d*C*(w-M)+3*V*(Z-w);if(Math.abs(b)<0.0000000001)break;C=C-l/b,C=Math.max(0,Math.min(1,C))}W[R]=m*B+3*A*C*L+3*d*V*P+I*D}return W}}class Y9{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=D6(Q,this.TimeBufferType),this.values=D6($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:D6(J.times,Array),values:D6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new o$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new i$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new s$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new a$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.settings=this.settings;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return A0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let Y=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*Y,K*Y)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)C0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)C0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let Y=0;Y!==W;Y++){let X=$[Y];if(typeof X==="number"&&isNaN(X)){C0("KeyframeTrack: Time is not a valid number.",this,Y,X),J=!1;break}if(K!==null&&K>X){C0("KeyframeTrack: Out of order keys.",this,Y,X,K),J=!1;break}K=X}if(Z!==void 0){if(yY(Z))for(let Y=0,X=Z.length;Y!==X;++Y){let H=Z[Y];if(isNaN(H)){C0("KeyframeTrack: Value is not a valid number.",this,Y,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let Y=1;Y<W;++Y){let X=!1,H=J[Y],U=J[Y+1];if(H!==U&&(Y!==1||H!==J[0]))if(!Z){let q=Y*$,G=q-$,N=q+$;for(let F=0;F!==$;++F){let R=Q[q+F];if(R!==Q[G+F]||R!==Q[N+F]){X=!0;break}}}else X=!0;if(X){if(Y!==K){J[K]=J[Y];let q=Y*$,G=K*$;for(let N=0;N!==$;++N)Q[G+N]=Q[q+N]}++K}}if(W>0){J[K]=J[W];for(let Y=W*$,X=K*$,H=0;H!==$;++H)Q[X+H]=Q[Y+H];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}Y9.prototype.ValueTypeName="";Y9.prototype.TimeBufferType=Float32Array;Y9.prototype.ValueBufferType=Float32Array;Y9.prototype.DefaultInterpolation=2301;class O8 extends Y9{constructor(J,Q,$){super(J,Q,$)}}O8.prototype.ValueTypeName="bool";O8.prototype.ValueBufferType=Array;O8.prototype.DefaultInterpolation=2300;O8.prototype.InterpolantFactoryMethodLinear=void 0;O8.prototype.InterpolantFactoryMethodSmooth=void 0;class r$ extends Y9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}r$.prototype.ValueTypeName="color";class t$ extends Y9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}t$.prototype.ValueTypeName="number";class e$ extends R8{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,Y=this.valueSize,X=($-Q)/(Z-Q),H=J*Y;for(let U=H+Y;H!==U;H+=4)Z9.slerpFlat(W,0,K,H-Y,K,H,X);return W}}class p6 extends Y9{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new e$(this.times,this.values,this.getValueSize(),J)}}p6.prototype.ValueTypeName="quaternion";p6.prototype.InterpolantFactoryMethodSmooth=void 0;class M8 extends Y9{constructor(J,Q,$){super(J,Q,$)}}M8.prototype.ValueTypeName="string";M8.prototype.ValueBufferType=Array;M8.prototype.DefaultInterpolation=2300;M8.prototype.InterpolantFactoryMethodLinear=void 0;M8.prototype.InterpolantFactoryMethodSmooth=void 0;class JZ extends Y9{constructor(J,Q,$,Z){super(J,Q,$,Z)}}JZ.prototype.ValueTypeName="vector";var O6={enabled:!1,files:{},add:function(J,Q){if(this.enabled===!1)return;if(UW(J))return;this.files[J]=Q},get:function(J){if(this.enabled===!1)return;if(UW(J))return;return this.files[J]},remove:function(J){delete this.files[J]},clear:function(){this.files={}}};function UW(J){try{let Q=J.slice(J.indexOf(":")+1);return new URL(Q).protocol==="blob:"}catch(Q){return!1}}class QZ{constructor(J,Q,$){let Z=this,W=!1,K=0,Y=0,X=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(Y++,W===!1){if(Z.onStart!==void 0)Z.onStart(U,K,Y)}W=!0},this.itemEnd=function(U){if(K++,Z.onProgress!==void 0)Z.onProgress(U,K,Y);if(K===Y){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(X)return X(U);return U},this.setURLModifier=function(U){return X=U,this},this.addHandler=function(U,q){return H.push(U,q),this},this.removeHandler=function(U){let q=H.indexOf(U);if(q!==-1)H.splice(q,2);return this},this.getHandler=function(U){for(let q=0,G=H.length;q<G;q+=2){let N=H[q],F=H[q+1];if(N.global)N.lastIndex=0;if(N.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var _K=new QZ;class S7{constructor(J){if(this.manager=J!==void 0?J:_K,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}S7.DEFAULT_MATERIAL_NAME="__DEFAULT";var p8=new WeakMap;class $Z extends S7{constructor(J){super(J)}load(J,Q,$,Z){if(this.path!==void 0)J=this.path+J;J=this.manager.resolveURL(J);let W=this,K=O6.get(`image:${J}`);if(K!==void 0){if(K.complete===!0)W.manager.itemStart(J),setTimeout(function(){if(Q)Q(K);W.manager.itemEnd(J)},0);else{let q=p8.get(K);if(q===void 0)q=[],p8.set(K,q);q.push({onLoad:Q,onError:Z})}return K}let Y=u8("img");function X(){if(U(),Q)Q(this);let q=p8.get(this)||[];for(let G=0;G<q.length;G++){let N=q[G];if(N.onLoad)N.onLoad(this)}p8.delete(this),W.manager.itemEnd(J)}function H(q){if(U(),Z)Z(q);O6.remove(`image:${J}`);let G=p8.get(this)||[];for(let N=0;N<G.length;N++){let F=G[N];if(F.onError)F.onError(q)}p8.delete(this),W.manager.itemError(J),W.manager.itemEnd(J)}function U(){Y.removeEventListener("load",X,!1),Y.removeEventListener("error",H,!1)}if(Y.addEventListener("load",X,!1),Y.addEventListener("error",H,!1),J.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)Y.crossOrigin=this.crossOrigin}return O6.add(`image:${J}`,Y),W.manager.itemStart(J),Y.src=J,Y}}class m6 extends S7{constructor(J){super(J)}load(J,Q,$,Z){let W=new PJ,K=new $Z(this.manager);return K.setCrossOrigin(this.crossOrigin),K.setPath(this.path),K.load(J,function(Y){if(W.image=Y,W.needsUpdate=!0,Q!==void 0)Q(W)},$,Z),W}}class j7 extends BJ{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new m0(J),this.intensity=Q}dispose(){this.dispatchEvent({type:"dispose"})}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class l6 extends j7{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(BJ.DEFAULT_UP),this.updateMatrix(),this.groundColor=new m0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var fQ=new qJ,GW=new y,NW=new y;class VK{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new k0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new qJ,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new C7,this._frameExtents=new k0(1,1),this._viewportCount=1,this._viewports=[new EJ(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera,$=this.matrix;if(GW.setFromMatrixPosition(J.matrixWorld),Q.position.copy(GW),NW.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(NW),Q.updateMatrixWorld(),fQ.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fQ,Q.coordinateSystem,Q.reversedDepth),Q.coordinateSystem===2001||Q.reversedDepth)$.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else $.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);$.multiply(fQ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};if(this.intensity!==1)J.intensity=this.intensity;if(this.bias!==0)J.bias=this.bias;if(this.normalBias!==0)J.normalBias=this.normalBias;if(this.radius!==1)J.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)J.mapSize=this.mapSize.toArray();return J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var E6=new y,R6=new Z9,V9=new y;class d6 extends BJ{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qJ,this.projectionMatrix=new qJ,this.projectionMatrixInverse=new qJ,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(E6,R6,V9),V9.x===1&&V9.y===1&&V9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(E6,R6,V9.set(1,1,1)).invert()}updateWorldMatrix(J,Q){if(super.updateWorldMatrix(J,Q),this.matrixWorld.decompose(E6,R6,V9),V9.x===1&&V9.y===1&&V9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(E6,R6,V9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var i9=new y,qW=new k0,FW=new k0;class bJ extends d6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=n8*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(F7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return n8*2*Math.atan(Math.tan(F7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){i9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(i9.x,i9.y).multiplyScalar(-J/i9.z),i9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(i9.x,i9.y).multiplyScalar(-J/i9.z)}getViewSize(J,Q){return this.getViewBounds(J,qW,FW),Q.subVectors(FW,qW)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(F7*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:X,fullHeight:H}=K;W+=K.offsetX*Z/X,Q-=K.offsetY*$/H,Z*=K.width/X,$*=K.height/H}let Y=this.filmOffset;if(Y!==0)W+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class y7 extends d6{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,Y=Z+Q,X=Z-Q;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=H*this.view.offsetX,K=W+H*this.view.width,Y-=U*this.view.offsetY,X=Y-U*this.view.height}this.projectionMatrix.makeOrthographic(W,K,Y,X,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class LK extends VK{constructor(){super(new y7(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class u6 extends j7{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(BJ.DEFAULT_UP),this.updateMatrix(),this.target=new BJ,this.shadow=new LK}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class c6 extends j7{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var m8=-90,l8=1;class ZZ extends BJ{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new bJ(m8,l8,J,Q);Z.layers=this.layers,this.add(Z);let W=new bJ(m8,l8,J,Q);W.layers=this.layers,this.add(W);let K=new bJ(m8,l8,J,Q);K.layers=this.layers,this.add(K);let Y=new bJ(m8,l8,J,Q);Y.layers=this.layers,this.add(Y);let X=new bJ(m8,l8,J,Q);X.layers=this.layers,this.add(X);let H=new bJ(m8,l8,J,Q);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,Y,X]=Q;for(let H of Q)this.remove(H);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),X.up.set(0,1,0),X.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),X.up.set(0,-1,0),X.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of Q)this.add(H),H.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,Y,X,H,U]=this.children,q=J.getRenderTarget(),G=J.getActiveCubeFace(),N=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let R=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let B=!1;if(J.isWebGLRenderer===!0)B=J.state.buffers.depth.getReversed();else B=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,3,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),J.setRenderTarget($,4,Z),B&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),$.texture.generateMipmaps=R,J.setRenderTarget($,5,Z),B&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(q,G,N),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class WZ extends bJ{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var KZ="\\[\\]\\.:\\/",OX=new RegExp("["+KZ+"]","g"),YZ="[^"+KZ+"]",MX="[^"+KZ.replace("\\.","")+"]",_X=/((?:WC+[\/:])*)/.source.replace("WC",YZ),VX=/(WCOD+)?/.source.replace("WCOD",MX),LX=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",YZ),BX=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",YZ),zX=new RegExp("^"+_X+VX+LX+BX+"$"),kX=["material","materials","bones","map"];class BK{constructor(J,Q,$){let Z=$||e0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class e0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||e0.parseTrackName(Q),this.node=e0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new e0(J,Q,$);else return new e0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(OX,"")}static parseTrackName(J){let Q=zX.exec(J);if(Q===null)throw Error("PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(kX.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let Y=W[K];if(Y.name===Q||Y.uuid===Q)return Y;let X=$(Y.children);if(X)return X}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=e0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){A0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let H=Q.objectIndex;switch($){case"materials":if(!J.material){C0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){C0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){C0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===H){H=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){C0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){C0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){C0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(H!==void 0){if(J[H]===void 0){C0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let K=J[Z];if(K===void 0){let H=Q.nodeName;C0("PropertyBinding: Trying to update property for track: "+H+"."+Z+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)Y=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)Y=this.Versioning.MatrixWorldNeedsUpdate;let X=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){C0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){C0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}X=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)X=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))X=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[X],this.setValue=this.SetterByBindingTypeAndVersioning[X][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}e0.Composite=BK;e0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};e0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};e0.prototype.GetterByBindingType=[e0.prototype._getValue_direct,e0.prototype._getValue_array,e0.prototype._getValue_arrayElement,e0.prototype._getValue_toArray];e0.prototype.SetterByBindingTypeAndVersioning=[[e0.prototype._setValue_direct,e0.prototype._setValue_direct_setNeedsUpdate,e0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[e0.prototype._setValue_array,e0.prototype._setValue_array_setNeedsUpdate,e0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[e0.prototype._setValue_arrayElement,e0.prototype._setValue_arrayElement_setNeedsUpdate,e0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[e0.prototype._setValue_fromArray,e0.prototype._setValue_fromArray_setNeedsUpdate,e0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var cN=new Float32Array(1);var DW=new qJ;class n6{constructor(J,Q,$=0,Z=1/0){this.ray=new t8(J,Q),this.near=$,this.far=Z,this.camera=null,this.layers=new k7,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(J,Q){this.ray.set(J,Q)}setFromCamera(J,Q){if(Q.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(Q.matrixWorld),this.ray.direction.set(J.x,J.y,0.5).unproject(Q).sub(this.ray.origin).normalize(),this.camera=Q;else if(Q.isOrthographicCamera)this.ray.origin.set(J.x,J.y,(Q.near+Q.far)/(Q.near-Q.far)).unproject(Q),this.ray.direction.set(0,0,-1).transformDirection(Q.matrixWorld),this.camera=Q;else C0("Raycaster: Unsupported camera type: "+Q.type)}setFromXRController(J){return DW.identity().extractRotation(J.matrixWorld),this.ray.origin.setFromMatrixPosition(J.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(DW),this}intersectObject(J,Q=!0,$=[]){return vQ(J,this,$,Q),$.sort(EW),$}intersectObjects(J,Q=!0,$=[]){for(let Z=0,W=J.length;Z<W;Z++)vQ(J[Z],this,$,Q);return $.sort(EW),$}}function EW(J,Q){return J.distance-Q.distance}function vQ(J,Q,$,Z){let W=!0;if(J.layers.test(Q.layers)){if(J.raycast(Q,$)===!1)W=!1}if(W===!0&&Z===!0){let K=J.children;for(let Y=0,X=K.length;Y<X;Y++)vQ(K[Y],Q,$,!0)}}class s6{constructor(J=!0){this.autoStart=J,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,A0("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let J=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let Q=performance.now();J=(Q-this.oldTime)/1000,this.oldTime=Q,this.elapsedTime+=J}return J}}class f7{constructor(J=1,Q=0,$=0){this.radius=J,this.phi=Q,this.theta=$}set(J,Q,$){return this.radius=J,this.phi=Q,this.theta=$,this}copy(J){return this.radius=J.radius,this.phi=J.phi,this.theta=J.theta,this}makeSafe(){return this.phi=l0(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(J){return this.setFromCartesianCoords(J.x,J.y,J.z)}setFromCartesianCoords(J,Q,$){if(this.radius=Math.sqrt(J*J+Q*Q+$*$),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(J,$),this.phi=Math.acos(l0(Q/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}class XZ{static{XZ.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}class i6 extends z9{constructor(J,Q=null){super();this.object=J,this.domElement=Q,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(J){if(J===void 0){A0("Controls: connect() now requires an element.");return}if(this.domElement!==null)this.disconnect();this.domElement=J}disconnect(){}dispose(){}update(){}}function HZ(J,Q,$,Z){let W=IX(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function IX(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));if(typeof window<"u")if(window.__THREE__)A0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="184";function cK(){let J=null,Q=!1,$=null,Z=null;function W(K,Y){$(K,Y),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function AX(J){let Q=new WeakMap;function $(X,H){let{array:U,usage:q}=X,G=U.byteLength,N=J.createBuffer();J.bindBuffer(H,N),J.bufferData(H,U,q),X.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(X.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:N,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:X.version,size:G}}function Z(X,H,U){let{array:q,updateRanges:G}=H;if(J.bindBuffer(U,X),G.length===0)J.bufferSubData(U,0,q);else{G.sort((F,R)=>F.start-R.start);let N=0;for(let F=1;F<G.length;F++){let R=G[N],B=G[F];if(B.start<=R.start+R.count+1)R.count=Math.max(R.count,B.start+B.count-R.start);else++N,G[N]=B}G.length=N+1;for(let F=0,R=G.length;F<R;F++){let B=G[F];J.bufferSubData(U,B.start*q.BYTES_PER_ELEMENT,q,B.start,B.count)}H.clearUpdateRanges()}H.onUploadCallback()}function W(X){if(X.isInterleavedBufferAttribute)X=X.data;return Q.get(X)}function K(X){if(X.isInterleavedBufferAttribute)X=X.data;let H=Q.get(X);if(H)J.deleteBuffer(H.buffer),Q.delete(X)}function Y(X,H){if(X.isInterleavedBufferAttribute)X=X.data;if(X.isGLBufferAttribute){let q=Q.get(X);if(!q||q.version<X.version)Q.set(X,{buffer:X.buffer,type:X.type,bytesPerElement:X.elementSize,version:X.version});return}let U=Q.get(X);if(U===void 0)Q.set(X,$(X,H));else if(U.version<X.version){if(U.size!==X.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,X,H),U.version=X.version}}return{get:W,remove:K,update:Y}}var PX=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wX=`#ifdef USE_ALPHAHASH
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
#endif`,CX=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,TX=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SX=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jX=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yX=`#ifdef USE_AOMAP
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
#endif`,fX=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vX=`#ifdef USE_BATCHING
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
#endif`,xX=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hX=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bX=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pX=`#ifdef USE_IRIDESCENCE
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
#endif`,mX=`#ifdef USE_BUMPMAP
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
#endif`,lX=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,iX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,oX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,aX=`#define PI 3.141592653589793
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
} // validated`,rX=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tX=`vec3 transformedNormal = objectNormal;
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
#endif`,eX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QH=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$H=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ZH="gl_FragColor = linearToOutputTexel( gl_FragColor );",WH=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,KH=`#ifdef USE_ENVMAP
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
#endif`,YH=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,XH=`#ifdef USE_ENVMAP
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
#endif`,HH=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,UH=`#ifdef USE_ENVMAP
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
#endif`,GH=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NH=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qH=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,FH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,DH=`#ifdef USE_GRADIENTMAP
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
}`,EH=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,OH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,MH=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,_H=`#ifdef USE_ENVMAP
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
#endif`,VH=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BH=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kH=`PhysicalMaterial material;
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
#endif`,IH=`uniform sampler2D dfgLUT;
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
}`,AH=`
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
#endif`,PH=`#if defined( RE_IndirectDiffuse )
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
#endif`,wH=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,CH=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,TH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,SH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fH=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vH=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xH=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hH=`#if defined( USE_POINTS_UV )
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
#endif`,bH=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gH=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pH=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mH=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lH=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dH=`#ifdef USE_MORPHTARGETS
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
#endif`,uH=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cH=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nH=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oH=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aH=`#ifdef USE_NORMALMAP
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
#endif`,rH=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tH=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eH=`#ifdef USE_CLEARCOATMAP
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
#endif`,HU=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,UU=`#if NUM_SPOT_LIGHT_COORDS > 0
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
}`,FU=`#ifdef USE_SKINNING
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
#endif`,EU=`#ifdef USE_SKINNING
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
#endif`,OU=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,MU=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_U=`#if defined( TONE_MAPPING )
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
#endif`,kU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IU=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
}`,fU=`#if DEPTH_PACKING == 3200
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
}`,vU=`#define DISTANCE
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
}`,JG=`#define TOON
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
}`,QG=`uniform float size;
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
}`,$G=`uniform vec3 diffuse;
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
}`,ZG=`#include <common>
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
}`,WG=`uniform vec3 color;
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
}`,KG=`uniform float rotation;
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
}`,YG=`uniform vec3 diffuse;
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
}`,h0={alphahash_fragment:PX,alphahash_pars_fragment:wX,alphamap_fragment:CX,alphamap_pars_fragment:TX,alphatest_fragment:SX,alphatest_pars_fragment:jX,aomap_fragment:yX,aomap_pars_fragment:fX,batching_pars_vertex:vX,batching_vertex:xX,begin_vertex:hX,beginnormal_vertex:bX,bsdfs:gX,iridescence_fragment:pX,bumpmap_pars_fragment:mX,clipping_planes_fragment:lX,clipping_planes_pars_fragment:dX,clipping_planes_pars_vertex:uX,clipping_planes_vertex:cX,color_fragment:nX,color_pars_fragment:sX,color_pars_vertex:iX,color_vertex:oX,common:aX,cube_uv_reflection_fragment:rX,defaultnormal_vertex:tX,displacementmap_pars_vertex:eX,displacementmap_vertex:JH,emissivemap_fragment:QH,emissivemap_pars_fragment:$H,colorspace_fragment:ZH,colorspace_pars_fragment:WH,envmap_fragment:KH,envmap_common_pars_fragment:YH,envmap_pars_fragment:XH,envmap_pars_vertex:HH,envmap_physical_pars_fragment:_H,envmap_vertex:UH,fog_vertex:GH,fog_pars_vertex:NH,fog_fragment:qH,fog_pars_fragment:FH,gradientmap_pars_fragment:DH,lightmap_pars_fragment:EH,lights_lambert_fragment:RH,lights_lambert_pars_fragment:OH,lights_pars_begin:MH,lights_toon_fragment:VH,lights_toon_pars_fragment:LH,lights_phong_fragment:BH,lights_phong_pars_fragment:zH,lights_physical_fragment:kH,lights_physical_pars_fragment:IH,lights_fragment_begin:AH,lights_fragment_maps:PH,lights_fragment_end:wH,lightprobes_pars_fragment:CH,logdepthbuf_fragment:TH,logdepthbuf_pars_fragment:SH,logdepthbuf_pars_vertex:jH,logdepthbuf_vertex:yH,map_fragment:fH,map_pars_fragment:vH,map_particle_fragment:xH,map_particle_pars_fragment:hH,metalnessmap_fragment:bH,metalnessmap_pars_fragment:gH,morphinstance_vertex:pH,morphcolor_vertex:mH,morphnormal_vertex:lH,morphtarget_pars_vertex:dH,morphtarget_vertex:uH,normal_fragment_begin:cH,normal_fragment_maps:nH,normal_pars_fragment:sH,normal_pars_vertex:iH,normal_vertex:oH,normalmap_pars_fragment:aH,clearcoat_normal_fragment_begin:rH,clearcoat_normal_fragment_maps:tH,clearcoat_pars_fragment:eH,iridescence_pars_fragment:JU,opaque_fragment:QU,packing:$U,premultiplied_alpha_fragment:ZU,project_vertex:WU,dithering_fragment:KU,dithering_pars_fragment:YU,roughnessmap_fragment:XU,roughnessmap_pars_fragment:HU,shadowmap_pars_fragment:UU,shadowmap_pars_vertex:GU,shadowmap_vertex:NU,shadowmask_pars_fragment:qU,skinbase_vertex:FU,skinning_pars_vertex:DU,skinning_vertex:EU,skinnormal_vertex:RU,specularmap_fragment:OU,specularmap_pars_fragment:MU,tonemapping_fragment:_U,tonemapping_pars_fragment:VU,transmission_fragment:LU,transmission_pars_fragment:BU,uv_pars_fragment:zU,uv_pars_vertex:kU,uv_vertex:IU,worldpos_vertex:AU,background_vert:PU,background_frag:wU,backgroundCube_vert:CU,backgroundCube_frag:TU,cube_vert:SU,cube_frag:jU,depth_vert:yU,depth_frag:fU,distance_vert:vU,distance_frag:xU,equirect_vert:hU,equirect_frag:bU,linedashed_vert:gU,linedashed_frag:pU,meshbasic_vert:mU,meshbasic_frag:lU,meshlambert_vert:dU,meshlambert_frag:uU,meshmatcap_vert:cU,meshmatcap_frag:nU,meshnormal_vert:sU,meshnormal_frag:iU,meshphong_vert:oU,meshphong_frag:aU,meshphysical_vert:rU,meshphysical_frag:tU,meshtoon_vert:eU,meshtoon_frag:JG,points_vert:QG,points_frag:$G,shadow_vert:ZG,shadow_frag:WG,sprite_vert:KG,sprite_frag:YG},X0={common:{diffuse:{value:new m0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new j0},alphaMap:{value:null},alphaMapTransform:{value:new j0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new j0}},envmap:{envMap:{value:null},envMapRotation:{value:new j0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new j0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new j0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new j0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new j0},normalScale:{value:new k0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new j0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new j0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new j0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new j0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new m0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new y},probesMax:{value:new y},probesResolution:{value:new y}},points:{diffuse:{value:new m0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new j0},alphaTest:{value:0},uvTransform:{value:new j0}},sprite:{diffuse:{value:new m0(16777215)},opacity:{value:1},center:{value:new k0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new j0},alphaMap:{value:null},alphaMapTransform:{value:new j0},alphaTest:{value:0}}},I9={basic:{uniforms:vJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.fog]),vertexShader:h0.meshbasic_vert,fragmentShader:h0.meshbasic_frag},lambert:{uniforms:vJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,X0.lights,{emissive:{value:new m0(0)},envMapIntensity:{value:1}}]),vertexShader:h0.meshlambert_vert,fragmentShader:h0.meshlambert_frag},phong:{uniforms:vJ([X0.common,X0.specularmap,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,X0.lights,{emissive:{value:new m0(0)},specular:{value:new m0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:h0.meshphong_vert,fragmentShader:h0.meshphong_frag},standard:{uniforms:vJ([X0.common,X0.envmap,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.roughnessmap,X0.metalnessmap,X0.fog,X0.lights,{emissive:{value:new m0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:h0.meshphysical_vert,fragmentShader:h0.meshphysical_frag},toon:{uniforms:vJ([X0.common,X0.aomap,X0.lightmap,X0.emissivemap,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.gradientmap,X0.fog,X0.lights,{emissive:{value:new m0(0)}}]),vertexShader:h0.meshtoon_vert,fragmentShader:h0.meshtoon_frag},matcap:{uniforms:vJ([X0.common,X0.bumpmap,X0.normalmap,X0.displacementmap,X0.fog,{matcap:{value:null}}]),vertexShader:h0.meshmatcap_vert,fragmentShader:h0.meshmatcap_frag},points:{uniforms:vJ([X0.points,X0.fog]),vertexShader:h0.points_vert,fragmentShader:h0.points_frag},dashed:{uniforms:vJ([X0.common,X0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:h0.linedashed_vert,fragmentShader:h0.linedashed_frag},depth:{uniforms:vJ([X0.common,X0.displacementmap]),vertexShader:h0.depth_vert,fragmentShader:h0.depth_frag},normal:{uniforms:vJ([X0.common,X0.bumpmap,X0.normalmap,X0.displacementmap,{opacity:{value:1}}]),vertexShader:h0.meshnormal_vert,fragmentShader:h0.meshnormal_frag},sprite:{uniforms:vJ([X0.sprite,X0.fog]),vertexShader:h0.sprite_vert,fragmentShader:h0.sprite_frag},background:{uniforms:{uvTransform:{value:new j0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:h0.background_vert,fragmentShader:h0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new j0}},vertexShader:h0.backgroundCube_vert,fragmentShader:h0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:h0.cube_vert,fragmentShader:h0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:h0.equirect_vert,fragmentShader:h0.equirect_frag},distance:{uniforms:vJ([X0.common,X0.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:h0.distance_vert,fragmentShader:h0.distance_frag},shadow:{uniforms:vJ([X0.lights,X0.fog,{color:{value:new m0(0)},opacity:{value:1}}]),vertexShader:h0.shadow_vert,fragmentShader:h0.shadow_frag}};I9.physical={uniforms:vJ([I9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new j0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new j0},clearcoatNormalScale:{value:new k0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new j0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new j0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new j0},sheen:{value:0},sheenColor:{value:new m0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new j0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new j0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new j0},transmissionSamplerSize:{value:new k0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new j0},attenuationDistance:{value:0},attenuationColor:{value:new m0(0)},specularColor:{value:new m0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new j0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new j0},anisotropyVector:{value:new k0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new j0}}]),vertexShader:h0.meshphysical_vert,fragmentShader:h0.meshphysical_frag};var o6={r:0,b:0,g:0},XG=new qJ,nK=new j0;nK.set(-1,0,0,0,1,0,0,0,1);function HG(J,Q,$,Z,W,K){let Y=new m0(0),X=W===!0?0:1,H,U,q=null,G=0,N=null;function F(M){let L=M.isScene===!0?M.background:null;if(L&&L.isTexture){let z=M.backgroundBlurriness>0;L=Q.get(L,z)}return L}function R(M){let L=!1,z=F(M);if(z===null)D(Y,X);else if(z&&z.isColor)D(z,1),L=!0;let w=J.xr.getEnvironmentBlendMode();if(w==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(w==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||L)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function B(M,L){let z=F(L);if(z&&(z.isCubeTexture||z.mapping===_7)){if(U===void 0)U=new FJ(new lJ(1,1,1),new K9({name:"BackgroundCubeMaterial",uniforms:E8(I9.backgroundCube.uniforms),vertexShader:I9.backgroundCube.vertexShader,fragmentShader:I9.backgroundCube.fragmentShader,side:pJ,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(w,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=z,U.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(XG.makeRotationFromEuler(L.backgroundRotation)).transpose(),z.isCubeTexture&&z.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(nK);if(U.material.toneMapped=c0.getTransfer(z.colorSpace)!==XJ,q!==z||G!==z.version||N!==J.toneMapping)U.material.needsUpdate=!0,q=z,G=z.version,N=J.toneMapping;U.layers.enableAll(),M.unshift(U,U.geometry,U.material,0,0,null)}else if(z&&z.isTexture){if(H===void 0)H=new FJ(new b9(2,2),new K9({name:"BackgroundMaterial",uniforms:E8(I9.background.uniforms),vertexShader:I9.background.vertexShader,fragmentShader:I9.background.fragmentShader,side:i8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),H.geometry.deleteAttribute("normal"),Object.defineProperty(H.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(H);if(H.material.uniforms.t2D.value=z,H.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,H.material.toneMapped=c0.getTransfer(z.colorSpace)!==XJ,z.matrixAutoUpdate===!0)z.updateMatrix();if(H.material.uniforms.uvTransform.value.copy(z.matrix),q!==z||G!==z.version||N!==J.toneMapping)H.material.needsUpdate=!0,q=z,G=z.version,N=J.toneMapping;H.layers.enableAll(),M.unshift(H,H.geometry,H.material,0,0,null)}}function D(M,L){M.getRGB(o6,d$(J)),$.buffers.color.setClear(o6.r,o6.g,o6.b,L,K)}function E(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(H!==void 0)H.geometry.dispose(),H.material.dispose(),H=void 0}return{getClearColor:function(){return Y},setClearColor:function(M,L=1){Y.set(M),X=L,D(Y,X)},getClearAlpha:function(){return X},setClearAlpha:function(M){X=M,D(Y,X)},render:R,addToRenderList:B,dispose:E}}function UG(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=N(null),K=W,Y=!1;function X(A,m,c,f,l){let b=!1,p=G(A,f,c,m);if(K!==p)K=p,U(K.object);if(b=F(A,f,c,l),b)R(A,f,c,l);if(l!==null)Q.update(l,J.ELEMENT_ARRAY_BUFFER);if(b||Y){if(Y=!1,z(A,m,c,f),l!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(l).buffer)}}function H(){return J.createVertexArray()}function U(A){return J.bindVertexArray(A)}function q(A){return J.deleteVertexArray(A)}function G(A,m,c,f){let l=f.wireframe===!0,b=Z[m.id];if(b===void 0)b={},Z[m.id]=b;let p=A.isInstancedMesh===!0?A.id:0,a=b[p];if(a===void 0)a={},b[p]=a;let Q0=a[c.id];if(Q0===void 0)Q0={},a[c.id]=Q0;let F0=Q0[l];if(F0===void 0)F0=N(H()),Q0[l]=F0;return F0}function N(A){let m=[],c=[],f=[];for(let l=0;l<$;l++)m[l]=0,c[l]=0,f[l]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:c,attributeDivisors:f,object:A,attributes:{},index:null}}function F(A,m,c,f){let l=K.attributes,b=m.attributes,p=0,a=c.getAttributes();for(let Q0 in a)if(a[Q0].location>=0){let I0=l[Q0],M0=b[Q0];if(M0===void 0){if(Q0==="instanceMatrix"&&A.instanceMatrix)M0=A.instanceMatrix;if(Q0==="instanceColor"&&A.instanceColor)M0=A.instanceColor}if(I0===void 0)return!0;if(I0.attribute!==M0)return!0;if(M0&&I0.data!==M0.data)return!0;p++}if(K.attributesNum!==p)return!0;if(K.index!==f)return!0;return!1}function R(A,m,c,f){let l={},b=m.attributes,p=0,a=c.getAttributes();for(let Q0 in a)if(a[Q0].location>=0){let I0=b[Q0];if(I0===void 0){if(Q0==="instanceMatrix"&&A.instanceMatrix)I0=A.instanceMatrix;if(Q0==="instanceColor"&&A.instanceColor)I0=A.instanceColor}let M0={};if(M0.attribute=I0,I0&&I0.data)M0.data=I0.data;l[Q0]=M0,p++}K.attributes=l,K.attributesNum=p,K.index=f}function B(){let A=K.newAttributes;for(let m=0,c=A.length;m<c;m++)A[m]=0}function D(A){E(A,0)}function E(A,m){let{newAttributes:c,enabledAttributes:f,attributeDivisors:l}=K;if(c[A]=1,f[A]===0)J.enableVertexAttribArray(A),f[A]=1;if(l[A]!==m)J.vertexAttribDivisor(A,m),l[A]=m}function M(){let{newAttributes:A,enabledAttributes:m}=K;for(let c=0,f=m.length;c<f;c++)if(m[c]!==A[c])J.disableVertexAttribArray(c),m[c]=0}function L(A,m,c,f,l,b,p){if(p===!0)J.vertexAttribIPointer(A,m,c,l,b);else J.vertexAttribPointer(A,m,c,f,l,b)}function z(A,m,c,f){B();let l=f.attributes,b=c.getAttributes(),p=m.defaultAttributeValues;for(let a in b){let Q0=b[a];if(Q0.location>=0){let F0=l[a];if(F0===void 0){if(a==="instanceMatrix"&&A.instanceMatrix)F0=A.instanceMatrix;if(a==="instanceColor"&&A.instanceColor)F0=A.instanceColor}if(F0!==void 0){let{normalized:I0,itemSize:M0}=F0,r0=Q.get(F0);if(r0===void 0)continue;let{buffer:d0,type:s,bytesPerElement:N0}=r0,V0=s===J.INT||s===J.UNSIGNED_INT||F0.gpuType===iQ;if(F0.isInterleavedBufferAttribute){let q0=F0.data,P0=q0.stride,a0=F0.offset;if(q0.isInstancedInterleavedBuffer){for(let b0=0;b0<Q0.locationSize;b0++)E(Q0.location+b0,q0.meshPerAttribute);if(A.isInstancedMesh!==!0&&f._maxInstanceCount===void 0)f._maxInstanceCount=q0.meshPerAttribute*q0.count}else for(let b0=0;b0<Q0.locationSize;b0++)D(Q0.location+b0);J.bindBuffer(J.ARRAY_BUFFER,d0);for(let b0=0;b0<Q0.locationSize;b0++)L(Q0.location+b0,M0/Q0.locationSize,s,I0,P0*N0,(a0+M0/Q0.locationSize*b0)*N0,V0)}else{if(F0.isInstancedBufferAttribute){for(let q0=0;q0<Q0.locationSize;q0++)E(Q0.location+q0,F0.meshPerAttribute);if(A.isInstancedMesh!==!0&&f._maxInstanceCount===void 0)f._maxInstanceCount=F0.meshPerAttribute*F0.count}else for(let q0=0;q0<Q0.locationSize;q0++)D(Q0.location+q0);J.bindBuffer(J.ARRAY_BUFFER,d0);for(let q0=0;q0<Q0.locationSize;q0++)L(Q0.location+q0,M0/Q0.locationSize,s,I0,M0*N0,M0/Q0.locationSize*q0*N0,V0)}}else if(p!==void 0){let I0=p[a];if(I0!==void 0)switch(I0.length){case 2:J.vertexAttrib2fv(Q0.location,I0);break;case 3:J.vertexAttrib3fv(Q0.location,I0);break;case 4:J.vertexAttrib4fv(Q0.location,I0);break;default:J.vertexAttrib1fv(Q0.location,I0)}}}}M()}function w(){I();for(let A in Z){let m=Z[A];for(let c in m){let f=m[c];for(let l in f){let b=f[l];for(let p in b)q(b[p].object),delete b[p];delete f[l]}}delete Z[A]}}function P(A){if(Z[A.id]===void 0)return;let m=Z[A.id];for(let c in m){let f=m[c];for(let l in f){let b=f[l];for(let p in b)q(b[p].object),delete b[p];delete f[l]}}delete Z[A.id]}function C(A){for(let m in Z){let c=Z[m];for(let f in c){let l=c[f];if(l[A.id]===void 0)continue;let b=l[A.id];for(let p in b)q(b[p].object),delete b[p];delete l[A.id]}}}function V(A){for(let m in Z){let c=Z[m],f=A.isInstancedMesh===!0?A.id:0,l=c[f];if(l===void 0)continue;for(let b in l){let p=l[b];for(let a in p)q(p[a].object),delete p[a];delete l[b]}if(delete c[f],Object.keys(c).length===0)delete Z[m]}}function I(){if(d(),Y=!0,K===W)return;K=W,U(K.object)}function d(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:X,reset:I,resetDefaultState:d,dispose:w,releaseStatesOfGeometry:P,releaseStatesOfObject:V,releaseStatesOfProgram:C,initAttributes:B,enableAttribute:D,disableUnusedAttributes:M}}function GG(J,Q,$){let Z;function W(H){Z=H}function K(H,U){J.drawArrays(Z,H,U),$.update(U,Z,1)}function Y(H,U,q){if(q===0)return;J.drawArraysInstanced(Z,H,U,q),$.update(U,Z,q)}function X(H,U,q){if(q===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,H,0,U,0,q);let N=0;for(let F=0;F<q;F++)N+=U[F];$.update(N,Z,1)}this.setMode=W,this.render=K,this.renderInstances=Y,this.renderMultiDraw=X}function NG(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let C=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function Y(C){if(C!==B9&&Z.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function X(C){let V=C===h9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(C!==E9&&Z.convert(C)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==x9&&!V)return!1;return!0}function H(C){if(C==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";C="mediump"}if(C==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",q=H(U);if(q!==U)A0("WebGLRenderer:",U,"not supported, using",q,"instead."),U=q;let G=$.logarithmicDepthBuffer===!0,N=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&N===!1)A0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),B=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),M=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),L=J.getParameter(J.MAX_VARYING_VECTORS),z=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),w=J.getParameter(J.MAX_SAMPLES),P=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:H,textureFormatReadable:Y,textureTypeReadable:X,precision:U,logarithmicDepthBuffer:G,reversedDepthBuffer:N,maxTextures:F,maxVertexTextures:R,maxTextureSize:B,maxCubemapSize:D,maxAttributes:E,maxVertexUniforms:M,maxVaryings:L,maxFragmentUniforms:z,maxSamples:w,samples:P}}function qG(J){let Q=this,$=null,Z=0,W=!1,K=!1,Y=new q9,X=new j0,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(G,N){let F=G.length!==0||N||Z!==0||W;return W=N,Z=G.length,F},this.beginShadows=function(){K=!0,q(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(G,N){$=q(G,N,0)},this.setState=function(G,N,F){let{clippingPlanes:R,clipIntersection:B,clipShadows:D}=G,E=J.get(G);if(!W||R===null||R.length===0||K&&!D)if(K)q(null);else U();else{let M=K?0:Z,L=M*4,z=E.clippingState||null;H.value=z,z=q(R,N,L,F);for(let w=0;w!==L;++w)z[w]=$[w];E.clippingState=z,this.numIntersection=B?this.numPlanes:0,this.numPlanes+=M}};function U(){if(H.value!==$)H.value=$,H.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function q(G,N,F,R){let B=G!==null?G.length:0,D=null;if(B!==0){if(D=H.value,R!==!0||D===null){let E=F+B*4,M=N.matrixWorldInverse;if(X.getNormalMatrix(M),D===null||D.length<E)D=new Float32Array(E);for(let L=0,z=F;L!==B;++L,z+=4)Y.copy(G[L]).applyMatrix4(M,X),Y.normal.toArray(D,z),D[z+3]=Y.constant}H.value=D,H.needsUpdate=!0}return Q.numPlanes=B,Q.numIntersection=0,D}}var $8=4,zK=[0.125,0.215,0.35,0.446,0.526,0.582],_8=20,FG=256,v7=new y7,kK=new m0,UZ=null,GZ=0,NZ=0,qZ=!1,DG=new y;class EZ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:Y=DG}=W;UZ=this._renderer.getRenderTarget(),GZ=this._renderer.getActiveCubeFace(),NZ=this._renderer.getActiveMipmapLevel(),qZ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let X=this._allocateTargets();if(X.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,X,Y),Q>0)this._blur(X,0,0,Q);return this._applyPMREM(X),this._cleanup(X),X}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=PK(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=AK(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(UZ,GZ,NZ),this._renderer.xr.enabled=qZ,J.scissorTest=!1,J7(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===a8||J.mapping===H8)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);UZ=this._renderer.getRenderTarget(),GZ=this._renderer.getActiveCubeFace(),NZ=this._renderer.getActiveMipmapLevel(),qZ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:mJ,minFilter:mJ,generateMipmaps:!1,type:h9,format:B9,colorSpace:S$,depthBuffer:!1},Z=IK(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=IK(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=EG(W)),this._blurMaterial=OG(W,J,Q),this._ggxMaterial=RG(W,J,Q)}return Z}_compileMaterial(J){let Q=new FJ(new aJ,J);this._renderer.compile(Q,v7)}_sceneToCubeUV(J,Q,$,Z,W){let X=new bJ(90,1,Q,$),H=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],q=this._renderer,G=q.autoClear,N=q.toneMapping;if(q.getClearColor(kK),q.toneMapping=D9,q.autoClear=!1,q.state.buffers.depth.getReversed())q.setRenderTarget(Z),q.clearDepth(),q.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new FJ(new lJ,new J8({name:"PMREM.Background",side:pJ,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,B=R.material,D=!1,E=J.background;if(E){if(E.isColor)B.color.copy(E),J.background=null,D=!0}else B.color.copy(kK),D=!0;for(let M=0;M<6;M++){let L=M%3;if(L===0)X.up.set(0,H[M],0),X.position.set(W.x,W.y,W.z),X.lookAt(W.x+U[M],W.y,W.z);else if(L===1)X.up.set(0,0,H[M]),X.position.set(W.x,W.y,W.z),X.lookAt(W.x,W.y+U[M],W.z);else X.up.set(0,H[M],0),X.position.set(W.x,W.y,W.z),X.lookAt(W.x,W.y,W.z+U[M]);let z=this._cubeSize;if(J7(Z,L*z,M>2?z:0,z,z),q.setRenderTarget(Z),D)q.render(R,X);q.render(J,X)}q.toneMapping=N,q.autoClear=G,J.background=E}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===a8||J.mapping===H8;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=PK();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=AK();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let Y=W.uniforms;Y.envMap.value=J;let X=this._cubeSize;J7(Q,0,0,3*X,2*X),$.setRenderTarget(Q),$.render(K,v7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,Y=this._lodMeshes[$];Y.material=K;let X=K.uniforms,H=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),q=Math.sqrt(H*H-U*U),G=0+H*1.25,N=q*G,{_lodMax:F}=this,R=this._sizeLods[$],B=3*R*($>F-$8?$-F+$8:0),D=4*(this._cubeSize-R);X.envMap.value=J.texture,X.roughness.value=N,X.mipInt.value=F-Q,J7(W,B,D,3*R,2*R),Z.setRenderTarget(W),Z.render(Y,v7),X.envMap.value=W.texture,X.roughness.value=0,X.mipInt.value=F-$,J7(J,B,D,3*R,2*R),Z.setRenderTarget(J),Z.render(Y,v7)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,Y){let X=this._renderer,H=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")C0("blur direction must be either latitudinal or longitudinal!");let U=3,q=this._lodMeshes[Z];q.material=H;let G=H.uniforms,N=this._sizeLods[$]-1,F=isFinite(W)?Math.PI/(2*N):2*Math.PI/(2*_8-1),R=W/F,B=isFinite(W)?1+Math.floor(U*R):_8;if(B>_8)A0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${B} samples when the maximum is set to ${_8}`);let D=[],E=0;for(let P=0;P<_8;++P){let C=P/R,V=Math.exp(-C*C/2);if(D.push(V),P===0)E+=V;else if(P<B)E+=2*V}for(let P=0;P<D.length;P++)D[P]=D[P]/E;if(G.envMap.value=J.texture,G.samples.value=B,G.weights.value=D,G.latitudinal.value=K==="latitudinal",Y)G.poleAxis.value=Y;let{_lodMax:M}=this;G.dTheta.value=F,G.mipInt.value=M-$;let L=this._sizeLods[Z],z=3*L*(Z>M-$8?Z-M+$8:0),w=4*(this._cubeSize-L);J7(Q,z,w,3*L,2*L),X.setRenderTarget(Q),X.render(q,v7)}}function EG(J){let Q=[],$=[],Z=[],W=J,K=J-$8+1+zK.length;for(let Y=0;Y<K;Y++){let X=Math.pow(2,W);Q.push(X);let H=1/X;if(Y>J-$8)H=zK[Y-J+$8-1];else if(Y===0)H=0;$.push(H);let U=1/(X-2),q=-U,G=1+U,N=[q,q,G,q,G,G,q,q,G,G,q,G],F=6,R=6,B=3,D=2,E=1,M=new Float32Array(B*R*F),L=new Float32Array(D*R*F),z=new Float32Array(E*R*F);for(let P=0;P<F;P++){let C=P%3*2/3-1,V=P>2?0:-1,I=[C,V,0,C+0.6666666666666666,V,0,C+0.6666666666666666,V+1,0,C,V,0,C+0.6666666666666666,V+1,0,C,V+1,0];M.set(I,B*R*P),L.set(N,D*R*P);let d=[P,P,P,P,P,P];z.set(d,E*R*P)}let w=new aJ;if(w.setAttribute("position",new oJ(M,B)),w.setAttribute("uv",new oJ(L,D)),w.setAttribute("faceIndex",new oJ(z,E)),Z.push(new FJ(w,null)),W>$8)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function IK(J,Q,$){let Z=new W9(J,Q,$);return Z.texture.mapping=_7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function J7(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function RG(J,Q,$){return new K9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:FG,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:r6(),fragmentShader:`

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
		`,blending:L9,depthTest:!1,depthWrite:!1})}function OG(J,Q,$){let Z=new Float32Array(_8),W=new y(0,1,0);return new K9({name:"SphericalGaussianBlur",defines:{n:_8,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:r6(),fragmentShader:`

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
		`,blending:L9,depthTest:!1,depthWrite:!1})}function AK(){return new K9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:r6(),fragmentShader:`

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
		`,blending:L9,depthTest:!1,depthWrite:!1})}function PK(){return new K9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:r6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:L9,depthTest:!1,depthWrite:!1})}function r6(){return`

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
	`}class MZ extends W9{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new h6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new lJ(5,5,5),W=new K9({name:"CubemapFromEquirect",uniforms:E8($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:pJ,blending:L9});W.uniforms.tEquirect.value=Q;let K=new FJ(Z,W),Y=Q.minFilter;if(Q.minFilter===U8)Q.minFilter=mJ;return new ZZ(1,10,this).update(J,K),Q.minFilter=Y,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}}function MG(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(N,F=!1){if(N===null||N===void 0)return null;if(F)return Y(N);return K(N)}function K(N){if(N&&N.isTexture){let F=N.mapping;if(F===V6||F===L6)if(Q.has(N)){let R=Q.get(N).texture;return X(R,N.mapping)}else{let R=N.image;if(R&&R.height>0){let B=new MZ(R.height);return B.fromEquirectangularTexture(J,N),Q.set(N,B),N.addEventListener("dispose",U),X(B.texture,N.mapping)}else return null}}return N}function Y(N){if(N&&N.isTexture){let F=N.mapping,R=F===V6||F===L6,B=F===a8||F===H8;if(R||B){let D=$.get(N),E=D!==void 0?D.texture.pmremVersion:0;if(N.isRenderTargetTexture&&N.pmremVersion!==E){if(Z===null)Z=new EZ(J);return D=R?Z.fromEquirectangular(N,D):Z.fromCubemap(N,D),D.texture.pmremVersion=N.pmremVersion,$.set(N,D),D.texture}else if(D!==void 0)return D.texture;else{let M=N.image;if(R&&M&&M.height>0||B&&M&&H(M)){if(Z===null)Z=new EZ(J);return D=R?Z.fromEquirectangular(N):Z.fromCubemap(N),D.texture.pmremVersion=N.pmremVersion,$.set(N,D),N.addEventListener("dispose",q),D.texture}else return null}}}return N}function X(N,F){if(F===V6)N.mapping=a8;else if(F===L6)N.mapping=H8;return N}function H(N){let F=0,R=6;for(let B=0;B<R;B++)if(N[B]!==void 0)F++;return F===R}function U(N){let F=N.target;F.removeEventListener("dispose",U);let R=Q.get(F);if(R!==void 0)Q.delete(F),R.dispose()}function q(N){let F=N.target;F.removeEventListener("dispose",q);let R=$.get(F);if(R!==void 0)$.delete(F),R.dispose()}function G(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:G}}function _G(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)M6("WebGLRenderer: "+Z+" extension not supported.");return W}}}function VG(J,Q,$,Z){let W={},K=new WeakMap;function Y(G){let N=G.target;if(N.index!==null)Q.remove(N.index);for(let R in N.attributes)Q.remove(N.attributes[R]);N.removeEventListener("dispose",Y),delete W[N.id];let F=K.get(N);if(F)Q.remove(F),K.delete(N);if(Z.releaseStatesOfGeometry(N),N.isInstancedBufferGeometry===!0)delete N._maxInstanceCount;$.memory.geometries--}function X(G,N){if(W[N.id]===!0)return N;return N.addEventListener("dispose",Y),W[N.id]=!0,$.memory.geometries++,N}function H(G){let N=G.attributes;for(let F in N)Q.update(N[F],J.ARRAY_BUFFER)}function U(G){let N=[],F=G.index,R=G.attributes.position,B=0;if(R===void 0)return;if(F!==null){let M=F.array;B=F.version;for(let L=0,z=M.length;L<z;L+=3){let w=M[L+0],P=M[L+1],C=M[L+2];N.push(w,P,P,C,C,w)}}else{let M=R.array;B=R.version;for(let L=0,z=M.length/3-1;L<z;L+=3){let w=L+0,P=L+1,C=L+2;N.push(w,P,P,C,C,w)}}let D=new(R.count>=65535?v6:f6)(N,1);D.version=B;let E=K.get(G);if(E)Q.remove(E);K.set(G,D)}function q(G){let N=K.get(G);if(N){let F=G.index;if(F!==null){if(N.version<F.version)U(G)}}else U(G);return K.get(G)}return{get:X,update:H,getWireframeAttribute:q}}function LG(J,Q,$){let Z;function W(G){Z=G}let K,Y;function X(G){K=G.type,Y=G.bytesPerElement}function H(G,N){J.drawElements(Z,N,K,G*Y),$.update(N,Z,1)}function U(G,N,F){if(F===0)return;J.drawElementsInstanced(Z,N,K,G*Y,F),$.update(N,Z,F)}function q(G,N,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,N,0,K,G,0,F);let B=0;for(let D=0;D<F;D++)B+=N[D];$.update(B,Z,1)}this.setMode=W,this.setIndex=X,this.render=H,this.renderInstances=U,this.renderMultiDraw=q}function BG(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,Y,X){switch($.calls++,Y){case J.TRIANGLES:$.triangles+=X*(K/3);break;case J.LINES:$.lines+=X*(K/2);break;case J.LINE_STRIP:$.lines+=X*(K-1);break;case J.LINE_LOOP:$.lines+=X*K;break;case J.POINTS:$.points+=X*K;break;default:C0("WebGLInfo: Unknown draw mode:",Y);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function zG(J,Q,$){let Z=new WeakMap,W=new EJ;function K(Y,X,H){let U=Y.morphTargetInfluences,q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,G=q!==void 0?q.length:0,N=Z.get(X);if(N===void 0||N.count!==G){let I=function(){C.dispose(),Z.delete(X),X.removeEventListener("dispose",I)};if(N!==void 0)N.texture.dispose();let F=X.morphAttributes.position!==void 0,R=X.morphAttributes.normal!==void 0,B=X.morphAttributes.color!==void 0,D=X.morphAttributes.position||[],E=X.morphAttributes.normal||[],M=X.morphAttributes.color||[],L=0;if(F===!0)L=1;if(R===!0)L=2;if(B===!0)L=3;let z=X.attributes.position.count*L,w=1;if(z>Q.maxTextureSize)w=Math.ceil(z/Q.maxTextureSize),z=Q.maxTextureSize;let P=new Float32Array(z*w*4*G),C=new j6(P,z,w,G);C.type=x9,C.needsUpdate=!0;let V=L*4;for(let d=0;d<G;d++){let A=D[d],m=E[d],c=M[d],f=z*w*4*d;for(let l=0;l<A.count;l++){let b=l*V;if(F===!0)W.fromBufferAttribute(A,l),P[f+b+0]=W.x,P[f+b+1]=W.y,P[f+b+2]=W.z,P[f+b+3]=0;if(R===!0)W.fromBufferAttribute(m,l),P[f+b+4]=W.x,P[f+b+5]=W.y,P[f+b+6]=W.z,P[f+b+7]=0;if(B===!0)W.fromBufferAttribute(c,l),P[f+b+8]=W.x,P[f+b+9]=W.y,P[f+b+10]=W.z,P[f+b+11]=c.itemSize===4?W.w:1}}N={count:G,texture:C,size:new k0(z,w)},Z.set(X,N),X.addEventListener("dispose",I)}if(Y.isInstancedMesh===!0&&Y.morphTexture!==null)H.getUniforms().setValue(J,"morphTexture",Y.morphTexture,$);else{let F=0;for(let B=0;B<U.length;B++)F+=U[B];let R=X.morphTargetsRelative?1:1-F;H.getUniforms().setValue(J,"morphTargetBaseInfluence",R),H.getUniforms().setValue(J,"morphTargetInfluences",U)}H.getUniforms().setValue(J,"morphTargetsTexture",N.texture,$),H.getUniforms().setValue(J,"morphTargetsTextureSize",N.size)}return{update:K}}function kG(J,Q,$,Z,W){let K=new WeakMap;function Y(U){let q=W.render.frame,G=U.geometry,N=Q.get(U,G);if(K.get(N)!==q)Q.update(N),K.set(N,q);if(U.isInstancedMesh){if(U.hasEventListener("dispose",H)===!1)U.addEventListener("dispose",H);if(K.get(U)!==q){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,q)}}if(U.isSkinnedMesh){let F=U.skeleton;if(K.get(F)!==q)F.update(),K.set(F,q)}return N}function X(){K=new WeakMap}function H(U){let q=U.target;if(q.removeEventListener("dispose",H),Z.releaseStatesOfObject(q),$.remove(q.instanceMatrix),q.instanceColor!==null)$.remove(q.instanceColor)}return{update:Y,dispose:X}}var IG={[mQ]:"LINEAR_TONE_MAPPING",[lQ]:"REINHARD_TONE_MAPPING",[dQ]:"CINEON_TONE_MAPPING",[uQ]:"ACES_FILMIC_TONE_MAPPING",[nQ]:"AGX_TONE_MAPPING",[sQ]:"NEUTRAL_TONE_MAPPING",[cQ]:"CUSTOM_TONE_MAPPING"};function AG(J,Q,$,Z,W){let K=new W9(Q,$,{type:J,depthBuffer:Z,stencilBuffer:W,depthTexture:Z?new Q8(Q,$):void 0}),Y=new W9(Q,$,{type:h9,depthBuffer:!1,stencilBuffer:!1}),X=new aJ;X.setAttribute("position",new CJ([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new CJ([0,2,0,0,2,0],2));let H=new u$({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),U=new FJ(X,H),q=new y7(-1,1,1,-1,0,1),G=null,N=null,F=!1,R,B=null,D=[],E=!1;this.setSize=function(M,L){K.setSize(M,L),Y.setSize(M,L);for(let z=0;z<D.length;z++){let w=D[z];if(w.setSize)w.setSize(M,L)}},this.setEffects=function(M){D=M,E=D.length>0&&D[0].isRenderPass===!0;let{width:L,height:z}=K;for(let w=0;w<D.length;w++){let P=D[w];if(P.setSize)P.setSize(L,z)}},this.begin=function(M,L){if(F)return!1;if(M.toneMapping===D9&&D.length===0)return!1;if(B=L,L!==null){let{width:z,height:w}=L;if(K.width!==z||K.height!==w)this.setSize(z,w)}if(E===!1)M.setRenderTarget(K);return R=M.toneMapping,M.toneMapping=D9,!0},this.hasRenderPass=function(){return E},this.end=function(M,L){M.toneMapping=R,F=!0;let z=K,w=Y;for(let P=0;P<D.length;P++){let C=D[P];if(C.enabled===!1)continue;if(C.render(M,w,z,L),C.needsSwap!==!1){let V=z;z=w,w=V}}if(G!==M.outputColorSpace||N!==M.toneMapping){if(G=M.outputColorSpace,N=M.toneMapping,H.defines={},c0.getTransfer(G)===XJ)H.defines.SRGB_TRANSFER="";let P=IG[N];if(P)H.defines[P]="";H.needsUpdate=!0}H.uniforms.tDiffuse.value=z.texture,M.setRenderTarget(B),M.render(U,q),B=null,F=!1},this.isCompositing=function(){return F},this.dispose=function(){if(K.depthTexture)K.depthTexture.dispose();K.dispose(),Y.dispose(),X.dispose(),H.dispose()}}var sK=new PJ,RZ=new Q8(1,1),iK=new j6,oK=new g$,aK=new h6,wK=[],CK=[],TK=new Float32Array(16),SK=new Float32Array(9),jK=new Float32Array(4);function Q7(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=wK[W];if(K===void 0)K=new Float32Array(W),wK[W]=K;if(Q!==0){Z.toArray(K,0);for(let Y=1,X=0;Y!==Q;++Y)X+=$,J[Y].toArray(K,X)}return K}function zJ(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function kJ(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function t6(J,Q){let $=CK[Q];if($===void 0)$=new Int32Array(Q),CK[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function PG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function wG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(zJ($,Q))return;J.uniform2fv(this.addr,Q),kJ($,Q)}}function CG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(zJ($,Q))return;J.uniform3fv(this.addr,Q),kJ($,Q)}}function TG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(zJ($,Q))return;J.uniform4fv(this.addr,Q),kJ($,Q)}}function SG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(zJ($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),kJ($,Q)}else{if(zJ($,Z))return;jK.set(Z),J.uniformMatrix2fv(this.addr,!1,jK),kJ($,Z)}}function jG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(zJ($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),kJ($,Q)}else{if(zJ($,Z))return;SK.set(Z),J.uniformMatrix3fv(this.addr,!1,SK),kJ($,Z)}}function yG(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(zJ($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),kJ($,Q)}else{if(zJ($,Z))return;TK.set(Z),J.uniformMatrix4fv(this.addr,!1,TK),kJ($,Z)}}function fG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function vG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(zJ($,Q))return;J.uniform2iv(this.addr,Q),kJ($,Q)}}function xG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(zJ($,Q))return;J.uniform3iv(this.addr,Q),kJ($,Q)}}function hG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(zJ($,Q))return;J.uniform4iv(this.addr,Q),kJ($,Q)}}function bG(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function gG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(zJ($,Q))return;J.uniform2uiv(this.addr,Q),kJ($,Q)}}function pG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(zJ($,Q))return;J.uniform3uiv(this.addr,Q),kJ($,Q)}}function mG(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(zJ($,Q))return;J.uniform4uiv(this.addr,Q),kJ($,Q)}}function lG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)RZ.compareFunction=$.isReversedDepthBuffer()?S6:T6,K=RZ;else K=sK;$.setTexture2D(Q||K,W)}function dG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||oK,W)}function uG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||aK,W)}function cG(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||iK,W)}function nG(J){switch(J){case 5126:return PG;case 35664:return wG;case 35665:return CG;case 35666:return TG;case 35674:return SG;case 35675:return jG;case 35676:return yG;case 5124:case 35670:return fG;case 35667:case 35671:return vG;case 35668:case 35672:return xG;case 35669:case 35673:return hG;case 5125:return bG;case 36294:return gG;case 36295:return pG;case 36296:return mG;case 35678:case 36198:case 36298:case 36306:case 35682:return lG;case 35679:case 36299:case 36307:return dG;case 35680:case 36300:case 36308:case 36293:return uG;case 36289:case 36303:case 36311:case 36292:return cG}}function sG(J,Q){J.uniform1fv(this.addr,Q)}function iG(J,Q){let $=Q7(Q,this.size,2);J.uniform2fv(this.addr,$)}function oG(J,Q){let $=Q7(Q,this.size,3);J.uniform3fv(this.addr,$)}function aG(J,Q){let $=Q7(Q,this.size,4);J.uniform4fv(this.addr,$)}function rG(J,Q){let $=Q7(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function tG(J,Q){let $=Q7(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function eG(J,Q){let $=Q7(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function J5(J,Q){J.uniform1iv(this.addr,Q)}function Q5(J,Q){J.uniform2iv(this.addr,Q)}function $5(J,Q){J.uniform3iv(this.addr,Q)}function Z5(J,Q){J.uniform4iv(this.addr,Q)}function W5(J,Q){J.uniform1uiv(this.addr,Q)}function K5(J,Q){J.uniform2uiv(this.addr,Q)}function Y5(J,Q){J.uniform3uiv(this.addr,Q)}function X5(J,Q){J.uniform4uiv(this.addr,Q)}function H5(J,Q,$){let Z=this.cache,W=Q.length,K=t6($,W);if(!zJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);let Y;if(this.type===J.SAMPLER_2D_SHADOW)Y=RZ;else Y=sK;for(let X=0;X!==W;++X)$.setTexture2D(Q[X]||Y,K[X])}function U5(J,Q,$){let Z=this.cache,W=Q.length,K=t6($,W);if(!zJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTexture3D(Q[Y]||oK,K[Y])}function G5(J,Q,$){let Z=this.cache,W=Q.length,K=t6($,W);if(!zJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTextureCube(Q[Y]||aK,K[Y])}function N5(J,Q,$){let Z=this.cache,W=Q.length,K=t6($,W);if(!zJ(Z,K))J.uniform1iv(this.addr,K),kJ(Z,K);for(let Y=0;Y!==W;++Y)$.setTexture2DArray(Q[Y]||iK,K[Y])}function q5(J){switch(J){case 5126:return sG;case 35664:return iG;case 35665:return oG;case 35666:return aG;case 35674:return rG;case 35675:return tG;case 35676:return eG;case 5124:case 35670:return J5;case 35667:case 35671:return Q5;case 35668:case 35672:return $5;case 35669:case 35673:return Z5;case 5125:return W5;case 36294:return K5;case 36295:return Y5;case 36296:return X5;case 35678:case 36198:case 36298:case 36306:case 35682:return H5;case 35679:case 36299:case 36307:return U5;case 35680:case 36300:case 36308:case 36293:return G5;case 36289:case 36303:case 36311:case 36292:return N5}}class rK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=nG(Q.type)}}class tK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=q5(Q.type)}}class eK{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let Y=Z[W];Y.setValue(J,Q[Y.id],$)}}}var FZ=/(\w+)(\])?(\[|\.)?/g;function yK(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function F5(J,Q,$){let Z=J.name,W=Z.length;FZ.lastIndex=0;while(!0){let K=FZ.exec(Z),Y=FZ.lastIndex,X=K[1],H=K[2]==="]",U=K[3];if(H)X=X|0;if(U===void 0||U==="["&&Y+2===W){yK($,U===void 0?new rK(X,J,Q):new tK(X,J,Q));break}else{let G=$.map[X];if(G===void 0)G=new eK(X),yK($,G);$=G}}}class b7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let Y=J.getActiveUniform(Q,K),X=J.getUniformLocation(Q,Y.name);F5(Y,X,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let Y=Q[W],X=$[Y.id];if(X.needsUpdate!==!1)Y.setValue(J,X.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function fK(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var D5=37297,E5=0;function R5(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let Y=W;Y<K;Y++){let X=Y+1;Z.push(`${X===Q?">":" "} ${X}: ${$[Y]}`)}return Z.join(`
`)}var vK=new j0;function O5(J){c0._getMatrix(vK,c0.workingColorSpace,J);let Q=`mat3( ${vK.elements.map(($)=>$.toFixed(4))} )`;switch(c0.getTransfer(J)){case j$:return[Q,"LinearTransferOETF"];case XJ:return[Q,"sRGBTransferOETF"];default:return A0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function xK(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let Y=/ERROR: 0:(\d+)/.exec(K);if(Y){let X=parseInt(Y[1]);return $.toUpperCase()+`

`+K+`

`+R5(J.getShaderSource(Q),X)}else return K}function M5(J,Q){let $=O5(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var _5={[mQ]:"Linear",[lQ]:"Reinhard",[dQ]:"Cineon",[uQ]:"ACESFilmic",[nQ]:"AgX",[sQ]:"Neutral",[cQ]:"Custom"};function V5(J,Q){let $=_5[Q];if($===void 0)return A0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var a6=new y;function L5(){c0.getLuminanceCoefficients(a6);let J=a6.x.toFixed(4),Q=a6.y.toFixed(4),$=a6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function B5(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(h7).join(`
`)}function z5(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function k5(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),Y=K.name,X=1;if(K.type===J.FLOAT_MAT2)X=2;if(K.type===J.FLOAT_MAT3)X=3;if(K.type===J.FLOAT_MAT4)X=4;$[Y]={type:K.type,location:J.getAttribLocation(Q,Y),locationSize:X}}return $}function h7(J){return J!==""}function hK(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function bK(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var I5=/^[ \t]*#include +<([\w\d./]+)>/gm;function OZ(J){return J.replace(I5,P5)}var A5=new Map;function P5(J,Q){let $=h0[Q];if($===void 0){let Z=A5.get(Q);if(Z!==void 0)$=h0[Z],A0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("Can not resolve #include <"+Q+">")}return OZ($)}var w5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gK(J){return J.replace(w5,C5)}function C5(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function pK(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var T5={[O7]:"SHADOWMAP_TYPE_PCF",[s8]:"SHADOWMAP_TYPE_VSM"};function S5(J){return T5[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var j5={[a8]:"ENVMAP_TYPE_CUBE",[H8]:"ENVMAP_TYPE_CUBE",[_7]:"ENVMAP_TYPE_CUBE_UV"};function y5(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return j5[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var f5={[H8]:"ENVMAP_MODE_REFRACTION"};function v5(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return f5[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var x5={[nW]:"ENVMAP_BLENDING_MULTIPLY",[sW]:"ENVMAP_BLENDING_MIX",[iW]:"ENVMAP_BLENDING_ADD"};function h5(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return x5[J.combine]||"ENVMAP_BLENDING_NONE"}function b5(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function g5(J,Q,$,Z){let W=J.getContext(),K=$.defines,Y=$.vertexShader,X=$.fragmentShader,H=S5($),U=y5($),q=v5($),G=h5($),N=b5($),F=B5($),R=z5(K),B=W.createProgram(),D,E,M=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(h7).join(`
`),D.length>0)D+=`
`;if(E=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(h7).join(`
`),E.length>0)E+=`
`}else D=[pK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+q:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+H:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(h7).join(`
`),E=[pK($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+q:"",$.envMap?"#define "+G:"",N?"#define CUBEUV_TEXEL_WIDTH "+N.texelWidth:"",N?"#define CUBEUV_TEXEL_HEIGHT "+N.texelHeight:"",N?"#define CUBEUV_MAX_MIP "+N.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+H:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==D9?"#define TONE_MAPPING":"",$.toneMapping!==D9?h0.tonemapping_pars_fragment:"",$.toneMapping!==D9?V5("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",h0.colorspace_pars_fragment,M5("linearToOutputTexel",$.outputColorSpace),L5(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(h7).join(`
`);if(Y=OZ(Y),Y=hK(Y,$),Y=bK(Y,$),X=OZ(X),X=hK(X,$),X=bK(X,$),Y=gK(Y),X=gK(X),$.isRawShaderMaterial!==!0)M=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,E=["#define varying in",$.glslVersion===y$?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===y$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let L=M+D+Y,z=M+E+X,w=fK(W,W.VERTEX_SHADER,L),P=fK(W,W.FRAGMENT_SHADER,z);if(W.attachShader(B,w),W.attachShader(B,P),$.index0AttributeName!==void 0)W.bindAttribLocation(B,0,$.index0AttributeName);else if($.morphTargets===!0)W.bindAttribLocation(B,0,"position");W.linkProgram(B);function C(A){if(J.debug.checkShaderErrors){let m=W.getProgramInfoLog(B)||"",c=W.getShaderInfoLog(w)||"",f=W.getShaderInfoLog(P)||"",l=m.trim(),b=c.trim(),p=f.trim(),a=!0,Q0=!0;if(W.getProgramParameter(B,W.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,B,w,P);else{let F0=xK(W,w,"vertex"),I0=xK(W,P,"fragment");C0("THREE.WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(B,W.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+l+`
`+F0+`
`+I0)}else if(l!=="")A0("WebGLProgram: Program Info Log:",l);else if(b===""||p==="")Q0=!1;if(Q0)A.diagnostics={runnable:a,programLog:l,vertexShader:{log:b,prefix:D},fragmentShader:{log:p,prefix:E}}}W.deleteShader(w),W.deleteShader(P),V=new b7(W,B),I=k5(W,B)}let V;this.getUniforms=function(){if(V===void 0)C(this);return V};let I;this.getAttributes=function(){if(I===void 0)C(this);return I};let d=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(d===!1)d=W.getProgramParameter(B,D5);return d},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(B),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=E5++,this.cacheKey=Q,this.usedTimes=1,this.program=B,this.vertexShader=w,this.fragmentShader=P,this}var p5=0;class JY{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J){let{vertexShader:Q,fragmentShader:$}=J,Z=this._getShaderStage(Q),W=this._getShaderStage($),K=this._getShaderCacheForMaterial(J);if(K.has(Z)===!1)K.add(Z),Z.usedTimes++;if(K.has(W)===!1)K.add(W),W.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderID(J){return this._getShaderStage(J.vertexShader).id}getFragmentShaderID(J){return this._getShaderStage(J.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new QY(J),Q.set(J,$);return $}}class QY{constructor(J){this.id=p5++,this.code=J,this.usedTimes=0}}function m5(J){return J===q8||J===w6||J===C6}function l5(J,Q,$,Z,W,K){let Y=new k7,X=new JY,H=new Set,U=[],q=new Map,G=Z.logarithmicDepthBuffer,N=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(V){if(H.add(V),V===0)return"uv";return`uv${V}`}function B(V,I,d,A,m,c){let f=A.fog,l=m.geometry,b=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?A.environment:null,p=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,a=Q.get(V.envMap||b,p),Q0=!!a&&a.mapping===_7?a.image.height:null,F0=F[V.type];if(V.precision!==null){if(N=Z.getMaxPrecision(V.precision),N!==V.precision)A0("WebGLProgram.getParameters:",V.precision,"not supported, using",N,"instead.")}let I0=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,M0=I0!==void 0?I0.length:0,r0=0;if(l.morphAttributes.position!==void 0)r0=1;if(l.morphAttributes.normal!==void 0)r0=2;if(l.morphAttributes.color!==void 0)r0=3;let d0,s,N0,V0;if(F0){let y0=I9[F0];d0=y0.vertexShader,s=y0.fragmentShader}else d0=V.vertexShader,s=V.fragmentShader,X.update(V),N0=X.getVertexShaderID(V),V0=X.getFragmentShaderID(V);let q0=J.getRenderTarget(),P0=J.state.buffers.depth.getReversed(),a0=m.isInstancedMesh===!0,b0=m.isBatchedMesh===!0,u0=!!V.map,ZJ=!!V.matcap,WJ=!!a,x0=!!V.aoMap,wJ=!!V.lightMap,SJ=!!V.bumpMap,_J=!!V.normalMap,S=!!V.displacementMap,xJ=!!V.emissiveMap,n0=!!V.metalnessMap,o0=!!V.roughnessMap,U0=V.anisotropy>0,DJ=V.clearcoat>0,w0=V.dispersion>0,k=V.iridescence>0,O=V.sheen>0,v=V.transmission>0,o=U0&&!!V.anisotropyMap,r=DJ&&!!V.clearcoatMap,e=DJ&&!!V.clearcoatNormalMap,K0=DJ&&!!V.clearcoatRoughnessMap,u=k&&!!V.iridescenceMap,i=k&&!!V.iridescenceThicknessMap,W0=O&&!!V.sheenColorMap,R0=O&&!!V.sheenRoughnessMap,$0=!!V.specularMap,Y0=!!V.specularColorMap,S0=!!V.specularIntensityMap,v0=v&&!!V.transmissionMap,g0=v&&!!V.thicknessMap,T=!!V.gradientMap,Z0=!!V.alphaMap,n=V.alphaTest>0,J0=!!V.alphaHash,O0=!!V.extensions,t=D9;if(V.toneMapped){if(q0===null||q0.isXRRenderTarget===!0)t=J.toneMapping}let L0={shaderID:F0,shaderType:V.type,shaderName:V.name,vertexShader:d0,fragmentShader:s,defines:V.defines,customVertexShaderID:N0,customFragmentShaderID:V0,isRawShaderMaterial:V.isRawShaderMaterial===!0,glslVersion:V.glslVersion,precision:N,batching:b0,batchingColor:b0&&m._colorsTexture!==null,instancing:a0,instancingColor:a0&&m.instanceColor!==null,instancingMorph:a0&&m.morphTexture!==null,outputColorSpace:q0===null?J.outputColorSpace:q0.isXRRenderTarget===!0?q0.texture.colorSpace:c0.workingColorSpace,alphaToCoverage:!!V.alphaToCoverage,map:u0,matcap:ZJ,envMap:WJ,envMapMode:WJ&&a.mapping,envMapCubeUVHeight:Q0,aoMap:x0,lightMap:wJ,bumpMap:SJ,normalMap:_J,displacementMap:S,emissiveMap:xJ,normalMapObjectSpace:_J&&V.normalMapType===KK,normalMapTangentSpace:_J&&V.normalMapType===T$,packedNormalMap:_J&&V.normalMapType===T$&&m5(V.normalMap.format),metalnessMap:n0,roughnessMap:o0,anisotropy:U0,anisotropyMap:o,clearcoat:DJ,clearcoatMap:r,clearcoatNormalMap:e,clearcoatRoughnessMap:K0,dispersion:w0,iridescence:k,iridescenceMap:u,iridescenceThicknessMap:i,sheen:O,sheenColorMap:W0,sheenRoughnessMap:R0,specularMap:$0,specularColorMap:Y0,specularIntensityMap:S0,transmission:v,transmissionMap:v0,thicknessMap:g0,gradientMap:T,opaque:V.transparent===!1&&V.blending===M7&&V.alphaToCoverage===!1,alphaMap:Z0,alphaTest:n,alphaHash:J0,combine:V.combine,mapUv:u0&&R(V.map.channel),aoMapUv:x0&&R(V.aoMap.channel),lightMapUv:wJ&&R(V.lightMap.channel),bumpMapUv:SJ&&R(V.bumpMap.channel),normalMapUv:_J&&R(V.normalMap.channel),displacementMapUv:S&&R(V.displacementMap.channel),emissiveMapUv:xJ&&R(V.emissiveMap.channel),metalnessMapUv:n0&&R(V.metalnessMap.channel),roughnessMapUv:o0&&R(V.roughnessMap.channel),anisotropyMapUv:o&&R(V.anisotropyMap.channel),clearcoatMapUv:r&&R(V.clearcoatMap.channel),clearcoatNormalMapUv:e&&R(V.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K0&&R(V.clearcoatRoughnessMap.channel),iridescenceMapUv:u&&R(V.iridescenceMap.channel),iridescenceThicknessMapUv:i&&R(V.iridescenceThicknessMap.channel),sheenColorMapUv:W0&&R(V.sheenColorMap.channel),sheenRoughnessMapUv:R0&&R(V.sheenRoughnessMap.channel),specularMapUv:$0&&R(V.specularMap.channel),specularColorMapUv:Y0&&R(V.specularColorMap.channel),specularIntensityMapUv:S0&&R(V.specularIntensityMap.channel),transmissionMapUv:v0&&R(V.transmissionMap.channel),thicknessMapUv:g0&&R(V.thicknessMap.channel),alphaMapUv:Z0&&R(V.alphaMap.channel),vertexTangents:!!l.attributes.tangent&&(_J||U0),vertexNormals:!!l.attributes.normal,vertexColors:V.vertexColors,vertexAlphas:V.vertexColors===!0&&!!l.attributes.color&&l.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!l.attributes.uv&&(u0||Z0),fog:!!f,useFog:V.fog===!0,fogExp2:!!f&&f.isFogExp2,flatShading:V.wireframe===!1&&(V.flatShading===!0||l.attributes.normal===void 0&&_J===!1&&(V.isMeshLambertMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isMeshPhysicalMaterial)),sizeAttenuation:V.sizeAttenuation===!0,logarithmicDepthBuffer:G,reversedDepthBuffer:P0,skinning:m.isSkinnedMesh===!0,morphTargets:l.morphAttributes.position!==void 0,morphNormals:l.morphAttributes.normal!==void 0,morphColors:l.morphAttributes.color!==void 0,morphTargetsCount:M0,morphTextureStride:r0,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:c.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:V.dithering,shadowMapEnabled:J.shadowMap.enabled&&d.length>0,shadowMapType:J.shadowMap.type,toneMapping:t,decodeVideoTexture:u0&&V.map.isVideoTexture===!0&&c0.getTransfer(V.map.colorSpace)===XJ,decodeVideoTextureEmissive:xJ&&V.emissiveMap.isVideoTexture===!0&&c0.getTransfer(V.emissiveMap.colorSpace)===XJ,premultipliedAlpha:V.premultipliedAlpha,doubleSided:V.side===$9,flipSided:V.side===pJ,useDepthPacking:V.depthPacking>=0,depthPacking:V.depthPacking||0,index0AttributeName:V.index0AttributeName,extensionClipCullDistance:O0&&V.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O0&&V.extensions.multiDraw===!0||b0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:V.customProgramCacheKey()};return L0.vertexUv1s=H.has(1),L0.vertexUv2s=H.has(2),L0.vertexUv3s=H.has(3),H.clear(),L0}function D(V){let I=[];if(V.shaderID)I.push(V.shaderID);else I.push(V.customVertexShaderID),I.push(V.customFragmentShaderID);if(V.defines!==void 0)for(let d in V.defines)I.push(d),I.push(V.defines[d]);if(V.isRawShaderMaterial===!1)E(I,V),M(I,V),I.push(J.outputColorSpace);return I.push(V.customProgramCacheKey),I.join()}function E(V,I){V.push(I.precision),V.push(I.outputColorSpace),V.push(I.envMapMode),V.push(I.envMapCubeUVHeight),V.push(I.mapUv),V.push(I.alphaMapUv),V.push(I.lightMapUv),V.push(I.aoMapUv),V.push(I.bumpMapUv),V.push(I.normalMapUv),V.push(I.displacementMapUv),V.push(I.emissiveMapUv),V.push(I.metalnessMapUv),V.push(I.roughnessMapUv),V.push(I.anisotropyMapUv),V.push(I.clearcoatMapUv),V.push(I.clearcoatNormalMapUv),V.push(I.clearcoatRoughnessMapUv),V.push(I.iridescenceMapUv),V.push(I.iridescenceThicknessMapUv),V.push(I.sheenColorMapUv),V.push(I.sheenRoughnessMapUv),V.push(I.specularMapUv),V.push(I.specularColorMapUv),V.push(I.specularIntensityMapUv),V.push(I.transmissionMapUv),V.push(I.thicknessMapUv),V.push(I.combine),V.push(I.fogExp2),V.push(I.sizeAttenuation),V.push(I.morphTargetsCount),V.push(I.morphAttributeCount),V.push(I.numDirLights),V.push(I.numPointLights),V.push(I.numSpotLights),V.push(I.numSpotLightMaps),V.push(I.numHemiLights),V.push(I.numRectAreaLights),V.push(I.numDirLightShadows),V.push(I.numPointLightShadows),V.push(I.numSpotLightShadows),V.push(I.numSpotLightShadowsWithMaps),V.push(I.numLightProbes),V.push(I.shadowMapType),V.push(I.toneMapping),V.push(I.numClippingPlanes),V.push(I.numClipIntersection),V.push(I.depthPacking)}function M(V,I){if(Y.disableAll(),I.instancing)Y.enable(0);if(I.instancingColor)Y.enable(1);if(I.instancingMorph)Y.enable(2);if(I.matcap)Y.enable(3);if(I.envMap)Y.enable(4);if(I.normalMapObjectSpace)Y.enable(5);if(I.normalMapTangentSpace)Y.enable(6);if(I.clearcoat)Y.enable(7);if(I.iridescence)Y.enable(8);if(I.alphaTest)Y.enable(9);if(I.vertexColors)Y.enable(10);if(I.vertexAlphas)Y.enable(11);if(I.vertexUv1s)Y.enable(12);if(I.vertexUv2s)Y.enable(13);if(I.vertexUv3s)Y.enable(14);if(I.vertexTangents)Y.enable(15);if(I.anisotropy)Y.enable(16);if(I.alphaHash)Y.enable(17);if(I.batching)Y.enable(18);if(I.dispersion)Y.enable(19);if(I.batchingColor)Y.enable(20);if(I.gradientMap)Y.enable(21);if(I.packedNormalMap)Y.enable(22);if(I.vertexNormals)Y.enable(23);if(V.push(Y.mask),Y.disableAll(),I.fog)Y.enable(0);if(I.useFog)Y.enable(1);if(I.flatShading)Y.enable(2);if(I.logarithmicDepthBuffer)Y.enable(3);if(I.reversedDepthBuffer)Y.enable(4);if(I.skinning)Y.enable(5);if(I.morphTargets)Y.enable(6);if(I.morphNormals)Y.enable(7);if(I.morphColors)Y.enable(8);if(I.premultipliedAlpha)Y.enable(9);if(I.shadowMapEnabled)Y.enable(10);if(I.doubleSided)Y.enable(11);if(I.flipSided)Y.enable(12);if(I.useDepthPacking)Y.enable(13);if(I.dithering)Y.enable(14);if(I.transmission)Y.enable(15);if(I.sheen)Y.enable(16);if(I.opaque)Y.enable(17);if(I.pointsUvs)Y.enable(18);if(I.decodeVideoTexture)Y.enable(19);if(I.decodeVideoTextureEmissive)Y.enable(20);if(I.alphaToCoverage)Y.enable(21);if(I.numLightProbeGrids>0)Y.enable(22);V.push(Y.mask)}function L(V){let I=F[V.type],d;if(I){let A=I9[I];d=MK.clone(A.uniforms)}else d=V.uniforms;return d}function z(V,I){let d=q.get(I);if(d!==void 0)++d.usedTimes;else d=new g5(J,I,V,W),U.push(d),q.set(I,d);return d}function w(V){if(--V.usedTimes===0){let I=U.indexOf(V);U[I]=U[U.length-1],U.pop(),q.delete(V.cacheKey),V.destroy()}}function P(V){X.remove(V)}function C(){X.dispose()}return{getParameters:B,getProgramCacheKey:D,getUniforms:L,acquireProgram:z,releaseProgram:w,releaseShaderCache:P,programs:U,dispose:C}}function d5(){let J=new WeakMap;function Q(Y){return J.has(Y)}function $(Y){let X=J.get(Y);if(X===void 0)X={},J.set(Y,X);return X}function Z(Y){J.delete(Y)}function W(Y,X,H){J.get(Y)[X]=H}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function u5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function mK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function lK(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function Y(N){let F=0;if(N.isInstancedMesh)F+=2;if(N.isSkinnedMesh)F+=1;return F}function X(N,F,R,B,D,E){let M=J[Q];if(M===void 0)M={id:N.id,object:N,geometry:F,material:R,materialVariant:Y(N),groupOrder:B,renderOrder:N.renderOrder,z:D,group:E},J[Q]=M;else M.id=N.id,M.object=N,M.geometry=F,M.material=R,M.materialVariant=Y(N),M.groupOrder=B,M.renderOrder=N.renderOrder,M.z=D,M.group=E;return Q++,M}function H(N,F,R,B,D,E){let M=X(N,F,R,B,D,E);if(R.transmission>0)Z.push(M);else if(R.transparent===!0)W.push(M);else $.push(M)}function U(N,F,R,B,D,E){let M=X(N,F,R,B,D,E);if(R.transmission>0)Z.unshift(M);else if(R.transparent===!0)W.unshift(M);else $.unshift(M)}function q(N,F){if($.length>1)$.sort(N||u5);if(Z.length>1)Z.sort(F||mK);if(W.length>1)W.sort(F||mK)}function G(){for(let N=Q,F=J.length;N<F;N++){let R=J[N];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:H,unshift:U,finish:G,sort:q}}function c5(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),Y;if(K===void 0)Y=new lK,J.set(Z,[Y]);else if(W>=K.length)Y=new lK,K.push(Y);else Y=K[W];return Y}function $(){J=new WeakMap}return{get:Q,dispose:$}}function n5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new y,color:new m0};break;case"SpotLight":$={position:new y,direction:new y,color:new m0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new y,color:new m0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new y,skyColor:new m0,groundColor:new m0};break;case"RectAreaLight":$={color:new m0,position:new y,halfWidth:new y,halfHeight:new y};break}return J[Q.id]=$,$}}}function s5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new k0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new k0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new k0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var i5=0;function o5(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function a5(J){let Q=new n5,$=s5(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new y);let W=new y,K=new qJ,Y=new qJ;function X(U){let q=0,G=0,N=0;for(let I=0;I<9;I++)Z.probe[I].set(0,0,0);let F=0,R=0,B=0,D=0,E=0,M=0,L=0,z=0,w=0,P=0,C=0;U.sort(o5);for(let I=0,d=U.length;I<d;I++){let A=U[I],m=A.color,c=A.intensity,f=A.distance,l=null;if(A.shadow&&A.shadow.map)if(A.shadow.map.texture.format===q8)l=A.shadow.map.texture;else l=A.shadow.map.depthTexture||A.shadow.map.texture;if(A.isAmbientLight)q+=m.r*c,G+=m.g*c,N+=m.b*c;else if(A.isLightProbe){for(let b=0;b<9;b++)Z.probe[b].addScaledVector(A.sh.coefficients[b],c);C++}else if(A.isDirectionalLight){let b=Q.get(A);if(b.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let p=A.shadow,a=$.get(A);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,Z.directionalShadow[F]=a,Z.directionalShadowMap[F]=l,Z.directionalShadowMatrix[F]=A.shadow.matrix,M++}Z.directional[F]=b,F++}else if(A.isSpotLight){let b=Q.get(A);b.position.setFromMatrixPosition(A.matrixWorld),b.color.copy(m).multiplyScalar(c),b.distance=f,b.coneCos=Math.cos(A.angle),b.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),b.decay=A.decay,Z.spot[B]=b;let p=A.shadow;if(A.map){if(Z.spotLightMap[w]=A.map,w++,p.updateMatrices(A),A.castShadow)P++}if(Z.spotLightMatrix[B]=p.matrix,A.castShadow){let a=$.get(A);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,Z.spotShadow[B]=a,Z.spotShadowMap[B]=l,z++}B++}else if(A.isRectAreaLight){let b=Q.get(A);b.color.copy(m).multiplyScalar(c),b.halfWidth.set(A.width*0.5,0,0),b.halfHeight.set(0,A.height*0.5,0),Z.rectArea[D]=b,D++}else if(A.isPointLight){let b=Q.get(A);if(b.color.copy(A.color).multiplyScalar(A.intensity),b.distance=A.distance,b.decay=A.decay,A.castShadow){let p=A.shadow,a=$.get(A);a.shadowIntensity=p.intensity,a.shadowBias=p.bias,a.shadowNormalBias=p.normalBias,a.shadowRadius=p.radius,a.shadowMapSize=p.mapSize,a.shadowCameraNear=p.camera.near,a.shadowCameraFar=p.camera.far,Z.pointShadow[R]=a,Z.pointShadowMap[R]=l,Z.pointShadowMatrix[R]=A.shadow.matrix,L++}Z.point[R]=b,R++}else if(A.isHemisphereLight){let b=Q.get(A);b.skyColor.copy(A.color).multiplyScalar(c),b.groundColor.copy(A.groundColor).multiplyScalar(c),Z.hemi[E]=b,E++}}if(D>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=X0.LTC_FLOAT_1,Z.rectAreaLTC2=X0.LTC_FLOAT_2;else Z.rectAreaLTC1=X0.LTC_HALF_1,Z.rectAreaLTC2=X0.LTC_HALF_2;Z.ambient[0]=q,Z.ambient[1]=G,Z.ambient[2]=N;let V=Z.hash;if(V.directionalLength!==F||V.pointLength!==R||V.spotLength!==B||V.rectAreaLength!==D||V.hemiLength!==E||V.numDirectionalShadows!==M||V.numPointShadows!==L||V.numSpotShadows!==z||V.numSpotMaps!==w||V.numLightProbes!==C)Z.directional.length=F,Z.spot.length=B,Z.rectArea.length=D,Z.point.length=R,Z.hemi.length=E,Z.directionalShadow.length=M,Z.directionalShadowMap.length=M,Z.pointShadow.length=L,Z.pointShadowMap.length=L,Z.spotShadow.length=z,Z.spotShadowMap.length=z,Z.directionalShadowMatrix.length=M,Z.pointShadowMatrix.length=L,Z.spotLightMatrix.length=z+w-P,Z.spotLightMap.length=w,Z.numSpotLightShadowsWithMaps=P,Z.numLightProbes=C,V.directionalLength=F,V.pointLength=R,V.spotLength=B,V.rectAreaLength=D,V.hemiLength=E,V.numDirectionalShadows=M,V.numPointShadows=L,V.numSpotShadows=z,V.numSpotMaps=w,V.numLightProbes=C,Z.version=i5++}function H(U,q){let G=0,N=0,F=0,R=0,B=0,D=q.matrixWorldInverse;for(let E=0,M=U.length;E<M;E++){let L=U[E];if(L.isDirectionalLight){let z=Z.directional[G];z.direction.setFromMatrixPosition(L.matrixWorld),W.setFromMatrixPosition(L.target.matrixWorld),z.direction.sub(W),z.direction.transformDirection(D),G++}else if(L.isSpotLight){let z=Z.spot[F];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(D),z.direction.setFromMatrixPosition(L.matrixWorld),W.setFromMatrixPosition(L.target.matrixWorld),z.direction.sub(W),z.direction.transformDirection(D),F++}else if(L.isRectAreaLight){let z=Z.rectArea[R];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(D),Y.identity(),K.copy(L.matrixWorld),K.premultiply(D),Y.extractRotation(K),z.halfWidth.set(L.width*0.5,0,0),z.halfHeight.set(0,L.height*0.5,0),z.halfWidth.applyMatrix4(Y),z.halfHeight.applyMatrix4(Y),R++}else if(L.isPointLight){let z=Z.point[N];z.position.setFromMatrixPosition(L.matrixWorld),z.position.applyMatrix4(D),N++}else if(L.isHemisphereLight){let z=Z.hemi[B];z.direction.setFromMatrixPosition(L.matrixWorld),z.direction.transformDirection(D),B++}}}return{setup:X,setupView:H,state:Z}}function dK(J){let Q=new a5(J),$=[],Z=[],W=[];function K(N){G.camera=N,$.length=0,Z.length=0,W.length=0}function Y(N){$.push(N)}function X(N){Z.push(N)}function H(N){W.push(N)}function U(){Q.setup($)}function q(N){Q.setupView($,N)}let G={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:G,setupLights:U,setupLightsView:q,pushLight:Y,pushShadow:X,pushLightProbeGrid:H}}function r5(J){let Q=new WeakMap;function $(W,K=0){let Y=Q.get(W),X;if(Y===void 0)X=new dK(J),Q.set(W,[X]);else if(K>=Y.length)X=new dK(J),Y.push(X);else X=Y[K];return X}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var t5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e5=`uniform sampler2D shadow_pass;
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
}`,JN=[new y(1,0,0),new y(-1,0,0),new y(0,1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1)],QN=[new y(0,-1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1),new y(0,-1,0),new y(0,-1,0)],uK=new qJ,x7=new y,DZ=new y;function $N(J,Q,$){let Z=new C7,W=new k0,K=new k0,Y=new EJ,X=new c$,H=new n$,U={},q=$.maxTextureSize,G={[i8]:pJ,[pJ]:i8,[$9]:$9},N=new K9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new k0},radius:{value:4}},vertexShader:t5,fragmentShader:e5}),F=N.clone();F.defines.HORIZONTAL_PASS=1;let R=new aJ;R.setAttribute("position",new oJ(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let B=new FJ(R,N),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=O7;let E=this.type;this.render=function(P,C,V){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(P.length===0)return;if(this.type===_6)A0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=O7;let I=J.getRenderTarget(),d=J.getActiveCubeFace(),A=J.getActiveMipmapLevel(),m=J.state;if(m.setBlending(L9),m.buffers.depth.getReversed()===!0)m.buffers.color.setClear(0,0,0,0);else m.buffers.color.setClear(1,1,1,1);m.buffers.depth.setTest(!0),m.setScissorTest(!1);let c=E!==this.type;if(c)C.traverse(function(f){if(f.material)if(Array.isArray(f.material))f.material.forEach((l)=>l.needsUpdate=!0);else f.material.needsUpdate=!0});for(let f=0,l=P.length;f<l;f++){let b=P[f],p=b.shadow;if(p===void 0){A0("WebGLShadowMap:",b,"has no shadow.");continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;W.copy(p.mapSize);let a=p.getFrameExtents();if(W.multiply(a),K.copy(p.mapSize),W.x>q||W.y>q){if(W.x>q)K.x=Math.floor(q/a.x),W.x=K.x*a.x,p.mapSize.x=K.x;if(W.y>q)K.y=Math.floor(q/a.y),W.y=K.y*a.y,p.mapSize.y=K.y}let Q0=J.state.buffers.depth.getReversed();if(p.camera._reversedDepth=Q0,p.map===null||c===!0){if(p.map!==null){if(p.map.depthTexture!==null)p.map.depthTexture.dispose(),p.map.depthTexture=null;p.map.dispose()}if(this.type===s8){if(b.isPointLight){A0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}p.map=new W9(W.x,W.y,{format:q8,type:h9,minFilter:mJ,magFilter:mJ,generateMipmaps:!1}),p.map.texture.name=b.name+".shadowMap",p.map.depthTexture=new Q8(W.x,W.y,x9),p.map.depthTexture.name=b.name+".shadowMapDepth",p.map.depthTexture.format=G8,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r9,p.map.depthTexture.magFilter=r9}else{if(b.isPointLight)p.map=new MZ(W.x),p.map.depthTexture=new l$(W.x,t9);else p.map=new W9(W.x,W.y),p.map.depthTexture=new Q8(W.x,W.y,t9);if(p.map.depthTexture.name=b.name+".shadowMap",p.map.depthTexture.format=G8,this.type===O7)p.map.depthTexture.compareFunction=Q0?S6:T6,p.map.depthTexture.minFilter=mJ,p.map.depthTexture.magFilter=mJ;else p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r9,p.map.depthTexture.magFilter=r9}p.camera.updateProjectionMatrix()}let F0=p.map.isWebGLCubeRenderTarget?6:1;for(let I0=0;I0<F0;I0++){if(p.map.isWebGLCubeRenderTarget)J.setRenderTarget(p.map,I0),J.clear();else{if(I0===0)J.setRenderTarget(p.map),J.clear();let M0=p.getViewport(I0);Y.set(K.x*M0.x,K.y*M0.y,K.x*M0.z,K.y*M0.w),m.viewport(Y)}if(b.isPointLight){let{camera:M0,matrix:r0}=p,d0=b.distance||M0.far;if(d0!==M0.far)M0.far=d0,M0.updateProjectionMatrix();x7.setFromMatrixPosition(b.matrixWorld),M0.position.copy(x7),DZ.copy(M0.position),DZ.add(JN[I0]),M0.up.copy(QN[I0]),M0.lookAt(DZ),M0.updateMatrixWorld(),r0.makeTranslation(-x7.x,-x7.y,-x7.z),uK.multiplyMatrices(M0.projectionMatrix,M0.matrixWorldInverse),p._frustum.setFromProjectionMatrix(uK,M0.coordinateSystem,M0.reversedDepth)}else p.updateMatrices(b);Z=p.getFrustum(),z(C,V,p.camera,b,this.type)}if(p.isPointLightShadow!==!0&&this.type===s8)M(p,V);p.needsUpdate=!1}E=this.type,D.needsUpdate=!1,J.setRenderTarget(I,d,A)};function M(P,C){let V=Q.update(B);if(N.defines.VSM_SAMPLES!==P.blurSamples)N.defines.VSM_SAMPLES=P.blurSamples,F.defines.VSM_SAMPLES=P.blurSamples,N.needsUpdate=!0,F.needsUpdate=!0;if(P.mapPass===null)P.mapPass=new W9(W.x,W.y,{format:q8,type:h9});N.uniforms.shadow_pass.value=P.map.depthTexture,N.uniforms.resolution.value=P.mapSize,N.uniforms.radius.value=P.radius,J.setRenderTarget(P.mapPass),J.clear(),J.renderBufferDirect(C,null,V,N,B,null),F.uniforms.shadow_pass.value=P.mapPass.texture,F.uniforms.resolution.value=P.mapSize,F.uniforms.radius.value=P.radius,J.setRenderTarget(P.map),J.clear(),J.renderBufferDirect(C,null,V,F,B,null)}function L(P,C,V,I){let d=null,A=V.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(A!==void 0)d=A;else if(d=V.isPointLight===!0?H:X,J.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let m=d.uuid,c=C.uuid,f=U[m];if(f===void 0)f={},U[m]=f;let l=f[c];if(l===void 0)l=d.clone(),f[c]=l,C.addEventListener("dispose",w);d=l}if(d.visible=C.visible,d.wireframe=C.wireframe,I===s8)d.side=C.shadowSide!==null?C.shadowSide:C.side;else d.side=C.shadowSide!==null?C.shadowSide:G[C.side];if(d.alphaMap=C.alphaMap,d.alphaTest=C.alphaToCoverage===!0?0.5:C.alphaTest,d.map=C.map,d.clipShadows=C.clipShadows,d.clippingPlanes=C.clippingPlanes,d.clipIntersection=C.clipIntersection,d.displacementMap=C.displacementMap,d.displacementScale=C.displacementScale,d.displacementBias=C.displacementBias,d.wireframeLinewidth=C.wireframeLinewidth,d.linewidth=C.linewidth,V.isPointLight===!0&&d.isMeshDistanceMaterial===!0){let m=J.properties.get(d);m.light=V}return d}function z(P,C,V,I,d){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)){if((P.castShadow||P.receiveShadow&&d===s8)&&(!P.frustumCulled||Z.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,P.matrixWorld);let c=Q.update(P),f=P.material;if(Array.isArray(f)){let l=c.groups;for(let b=0,p=l.length;b<p;b++){let a=l[b],Q0=f[a.materialIndex];if(Q0&&Q0.visible){let F0=L(P,Q0,I,d);P.onBeforeShadow(J,P,C,V,c,F0,a),J.renderBufferDirect(V,null,c,F0,P,a),P.onAfterShadow(J,P,C,V,c,F0,a)}}}else if(f.visible){let l=L(P,f,I,d);P.onBeforeShadow(J,P,C,V,c,l,null),J.renderBufferDirect(V,null,c,l,P,null),P.onAfterShadow(J,P,C,V,c,l,null)}}}let m=P.children;for(let c=0,f=m.length;c<f;c++)z(m[c],C,V,I,d)}function w(P){P.target.removeEventListener("dispose",w);for(let V in U){let I=U[V],d=P.target.uuid;if(d in I)I[d].dispose(),delete I[d]}}}function ZN(J,Q){function $(){let T=!1,Z0=new EJ,n=null,J0=new EJ(0,0,0,0);return{setMask:function(O0){if(n!==O0&&!T)J.colorMask(O0,O0,O0,O0),n=O0},setLocked:function(O0){T=O0},setClear:function(O0,t,L0,y0,VJ){if(VJ===!0)O0*=y0,t*=y0,L0*=y0;if(Z0.set(O0,t,L0,y0),J0.equals(Z0)===!1)J.clearColor(O0,t,L0,y0),J0.copy(Z0)},reset:function(){T=!1,n=null,J0.set(-1,0,0,0)}}}function Z(){let T=!1,Z0=!1,n=null,J0=null,O0=null;return{setReversed:function(t){if(Z0!==t){let L0=Q.get("EXT_clip_control");if(t)L0.clipControlEXT(L0.LOWER_LEFT_EXT,L0.ZERO_TO_ONE_EXT);else L0.clipControlEXT(L0.LOWER_LEFT_EXT,L0.NEGATIVE_ONE_TO_ONE_EXT);Z0=t;let y0=O0;O0=null,this.setClear(y0)}},getReversed:function(){return Z0},setTest:function(t){if(t)q0(J.DEPTH_TEST);else P0(J.DEPTH_TEST)},setMask:function(t){if(n!==t&&!T)J.depthMask(t),n=t},setFunc:function(t){if(Z0)t=EK[t];if(J0!==t){switch(t){case gW:J.depthFunc(J.NEVER);break;case pW:J.depthFunc(J.ALWAYS);break;case mW:J.depthFunc(J.LESS);break;case pQ:J.depthFunc(J.LEQUAL);break;case lW:J.depthFunc(J.EQUAL);break;case dW:J.depthFunc(J.GEQUAL);break;case uW:J.depthFunc(J.GREATER);break;case cW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}J0=t}},setLocked:function(t){T=t},setClear:function(t){if(O0!==t){if(O0=t,Z0)t=1-t;J.clearDepth(t)}},reset:function(){T=!1,n=null,J0=null,O0=null,Z0=!1}}}function W(){let T=!1,Z0=null,n=null,J0=null,O0=null,t=null,L0=null,y0=null,VJ=null;return{setTest:function(JJ){if(!T)if(JJ)q0(J.STENCIL_TEST);else P0(J.STENCIL_TEST)},setMask:function(JJ){if(Z0!==JJ&&!T)J.stencilMask(JJ),Z0=JJ},setFunc:function(JJ,R9,X9){if(n!==JJ||J0!==R9||O0!==X9)J.stencilFunc(JJ,R9,X9),n=JJ,J0=R9,O0=X9},setOp:function(JJ,R9,X9){if(t!==JJ||L0!==R9||y0!==X9)J.stencilOp(JJ,R9,X9),t=JJ,L0=R9,y0=X9},setLocked:function(JJ){T=JJ},setClear:function(JJ){if(VJ!==JJ)J.clearStencil(JJ),VJ=JJ},reset:function(){T=!1,Z0=null,n=null,J0=null,O0=null,t=null,L0=null,y0=null,VJ=null}}}let K=new $,Y=new Z,X=new W,H=new WeakMap,U=new WeakMap,q={},G={},N={},F=new WeakMap,R=[],B=null,D=!1,E=null,M=null,L=null,z=null,w=null,P=null,C=null,V=new m0(0,0,0),I=0,d=!1,A=null,m=null,c=null,f=null,l=null,b=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),p=!1,a=0,Q0=J.getParameter(J.VERSION);if(Q0.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(Q0)[1]),p=a>=1;else if(Q0.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(Q0)[1]),p=a>=2;let F0=null,I0={},M0=J.getParameter(J.SCISSOR_BOX),r0=J.getParameter(J.VIEWPORT),d0=new EJ().fromArray(M0),s=new EJ().fromArray(r0);function N0(T,Z0,n,J0){let O0=new Uint8Array(4),t=J.createTexture();J.bindTexture(T,t),J.texParameteri(T,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(T,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let L0=0;L0<n;L0++)if(T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY)J.texImage3D(Z0,0,J.RGBA,1,1,J0,0,J.RGBA,J.UNSIGNED_BYTE,O0);else J.texImage2D(Z0+L0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,O0);return t}let V0={};V0[J.TEXTURE_2D]=N0(J.TEXTURE_2D,J.TEXTURE_2D,1),V0[J.TEXTURE_CUBE_MAP]=N0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),V0[J.TEXTURE_2D_ARRAY]=N0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),V0[J.TEXTURE_3D]=N0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),Y.setClear(1),X.setClear(0),q0(J.DEPTH_TEST),Y.setFunc(pQ),SJ(!1),_J(xQ),q0(J.CULL_FACE),x0(L9);function q0(T){if(q[T]!==!0)J.enable(T),q[T]=!0}function P0(T){if(q[T]!==!1)J.disable(T),q[T]=!1}function a0(T,Z0){if(N[T]!==Z0){if(J.bindFramebuffer(T,Z0),N[T]=Z0,T===J.DRAW_FRAMEBUFFER)N[J.FRAMEBUFFER]=Z0;if(T===J.FRAMEBUFFER)N[J.DRAW_FRAMEBUFFER]=Z0;return!0}return!1}function b0(T,Z0){let n=R,J0=!1;if(T){if(n=F.get(Z0),n===void 0)n=[],F.set(Z0,n);let O0=T.textures;if(n.length!==O0.length||n[0]!==J.COLOR_ATTACHMENT0){for(let t=0,L0=O0.length;t<L0;t++)n[t]=J.COLOR_ATTACHMENT0+t;n.length=O0.length,J0=!0}}else if(n[0]!==J.BACK)n[0]=J.BACK,J0=!0;if(J0)J.drawBuffers(n)}function u0(T){if(B!==T)return J.useProgram(T),B=T,!0;return!1}let ZJ={[o8]:J.FUNC_ADD,[VW]:J.FUNC_SUBTRACT,[LW]:J.FUNC_REVERSE_SUBTRACT};ZJ[BW]=J.MIN,ZJ[zW]=J.MAX;let WJ={[kW]:J.ZERO,[IW]:J.ONE,[AW]:J.SRC_COLOR,[wW]:J.SRC_ALPHA,[fW]:J.SRC_ALPHA_SATURATE,[jW]:J.DST_COLOR,[TW]:J.DST_ALPHA,[PW]:J.ONE_MINUS_SRC_COLOR,[CW]:J.ONE_MINUS_SRC_ALPHA,[yW]:J.ONE_MINUS_DST_COLOR,[SW]:J.ONE_MINUS_DST_ALPHA,[vW]:J.CONSTANT_COLOR,[xW]:J.ONE_MINUS_CONSTANT_COLOR,[hW]:J.CONSTANT_ALPHA,[bW]:J.ONE_MINUS_CONSTANT_ALPHA};function x0(T,Z0,n,J0,O0,t,L0,y0,VJ,JJ){if(T===L9){if(D===!0)P0(J.BLEND),D=!1;return}if(D===!1)q0(J.BLEND),D=!0;if(T!==_W){if(T!==E||JJ!==d){if(M!==o8||w!==o8)J.blendEquation(J.FUNC_ADD),M=o8,w=o8;if(JJ)switch(T){case M7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case hQ:J.blendFunc(J.ONE,J.ONE);break;case bQ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case gQ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:C0("WebGLState: Invalid blending: ",T);break}else switch(T){case M7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case hQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case bQ:C0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gQ:C0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:C0("WebGLState: Invalid blending: ",T);break}L=null,z=null,P=null,C=null,V.set(0,0,0),I=0,E=T,d=JJ}return}if(O0=O0||Z0,t=t||n,L0=L0||J0,Z0!==M||O0!==w)J.blendEquationSeparate(ZJ[Z0],ZJ[O0]),M=Z0,w=O0;if(n!==L||J0!==z||t!==P||L0!==C)J.blendFuncSeparate(WJ[n],WJ[J0],WJ[t],WJ[L0]),L=n,z=J0,P=t,C=L0;if(y0.equals(V)===!1||VJ!==I)J.blendColor(y0.r,y0.g,y0.b,VJ),V.copy(y0),I=VJ;E=T,d=!1}function wJ(T,Z0){T.side===$9?P0(J.CULL_FACE):q0(J.CULL_FACE);let n=T.side===pJ;if(Z0)n=!n;SJ(n),T.blending===M7&&T.transparent===!1?x0(L9):x0(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.blendColor,T.blendAlpha,T.premultipliedAlpha),Y.setFunc(T.depthFunc),Y.setTest(T.depthTest),Y.setMask(T.depthWrite),K.setMask(T.colorWrite);let J0=T.stencilWrite;if(X.setTest(J0),J0)X.setMask(T.stencilWriteMask),X.setFunc(T.stencilFunc,T.stencilRef,T.stencilFuncMask),X.setOp(T.stencilFail,T.stencilZFail,T.stencilZPass);xJ(T.polygonOffset,T.polygonOffsetFactor,T.polygonOffsetUnits),T.alphaToCoverage===!0?q0(J.SAMPLE_ALPHA_TO_COVERAGE):P0(J.SAMPLE_ALPHA_TO_COVERAGE)}function SJ(T){if(A!==T){if(T)J.frontFace(J.CW);else J.frontFace(J.CCW);A=T}}function _J(T){if(T!==OW){if(q0(J.CULL_FACE),T!==m)if(T===xQ)J.cullFace(J.BACK);else if(T===MW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else P0(J.CULL_FACE);m=T}function S(T){if(T!==c){if(p)J.lineWidth(T);c=T}}function xJ(T,Z0,n){if(T){if(q0(J.POLYGON_OFFSET_FILL),f!==Z0||l!==n){if(f=Z0,l=n,Y.getReversed())Z0=-Z0;J.polygonOffset(Z0,n)}}else P0(J.POLYGON_OFFSET_FILL)}function n0(T){if(T)q0(J.SCISSOR_TEST);else P0(J.SCISSOR_TEST)}function o0(T){if(T===void 0)T=J.TEXTURE0+b-1;if(F0!==T)J.activeTexture(T),F0=T}function U0(T,Z0,n){if(n===void 0)if(F0===null)n=J.TEXTURE0+b-1;else n=F0;let J0=I0[n];if(J0===void 0)J0={type:void 0,texture:void 0},I0[n]=J0;if(J0.type!==T||J0.texture!==Z0){if(F0!==n)J.activeTexture(n),F0=n;J.bindTexture(T,Z0||V0[T]),J0.type=T,J0.texture=Z0}}function DJ(){let T=I0[F0];if(T!==void 0&&T.type!==void 0)J.bindTexture(T.type,null),T.type=void 0,T.texture=void 0}function w0(){try{J.compressedTexImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function k(){try{J.compressedTexImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function O(){try{J.texSubImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function v(){try{J.texSubImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function o(){try{J.compressedTexSubImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function r(){try{J.compressedTexSubImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function e(){try{J.texStorage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function K0(){try{J.texStorage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function u(){try{J.texImage2D(...arguments)}catch(T){C0("WebGLState:",T)}}function i(){try{J.texImage3D(...arguments)}catch(T){C0("WebGLState:",T)}}function W0(T){if(G[T]!==void 0)return G[T];else return J.getParameter(T)}function R0(T,Z0){if(G[T]!==Z0)J.pixelStorei(T,Z0),G[T]=Z0}function $0(T){if(d0.equals(T)===!1)J.scissor(T.x,T.y,T.z,T.w),d0.copy(T)}function Y0(T){if(s.equals(T)===!1)J.viewport(T.x,T.y,T.z,T.w),s.copy(T)}function S0(T,Z0){let n=U.get(Z0);if(n===void 0)n=new WeakMap,U.set(Z0,n);let J0=n.get(T);if(J0===void 0)J0=J.getUniformBlockIndex(Z0,T.name),n.set(T,J0)}function v0(T,Z0){let J0=U.get(Z0).get(T);if(H.get(Z0)!==J0)J.uniformBlockBinding(Z0,J0,T.__bindingPointIndex),H.set(Z0,J0)}function g0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),Y.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),q={},G={},F0=null,I0={},N={},F=new WeakMap,R=[],B=null,D=!1,E=null,M=null,L=null,z=null,w=null,P=null,C=null,V=new m0(0,0,0),I=0,d=!1,A=null,m=null,c=null,f=null,l=null,d0.set(0,0,J.canvas.width,J.canvas.height),s.set(0,0,J.canvas.width,J.canvas.height),K.reset(),Y.reset(),X.reset()}return{buffers:{color:K,depth:Y,stencil:X},enable:q0,disable:P0,bindFramebuffer:a0,drawBuffers:b0,useProgram:u0,setBlending:x0,setMaterial:wJ,setFlipSided:SJ,setCullFace:_J,setLineWidth:S,setPolygonOffset:xJ,setScissorTest:n0,activeTexture:o0,bindTexture:U0,unbindTexture:DJ,compressedTexImage2D:w0,compressedTexImage3D:k,texImage2D:u,texImage3D:i,pixelStorei:R0,getParameter:W0,updateUBOMapping:S0,uniformBlockBinding:v0,texStorage2D:e,texStorage3D:K0,texSubImage2D:O,texSubImage3D:v,compressedTexSubImage2D:o,compressedTexSubImage3D:r,scissor:$0,viewport:Y0,reset:g0}}function WN(J,Q,$,Z,W,K,Y){let X=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,H=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new k0,q=new WeakMap,G=new Set,N,F=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(k){}function B(k,O){return R?new OffscreenCanvas(k,O):u8("canvas")}function D(k,O,v){let o=1,r=w0(k);if(r.width>v||r.height>v)o=v/Math.max(r.width,r.height);if(o<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){let e=Math.floor(o*r.width),K0=Math.floor(o*r.height);if(N===void 0)N=B(e,K0);let u=O?B(e,K0):N;return u.width=e,u.height=K0,u.getContext("2d").drawImage(k,0,0,e,K0),A0("WebGLRenderer: Texture has been resized from ("+r.width+"x"+r.height+") to ("+e+"x"+K0+")."),u}else{if("data"in k)A0("WebGLRenderer: Image in DataTexture is too big ("+r.width+"x"+r.height+").");return k}return k}function E(k){return k.generateMipmaps}function M(k){J.generateMipmap(k)}function L(k){if(k.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(k.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function z(k,O,v,o,r,e=!1){if(k!==null){if(J[k]!==void 0)return J[k];A0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let K0;if(o){if(K0=Q.get("EXT_texture_norm16"),!K0)A0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let u=O;if(O===J.RED){if(v===J.FLOAT)u=J.R32F;if(v===J.HALF_FLOAT)u=J.R16F;if(v===J.UNSIGNED_BYTE)u=J.R8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.R16_EXT;if(v===J.SHORT&&K0)u=K0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.R8UI;if(v===J.UNSIGNED_SHORT)u=J.R16UI;if(v===J.UNSIGNED_INT)u=J.R32UI;if(v===J.BYTE)u=J.R8I;if(v===J.SHORT)u=J.R16I;if(v===J.INT)u=J.R32I}if(O===J.RG){if(v===J.FLOAT)u=J.RG32F;if(v===J.HALF_FLOAT)u=J.RG16F;if(v===J.UNSIGNED_BYTE)u=J.RG8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.RG16_EXT;if(v===J.SHORT&&K0)u=K0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RG8UI;if(v===J.UNSIGNED_SHORT)u=J.RG16UI;if(v===J.UNSIGNED_INT)u=J.RG32UI;if(v===J.BYTE)u=J.RG8I;if(v===J.SHORT)u=J.RG16I;if(v===J.INT)u=J.RG32I}if(O===J.RGB_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RGB8UI;if(v===J.UNSIGNED_SHORT)u=J.RGB16UI;if(v===J.UNSIGNED_INT)u=J.RGB32UI;if(v===J.BYTE)u=J.RGB8I;if(v===J.SHORT)u=J.RGB16I;if(v===J.INT)u=J.RGB32I}if(O===J.RGBA_INTEGER){if(v===J.UNSIGNED_BYTE)u=J.RGBA8UI;if(v===J.UNSIGNED_SHORT)u=J.RGBA16UI;if(v===J.UNSIGNED_INT)u=J.RGBA32UI;if(v===J.BYTE)u=J.RGBA8I;if(v===J.SHORT)u=J.RGBA16I;if(v===J.INT)u=J.RGBA32I}if(O===J.RGB){if(v===J.UNSIGNED_SHORT&&K0)u=K0.RGB16_EXT;if(v===J.SHORT&&K0)u=K0.RGB16_SNORM_EXT;if(v===J.UNSIGNED_INT_5_9_9_9_REV)u=J.RGB9_E5;if(v===J.UNSIGNED_INT_10F_11F_11F_REV)u=J.R11F_G11F_B10F}if(O===J.RGBA){let i=e?j$:c0.getTransfer(r);if(v===J.FLOAT)u=J.RGBA32F;if(v===J.HALF_FLOAT)u=J.RGBA16F;if(v===J.UNSIGNED_BYTE)u=i===XJ?J.SRGB8_ALPHA8:J.RGBA8;if(v===J.UNSIGNED_SHORT&&K0)u=K0.RGBA16_EXT;if(v===J.SHORT&&K0)u=K0.RGBA16_SNORM_EXT;if(v===J.UNSIGNED_SHORT_4_4_4_4)u=J.RGBA4;if(v===J.UNSIGNED_SHORT_5_5_5_1)u=J.RGB5_A1}if(u===J.R16F||u===J.R32F||u===J.RG16F||u===J.RG32F||u===J.RGBA16F||u===J.RGBA32F)Q.get("EXT_color_buffer_float");return u}function w(k,O){let v;if(k){if(O===null||O===t9||O===r8)v=J.DEPTH24_STENCIL8;else if(O===x9)v=J.DEPTH32F_STENCIL8;else if(O===L7)v=J.DEPTH24_STENCIL8,A0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===t9||O===r8)v=J.DEPTH_COMPONENT24;else if(O===x9)v=J.DEPTH_COMPONENT32F;else if(O===L7)v=J.DEPTH_COMPONENT16;return v}function P(k,O){if(E(k)===!0||k.isFramebufferTexture&&k.minFilter!==r9&&k.minFilter!==mJ)return Math.log2(Math.max(O.width,O.height))+1;else if(k.mipmaps!==void 0&&k.mipmaps.length>0)return k.mipmaps.length;else if(k.isCompressedTexture&&Array.isArray(k.image))return O.mipmaps.length;else return 1}function C(k){let O=k.target;if(O.removeEventListener("dispose",C),I(O),O.isVideoTexture)q.delete(O);if(O.isHTMLTexture)G.delete(O)}function V(k){let O=k.target;O.removeEventListener("dispose",V),A(O)}function I(k){let O=Z.get(k);if(O.__webglInit===void 0)return;let v=k.source,o=F.get(v);if(o){let r=o[O.__cacheKey];if(r.usedTimes--,r.usedTimes===0)d(k);if(Object.keys(o).length===0)F.delete(v)}Z.remove(k)}function d(k){let O=Z.get(k);J.deleteTexture(O.__webglTexture);let v=k.source,o=F.get(v);delete o[O.__cacheKey],Y.memory.textures--}function A(k){let O=Z.get(k);if(k.depthTexture)k.depthTexture.dispose(),Z.remove(k.depthTexture);if(k.isWebGLCubeRenderTarget)for(let o=0;o<6;o++){if(Array.isArray(O.__webglFramebuffer[o]))for(let r=0;r<O.__webglFramebuffer[o].length;r++)J.deleteFramebuffer(O.__webglFramebuffer[o][r]);else J.deleteFramebuffer(O.__webglFramebuffer[o]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[o])}else{if(Array.isArray(O.__webglFramebuffer))for(let o=0;o<O.__webglFramebuffer.length;o++)J.deleteFramebuffer(O.__webglFramebuffer[o]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let o=0;o<O.__webglColorRenderbuffer.length;o++)if(O.__webglColorRenderbuffer[o])J.deleteRenderbuffer(O.__webglColorRenderbuffer[o])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let v=k.textures;for(let o=0,r=v.length;o<r;o++){let e=Z.get(v[o]);if(e.__webglTexture)J.deleteTexture(e.__webglTexture),Y.memory.textures--;Z.remove(v[o])}Z.remove(k)}let m=0;function c(){m=0}function f(){return m}function l(k){m=k}function b(){let k=m;if(k>=W.maxTextures)A0("WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+W.maxTextures);return m+=1,k}function p(k){let O=[];return O.push(k.wrapS),O.push(k.wrapT),O.push(k.wrapR||0),O.push(k.magFilter),O.push(k.minFilter),O.push(k.anisotropy),O.push(k.internalFormat),O.push(k.format),O.push(k.type),O.push(k.generateMipmaps),O.push(k.premultiplyAlpha),O.push(k.flipY),O.push(k.unpackAlignment),O.push(k.colorSpace),O.join()}function a(k,O){let v=Z.get(k);if(k.isVideoTexture)U0(k);if(k.isRenderTargetTexture===!1&&k.isExternalTexture!==!0&&k.version>0&&v.__version!==k.version){let o=k.image;if(o===null)A0("WebGLRenderer: Texture marked for update but no image data found.");else if(o.complete===!1)A0("WebGLRenderer: Texture marked for update but image is incomplete");else{P0(v,k,O);return}}else if(k.isExternalTexture)v.__webglTexture=k.sourceTexture?k.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,v.__webglTexture,J.TEXTURE0+O)}function Q0(k,O){let v=Z.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&v.__version!==k.version){P0(v,k,O);return}else if(k.isExternalTexture)v.__webglTexture=k.sourceTexture?k.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,v.__webglTexture,J.TEXTURE0+O)}function F0(k,O){let v=Z.get(k);if(k.isRenderTargetTexture===!1&&k.version>0&&v.__version!==k.version){P0(v,k,O);return}$.bindTexture(J.TEXTURE_3D,v.__webglTexture,J.TEXTURE0+O)}function I0(k,O){let v=Z.get(k);if(k.isCubeDepthTexture!==!0&&k.version>0&&v.__version!==k.version){a0(v,k,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,v.__webglTexture,J.TEXTURE0+O)}let M0={[oW]:J.REPEAT,[B6]:J.CLAMP_TO_EDGE,[aW]:J.MIRRORED_REPEAT},r0={[r9]:J.NEAREST,[rW]:J.NEAREST_MIPMAP_NEAREST,[V7]:J.NEAREST_MIPMAP_LINEAR,[mJ]:J.LINEAR,[z6]:J.LINEAR_MIPMAP_NEAREST,[U8]:J.LINEAR_MIPMAP_LINEAR},d0={[YK]:J.NEVER,[NK]:J.ALWAYS,[XK]:J.LESS,[T6]:J.LEQUAL,[HK]:J.EQUAL,[S6]:J.GEQUAL,[UK]:J.GREATER,[GK]:J.NOTEQUAL};function s(k,O){if(O.type===x9&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===mJ||O.magFilter===z6||O.magFilter===V7||O.magFilter===U8||O.minFilter===mJ||O.minFilter===z6||O.minFilter===V7||O.minFilter===U8))A0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(k,J.TEXTURE_WRAP_S,M0[O.wrapS]),J.texParameteri(k,J.TEXTURE_WRAP_T,M0[O.wrapT]),k===J.TEXTURE_3D||k===J.TEXTURE_2D_ARRAY)J.texParameteri(k,J.TEXTURE_WRAP_R,M0[O.wrapR]);if(J.texParameteri(k,J.TEXTURE_MAG_FILTER,r0[O.magFilter]),J.texParameteri(k,J.TEXTURE_MIN_FILTER,r0[O.minFilter]),O.compareFunction)J.texParameteri(k,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(k,J.TEXTURE_COMPARE_FUNC,d0[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===r9)return;if(O.minFilter!==V7&&O.minFilter!==U8)return;if(O.type===x9&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||Z.get(O).__currentAnisotropy){let v=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(k,v.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,W.getMaxAnisotropy())),Z.get(O).__currentAnisotropy=O.anisotropy}}}function N0(k,O){let v=!1;if(k.__webglInit===void 0)k.__webglInit=!0,O.addEventListener("dispose",C);let o=O.source,r=F.get(o);if(r===void 0)r={},F.set(o,r);let e=p(O);if(e!==k.__cacheKey){if(r[e]===void 0)r[e]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,v=!0;r[e].usedTimes++;let K0=r[k.__cacheKey];if(K0!==void 0){if(r[k.__cacheKey].usedTimes--,K0.usedTimes===0)d(O)}k.__cacheKey=e,k.__webglTexture=r[e].texture}return v}function V0(k,O,v){return Math.floor(Math.floor(k/v)/O)}function q0(k,O,v,o){let e=k.updateRanges;if(e.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,v,o,O.data);else{e.sort((R0,$0)=>R0.start-$0.start);let K0=0;for(let R0=1;R0<e.length;R0++){let $0=e[K0],Y0=e[R0],S0=$0.start+$0.count,v0=V0(Y0.start,O.width,4),g0=V0($0.start,O.width,4);if(Y0.start<=S0+1&&v0===g0&&V0(Y0.start+Y0.count-1,O.width,4)===v0)$0.count=Math.max($0.count,Y0.start+Y0.count-$0.start);else++K0,e[K0]=Y0}e.length=K0+1;let u=$.getParameter(J.UNPACK_ROW_LENGTH),i=$.getParameter(J.UNPACK_SKIP_PIXELS),W0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let R0=0,$0=e.length;R0<$0;R0++){let Y0=e[R0],S0=Math.floor(Y0.start/4),v0=Math.ceil(Y0.count/4),g0=S0%O.width,T=Math.floor(S0/O.width),Z0=v0,n=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,g0),$.pixelStorei(J.UNPACK_SKIP_ROWS,T),$.texSubImage2D(J.TEXTURE_2D,0,g0,T,Z0,1,v,o,O.data)}k.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,u),$.pixelStorei(J.UNPACK_SKIP_PIXELS,i),$.pixelStorei(J.UNPACK_SKIP_ROWS,W0)}}function P0(k,O,v){let o=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)o=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)o=J.TEXTURE_3D;let r=N0(k,O),e=O.source;$.bindTexture(o,k.__webglTexture,J.TEXTURE0+v);let K0=Z.get(e);if(e.version!==K0.__version||r===!0){if($.activeTexture(J.TEXTURE0+v),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let n=c0.getPrimaries(c0.workingColorSpace),J0=O.colorSpace===F8?null:c0.getPrimaries(O.colorSpace),O0=O.colorSpace===F8||n===J0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,O0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let i=D(O.image,!1,W.maxTextureSize);i=DJ(O,i);let W0=K.convert(O.format,O.colorSpace),R0=K.convert(O.type),$0=z(O.internalFormat,W0,R0,O.normalized,O.colorSpace,O.isVideoTexture);s(o,O);let Y0,S0=O.mipmaps,v0=O.isVideoTexture!==!0,g0=K0.__version===void 0||r===!0,T=e.dataReady,Z0=P(O,i);if(O.isDepthTexture){if($0=w(O.format===N8,O.type),g0)if(v0)$.texStorage2D(J.TEXTURE_2D,1,$0,i.width,i.height);else $.texImage2D(J.TEXTURE_2D,0,$0,i.width,i.height,0,W0,R0,null)}else if(O.isDataTexture)if(S0.length>0){if(v0&&g0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,S0[0].width,S0[0].height);for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,R0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,W0,R0,Y0.data);O.generateMipmaps=!1}else if(v0){if(g0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,i.width,i.height);if(T)q0(O,i,W0,R0)}else $.texImage2D(J.TEXTURE_2D,0,$0,i.width,i.height,0,W0,R0,i.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(v0&&g0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,$0,S0[0].width,S0[0].height,i.depth);for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],O.format!==B9)if(W0!==null)if(v0){if(T)if(O.layerUpdates.size>0){let O0=HZ(Y0.width,Y0.height,O.format,O.type);for(let t of O.layerUpdates){let L0=Y0.data.subarray(t*O0/Y0.data.BYTES_PER_ELEMENT,(t+1)*O0/Y0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,t,Y0.width,Y0.height,1,W0,L0)}O.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,0,Y0.width,Y0.height,i.depth,W0,Y0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,n,$0,Y0.width,Y0.height,i.depth,0,Y0.data,0,0);else A0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(v0){if(T)$.texSubImage3D(J.TEXTURE_2D_ARRAY,n,0,0,0,Y0.width,Y0.height,i.depth,W0,R0,Y0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,n,$0,Y0.width,Y0.height,i.depth,0,W0,R0,Y0.data)}else{if(v0&&g0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,S0[0].width,S0[0].height);for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],O.format!==B9)if(W0!==null)if(v0){if(T)$.compressedTexSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,Y0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,Y0.data);else A0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,Y0.width,Y0.height,W0,R0,Y0.data)}else $.texImage2D(J.TEXTURE_2D,n,$0,Y0.width,Y0.height,0,W0,R0,Y0.data)}else if(O.isDataArrayTexture)if(v0){if(g0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,$0,i.width,i.height,i.depth);if(T)if(O.layerUpdates.size>0){let n=HZ(i.width,i.height,O.format,O.type);for(let J0 of O.layerUpdates){let O0=i.data.subarray(J0*n/i.data.BYTES_PER_ELEMENT,(J0+1)*n/i.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,J0,i.width,i.height,1,W0,R0,O0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,W0,R0,i.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,$0,i.width,i.height,i.depth,0,W0,R0,i.data);else if(O.isData3DTexture)if(v0){if(g0)$.texStorage3D(J.TEXTURE_3D,Z0,$0,i.width,i.height,i.depth);if(T)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,W0,R0,i.data)}else $.texImage3D(J.TEXTURE_3D,0,$0,i.width,i.height,i.depth,0,W0,R0,i.data);else if(O.isFramebufferTexture){if(g0)if(v0)$.texStorage2D(J.TEXTURE_2D,Z0,$0,i.width,i.height);else{let{width:n,height:J0}=i;for(let O0=0;O0<Z0;O0++)$.texImage2D(J.TEXTURE_2D,O0,$0,n,J0,0,W0,R0,null),n>>=1,J0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let n=J.canvas;if(!n.hasAttribute("layoutsubtree"))n.setAttribute("layoutsubtree","true");if(i.parentNode!==n){n.appendChild(i),G.add(O),n.onpaint=(y0)=>{let VJ=y0.changedElements;for(let JJ of G)if(VJ.includes(JJ.image))JJ.needsUpdate=!0},n.requestPaint();return}let J0=0,O0=J.RGBA,t=J.RGBA,L0=J.UNSIGNED_BYTE;J.texElementImage2D(J.TEXTURE_2D,J0,O0,t,L0,i),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(S0.length>0){if(v0&&g0){let n=w0(S0[0]);$.texStorage2D(J.TEXTURE_2D,Z0,$0,n.width,n.height)}for(let n=0,J0=S0.length;n<J0;n++)if(Y0=S0[n],v0){if(T)$.texSubImage2D(J.TEXTURE_2D,n,0,0,W0,R0,Y0)}else $.texImage2D(J.TEXTURE_2D,n,$0,W0,R0,Y0);O.generateMipmaps=!1}else if(v0){if(g0){let n=w0(i);$.texStorage2D(J.TEXTURE_2D,Z0,$0,n.width,n.height)}if(T)$.texSubImage2D(J.TEXTURE_2D,0,0,0,W0,R0,i)}else $.texImage2D(J.TEXTURE_2D,0,$0,W0,R0,i);if(E(O))M(o);if(K0.__version=e.version,O.onUpdate)O.onUpdate(O)}k.__version=O.version}function a0(k,O,v){if(O.image.length!==6)return;let o=N0(k,O),r=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,k.__webglTexture,J.TEXTURE0+v);let e=Z.get(r);if(r.version!==e.__version||o===!0){$.activeTexture(J.TEXTURE0+v);let K0=c0.getPrimaries(c0.workingColorSpace),u=O.colorSpace===F8?null:c0.getPrimaries(O.colorSpace),i=O.colorSpace===F8||K0===u?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,i);let W0=O.isCompressedTexture||O.image[0].isCompressedTexture,R0=O.image[0]&&O.image[0].isDataTexture,$0=[];for(let t=0;t<6;t++){if(!W0&&!R0)$0[t]=D(O.image[t],!0,W.maxCubemapSize);else $0[t]=R0?O.image[t].image:O.image[t];$0[t]=DJ(O,$0[t])}let Y0=$0[0],S0=K.convert(O.format,O.colorSpace),v0=K.convert(O.type),g0=z(O.internalFormat,S0,v0,O.normalized,O.colorSpace),T=O.isVideoTexture!==!0,Z0=e.__version===void 0||o===!0,n=r.dataReady,J0=P(O,Y0);s(J.TEXTURE_CUBE_MAP,O);let O0;if(W0){if(T&&Z0)$.texStorage2D(J.TEXTURE_CUBE_MAP,J0,g0,Y0.width,Y0.height);for(let t=0;t<6;t++){O0=$0[t].mipmaps;for(let L0=0;L0<O0.length;L0++){let y0=O0[L0];if(O.format!==B9)if(S0!==null)if(T){if(n)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,0,0,y0.width,y0.height,S0,y0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,g0,y0.width,y0.height,0,y0.data);else A0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,0,0,y0.width,y0.height,S0,v0,y0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0,g0,y0.width,y0.height,0,S0,v0,y0.data)}}}else{if(O0=O.mipmaps,T&&Z0){if(O0.length>0)J0++;let t=w0($0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,J0,g0,t.width,t.height)}for(let t=0;t<6;t++)if(R0){if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,$0[t].width,$0[t].height,S0,v0,$0[t].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,g0,$0[t].width,$0[t].height,0,S0,v0,$0[t].data);for(let L0=0;L0<O0.length;L0++){let VJ=O0[L0].image[t].image;if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,0,0,VJ.width,VJ.height,S0,v0,VJ.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,g0,VJ.width,VJ.height,0,S0,v0,VJ.data)}}else{if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,S0,v0,$0[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,g0,S0,v0,$0[t]);for(let L0=0;L0<O0.length;L0++){let y0=O0[L0];if(T){if(n)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,0,0,S0,v0,y0.image[t])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+t,L0+1,g0,S0,v0,y0.image[t])}}}if(E(O))M(J.TEXTURE_CUBE_MAP);if(e.__version=r.version,O.onUpdate)O.onUpdate(O)}k.__version=O.version}function b0(k,O,v,o,r,e){let K0=K.convert(v.format,v.colorSpace),u=K.convert(v.type),i=z(v.internalFormat,K0,u,v.normalized,v.colorSpace),W0=Z.get(O),R0=Z.get(v);if(R0.__renderTarget=O,!W0.__hasExternalTextures){let $0=Math.max(1,O.width>>e),Y0=Math.max(1,O.height>>e);if(r===J.TEXTURE_3D||r===J.TEXTURE_2D_ARRAY)$.texImage3D(r,e,i,$0,Y0,O.depth,0,K0,u,null);else $.texImage2D(r,e,i,$0,Y0,0,K0,u,null)}if($.bindFramebuffer(J.FRAMEBUFFER,k),o0(O))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,r,R0.__webglTexture,0,n0(O));else if(r===J.TEXTURE_2D||r>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&r<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,o,r,R0.__webglTexture,e);$.bindFramebuffer(J.FRAMEBUFFER,null)}function u0(k,O,v){if(J.bindRenderbuffer(J.RENDERBUFFER,k),O.depthBuffer){let o=O.depthTexture,r=o&&o.isDepthTexture?o.type:null,e=w(O.stencilBuffer,r),K0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(o0(O))X.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,n0(O),e,O.width,O.height);else if(v)J.renderbufferStorageMultisample(J.RENDERBUFFER,n0(O),e,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,e,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,K0,J.RENDERBUFFER,k)}else{let o=O.textures;for(let r=0;r<o.length;r++){let e=o[r],K0=K.convert(e.format,e.colorSpace),u=K.convert(e.type),i=z(e.internalFormat,K0,u,e.normalized,e.colorSpace);if(o0(O))X.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,n0(O),i,O.width,O.height);else if(v)J.renderbufferStorageMultisample(J.RENDERBUFFER,n0(O),i,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,i,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function ZJ(k,O,v){let o=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,k),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let r=Z.get(O.depthTexture);if(r.__renderTarget=O,!r.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(o){if(r.__webglInit===void 0)r.__webglInit=!0,O.depthTexture.addEventListener("dispose",C);if(r.__webglTexture===void 0){r.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,r.__webglTexture),s(J.TEXTURE_CUBE_MAP,O.depthTexture);let W0=K.convert(O.depthTexture.format),R0=K.convert(O.depthTexture.type),$0;if(O.depthTexture.format===G8)$0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===N8)$0=J.DEPTH24_STENCIL8;for(let Y0=0;Y0<6;Y0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Y0,0,$0,O.width,O.height,0,W0,R0,null)}}else a(O.depthTexture,0);let e=r.__webglTexture,K0=n0(O),u=o?J.TEXTURE_CUBE_MAP_POSITIVE_X+v:J.TEXTURE_2D,i=O.depthTexture.format===N8?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===G8)if(o0(O))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,e,0,K0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,e,0);else if(O.depthTexture.format===N8)if(o0(O))X.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,e,0,K0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,e,0);else throw Error("Unknown depthTexture format")}function WJ(k){let O=Z.get(k),v=k.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==k.depthTexture){let o=k.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(o){let r=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,o.removeEventListener("dispose",r)};o.addEventListener("dispose",r),O.__depthDisposeCallback=r}O.__boundDepthTexture=o}if(k.depthTexture&&!O.__autoAllocateDepthBuffer)if(v)for(let o=0;o<6;o++)ZJ(O.__webglFramebuffer[o],k,o);else{let o=k.texture.mipmaps;if(o&&o.length>0)ZJ(O.__webglFramebuffer[0],k,0);else ZJ(O.__webglFramebuffer,k,0)}else if(v){O.__webglDepthbuffer=[];for(let o=0;o<6;o++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[o]),O.__webglDepthbuffer[o]===void 0)O.__webglDepthbuffer[o]=J.createRenderbuffer(),u0(O.__webglDepthbuffer[o],k,!1);else{let r=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,e=O.__webglDepthbuffer[o];J.bindRenderbuffer(J.RENDERBUFFER,e),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,e)}}else{let o=k.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),u0(O.__webglDepthbuffer,k,!1);else{let r=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,e=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,e),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,e)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function x0(k,O,v){let o=Z.get(k);if(O!==void 0)b0(o.__webglFramebuffer,k,k.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(v!==void 0)WJ(k)}function wJ(k){let O=k.texture,v=Z.get(k),o=Z.get(O);k.addEventListener("dispose",V);let r=k.textures,e=k.isWebGLCubeRenderTarget===!0,K0=r.length>1;if(!K0){if(o.__webglTexture===void 0)o.__webglTexture=J.createTexture();o.__version=O.version,Y.memory.textures++}if(e){v.__webglFramebuffer=[];for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0){v.__webglFramebuffer[u]=[];for(let i=0;i<O.mipmaps.length;i++)v.__webglFramebuffer[u][i]=J.createFramebuffer()}else v.__webglFramebuffer[u]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){v.__webglFramebuffer=[];for(let u=0;u<O.mipmaps.length;u++)v.__webglFramebuffer[u]=J.createFramebuffer()}else v.__webglFramebuffer=J.createFramebuffer();if(K0)for(let u=0,i=r.length;u<i;u++){let W0=Z.get(r[u]);if(W0.__webglTexture===void 0)W0.__webglTexture=J.createTexture(),Y.memory.textures++}if(k.samples>0&&o0(k)===!1){v.__webglMultisampledFramebuffer=J.createFramebuffer(),v.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,v.__webglMultisampledFramebuffer);for(let u=0;u<r.length;u++){let i=r[u];v.__webglColorRenderbuffer[u]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,v.__webglColorRenderbuffer[u]);let W0=K.convert(i.format,i.colorSpace),R0=K.convert(i.type),$0=z(i.internalFormat,W0,R0,i.normalized,i.colorSpace,k.isXRRenderTarget===!0),Y0=n0(k);J.renderbufferStorageMultisample(J.RENDERBUFFER,Y0,$0,k.width,k.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u,J.RENDERBUFFER,v.__webglColorRenderbuffer[u])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),k.depthBuffer)v.__webglDepthRenderbuffer=J.createRenderbuffer(),u0(v.__webglDepthRenderbuffer,k,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(e){$.bindTexture(J.TEXTURE_CUBE_MAP,o.__webglTexture),s(J.TEXTURE_CUBE_MAP,O);for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)b0(v.__webglFramebuffer[u][i],k,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,i);else b0(v.__webglFramebuffer[u],k,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,0);if(E(O))M(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(K0){for(let u=0,i=r.length;u<i;u++){let W0=r[u],R0=Z.get(W0),$0=J.TEXTURE_2D;if(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)$0=k.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture($0,R0.__webglTexture),s($0,W0),b0(v.__webglFramebuffer,k,W0,J.COLOR_ATTACHMENT0+u,$0,0),E(W0))M($0)}$.unbindTexture()}else{let u=J.TEXTURE_2D;if(k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)u=k.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(u,o.__webglTexture),s(u,O),O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)b0(v.__webglFramebuffer[i],k,O,J.COLOR_ATTACHMENT0,u,i);else b0(v.__webglFramebuffer,k,O,J.COLOR_ATTACHMENT0,u,0);if(E(O))M(u);$.unbindTexture()}if(k.depthBuffer)WJ(k)}function SJ(k){let O=k.textures;for(let v=0,o=O.length;v<o;v++){let r=O[v];if(E(r)){let e=L(k),K0=Z.get(r).__webglTexture;$.bindTexture(e,K0),M(e),$.unbindTexture()}}}let _J=[],S=[];function xJ(k){if(k.samples>0){if(o0(k)===!1){let{textures:O,width:v,height:o}=k,r=J.COLOR_BUFFER_BIT,e=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,K0=Z.get(k),u=O.length>1;if(u)for(let W0=0;W0<O.length;W0++)$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,K0.__webglMultisampledFramebuffer);let i=k.texture.mipmaps;if(i&&i.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglFramebuffer);for(let W0=0;W0<O.length;W0++){if(k.resolveDepthBuffer){if(k.depthBuffer)r|=J.DEPTH_BUFFER_BIT;if(k.stencilBuffer&&k.resolveStencilBuffer)r|=J.STENCIL_BUFFER_BIT}if(u){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,K0.__webglColorRenderbuffer[W0]);let R0=Z.get(O[W0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,R0,0)}if(J.blitFramebuffer(0,0,v,o,0,0,v,o,r,J.NEAREST),H===!0){if(_J.length=0,S.length=0,_J.push(J.COLOR_ATTACHMENT0+W0),k.depthBuffer&&k.resolveDepthBuffer===!1)_J.push(e),S.push(e),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,S);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,_J)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),u)for(let W0=0;W0<O.length;W0++){$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,K0.__webglColorRenderbuffer[W0]);let R0=Z.get(O[W0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,K0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.TEXTURE_2D,R0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,K0.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&H){let O=k.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function n0(k){return Math.min(W.maxSamples,k.samples)}function o0(k){let O=Z.get(k);return k.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function U0(k){let O=Y.render.frame;if(q.get(k)!==O)q.set(k,O),k.update()}function DJ(k,O){let{colorSpace:v,format:o,type:r}=k;if(k.isCompressedTexture===!0||k.isVideoTexture===!0)return O;if(v!==S$&&v!==F8)if(c0.getTransfer(v)===XJ){if(o!==B9||r!==E9)A0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else C0("WebGLTextures: Unsupported texture color space:",v);return O}function w0(k){if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement)U.width=k.naturalWidth||k.width,U.height=k.naturalHeight||k.height;else if(typeof VideoFrame<"u"&&k instanceof VideoFrame)U.width=k.displayWidth,U.height=k.displayHeight;else U.width=k.width,U.height=k.height;return U}this.allocateTextureUnit=b,this.resetTextureUnits=c,this.getTextureUnits=f,this.setTextureUnits=l,this.setTexture2D=a,this.setTexture2DArray=Q0,this.setTexture3D=F0,this.setTextureCube=I0,this.rebindTextures=x0,this.setupRenderTarget=wJ,this.updateRenderTargetMipmap=SJ,this.updateMultisampleRenderTarget=xJ,this.setupDepthRenderbuffer=WJ,this.setupFrameBufferTexture=b0,this.useMultisampledRTT=o0,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function KN(J,Q){function $(Z,W=F8){let K,Y=c0.getTransfer(W);if(Z===E9)return J.UNSIGNED_BYTE;if(Z===oQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===aQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===JK)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===QK)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===tW)return J.BYTE;if(Z===eW)return J.SHORT;if(Z===L7)return J.UNSIGNED_SHORT;if(Z===iQ)return J.INT;if(Z===t9)return J.UNSIGNED_INT;if(Z===x9)return J.FLOAT;if(Z===h9)return J.HALF_FLOAT;if(Z===$K)return J.ALPHA;if(Z===ZK)return J.RGB;if(Z===B9)return J.RGBA;if(Z===G8)return J.DEPTH_COMPONENT;if(Z===N8)return J.DEPTH_STENCIL;if(Z===WK)return J.RED;if(Z===rQ)return J.RED_INTEGER;if(Z===q8)return J.RG;if(Z===tQ)return J.RG_INTEGER;if(Z===eQ)return J.RGBA_INTEGER;if(Z===k6||Z===I6||Z===A6||Z===P6)if(Y===XJ)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===k6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===I6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===A6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===P6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===k6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===I6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===A6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===P6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===J$||Z===Q$||Z===$$||Z===Z$)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===J$)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===Q$)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===$$)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===Z$)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===W$||Z===K$||Z===Y$||Z===X$||Z===H$||Z===w6||Z===U$)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===W$||Z===K$)return Y===XJ?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===Y$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===X$)return K.COMPRESSED_R11_EAC;if(Z===H$)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===w6)return K.COMPRESSED_RG11_EAC;if(Z===U$)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===G$||Z===N$||Z===q$||Z===F$||Z===D$||Z===E$||Z===R$||Z===O$||Z===M$||Z===_$||Z===V$||Z===L$||Z===B$||Z===z$)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===G$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===N$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===q$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===F$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===D$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===E$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===R$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===O$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===M$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===_$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===V$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===L$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===B$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===z$)return Y===XJ?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===k$||Z===I$||Z===A$)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===k$)return Y===XJ?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===I$)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===A$)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===P$||Z===w$||Z===C6||Z===C$)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===P$)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===w$)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===C6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===C$)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===r8)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var YN=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,XN=`
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

}`;class $Y{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new g6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new K9({vertexShader:YN,fragmentShader:XN,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new FJ(new b9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ZY extends z9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,Y="local-floor",X=1,H=null,U=null,q=null,G=null,N=null,F=null,R=typeof XRWebGLBinding<"u",B=new $Y,D={},E=Q.getContextAttributes(),M=null,L=null,z=[],w=[],P=new k0,C=null,V=new bJ;V.viewport=new EJ;let I=new bJ;I.viewport=new EJ;let d=[V,I],A=new WZ,m=null,c=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(s){let N0=z[s];if(N0===void 0)N0=new I7,z[s]=N0;return N0.getTargetRaySpace()},this.getControllerGrip=function(s){let N0=z[s];if(N0===void 0)N0=new I7,z[s]=N0;return N0.getGripSpace()},this.getHand=function(s){let N0=z[s];if(N0===void 0)N0=new I7,z[s]=N0;return N0.getHandSpace()};function f(s){let N0=w.indexOf(s.inputSource);if(N0===-1)return;let V0=z[N0];if(V0!==void 0)V0.update(s.inputSource,s.frame,H||K),V0.dispatchEvent({type:s.type,data:s.inputSource})}function l(){Z.removeEventListener("select",f),Z.removeEventListener("selectstart",f),Z.removeEventListener("selectend",f),Z.removeEventListener("squeeze",f),Z.removeEventListener("squeezestart",f),Z.removeEventListener("squeezeend",f),Z.removeEventListener("end",l),Z.removeEventListener("inputsourceschange",b);for(let s=0;s<z.length;s++){let N0=w[s];if(N0===null)continue;w[s]=null,z[s].disconnect(N0)}m=null,c=null,B.reset();for(let s in D)delete D[s];J.setRenderTarget(M),N=null,G=null,q=null,Z=null,L=null,d0.stop(),$.isPresenting=!1,J.setPixelRatio(C),J.setSize(P.width,P.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(s){if(W=s,$.isPresenting===!0)A0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(s){if(Y=s,$.isPresenting===!0)A0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||K},this.setReferenceSpace=function(s){H=s},this.getBaseLayer=function(){return G!==null?G:N},this.getBinding=function(){if(q===null&&R)q=new XRWebGLBinding(Z,Q);return q},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(s){if(Z=s,Z!==null){if(M=J.getRenderTarget(),Z.addEventListener("select",f),Z.addEventListener("selectstart",f),Z.addEventListener("selectend",f),Z.addEventListener("squeeze",f),Z.addEventListener("squeezestart",f),Z.addEventListener("squeezeend",f),Z.addEventListener("end",l),Z.addEventListener("inputsourceschange",b),E.xrCompatible!==!0)await Q.makeXRCompatible();if(C=J.getPixelRatio(),J.getSize(P),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let V0={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:W};N=new XRWebGLLayer(Z,Q,V0),Z.updateRenderState({baseLayer:N}),J.setPixelRatio(1),J.setSize(N.framebufferWidth,N.framebufferHeight,!1),L=new W9(N.framebufferWidth,N.framebufferHeight,{format:B9,type:E9,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1})}else{let V0=null,q0=null,P0=null;if(E.depth)P0=E.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,V0=E.stencil?N8:G8,q0=E.stencil?r8:t9;let a0={colorFormat:Q.RGBA8,depthFormat:P0,scaleFactor:W};q=this.getBinding(),G=q.createProjectionLayer(a0),Z.updateRenderState({layers:[G]}),J.setPixelRatio(1),J.setSize(G.textureWidth,G.textureHeight,!1),L=new W9(G.textureWidth,G.textureHeight,{format:B9,type:E9,depthTexture:new Q8(G.textureWidth,G.textureHeight,q0,void 0,void 0,void 0,void 0,void 0,void 0,V0),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(X),H=null,K=await Z.requestReferenceSpace(Y),d0.setContext(Z),d0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return B.getDepthTexture()};function b(s){for(let N0=0;N0<s.removed.length;N0++){let V0=s.removed[N0],q0=w.indexOf(V0);if(q0>=0)w[q0]=null,z[q0].disconnect(V0)}for(let N0=0;N0<s.added.length;N0++){let V0=s.added[N0],q0=w.indexOf(V0);if(q0===-1){for(let a0=0;a0<z.length;a0++)if(a0>=w.length){w.push(V0),q0=a0;break}else if(w[a0]===null){w[a0]=V0,q0=a0;break}if(q0===-1)break}let P0=z[q0];if(P0)P0.connect(V0)}}let p=new y,a=new y;function Q0(s,N0,V0){p.setFromMatrixPosition(N0.matrixWorld),a.setFromMatrixPosition(V0.matrixWorld);let q0=p.distanceTo(a),P0=N0.projectionMatrix.elements,a0=V0.projectionMatrix.elements,b0=P0[14]/(P0[10]-1),u0=P0[14]/(P0[10]+1),ZJ=(P0[9]+1)/P0[5],WJ=(P0[9]-1)/P0[5],x0=(P0[8]-1)/P0[0],wJ=(a0[8]+1)/a0[0],SJ=b0*x0,_J=b0*wJ,S=q0/(-x0+wJ),xJ=S*-x0;if(N0.matrixWorld.decompose(s.position,s.quaternion,s.scale),s.translateX(xJ),s.translateZ(S),s.matrixWorld.compose(s.position,s.quaternion,s.scale),s.matrixWorldInverse.copy(s.matrixWorld).invert(),P0[10]===-1)s.projectionMatrix.copy(N0.projectionMatrix),s.projectionMatrixInverse.copy(N0.projectionMatrixInverse);else{let n0=b0+S,o0=u0+S,U0=SJ-xJ,DJ=_J+(q0-xJ),w0=ZJ*u0/o0*n0,k=WJ*u0/o0*n0;s.projectionMatrix.makePerspective(U0,DJ,w0,k,n0,o0),s.projectionMatrixInverse.copy(s.projectionMatrix).invert()}}function F0(s,N0){if(N0===null)s.matrixWorld.copy(s.matrix);else s.matrixWorld.multiplyMatrices(N0.matrixWorld,s.matrix);s.matrixWorldInverse.copy(s.matrixWorld).invert()}this.updateCamera=function(s){if(Z===null)return;let{near:N0,far:V0}=s;if(B.texture!==null){if(B.depthNear>0)N0=B.depthNear;if(B.depthFar>0)V0=B.depthFar}if(A.near=I.near=V.near=N0,A.far=I.far=V.far=V0,m!==A.near||c!==A.far)Z.updateRenderState({depthNear:A.near,depthFar:A.far}),m=A.near,c=A.far;A.layers.mask=s.layers.mask|6,V.layers.mask=A.layers.mask&-5,I.layers.mask=A.layers.mask&-3;let q0=s.parent,P0=A.cameras;F0(A,q0);for(let a0=0;a0<P0.length;a0++)F0(P0[a0],q0);if(P0.length===2)Q0(A,V,I);else A.projectionMatrix.copy(V.projectionMatrix);I0(s,A,q0)};function I0(s,N0,V0){if(V0===null)s.matrix.copy(N0.matrixWorld);else s.matrix.copy(V0.matrixWorld),s.matrix.invert(),s.matrix.multiply(N0.matrixWorld);if(s.matrix.decompose(s.position,s.quaternion,s.scale),s.updateMatrixWorld(!0),s.projectionMatrix.copy(N0.projectionMatrix),s.projectionMatrixInverse.copy(N0.projectionMatrixInverse),s.isPerspectiveCamera)s.fov=n8*2*Math.atan(1/s.projectionMatrix.elements[5]),s.zoom=1}this.getCamera=function(){return A},this.getFoveation=function(){if(G===null&&N===null)return;return X},this.setFoveation=function(s){if(X=s,G!==null)G.fixedFoveation=s;if(N!==null&&N.fixedFoveation!==void 0)N.fixedFoveation=s},this.hasDepthSensing=function(){return B.texture!==null},this.getDepthSensingMesh=function(){return B.getMesh(A)},this.getCameraTexture=function(s){return D[s]};let M0=null;function r0(s,N0){if(U=N0.getViewerPose(H||K),F=N0,U!==null){let V0=U.views;if(N!==null)J.setRenderTargetFramebuffer(L,N.framebuffer),J.setRenderTarget(L);let q0=!1;if(V0.length!==A.cameras.length)A.cameras.length=0,q0=!0;for(let u0=0;u0<V0.length;u0++){let ZJ=V0[u0],WJ=null;if(N!==null)WJ=N.getViewport(ZJ);else{let wJ=q.getViewSubImage(G,ZJ);if(WJ=wJ.viewport,u0===0)J.setRenderTargetTextures(L,wJ.colorTexture,wJ.depthStencilTexture),J.setRenderTarget(L)}let x0=d[u0];if(x0===void 0)x0=new bJ,x0.layers.enable(u0),x0.viewport=new EJ,d[u0]=x0;if(x0.matrix.fromArray(ZJ.transform.matrix),x0.matrix.decompose(x0.position,x0.quaternion,x0.scale),x0.projectionMatrix.fromArray(ZJ.projectionMatrix),x0.projectionMatrixInverse.copy(x0.projectionMatrix).invert(),x0.viewport.set(WJ.x,WJ.y,WJ.width,WJ.height),u0===0)A.matrix.copy(x0.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale);if(q0===!0)A.cameras.push(x0)}let P0=Z.enabledFeatures;if(P0&&P0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&R){q=$.getBinding();let u0=q.getDepthInformation(V0[0]);if(u0&&u0.isValid&&u0.texture)B.init(u0,Z.renderState)}if(P0&&P0.includes("camera-access")&&R){J.state.unbindTexture(),q=$.getBinding();for(let u0=0;u0<V0.length;u0++){let ZJ=V0[u0].camera;if(ZJ){let WJ=D[ZJ];if(!WJ)WJ=new g6,D[ZJ]=WJ;let x0=q.getCameraImage(ZJ);WJ.sourceTexture=x0}}}}for(let V0=0;V0<z.length;V0++){let q0=w[V0],P0=z[V0];if(q0!==null&&P0!==void 0)P0.update(q0,N0,H||K)}if(M0)M0(s,N0);if(N0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:N0});F=null}let d0=new cK;d0.setAnimationLoop(r0),this.setAnimationLoop=function(s){M0=s},this.dispose=function(){}}}var HN=new qJ,WY=new j0;WY.set(-1,0,0,0,1,0,0,0,1);function UN(J,Q){function $(D,E){if(D.matrixAutoUpdate===!0)D.updateMatrix();E.value.copy(D.matrix)}function Z(D,E){if(E.color.getRGB(D.fogColor.value,d$(J)),E.isFog)D.fogNear.value=E.near,D.fogFar.value=E.far;else if(E.isFogExp2)D.fogDensity.value=E.density}function W(D,E,M,L,z){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)K(D,E);else if(E.isMeshLambertMaterial){if(K(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)K(D,E),G(D,E);else if(E.isMeshPhongMaterial){if(K(D,E),q(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(K(D,E),N(D,E),E.isMeshPhysicalMaterial)F(D,E,z)}else if(E.isMeshMatcapMaterial)K(D,E),R(D,E);else if(E.isMeshDepthMaterial)K(D,E);else if(E.isMeshDistanceMaterial)K(D,E),B(D,E);else if(E.isMeshNormalMaterial)K(D,E);else if(E.isLineBasicMaterial){if(Y(D,E),E.isLineDashedMaterial)X(D,E)}else if(E.isPointsMaterial)H(D,E,M,L);else if(E.isSpriteMaterial)U(D,E);else if(E.isShadowMaterial)D.color.value.copy(E.color),D.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function K(D,E){if(D.opacity.value=E.opacity,E.color)D.diffuse.value.copy(E.color);if(E.emissive)D.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)D.map.value=E.map,$(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.bumpMap){if(D.bumpMap.value=E.bumpMap,$(E.bumpMap,D.bumpMapTransform),D.bumpScale.value=E.bumpScale,E.side===pJ)D.bumpScale.value*=-1}if(E.normalMap){if(D.normalMap.value=E.normalMap,$(E.normalMap,D.normalMapTransform),D.normalScale.value.copy(E.normalScale),E.side===pJ)D.normalScale.value.negate()}if(E.displacementMap)D.displacementMap.value=E.displacementMap,$(E.displacementMap,D.displacementMapTransform),D.displacementScale.value=E.displacementScale,D.displacementBias.value=E.displacementBias;if(E.emissiveMap)D.emissiveMap.value=E.emissiveMap,$(E.emissiveMap,D.emissiveMapTransform);if(E.specularMap)D.specularMap.value=E.specularMap,$(E.specularMap,D.specularMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest;let M=Q.get(E),L=M.envMap,z=M.envMapRotation;if(L){if(D.envMap.value=L,D.envMapRotation.value.setFromMatrix4(HN.makeRotationFromEuler(z)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(WY);D.reflectivity.value=E.reflectivity,D.ior.value=E.ior,D.refractionRatio.value=E.refractionRatio}if(E.lightMap)D.lightMap.value=E.lightMap,D.lightMapIntensity.value=E.lightMapIntensity,$(E.lightMap,D.lightMapTransform);if(E.aoMap)D.aoMap.value=E.aoMap,D.aoMapIntensity.value=E.aoMapIntensity,$(E.aoMap,D.aoMapTransform)}function Y(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,E.map)D.map.value=E.map,$(E.map,D.mapTransform)}function X(D,E){D.dashSize.value=E.dashSize,D.totalSize.value=E.dashSize+E.gapSize,D.scale.value=E.scale}function H(D,E,M,L){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.size.value=E.size*M,D.scale.value=L*0.5,E.map)D.map.value=E.map,$(E.map,D.uvTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function U(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.rotation.value=E.rotation,E.map)D.map.value=E.map,$(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function q(D,E){D.specular.value.copy(E.specular),D.shininess.value=Math.max(E.shininess,0.0001)}function G(D,E){if(E.gradientMap)D.gradientMap.value=E.gradientMap}function N(D,E){if(D.metalness.value=E.metalness,E.metalnessMap)D.metalnessMap.value=E.metalnessMap,$(E.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=E.roughness,E.roughnessMap)D.roughnessMap.value=E.roughnessMap,$(E.roughnessMap,D.roughnessMapTransform);if(E.envMap)D.envMapIntensity.value=E.envMapIntensity}function F(D,E,M){if(D.ior.value=E.ior,E.sheen>0){if(D.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),D.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)D.sheenColorMap.value=E.sheenColorMap,$(E.sheenColorMap,D.sheenColorMapTransform);if(E.sheenRoughnessMap)D.sheenRoughnessMap.value=E.sheenRoughnessMap,$(E.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(D.clearcoat.value=E.clearcoat,D.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)D.clearcoatMap.value=E.clearcoatMap,$(E.clearcoatMap,D.clearcoatMapTransform);if(E.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,$(E.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(D.clearcoatNormalMap.value=E.clearcoatNormalMap,$(E.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===pJ)D.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)D.dispersion.value=E.dispersion;if(E.iridescence>0){if(D.iridescence.value=E.iridescence,D.iridescenceIOR.value=E.iridescenceIOR,D.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)D.iridescenceMap.value=E.iridescenceMap,$(E.iridescenceMap,D.iridescenceMapTransform);if(E.iridescenceThicknessMap)D.iridescenceThicknessMap.value=E.iridescenceThicknessMap,$(E.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(E.transmission>0){if(D.transmission.value=E.transmission,D.transmissionSamplerMap.value=M.texture,D.transmissionSamplerSize.value.set(M.width,M.height),E.transmissionMap)D.transmissionMap.value=E.transmissionMap,$(E.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=E.thickness,E.thicknessMap)D.thicknessMap.value=E.thicknessMap,$(E.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=E.attenuationDistance,D.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(D.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)D.anisotropyMap.value=E.anisotropyMap,$(E.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=E.specularIntensity,D.specularColor.value.copy(E.specularColor),E.specularColorMap)D.specularColorMap.value=E.specularColorMap,$(E.specularColorMap,D.specularColorMapTransform);if(E.specularIntensityMap)D.specularIntensityMap.value=E.specularIntensityMap,$(E.specularIntensityMap,D.specularIntensityMapTransform)}function R(D,E){if(E.matcap)D.matcap.value=E.matcap}function B(D,E){let M=Q.get(E).light;D.referencePosition.value.setFromMatrixPosition(M.matrixWorld),D.nearDistance.value=M.shadow.camera.near,D.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function GN(J,Q,$,Z){let W={},K={},Y=[],X=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function H(M,L){let z=L.program;Z.uniformBlockBinding(M,z)}function U(M,L){let z=W[M.id];if(z===void 0)R(M),z=q(M),W[M.id]=z,M.addEventListener("dispose",D);let w=L.program;Z.updateUBOMapping(M,w);let P=Q.render.frame;if(K[M.id]!==P)N(M),K[M.id]=P}function q(M){let L=G();M.__bindingPointIndex=L;let z=J.createBuffer(),w=M.__size,P=M.usage;return J.bindBuffer(J.UNIFORM_BUFFER,z),J.bufferData(J.UNIFORM_BUFFER,w,P),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,L,z),z}function G(){for(let M=0;M<X;M++)if(Y.indexOf(M)===-1)return Y.push(M),M;return C0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function N(M){let L=W[M.id],z=M.uniforms,w=M.__cache;J.bindBuffer(J.UNIFORM_BUFFER,L);for(let P=0,C=z.length;P<C;P++){let V=Array.isArray(z[P])?z[P]:[z[P]];for(let I=0,d=V.length;I<d;I++){let A=V[I];if(F(A,P,I,w)===!0){let m=A.__offset,c=Array.isArray(A.value)?A.value:[A.value],f=0;for(let l=0;l<c.length;l++){let b=c[l],p=B(b);if(typeof b==="number"||typeof b==="boolean")A.__data[0]=b,J.bufferSubData(J.UNIFORM_BUFFER,m+f,A.__data);else if(b.isMatrix3)A.__data[0]=b.elements[0],A.__data[1]=b.elements[1],A.__data[2]=b.elements[2],A.__data[3]=0,A.__data[4]=b.elements[3],A.__data[5]=b.elements[4],A.__data[6]=b.elements[5],A.__data[7]=0,A.__data[8]=b.elements[6],A.__data[9]=b.elements[7],A.__data[10]=b.elements[8],A.__data[11]=0;else if(ArrayBuffer.isView(b))A.__data.set(new b.constructor(b.buffer,b.byteOffset,A.__data.length));else b.toArray(A.__data,f),f+=p.storage/Float32Array.BYTES_PER_ELEMENT}J.bufferSubData(J.UNIFORM_BUFFER,m,A.__data)}}}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(M,L,z,w){let P=M.value,C=L+"_"+z;if(w[C]===void 0){if(typeof P==="number"||typeof P==="boolean")w[C]=P;else if(ArrayBuffer.isView(P))w[C]=P.slice();else w[C]=P.clone();return!0}else{let V=w[C];if(typeof P==="number"||typeof P==="boolean"){if(V!==P)return w[C]=P,!0}else if(ArrayBuffer.isView(P))return!0;else if(V.equals(P)===!1)return V.copy(P),!0}return!1}function R(M){let L=M.uniforms,z=0,w=16;for(let C=0,V=L.length;C<V;C++){let I=Array.isArray(L[C])?L[C]:[L[C]];for(let d=0,A=I.length;d<A;d++){let m=I[d],c=Array.isArray(m.value)?m.value:[m.value];for(let f=0,l=c.length;f<l;f++){let b=c[f],p=B(b),a=z%w,Q0=a%p.boundary,F0=a+Q0;if(z+=Q0,F0!==0&&w-F0<p.storage)z+=w-F0;m.__data=new Float32Array(p.storage/Float32Array.BYTES_PER_ELEMENT),m.__offset=z,z+=p.storage}}}let P=z%w;if(P>0)z+=w-P;return M.__size=z,M.__cache={},this}function B(M){let L={boundary:0,storage:0};if(typeof M==="number"||typeof M==="boolean")L.boundary=4,L.storage=4;else if(M.isVector2)L.boundary=8,L.storage=8;else if(M.isVector3||M.isColor)L.boundary=16,L.storage=12;else if(M.isVector4)L.boundary=16,L.storage=16;else if(M.isMatrix3)L.boundary=48,L.storage=48;else if(M.isMatrix4)L.boundary=64,L.storage=64;else if(M.isTexture)A0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(M))L.boundary=16,L.storage=M.byteLength;else A0("WebGLRenderer: Unsupported uniform value type.",M);return L}function D(M){let L=M.target;L.removeEventListener("dispose",D);let z=Y.indexOf(L.__bindingPointIndex);Y.splice(z,1),J.deleteBuffer(W[L.id]),delete W[L.id],delete K[L.id]}function E(){for(let M in W)J.deleteBuffer(W[M]);Y=[],W={},K={}}return{bind:H,update:U,dispose:E}}var NN=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),k9=null;function qN(){if(k9===null)k9=new m$(NN,16,16,q8,h9),k9.name="DFG_LUT",k9.minFilter=mJ,k9.magFilter=mJ,k9.wrapS=B6,k9.wrapT=B6,k9.generateMipmaps=!1,k9.needsUpdate=!0;return k9}class _Z{constructor(J={}){let{canvas:Q=qK(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:Y=!1,premultipliedAlpha:X=!0,preserveDrawingBuffer:H=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:q=!1,reversedDepthBuffer:G=!1,outputBufferType:N=E9}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=K;let R=N,B=new Set([eQ,tQ,rQ]),D=new Set([E9,t9,L7,r8,oQ,aQ]),E=new Uint32Array(4),M=new Int32Array(4),L=new y,z=null,w=null,P=[],C=[],V=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=D9,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,d=!1,A=null;this._outputColorSpace=B7;let m=0,c=0,f=null,l=-1,b=null,p=new EJ,a=new EJ,Q0=null,F0=new m0(0),I0=0,M0=Q.width,r0=Q.height,d0=1,s=null,N0=null,V0=new EJ(0,0,M0,r0),q0=new EJ(0,0,M0,r0),P0=!1,a0=new C7,b0=!1,u0=!1,ZJ=new qJ,WJ=new y,x0=new EJ,wJ={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},SJ=!1;function _J(){return f===null?d0:1}let S=$;function xJ(_,j){return Q.getContext(_,j)}try{let _={alpha:!0,depth:Z,stencil:W,antialias:Y,premultipliedAlpha:X,preserveDrawingBuffer:H,powerPreference:U,failIfMajorPerformanceCaveat:q};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${RW}`);if(Q.addEventListener("webglcontextlost",O0,!1),Q.addEventListener("webglcontextrestored",t,!1),Q.addEventListener("webglcontextcreationerror",L0,!1),S===null){if(S=xJ("webgl2",_),S===null)if(xJ("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(_){throw C0("WebGLRenderer: "+_.message),_}let n0,o0,U0,DJ,w0,k,O,v,o,r,e,K0,u,i,W0,R0,$0,Y0,S0,v0,g0,T,Z0;function n(){if(n0=new _G(S),n0.init(),g0=new KN(S,n0),o0=new NG(S,n0,J,g0),U0=new ZN(S,n0),o0.reversedDepthBuffer&&G)U0.buffers.depth.setReversed(!0);DJ=new BG(S),w0=new d5,k=new WN(S,n0,U0,w0,o0,g0,DJ),O=new MG(I),v=new AX(S),T=new UG(S,v),o=new VG(S,v,DJ,T),r=new kG(S,o,v,T,DJ),Y0=new zG(S,o0,k),W0=new qG(w0),e=new l5(I,O,n0,o0,T,W0),K0=new UN(I,w0),u=new c5,i=new r5(n0),$0=new HG(I,O,U0,r,F,X),R0=new $N(I,r,o0),Z0=new GN(S,DJ,o0,U0),S0=new GG(S,n0,DJ),v0=new LG(S,n0,DJ),DJ.programs=e.programs,I.capabilities=o0,I.extensions=n0,I.properties=w0,I.renderLists=u,I.shadowMap=R0,I.state=U0,I.info=DJ}if(n(),R!==E9)V=new AG(R,Q.width,Q.height,Z,W);let J0=new ZY(I,S);this.xr=J0,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let _=n0.get("WEBGL_lose_context");if(_)_.loseContext()},this.forceContextRestore=function(){let _=n0.get("WEBGL_lose_context");if(_)_.restoreContext()},this.getPixelRatio=function(){return d0},this.setPixelRatio=function(_){if(_===void 0)return;d0=_,this.setSize(M0,r0,!1)},this.getSize=function(_){return _.set(M0,r0)},this.setSize=function(_,j,g=!0){if(J0.isPresenting){A0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(M0=_,r0=j,Q.width=Math.floor(_*d0),Q.height=Math.floor(j*d0),g===!0)Q.style.width=_+"px",Q.style.height=j+"px";if(V!==null)V.setSize(Q.width,Q.height);this.setViewport(0,0,_,j)},this.getDrawingBufferSize=function(_){return _.set(M0*d0,r0*d0).floor()},this.setDrawingBufferSize=function(_,j,g){M0=_,r0=j,d0=g,Q.width=Math.floor(_*g),Q.height=Math.floor(j*g),this.setViewport(0,0,_,j)},this.setEffects=function(_){if(R===E9){C0("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let j=0;j<_.length;j++)if(_[j].isOutputPass===!0){A0("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}V.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(p)},this.getViewport=function(_){return _.copy(V0)},this.setViewport=function(_,j,g,x){if(_.isVector4)V0.set(_.x,_.y,_.z,_.w);else V0.set(_,j,g,x);U0.viewport(p.copy(V0).multiplyScalar(d0).round())},this.getScissor=function(_){return _.copy(q0)},this.setScissor=function(_,j,g,x){if(_.isVector4)q0.set(_.x,_.y,_.z,_.w);else q0.set(_,j,g,x);U0.scissor(a.copy(q0).multiplyScalar(d0).round())},this.getScissorTest=function(){return P0},this.setScissorTest=function(_){U0.setScissorTest(P0=_)},this.setOpaqueSort=function(_){s=_},this.setTransparentSort=function(_){N0=_},this.getClearColor=function(_){return _.copy($0.getClearColor())},this.setClearColor=function(){$0.setClearColor(...arguments)},this.getClearAlpha=function(){return $0.getClearAlpha()},this.setClearAlpha=function(){$0.setClearAlpha(...arguments)},this.clear=function(_=!0,j=!0,g=!0){let x=0;if(_){let h=!1;if(f!==null){let G0=f.texture.format;h=B.has(G0)}if(h){let G0=f.texture.type,E0=D.has(G0),H0=$0.getClearColor(),_0=$0.getClearAlpha(),B0=H0.r,f0=H0.g,p0=H0.b;if(E0)E[0]=B0,E[1]=f0,E[2]=p0,E[3]=_0,S.clearBufferuiv(S.COLOR,0,E);else M[0]=B0,M[1]=f0,M[2]=p0,M[3]=_0,S.clearBufferiv(S.COLOR,0,M)}else x|=S.COLOR_BUFFER_BIT}if(j)x|=S.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(g)x|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(x!==0)S.clear(x)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(_){_.setRenderer(this),A=_},this.dispose=function(){Q.removeEventListener("webglcontextlost",O0,!1),Q.removeEventListener("webglcontextrestored",t,!1),Q.removeEventListener("webglcontextcreationerror",L0,!1),$0.dispose(),u.dispose(),i.dispose(),w0.dispose(),O.dispose(),r.dispose(),T.dispose(),Z0.dispose(),e.dispose(),J0.dispose(),J0.removeEventListener("sessionstart",PZ),J0.removeEventListener("sessionend",wZ),Z8.stop()};function O0(_){_.preventDefault(),E7("WebGLRenderer: Context Lost."),d=!0}function t(){E7("WebGLRenderer: Context Restored."),d=!1;let _=DJ.autoReset,j=R0.enabled,g=R0.autoUpdate,x=R0.needsUpdate,h=R0.type;n(),DJ.autoReset=_,R0.enabled=j,R0.autoUpdate=g,R0.needsUpdate=x,R0.type=h}function L0(_){C0("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function y0(_){let j=_.target;j.removeEventListener("dispose",y0),VJ(j)}function VJ(_){JJ(_),w0.remove(_)}function JJ(_){let j=w0.get(_).programs;if(j!==void 0){if(j.forEach(function(g){e.releaseProgram(g)}),_.isShaderMaterial)e.releaseShaderCache(_)}}this.renderBufferDirect=function(_,j,g,x,h,G0){if(j===null)j=wJ;let E0=h.isMesh&&h.matrixWorld.determinant()<0,H0=NY(_,j,g,x,h);U0.setMaterial(x,E0);let _0=g.index,B0=1;if(x.wireframe===!0){if(_0=o.getWireframeAttribute(g),_0===void 0)return;B0=2}let f0=g.drawRange,p0=g.attributes.position,z0=f0.start*B0,QJ=(f0.start+f0.count)*B0;if(G0!==null)z0=Math.max(z0,G0.start*B0),QJ=Math.min(QJ,(G0.start+G0.count)*B0);if(_0!==null)z0=Math.max(z0,0),QJ=Math.min(QJ,_0.count);else if(p0!==void 0&&p0!==null)z0=Math.max(z0,0),QJ=Math.min(QJ,p0.count);let OJ=QJ-z0;if(OJ<0||OJ===1/0)return;T.setup(h,x,H0,g,_0);let RJ,KJ=S0;if(_0!==null)RJ=v.get(_0),KJ=v0,KJ.setIndex(RJ);if(h.isMesh)if(x.wireframe===!0)U0.setLineWidth(x.wireframeLinewidth*_J()),KJ.setMode(S.LINES);else KJ.setMode(S.TRIANGLES);else if(h.isLine){let jJ=x.linewidth;if(jJ===void 0)jJ=1;if(U0.setLineWidth(jJ*_J()),h.isLineSegments)KJ.setMode(S.LINES);else if(h.isLineLoop)KJ.setMode(S.LINE_LOOP);else KJ.setMode(S.LINE_STRIP)}else if(h.isPoints)KJ.setMode(S.POINTS);else if(h.isSprite)KJ.setMode(S.TRIANGLES);if(h.isBatchedMesh)if(!n0.get("WEBGL_multi_draw")){let{_multiDrawStarts:jJ,_multiDrawCounts:D0,_multiDrawCount:uJ}=h,i0=_0?v.get(_0).bytesPerElement:1,J9=w0.get(x).currentProgram.getUniforms();for(let O9=0;O9<uJ;O9++)J9.setValue(S,"_gl_DrawID",O9),KJ.render(jJ[O9]/i0,D0[O9])}else KJ.renderMultiDraw(h._multiDrawStarts,h._multiDrawCounts,h._multiDrawCount);else if(h.isInstancedMesh)KJ.renderInstances(z0,OJ,h.count);else if(g.isInstancedBufferGeometry){let jJ=g._maxInstanceCount!==void 0?g._maxInstanceCount:1/0,D0=Math.min(g.instanceCount,jJ);KJ.renderInstances(z0,OJ,D0)}else KJ.render(z0,OJ)};function R9(_,j,g){if(_.transparent===!0&&_.side===$9&&_.forceSinglePass===!1)_.side=pJ,_.needsUpdate=!0,m7(_,j,g),_.side=i8,_.needsUpdate=!0,m7(_,j,g),_.side=$9;else m7(_,j,g)}this.compile=function(_,j,g=null){if(g===null)g=_;if(w=i.get(g),w.init(j),C.push(w),g.traverseVisible(function(h){if(h.isLight&&h.layers.test(j.layers)){if(w.pushLight(h),h.castShadow)w.pushShadow(h)}}),_!==g)_.traverseVisible(function(h){if(h.isLight&&h.layers.test(j.layers)){if(w.pushLight(h),h.castShadow)w.pushShadow(h)}});w.setupLights();let x=new Set;return _.traverse(function(h){if(!(h.isMesh||h.isPoints||h.isLine||h.isSprite))return;let G0=h.material;if(G0)if(Array.isArray(G0))for(let E0=0;E0<G0.length;E0++){let H0=G0[E0];R9(H0,g,h),x.add(H0)}else R9(G0,g,h),x.add(G0)}),w=C.pop(),x},this.compileAsync=function(_,j,g=null){let x=this.compile(_,j,g);return new Promise((h)=>{function G0(){if(x.forEach(function(E0){if(w0.get(E0).currentProgram.isReady())x.delete(E0)}),x.size===0){h(_);return}setTimeout(G0,10)}if(n0.get("KHR_parallel_shader_compile")!==null)G0();else setTimeout(G0,10)})};let X9=null;function UY(_){if(X9)X9(_)}function PZ(){Z8.stop()}function wZ(){Z8.start()}let Z8=new cK;if(Z8.setAnimationLoop(UY),typeof self<"u")Z8.setContext(self);this.setAnimationLoop=function(_){X9=_,J0.setAnimationLoop(_),_===null?Z8.stop():Z8.start()},J0.addEventListener("sessionstart",PZ),J0.addEventListener("sessionend",wZ),this.render=function(_,j){if(j!==void 0&&j.isCamera!==!0){C0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;if(A!==null)A.renderStart(_,j);let g=J0.enabled===!0&&J0.isPresenting===!0,x=V!==null&&(f===null||g)&&V.begin(I,f);if(_.matrixWorldAutoUpdate===!0)_.updateMatrixWorld();if(j.parent===null&&j.matrixWorldAutoUpdate===!0)j.updateMatrixWorld();if(J0.enabled===!0&&J0.isPresenting===!0&&(V===null||V.isCompositing()===!1)){if(J0.cameraAutoUpdate===!0)J0.updateCamera(j);j=J0.getCamera()}if(_.isScene===!0)_.onBeforeRender(I,_,j,f);if(w=i.get(_,C.length),w.init(j),w.state.textureUnits=k.getTextureUnits(),C.push(w),ZJ.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),a0.setFromProjectionMatrix(ZJ,f$,j.reversedDepth),u0=this.localClippingEnabled,b0=W0.init(this.clippingPlanes,u0),z=u.get(_,P.length),z.init(),P.push(z),J0.enabled===!0&&J0.isPresenting===!0){let E0=I.xr.getDepthSensingMesh();if(E0!==null)WQ(E0,j,-1/0,I.sortObjects)}if(WQ(_,j,0,I.sortObjects),z.finish(),I.sortObjects===!0)z.sort(s,N0);if(SJ=J0.enabled===!1||J0.isPresenting===!1||J0.hasDepthSensing()===!1,SJ)$0.addToRenderList(z,_);if(this.info.render.frame++,b0===!0)W0.beginShadows();let h=w.state.shadowsArray;if(R0.render(h,_,j),b0===!0)W0.endShadows();if(this.info.autoReset===!0)this.info.reset();if((x&&V.hasRenderPass())===!1){let{opaque:E0,transmissive:H0}=z;if(w.setupLights(),j.isArrayCamera){let _0=j.cameras;if(H0.length>0)for(let B0=0,f0=_0.length;B0<f0;B0++){let p0=_0[B0];TZ(E0,H0,_,p0)}if(SJ)$0.render(_);for(let B0=0,f0=_0.length;B0<f0;B0++){let p0=_0[B0];CZ(z,_,p0,p0.viewport)}}else{if(H0.length>0)TZ(E0,H0,_,j);if(SJ)$0.render(_);CZ(z,_,j)}}if(f!==null&&c===0)k.updateMultisampleRenderTarget(f),k.updateRenderTargetMipmap(f);if(x)V.end(I);if(_.isScene===!0)_.onAfterRender(I,_,j);if(T.resetDefaultState(),l=-1,b=null,C.pop(),C.length>0){if(w=C[C.length-1],k.setTextureUnits(w.state.textureUnits),b0===!0)W0.setGlobalState(I.clippingPlanes,w.state.camera)}else w=null;if(P.pop(),P.length>0)z=P[P.length-1];else z=null;if(A!==null)A.renderEnd()};function WQ(_,j,g,x){if(_.visible===!1)return;if(_.layers.test(j.layers)){if(_.isGroup)g=_.renderOrder;else if(_.isLOD){if(_.autoUpdate===!0)_.update(j)}else if(_.isLightProbeGrid)w.pushLightProbeGrid(_);else if(_.isLight){if(w.pushLight(_),_.castShadow)w.pushShadow(_)}else if(_.isSprite){if(!_.frustumCulled||a0.intersectsSprite(_)){if(x)x0.setFromMatrixPosition(_.matrixWorld).applyMatrix4(ZJ);let E0=r.update(_),H0=_.material;if(H0.visible)z.push(_,E0,H0,g,x0.z,null)}}else if(_.isMesh||_.isLine||_.isPoints){if(!_.frustumCulled||a0.intersectsObject(_)){let E0=r.update(_),H0=_.material;if(x){if(_.boundingSphere!==void 0){if(_.boundingSphere===null)_.computeBoundingSphere();x0.copy(_.boundingSphere.center)}else{if(E0.boundingSphere===null)E0.computeBoundingSphere();x0.copy(E0.boundingSphere.center)}x0.applyMatrix4(_.matrixWorld).applyMatrix4(ZJ)}if(Array.isArray(H0)){let _0=E0.groups;for(let B0=0,f0=_0.length;B0<f0;B0++){let p0=_0[B0],z0=H0[p0.materialIndex];if(z0&&z0.visible)z.push(_,E0,z0,g,x0.z,p0)}}else if(H0.visible)z.push(_,E0,H0,g,x0.z,null)}}}let G0=_.children;for(let E0=0,H0=G0.length;E0<H0;E0++)WQ(G0[E0],j,g,x)}function CZ(_,j,g,x){let{opaque:h,transmissive:G0,transparent:E0}=_;if(w.setupLightsView(g),b0===!0)W0.setGlobalState(I.clippingPlanes,g);if(x)U0.viewport(p.copy(x));if(h.length>0)p7(h,j,g);if(G0.length>0)p7(G0,j,g);if(E0.length>0)p7(E0,j,g);U0.buffers.depth.setTest(!0),U0.buffers.depth.setMask(!0),U0.buffers.color.setMask(!0),U0.setPolygonOffset(!1)}function TZ(_,j,g,x){if((g.isScene===!0?g.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[x.id]===void 0){let z0=n0.has("EXT_color_buffer_half_float")||n0.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[x.id]=new W9(1,1,{generateMipmaps:!0,type:z0?h9:E9,minFilter:U8,samples:Math.max(4,o0.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:c0.workingColorSpace})}let G0=w.state.transmissionRenderTarget[x.id],E0=x.viewport||p;G0.setSize(E0.z*I.transmissionResolutionScale,E0.w*I.transmissionResolutionScale);let H0=I.getRenderTarget(),_0=I.getActiveCubeFace(),B0=I.getActiveMipmapLevel();if(I.setRenderTarget(G0),I.getClearColor(F0),I0=I.getClearAlpha(),I0<1)I.setClearColor(16777215,0.5);if(I.clear(),SJ)$0.render(g);let f0=I.toneMapping;I.toneMapping=D9;let p0=x.viewport;if(x.viewport!==void 0)x.viewport=void 0;if(w.setupLightsView(x),b0===!0)W0.setGlobalState(I.clippingPlanes,x);if(p7(_,g,x),k.updateMultisampleRenderTarget(G0),k.updateRenderTargetMipmap(G0),n0.has("WEBGL_multisampled_render_to_texture")===!1){let z0=!1;for(let QJ=0,OJ=j.length;QJ<OJ;QJ++){let RJ=j[QJ],{object:KJ,geometry:jJ,material:D0,group:uJ}=RJ;if(D0.side===$9&&KJ.layers.test(x.layers)){let i0=D0.side;D0.side=pJ,D0.needsUpdate=!0,SZ(KJ,g,x,jJ,D0,uJ),D0.side=i0,D0.needsUpdate=!0,z0=!0}}if(z0===!0)k.updateMultisampleRenderTarget(G0),k.updateRenderTargetMipmap(G0)}if(I.setRenderTarget(H0,_0,B0),I.setClearColor(F0,I0),p0!==void 0)x.viewport=p0;I.toneMapping=f0}function p7(_,j,g){let x=j.isScene===!0?j.overrideMaterial:null;for(let h=0,G0=_.length;h<G0;h++){let E0=_[h],{object:H0,geometry:_0,group:B0}=E0,f0=E0.material;if(f0.allowOverride===!0&&x!==null)f0=x;if(H0.layers.test(g.layers))SZ(H0,j,g,_0,f0,B0)}}function SZ(_,j,g,x,h,G0){if(_.onBeforeRender(I,j,g,x,h,G0),_.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),h.onBeforeRender(I,j,g,x,_,G0),h.transparent===!0&&h.side===$9&&h.forceSinglePass===!1)h.side=pJ,h.needsUpdate=!0,I.renderBufferDirect(g,j,x,h,_,G0),h.side=i8,h.needsUpdate=!0,I.renderBufferDirect(g,j,x,h,_,G0),h.side=$9;else I.renderBufferDirect(g,j,x,h,_,G0);_.onAfterRender(I,j,g,x,h,G0)}function m7(_,j,g){if(j.isScene!==!0)j=wJ;let x=w0.get(_),h=w.state.lights,G0=w.state.shadowsArray,E0=h.state.version,H0=e.getParameters(_,h.state,G0,j,g,w.state.lightProbeGridArray),_0=e.getProgramCacheKey(H0),B0=x.programs;x.environment=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?j.environment:null,x.fog=j.fog;let f0=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap;if(x.envMap=O.get(_.envMap||x.environment,f0),x.envMapRotation=x.environment!==null&&_.envMap===null?j.environmentRotation:_.envMapRotation,B0===void 0)_.addEventListener("dispose",y0),B0=new Map,x.programs=B0;let p0=B0.get(_0);if(p0!==void 0){if(x.currentProgram===p0&&x.lightsStateVersion===E0)return yZ(_,H0),p0}else{if(H0.uniforms=e.getUniforms(_),A!==null&&_.isNodeMaterial)A.build(_,g,H0);_.onBeforeCompile(H0,I),p0=e.acquireProgram(H0,_0),B0.set(_0,p0),x.uniforms=H0.uniforms}let z0=x.uniforms;if(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)z0.clippingPlanes=W0.uniform;if(yZ(_,H0),x.needsLights=FY(_),x.lightsStateVersion=E0,x.needsLights)z0.ambientLightColor.value=h.state.ambient,z0.lightProbe.value=h.state.probe,z0.directionalLights.value=h.state.directional,z0.directionalLightShadows.value=h.state.directionalShadow,z0.spotLights.value=h.state.spot,z0.spotLightShadows.value=h.state.spotShadow,z0.rectAreaLights.value=h.state.rectArea,z0.ltc_1.value=h.state.rectAreaLTC1,z0.ltc_2.value=h.state.rectAreaLTC2,z0.pointLights.value=h.state.point,z0.pointLightShadows.value=h.state.pointShadow,z0.hemisphereLights.value=h.state.hemi,z0.directionalShadowMatrix.value=h.state.directionalShadowMatrix,z0.spotLightMatrix.value=h.state.spotLightMatrix,z0.spotLightMap.value=h.state.spotLightMap,z0.pointShadowMatrix.value=h.state.pointShadowMatrix;return x.lightProbeGrid=w.state.lightProbeGridArray.length>0,x.currentProgram=p0,x.uniformsList=null,p0}function jZ(_){if(_.uniformsList===null){let j=_.currentProgram.getUniforms();_.uniformsList=b7.seqWithValue(j.seq,_.uniforms)}return _.uniformsList}function yZ(_,j){let g=w0.get(_);g.outputColorSpace=j.outputColorSpace,g.batching=j.batching,g.batchingColor=j.batchingColor,g.instancing=j.instancing,g.instancingColor=j.instancingColor,g.instancingMorph=j.instancingMorph,g.skinning=j.skinning,g.morphTargets=j.morphTargets,g.morphNormals=j.morphNormals,g.morphColors=j.morphColors,g.morphTargetsCount=j.morphTargetsCount,g.numClippingPlanes=j.numClippingPlanes,g.numIntersection=j.numClipIntersection,g.vertexAlphas=j.vertexAlphas,g.vertexTangents=j.vertexTangents,g.toneMapping=j.toneMapping}function GY(_,j){if(_.length===0)return null;if(_.length===1)return _[0].texture!==null?_[0]:null;L.setFromMatrixPosition(j.matrixWorld);for(let g=0,x=_.length;g<x;g++){let h=_[g];if(h.texture!==null&&h.boundingBox.containsPoint(L))return h}return null}function NY(_,j,g,x,h){if(j.isScene!==!0)j=wJ;k.resetTextureUnits();let G0=j.fog,E0=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?j.environment:null,H0=f===null?I.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:c0.workingColorSpace,_0=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,B0=O.get(x.envMap||E0,_0),f0=x.vertexColors===!0&&!!g.attributes.color&&g.attributes.color.itemSize===4,p0=!!g.attributes.tangent&&(!!x.normalMap||x.anisotropy>0),z0=!!g.morphAttributes.position,QJ=!!g.morphAttributes.normal,OJ=!!g.morphAttributes.color,RJ=D9;if(x.toneMapped){if(f===null||f.isXRRenderTarget===!0)RJ=I.toneMapping}let KJ=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,jJ=KJ!==void 0?KJ.length:0,D0=w0.get(x),uJ=w.state.lights;if(b0===!0){if(u0===!0||_!==b){let UJ=_===b&&x.id===l;W0.setState(x,_,UJ)}}let i0=!1;if(x.version===D0.__version){if(D0.needsLights&&D0.lightsStateVersion!==uJ.state.version)i0=!0;else if(D0.outputColorSpace!==H0)i0=!0;else if(h.isBatchedMesh&&D0.batching===!1)i0=!0;else if(!h.isBatchedMesh&&D0.batching===!0)i0=!0;else if(h.isBatchedMesh&&D0.batchingColor===!0&&h.colorTexture===null)i0=!0;else if(h.isBatchedMesh&&D0.batchingColor===!1&&h.colorTexture!==null)i0=!0;else if(h.isInstancedMesh&&D0.instancing===!1)i0=!0;else if(!h.isInstancedMesh&&D0.instancing===!0)i0=!0;else if(h.isSkinnedMesh&&D0.skinning===!1)i0=!0;else if(!h.isSkinnedMesh&&D0.skinning===!0)i0=!0;else if(h.isInstancedMesh&&D0.instancingColor===!0&&h.instanceColor===null)i0=!0;else if(h.isInstancedMesh&&D0.instancingColor===!1&&h.instanceColor!==null)i0=!0;else if(h.isInstancedMesh&&D0.instancingMorph===!0&&h.morphTexture===null)i0=!0;else if(h.isInstancedMesh&&D0.instancingMorph===!1&&h.morphTexture!==null)i0=!0;else if(D0.envMap!==B0)i0=!0;else if(x.fog===!0&&D0.fog!==G0)i0=!0;else if(D0.numClippingPlanes!==void 0&&(D0.numClippingPlanes!==W0.numPlanes||D0.numIntersection!==W0.numIntersection))i0=!0;else if(D0.vertexAlphas!==f0)i0=!0;else if(D0.vertexTangents!==p0)i0=!0;else if(D0.morphTargets!==z0)i0=!0;else if(D0.morphNormals!==QJ)i0=!0;else if(D0.morphColors!==OJ)i0=!0;else if(D0.toneMapping!==RJ)i0=!0;else if(D0.morphTargetsCount!==jJ)i0=!0;else if(!!D0.lightProbeGrid!==w.state.lightProbeGridArray.length>0)i0=!0}else i0=!0,D0.__version=x.version;let J9=D0.currentProgram;if(i0===!0){if(J9=m7(x,j,h),A&&x.isNodeMaterial)A.onUpdateProgram(x,J9,D0)}let O9=!1,p9=!1,B8=!1,YJ=J9.getUniforms(),MJ=D0.uniforms;if(U0.useProgram(J9.program))O9=!0,p9=!0,B8=!0;if(x.id!==l)l=x.id,p9=!0;if(D0.needsLights){let UJ=GY(w.state.lightProbeGridArray,h);if(D0.lightProbeGrid!==UJ)D0.lightProbeGrid=UJ,p9=!0}if(O9||b!==_){if(U0.buffers.depth.getReversed()&&_.reversedDepth!==!0)_._reversedDepth=!0,_.updateProjectionMatrix();YJ.setValue(S,"projectionMatrix",_.projectionMatrix),YJ.setValue(S,"viewMatrix",_.matrixWorldInverse);let l9=YJ.map.cameraPosition;if(l9!==void 0)l9.setValue(S,WJ.setFromMatrixPosition(_.matrixWorld));if(o0.logarithmicDepthBuffer)YJ.setValue(S,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2));if(x.isMeshPhongMaterial||x.isMeshToonMaterial||x.isMeshLambertMaterial||x.isMeshBasicMaterial||x.isMeshStandardMaterial||x.isShaderMaterial)YJ.setValue(S,"isOrthographic",_.isOrthographicCamera===!0);if(b!==_)b=_,p9=!0,B8=!0}if(D0.needsLights){if(uJ.state.directionalShadowMap.length>0)YJ.setValue(S,"directionalShadowMap",uJ.state.directionalShadowMap,k);if(uJ.state.spotShadowMap.length>0)YJ.setValue(S,"spotShadowMap",uJ.state.spotShadowMap,k);if(uJ.state.pointShadowMap.length>0)YJ.setValue(S,"pointShadowMap",uJ.state.pointShadowMap,k)}if(h.isSkinnedMesh){YJ.setOptional(S,h,"bindMatrix"),YJ.setOptional(S,h,"bindMatrixInverse");let UJ=h.skeleton;if(UJ){if(UJ.boneTexture===null)UJ.computeBoneTexture();YJ.setValue(S,"boneTexture",UJ.boneTexture,k)}}if(h.isBatchedMesh){if(YJ.setOptional(S,h,"batchingTexture"),YJ.setValue(S,"batchingTexture",h._matricesTexture,k),YJ.setOptional(S,h,"batchingIdTexture"),YJ.setValue(S,"batchingIdTexture",h._indirectTexture,k),YJ.setOptional(S,h,"batchingColorTexture"),h._colorsTexture!==null)YJ.setValue(S,"batchingColorTexture",h._colorsTexture,k)}let m9=g.morphAttributes;if(m9.position!==void 0||m9.normal!==void 0||m9.color!==void 0)Y0.update(h,g,J9);if(p9||D0.receiveShadow!==h.receiveShadow)D0.receiveShadow=h.receiveShadow,YJ.setValue(S,"receiveShadow",h.receiveShadow);if((x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial)&&x.envMap===null&&j.environment!==null)MJ.envMapIntensity.value=j.environmentIntensity;if(MJ.dfgLUT!==void 0)MJ.dfgLUT.value=qN();if(p9){if(YJ.setValue(S,"toneMappingExposure",I.toneMappingExposure),D0.needsLights)qY(MJ,B8);if(G0&&x.fog===!0)K0.refreshFogUniforms(MJ,G0);if(K0.refreshMaterialUniforms(MJ,x,d0,r0,w.state.transmissionRenderTarget[_.id]),D0.needsLights&&D0.lightProbeGrid){let UJ=D0.lightProbeGrid;MJ.probesSH.value=UJ.texture,MJ.probesMin.value.copy(UJ.boundingBox.min),MJ.probesMax.value.copy(UJ.boundingBox.max),MJ.probesResolution.value.copy(UJ.resolution)}b7.upload(S,jZ(D0),MJ,k)}if(x.isShaderMaterial&&x.uniformsNeedUpdate===!0)b7.upload(S,jZ(D0),MJ,k),x.uniformsNeedUpdate=!1;if(x.isSpriteMaterial)YJ.setValue(S,"center",h.center);if(YJ.setValue(S,"modelViewMatrix",h.modelViewMatrix),YJ.setValue(S,"normalMatrix",h.normalMatrix),YJ.setValue(S,"modelMatrix",h.matrixWorld),x.uniformsGroups!==void 0){let UJ=x.uniformsGroups;for(let l9=0,z8=UJ.length;l9<z8;l9++){let fZ=UJ[l9];Z0.update(fZ,J9),Z0.bind(fZ,J9)}}return J9}function qY(_,j){_.ambientLightColor.needsUpdate=j,_.lightProbe.needsUpdate=j,_.directionalLights.needsUpdate=j,_.directionalLightShadows.needsUpdate=j,_.pointLights.needsUpdate=j,_.pointLightShadows.needsUpdate=j,_.spotLights.needsUpdate=j,_.spotLightShadows.needsUpdate=j,_.rectAreaLights.needsUpdate=j,_.hemisphereLights.needsUpdate=j}function FY(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return c},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(_,j,g){let x=w0.get(_);if(x.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,x.__autoAllocateDepthBuffer===!1)x.__useRenderToTexture=!1;w0.get(_.texture).__webglTexture=j,w0.get(_.depthTexture).__webglTexture=x.__autoAllocateDepthBuffer?void 0:g,x.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,j){let g=w0.get(_);g.__webglFramebuffer=j,g.__useDefaultFramebuffer=j===void 0};let DY=S.createFramebuffer();this.setRenderTarget=function(_,j=0,g=0){f=_,m=j,c=g;let x=null,h=!1,G0=!1;if(_){let H0=w0.get(_);if(H0.__useDefaultFramebuffer!==void 0){U0.bindFramebuffer(S.FRAMEBUFFER,H0.__webglFramebuffer),p.copy(_.viewport),a.copy(_.scissor),Q0=_.scissorTest,U0.viewport(p),U0.scissor(a),U0.setScissorTest(Q0),l=-1;return}else if(H0.__webglFramebuffer===void 0)k.setupRenderTarget(_);else if(H0.__hasExternalTextures)k.rebindTextures(_,w0.get(_.texture).__webglTexture,w0.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let f0=_.depthTexture;if(H0.__boundDepthTexture!==f0){if(f0!==null&&w0.has(f0)&&(_.width!==f0.image.width||_.height!==f0.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(_)}}let _0=_.texture;if(_0.isData3DTexture||_0.isDataArrayTexture||_0.isCompressedArrayTexture)G0=!0;let B0=w0.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget){if(Array.isArray(B0[j]))x=B0[j][g];else x=B0[j];h=!0}else if(_.samples>0&&k.useMultisampledRTT(_)===!1)x=w0.get(_).__webglMultisampledFramebuffer;else if(Array.isArray(B0))x=B0[g];else x=B0;p.copy(_.viewport),a.copy(_.scissor),Q0=_.scissorTest}else p.copy(V0).multiplyScalar(d0).floor(),a.copy(q0).multiplyScalar(d0).floor(),Q0=P0;if(g!==0)x=DY;if(U0.bindFramebuffer(S.FRAMEBUFFER,x))U0.drawBuffers(_,x);if(U0.viewport(p),U0.scissor(a),U0.setScissorTest(Q0),h){let H0=w0.get(_.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+j,H0.__webglTexture,g)}else if(G0){let H0=j;for(let _0=0;_0<_.textures.length;_0++){let B0=w0.get(_.textures[_0]);S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0+_0,B0.__webglTexture,g,H0)}}else if(_!==null&&g!==0){let H0=w0.get(_.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,H0.__webglTexture,g)}l=-1},this.readRenderTargetPixels=function(_,j,g,x,h,G0,E0,H0=0){if(!(_&&_.isWebGLRenderTarget)){C0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _0=w0.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&E0!==void 0)_0=_0[E0];if(_0){U0.bindFramebuffer(S.FRAMEBUFFER,_0);try{let B0=_.textures[H0],f0=B0.format,p0=B0.type;if(_.textures.length>1)S.readBuffer(S.COLOR_ATTACHMENT0+H0);if(!o0.textureFormatReadable(f0)){C0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!o0.textureTypeReadable(p0)){C0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(j>=0&&j<=_.width-x&&(g>=0&&g<=_.height-h))S.readPixels(j,g,x,h,g0.convert(f0),g0.convert(p0),G0)}finally{let B0=f!==null?w0.get(f).__webglFramebuffer:null;U0.bindFramebuffer(S.FRAMEBUFFER,B0)}}},this.readRenderTargetPixelsAsync=async function(_,j,g,x,h,G0,E0,H0=0){if(!(_&&_.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _0=w0.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&E0!==void 0)_0=_0[E0];if(_0)if(j>=0&&j<=_.width-x&&(g>=0&&g<=_.height-h)){U0.bindFramebuffer(S.FRAMEBUFFER,_0);let B0=_.textures[H0],f0=B0.format,p0=B0.type;if(_.textures.length>1)S.readBuffer(S.COLOR_ATTACHMENT0+H0);if(!o0.textureFormatReadable(f0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!o0.textureTypeReadable(p0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let z0=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,z0),S.bufferData(S.PIXEL_PACK_BUFFER,G0.byteLength,S.STREAM_READ),S.readPixels(j,g,x,h,g0.convert(f0),g0.convert(p0),0);let QJ=f!==null?w0.get(f).__webglFramebuffer:null;U0.bindFramebuffer(S.FRAMEBUFFER,QJ);let OJ=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await DK(S,OJ,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,z0),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,G0),S.deleteBuffer(z0),S.deleteSync(OJ),G0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,j=null,g=0){let x=Math.pow(2,-g),h=Math.floor(_.image.width*x),G0=Math.floor(_.image.height*x),E0=j!==null?j.x:0,H0=j!==null?j.y:0;k.setTexture2D(_,0),S.copyTexSubImage2D(S.TEXTURE_2D,g,0,0,E0,H0,h,G0),U0.unbindTexture()};let EY=S.createFramebuffer(),RY=S.createFramebuffer();if(this.copyTextureToTexture=function(_,j,g=null,x=null,h=0,G0=0){let E0,H0,_0,B0,f0,p0,z0,QJ,OJ,RJ=_.isCompressedTexture?_.mipmaps[G0]:_.image;if(g!==null)E0=g.max.x-g.min.x,H0=g.max.y-g.min.y,_0=g.isBox3?g.max.z-g.min.z:1,B0=g.min.x,f0=g.min.y,p0=g.isBox3?g.min.z:0;else{let MJ=Math.pow(2,-h);if(E0=Math.floor(RJ.width*MJ),H0=Math.floor(RJ.height*MJ),_.isDataArrayTexture)_0=RJ.depth;else if(_.isData3DTexture)_0=Math.floor(RJ.depth*MJ);else _0=1;B0=0,f0=0,p0=0}if(x!==null)z0=x.x,QJ=x.y,OJ=x.z;else z0=0,QJ=0,OJ=0;let KJ=g0.convert(j.format),jJ=g0.convert(j.type),D0;if(j.isData3DTexture)k.setTexture3D(j,0),D0=S.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)k.setTexture2DArray(j,0),D0=S.TEXTURE_2D_ARRAY;else k.setTexture2D(j,0),D0=S.TEXTURE_2D;U0.activeTexture(S.TEXTURE0),U0.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,j.flipY),U0.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),U0.pixelStorei(S.UNPACK_ALIGNMENT,j.unpackAlignment);let uJ=U0.getParameter(S.UNPACK_ROW_LENGTH),i0=U0.getParameter(S.UNPACK_IMAGE_HEIGHT),J9=U0.getParameter(S.UNPACK_SKIP_PIXELS),O9=U0.getParameter(S.UNPACK_SKIP_ROWS),p9=U0.getParameter(S.UNPACK_SKIP_IMAGES);U0.pixelStorei(S.UNPACK_ROW_LENGTH,RJ.width),U0.pixelStorei(S.UNPACK_IMAGE_HEIGHT,RJ.height),U0.pixelStorei(S.UNPACK_SKIP_PIXELS,B0),U0.pixelStorei(S.UNPACK_SKIP_ROWS,f0),U0.pixelStorei(S.UNPACK_SKIP_IMAGES,p0);let B8=_.isDataArrayTexture||_.isData3DTexture,YJ=j.isDataArrayTexture||j.isData3DTexture;if(_.isDepthTexture){let MJ=w0.get(_),m9=w0.get(j),UJ=w0.get(MJ.__renderTarget),l9=w0.get(m9.__renderTarget);U0.bindFramebuffer(S.READ_FRAMEBUFFER,UJ.__webglFramebuffer),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,l9.__webglFramebuffer);for(let z8=0;z8<_0;z8++){if(B8)S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,w0.get(_).__webglTexture,h,p0+z8),S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,w0.get(j).__webglTexture,G0,OJ+z8);S.blitFramebuffer(B0,f0,E0,H0,z0,QJ,E0,H0,S.DEPTH_BUFFER_BIT,S.NEAREST)}U0.bindFramebuffer(S.READ_FRAMEBUFFER,null),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(h!==0||_.isRenderTargetTexture||w0.has(_)){let MJ=w0.get(_),m9=w0.get(j);U0.bindFramebuffer(S.READ_FRAMEBUFFER,EY),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,RY);for(let UJ=0;UJ<_0;UJ++){if(B8)S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,MJ.__webglTexture,h,p0+UJ);else S.framebufferTexture2D(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,MJ.__webglTexture,h);if(YJ)S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,m9.__webglTexture,G0,OJ+UJ);else S.framebufferTexture2D(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_2D,m9.__webglTexture,G0);if(h!==0)S.blitFramebuffer(B0,f0,E0,H0,z0,QJ,E0,H0,S.COLOR_BUFFER_BIT,S.NEAREST);else if(YJ)S.copyTexSubImage3D(D0,G0,z0,QJ,OJ+UJ,B0,f0,E0,H0);else S.copyTexSubImage2D(D0,G0,z0,QJ,B0,f0,E0,H0)}U0.bindFramebuffer(S.READ_FRAMEBUFFER,null),U0.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else if(YJ)if(_.isDataTexture||_.isData3DTexture)S.texSubImage3D(D0,G0,z0,QJ,OJ,E0,H0,_0,KJ,jJ,RJ.data);else if(j.isCompressedArrayTexture)S.compressedTexSubImage3D(D0,G0,z0,QJ,OJ,E0,H0,_0,KJ,RJ.data);else S.texSubImage3D(D0,G0,z0,QJ,OJ,E0,H0,_0,KJ,jJ,RJ);else if(_.isDataTexture)S.texSubImage2D(S.TEXTURE_2D,G0,z0,QJ,E0,H0,KJ,jJ,RJ.data);else if(_.isCompressedTexture)S.compressedTexSubImage2D(S.TEXTURE_2D,G0,z0,QJ,RJ.width,RJ.height,KJ,RJ.data);else S.texSubImage2D(S.TEXTURE_2D,G0,z0,QJ,E0,H0,KJ,jJ,RJ);if(U0.pixelStorei(S.UNPACK_ROW_LENGTH,uJ),U0.pixelStorei(S.UNPACK_IMAGE_HEIGHT,i0),U0.pixelStorei(S.UNPACK_SKIP_PIXELS,J9),U0.pixelStorei(S.UNPACK_SKIP_ROWS,O9),U0.pixelStorei(S.UNPACK_SKIP_IMAGES,p9),G0===0&&j.generateMipmaps)S.generateMipmap(D0);U0.unbindTexture()},this.initRenderTarget=function(_){if(w0.get(_).__webglFramebuffer===void 0)k.setupRenderTarget(_)},this.initTexture=function(_){if(_.isCubeTexture)k.setTextureCube(_,0);else if(_.isData3DTexture)k.setTexture3D(_,0);else if(_.isDataArrayTexture||_.isCompressedArrayTexture)k.setTexture2DArray(_,0);else k.setTexture2D(_,0);U0.unbindTexture()},this.resetState=function(){m=0,c=0,f=null,U0.reset(),T.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return f$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=c0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=c0._getUnpackColorSpace()}}var KY={type:"change"},LZ={type:"start"},XY={type:"end"},e6=new t8,YY=new q9,DN=Math.cos(70*x$.DEG2RAD),IJ=new y,dJ=2*Math.PI,$J={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},VZ=0.000001;class BZ extends i6{constructor(J,Q=null){super(J,Q);if(this.state=$J.NONE,this.target=new y,this.cursor=new y,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:o9.ROTATE,MIDDLE:o9.DOLLY,RIGHT:o9.PAN},this.touches={ONE:a9.ROTATE,TWO:a9.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new y,this._lastQuaternion=new Z9,this._lastTargetPosition=new y,this._quat=new Z9().setFromUnitVectors(J.up,new y(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new f7,this._sphericalDelta=new f7,this._scale=1,this._panOffset=new y,this._rotateStart=new k0,this._rotateEnd=new k0,this._rotateDelta=new k0,this._panStart=new k0,this._panEnd=new k0,this._panDelta=new k0,this._dollyStart=new k0,this._dollyEnd=new k0,this._dollyDelta=new k0,this._dollyDirection=new y,this._mouse=new k0,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RN.bind(this),this._onPointerDown=EN.bind(this),this._onPointerUp=ON.bind(this),this._onContextMenu=kN.bind(this),this._onMouseWheel=VN.bind(this),this._onKeyDown=LN.bind(this),this._onTouchStart=BN.bind(this),this._onTouchMove=zN.bind(this),this._onMouseDown=MN.bind(this),this._onMouseMove=_N.bind(this),this._interceptControlDown=IN.bind(this),this._interceptControlUp=AN.bind(this),this.domElement!==null)this.connect(this.domElement);this.update()}set cursorStyle(J){if(this._cursorStyle=J,J==="grab")this.domElement.style.cursor="grab";else this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(J){super.connect(J),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(J){J.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=J}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null)this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(KY),this.update(),this.state=$J.NONE}pan(J,Q){this._pan(J,Q),this.update()}dollyIn(J){this._dollyIn(J),this.update()}dollyOut(J){this._dollyOut(J),this.update()}rotateLeft(J){this._rotateLeft(J),this.update()}rotateUp(J){this._rotateUp(J),this.update()}update(J=null){let Q=this.object.position;if(IJ.copy(Q).sub(this.target),IJ.applyQuaternion(this._quat),this._spherical.setFromVector3(IJ),this.autoRotate&&this.state===$J.NONE)this._rotateLeft(this._getAutoRotationAngle(J));if(this.enableDamping)this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor;else this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi;let $=this.minAzimuthAngle,Z=this.maxAzimuthAngle;if(isFinite($)&&isFinite(Z)){if($<-Math.PI)$+=dJ;else if($>Math.PI)$-=dJ;if(Z<-Math.PI)Z+=dJ;else if(Z>Math.PI)Z-=dJ;if($<=Z)this._spherical.theta=Math.max($,Math.min(Z,this._spherical.theta));else this._spherical.theta=this._spherical.theta>($+Z)/2?Math.max($,this._spherical.theta):Math.min(Z,this._spherical.theta)}if(this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0)this.target.addScaledVector(this._panOffset,this.dampingFactor);else this.target.add(this._panOffset);this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let W=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let K=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),W=K!=this._spherical.radius}if(IJ.setFromSpherical(this._spherical),IJ.applyQuaternion(this._quatInverse),Q.copy(this.target).add(IJ),this.object.lookAt(this.target),this.enableDamping===!0)this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor);else this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0);if(this.zoomToCursor&&this._performCursorZoom){let K=null;if(this.object.isPerspectiveCamera){let Y=IJ.length();K=this._clampDistance(Y*this._scale);let X=Y-K;this.object.position.addScaledVector(this._dollyDirection,X),this.object.updateMatrixWorld(),W=!!X}else if(this.object.isOrthographicCamera){let Y=new y(this._mouse.x,this._mouse.y,0);Y.unproject(this.object);let X=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),W=X!==this.object.zoom;let H=new y(this._mouse.x,this._mouse.y,0);H.unproject(this.object),this.object.position.sub(H).add(Y),this.object.updateMatrixWorld(),K=IJ.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;if(K!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(K).add(this.object.position);else if(e6.origin.copy(this.object.position),e6.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(e6.direction))<DN)this.object.lookAt(this.target);else YY.setFromNormalAndCoplanarPoint(this.object.up,this.target),e6.intersectPlane(YY,this.target)}else if(this.object.isOrthographicCamera){let K=this.object.zoom;if(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),K!==this.object.zoom)this.object.updateProjectionMatrix(),W=!0}if(this._scale=1,this._performCursorZoom=!1,W||this._lastPosition.distanceToSquared(this.object.position)>VZ||8*(1-this._lastQuaternion.dot(this.object.quaternion))>VZ||this._lastTargetPosition.distanceToSquared(this.target)>VZ)return this.dispatchEvent(KY),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0;return!1}_getAutoRotationAngle(J){if(J!==null)return dJ/60*this.autoRotateSpeed*J;else return dJ/60/60*this.autoRotateSpeed}_getZoomScale(J){let Q=Math.abs(J*0.01);return Math.pow(0.95,this.zoomSpeed*Q)}_rotateLeft(J){this._sphericalDelta.theta-=J}_rotateUp(J){this._sphericalDelta.phi-=J}_panLeft(J,Q){IJ.setFromMatrixColumn(Q,0),IJ.multiplyScalar(-J),this._panOffset.add(IJ)}_panUp(J,Q){if(this.screenSpacePanning===!0)IJ.setFromMatrixColumn(Q,1);else IJ.setFromMatrixColumn(Q,0),IJ.crossVectors(this.object.up,IJ);IJ.multiplyScalar(J),this._panOffset.add(IJ)}_pan(J,Q){let $=this.domElement;if(this.object.isPerspectiveCamera){let Z=this.object.position;IJ.copy(Z).sub(this.target);let W=IJ.length();W*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*J*W/$.clientHeight,this.object.matrix),this._panUp(2*Q*W/$.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera)this._panLeft(J*(this.object.right-this.object.left)/this.object.zoom/$.clientWidth,this.object.matrix),this._panUp(Q*(this.object.top-this.object.bottom)/this.object.zoom/$.clientHeight,this.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1}_dollyOut(J){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=J;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_dollyIn(J){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=J;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_updateZoomParameters(J,Q){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let $=this.domElement.getBoundingClientRect(),Z=J-$.left,W=Q-$.top,K=$.width,Y=$.height;this._mouse.x=Z/K*2-1,this._mouse.y=-(W/Y)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(J){return Math.max(this.minDistance,Math.min(this.maxDistance,J))}_handleMouseDownRotate(J){this._rotateStart.set(J.clientX,J.clientY)}_handleMouseDownDolly(J){this._updateZoomParameters(J.clientX,J.clientX),this._dollyStart.set(J.clientX,J.clientY)}_handleMouseDownPan(J){this._panStart.set(J.clientX,J.clientY)}_handleMouseMoveRotate(J){this._rotateEnd.set(J.clientX,J.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let Q=this.domElement;this._rotateLeft(dJ*this._rotateDelta.x/Q.clientHeight),this._rotateUp(dJ*this._rotateDelta.y/Q.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(J){if(this._dollyEnd.set(J.clientX,J.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0)this._dollyOut(this._getZoomScale(this._dollyDelta.y));else if(this._dollyDelta.y<0)this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(J){this._panEnd.set(J.clientX,J.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(J){if(this._updateZoomParameters(J.clientX,J.clientY),J.deltaY<0)this._dollyIn(this._getZoomScale(J.deltaY));else if(J.deltaY>0)this._dollyOut(this._getZoomScale(J.deltaY));this.update()}_handleKeyDown(J){let Q=!1;switch(J.code){case this.keys.UP:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateUp(dJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,this.keyPanSpeed);Q=!0;break;case this.keys.BOTTOM:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateUp(-dJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,-this.keyPanSpeed);Q=!0;break;case this.keys.LEFT:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateLeft(dJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(this.keyPanSpeed,0);Q=!0;break;case this.keys.RIGHT:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate)this._rotateLeft(-dJ*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(-this.keyPanSpeed,0);Q=!0;break}if(Q)J.preventDefault(),this.update()}_handleTouchStartRotate(J){if(this._pointers.length===1)this._rotateStart.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._rotateStart.set($,Z)}}_handleTouchStartPan(J){if(this._pointers.length===1)this._panStart.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._panStart.set($,Z)}}_handleTouchStartDolly(J){let Q=this._getSecondPointerPosition(J),$=J.pageX-Q.x,Z=J.pageY-Q.y,W=Math.sqrt($*$+Z*Z);this._dollyStart.set(0,W)}_handleTouchStartDollyPan(J){if(this.enableZoom)this._handleTouchStartDolly(J);if(this.enablePan)this._handleTouchStartPan(J)}_handleTouchStartDollyRotate(J){if(this.enableZoom)this._handleTouchStartDolly(J);if(this.enableRotate)this._handleTouchStartRotate(J)}_handleTouchMoveRotate(J){if(this._pointers.length==1)this._rotateEnd.set(J.pageX,J.pageY);else{let $=this._getSecondPointerPosition(J),Z=0.5*(J.pageX+$.x),W=0.5*(J.pageY+$.y);this._rotateEnd.set(Z,W)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let Q=this.domElement;this._rotateLeft(dJ*this._rotateDelta.x/Q.clientHeight),this._rotateUp(dJ*this._rotateDelta.y/Q.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(J){if(this._pointers.length===1)this._panEnd.set(J.pageX,J.pageY);else{let Q=this._getSecondPointerPosition(J),$=0.5*(J.pageX+Q.x),Z=0.5*(J.pageY+Q.y);this._panEnd.set($,Z)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(J){let Q=this._getSecondPointerPosition(J),$=J.pageX-Q.x,Z=J.pageY-Q.y,W=Math.sqrt($*$+Z*Z);this._dollyEnd.set(0,W),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let K=(J.pageX+Q.x)*0.5,Y=(J.pageY+Q.y)*0.5;this._updateZoomParameters(K,Y)}_handleTouchMoveDollyPan(J){if(this.enableZoom)this._handleTouchMoveDolly(J);if(this.enablePan)this._handleTouchMovePan(J)}_handleTouchMoveDollyRotate(J){if(this.enableZoom)this._handleTouchMoveDolly(J);if(this.enableRotate)this._handleTouchMoveRotate(J)}_addPointer(J){this._pointers.push(J.pointerId)}_removePointer(J){delete this._pointerPositions[J.pointerId];for(let Q=0;Q<this._pointers.length;Q++)if(this._pointers[Q]==J.pointerId){this._pointers.splice(Q,1);return}}_isTrackingPointer(J){for(let Q=0;Q<this._pointers.length;Q++)if(this._pointers[Q]==J.pointerId)return!0;return!1}_trackPointer(J){let Q=this._pointerPositions[J.pointerId];if(Q===void 0)Q=new k0,this._pointerPositions[J.pointerId]=Q;Q.set(J.pageX,J.pageY)}_getSecondPointerPosition(J){let Q=J.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[Q]}_customWheelEvent(J){let Q=J.deltaMode,$={clientX:J.clientX,clientY:J.clientY,deltaY:J.deltaY};switch(Q){case 1:$.deltaY*=16;break;case 2:$.deltaY*=100;break}if(J.ctrlKey&&!this._controlActive)$.deltaY*=10;return $}}function EN(J){if(this.enabled===!1)return;if(this._pointers.length===0)this.domElement.setPointerCapture(J.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp);if(this._isTrackingPointer(J))return;if(this._addPointer(J),J.pointerType==="touch")this._onTouchStart(J);else this._onMouseDown(J);if(this._cursorStyle==="grab")this.domElement.style.cursor="grabbing"}function RN(J){if(this.enabled===!1)return;if(J.pointerType==="touch")this._onTouchMove(J);else this._onMouseMove(J)}function ON(J){switch(this._removePointer(J),this._pointers.length){case 0:if(this.domElement.releasePointerCapture(J.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(XY),this.state=$J.NONE,this._cursorStyle==="grab")this.domElement.style.cursor="grab";break;case 1:let Q=this._pointers[0],$=this._pointerPositions[Q];this._onTouchStart({pointerId:Q,pageX:$.x,pageY:$.y});break}}function MN(J){let Q;switch(J.button){case 0:Q=this.mouseButtons.LEFT;break;case 1:Q=this.mouseButtons.MIDDLE;break;case 2:Q=this.mouseButtons.RIGHT;break;default:Q=-1}switch(Q){case o9.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(J),this.state=$J.DOLLY;break;case o9.ROTATE:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(J),this.state=$J.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(J),this.state=$J.ROTATE}break;case o9.PAN:if(J.ctrlKey||J.metaKey||J.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(J),this.state=$J.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(J),this.state=$J.PAN}break;default:this.state=$J.NONE}if(this.state!==$J.NONE)this.dispatchEvent(LZ)}function _N(J){switch(this.state){case $J.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(J);break;case $J.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(J);break;case $J.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(J);break}}function VN(J){if(this.enabled===!1||this.enableZoom===!1||this.state!==$J.NONE)return;J.preventDefault(),this.dispatchEvent(LZ),this._handleMouseWheel(this._customWheelEvent(J)),this.dispatchEvent(XY)}function LN(J){if(this.enabled===!1)return;this._handleKeyDown(J)}function BN(J){switch(this._trackPointer(J),this._pointers.length){case 1:switch(this.touches.ONE){case a9.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(J),this.state=$J.TOUCH_ROTATE;break;case a9.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(J),this.state=$J.TOUCH_PAN;break;default:this.state=$J.NONE}break;case 2:switch(this.touches.TWO){case a9.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(J),this.state=$J.TOUCH_DOLLY_PAN;break;case a9.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(J),this.state=$J.TOUCH_DOLLY_ROTATE;break;default:this.state=$J.NONE}break;default:this.state=$J.NONE}if(this.state!==$J.NONE)this.dispatchEvent(LZ)}function zN(J){switch(this._trackPointer(J),this.state){case $J.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(J),this.update();break;case $J.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(J),this.update();break;case $J.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(J),this.update();break;case $J.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(J),this.update();break;default:this.state=$J.NONE}}function kN(J){if(this.enabled===!1)return;J.preventDefault()}function IN(J){if(J.key==="Control")this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function AN(J){if(J.key==="Control")this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}var g9=1,PN=0.06,tJ=g9+PN,QQ=8*tJ/2,JQ=0.13,zZ={roman:10692152,spartan:12870189,hun:14263320,gaul:4094522,egyptian:2793880,viking:2838401,persian:5978766,teuton:7238520};function V8(J,Q){return[J*tJ-QQ+tJ/2,(7-Q)*tJ-QQ+tJ/2]}class kZ{container;opts;scene=new y6;renderer;camera;controls;texLoader=new m6;texCache=new Map;props=new iJ;hiGroup=new iJ;unitG=new iJ;fxG=new iJ;units=new Map;dmg=[];raycaster=new n6;pickPlane;clickCb;clock=new s6;downXY={x:0,y:0};constructor(J,Q){this.container=J;this.opts=Q;let $=J.clientWidth||640,Z=J.clientHeight||520;this.renderer=new _Z({antialias:!0}),this.renderer.setSize($,Z),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_6,this.renderer.outputColorSpace=B7,J.appendChild(this.renderer.domElement),this.scene.background=new m0(1906707),this.scene.fog=new A7(1906707,16,30),this.camera=new bJ(42,$/Z,0.1,100),this.camera.position.set(0,9.5,9.2),this.controls=new BZ(this.camera,this.renderer.domElement),this.controls.target.set(0,0,-0.3),this.controls.enableDamping=!0,this.controls.dampingFactor=0.08,this.controls.minDistance=7,this.controls.maxDistance=20,this.controls.maxPolarAngle=Math.PI*0.46,this.controls.enablePan=!1,this.controls.update(),this.scene.add(new c6(12167562,0.7)),this.scene.add(new l6(16773584,2760984,0.5));let W=new u6(16773336,1.5);W.position.set(-6,12,6),W.castShadow=!0,W.shadow.mapSize.set(2048,2048);let K=8;Object.assign(W.shadow.camera,{left:-K,right:K,top:K,bottom:-K,near:1,far:40}),this.scene.add(W);let Y=new FJ(new b9(80,80),new rJ({color:2760984,roughness:1}));Y.rotation.x=-Math.PI/2,Y.position.y=-0.2,Y.receiveShadow=!0,this.scene.add(Y),this.scene.add(this.props,this.unitG,this.hiGroup,this.fxG),this.pickPlane=new FJ(new b9(8*tJ,8*tJ),new J8({visible:!1})),this.pickPlane.rotation.x=-Math.PI/2,this.pickPlane.position.y=0.14,this.scene.add(this.pickPlane);let X=this.renderer.domElement;X.addEventListener("pointerdown",(H)=>{this.downXY={x:H.clientX,y:H.clientY}}),X.addEventListener("pointerup",(H)=>{if(Math.hypot(H.clientX-this.downXY.x,H.clientY-this.downXY.y)<5)this.handleClick(H)}),window.addEventListener("resize",()=>this.onResize()),this.animate()}onClick(J){this.clickCb=J}onResize(){let J=this.container.clientWidth,Q=this.container.clientHeight;if(!J||!Q)return;this.renderer.setSize(J,Q),this.camera.aspect=J/Q,this.camera.updateProjectionMatrix()}tex(J){let Q=this.texCache.get(J);if(!Q)Q=this.texLoader.load(J),Q.colorSpace=B7,Q.anisotropy=4,this.texCache.set(J,Q);return Q}tribeOf(J){return J===0?this.opts.p0tribe:this.opts.p1tribe}handleClick(J){if(!this.clickCb)return;let Q=this.renderer.domElement.getBoundingClientRect(),$=new k0((J.clientX-Q.left)/Q.width*2-1,-((J.clientY-Q.top)/Q.height)*2+1);this.raycaster.setFromCamera($,this.camera);let Z=this.raycaster.intersectObject(this.pickPlane)[0];if(!Z)return;let W=Math.round((Z.point.x+QQ-tJ/2)/tJ),K=7-Math.round((Z.point.z+QQ-tJ/2)/tJ);if(W>=0&&W<8&&K>=0&&K<8)this.clickCb([W,K])}standee(J){let Q=this.tribeOf(J.owner),$=n7[`${Q}_${J.arch}`],Z=new iJ,W=0.74,K=0.92,Y=new FJ(new lJ(0.74,0.92,0.05),[0,1,2,3,4,5].map((U)=>new rJ({color:U===4?16777215:zZ[Q],roughness:0.6,map:U===4&&$?this.tex($):null})));Y.position.y=0.54,Y.castShadow=!0,Z.add(Y);let X=new FJ(new lJ(0.82,1,0.04),new rJ({color:zZ[Q],roughness:0.5,metalness:0.2}));X.position.set(0,0.54,-0.03),X.castShadow=!0,Z.add(X);let H=new FJ(new e8(0.34,0.4,0.12,16),new rJ({color:zZ[Q],roughness:0.4,metalness:0.3}));return H.position.y=0.06,H.castShadow=!0,H.receiveShadow=!0,Z.add(H),{group:Z,card:Y}}wagon(){let J=new iJ,Q=new FJ(new lJ(0.55,0.4,0.7),new rJ({color:7031333,roughness:0.9}));Q.position.y=0.3,Q.castShadow=!0,J.add(Q);for(let $ of[-0.32,0.32])for(let Z of[-0.3,0.3]){let W=new FJ(new e8(0.16,0.16,0.06,14),new rJ({color:2759952,roughness:0.8}));W.rotation.z=Math.PI/2,W.position.set($,0.16,Z),W.castShadow=!0,J.add(W)}return J}buildProps(J){this.props.clear();let Q=new lJ(g9,0.25,g9);for(let $=0;$<8;$++)for(let Z=0;Z<8;Z++){let W=Z<J.stakes[$]?0:1,K=new FJ(Q,new rJ({color:W===0?7306554:5595962,roughness:0.95})),[Y,X]=V8($,Z);if(K.position.set(Y,0,X),K.receiveShadow=!0,this.props.add(K),Z===J.stakes[$]-1){let H=new FJ(new lJ(g9,0.04,0.08),new rJ({color:14401642,emissive:3813136,roughness:0.5}));H.position.set(Y,0.15,X-tJ/2),this.props.add(H)}}for(let $=0;$<2;$++)for(let Z of J.wagons[$]){if(Z.hp<=0)continue;let W=this.wagon(),[K,Y]=V8(Z.col,Z.row);W.position.set(K,JQ,Y),this.props.add(W)}for(let[$,Z]of J.fields.entries()){let[W,K]=$.split(",").map(Number),Y=new FJ(new lJ(0.7,0.06,0.7),new rJ({color:Z.type==="crop"?13148730:8219466,roughness:1})),[X,H]=V8(W,K);Y.position.set(X,0.15,H),Y.receiveShadow=!0,this.props.add(Y)}for(let[$]of J.palisades.entries()){let Z=J.stakes[$],W=new FJ(new lJ(g9,0.5,0.12),new rJ({color:5915430,roughness:0.9})),[K,Y]=V8($,Z-1);W.position.set(K,0.32,Y-tJ/2),W.castShadow=!0,this.props.add(W)}}update(J){this.buildProps(J);let Q=new Set;for(let $ of J.units.values()){if(!$.pos)continue;Q.add($.uid);let[Z,W]=V8($.pos[0],$.pos[1]),K=this.units.get($.uid);if(!K){let{group:Y,card:X}=this.standee($);Y.position.set(Z,JQ,W),this.unitG.add(Y),K={group:Y,card:X,hp:$.hp,max:$.max_hp,tile:[$.pos[0],$.pos[1]],bob:Math.random()*6.28},this.units.set($.uid,K)}else{if(K.tile[0]!==$.pos[0]||K.tile[1]!==$.pos[1])K.tween={fx:K.group.position.x,fz:K.group.position.z,tx:Z,tz:W,t0:this.clock.elapsedTime,dur:0.34},K.tile=[$.pos[0],$.pos[1]];if($.hp<K.hp)this.spawnDamage(Z,W,K.hp-$.hp),this.flash(K);K.hp=$.hp}}for(let[$,Z]of[...this.units])if(!Q.has($)&&!Z.dying)Z.dying={t0:this.clock.elapsedTime}}setHighlights(J){this.hiGroup.clear();let Q=(Z,W,K)=>{for(let Y of Z??[]){let X=new FJ(new b9(g9*0.92,g9*0.92),new J8({color:W,transparent:!0,opacity:K,depthWrite:!1}));X.rotation.x=-Math.PI/2;let[H,U]=V8(Y[0],Y[1]);X.position.set(H,0.145,U),this.hiGroup.add(X)}},$=(Z,W,K=0.42,Y=0.5)=>{for(let X of Z??[]){let H=new FJ(new T7(g9*K,g9*Y,28),new J8({color:W,transparent:!0,opacity:0.95,depthWrite:!1,side:$9}));H.rotation.x=-Math.PI/2;let[U,q]=V8(X[0],X[1]);H.position.set(U,0.16,q),this.hiGroup.add(H)}};if(Q(J.valid,13214247,0.18),Q(J.move,7315274,0.5),Q(J.stage,13214247,0.55),$(J.melee,12603466),$(J.shoot,14257978),$(J.charge,10120384),J.selected)$([J.selected],14401642,0.5,0.6)}spawnDamage(J,Q,$){let Z=document.createElement("canvas");Z.width=128,Z.height=64;let W=Z.getContext("2d");W.font="bold 48px Cinzel, serif",W.textAlign="center",W.textBaseline="middle",W.fillStyle="#1a1408",W.fillText(`-${$}`,65,34),W.fillStyle="#ff5a4a",W.fillText(`-${$}`,64,32);let K=new b6(Z),Y=new x6(new w7({map:K,transparent:!0,depthTest:!1}));Y.scale.set(0.8,0.4,1),Y.position.set(J,1.2,Q),this.fxG.add(Y),this.dmg.push({spr:Y,t0:this.clock.elapsedTime})}flash(J){for(let Q of J.card.material)Q.emissive=new m0(16724000),Q.__flash=1}animate=()=>{requestAnimationFrame(this.animate);let J=this.clock.getDelta(),Q=this.clock.elapsedTime;this.controls.update();for(let[$,Z]of[...this.units]){if(Z.dying){let K=(Q-Z.dying.t0)/0.5;if(Z.group.position.y=JQ-K*0.6,Z.group.scale.setScalar(Math.max(0.01,1-K)),Z.group.traverse((Y)=>{let X=Y.material;if(X)X.transparent=!0,X.opacity=Math.max(0,1-K)}),K>=1)this.unitG.remove(Z.group),this.units.delete($);continue}let W=JQ;if(Z.tween){let K=Math.min(1,(Q-Z.tween.t0)/Z.tween.dur),Y=K<0.5?2*K*K:1-(-2*K+2)**2/2;if(Z.group.position.x=Z.tween.fx+(Z.tween.tx-Z.tween.fx)*Y,Z.group.position.z=Z.tween.fz+(Z.tween.tz-Z.tween.fz)*Y,W+=Math.sin(K*Math.PI)*0.28,K>=1)Z.tween=void 0}Z.group.position.y=W+Math.sin(Q*2+Z.bob)*0.02;for(let K of Z.card.material)if(K.__flash>0)K.__flash=Math.max(0,K.__flash-J*3),K.emissive.setScalar(K.__flash*0.6),K.emissive.r=K.__flash,K.emissive.g=K.__flash*0.2,K.emissive.b=K.__flash*0.12}for(let $ of[...this.dmg]){let Z=(Q-$.t0)/1;if($.spr.position.y=1.2+Z*0.8,$.spr.material.opacity=1-Z,Z>=1)this.fxG.remove($.spr),this.dmg.splice(this.dmg.indexOf($),1)}this.renderer.render(this.scene,this.camera)}}var TJ=(J)=>`${J[0]},${J[1]}`,g7=(J)=>J[0].toUpperCase()+J.slice(1),IZ=(J,Q)=>({2:Q.UNLOCK_3RD,3:Q.UNLOCK_4TH,4:Q.UNLOCK_5TH})[J];class $Q{root;g;policies;cfg;banner="";log=[];mBuild=[];mPlan;mMode={kind:null};cOrders=new Map;cSel=null;onChange=null;board3d;shell;get use3d(){return this.cfg.view!=="2d"}constructor(J){this.root=J}get phaseKind(){if(this.banner.includes("Muster"))return"muster";if(this.banner.includes("Clash"))return"clash";if(this.banner.includes("Intervention"))return"iv";return"other"}get round(){return this.g.round}get bannerText(){return this.banner}get musterModeKind(){return this.mMode.kind}get stagedRecruitCount(){return this.mPlan?.recruits.length??0}get stagedBuildCount(){return this.mBuild?.length??0}get selectedUid(){return this.cSel}get orderCount(){return this.cOrders.size}isHuman(J){return this.cfg.mode==="hotseat"||J===this.cfg.humanSeat}tribe(J){return J===0?this.cfg.p0tribe:this.cfg.p1tribe}human(J){return this.policies[J]}start(J){this.init(J),this.g.setup(),this.begin()}startScenario(J,Q){this.init(J),this.g.setup(),Q(this.g),this.begin()}init(J){this.cfg=J,this.policies=[0,1].map((Q)=>this.isHuman(Q)?new HQ(J.mode==="hotseat"?`Player ${Q+1}`:"You"):mZ(J.botName)),this.policies.forEach((Q,$)=>Q.reset(J.seed,$)),this.g=new M9(this.policies,J.seed)}begin(){this.log=[`Round 1 — ${g7(this.tribe(0))} vs ${g7(this.tribe(1))}.`],this.mountTooltip(),this.loop()}get stagedFieldCount(){return this.mBuild?.filter((J)=>J[0]==="field").length??0}get hasAttackOrder(){for(let J of this.cOrders.values())if(J[0]==="MELEE"||J[0]==="CHARGE"||J[0]==="SHOOT")return!0;return!1}tip;mountTooltip(){if(this.tip)return;this.tip=document.createElement("div"),this.tip.className="utip",this.tip.style.display="none",document.body.appendChild(this.tip),this.root.addEventListener("mousemove",(J)=>{let Q=J.target.closest?.(".cell[data-uid]");if(!Q){this.tip.style.display="none";return}let $=this.g.units.get(Number(Q.dataset.uid));if(!$){this.tip.style.display="none";return}this.tip.innerHTML=this.unitTooltip($),this.tip.style.display="block",this.tip.style.left=Math.min(J.clientX+14,window.innerWidth-210)+"px",this.tip.style.top=J.clientY+14+"px"}),this.root.addEventListener("mouseleave",()=>{if(this.tip)this.tip.style.display="none"})}unitTooltip(J){let Q={spear:"Cavalry",cav:"Archers",archer:"Spearmen"}[J.arch],$=J.rmin===J.rmax?`${J.rmax}`:`${J.rmin}–${J.rmax}`,Z=[J.exhausted?"∅ exhausted":"",J.braced?"⛨ braced":"",J.tier2?"★★ veteran":J.tier1?"★ promoted":""].filter(Boolean).join(" · ");return`<b>${H9[J.arch]}</b>
      <span class="utg">Atk ${J.base_atk}${J.base_guard?` · Guard ${J.base_guard}`:""} · HP ${J.hp}/${J.max_hp} · Move ${J.mv} · Range ${$}</span>
      ${Q?`<span class="utb">Beats ${Q}</span>`:""}
      ${J.xp?`<span class="utg">XP ${J.xp}</span>`:""}
      ${Z?`<span class="uts">${Z}</span>`:""}`}async loop(){try{for(;;)await this.playRoundInteractive()}catch(J){if(J instanceof gJ)this.winScreen(J.winner,J.wtype);else throw J}}async playRoundInteractive(){let J=this.g,Q=J.C;J.cap_dmg=[0,0],J.wagon_dmg_round=[0,0],J.rows_lost_round=[0,0],J.rows_taken_round=[0,0],J.unit_dmg_round=[0,0];for(let X of[J.komi,1-J.komi]){if(this.isHuman(X))await this.humanMuster(X);J.musterPlayer(X)}for(let X of J.units.values())X.face_down=!1;J.wards=[];try{await this.doWindow(1),await this.doPulse(1),await this.doWindow(2),await this.doPulse(2),await this.doWindow(3)}catch(X){if(!(X instanceof $7))throw X}J.wards=[],J.frontier();let[$,Z]=J.rows_lost_round;if($!==Z)J.komi=$>Z?0:1;let W=this.cfg.mode==="bot"?this.cfg.humanSeat:0,K=1-W,Y=[];if(J.rows_taken_round[W])Y.push(`you pushed ${J.rows_taken_round[W]} row(s) forward`);if(J.rows_lost_round[W])Y.push(`you lost ${J.rows_lost_round[W]} row(s)`);if(J.wagon_dmg_round[W])Y.push("\uD83D\uDCA5 you breached an enemy wagon!");if(J.wagon_dmg_round[K])Y.push("⚠ the enemy breached your wagon!");if(this.log.push(`Round ${J.round} frontier: ${Y.length?Y.join(", "):"the lines held — no ground changed."}`),J.round>=Q.GOLDEN_GOAL_ROUND){let X=J.rows_taken_round[0]>0||J.wagon_dmg_round[0]>0,H=J.rows_taken_round[1]>0||J.wagon_dmg_round[1]>0;if(X||H){let U;if(X&&H)if(J.rows_taken_round[0]!==J.rows_taken_round[1])U=J.rows_taken_round[0]>J.rows_taken_round[1]?0:1;else if(J.wagon_dmg_round[0]!==J.wagon_dmg_round[1])U=J.wagon_dmg_round[0]>J.wagon_dmg_round[1]?0:1;else U=J.komi;else U=X?0:1;throw new gJ(U,"golden-goal")}}for(let X=0;X<2;X++)J.res[X].tribute+=Q.TRIBUTE_PER_ROW*J.rows_lost_round[X];if(J.round===Q.CARAVAN_ROUND_1||J.round===Q.CARAVAN_ROUND_2)J.caravan(J.round===Q.CARAVAN_ROUND_1?1:2);if(J.round===1){let[X,H]=J.rows_taken_round;if(X!==H)J.r1_winner=X>H?0:1;else if(J.unit_dmg_round[0]!==J.unit_dmg_round[1]&&(!Q.R1_REQUIRE_ENGAGE||Math.min(...J.unit_dmg_round)>=1))J.r1_winner=J.unit_dmg_round[0]>J.unit_dmg_round[1]?0:1}if(J.lead_trace.push(J.leadHolder()),J.round>=Q.HARD_STOP_ROUND){let X=J.wagonsAlive(0),H=J.wagonsAlive(1);if(X!==H)throw new gJ(X>H?0:1,"ladder");let U=J.ownedRows(0),q=J.ownedRows(1);if(U!==q)throw new gJ(U>q?0:1,"ladder");throw new gJ(J.komi,"ladder")}J.updateEntrench(),J.round++,this.policies.forEach((X)=>X.clearPhase?.())}async doWindow(J){for(let Q of[this.g.komi,1-this.g.komi])if(this.isHuman(Q))await this.humanIntervention(Q,J);this.g.interventionWindow(J),this.policies.forEach((Q)=>{let $=Q;if($.pendingIntervention)$.pendingIntervention={}})}async doPulse(J){for(let $ of[0,1])if(this.isHuman($))await this.humanClash($,J);this.g.runPulse(J);let Q=[...this.g.units.values()].filter(($)=>$.pos===null&&$.wounded_round===this.g.round);if(Q.length)this.log.push(`Pulse ${J}: ${Q.length} unit(s) fell.`);this.render(),await this.pause(550)}pause(J){return new Promise((Q)=>setTimeout(Q,J))}humanMuster(J){return this.banner=`${this.seatName(J)} — Muster`,this.mBuild=[],this.mPlan={unlocks:[],recruits:[],repositions:[],rush:[],tribute_spend:0},this.mMode={kind:null},new Promise((Q)=>{let $=()=>{this.human(J).pendingBuild=this.mBuild,this.human(J).pendingReinforce=this.mPlan,Q()};this.musterDone=$,this.musterPlayer=J,this.render()})}musterDone=null;musterPlayer=0;musterBudget(J){let Q=this.g,$=Q.C,[Z,W]=Q.computeHarvest(J),K=0;for(let H of Q.onBoard(J))K+=$.UPKEEP_CROP+(Q.beyondOwn(H)?$.SUPPLY_STRAIN_CROP:0);let Y=Q.res[J].supply+Z-this.spentSupply(J),X=Q.res[J].crop+W-K;return{supply:Y,crop:X}}spentSupply(J){let Q=this.g,$=Q.C,Z=0;for(let K of this.mBuild)Z+=K[0]==="field"?$.FIELD_COST:$.PALISADE_COST;for(let K of this.mPlan.unlocks){let Y=Q.unlocked[J].size+this.mPlan.unlocks.indexOf(K);Z+=IZ(Y,$)??0}let W=0;for(let[K]of this.mPlan.recruits)Z+=Q.costs[K]+$.COPY_SURCHARGE*(Q.copies[K]+W++);return Z-this.mPlan.tribute_spend}onCell(J,Q){let $=this.g,Z=this.banner.includes("Muster")?this.musterPlayer:-1;if(Z>=0)return this.musterCell(Z,J,Q);return this.clashCell(J,Q)}musterCell(J,Q,$){let Z=this.g,W=Z.C,K=this.mMode;if(K.kind==="palisade"){this.musterPalisade(Q[0]);return}if(K.kind==="recruit"&&K.arch){if(Z.heartlandRows(J).includes(Q[1])&&!Z.occupied(Q)&&!this.staged(Q)&&this.mPlan.recruits.length<W.DEPLOY_MAX+Z.extra_deploy[J])this.mPlan.recruits.push([K.arch,Q])}else if(K.kind==="field"&&K.ftype){if(Z.territoryOf(Q)===J&&!Z.fields.has(TJ(Q))&&!Z.wagon_at.has(TJ(Q))&&!this.staged(Q)&&this.mBuild.filter((Y)=>Y[0]==="field"||Y[0]==="palisade").length<W.BUILD_ACTIONS)this.mBuild.push(["field",Q,K.ftype])}else if(K.kind==="reposition"){if(K.uid===void 0){if($!==void 0&&Z.units.get($).owner===J&&Z.units.get($).pos)K.uid=$}else if(Z.territoryOf(Q)===J&&!Z.occupied(Q)&&!this.staged(Q)&&this.mPlan.repositions.length<W.REPOSITION_MAX)this.mPlan.repositions.push([K.uid,Q]),K.uid=void 0}this.render()}staged(J){return this.mBuild.some((Q)=>Q[0]==="field"&&TJ(Q[1])===TJ(J))||this.mPlan.recruits.some((Q)=>TJ(Q[1])===TJ(J))||this.mPlan.repositions.some((Q)=>TJ(Q[1])===TJ(J))}humanClash(J,Q){return this.banner=`${this.seatName(J)} — Clash, pulse ${Q}`,this.cOrders=new Map,this.cSel=null,this.clashPlayer=J,new Promise(($)=>{this.clashDone=()=>{let Z={};for(let[W,K]of this.cOrders)Z[W]=K;this.human(J).pendingOrders[Q]=Z,$()},this.render()})}clashDone=null;clashPlayer=0;clashCell(J,Q){let $=this.g,Z=this.clashPlayer;if(this.cSel===null){if(Q!==void 0&&$.units.get(Q).owner===Z)this.cSel=Q}else{let W=$.units.get(this.cSel),K=W7($,W);if(Q!==void 0&&$.units.get(Q).owner!==Z){let Y=K.chargeTargets.find((U)=>U.uid===Q),X=K.shootTargets.includes(Q),H=K.meleeTargets.find((U)=>U.uid===Q);if(X)this.cOrders.set(W.uid,["SHOOT",["U",Q]]);else if(Y)this.cOrders.set(W.uid,["CHARGE",Q,Y.path]);else if(H)this.cOrders.set(W.uid,["MELEE",Q,H.path]);this.cSel=null}else if(Q===this.cSel)this.cSel=null;else if(K.moves.has(TJ(J)))this.cOrders.set(W.uid,["MOVE",K.moves.get(TJ(J))]),this.cSel=null;else if(Q!==void 0&&$.units.get(Q).owner===Z)this.cSel=Q}this.render()}humanIntervention(J,Q){let $=this.g,Z=$.C,W=$.res[J].tribute,K=Q===3&&W>=Z.SURGE_COST,Y=Q<=2&&W>=Z.SHIELDBEARER_COST;if(!K&&!Y)return Promise.resolve();return this.banner=`${this.seatName(J)} — Intervention window ${Q}`,new Promise((X)=>{this.ivResolve=X,this.ivPlayer=J,this.ivWno=Q,this.ivSel=null,this.render()})}ivResolve=null;ivPlayer=0;ivWno=0;ivSel=null;render(){if(this.use3d)return this.render3d();let J=this.g;this.root.innerHTML=`
      <div class="topbar"><div class="phase-banner">${this.banner}</div>${GQ()}</div>
      <div class="phase-hint">${this.phaseHint()}</div>
      ${UQ(J,{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe})}
      <div class="panel">${this.panelHTML()}</div>
      <div class="gamelog">${this.log.slice(-4).map((Q)=>`<div>${Q}</div>`).join("")}</div>`,this.wireCells(),this.wirePanel(),NQ(this.root),this.paintOverlays(),this.onChange?.()}mountShell(){this.root.innerHTML=`
      <div class="topbar"><div class="phase-banner"></div>${GQ()}</div>
      <div class="phase-hint"></div>
      <div id="board3d" class="board3d-wrap"></div>
      <div class="panel"></div>
      <div class="gamelog"></div>`,this.shell={banner:this.root.querySelector(".phase-banner"),hint:this.root.querySelector(".phase-hint"),panel:this.root.querySelector(".panel"),log:this.root.querySelector(".gamelog")},this.board3d=new kZ(this.root.querySelector("#board3d"),{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe}),this.board3d.onClick((J)=>this.onBoardClick(J)),NQ(this.root)}render3d(){if(!this.board3d)this.mountShell();let J=this.shell;J.banner.innerHTML=this.banner,J.hint.innerHTML=this.phaseHint(),J.panel.innerHTML=this.panelHTML(),J.log.innerHTML=this.log.slice(-4).map((Q)=>`<div>${Q}</div>`).join(""),this.wirePanel(),this.board3d.update(this.g),this.board3d.setHighlights(this.computeHighlights()),this.onChange?.()}onBoardClick(J){let Q=this.g.board.get(TJ(J));if(this.banner.includes("Intervention"))this.ivCell(J,Q);else this.onCell(J,Q)}computeHighlights(){let J=this.g,Q={};if(this.banner.includes("Clash")&&this.cSel!==null){let $=J.units.get(this.cSel);Q.selected=$.pos;let Z=W7(J,$);Q.move=[...Z.moves.keys()].map((W)=>W.split(",").map(Number)),Q.melee=Z.meleeTargets.map((W)=>J.units.get(W.uid).pos),Q.shoot=Z.shootTargets.map((W)=>J.units.get(W).pos),Q.charge=Z.chargeTargets.map((W)=>J.units.get(W.uid).pos)}if(this.banner.includes("Muster")){let $=this.musterPlayer;Q.stage=[...this.mPlan.recruits.map((K)=>K[1]),...this.mBuild.filter((K)=>K[0]==="field").map((K)=>K[1]),...this.mPlan.repositions.map((K)=>K[1])];let Z=this.mMode,W=[];if(Z.kind==="recruit")for(let K=0;K<8;K++)for(let Y of J.heartlandRows($)){let X=[K,Y];if(!J.occupied(X)&&!this.staged(X))W.push(X)}if(Z.kind==="field")for(let K=0;K<8;K++)for(let Y=0;Y<8;Y++){let X=[K,Y];if(J.territoryOf(X)===$&&!J.fields.has(TJ(X))&&!J.wagon_at.has(TJ(X))&&!this.staged(X))W.push(X)}Q.valid=W}return Q}seatName(J){return this.cfg.mode==="hotseat"?`Player ${J+1} (${g7(this.tribe(J))})`:`You (${g7(this.tribe(J))})`}phaseHint(){if(this.banner.includes("Muster"))return"Spend \uD83D\uDEE1 <b>Supply</b> to recruit units (deploy in your back rows), unlock new types, or build fields & palisades. \uD83C\uDF3E <b>Crop</b> feeds your army each round — keep it above your unit count or they get exhausted and fight worse.";if(this.banner.includes("Clash"))return"Click a unit, then a \uD83D\uDFE2 tile to <b>move</b> or a \uD83D\uDD34 enemy to <b>attack</b>. Get units past the enemy's gold stake line and hold there to push it back next phase. Two pulses per round.";if(this.banner.includes("Intervention"))return"Optional: spend ◆ <b>Tribute</b> on a <b>Surge</b> (shove a unit one tile) or <b>Shieldbearer</b> (shield your Hero from a killing blow) — or just Skip.";return""}panelHTML(){if(this.banner.includes("Muster"))return this.musterPanel();if(this.banner.includes("Clash"))return this.clashPanel();if(this.banner.includes("Intervention"))return this.ivPanel();return""}musterPanel(){let J=this.g,Q=J.C,$=this.musterPlayer,Z=this.musterBudget($),W=this.mMode,K=[...J.unlocked[$]],Y=["spear","sword","archer","cav","siege"].filter((U)=>K.includes(U)),X=["archer","cav","siege"].filter((U)=>!K.includes(U)),H=(U,q,G)=>`<button class="pbtn${U?" on":""}" data-act="${q}">${G}</button>`;return`
      <div class="budget">Budget after harvest — \uD83D\uDEE1 <b>${Z.supply}</b> supply · \uD83C\uDF3E <b>${Z.crop}</b> crop ·
        deploy ${this.mPlan.recruits.length}/${Q.DEPLOY_MAX+J.extra_deploy[$]} · build ${this.mBuild.length}/${Q.BUILD_ACTIONS}</div>
      <div class="prow"><span class="plabel">Recruit:</span>
        ${Y.map((U)=>H(W.kind==="recruit"&&W.arch===U,`rec:${U}`,`${H9[U]} <i>${J.costs[U]+Q.COPY_SURCHARGE*J.copies[U]}\uD83D\uDEE1</i>`)).join("")}</div>
      ${X.length?`<div class="prow"><span class="plabel">Unlock:</span>
        ${X.map((U)=>H(this.mPlan.unlocks.includes(U),`unl:${U}`,`${H9[U]} <i>${IZ(J.unlocked[$].size+this.mPlan.unlocks.indexOf(U)+(this.mPlan.unlocks.includes(U)?0:this.mPlan.unlocks.length-this.mPlan.unlocks.indexOf(U)),Q)??IZ(J.unlocked[$].size,Q)}\uD83D\uDEE1</i>`)).join("")}</div>`:""}
      <div class="prow"><span class="plabel">Build:</span>
        ${H(W.kind==="field"&&W.ftype==="supply","fld:supply",`Supply field <i>${Q.FIELD_COST}\uD83D\uDEE1</i>`)}
        ${H(W.kind==="field"&&W.ftype==="crop","fld:crop",`Crop field <i>${Q.FIELD_COST}\uD83D\uDEE1</i>`)}
        ${H(W.kind==="palisade","pal",`Palisade <i>${Q.PALISADE_COST}\uD83D\uDEE1</i>`)}
        ${H(W.kind==="reposition","rep","Reposition")}</div>
      ${J.res[$].tribute>0?`<div class="prow"><span class="plabel">Tribute→Supply:</span>
        <button class="pbtn" data-act="trib-">−</button> <b>${this.mPlan.tribute_spend}</b>/${J.res[$].tribute}
        <button class="pbtn" data-act="trib+">+</button></div>`:""}
      <div class="prow staged">Staged: ${this.stagedSummary()}</div>
      <div class="prow"><button class="pbtn undo" data-act="undo">Undo last</button>
        <button class="pbtn confirm" data-act="muster-done">End Muster ▶</button></div>`}stagedSummary(){let J=[];for(let[Q]of this.mPlan.recruits)J.push(H9[Q]);for(let Q of this.mPlan.unlocks)J.push(`unlock ${H9[Q]}`);for(let Q of this.mBuild)J.push(Q[0]==="field"?`${Q[2]} field`:"palisade");for(let Q of this.mPlan.repositions)J.push("reposition");if(this.mPlan.tribute_spend)J.push(`+${this.mPlan.tribute_spend} supply`);return J.length?J.join(", "):"<i>nothing yet — pick an action, then click the board</i>"}clashPanel(){let J=this.g,Q=this.clashPlayer,$=J.onBoard(Q),Z=[...this.cOrders.keys()],W="<i>Click one of your units to give it an order.</i>";if(this.cSel!==null){let K=J.units.get(this.cSel),Y=W7(J,K),X=[];if(Y.moves.size)X.push("\uD83D\uDFE2 move (green)");if(Y.meleeTargets.length)X.push("\uD83D\uDD34 attack (red)");if(Y.shootTargets.length)X.push("\uD83D\uDFE0 shoot (orange)");if(Y.chargeTargets.length)X.push("\uD83D\uDFE3 charge (purple)");W=`<b>${H9[K.arch]}</b> selected — ${X.join(" · ")||"no targets in range"} ·
        ${Y.canBrace?'<button class="pbtn" data-act="brace">⛨ Brace</button>':""}
        <button class="pbtn" data-act="hold">Hold</button>`}return`<div class="prow">${W}</div>
      <div class="prow staged">Orders: <b>${Z.length}/${$.length}</b> units ·
        ${Z.map((K)=>`${H9[J.units.get(K).arch]}:${this.cOrders.get(K)[0]}`).join(", ")||"<i>none</i>"}</div>
      <div class="prow"><button class="pbtn undo" data-act="clash-clear">Clear</button>
        <button class="pbtn confirm" data-act="clash-done">Resolve pulse ▶</button></div>`}ivPanel(){let J=this.g,Q=this.ivPlayer,$=this.ivWno,Z=[];if($===3&&J.res[Q].tribute>=J.C.SURGE_COST)Z.push(`<button class="pbtn" data-act="iv:surge">⚡ Surge <i>${J.C.SURGE_COST}◆</i></button>`);if($<=2&&J.res[Q].tribute>=J.C.SHIELDBEARER_COST)Z.push(`<button class="pbtn" data-act="iv:shield">⛨ Shieldbearer <i>${J.C.SHIELDBEARER_COST}◆</i></button>`);let W=this.ivSel?`<div class="prow staged">${this.ivSel.kind==="surge"?"Surge: click your unit, then an adjacent empty tile.":"Shieldbearer: click the unit to ward."}</div>`:"";return`<div class="prow">Tribute ◆${J.res[Q].tribute}. Optional intervention:</div>
      <div class="prow">${Z.join(" ")} <button class="pbtn confirm" data-act="iv-skip">Skip ▶</button></div>${W}`}wireCells(){this.root.querySelectorAll(".cell").forEach((J)=>{J.addEventListener("click",()=>{let Q=J.dataset.pos.split(",").map(Number),$=J.dataset.uid!==void 0?Number(J.dataset.uid):void 0;if(this.banner.includes("Intervention"))this.ivCell(Q,$);else this.onCell(Q,$)})})}wirePanel(){this.root.querySelectorAll(".pbtn").forEach((J)=>{J.addEventListener("click",()=>this.onAct(J.dataset.act))})}onAct(J){let Q=this.g,$=Q.C;if(J==="muster-done"){this.mMode={kind:null},this.musterDone?.();return}if(J==="clash-done"){this.clashDone?.();return}if(J==="clash-clear"){this.cOrders.clear(),this.cSel=null,this.render();return}if(J==="iv-skip"){this.ivResolve?.();return}if(J==="undo"){if(this.mPlan.repositions.length)this.mPlan.repositions.pop();else if(this.mPlan.recruits.length)this.mPlan.recruits.pop();else if(this.mBuild.length)this.mBuild.pop();else if(this.mPlan.unlocks.length)this.mPlan.unlocks.pop();this.render();return}if(J==="brace"&&this.cSel!==null){this.cOrders.set(this.cSel,["BRACE"]),this.cSel=null,this.render();return}if(J==="hold"&&this.cSel!==null){this.cOrders.delete(this.cSel),this.cSel=null,this.render();return}if(J.startsWith("rec:")){this.mMode={kind:"recruit",arch:J.slice(4)},this.render();return}if(J.startsWith("fld:")){this.mMode={kind:"field",ftype:J.slice(4)},this.render();return}if(J==="pal"){this.mMode={kind:"palisade"},this.render();return}if(J==="rep"){this.mMode={kind:"reposition"},this.render();return}if(J.startsWith("unl:")){let Z=J.slice(4);if(!this.mPlan.unlocks.includes(Z))this.mPlan.unlocks.push(Z);this.render();return}if(J==="trib+"){this.mPlan.tribute_spend=Math.min(this.mPlan.tribute_spend+1,Q.res[this.musterPlayer].tribute),this.render();return}if(J==="trib-"){this.mPlan.tribute_spend=Math.max(0,this.mPlan.tribute_spend-1),this.render();return}if(J==="iv:surge"){this.ivSel={kind:"surge"},this.render();return}if(J==="iv:shield"){this.ivSel={kind:"shield"},this.render();return}}musterPalisade(J){let Q=this.g.C;if(!this.g.palisades.has(J)&&!this.mBuild.some(($)=>$[0]==="palisade"&&$[1]===J)&&this.mBuild.length<Q.BUILD_ACTIONS)this.mBuild.push(["palisade",J]);this.render()}ivCell(J,Q){let $=this.g,Z=this.ivPlayer,W=this.human(Z);if(!this.ivSel)return;if(this.ivSel.kind==="shield"){if(Q!==void 0&&$.units.get(Q).owner===Z)W.pendingIntervention[this.ivWno]=["SHIELDBEARER",Q],this.ivResolve?.()}else if(this.ivSel.uid===void 0){if(Q!==void 0&&$.units.get(Q).owner===Z)this.ivSel.uid=Q,this.render()}else{let K=$.units.get(this.ivSel.uid);if(Math.abs(K.pos[0]-J[0])+Math.abs(K.pos[1]-J[1])===1&&!$.occupied(J))W.pendingIntervention[this.ivWno]=["SURGE",this.ivSel.uid,J],this.ivResolve?.()}}paintOverlays(){let J=(Q,$)=>{let Z=this.root.querySelector(`.cell[data-pos="${TJ(Q)}"]`);if(Z)Z.classList.add($)};if(this.banner.includes("Clash")&&this.cSel!==null){let Q=this.g.units.get(this.cSel);this.root.querySelector(`.cell[data-pos="${TJ(Q.pos)}"]`)?.classList.add("sel");let Z=W7(this.g,Q);for(let W of Z.moves.keys())J(W.split(",").map(Number),"hl-move");for(let W of Z.meleeTargets)J(this.g.units.get(W.uid).pos,"hl-melee");for(let W of Z.shootTargets)J(this.g.units.get(W).pos,"hl-shoot");for(let W of Z.chargeTargets)J(this.g.units.get(W.uid).pos,"hl-charge")}if(this.banner.includes("Clash"))for(let[Q,$]of this.cOrders){let Z=this.root.querySelector(`.cell[data-uid="${Q}"] .unit`);if(Z)Z.insertAdjacentHTML("beforeend",`<span class="orderbadge">${$[0][0]}</span>`)}if(this.banner.includes("Muster")){for(let W of this.mPlan.recruits)J(W[1],"hl-stage");for(let W of this.mBuild)if(W[0]==="field")J(W[1],"hl-stage");for(let W of this.mPlan.repositions)J(W[1],"hl-stage");let Q=this.mMode,$=this.musterPlayer,Z=this.g;if(Q.kind==="recruit")for(let W=0;W<8;W++)for(let K of Z.heartlandRows($)){let Y=[W,K];if(!Z.occupied(Y)&&!this.staged(Y))J(Y,"hl-valid")}if(Q.kind==="field")for(let W=0;W<8;W++)for(let K=0;K<8;K++){let Y=[W,K];if(Z.territoryOf(Y)===$&&!Z.fields.has(TJ(Y))&&!Z.wagon_at.has(TJ(Y))&&!this.staged(Y))J(Y,"hl-valid")}}}winScreen(J,Q){let $=this.cfg.mode==="bot"?this.cfg.humanSeat:null,W=`<div class="winscreen">
        <h2>${$===null?`Player ${J+1} wins`:J===$?"Victory":"Defeat"}</h2>
        <p>${g7(this.tribe(J))} (P${J+1}) — <b>${Q}</b> after ${this.g.round} rounds.</p>
        <button class="pbtn confirm" onclick="location.reload()">New game</button>
      </div>`;if(this.use3d&&this.board3d){this.board3d.update(this.g),this.board3d.setHighlights({});let K=document.createElement("div");K.className="overlay",K.innerHTML=`<div class="modal">${W}</div>`,document.body.appendChild(K)}else this.root.innerHTML=UQ(this.g,{p0tribe:this.cfg.p0tribe,p1tribe:this.cfg.p1tribe})+W}}function wN(J){let Q=($,Z,W)=>{let K=J.newUnit($,Z);J.place(K,W)};J.unlocked[0].add("archer"),J.unlocked[0].add("cav"),Q(0,"sword",[1,3]),Q(1,"archer",[1,4]),Q(0,"cav",[3,2]),Q(1,"archer",[3,5]),Q(0,"archer",[5,3]),Q(1,"spear",[5,5])}var L8=[{text:"<b>Welcome, commander.</b> I'll teach you everything — assume you know nothing. LIMES is a <b>dice-free</b> wargame: no luck, every result follows from the rules. Click <b>Next ▶</b>.",manual:!0},{text:'<b>The board is 8×8.</b> You command the <b>bottom</b> half; the enemy holds the top. The <span class="g-c g-move">gold line</span> across each column is the <b>frontier (stake line)</b> — below it is your land, above it theirs.',board:!0,manual:!0},{text:"On each back row sit <b>Supply Wagons</b> (▣) — 3 per side. <b>Win</b> by destroying all 3 enemy wagons (top). If nobody does, the leader at the round-18 limit wins. So: <b>attack their wagons, defend yours.</b>",board:!0,manual:!0},{text:"I've set up a <b>practice skirmish</b> — your troops are already near the enemy so you can try every action. <b>Tip: hover any unit</b> to see its stats.",board:!0,manual:!0},{text:"Two resources run your war: \uD83D\uDEE1 <b>Supply</b> (builds things) and \uD83C\uDF3E <b>Crop</b> (feeds your army — <b>1 per unit each round</b>; unfed units get <b>exhausted</b> and fight worse). Every round starts with <b>Muster</b>, where you spend them.",manual:!0},{text:"Let's recruit. Click the <b>Spearman</b> button below.",hi:'[data-act="rec:spear"]',done:(J)=>J.musterModeKind==="recruit"},{text:"The glowing tiles are your back rows. <b>Click a glowing tile</b> to deploy your Spearman there.",board:!0,done:(J)=>J.stagedRecruitCount>=1},{text:"Good. Now economy: more Crop = a bigger army you can feed. Click <b>Crop field</b>.",hi:'[data-act="fld:crop"]',done:(J)=>J.musterModeKind==="field"},{text:"<b>Click a glowing tile in your territory</b> to build the field (it yields Crop every Muster).",board:!0,done:(J)=>J.stagedFieldCount>=1},{text:"You can also <b>Unlock</b> new unit types (Cavalry, Archers, Siege), build <b>Palisades</b> (block a column), or convert <b>Tribute → Supply</b>. The key rule of who-beats-who: <b>Spear ▸ Cavalry ▸ Archer ▸ Spear</b>. Now click <b>End Muster ▶</b>.",hi:'[data-act="muster-done"]',done:(J)=>J.phaseKind==="clash"},{text:"<b>Clash</b> — combat, fought over <b>two pulses</b>. Both sides' orders resolve <b>at the same time</b> (no first-mover advantage). <b>Click one of your units</b> to select it.",board:!0,done:(J)=>J.selectedUid!==null},{text:'Highlights show what it can do: <span class="g-c g-move">green</span> move · <span class="g-c g-melee">red</span> melee · <span class="g-c g-shoot">orange</span> shoot · <span class="g-c g-charge">purple</span> charge. Your forward units have enemies in range! <b>Select a unit with a coloured enemy and click that enemy to attack.</b>',board:!0,done:(J)=>J.hasAttackOrder},{text:"Attack queued. <b>Damage = your Atk − their Guard.</b> Edges: <b>+1</b> if you counter their type, <b>+1</b> when flanking (2+ attackers), Cavalry <b>Charge</b> adds punch and shoves — but a <b>Braced Spearman</b> stops a charge cold and wrecks the rider. <b>Archers/Siege shoot</b> from range without retaliation.",manual:!0},{text:'You can also just <b>advance</b>: select a unit and click a <span class="g-c g-move">green</span> tile to move toward the enemy line. Order as many units as you like, then click <b>Resolve pulse ▶</b>.',hi:'[data-act="clash-done"]',done:(J)=>J.bannerText.includes("pulse 2")||J.phaseKind!=="clash"},{text:"<b>Pulse 1 resolved!</b> Check the units — HP bars dropped, maybe one fell. Wounding enemies earns <b>XP</b> → <b>promotions</b> (★ tougher, ★★ upgraded). Now <b>pulse 2</b>: same again, then <b>Resolve pulse ▶</b> to end the round.",hi:'[data-act="clash-done"]',done:(J)=>J.round>=2},{text:"<b>Round over.</b> The <b>Frontier</b> just resolved automatically: in any column where one side has a unit past the line with a friend nearby (a <b>carry</b>) and the enemy doesn't contest it, the <b>stake steps</b> — you take a row. Units in the enemy's back rows <b>breach</b> a wagon. See the <b>log line</b> under the board.",manual:!0},{text:"When you <b>lose</b> a row you gain ◆ <b>Tribute</b> — spend it during Clash on a <b>Surge</b> (shove a unit a tile) or <b>Shieldbearer</b> (save your Hero from a death blow), or bank it and convert to Supply. Losing ground isn't all bad.",manual:!0},{text:"Two more things: your <b>Hero</b> is your standard — if it's ever fully surrounded by enemies you <b>rout</b> (your wagons take damage), so keep a friend beside it. And on <b>rounds 4 & 8</b> a <b>Caravan</b> lets both sides draft one-time <b>Artifacts</b> (the trailing side picks first).",manual:!0},{text:"<b>The clock:</b> from round 14 a single uncontested push can end it (golden goal); at round 18 the leader wins outright — so don't stall if you're behind. That's the <b>whole game</b>!",manual:!0},{text:"You know LIMES now: <b>feed your army, win the match-ups, push toward their wagons.</b> Keep playing this skirmish, and open <b>❓ Guide</b> anytime for stats & tips. Good luck, commander. ⚔",manual:!0}];class AZ{c;i=0;box;constructor(J){this.c=J}start(J){this.box=document.createElement("div"),this.box.id="coach",document.body.appendChild(this.box),this.c.onChange=()=>this.refresh(),this.c.startScenario(J,wN),this.render()}refresh(){let J=L8[this.i];if(!J)return;if(!J.manual&&J.done&&J.done(this.c)){this.advance();return}this.spotlight()}advance(){if(this.i++,this.i>=L8.length)return this.finish();this.render()}boardEl(){return document.querySelector("#board3d")||document.querySelector(".board-grid")}clearSpot(){document.querySelectorAll(".coachmark").forEach((J)=>J.classList.remove("coachmark")),this.boardEl()?.classList.remove("coach-board")}spotlight(){this.clearSpot();let J=L8[this.i];if(J.hi)document.querySelector(J.hi)?.classList.add("coachmark");if(J.board)this.boardEl()?.classList.add("coach-board")}render(){let J=L8[this.i];this.box.innerHTML=`
      <div class="coach-inner">
        <div class="coach-step">Tutorial · ${this.i+1}/${L8.length}</div>
        <div class="coach-text">${J.text}</div>
        <div class="coach-btns">
          ${J.manual?`<button class="pbtn confirm" id="coach-next">${this.i===L8.length-1?"Finish ✓":"Next ▶"}</button>`:'<span class="coach-hint">↳ do the highlighted action to continue</span>'}
          <button class="pbtn" id="coach-guide">❓ Guide</button>
          <button class="pbtn coach-skip" id="coach-skip">Skip</button>
        </div>
      </div>`,this.box.querySelector("#coach-next")?.addEventListener("click",()=>this.i===L8.length-1?this.finish():this.advance()),this.box.querySelector("#coach-guide")?.addEventListener("click",K7),this.box.querySelector("#coach-skip")?.addEventListener("click",()=>this.finish()),this.spotlight()}finish(){this.c.onChange=null,this.clearSpot(),this.box.remove()}}var CN=["HONEST","AGGRO","TURTLE","PROBER","SANDBAGGER","RUNNER"],TN={HONEST:"Balanced value play",AGGRO:"Relentless stake-pusher",TURTLE:"Economy & walls",PROBER:"Punishes overextension",SANDBAGGER:"Banks tribute, then strikes",RUNNER:"Cavalry cheese"},eJ=document.getElementById("app"),HJ={mode:"bot",humanSeat:0,botName:"HONEST",p0tribe:"roman",p1tribe:"viking",seed:12345};function HY(J){return c7.map((Q)=>`<option value="${Q}"${Q===J?" selected":""}>${lZ(Q)}</option>`).join("")}function ZQ(){eJ.innerHTML=`
    <div class="setup">
      <h1>LIMES</h1>
      <p class="sub">A deterministic, dice-free frontier wargame. Hold the line; carry the stakes.</p>

      <div class="srow"><span class="slabel">Opponent</span>
        <div class="seg">
          <button class="segbtn${HJ.mode==="bot"?" on":""}" data-mode="bot">vs Bot</button>
          <button class="segbtn${HJ.mode==="hotseat"?" on":""}" data-mode="hotseat">Hotseat (2P)</button>
        </div></div>

      <div id="botrow" class="srow"${HJ.mode==="bot"?"":" hidden"}>
        <span class="slabel">Bot</span>
        <select id="bot">${CN.map((J)=>`<option value="${J}"${J===HJ.botName?" selected":""}>${J} — ${TN[J]}</option>`).join("")}</select>
      </div>

      <div id="seatrow" class="srow"${HJ.mode==="bot"?"":" hidden"}>
        <span class="slabel">Your seat</span>
        <div class="seg">
          <button class="segbtn${HJ.humanSeat===0?" on":""}" data-seat="0">P1 · bottom</button>
          <button class="segbtn${HJ.humanSeat===1?" on":""}" data-seat="1">P2 · top</button>
        </div></div>

      <div class="srow"><span class="slabel">P1 tribe</span>
        <select id="p0t">${HY(HJ.p0tribe)}</select></div>
      <div class="srow"><span class="slabel">P2 tribe</span>
        <select id="p1t">${HY(HJ.p1tribe)}</select></div>

      <div class="srow"><span class="slabel">Seed</span>
        <input id="seed" type="number" value="${HJ.seed}">
        <button class="pbtn" id="rnd">⟳</button></div>

      <button class="pbtn confirm big" id="start">Begin campaign ▶</button>
      <div class="setup-links">
        <button class="pbtn" id="tut">\uD83C\uDF93 Tutorial — learn by playing</button>
        <button class="pbtn" id="guide">\uD83D\uDCD6 Read the rules</button>
      </div>
      <p class="hint">New here? Start with the <b>Tutorial</b>. Pick an action, then click the board.
        Two pulses of Clash per round; first to wipe the enemy Supply Wagons — or lead at the time limit — wins.</p>
    </div>`,eJ.querySelectorAll("[data-mode]").forEach((J)=>J.onclick=()=>{HJ.mode=J.dataset.mode,ZQ()}),eJ.querySelectorAll("[data-seat]").forEach((J)=>J.onclick=()=>{HJ.humanSeat=Number(J.dataset.seat),ZQ()}),eJ.querySelector("#bot").onchange=(J)=>HJ.botName=J.target.value,eJ.querySelector("#p0t").onchange=(J)=>HJ.p0tribe=J.target.value,eJ.querySelector("#p1t").onchange=(J)=>HJ.p1tribe=J.target.value,eJ.querySelector("#seed").onchange=(J)=>HJ.seed=Number(J.target.value)|0,eJ.querySelector("#rnd").onclick=()=>{HJ.seed=Math.floor(Math.random()*1e6),ZQ()},eJ.querySelector("#start").onclick=()=>{if(HJ.p0tribe===HJ.p1tribe)HJ.p1tribe=c7.find((J)=>J!==HJ.p0tribe);new $Q(eJ).start({...HJ})},eJ.querySelector("#guide").onclick=K7,eJ.querySelector("#tut").onclick=()=>{new AZ(new $Q(eJ)).start({mode:"bot",humanSeat:0,botName:"TURTLE",p0tribe:HJ.p0tribe,p1tribe:HJ.p1tribe===HJ.p0tribe?c7.find((J)=>J!==HJ.p0tribe):HJ.p1tribe,seed:4242})}}ZQ();})();
