---
title: "pandas 옵션 설정"
excerpt: "pandas.set_option"
published: true
mathjax: false

toc: true
toc_sticky: true

categories:
  - data mining
tags:
  - python
  - data mining
  - pandas
---
# {{ page.excerpt }}
---
pandas DataFrame은 별도의 옵션들이 지정되어 있어 이를 프로그래머가 임의로 수정할 수 있다.

## 1. display.max_rows
DataFrame의 출력이 생략되서 나올 때는 `display.max_rows`옵션을 수정해서 출력 가능 숫자를 확인할 수 있다.  
물론 별도의 파일로 저장해서 Excel이나 Access를 통해 확인하는게 더 효과적이긴 할텐데, 별도의 파일을 만들지 않고 싶을 때는 `display.max_rows`옵션을 수정해서 출력하면 된다.

```python
import pydataset as pds

df = pds.data()

print(df)
```
```markdown
        dataset_id                                             title
0    AirPassengers       Monthly Airline Passenger Numbers 1949-1960
1          BJsales                 Sales Data with Leading Indicator
2              BOD                         Biochemical Oxygen Demand
3     Formaldehyde                     Determination of Formaldehyde
4     HairEyeColor         Hair and Eye Color of Statistics Students
..             ...                                               ...
752        VerbAgg                  Verbal Aggression item responses
753           cake                 Breakage Angle of Chocolate Cakes
754           cbpp                 Contagious bovine pleuropneumonia
755    grouseticks  Data on red grouse ticks from Elston et al. 2001
756     sleepstudy       Reaction times in a sleep deprivation study
```

