const titles = [
  'Joe Rogan Experience #300 - Joey Diaz',
  'Joe Rogan Experience #301 - Doug Stanhope',
  'Joe Rogan Experience #304 - Andrew Dice Clay',
  'Joe Rogan Experience #305 - Bert Kreischer (Part 2)',
  'Joe Rogan Experience #308 - Steve Volk',
  'Joe Rogan Experience #310 - Neil Degrasse Tyson',
  'Joe Rogan Experience #312 - Steve Rinella, Bryan Callen',
  'Joe Rogan Experience #314 - Ian Edwards',
  'Joe Rogan Experience #316 - Enson Inoue, Chuck Lidell',
  'Joe Rogan Experience #317 - David Choe, Yoshi Obayashi',
  'Joe Rogan Experience #319 - Alex Honnold',
  'Joe Rogan Experience #321 - Melissa Etheridge',
  'Joe Rogan Experience #322 - Ari Shaffir',
  'Joe Rogan Experience #323 - "Freeway" Rick Ross',
  'Joe Rogan Experience #324 - Sam Sheridan',
  'Joe Rogan Experience #325 - James "The Colossus" Thompson',
  'Joe Rogan Experience #328 - Dan Carlin',
  'Joe Rogan Experience #329 - Duncan Trussell',
  'Joe Rogan Experience #330 - Eddie Huang',
  'Joe Rogan Experience #331 - Dr. Steven Greer',
  'Joe Rogan Experience #332 - Tom Segura',
  'Joe Rogan Experience #333 - David Lee Roth',
  'Joe Rogan Experience #334 - Dr. Amit Goswami',
  'Joe Rogan Experience #335 - Bas Rutten',
  'Joe Rogan Experience #336 - Scott Sigler',
  'Joe Rogan Experience #337 - Justin Wren',
  'Joe Rogan Experience #338 - Shane Smith',
  'Joe Rogan Experience #339 - Jacob Ward',
  'Joe Rogan Experience #340 - JD Kelley',
  'Joe Rogan Experience #344 - Stanley Krippner, Christopher Ryan',
  'Joe Rogan Experience #345 - Bryan Callen',
  'Joe Rogan Experience #346 - Douglas Rushkoff',
  'Joe Rogan Experience #347 - Joey Diaz',
  'Joe Rogan Experience #348 - Steven Rinella, Bryan Callen, Cam Edwards',
  'Joe Rogan Experience #349 - Greg Fitzsimmons',
  'Joe Rogan Experience #350 - Tony Hinchcliffe',
  'Joe Rogan Experience #351 - Georges St. Pierre',
  'Joe Rogan Experience #352 - Tom Segura',
  'Joe Rogan Experience #354 - Ari Shaffir, Amy Schumer',
  'Joe Rogan Experience #355 - Dom Irrera',
  'Joe Rogan Experience #356 - Dan Hardy',
  'Joe Rogan Experience #357 - Daniele Bolelli',
  'Joe Rogan Experience #358 - Bert Kreischer',
  'Joe Rogan Experience #359 - Alex Grey',
  'Joe Rogan Experience #360 - Graham Hancock',
  'Joe Rogan Experience #361 - Dave Asprey, Tait Fletcher',
  'Joe Rogan Experience #362 - Eddie Ifft',
  'Joe Rogan Experience #363 - Everlast',
  'Joe Rogan Experience #365 - Kelly Starrett, Glen Cordoza',
  'Joe Rogan Experience #366 - Bobcat Goldthwait',
  'Joe Rogan Experience #367 - Aubrey Marcus',
  'Joe Rogan Experience #368 - David Seaman',
  'Joe Rogan Experience #369 - Jason Silva, Duncan Trussell, Ari Shaffir',
  'Joe Rogan Experience #371 - Rick Doblin',
  'Joe Rogan Experience #372 - Mariana van Zeller',
  'Joe Rogan Experience #373 - Joey "CoCo" Diaz',
  'Joe Rogan Experience #374 - Marc Maron',
  'Joe Rogan Experience #375 - Shane Smith',
  'Joe Rogan Experience #376 - Bryan Callen',
  'Joe Rogan Experience #377 - Duncan Trussell',
  'Joe Rogan Experience #379 - Matt Farah, Tod Mesirow',
  'Joe Rogan Experience #381 - Abby Martin',
  'Joe Rogan Experience #382 - Greg Fitzsimmons',
  'Joe Rogan Experience #383 - Jim Norton',
  'Joe Rogan Experience #384 - Ian McCall',
  'Joe Rogan Experience #385 - Duane Ludwig, TJ Dillashaw',
  'Joe Rogan Experience #386 - Joey "CoCo" Diaz',
  'Joe Rogan Experience #387 - Everlast',
  'Joe Rogan Experience #390 - Mac Lethal',
  'Joe Rogan Experience #392 - David Choe',
  'Joe Rogan Experience #393 - Tom Segura',
  'Joe Rogan Experience #396 - Stefan Molyneux',
  'Joe Rogan Experience #398 - Sam Tripoli',
  'Joe Rogan Experience #399 - Buck Angel',
  'Joe Rogan Experience #400 - Joey "CoCo" Diaz, Duncan Trussell',
  'Joe Rogan Experience #405 - Steven Pressfield, Aubrey Marcus',
  'Joe Rogan Experience #406 - Tom Segura, Christina Pazsitzky',
  'Joe Rogan Experience #407 - Eddie Bravo',
  'Joe Rogan Experience #408 - Todd Glass',
  'Joe Rogan Experience #410 - Sam Harris',
  'Joe Rogan Experience #411 - Dave Asprey',
  'Joe Rogan Experience #412 - Maynard James Keenan',
  'Joe Rogan Experience #413 - Dan Carlin, Daniele Bolelli',
  'Joe Rogan Experience #414 - Cmdr. Chris Hadfield',
  'Joe Rogan Experience #415 - Justin Foster',
  'Joe Rogan Experience #416 - Ana Kasparian',
  'Joe Rogan Experience #417 - Graham Hancock',
  'Joe Rogan Experience #418 - Jeremy Stephens, Eddie Bravo',
  'Joe Rogan Experience #419 - Lorenzo Hagerty (Part 2)',
  'Joe Rogan Experience #421 - Christopher Ryan',
  'Joe Rogan Experience #424 - Brody Stevens',
  'Joe Rogan Experience #431 - Matt Fulchiron (Part 1)',
  'Joe Rogan Experience #434 - Roseanne Barr',
  'Joe Rogan Experience #436 - Stefan Molyneux',
  'Joe Rogan Experience #437 - Scott Sigler',
  'Joe Rogan Experience #438 - Dr. Mark Gordon',
  'Joe Rogan Experience #440 - Dom Irrera',
  'Joe Rogan Experience #442 - Steven Rinella',
  'Joe Rogan Experience #443 - Neal Brennan',
  'Joe Rogan Experience #445 - Peter Schiff',
  'Joe Rogan Experience #446 - Andreas Antonopoulos',
  'Joe Rogan Experience #448 - Tom Segura',
  'Joe Rogan Experience #449 - Justin Martindale',
  'Joe Rogan Experience #450 - Cameron Hanes',
  'Joe Rogan Experience #451 - Aubrey Marcus',
  'Joe Rogan Experience #452 - Immortal Technique & Chino XL',
  'Joe Rogan Experience #457 - Ari Shaffir',
  'Joe Rogan Experience #459 - Dr. Rhonda Patrick',
  'Joe Rogan Experience #460 - Kron Gracie',
  'Joe Rogan Experience #463 - Louis Theroux',
  'Joe Rogan Experience #464 - Robert Greene, Aubrey Marcus',
  'Joe Rogan Experience #467 - Peter Giuliano',
  'Joe Rogan Experience #468 - Duncan Trussell, Christopher Ryan',
  'Joe Rogan Experience #469 - Dr. Carl Hart',
  'Joe Rogan Experience #470 - Amber Lyon',
  'Joe Rogan Experience #472 - Shane Smith',
  'Joe Rogan Experience #473 - Jim Jefferies',
  'Joe Rogan Experience #474 - Hannibal Buress',
  'Joe Rogan Experience #475 - Adam Carolla',
  'Joe Rogan Experience #476 - Honey Honey',
  'Joe Rogan Experience #477 - Dennis McKenna & Josh Wickerham',
  'Joe Rogan Experience #478 - Eddie Bravo',
  'Joe Rogan Experience #479 - Joel Salatin',
  'Joe Rogan Experience #482 - Rob MacCachren & Bud Brutsman',
  'Joe Rogan Experience #483 - Mark Kendall',
  'Joe Rogan Experience #484 - Alexis Ohanian',
  'Joe Rogan Experience #485 - Amy Schumer',
  'Joe Rogan Experience #486 - Brendan Schaub & Bryan Callen',
  'Joe Rogan Experience #487 - David Seaman',
  'Joe Rogan Experience #488 - Iliza Shlesinger',
  'Joe Rogan Experience #489 - Liam & Dylan Resnekov',
  'Joe Rogan Experience #490 - Andreas Antonopoulos',
  'Joe Rogan Experience #491 - Steve Maxwell',
  'Joe Rogan Experience #492 - Dave Attell',
  'Joe Rogan Experience #496 - Nick Cutter',
  'Joe Rogan Experience #497 - Tim Kennedy',
  'Joe Rogan Experience #498 - Aubrey Marcus',
  'Joe Rogan Experience #499 - Cenk Uygur'
]

