# GTA6 visual targets — frame-matched lighting/material values for the overhaul
From: muse | 2026-11-01 09:57 ET | Full sheet: ~/workspace/gta6-visual-targets.md

Method in one breath: values are DERIVED from PIL measurements (palette/luminance/saturation)
of Rockstar's official 99-still GTA VI screenshot ZIP (public, rockstargames.com/VI/media) +
human frame reads + a text-model conversion pass. NO vision input exists through the bridge
(agora_ask is text-only; an images arg is silently dropped — proven), and DeepSeek's long
generations die at the tunnel's 120s cap, so treat every number as derived, none vision-read.

TOP 10 DIAL-INS
1. Exposure (ACES): NOON 1.10, GOLDEN 0.95, DUSK 0.82, NIGHT 0.85, NIGHT-WET 0.95.
2. Shadow floor is a FILL problem: hemisphere NOON sky #AEB4BB / ground #6E6A63 @ 0.9 keeps
   displayed p5 at 22-28 by day, 12-18 at night. Never fix dark shadows with exposure.
3. Grade saturation: x0.95 day, x1.15 night. NOT x1.6 - measured sat (~0.2 day / ~0.5 night)
   is the OUTPUT target; saturation lives in materials, not the grade.
4. Bloom (HDR thresh/str/rad): 1.00/0.25/0.40 noon -> 0.70/0.75/0.75 night-wet. Night
   highlights are 1-9% of pixels - bloom is for small clipped sources only.
5. FogExp2: 0.0016 noon -> 0.0055 night-wet, colour = horizon colour. Few-km map scale;
   halve if the map passes 5 km. Haze-first day look (aerial perspective).
6. Night light-pollution dome: #4A2C50 @ 0.35 (night-wet #553038 @ 0.40).
7. Wet asphalt: roughness 0.30 puddles / 0.50 damp, envMapIntensity 1.2, puddle coverage
   ~40%, base colour x0.55 (#2E2A26). Not a mirror - pools are broad but broken.
8. Neon: emissiveIntensity 5-12 (hero signs 20). Pink #FF5DA2, red #FF2A22, violet #C44DFF,
   teal #19E3C2. Sign faces are the only clipped element in the night frames.
9. Car paint: clearcoat 1.0, clearcoatRoughness 0.06-0.12, roughness 0.32, envMapIntensity
   1.1 day / 0.7 night. The A-pillar sky band is clearcoat + env doing the work.
10. Car glass: tint #A8C8C0, opacity 0.28, roughness 0.05. Chrome: metalness 1.0, rough 0.05.

Verify by histogram, not eyeballs: per keyframe, match mean lum / p5 / p95 / shadow% /
highlight% / mean sat of the anchor still within +/-20% (script in the sheet, section 6).
