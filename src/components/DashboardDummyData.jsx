import React from 'react';

const globalTrends = [
    {
        scenario: "Scenario X",
        data: "Data"
    },
    {
        scenario: "Scenario Y",
        data: "Data"
    },
    {
        scenario: "1.5 Degrees",
        data: "Data"
    },
    {
        scenario: "2.0 Degrees",
        data: "Data"
    },
    {
        scenario: "2.5 Degrees",
        data: "Data"
    },
    {
        scenario: "3.0 Degrees",
        data: "Data"
    }
]

const spatialComparison = [
    {
        scenario: "Scenario X",
        data: [
            {
                "id": "AFG",
                "value": 860221
            },
            {
                "id": "AGO",
                "value": 156708
            },
            {
                "id": "ALB",
                "value": 794869
            },
            {
                "id": "ARE",
                "value": 864193
            },
            {
                "id": "ARG",
                "value": 259480
            },
            {
                "id": "ARM",
                "value": 434315
            },
            {
                "id": "ATA",
                "value": 973615
            },
            {
                "id": "ATF",
                "value": 290071
            },
            {
                "id": "AUT",
                "value": 755451
            },
            {
                "id": "AZE",
                "value": 476130
            },
            {
                "id": "BDI",
                "value": 895816
            },
            {
                "id": "BEL",
                "value": 134396
            },
            {
                "id": "BEN",
                "value": 921410
            },
            {
                "id": "BFA",
                "value": 324489
            },
            {
                "id": "BGD",
                "value": 467194
            },
            {
                "id": "BGR",
                "value": 400263
            },
            {
                "id": "BHS",
                "value": 607754
            },
            {
                "id": "BIH",
                "value": 346864
            },
            {
                "id": "BLR",
                "value": 733599
            },
            {
                "id": "BLZ",
                "value": 933219
            },
            {
                "id": "BOL",
                "value": 466613
            },
            {
                "id": "BRN",
                "value": 156131
            },
            {
                "id": "BTN",
                "value": 418379
            },
            {
                "id": "BWA",
                "value": 166037
            },
            {
                "id": "CAF",
                "value": 336276
            },
            {
                "id": "CAN",
                "value": 503130
            },
            {
                "id": "CHE",
                "value": 417443
            },
            {
                "id": "CHL",
                "value": 44942
            },
            {
                "id": "CHN",
                "value": 849376
            },
            {
                "id": "CIV",
                "value": 985759
            },
            {
                "id": "CMR",
                "value": 635881
            },
            {
                "id": "COG",
                "value": 620748
            },
            {
                "id": "COL",
                "value": 68510
            },
            {
                "id": "CRI",
                "value": 256972
            },
            {
                "id": "CUB",
                "value": 645414
            },
            {
                "id": "-99",
                "value": 340143
            },
            {
                "id": "CYP",
                "value": 441917
            },
            {
                "id": "CZE",
                "value": 988298
            },
            {
                "id": "DEU",
                "value": 940476
            },
            {
                "id": "DJI",
                "value": 760065
            },
            {
                "id": "DNK",
                "value": 67955
            },
            {
                "id": "DOM",
                "value": 420411
            },
            {
                "id": "DZA",
                "value": 888067
            },
            {
                "id": "ECU",
                "value": 765813
            },
            {
                "id": "EGY",
                "value": 366111
            },
            {
                "id": "ERI",
                "value": 842374
            },
            {
                "id": "ESP",
                "value": 729109
            },
            {
                "id": "EST",
                "value": 413965
            },
            {
                "id": "ETH",
                "value": 154830
            },
            {
                "id": "FIN",
                "value": 932181
            },
            {
                "id": "FJI",
                "value": 654868
            },
            {
                "id": "FLK",
                "value": 70641
            },
            {
                "id": "FRA",
                "value": 81915
            },
            {
                "id": "GAB",
                "value": 155948
            },
            {
                "id": "GBR",
                "value": 518430
            },
            {
                "id": "GEO",
                "value": 154436
            },
            {
                "id": "GHA",
                "value": 265008
            },
            {
                "id": "GIN",
                "value": 964637
            },
            {
                "id": "GMB",
                "value": 805885
            },
            {
                "id": "GNB",
                "value": 361044
            },
            {
                "id": "GNQ",
                "value": 485025
            },
            {
                "id": "GRC",
                "value": 915896
            },
            {
                "id": "GTM",
                "value": 872420
            },
            {
                "id": "GUY",
                "value": 922051
            },
            {
                "id": "HND",
                "value": 389185
            },
            {
                "id": "HRV",
                "value": 652369
            },
            {
                "id": "HTI",
                "value": 388274
            },
            {
                "id": "HUN",
                "value": 172582
            },
            {
                "id": "IDN",
                "value": 752364
            },
            {
                "id": "IND",
                "value": 642913
            },
            {
                "id": "IRL",
                "value": 851608
            },
            {
                "id": "IRN",
                "value": 740439
            },
            {
                "id": "IRQ",
                "value": 809507
            },
            {
                "id": "ISL",
                "value": 339269
            },
            {
                "id": "ISR",
                "value": 707526
            },
            {
                "id": "ITA",
                "value": 630041
            },
            {
                "id": "JAM",
                "value": 945976
            },
            {
                "id": "JOR",
                "value": 540787
            },
            {
                "id": "JPN",
                "value": 770431
            },
            {
                "id": "KAZ",
                "value": 750979
            },
            {
                "id": "KEN",
                "value": 192206
            },
            {
                "id": "KGZ",
                "value": 676979
            },
            {
                "id": "KHM",
                "value": 583485
            },
            {
                "id": "OSA",
                "value": 360684
            },
            {
                "id": "KWT",
                "value": 94520
            },
            {
                "id": "LAO",
                "value": 765988
            },
            {
                "id": "LBN",
                "value": 725422
            },
            {
                "id": "LBR",
                "value": 496095
            },
            {
                "id": "LBY",
                "value": 848601
            },
            {
                "id": "LKA",
                "value": 89930
            },
            {
                "id": "LSO",
                "value": 183358
            },
            {
                "id": "LTU",
                "value": 685685
            },
            {
                "id": "LUX",
                "value": 867778
            },
            {
                "id": "LVA",
                "value": 118272
            },
            {
                "id": "MAR",
                "value": 568661
            },
            {
                "id": "MDA",
                "value": 74532
            },
            {
                "id": "MDG",
                "value": 518856
            },
            {
                "id": "MEX",
                "value": 835199
            },
            {
                "id": "MKD",
                "value": 906973
            },
            {
                "id": "MLI",
                "value": 174424
            },
            {
                "id": "MMR",
                "value": 121077
            },
            {
                "id": "MNE",
                "value": 287785
            },
            {
                "id": "MNG",
                "value": 195075
            },
            {
                "id": "MOZ",
                "value": 985894
            },
            {
                "id": "MRT",
                "value": 39814
            },
            {
                "id": "MWI",
                "value": 325053
            },
            {
                "id": "MYS",
                "value": 991159
            },
            {
                "id": "NAM",
                "value": 266471
            },
            {
                "id": "NCL",
                "value": 757733
            },
            {
                "id": "NER",
                "value": 231650
            },
            {
                "id": "NGA",
                "value": 129950
            },
            {
                "id": "NIC",
                "value": 954232
            },
            {
                "id": "NLD",
                "value": 861780
            },
            {
                "id": "NOR",
                "value": 173901
            },
            {
                "id": "NPL",
                "value": 953161
            },
            {
                "id": "NZL",
                "value": 743063
            },
            {
                "id": "OMN",
                "value": 779993
            },
            {
                "id": "PAK",
                "value": 663263
            },
            {
                "id": "PAN",
                "value": 914559
            },
            {
                "id": "PER",
                "value": 843531
            },
            {
                "id": "PHL",
                "value": 345277
            },
            {
                "id": "PNG",
                "value": 466347
            },
            {
                "id": "POL",
                "value": 738509
            },
            {
                "id": "PRI",
                "value": 56934
            },
            {
                "id": "PRT",
                "value": 158103
            },
            {
                "id": "PRY",
                "value": 114037
            },
            {
                "id": "QAT",
                "value": 102308
            },
            {
                "id": "ROU",
                "value": 860249
            },
            {
                "id": "RUS",
                "value": 174474
            },
            {
                "id": "RWA",
                "value": 15108
            },
            {
                "id": "ESH",
                "value": 443884
            },
            {
                "id": "SAU",
                "value": 450010
            },
            {
                "id": "SDN",
                "value": 580629
            },
            {
                "id": "SDS",
                "value": 46471
            },
            {
                "id": "SEN",
                "value": 977783
            },
            {
                "id": "SLB",
                "value": 630034
            },
            {
                "id": "SLE",
                "value": 117878
            },
            {
                "id": "SLV",
                "value": 100659
            },
            {
                "id": "ABV",
                "value": 820936
            },
            {
                "id": "SOM",
                "value": 848508
            },
            {
                "id": "SRB",
                "value": 251030
            },
            {
                "id": "SUR",
                "value": 298973
            },
            {
                "id": "SVK",
                "value": 88607
            },
            {
                "id": "SVN",
                "value": 989583
            },
            {
                "id": "SWZ",
                "value": 297839
            },
            {
                "id": "SYR",
                "value": 630867
            },
            {
                "id": "TCD",
                "value": 507812
            },
            {
                "id": "TGO",
                "value": 683387
            },
            {
                "id": "THA",
                "value": 291896
            },
            {
                "id": "TJK",
                "value": 706589
            },
            {
                "id": "TKM",
                "value": 488280
            },
            {
                "id": "TLS",
                "value": 851135
            },
            {
                "id": "TTO",
                "value": 214477
            },
            {
                "id": "TUN",
                "value": 4781
            },
            {
                "id": "TUR",
                "value": 517987
            },
            {
                "id": "TWN",
                "value": 636779
            },
            {
                "id": "TZA",
                "value": 554058
            },
            {
                "id": "UGA",
                "value": 363688
            },
            {
                "id": "UKR",
                "value": 898754
            },
            {
                "id": "URY",
                "value": 979498
            },
            {
                "id": "USA",
                "value": 609022
            },
            {
                "id": "UZB",
                "value": 766365
            },
            {
                "id": "VEN",
                "value": 654020
            },
            {
                "id": "VNM",
                "value": 896882
            },
            {
                "id": "VUT",
                "value": 683553
            },
            {
                "id": "PSE",
                "value": 158436
            },
            {
                "id": "YEM",
                "value": 78707
            },
            {
                "id": "ZAF",
                "value": 534353
            },
            {
                "id": "ZMB",
                "value": 329507
            },
            {
                "id": "ZWE",
                "value": 69307
            },
            {
                "id": "KOR",
                "value": 475839
            }
        ]
    },
    {
        scenario: "Scenario Y",
        data: [
            {
                "id": "AFG",
                "value": 79931
            },
            {
                "id": "AGO",
                "value": 339335
            },
            {
                "id": "ALB",
                "value": 794895
            },
            {
                "id": "ARE",
                "value": 172219
            },
            {
                "id": "ARG",
                "value": 242472
            },
            {
                "id": "ARM",
                "value": 164074
            },
            {
                "id": "ATA",
                "value": 584561
            },
            {
                "id": "ATF",
                "value": 288669
            },
            {
                "id": "AUT",
                "value": 823881
            },
            {
                "id": "AZE",
                "value": 108648
            },
            {
                "id": "BDI",
                "value": 520626
            },
            {
                "id": "BEL",
                "value": 871731
            },
            {
                "id": "BEN",
                "value": 514875
            },
            {
                "id": "BFA",
                "value": 188684
            },
            {
                "id": "BGD",
                "value": 459184
            },
            {
                "id": "BGR",
                "value": 432843
            },
            {
                "id": "BHS",
                "value": 935031
            },
            {
                "id": "BIH",
                "value": 716327
            },
            {
                "id": "BLR",
                "value": 758145
            },
            {
                "id": "BLZ",
                "value": 83355
            },
            {
                "id": "BOL",
                "value": 760712
            },
            {
                "id": "BRN",
                "value": 848684
            },
            {
                "id": "BTN",
                "value": 531938
            },
            {
                "id": "BWA",
                "value": 605955
            },
            {
                "id": "CAF",
                "value": 882626
            },
            {
                "id": "CAN",
                "value": 951001
            },
            {
                "id": "CHE",
                "value": 722811
            },
            {
                "id": "CHL",
                "value": 935475
            },
            {
                "id": "CHN",
                "value": 638126
            },
            {
                "id": "CIV",
                "value": 668650
            },
            {
                "id": "CMR",
                "value": 610831
            },
            {
                "id": "COG",
                "value": 801551
            },
            {
                "id": "COL",
                "value": 533756
            },
            {
                "id": "CRI",
                "value": 535141
            },
            {
                "id": "CUB",
                "value": 3887
            },
            {
                "id": "-99",
                "value": 622922
            },
            {
                "id": "CYP",
                "value": 786944
            },
            {
                "id": "CZE",
                "value": 917566
            },
            {
                "id": "DEU",
                "value": 661655
            },
            {
                "id": "DJI",
                "value": 106791
            },
            {
                "id": "DNK",
                "value": 345499
            },
            {
                "id": "DOM",
                "value": 772472
            },
            {
                "id": "DZA",
                "value": 945561
            },
            {
                "id": "ECU",
                "value": 440458
            },
            {
                "id": "EGY",
                "value": 985740
            },
            {
                "id": "ERI",
                "value": 629748
            },
            {
                "id": "ESP",
                "value": 886074
            },
            {
                "id": "EST",
                "value": 703483
            },
            {
                "id": "ETH",
                "value": 473591
            },
            {
                "id": "FIN",
                "value": 611143
            },
            {
                "id": "FJI",
                "value": 121817
            },
            {
                "id": "FLK",
                "value": 937830
            },
            {
                "id": "FRA",
                "value": 72746
            },
            {
                "id": "GAB",
                "value": 245000
            },
            {
                "id": "GBR",
                "value": 171893
            },
            {
                "id": "GEO",
                "value": 543077
            },
            {
                "id": "GHA",
                "value": 893564
            },
            {
                "id": "GIN",
                "value": 839919
            },
            {
                "id": "GMB",
                "value": 810171
            },
            {
                "id": "GNB",
                "value": 720456
            },
            {
                "id": "GNQ",
                "value": 879098
            },
            {
                "id": "GRC",
                "value": 242882
            },
            {
                "id": "GTM",
                "value": 451025
            },
            {
                "id": "GUY",
                "value": 304937
            },
            {
                "id": "HND",
                "value": 209205
            },
            {
                "id": "HRV",
                "value": 691316
            },
            {
                "id": "HTI",
                "value": 144929
            },
            {
                "id": "HUN",
                "value": 66635
            },
            {
                "id": "IDN",
                "value": 390772
            },
            {
                "id": "IND",
                "value": 816354
            },
            {
                "id": "IRL",
                "value": 218007
            },
            {
                "id": "IRN",
                "value": 637661
            },
            {
                "id": "IRQ",
                "value": 196125
            },
            {
                "id": "ISL",
                "value": 914365
            },
            {
                "id": "ISR",
                "value": 393174
            },
            {
                "id": "ITA",
                "value": 609447
            },
            {
                "id": "JAM",
                "value": 869842
            },
            {
                "id": "JOR",
                "value": 159993
            },
            {
                "id": "JPN",
                "value": 525769
            },
            {
                "id": "KAZ",
                "value": 246104
            },
            {
                "id": "KEN",
                "value": 705879
            },
            {
                "id": "KGZ",
                "value": 571725
            },
            {
                "id": "KHM",
                "value": 531549
            },
            {
                "id": "OSA",
                "value": 387021
            },
            {
                "id": "KWT",
                "value": 572621
            },
            {
                "id": "LAO",
                "value": 915936
            },
            {
                "id": "LBN",
                "value": 149175
            },
            {
                "id": "LBR",
                "value": 318258
            },
            {
                "id": "LBY",
                "value": 534254
            },
            {
                "id": "LKA",
                "value": 405978
            },
            {
                "id": "LSO",
                "value": 348738
            },
            {
                "id": "LTU",
                "value": 977253
            },
            {
                "id": "LUX",
                "value": 14671
            },
            {
                "id": "LVA",
                "value": 243801
            },
            {
                "id": "MAR",
                "value": 30817
            },
            {
                "id": "MDA",
                "value": 342082
            },
            {
                "id": "MDG",
                "value": 720400
            },
            {
                "id": "MEX",
                "value": 253084
            },
            {
                "id": "MKD",
                "value": 858859
            },
            {
                "id": "MLI",
                "value": 377691
            },
            {
                "id": "MMR",
                "value": 582015
            },
            {
                "id": "MNE",
                "value": 281942
            },
            {
                "id": "MNG",
                "value": 425292
            },
            {
                "id": "MOZ",
                "value": 431299
            },
            {
                "id": "MRT",
                "value": 158409
            },
            {
                "id": "MWI",
                "value": 469314
            },
            {
                "id": "MYS",
                "value": 943680
            },
            {
                "id": "NAM",
                "value": 164768
            },
            {
                "id": "NCL",
                "value": 953293
            },
            {
                "id": "NER",
                "value": 86825
            },
            {
                "id": "NGA",
                "value": 282677
            },
            {
                "id": "NIC",
                "value": 811503
            },
            {
                "id": "NLD",
                "value": 36642
            },
            {
                "id": "NOR",
                "value": 56141
            },
            {
                "id": "NPL",
                "value": 80455
            },
            {
                "id": "NZL",
                "value": 495439
            },
            {
                "id": "OMN",
                "value": 973906
            },
            {
                "id": "PAK",
                "value": 666144
            },
            {
                "id": "PAN",
                "value": 738307
            },
            {
                "id": "PER",
                "value": 45871
            },
            {
                "id": "PHL",
                "value": 169300
            },
            {
                "id": "PNG",
                "value": 988703
            },
            {
                "id": "POL",
                "value": 22003
            },
            {
                "id": "PRI",
                "value": 660519
            },
            {
                "id": "PRT",
                "value": 327868
            },
            {
                "id": "PRY",
                "value": 128439
            },
            {
                "id": "QAT",
                "value": 486857
            },
            {
                "id": "ROU",
                "value": 934380
            },
            {
                "id": "RUS",
                "value": 797875
            },
            {
                "id": "RWA",
                "value": 412945
            },
            {
                "id": "ESH",
                "value": 911210
            },
            {
                "id": "SAU",
                "value": 546322
            },
            {
                "id": "SDN",
                "value": 153624
            },
            {
                "id": "SDS",
                "value": 465871
            },
            {
                "id": "SEN",
                "value": 792691
            },
            {
                "id": "SLB",
                "value": 588660
            },
            {
                "id": "SLE",
                "value": 56670
            },
            {
                "id": "SLV",
                "value": 626812
            },
            {
                "id": "ABV",
                "value": 323485
            },
            {
                "id": "SOM",
                "value": 883995
            },
            {
                "id": "SRB",
                "value": 312087
            },
            {
                "id": "SUR",
                "value": 36559
            },
            {
                "id": "SVK",
                "value": 115363
            },
            {
                "id": "SVN",
                "value": 703331
            },
            {
                "id": "SWZ",
                "value": 101007
            },
            {
                "id": "SYR",
                "value": 923326
            },
            {
                "id": "TCD",
                "value": 702556
            },
            {
                "id": "TGO",
                "value": 599888
            },
            {
                "id": "THA",
                "value": 124992
            },
            {
                "id": "TJK",
                "value": 660972
            },
            {
                "id": "TKM",
                "value": 37253
            },
            {
                "id": "TLS",
                "value": 379807
            },
            {
                "id": "TTO",
                "value": 806521
            },
            {
                "id": "TUN",
                "value": 144975
            },
            {
                "id": "TUR",
                "value": 680783
            },
            {
                "id": "TWN",
                "value": 357625
            },
            {
                "id": "TZA",
                "value": 769706
            },
            {
                "id": "UGA",
                "value": 674843
            },
            {
                "id": "UKR",
                "value": 50225
            },
            {
                "id": "URY",
                "value": 292720
            },
            {
                "id": "USA",
                "value": 712847
            },
            {
                "id": "UZB",
                "value": 889290
            },
            {
                "id": "VEN",
                "value": 408127
            },
            {
                "id": "VNM",
                "value": 131552
            },
            {
                "id": "VUT",
                "value": 677478
            },
            {
                "id": "PSE",
                "value": 201226
            },
            {
                "id": "YEM",
                "value": 83139
            },
            {
                "id": "ZAF",
                "value": 531811
            },
            {
                "id": "ZMB",
                "value": 585615
            },
            {
                "id": "ZWE",
                "value": 523159
            },
            {
                "id": "KOR",
                "value": 552154
            }
        ]
    },
    {
        scenario: "1.5 Degrees",
        data: [
            {
                "id": "AFG",
                "value": 468042
            },
            {
                "id": "AGO",
                "value": 940583
            },
            {
                "id": "ALB",
                "value": 732070
            },
            {
                "id": "ARE",
                "value": 40678
            },
            {
                "id": "ARG",
                "value": 212535
            },
            {
                "id": "ARM",
                "value": 951451
            },
            {
                "id": "ATA",
                "value": 419189
            },
            {
                "id": "ATF",
                "value": 76210
            },
            {
                "id": "AUT",
                "value": 589102
            },
            {
                "id": "AZE",
                "value": 381091
            },
            {
                "id": "BDI",
                "value": 730136
            },
            {
                "id": "BEL",
                "value": 956031
            },
            {
                "id": "BEN",
                "value": 680103
            },
            {
                "id": "BFA",
                "value": 212904
            },
            {
                "id": "BGD",
                "value": 94228
            },
            {
                "id": "BGR",
                "value": 841174
            },
            {
                "id": "BHS",
                "value": 585295
            },
            {
                "id": "BIH",
                "value": 464519
            },
            {
                "id": "BLR",
                "value": 110261
            },
            {
                "id": "BLZ",
                "value": 555708
            },
            {
                "id": "BOL",
                "value": 48682
            },
            {
                "id": "BRN",
                "value": 373350
            },
            {
                "id": "BTN",
                "value": 710651
            },
            {
                "id": "BWA",
                "value": 214495
            },
            {
                "id": "CAF",
                "value": 789628
            },
            {
                "id": "CAN",
                "value": 915967
            },
            {
                "id": "CHE",
                "value": 881728
            },
            {
                "id": "CHL",
                "value": 430214
            },
            {
                "id": "CHN",
                "value": 105734
            },
            {
                "id": "CIV",
                "value": 184913
            },
            {
                "id": "CMR",
                "value": 782283
            },
            {
                "id": "COG",
                "value": 630747
            },
            {
                "id": "COL",
                "value": 357938
            },
            {
                "id": "CRI",
                "value": 909081
            },
            {
                "id": "CUB",
                "value": 720756
            },
            {
                "id": "-99",
                "value": 551861
            },
            {
                "id": "CYP",
                "value": 981961
            },
            {
                "id": "CZE",
                "value": 838067
            },
            {
                "id": "DEU",
                "value": 100787
            },
            {
                "id": "DJI",
                "value": 192612
            },
            {
                "id": "DNK",
                "value": 647704
            },
            {
                "id": "DOM",
                "value": 812505
            },
            {
                "id": "DZA",
                "value": 833450
            },
            {
                "id": "ECU",
                "value": 248166
            },
            {
                "id": "EGY",
                "value": 682170
            },
            {
                "id": "ERI",
                "value": 161079
            },
            {
                "id": "ESP",
                "value": 139235
            },
            {
                "id": "EST",
                "value": 985037
            },
            {
                "id": "ETH",
                "value": 127340
            },
            {
                "id": "FIN",
                "value": 574431
            },
            {
                "id": "FJI",
                "value": 862098
            },
            {
                "id": "FLK",
                "value": 725705
            },
            {
                "id": "FRA",
                "value": 901154
            },
            {
                "id": "GAB",
                "value": 629419
            },
            {
                "id": "GBR",
                "value": 859024
            },
            {
                "id": "GEO",
                "value": 678621
            },
            {
                "id": "GHA",
                "value": 167613
            },
            {
                "id": "GIN",
                "value": 953796
            },
            {
                "id": "GMB",
                "value": 427584
            },
            {
                "id": "GNB",
                "value": 308700
            },
            {
                "id": "GNQ",
                "value": 851353
            },
            {
                "id": "GRC",
                "value": 74819
            },
            {
                "id": "GTM",
                "value": 422243
            },
            {
                "id": "GUY",
                "value": 858471
            },
            {
                "id": "HND",
                "value": 609840
            },
            {
                "id": "HRV",
                "value": 60130
            },
            {
                "id": "HTI",
                "value": 298670
            },
            {
                "id": "HUN",
                "value": 240654
            },
            {
                "id": "IDN",
                "value": 141319
            },
            {
                "id": "IND",
                "value": 680707
            },
            {
                "id": "IRL",
                "value": 53375
            },
            {
                "id": "IRN",
                "value": 443713
            },
            {
                "id": "IRQ",
                "value": 803343
            },
            {
                "id": "ISL",
                "value": 859837
            },
            {
                "id": "ISR",
                "value": 738318
            },
            {
                "id": "ITA",
                "value": 477087
            },
            {
                "id": "JAM",
                "value": 679789
            },
            {
                "id": "JOR",
                "value": 962743
            },
            {
                "id": "JPN",
                "value": 758263
            },
            {
                "id": "KAZ",
                "value": 753336
            },
            {
                "id": "KEN",
                "value": 771013
            },
            {
                "id": "KGZ",
                "value": 250873
            },
            {
                "id": "KHM",
                "value": 110133
            },
            {
                "id": "OSA",
                "value": 405855
            },
            {
                "id": "KWT",
                "value": 130088
            },
            {
                "id": "LAO",
                "value": 897429
            },
            {
                "id": "LBN",
                "value": 645252
            },
            {
                "id": "LBR",
                "value": 620197
            },
            {
                "id": "LBY",
                "value": 465501
            },
            {
                "id": "LKA",
                "value": 783543
            },
            {
                "id": "LSO",
                "value": 151693
            },
            {
                "id": "LTU",
                "value": 445287
            },
            {
                "id": "LUX",
                "value": 748572
            },
            {
                "id": "LVA",
                "value": 656450
            },
            {
                "id": "MAR",
                "value": 193518
            },
            {
                "id": "MDA",
                "value": 872310
            },
            {
                "id": "MDG",
                "value": 500746
            },
            {
                "id": "MEX",
                "value": 35505
            },
            {
                "id": "MKD",
                "value": 683101
            },
            {
                "id": "MLI",
                "value": 448542
            },
            {
                "id": "MMR",
                "value": 766993
            },
            {
                "id": "MNE",
                "value": 195497
            },
            {
                "id": "MNG",
                "value": 771089
            },
            {
                "id": "MOZ",
                "value": 166845
            },
            {
                "id": "MRT",
                "value": 447674
            },
            {
                "id": "MWI",
                "value": 992723
            },
            {
                "id": "MYS",
                "value": 791147
            },
            {
                "id": "NAM",
                "value": 628934
            },
            {
                "id": "NCL",
                "value": 551104
            },
            {
                "id": "NER",
                "value": 719990
            },
            {
                "id": "NGA",
                "value": 841805
            },
            {
                "id": "NIC",
                "value": 40109
            },
            {
                "id": "NLD",
                "value": 799275
            },
            {
                "id": "NOR",
                "value": 156747
            },
            {
                "id": "NPL",
                "value": 591921
            },
            {
                "id": "NZL",
                "value": 261874
            },
            {
                "id": "OMN",
                "value": 875705
            },
            {
                "id": "PAK",
                "value": 25307
            },
            {
                "id": "PAN",
                "value": 40277
            },
            {
                "id": "PER",
                "value": 537199
            },
            {
                "id": "PHL",
                "value": 218063
            },
            {
                "id": "PNG",
                "value": 215535
            },
            {
                "id": "POL",
                "value": 478860
            },
            {
                "id": "PRI",
                "value": 42946
            },
            {
                "id": "PRT",
                "value": 642580
            },
            {
                "id": "PRY",
                "value": 767921
            },
            {
                "id": "QAT",
                "value": 175723
            },
            {
                "id": "ROU",
                "value": 256291
            },
            {
                "id": "RUS",
                "value": 114680
            },
            {
                "id": "RWA",
                "value": 157022
            },
            {
                "id": "ESH",
                "value": 480495
            },
            {
                "id": "SAU",
                "value": 776009
            },
            {
                "id": "SDN",
                "value": 3367
            },
            {
                "id": "SDS",
                "value": 398220
            },
            {
                "id": "SEN",
                "value": 299706
            },
            {
                "id": "SLB",
                "value": 999594
            },
            {
                "id": "SLE",
                "value": 815551
            },
            {
                "id": "SLV",
                "value": 87834
            },
            {
                "id": "ABV",
                "value": 137454
            },
            {
                "id": "SOM",
                "value": 20172
            },
            {
                "id": "SRB",
                "value": 706179
            },
            {
                "id": "SUR",
                "value": 150700
            },
            {
                "id": "SVK",
                "value": 199777
            },
            {
                "id": "SVN",
                "value": 24126
            },
            {
                "id": "SWZ",
                "value": 307384
            },
            {
                "id": "SYR",
                "value": 255644
            },
            {
                "id": "TCD",
                "value": 31718
            },
            {
                "id": "TGO",
                "value": 523567
            },
            {
                "id": "THA",
                "value": 45072
            },
            {
                "id": "TJK",
                "value": 37368
            },
            {
                "id": "TKM",
                "value": 621314
            },
            {
                "id": "TLS",
                "value": 287060
            },
            {
                "id": "TTO",
                "value": 661086
            },
            {
                "id": "TUN",
                "value": 343700
            },
            {
                "id": "TUR",
                "value": 504109
            },
            {
                "id": "TWN",
                "value": 186818
            },
            {
                "id": "TZA",
                "value": 960756
            },
            {
                "id": "UGA",
                "value": 406806
            },
            {
                "id": "UKR",
                "value": 604327
            },
            {
                "id": "URY",
                "value": 993771
            },
            {
                "id": "USA",
                "value": 649583
            },
            {
                "id": "UZB",
                "value": 482191
            },
            {
                "id": "VEN",
                "value": 598358
            },
            {
                "id": "VNM",
                "value": 680242
            },
            {
                "id": "VUT",
                "value": 893951
            },
            {
                "id": "PSE",
                "value": 984286
            },
            {
                "id": "YEM",
                "value": 915556
            },
            {
                "id": "ZAF",
                "value": 501674
            },
            {
                "id": "ZMB",
                "value": 915098
            },
            {
                "id": "ZWE",
                "value": 741160
            },
            {
                "id": "KOR",
                "value": 851725
            }
        ]
    },
    {
        scenario: "2.0 Degrees",
        data: [
            {
                "id": "AFG",
                "value": 322734
            },
            {
                "id": "AGO",
                "value": 203987
            },
            {
                "id": "ALB",
                "value": 789417
            },
            {
                "id": "ARE",
                "value": 420459
            },
            {
                "id": "ARG",
                "value": 403986
            },
            {
                "id": "ARM",
                "value": 592192
            },
            {
                "id": "ATA",
                "value": 397023
            },
            {
                "id": "ATF",
                "value": 333838
            },
            {
                "id": "AUT",
                "value": 425304
            },
            {
                "id": "AZE",
                "value": 821735
            },
            {
                "id": "BDI",
                "value": 939626
            },
            {
                "id": "BEL",
                "value": 803480
            },
            {
                "id": "BEN",
                "value": 829217
            },
            {
                "id": "BFA",
                "value": 534815
            },
            {
                "id": "BGD",
                "value": 745783
            },
            {
                "id": "BGR",
                "value": 988724
            },
            {
                "id": "BHS",
                "value": 782564
            },
            {
                "id": "BIH",
                "value": 744083
            },
            {
                "id": "BLR",
                "value": 680962
            },
            {
                "id": "BLZ",
                "value": 98392
            },
            {
                "id": "BOL",
                "value": 79331
            },
            {
                "id": "BRN",
                "value": 476329
            },
            {
                "id": "BTN",
                "value": 131659
            },
            {
                "id": "BWA",
                "value": 405174
            },
            {
                "id": "CAF",
                "value": 155129
            },
            {
                "id": "CAN",
                "value": 920083
            },
            {
                "id": "CHE",
                "value": 229892
            },
            {
                "id": "CHL",
                "value": 123566
            },
            {
                "id": "CHN",
                "value": 52209
            },
            {
                "id": "CIV",
                "value": 642303
            },
            {
                "id": "CMR",
                "value": 93044
            },
            {
                "id": "COG",
                "value": 330013
            },
            {
                "id": "COL",
                "value": 331248
            },
            {
                "id": "CRI",
                "value": 276814
            },
            {
                "id": "CUB",
                "value": 201256
            },
            {
                "id": "-99",
                "value": 31593
            },
            {
                "id": "CYP",
                "value": 236373
            },
            {
                "id": "CZE",
                "value": 388831
            },
            {
                "id": "DEU",
                "value": 807716
            },
            {
                "id": "DJI",
                "value": 706713
            },
            {
                "id": "DNK",
                "value": 363876
            },
            {
                "id": "DOM",
                "value": 453953
            },
            {
                "id": "DZA",
                "value": 949698
            },
            {
                "id": "ECU",
                "value": 289739
            },
            {
                "id": "EGY",
                "value": 264293
            },
            {
                "id": "ERI",
                "value": 164876
            },
            {
                "id": "ESP",
                "value": 266992
            },
            {
                "id": "EST",
                "value": 550936
            },
            {
                "id": "ETH",
                "value": 166338
            },
            {
                "id": "FIN",
                "value": 394661
            },
            {
                "id": "FJI",
                "value": 741405
            },
            {
                "id": "FLK",
                "value": 736967
            },
            {
                "id": "FRA",
                "value": 384882
            },
            {
                "id": "GAB",
                "value": 51801
            },
            {
                "id": "GBR",
                "value": 628497
            },
            {
                "id": "GEO",
                "value": 155618
            },
            {
                "id": "GHA",
                "value": 164623
            },
            {
                "id": "GIN",
                "value": 527350
            },
            {
                "id": "GMB",
                "value": 496258
            },
            {
                "id": "GNB",
                "value": 289698
            },
            {
                "id": "GNQ",
                "value": 921228
            },
            {
                "id": "GRC",
                "value": 5192
            },
            {
                "id": "GTM",
                "value": 838344
            },
            {
                "id": "GUY",
                "value": 532645
            },
            {
                "id": "HND",
                "value": 318918
            },
            {
                "id": "HRV",
                "value": 946747
            },
            {
                "id": "HTI",
                "value": 807501
            },
            {
                "id": "HUN",
                "value": 599071
            },
            {
                "id": "IDN",
                "value": 700426
            },
            {
                "id": "IND",
                "value": 275129
            },
            {
                "id": "IRL",
                "value": 968651
            },
            {
                "id": "IRN",
                "value": 370770
            },
            {
                "id": "IRQ",
                "value": 183667
            },
            {
                "id": "ISL",
                "value": 432782
            },
            {
                "id": "ISR",
                "value": 208278
            },
            {
                "id": "ITA",
                "value": 606766
            },
            {
                "id": "JAM",
                "value": 693525
            },
            {
                "id": "JOR",
                "value": 146622
            },
            {
                "id": "JPN",
                "value": 915193
            },
            {
                "id": "KAZ",
                "value": 517608
            },
            {
                "id": "KEN",
                "value": 968704
            },
            {
                "id": "KGZ",
                "value": 983437
            },
            {
                "id": "KHM",
                "value": 320636
            },
            {
                "id": "OSA",
                "value": 271540
            },
            {
                "id": "KWT",
                "value": 831037
            },
            {
                "id": "LAO",
                "value": 764604
            },
            {
                "id": "LBN",
                "value": 420959
            },
            {
                "id": "LBR",
                "value": 762814
            },
            {
                "id": "LBY",
                "value": 669960
            },
            {
                "id": "LKA",
                "value": 229196
            },
            {
                "id": "LSO",
                "value": 869103
            },
            {
                "id": "LTU",
                "value": 469104
            },
            {
                "id": "LUX",
                "value": 17489
            },
            {
                "id": "LVA",
                "value": 639052
            },
            {
                "id": "MAR",
                "value": 498539
            },
            {
                "id": "MDA",
                "value": 933381
            },
            {
                "id": "MDG",
                "value": 738629
            },
            {
                "id": "MEX",
                "value": 599516
            },
            {
                "id": "MKD",
                "value": 46855
            },
            {
                "id": "MLI",
                "value": 153313
            },
            {
                "id": "MMR",
                "value": 517461
            },
            {
                "id": "MNE",
                "value": 779045
            },
            {
                "id": "MNG",
                "value": 311743
            },
            {
                "id": "MOZ",
                "value": 74130
            },
            {
                "id": "MRT",
                "value": 659509
            },
            {
                "id": "MWI",
                "value": 738184
            },
            {
                "id": "MYS",
                "value": 287698
            },
            {
                "id": "NAM",
                "value": 66776
            },
            {
                "id": "NCL",
                "value": 445031
            },
            {
                "id": "NER",
                "value": 833912
            },
            {
                "id": "NGA",
                "value": 960304
            },
            {
                "id": "NIC",
                "value": 792623
            },
            {
                "id": "NLD",
                "value": 636909
            },
            {
                "id": "NOR",
                "value": 246129
            },
            {
                "id": "NPL",
                "value": 437092
            },
            {
                "id": "NZL",
                "value": 878272
            },
            {
                "id": "OMN",
                "value": 568284
            },
            {
                "id": "PAK",
                "value": 911487
            },
            {
                "id": "PAN",
                "value": 618343
            },
            {
                "id": "PER",
                "value": 524686
            },
            {
                "id": "PHL",
                "value": 455446
            },
            {
                "id": "PNG",
                "value": 394107
            },
            {
                "id": "POL",
                "value": 248648
            },
            {
                "id": "PRI",
                "value": 212378
            },
            {
                "id": "PRT",
                "value": 284992
            },
            {
                "id": "PRY",
                "value": 452876
            },
            {
                "id": "QAT",
                "value": 521599
            },
            {
                "id": "ROU",
                "value": 939745
            },
            {
                "id": "RUS",
                "value": 156471
            },
            {
                "id": "RWA",
                "value": 2527
            },
            {
                "id": "ESH",
                "value": 68118
            },
            {
                "id": "SAU",
                "value": 998155
            },
            {
                "id": "SDN",
                "value": 888636
            },
            {
                "id": "SDS",
                "value": 233497
            },
            {
                "id": "SEN",
                "value": 286653
            },
            {
                "id": "SLB",
                "value": 928354
            },
            {
                "id": "SLE",
                "value": 751212
            },
            {
                "id": "SLV",
                "value": 796869
            },
            {
                "id": "ABV",
                "value": 631470
            },
            {
                "id": "SOM",
                "value": 584824
            },
            {
                "id": "SRB",
                "value": 537664
            },
            {
                "id": "SUR",
                "value": 739748
            },
            {
                "id": "SVK",
                "value": 429303
            },
            {
                "id": "SVN",
                "value": 416559
            },
            {
                "id": "SWZ",
                "value": 388783
            },
            {
                "id": "SYR",
                "value": 638589
            },
            {
                "id": "TCD",
                "value": 988003
            },
            {
                "id": "TGO",
                "value": 620671
            },
            {
                "id": "THA",
                "value": 342659
            },
            {
                "id": "TJK",
                "value": 329981
            },
            {
                "id": "TKM",
                "value": 605580
            },
            {
                "id": "TLS",
                "value": 887001
            },
            {
                "id": "TTO",
                "value": 365891
            },
            {
                "id": "TUN",
                "value": 564132
            },
            {
                "id": "TUR",
                "value": 170809
            },
            {
                "id": "TWN",
                "value": 553939
            },
            {
                "id": "TZA",
                "value": 509174
            },
            {
                "id": "UGA",
                "value": 343977
            },
            {
                "id": "UKR",
                "value": 376244
            },
            {
                "id": "URY",
                "value": 684781
            },
            {
                "id": "USA",
                "value": 164061
            },
            {
                "id": "UZB",
                "value": 58796
            },
            {
                "id": "VEN",
                "value": 683111
            },
            {
                "id": "VNM",
                "value": 732358
            },
            {
                "id": "VUT",
                "value": 598304
            },
            {
                "id": "PSE",
                "value": 883510
            },
            {
                "id": "YEM",
                "value": 817692
            },
            {
                "id": "ZAF",
                "value": 354508
            },
            {
                "id": "ZMB",
                "value": 177904
            },
            {
                "id": "ZWE",
                "value": 441832
            },
            {
                "id": "KOR",
                "value": 585335
            }
        ]
    },
    {
        scenario: "2.5 Degrees",
        data: [
            {
                "id": "AFG",
                "value": 331291
            },
            {
                "id": "AGO",
                "value": 191969
            },
            {
                "id": "ALB",
                "value": 263122
            },
            {
                "id": "ARE",
                "value": 877898
            },
            {
                "id": "ARG",
                "value": 954274
            },
            {
                "id": "ARM",
                "value": 369675
            },
            {
                "id": "ATA",
                "value": 186733
            },
            {
                "id": "ATF",
                "value": 96370
            },
            {
                "id": "AUT",
                "value": 25194
            },
            {
                "id": "AZE",
                "value": 890850
            },
            {
                "id": "BDI",
                "value": 922093
            },
            {
                "id": "BEL",
                "value": 202117
            },
            {
                "id": "BEN",
                "value": 126874
            },
            {
                "id": "BFA",
                "value": 639142
            },
            {
                "id": "BGD",
                "value": 41202
            },
            {
                "id": "BGR",
                "value": 366898
            },
            {
                "id": "BHS",
                "value": 871451
            },
            {
                "id": "BIH",
                "value": 111029
            },
            {
                "id": "BLR",
                "value": 340931
            },
            {
                "id": "BLZ",
                "value": 548026
            },
            {
                "id": "BOL",
                "value": 776704
            },
            {
                "id": "BRN",
                "value": 563940
            },
            {
                "id": "BTN",
                "value": 484268
            },
            {
                "id": "BWA",
                "value": 644003
            },
            {
                "id": "CAF",
                "value": 334620
            },
            {
                "id": "CAN",
                "value": 254106
            },
            {
                "id": "CHE",
                "value": 440695
            },
            {
                "id": "CHL",
                "value": 555768
            },
            {
                "id": "CHN",
                "value": 99123
            },
            {
                "id": "CIV",
                "value": 898303
            },
            {
                "id": "CMR",
                "value": 189769
            },
            {
                "id": "COG",
                "value": 687362
            },
            {
                "id": "COL",
                "value": 549093
            },
            {
                "id": "CRI",
                "value": 143903
            },
            {
                "id": "CUB",
                "value": 804019
            },
            {
                "id": "-99",
                "value": 572221
            },
            {
                "id": "CYP",
                "value": 543808
            },
            {
                "id": "CZE",
                "value": 389351
            },
            {
                "id": "DEU",
                "value": 296762
            },
            {
                "id": "DJI",
                "value": 226409
            },
            {
                "id": "DNK",
                "value": 867539
            },
            {
                "id": "DOM",
                "value": 331719
            },
            {
                "id": "DZA",
                "value": 686965
            },
            {
                "id": "ECU",
                "value": 962141
            },
            {
                "id": "EGY",
                "value": 762693
            },
            {
                "id": "ERI",
                "value": 261776
            },
            {
                "id": "ESP",
                "value": 633343
            },
            {
                "id": "EST",
                "value": 361834
            },
            {
                "id": "ETH",
                "value": 229017
            },
            {
                "id": "FIN",
                "value": 403922
            },
            {
                "id": "FJI",
                "value": 981407
            },
            {
                "id": "FLK",
                "value": 615008
            },
            {
                "id": "FRA",
                "value": 159980
            },
            {
                "id": "GAB",
                "value": 13565
            },
            {
                "id": "GBR",
                "value": 817134
            },
            {
                "id": "GEO",
                "value": 122055
            },
            {
                "id": "GHA",
                "value": 441194
            },
            {
                "id": "GIN",
                "value": 748852
            },
            {
                "id": "GMB",
                "value": 859128
            },
            {
                "id": "GNB",
                "value": 202667
            },
            {
                "id": "GNQ",
                "value": 847143
            },
            {
                "id": "GRC",
                "value": 330645
            },
            {
                "id": "GTM",
                "value": 988432
            },
            {
                "id": "GUY",
                "value": 636724
            },
            {
                "id": "HND",
                "value": 239258
            },
            {
                "id": "HRV",
                "value": 986233
            },
            {
                "id": "HTI",
                "value": 83454
            },
            {
                "id": "HUN",
                "value": 514726
            },
            {
                "id": "IDN",
                "value": 472877
            },
            {
                "id": "IND",
                "value": 170518
            },
            {
                "id": "IRL",
                "value": 131412
            },
            {
                "id": "IRN",
                "value": 684732
            },
            {
                "id": "IRQ",
                "value": 525388
            },
            {
                "id": "ISL",
                "value": 978356
            },
            {
                "id": "ISR",
                "value": 577835
            },
            {
                "id": "ITA",
                "value": 44400
            },
            {
                "id": "JAM",
                "value": 428465
            },
            {
                "id": "JOR",
                "value": 731456
            },
            {
                "id": "JPN",
                "value": 17458
            },
            {
                "id": "KAZ",
                "value": 681668
            },
            {
                "id": "KEN",
                "value": 885375
            },
            {
                "id": "KGZ",
                "value": 82318
            },
            {
                "id": "KHM",
                "value": 569025
            },
            {
                "id": "OSA",
                "value": 947162
            },
            {
                "id": "KWT",
                "value": 829233
            },
            {
                "id": "LAO",
                "value": 314205
            },
            {
                "id": "LBN",
                "value": 2785
            },
            {
                "id": "LBR",
                "value": 392117
            },
            {
                "id": "LBY",
                "value": 138415
            },
            {
                "id": "LKA",
                "value": 951416
            },
            {
                "id": "LSO",
                "value": 273290
            },
            {
                "id": "LTU",
                "value": 902141
            },
            {
                "id": "LUX",
                "value": 569657
            },
            {
                "id": "LVA",
                "value": 15214
            },
            {
                "id": "MAR",
                "value": 903836
            },
            {
                "id": "MDA",
                "value": 949758
            },
            {
                "id": "MDG",
                "value": 145378
            },
            {
                "id": "MEX",
                "value": 577239
            },
            {
                "id": "MKD",
                "value": 257638
            },
            {
                "id": "MLI",
                "value": 872062
            },
            {
                "id": "MMR",
                "value": 109285
            },
            {
                "id": "MNE",
                "value": 264246
            },
            {
                "id": "MNG",
                "value": 427433
            },
            {
                "id": "MOZ",
                "value": 581100
            },
            {
                "id": "MRT",
                "value": 142987
            },
            {
                "id": "MWI",
                "value": 562461
            },
            {
                "id": "MYS",
                "value": 761658
            },
            {
                "id": "NAM",
                "value": 458486
            },
            {
                "id": "NCL",
                "value": 398780
            },
            {
                "id": "NER",
                "value": 343292
            },
            {
                "id": "NGA",
                "value": 318614
            },
            {
                "id": "NIC",
                "value": 361626
            },
            {
                "id": "NLD",
                "value": 167585
            },
            {
                "id": "NOR",
                "value": 288507
            },
            {
                "id": "NPL",
                "value": 739615
            },
            {
                "id": "NZL",
                "value": 76113
            },
            {
                "id": "OMN",
                "value": 365818
            },
            {
                "id": "PAK",
                "value": 345359
            },
            {
                "id": "PAN",
                "value": 743897
            },
            {
                "id": "PER",
                "value": 333519
            },
            {
                "id": "PHL",
                "value": 90976
            },
            {
                "id": "PNG",
                "value": 146022
            },
            {
                "id": "POL",
                "value": 277933
            },
            {
                "id": "PRI",
                "value": 247016
            },
            {
                "id": "PRT",
                "value": 898037
            },
            {
                "id": "PRY",
                "value": 709766
            },
            {
                "id": "QAT",
                "value": 748185
            },
            {
                "id": "ROU",
                "value": 154810
            },
            {
                "id": "RUS",
                "value": 100823
            },
            {
                "id": "RWA",
                "value": 819369
            },
            {
                "id": "ESH",
                "value": 705868
            },
            {
                "id": "SAU",
                "value": 374754
            },
            {
                "id": "SDN",
                "value": 936368
            },
            {
                "id": "SDS",
                "value": 238617
            },
            {
                "id": "SEN",
                "value": 98550
            },
            {
                "id": "SLB",
                "value": 202268
            },
            {
                "id": "SLE",
                "value": 307533
            },
            {
                "id": "SLV",
                "value": 165561
            },
            {
                "id": "ABV",
                "value": 869562
            },
            {
                "id": "SOM",
                "value": 873894
            },
            {
                "id": "SRB",
                "value": 628125
            },
            {
                "id": "SUR",
                "value": 320482
            },
            {
                "id": "SVK",
                "value": 261788
            },
            {
                "id": "SVN",
                "value": 967986
            },
            {
                "id": "SWZ",
                "value": 907657
            },
            {
                "id": "SYR",
                "value": 793118
            },
            {
                "id": "TCD",
                "value": 283226
            },
            {
                "id": "TGO",
                "value": 855037
            },
            {
                "id": "THA",
                "value": 102951
            },
            {
                "id": "TJK",
                "value": 552158
            },
            {
                "id": "TKM",
                "value": 337123
            },
            {
                "id": "TLS",
                "value": 760282
            },
            {
                "id": "TTO",
                "value": 171299
            },
            {
                "id": "TUN",
                "value": 728482
            },
            {
                "id": "TUR",
                "value": 529580
            },
            {
                "id": "TWN",
                "value": 998687
            },
            {
                "id": "TZA",
                "value": 154902
            },
            {
                "id": "UGA",
                "value": 388955
            },
            {
                "id": "UKR",
                "value": 988585
            },
            {
                "id": "URY",
                "value": 622653
            },
            {
                "id": "USA",
                "value": 228504
            },
            {
                "id": "UZB",
                "value": 93322
            },
            {
                "id": "VEN",
                "value": 470153
            },
            {
                "id": "VNM",
                "value": 240106
            },
            {
                "id": "VUT",
                "value": 401809
            },
            {
                "id": "PSE",
                "value": 597661
            },
            {
                "id": "YEM",
                "value": 549666
            },
            {
                "id": "ZAF",
                "value": 44409
            },
            {
                "id": "ZMB",
                "value": 128958
            },
            {
                "id": "ZWE",
                "value": 59659
            },
            {
                "id": "KOR",
                "value": 546115
            }
        ]
    },
    {
        scenario: "3.0 Degrees",
        data: [
            {
                "id": "AFG",
                "value": 858592
            },
            {
                "id": "AGO",
                "value": 26165
            },
            {
                "id": "ALB",
                "value": 323342
            },
            {
                "id": "ARE",
                "value": 840998
            },
            {
                "id": "ARG",
                "value": 225371
            },
            {
                "id": "ARM",
                "value": 832394
            },
            {
                "id": "ATA",
                "value": 196644
            },
            {
                "id": "ATF",
                "value": 883093
            },
            {
                "id": "AUT",
                "value": 963793
            },
            {
                "id": "AZE",
                "value": 44668
            },
            {
                "id": "BDI",
                "value": 869502
            },
            {
                "id": "BEL",
                "value": 576175
            },
            {
                "id": "BEN",
                "value": 181221
            },
            {
                "id": "BFA",
                "value": 214444
            },
            {
                "id": "BGD",
                "value": 710535
            },
            {
                "id": "BGR",
                "value": 634189
            },
            {
                "id": "BHS",
                "value": 73088
            },
            {
                "id": "BIH",
                "value": 467511
            },
            {
                "id": "BLR",
                "value": 630352
            },
            {
                "id": "BLZ",
                "value": 731708
            },
            {
                "id": "BOL",
                "value": 601276
            },
            {
                "id": "BRN",
                "value": 773862
            },
            {
                "id": "BTN",
                "value": 772278
            },
            {
                "id": "BWA",
                "value": 234265
            },
            {
                "id": "CAF",
                "value": 577452
            },
            {
                "id": "CAN",
                "value": 365116
            },
            {
                "id": "CHE",
                "value": 535785
            },
            {
                "id": "CHL",
                "value": 274671
            },
            {
                "id": "CHN",
                "value": 559984
            },
            {
                "id": "CIV",
                "value": 425925
            },
            {
                "id": "CMR",
                "value": 305827
            },
            {
                "id": "COG",
                "value": 359059
            },
            {
                "id": "COL",
                "value": 726407
            },
            {
                "id": "CRI",
                "value": 617402
            },
            {
                "id": "CUB",
                "value": 43038
            },
            {
                "id": "-99",
                "value": 642672
            },
            {
                "id": "CYP",
                "value": 766849
            },
            {
                "id": "CZE",
                "value": 802874
            },
            {
                "id": "DEU",
                "value": 202299
            },
            {
                "id": "DJI",
                "value": 718318
            },
            {
                "id": "DNK",
                "value": 795058
            },
            {
                "id": "DOM",
                "value": 71766
            },
            {
                "id": "DZA",
                "value": 9492
            },
            {
                "id": "ECU",
                "value": 191466
            },
            {
                "id": "EGY",
                "value": 941100
            },
            {
                "id": "ERI",
                "value": 933002
            },
            {
                "id": "ESP",
                "value": 991830
            },
            {
                "id": "EST",
                "value": 409534
            },
            {
                "id": "ETH",
                "value": 54504
            },
            {
                "id": "FIN",
                "value": 417653
            },
            {
                "id": "FJI",
                "value": 418914
            },
            {
                "id": "FLK",
                "value": 560631
            },
            {
                "id": "FRA",
                "value": 361939
            },
            {
                "id": "GAB",
                "value": 390779
            },
            {
                "id": "GBR",
                "value": 944155
            },
            {
                "id": "GEO",
                "value": 778211
            },
            {
                "id": "GHA",
                "value": 316630
            },
            {
                "id": "GIN",
                "value": 975679
            },
            {
                "id": "GMB",
                "value": 149377
            },
            {
                "id": "GNB",
                "value": 304098
            },
            {
                "id": "GNQ",
                "value": 762843
            },
            {
                "id": "GRC",
                "value": 9494
            },
            {
                "id": "GTM",
                "value": 167405
            },
            {
                "id": "GUY",
                "value": 445759
            },
            {
                "id": "HND",
                "value": 297962
            },
            {
                "id": "HRV",
                "value": 418625
            },
            {
                "id": "HTI",
                "value": 142084
            },
            {
                "id": "HUN",
                "value": 538713
            },
            {
                "id": "IDN",
                "value": 721405
            },
            {
                "id": "IND",
                "value": 216052
            },
            {
                "id": "IRL",
                "value": 330559
            },
            {
                "id": "IRN",
                "value": 61785
            },
            {
                "id": "IRQ",
                "value": 639741
            },
            {
                "id": "ISL",
                "value": 308771
            },
            {
                "id": "ISR",
                "value": 163065
            },
            {
                "id": "ITA",
                "value": 953621
            },
            {
                "id": "JAM",
                "value": 290907
            },
            {
                "id": "JOR",
                "value": 827442
            },
            {
                "id": "JPN",
                "value": 59649
            },
            {
                "id": "KAZ",
                "value": 119167
            },
            {
                "id": "KEN",
                "value": 800891
            },
            {
                "id": "KGZ",
                "value": 479581
            },
            {
                "id": "KHM",
                "value": 126077
            },
            {
                "id": "OSA",
                "value": 396410
            },
            {
                "id": "KWT",
                "value": 737166
            },
            {
                "id": "LAO",
                "value": 314188
            },
            {
                "id": "LBN",
                "value": 5733
            },
            {
                "id": "LBR",
                "value": 986113
            },
            {
                "id": "LBY",
                "value": 907498
            },
            {
                "id": "LKA",
                "value": 940712
            },
            {
                "id": "LSO",
                "value": 447601
            },
            {
                "id": "LTU",
                "value": 799329
            },
            {
                "id": "LUX",
                "value": 327441
            },
            {
                "id": "LVA",
                "value": 940469
            },
            {
                "id": "MAR",
                "value": 862959
            },
            {
                "id": "MDA",
                "value": 48036
            },
            {
                "id": "MDG",
                "value": 787839
            },
            {
                "id": "MEX",
                "value": 615658
            },
            {
                "id": "MKD",
                "value": 865616
            },
            {
                "id": "MLI",
                "value": 605098
            },
            {
                "id": "MMR",
                "value": 913029
            },
            {
                "id": "MNE",
                "value": 2889
            },
            {
                "id": "MNG",
                "value": 364423
            },
            {
                "id": "MOZ",
                "value": 645013
            },
            {
                "id": "MRT",
                "value": 224956
            },
            {
                "id": "MWI",
                "value": 549348
            },
            {
                "id": "MYS",
                "value": 541677
            },
            {
                "id": "NAM",
                "value": 933712
            },
            {
                "id": "NCL",
                "value": 807948
            },
            {
                "id": "NER",
                "value": 306567
            },
            {
                "id": "NGA",
                "value": 171837
            },
            {
                "id": "NIC",
                "value": 582365
            },
            {
                "id": "NLD",
                "value": 963456
            },
            {
                "id": "NOR",
                "value": 872545
            },
            {
                "id": "NPL",
                "value": 792320
            },
            {
                "id": "NZL",
                "value": 154403
            },
            {
                "id": "OMN",
                "value": 219703
            },
            {
                "id": "PAK",
                "value": 128637
            },
            {
                "id": "PAN",
                "value": 721720
            },
            {
                "id": "PER",
                "value": 358909
            },
            {
                "id": "PHL",
                "value": 688952
            },
            {
                "id": "PNG",
                "value": 215034
            },
            {
                "id": "POL",
                "value": 241785
            },
            {
                "id": "PRI",
                "value": 518565
            },
            {
                "id": "PRT",
                "value": 875252
            },
            {
                "id": "PRY",
                "value": 90276
            },
            {
                "id": "QAT",
                "value": 151107
            },
            {
                "id": "ROU",
                "value": 697744
            },
            {
                "id": "RUS",
                "value": 713491
            },
            {
                "id": "RWA",
                "value": 882151
            },
            {
                "id": "ESH",
                "value": 591432
            },
            {
                "id": "SAU",
                "value": 388682
            },
            {
                "id": "SDN",
                "value": 398957
            },
            {
                "id": "SDS",
                "value": 181621
            },
            {
                "id": "SEN",
                "value": 375549
            },
            {
                "id": "SLB",
                "value": 968756
            },
            {
                "id": "SLE",
                "value": 264016
            },
            {
                "id": "SLV",
                "value": 696827
            },
            {
                "id": "ABV",
                "value": 539254
            },
            {
                "id": "SOM",
                "value": 168645
            },
            {
                "id": "SRB",
                "value": 565825
            },
            {
                "id": "SUR",
                "value": 474651
            },
            {
                "id": "SVK",
                "value": 855550
            },
            {
                "id": "SVN",
                "value": 592849
            },
            {
                "id": "SWZ",
                "value": 288272
            },
            {
                "id": "SYR",
                "value": 299583
            },
            {
                "id": "TCD",
                "value": 135219
            },
            {
                "id": "TGO",
                "value": 696555
            },
            {
                "id": "THA",
                "value": 908259
            },
            {
                "id": "TJK",
                "value": 746112
            },
            {
                "id": "TKM",
                "value": 480034
            },
            {
                "id": "TLS",
                "value": 528802
            },
            {
                "id": "TTO",
                "value": 328421
            },
            {
                "id": "TUN",
                "value": 615806
            },
            {
                "id": "TUR",
                "value": 403224
            },
            {
                "id": "TWN",
                "value": 17388
            },
            {
                "id": "TZA",
                "value": 403969
            },
            {
                "id": "UGA",
                "value": 483422
            },
            {
                "id": "UKR",
                "value": 720899
            },
            {
                "id": "URY",
                "value": 71464
            },
            {
                "id": "USA",
                "value": 529642
            },
            {
                "id": "UZB",
                "value": 973504
            },
            {
                "id": "VEN",
                "value": 307527
            },
            {
                "id": "VNM",
                "value": 260030
            },
            {
                "id": "VUT",
                "value": 816693
            },
            {
                "id": "PSE",
                "value": 742369
            },
            {
                "id": "YEM",
                "value": 509481
            },
            {
                "id": "ZAF",
                "value": 240820
            },
            {
                "id": "ZMB",
                "value": 214855
            },
            {
                "id": "ZWE",
                "value": 316139
            },
            {
                "id": "KOR",
                "value": 914705
            }
        ]
    }
]

const top10Country = [
    {
        scenario: "Scenario X",
        data: "Data"
    },
    {
        scenario: "Scenario Y",
        data: "Data"
    },
    {
        scenario: "1.5 Degrees",
        data: "Data"
    },
    {
        scenario: "2.0 Degrees",
        data: "Data"
    },
    {
        scenario: "2.5 Degrees",
        data: "Data"
    },
    {
        scenario: "3.0 Degrees",
        data: "Data"
    }
]

function getDataset(Component) {
    switch (Component) {
        case "globalTrends":
            return globalTrends;
        case "spatialComparison":
            return spatialComparison;
        default:
            return top10Country;
    }
}

function getData(Dataset, Scenario) {
    for(var i = 0; i < Dataset.length; i++) {
        if(Dataset.at(i).scenario === Scenario) {
            return Dataset.at(i).data;
        }
    }
}

export default function getDashboardData(Scenario, Component) {
    const scenario = Scenario;
    const dataset = getDataset(Component);
    return (
        getData(dataset, scenario)
    )
}