const youTube = [
  'https://youtube.com/watch?v=8HrP0PcvILs&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=2&t=0s',
  'https://youtube.com/watch?v=t4UJ8rMW_u0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=3&t=0s',
  'https://youtube.com/watch?v=p0zNBUF-nR4&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=4&t=0s',
  'https://youtube.com/watch?v=XsWMYSzngR8&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=5&t=0s',
  'https://youtube.com/watch?v=3F7y0U6L6cI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=6&t=0s',
  'https://youtube.com/watch?v=ZpHh_TU2kcI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=7&t=0s',
  'https://youtube.com/watch?v=WPt2Ec1QJlk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=8&t=0s',
  'https://youtube.com/watch?v=KIxN8Bi9-Fw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=9&t=0s',
  'https://youtube.com/watch?v=rt1aL58hxms&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=10&t=0s',
  'https://youtube.com/watch?v=pkhmOG9hx3c&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=11&t=0s',
  'https://youtube.com/watch?v=OusYaNWBy08&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=12&t=0s',
  'https://youtube.com/watch?v=gy0u9dxfVQM&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=13&t=0s',
  'https://youtube.com/watch?v=uDS51WxvT_c&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=14&t=0s',
  'https://youtube.com/watch?v=8fEN8g6cGCw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=15&t=0s',
  'https://youtube.com/watch?v=zIgGFo5mctY&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=16&t=0s',
  'https://youtube.com/watch?v=E39Ez358jcM&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=17&t=0s',
  'https://youtube.com/watch?v=nvqwztjcSNg&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=18&t=0s',
  'https://youtube.com/watch?v=7wpixVId0b4&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=19&t=0s',
  'https://youtube.com/watch?v=5kW_BJ9d2d0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=20&t=0s',
  'https://youtube.com/watch?v=0gVLv5eg4Xg&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=21&t=0s',
  'https://youtube.com/watch?v=4BHAAD21K7M&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=22&t=0s',
  'https://youtube.com/watch?v=aiIHEyvjNdA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=23&t=0s',
  'https://youtube.com/watch?v=xzfSPK9eE_E&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=24&t=0s',
  'https://youtube.com/watch?v=MhXiCpQoWDo&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=25&t=0s',
  'https://youtube.com/watch?v=eGuwtdAcjOk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=26&t=0s',
  'https://youtube.com/watch?v=MWUDckvf2Lo&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=27&t=0s',
  'https://youtube.com/watch?v=i2RCpvil-fs&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=28&t=0s',
  'https://youtube.com/watch?v=stb0v6ZXu9o&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=29&t=0s',
  'https://youtube.com/watch?v=JJGDkl5vKZc&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=30&t=0s',
  'https://youtube.com/watch?v=V_k_AM2aljg&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=31&t=0s',
  'https://youtube.com/watch?v=k65aHBrDrYk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=32&t=0s',
  'https://youtube.com/watch?v=QHfOR-byUyU&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=33&t=0s',
  'https://youtube.com/watch?v=L-POgaxl6vA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=34&t=0s',
  'https://youtube.com/watch?v=sY_5zs-47A0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=35&t=0s',
  'https://youtube.com/watch?v=VXWCTCOYknQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=36&t=0s',
  'https://youtube.com/watch?v=LHL9XtH3LuE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=37&t=0s',
  'https://youtube.com/watch?v=rmFsUV5ICKk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=38&t=0s',
  'https://youtube.com/watch?v=tO2TXneMdUQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=39&t=0s',
  'https://youtube.com/watch?v=rKf80WtsFjk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=40&t=0s',
  'https://youtube.com/watch?v=HWkLKU0KlDQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=41&t=0s',
  'https://youtube.com/watch?v=Qcb_EDwQc_w&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=42&t=0s',
  'https://youtube.com/watch?v=IkoT6-7drP0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=43&t=0s',
  'https://youtube.com/watch?v=9rMRDYnJh10&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=44&t=0s',
  'https://youtube.com/watch?v=Q01yjj-2NkI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=45&t=0s',
  'https://youtube.com/watch?v=tsu2-I2q6dg&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=46&t=0s',
  'https://youtube.com/watch?v=SY26mXMVDko&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=47&t=0s',
  'https://youtube.com/watch?v=fZ3Gu4szudI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=48&t=0s',
  'https://youtube.com/watch?v=3K7rhvXe0aE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=49&t=0s',
  'https://youtube.com/watch?v=fcVy7EEgqNM&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=50&t=0s',
  'https://youtube.com/watch?v=ipEtAkxrm1w&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=51&t=0s',
  'https://youtube.com/watch?v=sGFFPJDzN-4&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=52&t=0s',
  'https://youtube.com/watch?v=y6xkxLKrDPw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=53&t=0s',
  'https://youtube.com/watch?v=TyODZ4IjBVI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=54&t=0s',
  'https://youtube.com/watch?v=5DRQP2CiMHU&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=55&t=0s',
  'https://youtube.com/watch?v=P7cB6Vik7xw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=56&t=0s',
  'https://youtube.com/watch?v=8CiguIt9Ir0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=57&t=0s',
  'https://youtube.com/watch?v=pYmuOQodT2Y&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=58&t=0s',
  'https://youtube.com/watch?v=Jx2dyhRBkHA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=59&t=0s',
  'https://youtube.com/watch?v=9tZq_n1_yXc&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=60&t=0s',
  'https://youtube.com/watch?v=7-IOCUCDL28&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=61&t=0s',
  'https://youtube.com/watch?v=kcVeCaE4K9A&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=62&t=0s',
  'https://youtube.com/watch?v=zbjrwJG54XA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=63&t=0s',
  'https://youtube.com/watch?v=zgQW7LlidFs&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=64&t=0s',
  'https://youtube.com/watch?v=bst7GJGTVgo&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=65&t=0s',
  'https://youtube.com/watch?v=hk8NfFhRKpw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=66&t=0s',
  'https://youtube.com/watch?v=Xm27e0oc1lM&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=67&t=0s',
  'https://youtube.com/watch?v=i_HqR46dU_8&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=68&t=0s',
  'https://youtube.com/watch?v=SBgj3sdJJRk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=69&t=0s',
  'https://youtube.com/watch?v=U_lUHyN-4ZA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=70&t=0s',
  'https://youtube.com/watch?v=i8cDwucTSbo&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=71&t=0s',
  'https://youtube.com/watch?v=kiFM2QDPbw4&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=72&t=0s',
  'https://youtube.com/watch?v=mFxU5veg0Cw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=73&t=0s',
  'https://youtube.com/watch?v=IiUUuXeTtqA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=74&t=0s',
  'https://youtube.com/watch?v=vFe1xEGtpjA&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=75&t=0s',
  'https://youtube.com/watch?v=TjQcaK2Oa4w&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=76&t=0s',
  'https://youtube.com/watch?v=4p3tN_iFHY0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=77&t=0s',
  'https://youtube.com/watch?v=7ofRCZboG30&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=78&t=0s',
  'https://youtube.com/watch?v=icZhxnE7rlM&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=79&t=0s',
  'https://youtube.com/watch?v=vWH-8v_x68Y&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=80&t=0s',
  'https://youtube.com/watch?v=FHhTWCknDLs&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=81&t=0s',
  'https://youtube.com/watch?v=I02ddD3D96I&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=82&t=0s',
  'https://youtube.com/watch?v=LFbws0IIqqg&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=83&t=0s',
  'https://youtube.com/watch?v=ruY9Zvmef0Y&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=84&t=0s',
  'https://youtube.com/watch?v=OS0laJvgVxo&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=85&t=0s',
  'https://youtube.com/watch?v=Slzg6X53xo0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=86&t=0s',
  'https://youtube.com/watch?v=ntbFS2hzW0Q&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=87&t=0s',
  'https://youtube.com/watch?v=1cbnCrHwVSg&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=88&t=0s',
  'https://youtube.com/watch?v=62wXeZPEhao&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=89&t=0s',
  'https://youtube.com/watch?v=0Z9wmqlypUk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=90&t=0s',
  'https://youtube.com/watch?v=ah5Nxb9Of-0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=91&t=0s',
  'https://youtube.com/watch?v=BgbS0ObVdJE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=92&t=0s',
  'https://youtube.com/watch?v=pAm5l-XiKNk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=93&t=0s',
  'https://youtube.com/watch?v=leI4IvhTVRI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=94&t=0s',
  'https://youtube.com/watch?v=5Xq_ZYB8rew&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=95&t=0s',
  'https://youtube.com/watch?v=K5_cTGoEGgY&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=96&t=0s',
  'https://youtube.com/watch?v=aJeGeclGDpQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=97&t=0s',
  'https://youtube.com/watch?v=Ec_BcTJI9sE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=98&t=0s',
  'https://youtube.com/watch?v=RqmJsKkloCc&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=99&t=0s',
  'https://youtube.com/watch?v=UuyxFw_GbuQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=100&t=0s',
  'https://youtube.com/watch?v=8IHU42j3evQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=101&t=0s',
  'https://youtube.com/watch?v=1cexawnOlR8&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=102&t=0s',
  'https://youtube.com/watch?v=kS9HjxXEeqY&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=103&t=0s',
  'https://youtube.com/watch?v=wgnn0oNHG2U&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=104&t=0s',
  'https://youtube.com/watch?v=7XTtHSObaS0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=105&t=0s',
  'https://youtube.com/watch?v=Zp8BeJM5nSQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=106&t=0s',
  'https://youtube.com/watch?v=jdXs_SAlF4I&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=107&t=0s',
  'https://youtube.com/watch?v=3Fhvsoh0Jws&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=108&t=0s',
  'https://youtube.com/watch?v=qh0xB4OJdpQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=109&t=0s',
  'https://youtube.com/watch?v=KVRcd4QbrWw&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=110&t=0s',
  'https://youtube.com/watch?v=QjeV2_hKLao&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=111&t=0s',
  'https://youtube.com/watch?v=kmB8_DNeg5k&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=112&t=0s',
  'https://youtube.com/watch?v=G8LtKdikuTE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=113&t=0s',
  'https://youtube.com/watch?v=SrPz5o2_z3U&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=114&t=0s',
  'https://youtube.com/watch?v=T5jMC8j7ElI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=115&t=0s',
  'https://youtube.com/watch?v=WZ1Dm-dcl68&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=116&t=0s',
  'https://youtube.com/watch?v=l1YuUpg3RM0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=117&t=0s',
  'https://youtube.com/watch?v=uJ8Y3zrQWnc&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=118&t=0s',
  'https://youtube.com/watch?v=irV0M5GNUbk&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=119&t=0s',
  'https://youtube.com/watch?v=C-UVwPqs8Go&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=120&t=0s',
  'https://youtube.com/watch?v=rng8ToHDjaY&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=121&t=0s',
  'https://youtube.com/watch?v=72P_9jmrOVI&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=122&t=0s',
  'https://youtube.com/watch?v=iF0MpB89ELc&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=123&t=0s',
  'https://youtube.com/watch?v=7ZVUoQd-P6o&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=124&t=0s',
  'https://youtube.com/watch?v=bWToVLYXr4Q&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=125&t=0s',
  'https://youtube.com/watch?v=gdBVYDnImco&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=126&t=0s',
  'https://youtube.com/watch?v=PreO9uPeMw8&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=127&t=0s',
  'https://youtube.com/watch?v=pHcF7iC984U&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=128&t=0s',
  'https://youtube.com/watch?v=mrbfnT5-QbU&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=129&t=0s',
  'https://youtube.com/watch?v=4Su050aZg2I&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=130&t=0s',
  'https://youtube.com/watch?v=2SNRJzk4FNQ&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=131&t=0s',
  'https://youtube.com/watch?v=imgP7bfWldE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=132&t=0s',
  'https://youtube.com/watch?v=EnhGlgCm4MU&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=133&t=0s',
  'https://youtube.com/watch?v=RictLTGVUwc&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=134&t=0s',
  'https://youtube.com/watch?v=zpvI-JD2dSs&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=135&t=0s',
  'https://youtube.com/watch?v=6VXdosvVpQ0&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=136&t=0s',
  'https://youtube.com/watch?v=F2MoOM1ctiE&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=137&t=0s',
  'https://youtube.com/watch?v=x-cZehoKj5w&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=138&t=0s',
  'https://youtube.com/watch?v=u6snP_ZoaZo&list=PLk1Sqn_f33Kvv8T6ZESpJ2nvEHT9xBhlb&index=139&t=0s'
]

const output = []
for (let i = 0; i < titles.length; i++) {
  let nextNum

  const thisNum = Number(titles[i].match(/\d+/)[0])

  if (i !== titles.length - 1) {
    nextNum = Number(titles[i + 1].match(/\d+/)[0])
  } else {
    nextNum = Number(titles[titles.length - 1].match(/\d+/)[0])
  }

  // console.log(nextNum)
  // console.log(Number(titles[i + 1].match(/\d+/)[0]))
  const diff = nextNum - thisNum

  output.push({ episode_id: thisNum, links: youTube[i] })
  if (diff > 1) {
    // missingNums.push(testNums[i])

    for (let j = 1; j < diff; j++) {
      output.push({ episode_id: thisNum + j, links: '' })
    }
  }
}

console.dir(output, { depth: null, colors: true, maxArrayLength: null })
// console.log(missingNums)

// console.dir(output, { depth: null, colors: true, maxArrayLength: null })