```python
import pydataset as pds
import pandas as pd

df = pds.data()

pd.set_option('display.max_rows', None)

print(df)
```
```markdown
                    dataset_id                                                                                      title
0                AirPassengers                                                Monthly Airline Passenger Numbers 1949-1960
1                      BJsales                                                          Sales Data with Leading Indicator
2                          BOD                                                                  Biochemical Oxygen Demand
3                 Formaldehyde                                                              Determination of Formaldehyde
4                 HairEyeColor                                                  Hair and Eye Color of Statistics Students
5                 InsectSprays                                                             Effectiveness of Insect Sprays
6               JohnsonJohnson                                             Quarterly Earnings per Johnson & Johnson Share
7                    LakeHuron                                                              Level of Lake Huron 1875-1972
8             LifeCycleSavings                                                       Intercountry Life-Cycle Savings Data
9                         Nile                                                                     Flow of the River Nile
10               OrchardSprays                                                                  Potency of Orchard Sprays
11                 PlantGrowth                                                 Results from an Experiment on Plant Growth
12                   Puromycin                                                 Reaction Velocity of an Enzymatic Reaction
13                     Titanic                                                      Survival of passengers on the Titanic
14                 ToothGrowth                                     The Effect of Vitamin C on Tooth Growth in Guinea Pigs
15               UCBAdmissions                                                          Student Admissions at UC Berkeley
16              UKDriverDeaths                                                   Road Casualties in Great Britain 1969-84
17                       UKgas                                                               UK Quarterly Gas Consumption
18                 USAccDeaths                                                      Accidental Deaths in the US 1973-1978
19                   USArrests                                                            Violent Crime Rates by US State
20              USJudgeRatings                                  Lawyers' Ratings of State Judges in the US Superior Court
21       USPersonalExpenditure                                                                  Personal Expenditure Data
22                    VADeaths                                                             Death Rates in Virginia (1940)
23                    WWWusage                                                                  Internet Usage per Minute
24                 WorldPhones                                                                     The World's Telephones
25                    airmiles                                       Passenger Miles on Commercial US Airlines, 1937-1960
26                  airquality                                                          New York Air Quality Measurements
27                    anscombe                                Anscombe's Quartet of 'Identical' Simple Linear Regressions
28                      attenu                                                          The Joyner-Boore Attenuation Data
29                    attitude                                                         The Chatterjee-Price Attitude Data
30                     austres                                Quarterly Time Series of the Number of Australian Residents
31                        cars                                                       Speed and Stopping Distances of Cars
32                    chickwts                                                               Chicken Weights by Feed Type
33                         co2                                                    Mauna Loa Atmospheric CO2 Concentration
34                     crimtab                                                              Student's 3000 Criminals Data
35                 discoveries                                                    Yearly Numbers of Important Discoveries
36                       esoph                                                  Smoking, Alcohol and (O)esophageal Cancer
37                        euro                                                        Conversion Rates of Euro Currencies
38                    faithful                                                                   Old Faithful Geyser Data
39                      freeny                                                                      Freeny's Revenue Data
40                      infert                                         Infertility after Spontaneous and Induced Abortion
41                        iris                                                                 Edgar Anderson's Iris Data
42                     islands                                                      Areas of the World's Major Landmasses
43                          lh                                                       Luteinizing Hormone in Blood Samples
44                     longley                                                         Longley's Economic Regression Data
45                        lynx                                                   Annual Canadian Lynx trappings 1821-1934
46                      morley                                                              Michelson Speed of Light Data
47                      mtcars                                                                 Motor Trend Car Road Tests
48                      nhtemp                                                   Average Yearly Temperatures in New Haven
49                      nottem                                      Average Monthly Temperatures at Nottingham, 1920-1939
50                         npk                                                     Classical N, P, K Factorial Experiment
51          occupationalStatus                                              Occupational Status of Fathers and their Sons
52                      precip                                                          Annual Precipitation in US Cities
53                  presidents                                                Quarterly Approval Ratings of US Presidents
54                    pressure                                     Vapor Pressure of Mercury as a Function of Temperature
55                      quakes                                                          Locations of Earthquakes off Fiji
56                       randu                                           Random Numbers from Congruential Generator RANDU
57                      rivers                                                     Lengths of Major North American Rivers
58                        rock                                                     Measurements on Petroleum Rock Samples
59                       sleep                                                                       Student's Sleep Data
60                   stackloss                                                           Brownlee's Stack Loss Plant Data
61               sunspot.month                                               Monthly Sunspot Data, from 1749 to "Present"
62                sunspot.year                                                             Yearly Sunspot Data, 1700-1988
63                    sunspots                                                         Monthly Sunspot Numbers, 1749-1983
64                       swiss                                   Swiss Fertility and Socioeconomic Indicators (1888) Data
65                    treering                                                           Yearly Treering Data, -6000-1979
66                       trees                                            Girth, Height and Volume for Black Cherry Trees
67                       uspop                                                      Populations Recorded by the US Census
68                     volcano                                  Topographic Information on Auckland's Maunga Whau Volcano
69                  warpbreaks                                                The Number of Breaks in Yarn during Weaving
70                       women                                             Average Heights and Weights for American Women
71                        acme                                                                     Monthly Excess Returns
72                        aids                                               Delay in AIDS Reporting in England and Wales
73                   aircondit                                                     Failures of Air-conditioning Equipment
74                  aircondit7                                                     Failures of Air-conditioning Equipment
75                        amis                                                             Car Speeding and Warning Signs
76                         aml                                            Remission Times for Acute Myelogenous Leukaemia
77                     bigcity                                                                  Population of U.S. Cities
78                    brambles                                                          Spatial Location of Bramble Canes
79                     breslow                                                               Smoking Deaths Among Doctors
80                     calcium                                                                        Calcium Uptake Data
81                        cane                                                                    Sugar-cane Disease Data
82                  capability                                                       Simulated Manufacturing Process Data
83                       catsM                                                              Weight Data for Domestic Cats
84                         cav                                                                Position of Muscle Caveolae
85                         cd4                                                       CD4 Counts for HIV-Positive Patients
86                    channing                                                                        Channing House Data
87                        city                                                                  Population of U.S. Cities
88                    claridge                                                           Genetic Links to Left-handedness
89                       cloth                                                                   Number of Flaws in Cloth
90                 co.transfer                                                                   Carbon Monoxide Transfer
91                        coal                                                             Dates of Coal Mining Disasters
92                      darwin                                                          Darwin's Plant Height Differences
93                        dogs                                                             Cardiac Data for Domestic Dogs
94                    downs.bc                                           Incidence of Down's Syndrome in British Columbia
95                       ducks                                     Behavioral and Plumage Characteristics of Hybrid Ducks
96                         fir                                                             Counts of Balsam-fir Seedlings
97                       frets                                                                Head Dimensions in Brothers
98                        grav                                                                Acceleration Due to Gravity
99                     gravity                                                                Acceleration Due to Gravity
100                     hirose                                                                   Failure Time of PET Film
101                      islay                                                           Jura Quartzite Azimuths on Islay
102                     manaus                                           Average Heights of the Rio Negro river at Manaus
103                   melanoma                                                           Survival from Malignant Melanoma
104                      motor                                                  Data from a Simulated Motorcycle Accident
105                      neuro                                                      Neurophysiological Point Process Data
106                   nitrofen                                                    Toxicity of Nitrofen in Aquatic Systems
107                      nodal                                                       Nodal Involvement in Prostate Cancer
108                    nuclear                                                    Nuclear Power Station Construction Data
109                    paulsen                                                     Neurotransmission in Guinea Pig Brains
110                    poisons                                                                      Animal Survival Times
111                      polar                                                 Pole Positions of New Caledonian Laterites
112                  remission                                                         Cancer Remission and Cell Activity
113                   salinity                                                         Water Salinity and River Discharge
114                   survival                                                     Survival of Rats after Radiation Doses
115                        tau                                                                   Tau Particle Decay Modes
116                       tuna                                                                         Tuna Sighting Data
117                      urine                                                                        Urine Analysis Data
118                       wool                                                            Australian Relative Wool Prices
119                       aids                                                                     data from Section 1.19
120                   alloauto                                                                      data from Section 1.9
121                  allograft                                                              data from Exercise 13.1, p418
122                        azt                                                               data from Exercise 4.7, p122
123                     baboon                                                               data from Exercise 5.8, p147
124                    bcdeter                                                                     data from Section 1.18
125                      bfeed                                                                     data from Section 1.14
126                        bmt                                                                      data from Section 1.3
127                       bnct                                                               data from Exercise 7.7, p223
128                     btrial                                                                      data from Section 1.5
129                       burn                                                                      data from Section 1.6
130                   channing                                                                     data from Section 1.16
131                    drug6mp                                                                      data from Section 1.2
132                    drughiv                                                               data from Exercise 7.6, p222
133                       hodg                                                                     data from Section 1.10
134                     kidney                                                                      data from Section 1.4
135                  kidrecurr                                     Data on 38 individuals using a kidney dialysis machine
136                    kidtran                                                                      data from Section 1.7
137                     larynx                                                                      data from Section 1.8
138                       lung                                                               data from Exercise 4.4, p120
139                    pneumon                                                                     data from Section 1.13
140                      psych                                                                     data from Section 1.15
141                       rats                                                              data from Exercise 7.13, p225
142                        std                                                                     data from Section 1.12
143                    stddiag                                                               data from Exercise 5.6, p146
144                     tongue                                                                     data from Section 1.11
145                      twins                                                              data from Exercise 7.14, p225
146                   Animals2                                      Brain and Body Weights for 65 Species of Land Animals
147                     CrohnD                                                        Crohn's Disease Adverse Events Data
148               NOxEmissions                                                                     NOx Air Pollution Data
149                  SiegelsEx                                                            Siegel's Exact Fit Example Data
150                   aircraft                                                                              Aircraft Data
151                     airmay                                                                           Air Quality Data
152                    alcohol                                                           Alcohol Solubility in Water Data
153               ambientNOxCH                                           Daily Means of NOx (mono-nitrogen oxides) in air
154                   bushfire                                                                     Campbell Bushfire Data
155                    carrots                                                                  Insect Damages on Carrots
156                      cloud                                                                    Cloud point of a Liquid
157                    coleman                                                                           Coleman Data Set
158                    condroz                                                                               Condroz Data
159                     cushny                                              Cushny and Peebles Prolongation of Sleep Data
160                   delivery                                                                         Delivery Time Data
161                  education                                                                 Education Expenditure Data
162                   epilepsy                                                                  Epilepsy Attacks Data Set
163                       exAM                                    Example Data of Antille and May - for Simple Regression
164                  foodstamp                                                           Food Stamp Program Participation
165                        hbk                                                     Hawkins, Bradu, Kass's Artificial Data
166                      heart                                                                   Heart Catherization Data
167                   kootenay                              Waterflow Measurements of Kootenay River in Libby and Newgate
168                     lactic                                                 Lactic Acid Concentration Measurement Data
169                       milk                                                             Daudin's Milk Composition Data
170                    pension                                                                         Pension Funds Data
171                   phosphor                                                                    Phosphorus Content Data
172                      pilot                                                                           Pilot-Plant Data
173                  possumDiv                                                                      Possum Diversity Data
174                  pulpfiber                                                                  Pulp Fiber and Paper Data
175                 radarImage                                                Satellite Radar Image Data from near Munich
176                   salinity                                                                              Salinity Data
177                   starsCYG                                   Hertzsprung-Russell Diagram Data of Star Cluster CYG OB1
178                      telef                                                 Number of International Calls from Belgium
179                   toxicity                                                          Toxicity of Carboxylic Acids Data
180                       vaso                                                            Vaso Constriction Skin Data Set
181               wagnerGrowth                                                   Wagner's Hannover Employment Growth Data
182                       wood                                                     Modified Data on Wood Specific Gravity
183                  AMSsurvey                                                          American Math Society Survey Data
184                      Adler                                                                  Experimenter Expectations
185                     Angell                                                       Moral Integration of American Cities
186                   Anscombe                                                     U. S. State Public-School Expenditures
187                    Baumann                                                  Methods of Teaching Reading Comprehension
188                       Bfox                                                Canadian Women's Labour-Force Participation
189                  Blackmoor                               Exercise Histories of Eating-Disordered and Control Subjects
190                       Burt                                               Fraudulent Data on IQs of Twins Raised Apart
191                     CanPop                                                                   Canadian Population Data
192                      Chile                                           Voting Intentions in the 1988 Chilean Plebiscite
193                     Chirot                                                        The 1907 Romanian Peasant Rebellion
194                     Cowles                                                    Cowles and Davis's Data on Volunteering
195                      Davis                                                          Self-Reports of Height and Weight
196                  DavisThin                                                         Davis's Data on Drive for Thinness
197               Depredations                                                            Minnesota Wolf Depredation Data
198                     Duncan                                                        Duncan's Occupational Prestige Data
199                   Ericksen                                                            The 1980 U.S. Census Undercount
200                    Florida                                                                      Florida County Voting
201                   Freedman                                             Crowding and Crime in U. S. Metropolitan Areas
202                   Friendly                                                                   Format Effects on Recall
203                   Ginzberg                                                                         Data on Depression
204                     Greene                                                                            Refugee Appeals
205                      Guyer                                                                  Anonymity and Cooperation
206                  Hartnagel                                                           Canadian Crime-Rates Time Series
207                   Highway1                                                                          Highway Accidents
208                  Leinhardt                                                                   Data on Infant-Mortality
209                     Mandel                                                                   Contrived Collinear Data
210                  Migration                                                    Canadian Interprovincial Migration Data
211                      Moore                                                   Status, Authoritarianism, and Conformity
212                       Mroz                                                     U.S. Women's Labor-Force Participation
213               OBrienKaiser                                                O'Brien and Kaiser's Repeated-Measures Data
214                   Ornstein                                       Interlocking Directorates Among Major Canadian Firms
215                    Pottery                                                            Chemical Composition of Pottery
216                   Prestige                                                           Prestige of Canadian Occupations
217                    Quartet                                                                   Four Regression Datasets
218                      Robey                                                                Fertility and Contraception
219                       SLID                                                       Survey of Labour and Income Dynamics
220                    Sahlins                                                  Agricultural Production in Mazulu Village
221                   Salaries                                                                    Salaries for Professors
222                      Soils                                 Soil Compositions of Physical and Chemical Characteristics
223                     States                                       Education and Related Statistics for the U.S. States
224                   Transact                                                                           Transaction data
225                         UN                                                                   GDP and Infant Mortality
226                      USPop                                                            Population of the United States
227                      Vocab                                                                   Vocabulary and Education
228                 WeightLoss                                                                           Weight Loss Data
229                    Womenlf                                                Canadian Women's Labour-Force Participation
230                       Wool                                                                                  Wool data
231                agriculture                                                     European Union Agricultural Workforces
232                    animals                                                                      Attributes of Animals
233                    chorSub                                                           Subset of C-horizon of Kola Data
234                     flower                                                                     Flower Characteristics
235                plantTraits                                                                  Plant Species Traits Data
236                     pluton                                                     Isotopic Composition Plutonium Batches
237                    ruspini                                                                               Ruspini Data
238                votes.repub                                   Votes for Republican Candidate in Presidential Elections
239                     xclara                                                         Bivariate Data Set with 3 Clusters
240                    affairs                                                                                    affairs
241                 azcabgptca                                                                                 azcabgptca
242                   azdrg112                                                                                   azdrg112
243                      azpro                                                                                      azpro
244                azprocedure                                                                                azprocedure
245                  badhealth                                                                                  badhealth
246                  fasttrakg                                                                                  fasttrakg
247                    fishing                                                                                    fishing
248                        lbw                                                                                        lbw
249                     lbwgrp                                                                                     lbwgrp
250                     loomis                                                                                     loomis
251                      mdvis                                                                                      mdvis
252                     medpar                                                                                     medpar
253                       nuts                                                                                       nuts
254                        rwm                                                                                        rwm
255                    rwm1984                                                                                    rwm1984
256                     rwm5yr                                                                                     rwm5yr
257                      ships                                                                                      ships
258                    smoking                                                                                    smoking
259                    titanic                                                                                    titanic
260                 titanicgrp                                                                                 titanicgrp
261                   Accident                                                                             Ship Accidents
262                    Airline                                                                     Cost for U.S. Airlines
263                       Airq                                             Air Quality for Californian Metropolitan Areas
264                   Benefits                                                       Unemployement of Blue Collar Workers
265                       Bids                                                                Bids Received By U.S. Firms
266                 BudgetFood                                                Budget Share of Food for Spanish Households
267                BudgetItaly                                                       Budget Shares for Italian Households
268                   BudgetUK                                                        Budget Shares of British Households
269                     Bwages                                                                           Wages in Belgium
270                     CPSch3                                                Earnings from the Current Population Survey
271               CRANpackages                                                                             Growth of CRAN
272                       Capm                                                                          Stock Market Data
273                        Car                                                          Stated Preferences for Car Choice
274                   Caschool                                                         The California Test Score Data Set
275                     Catsup                                                                 Choice of Brand for Catsup
276                      Cigar                                                                      Cigarette Consumption
277                  Cigarette                                                   The Cigarette Consumption Panel Data Set
278                   Clothing                                                         Sales Data of Men's Fashion Stores
279                  Computers                                                               Prices of Personal Computers
280                    Cracker                                                                Choice of Brand for Crakers
281                      Crime                                                                    Crime in North Carolina
282                         DM                                                                    DM Dollar Exchange Rate
283                    Diamond                                                          Pricing the C's of Diamond Stones
284                     Doctor                                                                    Number of Doctor Visits
285                  DoctorAUS                                                                 Doctor Visits in Australia
286             DoctorContacts                                                               Contacts With Medical Doctor
287                   Earnings                                                              Earnings for Three Age Groups
288                Electricity                                                    Cost Function for Electricity Producers
289                       Fair                                                                  Extramarital Affairs Data
290                   Fatality                                                      Drunk Driving Laws and Traffic Deaths
291                    Fishing                                                                     Choice of Fishing Mode
292                    Forward                                       Exchange Rates of US Dollar Against Other Currencies
293                  FriendFoe                                         Data from the Television Game Show Friend Or Foe ?
294                      Garch             Daily Observations on Exchange Rates of the US Dollar Against Other Currencies
295                   Gasoline                                                                       Gasoline Consumption
296                  Griliches                                                                                 Wage Datas
297                   Grunfeld                                                                   Grunfeld Investment Data
298                         HC                      Heating and Cooling System Choice in Newly Built Houses in California
299                         HI                                                 Health Insurance and Hours Worked By Wives
300                       Hdma                                                                   The Boston HDMA Data Set
301                    Heating                                                 Heating System Choice in California Houses
302                    Hedonic                                                  Hedonic Prices of Cencus Tracts in Boston
303                    Housing                                              Sales Prices of Houses in the City of Windsor
304                   Icecream                                                                      Ice Cream Consumption
305                   Journals                                                                  Economic Journals Dat Set
306                     Kakadu                        Willingness to Pay for the Preservation of the Kakadu National Park
307                    Ketchup                                                                Choice of Brand for Ketchup
308                      Klein                                                                            Klein's Model I
309                LaborSupply                                                                     Wages and Hours Worked
310                     Labour                                                                              Belgian Firms
311                       MCAS                                                       The Massashusets Test Score Data Set
312                      Males                                                         Wages and Education of Young Males
313                  Mathlevel                    Level of Calculus Attained for Students Taking Advanced Micro-economics
314                     MedExp                                                       Structure of Demand for Medical Care
315                      Metal                                                                      Production for SIC 33
316                       Mode                                                                                Mode Choice
317                 ModeChoice                                                           Data to Study Travel Mode Choice
318                       Mofa  International Expansion of U.S. Mofa's (majority-owned Foreign Affiliates in Fire (fin...
319                       Mroz                                                                          Labor Supply Data
320                     MunExp                                                                 Municipal Expenditure Data
321                NaturalPark                       Willingness to Pay for the Preservation of the Alentejo Natural Park
322                    Nerlove                                              Cost Function for Electricity Producers, 1955
323                        OFP                                                                 Visits to Physician Office
324                        Oil                                                                             Oil Investment
325                       PSID                                                            Panel Survey of Income Dynamics
326              Participation                                                                  Labor Force Participation
327                 PatentsHGH                                                   Dynamic Relation Between Patents and R&D
328                  PatentsRD                             Patents, R&D and Technological Spillovers for a Panel of Firms
329                      Pound                                                                 Pound-dollar Exchange Rate
330                     Produc                                                                       Us States Production
331                  RetSchool                                                                        Return to Schooling
332                      SP500                                                     Returns on Standard & Poor's 500 Index
333                  Schooling                                                                        Wages and Schooling
334                 Somerville                                                                  Visits to Lake Somerville
335                       Star                                                   Effects on Learning of Small Class Sizes
336                     Strike                                                                       Strike Duration Data
337                  StrikeDur                                                                           Strikes Duration
338                   StrikeNb                                                      Number of Strikes in Us Manufacturing
339                     SumHes                                                                             The Penn Table
340                    Tobacco                                                            Households Tobacco Budget Share
341                      Train                                                     Stated Preferences for Train Traveling
342                   TranspEq                                   Statewide Data on Transportation Equipment Manufacturing
343                  Treatment                                        Evaluating Treatment Effect of Training on Earnings
344                       Tuna                                                                   Choice of Brand for Tuna
345          USFinanceIndustry                                                                US Finance Industry Profits
346      USclassifiedDocuments                                           Official Secrecy of the United States Government
347       USstateAbbreviations                                     Standard abbreviations for states of the United States
348                 UStaxWords                                                              Number of Words in US Tax Law
349                   UnempDur                                                                      Unemployment Duration
350               Unemployment                                                                      Unemployment Duration
351                 University                                              Provision of University Teaching and Research
352                   VietNamH                                             Medical Expenses in Viet-nam (household Level)
353                   VietNamI                                            Medical Expenses in Viet-nam (individual Level)
354                      Wages                                                            Panel Datas of Individual Wages
355                     Wages1                                                            Wages, Experience and Schooling
356               Workinghours                                                                         Wife Working Hours
357                        Yen                                                                   Yen-dollar Exchange Rate
358                     Yogurt                                                                Choice of Brand for Yogurts
359              bankingCrises                                                                Countries in Banking Crises
360           incomeInequality                                                                Income Inequality in the US
361            nonEnglishNames                                                          Names with Character Set Problems
362         politicalKnowledge                                                   Political knowledge in the US and Europe
363                         PD                                A study of Parkinson's disease and APOE, LRRK2, SNCA makers
364                      aldh2                                                               ALDH2 markers and Alcoholism
365                   apoeapoc                                                         APOE/APOC1 markers and Alzheimer's
366                         cf                                                                       Cystic fibrosis data
367                      crohn                                                                       Crohn's disease data
368                         fa                                                                     Friedreich Ataxia data
369                      fsnps                              A case-control data involving four SNPs with missing genotype
370                        hla                                                                               The HLA data
371                     hr1420                                         An example data for Manhattan plot with annotation
372                        l51                                                                   An example pedigree data
373                      lukas                                                                        An example pedigree
374                        mao                                                A study of Parkinson's disease and MAO gene
375                    mfblong                                                                 Example data for ACEnucfam
376                    mhtdata                                                         An example data for Manhattan plot
377                     nep499                                    A study of Alzheimer's disease with eight SNPs and APOE
378                   diamonds                                                        Prices of 50,000 round cut diamonds
379                  economics                                                                   US economic time series.
380                    midwest                                                                      Midwest demographics.
381                     movies                                          Movie information and user ratings from IMDB.com.
382                        mpg                          Fuel economy data from 1999 and 2008 for 38 popular models of car
383                     msleep                              An updated and expanded version of the mammals sleep dataset.
384               presidential                                          Terms of 10 presidents from Eisenhower to Bush W.
385                      seals                                                            Vector field of seal movements.
386                  Arbuthnot                 Arbuthnot's data on male and female birth ratios in London from 1629-1710.
387                     Bowley                              Bowley's data on values of British and Irish trade, 1855-1899
388                  Cavendish                                     Cavendish's Determinations of the Density of the Earth
389                 ChestSizes                                             Chest measurements of 5738 Scottish Militiamen
390              CushnyPeebles                          Cushny-Peebles Data: Soporific Effects of Scopolamine Derivatives
391             CushnyPeeblesN                          Cushny-Peebles Data: Soporific Effects of Scopolamine Derivatives
392                     Dactyl                                           Edgeworth's counts of dactyls in Virgil's Aeneid
393                DrinksWages                                   Elderton and Pearson's (1910) data on drinking and wages
394               Fingerprints                                                   Waite's data on Patterns in Fingerprints
395                     Galton                                 Galton's data on the heights of parents and their children
396             GaltonFamilies                       Galton's data on the heights of parents and their children, by child
397                     Guerry                          Data from A.-M. Guerry, "Essay on the Moral Statistics of France"
398                     Jevons                                        W. Stanley Jevons' data on numerical discrimination
399                Langren.all                           van Langren's Data on Longitude Distance between Toledo and Rome
400                Langren1644                           van Langren's Data on Longitude Distance between Toledo and Rome
401                  Macdonell           Macdonell's Data on Height and Finger Length of Criminals, used by Gosset (1908)
402                MacdonellDF           Macdonell's Data on Height and Finger Length of Criminals, used by Gosset (1908)
403                  Michelson                                        Michelson's Determinations of the Velocity of Light
404              MichelsonSets                                        Michelson's Determinations of the Velocity of Light
405              Minard.cities                        Data from Minard's famous graphic map of Napoleon's march on Moscow
406                Minard.temp                        Data from Minard's famous graphic map of Napoleon's march on Moscow
407              Minard.troops                        Data from Minard's famous graphic map of Napoleon's march on Moscow
408                Nightingale               Florence Nightingale's data on deaths from various causes in the Crimean War
409                    OldMaps                                       Latitudes and Longitudes of 39 Points in 11 Old Maps
410                 PearsonLee         Pearson and Lee's data on the heights of parents and children classified by gender
411                PolioTrials                                                                    Polio Field Trials Data
412                Prostitutes                 Parent-Duchatelet's time-series data on the number of prostitutes in Paris
413                        Pyx                                                                           Trial of the Pyx
414                   Quarrels                                                              Statistics of Deadly Quarrels
415                Snow.deaths                               John Snow's map and data on the 1854 London Cholera outbreak
416              Snow.polygons                               John Snow's map and data on the 1854 London Cholera outbreak
417                 Snow.pumps                               John Snow's map and data on the 1854 London Cholera outbreak
418               Snow.streets                               John Snow's map and data on the 1854 London Cholera outbreak
419                      Wheat                                            Playfair's Data on Wages and the Price of Wheat
420             Wheat.monarchs                                            Playfair's Data on Wages and the Price of Wheat
421                      Yeast                                                         Student's (1906) Yeast Cell Counts
422                 YeastD.mat                                                         Student's (1906) Yeast Cell Counts
423                    ZeaMays                               Darwin's Heights of Cross- and Self-fertilized Zea May Pairs
424                     barley                                                   Yield data from a Minnesota barley trial
425              environmental                                      Atmospheric environmental conditions in New York City
426                    ethanol                                                  Engine exhaust fumes from burning ethanol
427                   melanoma                                                             Melanoma skin cancer incidence
428                     singer                                                 Heights of New York Choral Society singers
429                      Aids2                                                              Australian AIDS Survival Data
430                    Animals                                                      Brain and Body Weights for 28 Species
431                     Boston                                                        Housing Values in Suburbs of Boston
432                     Cars93                                               Data from 93 Cars on Sale in the USA in 1993
433                   Cushings                                       Diagnostic Tests on Patients with Cushing's Syndrome
434                        DDT                                                                                DDT in Kale
435                   GAGurine                                                          Level of GAG in Urine of Children
436                  Insurance                                                            Numbers of Car Insurance claims
437                   Melanoma                                                           Survival from Malignant Melanoma
438                        OME                                          Tests of Auditory Perception in Children with OME
439                    Pima.te                                                              Diabetes in Pima Indian Women
440                    Pima.tr                                                              Diabetes in Pima Indian Women
441                   Pima.tr2                                                              Diabetes in Pima Indian Women
442                     Rabbit                                                                  Blood Pressure in Rabbits
443                     Rubber                                                         Accelerated Testing of Tyre Rubber
444                      SP500                                                      Returns of the Standard and Poors 500
445                      Sitka                                               Growth Curves for Sitka Spruce Trees in 1988
446                    Sitka89                                               Growth Curves for Sitka Spruce Trees in 1989
447                       Skye                                                     AFM Compositions of Aphyric Skye Lavas
448                    Traffic                                                Effect of Swedish Speed Limits on Accidents
449                   UScereal                                        Nutritional and Marketing Information on US Cereals
450                    UScrime                                            The Effect of Punishment Regimes on Crime Rates
451                         VA                                                 Veteran's Administration Lung Cancer Trial
452                      abbey                                                           Determinations of Nickel Content
453                  accdeaths                                                      Accidental Deaths in the US 1973-1978
454                   anorexia                                                             Anorexia Data on Weight Change
455                   bacteria                                                 Presence of Bacteria after Drug Treatments
456                      beav1                                                        Body Temperature Series of Beaver 1
457                      beav2                                                        Body Temperature Series of Beaver 2
458                     biopsy                                                      Biopsy Data on Breast Cancer Patients
459                    birthwt                                       Risk Factors Associated with Low Infant Birth Weight
460                   cabbages                                                            Data from a cabbage field trial
461                      caith                                            Colours of Eyes and Hair of People in Caithness
462                       cats                                                         Anatomical Data from Domestic Cats
463                     cement                                                            Heat Evolved by Setting Cements
464                       chem                                                                  Copper in Wholemeal Flour
465                       coop                                                 Co-operative Trial in Analytical Chemistry
466                       cpus                                                               Performance of Computer CPUs
467                      crabs                                           Morphological Measurements on Leptograpsus Crabs
468                     deaths                                                Monthly Deaths from Lung Diseases in the UK
469                    drivers                                             Deaths of Car Drivers in Great Britain 1969-84
470                     eagles                                                            Foraging Ecology of Bald Eagles
471                       epil                                                              Seizure Counts for Epileptics
472                      farms                                                      Ecological Factors in Farm Management
473                        fgl                                                   Measurements of Forensic Glass Fragments
474                     forbes                                                 Forbes' Data on Boiling Points in the Alps
475                   galaxies                                                                 Velocities for 82 Galaxies
476                      gehan                                                      Remission Times of Leukaemia Patients
477                   genotype                                                                          Rat Genotype Data
478                     geyser                                                                   Old Faithful Geyser Data
479                    gilgais                                                  Line Transect of Soil in Gilgai Territory
480                      hills                                                        Record Times in Scottish Hill Races
481                    housing                                Frequency Table from a Copenhagen Housing Conditions Survey
482                      immer                                                           Yields from a Barley Field Trial
483                       leuk                               Survival Times and White Blood Counts for Leukaemia Patients
484                    mammals                                      Brain and Body Weights for 62 Species of Land Mammals
485                     mcycle                                                  Data from a Simulated Motorcycle Accident
486                   menarche                                                                  Age of Menarche in Warsaw
487                  michelson                                                            Michelson's Speed of Light Data
488                     minn38                                                    Minnesota High School Graduates of 1938
489                     motors                                                     Accelerated Life Testing of Motorettes
490                     muscle                             Effect of Calcium Chloride on Muscle Contraction in Rat Hearts
491                    newcomb                                        Newcomb's Measurements of the Passage Time of Light
492                  nlschools                                                     Eighth-Grade Pupils in the Netherlands
493                        npk                                                     Classical N, P, K Factorial Experiment
494                       npr1                                                      US Naval Petroleum Reserve No. 1 data
495                       oats                                                              Data from an Oats Field Trial
496                   painters                                                             The Painter's Data of de Piles
497                     petrol                                                        N. L. Prater's Petrol Refinery Data
498                      quine                                           Absenteeism from School in Rural New South Wales
499                       road                                                          Road Accident Deaths in US States
500                    rotifer                                                       Numbers of Rotifers by Fluid Density
501                      ships                                                                          Ships Damage Data
502                     shrimp                                                    Percentage of Shrimp in Shrimp Cocktail
503                    shuttle                                                           Space Shuttle Autolander Problem
504                     snails                                                                       Snail Mortality Data
505                      steam                                                          The Saturated Steam Pressure Data
506                    stormer                                                                The Stormer Viscometer Data
507                     survey                                                                        Student Survey Data
508                   synth.te                                                           Synthetic Classification Problem
509                   synth.tr                                                           Synthetic Classification Problem
510                       topo                                                                   Spatial Topographic Data
511                     waders                                               Counts of Waders at 15 Sites in South Africa
512                  whiteside                                                         House Insulation: Whiteside's Data
513                     wtloss                                                     Weight Loss Data from an Obese Patient
514                      Cigar                                                                      Cigarette Consumption
515                      Crime                                                                    Crime in North Carolina
516                     EmplUK                                                 Employment and Wages in the United Kingdom
517                   Gasoline                                                                       Gasoline Consumption
518                   Grunfeld                                                                 Grunfeld's Investment Data
519                    Hedonic                                         Hedonic Prices of Census Tracts in the Boston Area
520                LaborSupply                                                                     Wages and Hours Worked
521                      Males                                                         Wages and Education of Young Males
522                     Produc                                                                       US States Production
523                     Snmesp                                                              Employment and Wages in Spain
524                     SumHes                                                                 The Penn World Table, v. 5
525                      Wages                                                             Panel Data of Individual Wages
526                   baseball                               Yearly batting records for all major league baseball players
527  AustralianElectionPolling                                              Political opinion polls in Australia, 2004-07
528        AustralianElections                                elections to Australian House of Representatives, 1949-2007
529                EfronMorris                                Batting Averages for 18 major league baseball players, 1970
530                RockTheVote                                          Voter turnout experiment, using Rock The Vote ads
531           UKHouseOfCommons                                                      1992 United Kingdom electoral returns
532                   absentee                            Absentee and Machine Ballots in Pennsylvania State Senate Races
533                      admit                                            Applications to a Political Science PhD Program
534                bioChemists                     article production by graduate students in biochemistry Ph.D. programs
535                     ca2006                                                 California Congressional Districts in 2006
536                   iraqVote                                   U.S. Senate vote on the use of force against Iraq, 2002.
537       politicalInformation                          Interviewer ratings of respondent levels of political information
538      presidentialElections                                          elections for U.S. President, 1932-2012, by state
539                   prussian                                                              Prussian army horse kick data
540               unionDensity                                                cross national rates of trade union density
541                     vote92                                  Reports of voting in the 1992 U.S. Presidential election.
542               french_fries                                               Sensory data from a french fries experiment.
543                     smiths                                                           Demo data describing the Smiths.
544                       tips                                                                               Tipping data
545             car.test.frame                                               Automobile Data from 'Consumer Reports' 1990
546                      car90                                               Automobile Data from 'Consumer Reports' 1990
547                 cu.summary                                               Automobile Data from 'Consumer Reports' 1990
548                   kyphosis                                    Data on Children who have had Corrective Spinal Surgery
549                     solder                                          Soldering of Components on Printed-Circuit Boards
550                     stagec                                                                    Stage C Prostate Cancer
551              PublicSchools                                                         US Expenditures for Public Schools
552                     Bollen                                 Bollen's Data on Industrialization and Political Democracy
553                       CNES                                   Variables from the 1997 Canadian National Election Study
554                      Klein                                                          Klein's Data on the U. S. Economy
555                     Kmenta                                                Partly Artificial Data on the U. S. Economy
556                      Tests                                                                           Six Mental Tests
557                    bladder                                                                 Bladder Cancer Recurrences
558                     cancer                                                                     NCCTG Lung Cancer Data
559                        cgd                                                         Chronic Granulotomous Disease data
560                      colon                                                    Chemotherapy for Stage B/C colon cancer
561                    flchain                                         Assay of serum free light chain for 7874 subjects.
562                      heart                                                             Stanford Heart Transplant data
563                     kidney                                                                       Kidney catheter data
564                   leukemia                                                   Acute Myelogenous Leukemia survival data
565                      logan                                               Data from the 1972-78 GSS data used by Logan
566                       lung                                                                     NCCTG Lung Cancer Data
567                       mgus                                                                 Monoclonal gammapothy data
568                      nwtco                                                  Data from the National Wilm's Tumor Study
569                    ovarian                                                               Ovarian Cancer Survival Data
570                        pbc                                                 Mayo Clinic Primary Biliary Cirrhosis Data
571                       rats                                                       Rat treatment data from Mantel et al
572                  stanford2                                                        More Stanford Heart Transplant data
573                      tobin                                                                         Tobin's Tobit data
574                    veteran                                                 Veterans' Administration Lung Cancer study
575                  Arthritis                                                                   Arthritis Treatment Data
576                   Baseball                                                                              Baseball Data
577             BrokenMarriage                                                                       Broken Marriage Data
578                 Bundesliga                                                         Ergebnisse der Fussball-Bundesliga
579              Bundestag2005                                                    Votes in German Bundestag Election 2005
580                  Butterfly                                                                Butterfly Species in Malaya
581                 CoalMiners                                                   Breathlessness and Wheeze in Coal Miners
582              DanishWelfare                                                                  Danish Welfare Study Data
583                 Employment                                                                          Employment Status
584                 Federalist                                                                 'May' in Federalist Papers
585                    Hitters                                                                               Hitters Data
586                 HorseKicks                                                                       Death by Horse Kicks
587                   Hospital                                                                              Hospital data
588            JobSatisfaction                                                                      Job Satisfaction Data
589                JointSports                                                                Opinions About Joint Sports
590                  Lifeboats                                                                   Lifeboats on the Titanic
591                NonResponse                                                                   Non-Response Survey Data
592                OvaryCancer                                                                          Ovary Cancer Data
593                     PreSex                                                                Pre-marital Sex and Divorce
594                 Punishment                                                                   Corporal Punishment Data
595                    RepVict                                                                  Repeat Victimization Data
596                     Saxony                                                                         Families in Saxony
597                  SexualFun                                                                                 Sex is Fun
598               SpaceShuttle                                                              Space Shuttle O-ring Failures
599                    Suicide                                                                   Suicide Rates in Germany
600                     Trucks                                                                       Truck Accidents Data
601                   UKSoccer                                                                           UK Soccer Scores
602               VisualAcuity                                                       Visual Acuity in Left and Right Eyes
603                    VonBort                                                           Von Bortkiewicz Horse Kicks Data
604                 WeldonDice                                                                         Weldon's Dice Data
605                 WomenQueue                                                                            Women in Queues
606                MatchIt.url                                                                   Table of links for Zelig
607                     PErisk                                     Political Economic Risk Data from 62 Countries in 1987
608               SupremeCourt                                                             U.S. Supreme Court Vote Matrix
609                     Weimar                                                                  1932 Weimar election data
610                  Zelig.url                                                                   Table of links for Zelig
611                   approval                                                            U.S. Presidential Approval Data
612                  bivariate                                                Sample data for bivariate probit regression
613                  coalition                                         Coalition Dissolution in Parliamentary Democracies
614                 coalition2                       Coalition Dissolution in Parliamentary Democracies, Modified Version
615                      eidat                                                   Simulation Data for Ecological Inference
616                      free1                                                                     Freedom of Speech Data
617                      free2                                                                     Freedom of Speech Data
618                 friendship                                     Simulated Example of Schoolchildren Friendship Network
619                   grunfeld  Simulation Data for model Seemingly Unrelated Regression (sur) that corresponds to met...
620                       hoff                                                           Social Security Expenditure Data
621                    homerun                       Sample Data on Home Runs Hit By Mark McGwire and Sammy Sosa in 1998.
622                      immi1                                             Individual Preferences Over Immigration Policy
623                      immi2                                             Individual Preferences Over Immigration Policy
624                      immi3                                             Individual Preferences Over Immigration Policy
625                      immi4                                             Individual Preferences Over Immigration Policy
626                      immi5                                             Individual Preferences Over Immigration Policy
627                immigration                                             Individual Preferences Over Immigration Policy
628                      klein  Simulation Data for model Two-Stage Least Square (twosls) that corresponds to method 2...
629                     kmenta  Simulation Data for model Three-Stage Least Square (threesls) that corresponds to meth...
630                      macro                                                                         Macroeconomic Data
631                     mexico                                     Voting Data from the 1988 Mexican Presidental Election
632                        mid                                                            Militarized Interstate Disputes
633                newpainters                                                 The Discretized Painter's Data of de Piles
634                   sanction                                                            Multilateral Economic Sanctions
635                     sna.ex                                                   Simulated Example of Social Network Data
636                      swiss                                   Swiss Fertility and Socioeconomic Indicators (1888) Data
637                      tobin                                                                         Tobin's Tobit Data
638                    turnout                                         Turnout Data Set from the National Election Survey
639                 voteincome                Sample Turnout and Demographic Data from the 2000 Current Population Survey
640                        BCG                                                                           BCG Vaccine Data
641                      BtheB                                                                        Beat the Blues Data
642                     CYGOB1                                                                  CYG OB1 Star Cluster Data
643                 Forbes2000                       The Forbes 2000 Ranking of the World's Biggest Companies (Year 2004)
644                        GHQ                                                               General Health Questionnaire
645                      Lanza                                                      Prevention of Gastointestinal Damages
646                     agefat                                                                Total Body Composision Data
647                    aspirin                                                                               Aspirin Data
648            birthdeathrates                                                                 Birth and Death Rates Data
649              bladdercancer                                                                        Bladder Cancer Data
650                     clouds                                                                         Cloud Seeding Data
651                   epilepsy                                                                              Epilepsy Data
652                     foster                                                                  Foster Feeding Experiment
653                 heptathlon                                                              Olympic Heptathlon Seoul 1988
654                 mastectomy                                  Survival Times after Mastectomy of Breast Cancer Patients
655                      meteo                                                   Meteorological Measurements for 11 Years
656                orallesions                                                                Oral Lesions in Rural India
657                  phosphate                                                                       Phosphate Level Data
658                pistonrings                                                                      Piston Rings Failures
659                    planets                                                                            Exoplanets Data
660                     plasma                                                                       Blood Screening Data
661                     polyps                                                            Familial Andenomatous Polyposis
662                    polyps3                                                            Familial Andenomatous Polyposis
663                    pottery                                                                Romano-British Pottery Data
664                  rearrests                                                               Rearrests of Juvenile Felons
665                respiratory                                                                   Respiratory Illness Data
666                  roomwidth                                                   Students Estimates of Lecture Room Width
667              schizophrenia                                                         Age of Onset of Schizophrenia Data
668             schizophrenia2                                                                         Schizophrenia Data
669                 schooldays                                                                   Days not Spent at School
670                     skulls                                                                            Egyptian Skulls
671                    smoking                                                         Nicotine Gum and Smoking Cessation
672                   students                                                                        Student Risk Taking
673                   suicides                                                       Crowd Baiting Behaviour and Suicides
674                 toothpaste                                                                            Toothpaste Data
675                     voting                                                       House of Representatives Voting Data
676                      water                                                               Mortality and Water Hardness
677                 watervoles                                                                           Water Voles Data
678                      waves                                                         Electricity from Wave Power at Sea
679                 weightgain                                                                     Gain in Weight of Rats
680                 womensrole                                                                     Womens Role in Society
681                  Bechtoldt                                               Seven data sets showing a bifactor solution.
682                Bechtoldt.1                                               Seven data sets showing a bifactor solution.
683                Bechtoldt.2                                               Seven data sets showing a bifactor solution.
684                      Dwyer                                        8 cognitive variables used by Dwyer for an example.
685                     Gleser  Example data from Gleser, Cronbach and Rajaratnam (1965) to show basic principles of g...
686                    Gorsuch                      Example data set from Gorsuch (1997) for an example factor extension.
687                   Harman.5                                              5 socio-economic variables from Harman (1967)
688                   Harman.8                               Correlations of eight physical variables (from Harman, 1966)
689           Harman.political                            Eight political variables used by Harman (1967) as example 8.17
690                  Holzinger                                               Seven data sets showing a bifactor solution.
691                Holzinger.9                                               Seven data sets showing a bifactor solution.
692                      Reise                                               Seven data sets showing a bifactor solution.
693                     Schmid         12 variables created by Schmid and Leiman to show the Schmid-Leiman Transformation
694                  Thurstone                                               Seven data sets showing a bifactor solution.
695               Thurstone.33                                               Seven data sets showing a bifactor solution.
696                     Tucker                                 9 Cognitive variables discussed by Tucker and Lewis (1973)
697                    ability                                           16 ability items scored as correct or incorrect.
698                     affect  Two data sets of affect and arousal scores as a function of personality and movie cond...
699                        bfi                                                25 Personality items representing 5 factors
700             bfi.dictionary                                                25 Personality items representing 5 factors
701                       blot                                                      Bond's Logical Operations Test - BLOT
702                       burt                                                    11 emotional variables from Burt (1915)
703                     cities                                                             Distances between 11 US cities
704                     cubits          Galton's example of the relationship between height and 'cubit' or forearm length
705                     cushny  A data set from Cushny and Peebles (1905) on the effect of three drugs on hours of sle...
706                        epi                             Eysenck Personality Inventory (EPI) data for 3570 participants
707                    epi.bfi           13 personality scales from the Eysenck Personality Inventory and Big 5 inventory
708             epi.dictionary                             Eysenck Personality Inventory (EPI) data for 3570 participants
709                     galton                                                      Galton's Mid parent child height data
710                    heights                               A data.frame of the Galton (1888) height and cubit data set.
711                     income                                                       US family income from US census 2008
712                    iqitems                                                                16 multiple choice IQ items
713                        msq              75 mood items from the Motivational State Questionnaire for 3896 participants
714                        neo                                            NEO correlation matrix from the NEO_PI_R manual
715                       peas                                                                              Galton's Peas
716                    sat.act                                                     3 Measures of ability: SATV, SATQ, ACT
717              withinBetween          An example of the distinction between within group and between group correlations
718                      Bosco                                                                             Boscovich Data
719                   CobarOre                                                                             Cobar Ore data
720                    Mammals                                             Garland(1983) Data on Running Speed of Mammals
721                      barro                                                                                 Barro Data
722                      engel                                                                                 Engel Data
723                        uis                                                              UIS Drug Treatment study data
724                     dietox                                        Growth curves of pigs in a 3x3 factorial experiment
725                       koch                                                                     Ordinal Data from Koch
726                       ohio                                                                Ohio Children Wheeze Status
727                    respdis                                                     Clustered Ordinal Respiratory Disorder
728                respiratory              Data from a clinical trial comparing two treatments for a respiratory illness
729                    seizure                                                                         Epiliptic Seizures
730                    sitka89                                                               Growth of Sitka Spruce Trees
731                     spruce                                                          Log-size of 79 Sitka spruce trees
732                      liver                                                              Liver related laboratory data
733                  portpirie                                                    Rain, wavesurge and portpirie datasets.
734                       rain                                                    Rain, wavesurge and portpirie datasets.
735                     summer                                Air pollution data, separately for summer and winter months
736                  wavesurge                                                    Rain, wavesurge and portpirie datasets.
737                     winter                                Air pollution data, separately for summer and winter months
738                  arthritis                                                        Rheumatoid Arthritis Clinical Trial
739                    housing                                                                              Homeless Data
740                        bmw                                                       Daily Log Returns on BMW Share Price
741                     danish                                                               Danish Fire Insurance Claims
742                nidd.annual                                                                        The River Nidd Data
743                nidd.thresh                                                                        The River Nidd Data
744                    siemens                                                   Daily Log Returns on Siemens Share Price
745                     sp.raw                                                                       SP Data to June 1993
746                     spto87                                                             SP Return Data to October 1987
747                   Dyestuff                                                                 Yield of dyestuff by batch
748                  Dyestuff2                                                                 Yield of dyestuff by batch
749                   InstEval                               University Lecture/Instructor Evaluations by Students at ETH
750                     Pastes                                                           Paste strength by batch and cask
751                 Penicillin                                                            Variation in penicillin testing
752                    VerbAgg                                                           Verbal Aggression item responses
753                       cake                                                          Breakage Angle of Chocolate Cakes
754                       cbpp                                                          Contagious bovine pleuropneumonia
755                grouseticks                                           Data on red grouse ticks from Elston et al. 2001
756                 sleepstudy                                                Reaction times in a sleep deprivation study
```


---
# Reference
- [pandas.set_option](https://pandas.pydata.org/docs/reference/api/pandas.set_option.html)