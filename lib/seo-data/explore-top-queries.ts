import { converterCategories } from '@/lib/units';

export type ExploreTopQueryLink = { label: string; href: string };

/** Shown in the “Explore more tools” grid — how many converter tiles. */
export const EXPLORE_MORE_TOOLS_COUNT = 10;

const DEFAULT_TOP_QUERIES: ExploreTopQueryLink[] = [
  { label: 'How many pounds is 1 kg when I’m reading a US recipe?', href: '/weight-converter?from=kg&to=lb&value=1' },
  { label: 'What’s room temperature in Fahrenheit if my thermostat says 22 °C?', href: '/temperature-converter?from=C&to=F&value=25' },
  { label: 'How far is 5 miles in km so I can compare to my running app?', href: '/length-converter?from=mi&to=km&value=1' },
  { label: 'My screen says 27 inches—how wide is that in cm?', href: '/length-converter?from=in&to=cm&value=1' },
  { label: 'How many liters is 2 US gallons of water?', href: '/volume-converter?from=gal&to=l&value=1' },
  { label: 'Why is my 500 MB file not half a GB on the label?', href: '/data-storage-converter?from=MB&to=GB&value=500' },
  { label: 'What is 18% of 80 without messing up the steps?', href: '/percentage-calculator' },
  { label: 'Convert EUR to USD at the mid-market exchange rate', href: '/loan-interest-calculator' },
  { label: 'If it’s noon UTC what time is it in Mumbai for a call?', href: '/time-zone-converter' },
  { label: 'How do I write 0.6 as a simplified fraction?', href: '/decimal-to-fraction' },
];

/**
 * Per-category top searches (10 each) — written like real typed queries, not keyword lists.
 * Keys match `Category['id']` in `lib/units.ts`.
 */
export const EXPLORE_TOP_QUERIES_BY_CATEGORY: Partial<Record<string, ExploreTopQueryLink[]>> = {
  weight: [
    { label: 'How many pounds is 70 kg on the scale at the gym?', href: '/weight-converter?from=kg&to=lb&value=1' },
    { label: 'I have 100 grams of butter—how many ounces is that?', href: '/weight-converter?from=g&to=oz&value=100' },
    { label: 'My luggage tag says 23 kg—what is that in pounds at the airport?', href: '/weight-converter?from=kg&to=lb&value=23' },
    { label: 'How many grams is one ounce when I’m weighing spices?', href: '/weight-converter?from=oz&to=g&value=1' },
    { label: 'What does a metric ton weigh in pounds in my head?', href: '/weight-converter?from=t&to=lb&value=1' },
    { label: 'I lost a stone—how many kg is that actually?', href: '/weight-converter?from=st&to=kg&value=10' },
    { label: 'The recipe says a cup of flour—how many ml is that cup?', href: '/volume-converter?from=cup&to=ml&value=1' },
    { label: 'Is a mile exactly the same in every country?', href: '/length-converter?from=mi&to=km&value=1' },
    { label: 'How many joules is one food Calorie really?', href: '/energy-converter?from=kcal&to=J&value=1' },
    { label: 'What should my calorie target be if I want a deficit?', href: '/calorie-deficit-calculator' },
  ],
  length: [
    { label: 'How many centimeters is an inch exactly for woodworking?', href: '/length-converter?from=in&to=cm&value=1' },
    { label: 'My room is 12 ft wide—how many meters is that for furniture?', href: '/length-converter?from=ft&to=m&value=10' },
    { label: 'The GPS says 100 km—how many miles is that if I think in mph?', href: '/length-converter?from=km&to=mi&value=100' },
    { label: 'I need 2.54 cm in inches for this spec sheet', href: '/length-converter?from=cm&to=in&value=2.54' },
    { label: 'How many meters is 100 yards on a football field?', href: '/length-converter?from=yd&to=m&value=100' },
    { label: 'This bolt is 25 mm—what fraction of an inch is that?', href: '/length-converter?from=mm&to=in&value=25' },
    { label: 'How many square feet is a 50 m² apartment in US listings?', href: '/area-converter?from=m2&to=sq-ft&value=50' },
    { label: 'If I drive 60 mph how fast is that in km/h abroad?', href: '/speed-converter?from=mph&to=km/h&value=60' },
    { label: 'What is 255 in binary for this programming class?', href: '/math-converter?from=decimal&to=binary&value=255' },
    { label: 'How heavy is a 30 kg box if I only think in pounds?', href: '/weight-converter?from=kg&to=lb&value=30' },
  ],
  volume: [
    { label: 'How many US gallons is 4 liters of gas roughly?', href: '/volume-converter?from=l&to=gal&value=4' },
    { label: 'The recipe wants 240 ml but I only have measuring cups', href: '/volume-converter?from=ml&to=cup&value=240' },
    { label: 'How many milliliters is 8 fl oz on a US drink can?', href: '/volume-converter?from=fl-oz&to=ml&value=8' },
    { label: 'I filled 12 gallons—how many liters did I pump?', href: '/volume-converter?from=gal&to=l&value=12' },
    { label: 'One cubic meter of water—how many liters is that?', href: '/volume-converter?from=m3&to=l&value=1' },
    { label: 'Is a pint bigger than a quart in the US?', href: '/volume-converter?from=pt&to=qt&value=1' },
    { label: 'How do I turn grams into cups when flour packs down?', href: '/weight-converter?from=g&to=oz&value=100' },
    { label: 'Paint is sold in liters but my room is measured in feet', href: '/area-converter' },
    { label: 'I need to scale a recipe by 150%—where do I start?', href: '/percentage-calculator' },
    { label: 'How much energy does boiling a liter of water take?', href: '/energy-converter?from=kWh&to=J&value=1' },
  ],
  temperature: [
    { label: 'What is 0 °C in Fahrenheit without guessing?', href: '/temperature-converter?from=C&to=F&value=0' },
    { label: 'It says 32 °F outside—is that freezing in Celsius?', href: '/temperature-converter?from=F&to=C&value=32' },
    { label: 'Water boils at 100 °C—what is that on a US oven dial?', href: '/temperature-converter?from=C&to=F&value=100' },
    { label: 'Room is 20 °C and I’m used to °F—what should I set?', href: '/temperature-converter?from=C&to=F&value=20' },
    { label: 'What is absolute zero in Celsius for my physics HW?', href: '/temperature-converter?from=K&to=C&value=273.15' },
    { label: 'The recipe says 350 °F—what Celsius do I use in Europe?', href: '/temperature-converter?from=F&to=C&value=350' },
    { label: 'How does a kilowatt-hour relate to heat at all?', href: '/energy-converter' },
    { label: 'Why does my tire pressure say psi but my pump shows bar?', href: '/pressure-converter?from=psi&to=bar&value=32' },
    { label: 'The forecast says 40 km/h wind—how fast is that in mph?', href: '/speed-converter?from=km/h&to=mph&value=40' },
    { label: 'By what percent did the temperature spike yesterday?', href: '/percentage-calculator' },
  ],
  'data-storage': [
    { label: 'Why is my upload limit 500 MB but only half a GB in my head?', href: '/data-storage-converter?from=MB&to=GB&value=500' },
    { label: 'How many TB is 1024 GB when I’m buying a drive?', href: '/data-storage-converter?from=GB&to=TB&value=1024' },
    { label: 'Is a kilobyte 1000 or 1024 bytes—I keep seeing both', href: '/data-storage-converter?from=KB&to=MB&value=1024' },
    { label: 'My Mac says GiB but the SSD box says GB—who’s right?', href: '/data-storage-converter?from=GiB&to=GB&value=1' },
    { label: 'How many bytes is 8 bits in one line of code?', href: '/data-storage-converter?from=b&to=B&value=8' },
    { label: 'My internet is 100 Mbps—why is my download not 100 MB per second?', href: '/speed-converter' },
    { label: 'How long is 90 seconds in minutes for my timeout?', href: '/time-converter?from=s&to=min&value=90' },
    { label: 'What is FF in decimal for this color picker?', href: '/math-converter?from=hex&to=decimal&value=FF' },
    { label: 'Is package weight the same as file size when I ship a hard drive?', href: '/weight-converter' },
    { label: 'What percent of my 1 TB quota did I just use?', href: '/percentage-calculator' },
  ],
  speed: [
    { label: 'How fast is 60 mph in km/h when I rent a car overseas?', href: '/speed-converter?from=mph&to=km/h&value=60' },
    { label: 'The homework wants m/s but my speedometer is km/h', href: '/speed-converter?from=km/h&to=m/s&value=100' },
    { label: 'The boat says 10 knots—how many mph is that in my head?', href: '/speed-converter?from=kn&to=mph&value=10' },
    { label: 'How many km/h is 10 m/s for a sprint stat?', href: '/speed-converter?from=m/s&to=km/h&value=10' },
    { label: 'How many miles is 10 km if I’m comparing race times?', href: '/length-converter?from=km&to=mi&value=10' },
    { label: 'If I drive 2 hours at 80 km/h how far did I go in miles?', href: '/time-converter?from=h&to=min&value=2' },
    { label: 'What does hurricane wind speed mean in units I know?', href: '/speed-converter?from=mph&to=km/h&value=74' },
    { label: 'Is MPG related to liters per 100 km or is that different?', href: '/volume-converter' },
    { label: 'If I ran 5% faster would my time drop by 5%?', href: '/percentage-calculator' },
    { label: 'When my flight lands what time is it back home?', href: '/time-zone-converter' },
  ],
  time: [
    { label: 'How many minutes is 1.5 hours for billing?', href: '/time-converter?from=h&to=min&value=1.5' },
    { label: 'How many seconds are in one day exactly?', href: '/time-converter?from=d&to=s&value=1' },
    { label: 'How many weeks is 14 days when HR asks?', href: '/time-converter?from=d&to=wk&value=14' },
    { label: 'How many seconds is 1000 ms in this log line?', href: '/time-converter?from=ms&to=s&value=1000' },
    { label: 'About how many seconds in a year if the textbook rounds?', href: '/time-converter?from=yr&to=s&value=1' },
    { label: 'If I schedule a call in London do I add or subtract hours?', href: '/time-zone-converter' },
    { label: 'How much extra do I pay if the loan runs six more months?', href: '/loan-interest-calculator' },
    { label: 'If I walk 5 km/h for 40 minutes how many meters is that?', href: '/length-converter' },
    { label: 'Is this Unix timestamp in seconds or milliseconds?', href: '/math-converter' },
    { label: 'What fraction of my day did I actually sleep?', href: '/fractions-calculator' },
  ],
  area: [
    { label: 'How many square feet is my 100 m² floor plan in US listings?', href: '/area-converter?from=m2&to=sq-ft&value=100' },
    { label: 'I bought 1 acre—how many hectares is that next door?', href: '/area-converter?from=ac&to=ha&value=1' },
    { label: 'The listing says 1,000 sq ft—what is that in square meters?', href: '/area-converter?from=sq-ft&to=m2&value=1000' },
    { label: 'How many square miles is one square kilometer roughly?', href: '/area-converter?from=km2&to=sq-mi&value=1' },
    { label: 'Do I multiply or square the length when I switch units for area?', href: '/length-converter' },
    { label: 'How many liters of paint for this wall if I know the area?', href: '/volume-converter' },
    { label: 'What’s 8% property tax on this assessed value?', href: '/sales-tax-calculator' },
    { label: 'What’s the area of a circle with this radius—homework format?', href: '/geometry-calculator' },
    { label: 'How many kilograms per acre if I’m thinking harvest yield?', href: '/weight-converter' },
    { label: 'How many feet is 100 meters on a track for pacing?', href: '/length-converter?from=m&to=ft&value=100' },
  ],
  energy: [
    { label: 'How many joules is one kWh on my electric bill?', href: '/energy-converter?from=kWh&to=J&value=1' },
    { label: 'What is 500 kcal on a label in joules so I can compare?', href: '/energy-converter?from=kcal&to=J&value=500' },
    { label: 'How many joules is 100 small calories in science class?', href: '/energy-converter?from=cal&to=J&value=100' },
    { label: 'How many joules is one watt-hour when I read a spec?', href: '/energy-converter?from=Wh&to=J&value=1' },
    { label: 'What should my daily calorie target be if I want to cut?', href: '/calorie-deficit-calculator' },
    { label: 'Is heat the same thing as temperature when I study thermodynamics?', href: '/temperature-converter' },
    { label: 'When pressure times volume shows up where does the unit come from?', href: '/pressure-converter' },
    { label: 'What percent of the battery did that one task use?', href: '/percentage-calculator' },
    { label: 'Roughly how many kWh is 1500 W running 8 hours a day for a month?', href: '/energy-converter?from=kWh&to=J&value=360' },
    { label: 'If power is energy per time what unit ties them together?', href: '/time-converter' },
  ],
  pressure: [
    { label: 'My tire says 32 psi—what is that in bar at the garage abroad?', href: '/pressure-converter?from=psi&to=bar&value=32' },
    { label: 'What is 1 atmosphere in kPa for this chemistry worksheet?', href: '/pressure-converter?from=atm&to=kpa&value=1' },
    { label: 'The datasheet is in bar but my gauge only shows psi', href: '/pressure-converter?from=bar&to=psi&value=1' },
    { label: 'Weather says 100 kPa—is that “one atmosphere” or close?', href: '/pressure-converter?from=kpa&to=pa&value=100' },
    { label: 'How do depth in water and pressure relate when I scuba dive?', href: '/volume-converter' },
    { label: 'Why does the ideal gas law use kelvin and not Celsius?', href: '/temperature-converter' },
    { label: 'How high is 50 kPa in feet of head if my textbook uses that?', href: '/length-converter' },
    { label: 'Is boost pressure on a turbo the same kind of psi as tires?', href: '/speed-converter' },
    { label: 'I’m 10% over recommended pressure—how bad is that really?', href: '/percentage-calculator' },
    { label: 'What key do I use for exponentials when pressure appears in a formula?', href: '/scientific-calculator' },
  ],
  math: [
    { label: 'What is 255 in binary for my CS exam?', href: '/math-converter?from=decimal&to=binary&value=255' },
    { label: 'What is FF hex in decimal for this color #RRGGBB?', href: '/math-converter?from=hex&to=decimal&value=FF' },
    { label: 'How do I turn the binary string 1111 into hex in one step?', href: '/math-converter?from=binary&to=hex&value=1111' },
    { label: 'What is 64 in base 8 if the prof asks for octal?', href: '/math-converter?from=decimal&to=octal&value=64' },
    { label: 'Where is the log key when I don’t have a physical calculator?', href: '/scientific-calculator' },
    { label: 'How do I add two fractions with different denominators fast?', href: '/fractions-calculator' },
    { label: 'What is 15% off this price without a calculator app?', href: '/percentage-calculator' },
    { label: 'I need to solve ax + b = 0—where do I type that?', href: '/algebra-calculator' },
    { label: 'What is the mean of this list of numbers for my lab report?', href: '/statistics-calculator' },
    { label: 'How do I convert 0.125 to a fraction for my worksheet?', href: '/decimal-to-fraction' },
  ],
  percentage: [
    { label: 'What is 35% of 200 without mixing up divide and multiply?', href: '/percentage-calculator?from=value&to=increase&value=100' },
    { label: 'If a price went from 50 to 60 what percent increase is that?', href: '/percentage-calculator?from=value&to=decrease&value=50' },
    { label: 'What tip should I leave on an $80 check at 18%?', href: '/percentage-calculator' },
    { label: 'My test score is 42/50—what percent is that so I can relax?', href: '/fractions-calculator' },
    { label: 'What would I pay each month if the APR is this high?', href: '/loan-interest-calculator' },
    { label: 'The receipt shows tax included—how do I back out the rate?', href: '/sales-tax-calculator' },
    { label: 'Is margin the same as markup when my boss says 20%?', href: '/sales-tax-calculator' },
    { label: 'If I take 20% off then another 10% off is that 28% total?', href: '/percentage-calculator' },
    { label: 'What’s percent error when my measurement is slightly off?', href: '/scientific-calculator' },
    { label: 'What fraction of the sample voted yes if 3 out of 40 did?', href: '/statistics-calculator' },
  ],
  geometry: [
    { label: 'How do I find the area of a circle from the radius only?', href: '/geometry-calculator?from=circle&to=square&value=5' },
    { label: 'What’s the area of a rectangle if I only know length and width?', href: '/geometry-calculator' },
    { label: 'I have a right triangle—how do I check the third side?', href: '/geometry-calculator' },
    { label: 'How many cubic units fit in this cylinder for my tank problem?', href: '/geometry-calculator' },
    { label: 'The diagram is in inches but the answer wants meters', href: '/length-converter' },
    { label: 'How many acres is my lot if the city thinks in hectares?', href: '/area-converter' },
    { label: 'What is sin(30°) without hunting for a textbook table?', href: '/trigonometry-calculator' },
    { label: 'I need to rearrange a formula—where do I solve for x?', href: '/algebra-calculator' },
    { label: 'If I blow up a drawing by 200% what happens to the area?', href: '/percentage-calculator' },
    { label: 'How many liters of concrete for this slab if I know thickness?', href: '/volume-converter' },
  ],
  algebra: [
    { label: 'How do I solve 2x + 3 = 11 step by step?', href: '/algebra-calculator' },
    { label: 'Where can I type logs and exponents for this homework?', href: '/scientific-calculator' },
    { label: 'How do I simplify a fraction before I plug it into this equation?', href: '/fractions-calculator' },
    { label: 'This word problem ends in “what percent”—where do I start?', href: '/percentage-calculator' },
    { label: 'I have a list of quiz scores—how do I average them fairly?', href: '/statistics-calculator' },
    { label: 'What is n choose k for this counting problem?', href: '/discrete-math-calculator' },
    { label: 'Why does my CS assignment want the answer in hex again?', href: '/math-converter' },
    { label: 'How much fencing do I need around this garden shape?', href: '/geometry-calculator' },
    { label: 'What angle should I use when the problem gives sin θ?', href: '/trigonometry-calculator' },
    { label: 'If a boat goes upstream for 2 hours how far is that with current?', href: '/time-converter' },
  ],
  scientific: [
    { label: 'What is log(1000) base 10 without a phone app?', href: '/scientific-calculator' },
    { label: 'How do I find sin and cos for the angle in this triangle?', href: '/trigonometry-calculator' },
    { label: 'Is my calculator in radians or degrees—I keep getting garbage?', href: '/trigonometry-calculator' },
    { label: 'What’s the mean of these lab trials before I write the summary?', href: '/statistics-calculator' },
    { label: 'By what percent did the pH change if I mis-measured once?', href: '/percentage-calculator' },
    { label: 'I need base 2 again for the same assignment as last week', href: '/math-converter' },
    { label: 'How many joules did this resistor dissipate in the lab?', href: '/energy-converter' },
    { label: 'What pressure does the gauge read in SI units for the report?', href: '/pressure-converter' },
    { label: 'How do I add 1/3 + 1/4 without finding a common denominator by hand?', href: '/fractions-calculator' },
    { label: 'What’s the volume of this solid so I can check the formula?', href: '/geometry-calculator' },
  ],
  fractions: [
    { label: 'How do I add ¾ and ⅔ without guessing?', href: '/fractions-calculator' },
    { label: 'What is 0.3… as a fraction in lowest terms?', href: '/decimal-to-fraction' },
    { label: 'My answer is 7/20—what decimal should the online quiz show?', href: '/fraction-to-decimal' },
    { label: 'How do I turn a percent into a fraction for this ratio problem?', href: '/percentage-calculator' },
    { label: 'Is 22/7 good enough as pi for this homework or not?', href: '/percentage-calculator' },
    { label: 'Where do I clear denominators in this rational equation?', href: '/algebra-calculator' },
    { label: 'What’s the ratio of boys to girls if 12 of 40 are boys?', href: '/statistics-calculator' },
    { label: 'The recipe halves everything—how much is half of ⅔ cup?', href: '/volume-converter' },
    { label: 'Can I represent this repeating decimal in base 2?', href: '/math-converter' },
    { label: 'How do I write really small numbers with scientific notation?', href: '/scientific-calculator' },
  ],
  statistics: [
    { label: 'What’s the average of these test scores if I drop the lowest?', href: '/statistics-calculator' },
    { label: 'What percent of the class passed if 18 of 25 did?', href: '/percentage-calculator' },
    { label: 'How many ways can I choose 3 people from 10 for a team?', href: '/discrete-math-calculator' },
    { label: 'What’s e^2 if my calculator only has ln and not exp?', href: '/scientific-calculator' },
    { label: 'How do I write ⅖ of the sample as a decimal for Excel?', href: '/fractions-calculator' },
    { label: 'If y = mx + b what is m from these two points?', href: '/algebra-calculator' },
    { label: 'How does tan relate to sine and cosine on the unit circle?', href: '/trigonometry-calculator' },
    { label: 'How many milliseconds between these two timestamps?', href: '/time-converter' },
    { label: 'How big is this dataset in MB if each row is 200 bytes?', href: '/data-storage-converter' },
    { label: 'What area under the curve are we even talking about here?', href: '/geometry-calculator' },
  ],
  trigonometry: [
    { label: 'What is sin(45°) if I don’t have a unit circle diagram?', href: '/trigonometry-calculator' },
    { label: 'Where is cos⁻¹ on a normal keyboard calculator?', href: '/scientific-calculator' },
    { label: 'How long is the hypotenuse if I know the other two sides?', href: '/geometry-calculator' },
    { label: 'Why does my answer change when I switch radian mode?', href: '/scientific-calculator' },
    { label: 'If velocity has an angle how fast is the forward part?', href: '/speed-converter' },
    { label: 'What grade is 37/45 as a percent for peace of mind?', href: '/percentage-calculator' },
    { label: 'Is correlation the same as slope in a scatter plot?', href: '/statistics-calculator' },
    { label: 'How do complex numbers tie into polar form in algebra?', href: '/algebra-calculator' },
    { label: 'How far is the lighthouse if tan θ times distance equals height?', href: '/length-converter' },
    { label: 'What angle in degrees is π/4 radians exactly?', href: '/math-converter' },
  ],
  health: [
    { label: 'What maintenance calories do I burn if I sit at a desk all day?', href: '/calorie-deficit-calculator' },
    { label: 'How many joules is what the treadmill says I burned in kcal?', href: '/energy-converter?from=kcal&to=J&value=1' },
    { label: 'The scale says 154 lb—how many kg is that at the doctor overseas?', href: '/weight-converter?from=lb&to=kg&value=154' },
    { label: 'My diet plan says 40% carbs—what does that mean in grams?', href: '/percentage-calculator' },
    { label: 'How many cups is 500 ml of rice before it cooks?', href: '/volume-converter' },
    { label: 'If I run 6 min/km what is that pace in min/mile?', href: '/speed-converter?from=km/h&to=mph&value=10' },
    { label: 'How many minutes is my 45-minute workout in seconds for the app?', href: '/time-converter' },
    { label: 'What fraction of my day was sleep if I slept 7h30?', href: '/fractions-calculator' },
    { label: 'How many fl oz is 2 liters of water a day really?', href: '/volume-converter?from=l&to=fl-oz&value=2' },
    { label: 'What’s the tax on groceries in my cart if the rate is 8.5%?', href: '/sales-tax-calculator' },
  ],
  /** FX query uses finance hub until a dedicated currency route exists. */
  finance: [
    { label: 'Convert EUR to USD at the mid-market exchange rate', href: '/loan-interest-calculator' },
    { label: 'What would my monthly payment be on a 5-year car loan?', href: '/loan-interest-calculator' },
    { label: 'How much total interest do I pay on this mortgage over 30 years?', href: '/loan-interest-calculator' },
    { label: 'If the price is $49.99 before tax what do I actually pay at 8%?', href: '/sales-tax-calculator' },
    { label: 'What is my annual return as a percent if the fund went up 12% then down 5%?', href: '/percentage-calculator' },
    { label: 'How long until I’m debt-free if I pay $200 extra each month?', href: '/time-converter' },
    { label: 'How many kWh did we use this month from the meter read?', href: '/energy-converter' },
    { label: 'What’s one share as a fraction of the whole portfolio?', href: '/fractions-calculator' },
    { label: 'Is my portfolio average return the same as the average of yearly returns?', href: '/statistics-calculator' },
    { label: 'When the US market opens what time is that in Tokyo for me?', href: '/time-zone-converter' },
  ],
  tax: [
    { label: 'Is this price including VAT or do I add tax at checkout?', href: '/sales-tax-calculator' },
    { label: 'If I discount 20% then add 10% tax what do I actually pay?', href: '/sales-tax-calculator' },
    { label: 'What margin did we make if cost was X and we sold for Y?', href: '/percentage-calculator' },
    { label: 'Does the origination fee change the APR I should compare?', href: '/loan-interest-calculator' },
    { label: 'Should I tip on the pre-tax total or the total with tax?', href: '/percentage-calculator' },
    { label: 'How do I split this invoice three ways fairly with rounding?', href: '/fractions-calculator' },
    { label: 'I’m abroad—what time is the wire cutoff in the bank’s time zone?', href: '/time-zone-converter' },
    { label: 'How much does this parcel weigh if customs charges by kg?', href: '/weight-converter' },
    { label: 'Why does my phone plan say GB but speedtest says Mbps?', href: '/data-storage-converter' },
    { label: 'Is the carbon fee on my bill per kWh or flat?', href: '/energy-converter' },
  ],
  timezone: [
    { label: 'If it’s noon UTC what time is it in Mumbai for a standup?', href: '/time-zone-converter?from=utc&to=india&value=12' },
    { label: 'What time in London when it’s 9 a.m. in New York today?', href: '/time-zone-converter?from=usa-eastern&to=united-kingdom&value=9' },
    { label: 'How many minutes is a 90-minute meeting in my calendar app?', href: '/time-converter?from=h&to=min&value=1' },
    { label: 'How fast was the plane going if the flight was 6 hours and this far?', href: '/speed-converter' },
    { label: 'What percent of my workday is left after that 2-hour block?', href: '/percentage-calculator' },
    { label: 'How many feet is 5000 meters of runway if I think in feet?', href: '/length-converter' },
    { label: 'When European markets close what time is that on the West Coast?', href: '/loan-interest-calculator' },
    { label: 'Is this Unix timestamp in seconds or milliseconds—I always forget?', href: '/math-converter' },
    { label: 'How do I add hours in UTC without breaking daylight saving mess?', href: '/scientific-calculator' },
    { label: 'The log says UTC—what local wall clock do I tell my manager in India?', href: '/time-zone-converter' },
  ],
  discrete: [
    { label: 'How many subsets can I form from a set of size n?', href: '/discrete-math-calculator' },
    { label: 'What is 12 choose 3 for this committee problem?', href: '/discrete-math-calculator' },
    { label: 'How do I prove this with a truth table in two variables?', href: '/math-converter' },
    { label: 'If I sample with replacement how likely is at least one match?', href: '/statistics-calculator' },
    { label: 'What probability as a percent should I report in the conclusion?', href: '/percentage-calculator' },
    { label: 'How do matrix rows work when the prof says “row-reduce”?', href: '/algebra-calculator' },
    { label: 'Is this graph planar or do I need Euler’s formula?', href: '/geometry-calculator' },
    { label: 'Why does every CS homework want hex and binary again?', href: '/math-converter' },
    { label: 'How big is 2^40 when the interview asks about search space?', href: '/scientific-calculator' },
    { label: 'What fraction of integers are even in this proof sketch?', href: '/fractions-calculator' },
  ],
};

/** @deprecated Use `getExploreTopQueriesForCategory` — kept for one release if imported elsewhere */
export const EXPLORE_TOP_WORLD_QUERIES = DEFAULT_TOP_QUERIES;

/** Curated overflow so the homepage SEO table can always list 100 unique questions. */
const HOMEPAGE_SEO_QUERY_PAD: ExploreTopQueryLink[] = [
  { label: 'How do I convert inches to millimeters for a 3D printer nozzle size?', href: '/length-converter?from=in&to=mm&value=0.4' },
  { label: 'What is 2.5 hours in decimal hours for a timesheet?', href: '/time-converter?from=h&to=min&value=2.5' },
  { label: 'How many tablespoons are in 15 ml of medicine?', href: '/volume-converter?from=ml&to=fl-oz&value=15' },
  { label: 'Convert 180 cm height to feet and inches mentally', href: '/length-converter?from=cm&to=ft&value=180' },
  { label: 'What is −40 °C in Fahrenheit—where do the scales meet?', href: '/temperature-converter?from=C&to=F&value=-40' },
  { label: 'How many MB is a 250 kB email attachment after base64 encoding roughly?', href: '/data-storage-converter?from=KB&to=MB&value=250' },
  { label: 'What is 3.5 bar tire pressure in psi for a European car manual?', href: '/pressure-converter?from=bar&to=psi&value=3.5' },
  { label: 'How many seconds is a 4:30 mile pace per kilometer?', href: '/speed-converter' },
  { label: 'What is 1 nautical mile in kilometers for marine charts?', href: '/length-converter?from=km&to=mi&value=1' },
  { label: 'How many BTU in one kWh for HVAC sizing comparisons?', href: '/energy-converter' },
  { label: 'Convert 0x1F to decimal for a Unicode code point exercise', href: '/math-converter?from=hex&to=decimal&value=1F' },
  { label: 'What is compound annual growth if value doubled in 5 years?', href: '/percentage-calculator' },
  { label: 'Surface area of a sphere from diameter for a balloon problem', href: '/geometry-calculator' },
  { label: 'Standard deviation of three lab measurements for error bars', href: '/statistics-calculator' },
  { label: 'Solve sin(x) = 0.5 for x in degrees on a quiz', href: '/trigonometry-calculator' },
  { label: 'LCD of 8 and 12 for adding fractions on homework', href: '/fractions-calculator' },
  { label: 'Mortgage payment if rate changes mid-year—ballpark check', href: '/loan-interest-calculator' },
  { label: 'Reverse sales tax from total paid at 7.25%', href: '/sales-tax-calculator' },
  { label: 'TDEE minus 500 kcal—what deficit percent is that?', href: '/calorie-deficit-calculator' },
  { label: 'Flight departs JFK 14:00—what time in London same day?', href: '/time-zone-converter' },
  { label: 'How many permutations of 4 books on a shelf?', href: '/discrete-math-calculator' },
  { label: 'Log₂(1024) for binary tree depth intuition', href: '/scientific-calculator' },
  { label: 'Normalize 2/√2 for a trig identity proof', href: '/algebra-calculator' },
  { label: 'Convert 95th percentile height z-score to cm if mean and SD known', href: '/statistics-calculator' },
  { label: 'Fuel liters per 100 km to miles per gallon for a UK review', href: '/volume-converter' },
  { label: 'Paper A4 width in inches for US binder compatibility', href: '/length-converter?from=cm&to=in&value=21' },
  { label: 'CPU TDP in watts—how many kWh per day at full load?', href: '/energy-converter' },
  { label: 'Rainfall mm to inches for a weather comparison', href: '/length-converter' },
  { label: 'Gold price per ounce to per gram for jewelry math', href: '/weight-converter' },
  { label: 'Marathon 3:30 finish—what average pace min/km?', href: '/speed-converter' },
  { label: 'IPv6 /64—how many addresses in scientific notation?', href: '/scientific-calculator' },
  { label: 'Recipe scaling: triple a cake that serves 8 to serve 24', href: '/fractions-calculator' },
  { label: 'Body fat percent from Navy method—verify with calculator', href: '/percentage-calculator' },
  { label: 'Time difference between Dubai and São Paulo for a webinar', href: '/time-zone-converter' },
  { label: 'Convert rpm to rad/s for a motor homework problem', href: '/scientific-calculator' },
  { label: 'How many pints in 2 UK litres after moving abroad?', href: '/volume-converter' },
  { label: 'Wind chill isn’t temperature—where do I convert units anyway?', href: '/temperature-converter' },
  { label: 'Pixel pitch in mm from 27" 1440p monitor diagonal', href: '/length-converter' },
  { label: 'Carbon kg per kWh grid factor for a rough footprint', href: '/energy-converter' },
  { label: 'Bit rate Mbps to MB per minute for video export', href: '/data-storage-converter' },
  { label: 'Slope percent from rise and run for wheelchair ramp code', href: '/percentage-calculator' },
  { label: 'Confidence interval half-width from sample size ballpark', href: '/statistics-calculator' },
  { label: 'Matrix 2×2 determinant for linear algebra drill', href: '/algebra-calculator' },
  { label: 'Half-life decay constant from doubling time', href: '/scientific-calculator' },
  { label: 'Convert stone and pounds to kg for NHS forms', href: '/weight-converter?from=st&to=kg&value=11' },
  { label: 'Swimming pool gallons to liters for chemical dosing', href: '/volume-converter' },
  { label: 'Altitude feet to meters for aviation METAR', href: '/length-converter?from=ft&to=m&value=35000' },
  { label: 'Thermal conductivity units sanity check with watts and kelvin', href: '/energy-converter' },
  { label: 'Subnet host count from CIDR /26 in binary', href: '/math-converter' },
];

const HOMEPAGE_SEO_CATEGORY_ORDER: (keyof typeof EXPLORE_TOP_QUERIES_BY_CATEGORY)[] = [
  'data-storage',
  'length',
  'weight',
  'volume',
  'temperature',
  'speed',
  'time',
  'area',
  'energy',
  'pressure',
  'math',
  'percentage',
  'geometry',
  'algebra',
  'scientific',
  'fractions',
  'statistics',
  'trigonometry',
  'health',
  'finance',
  'tax',
  'timezone',
  'discrete',
];

export type HomepageSeoQueryRow = ExploreTopQueryLink & { rank: number; tool: string };

export const HOMEPAGE_SEO_TOP_QUERIES_LIMIT = 100;

function normalizeHomepageQueryKey(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, ' ');
}

function toolLabelFromHref(href: string): string {
  const pathname = href.split('?')[0].replace(/^\//, '');
  const cat = converterCategories.find((c) => c.slug === pathname);
  if (cat) return cat.name;
  return pathname
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Merges default “world” queries and every category’s top queries, deduped by question text,
 * capped at `limit` (default 100) for the homepage SEO table.
 */
export function getHomepageSeoTopQueries(limit = HOMEPAGE_SEO_TOP_QUERIES_LIMIT): HomepageSeoQueryRow[] {
  const seen = new Set<string>();
  const out: ExploreTopQueryLink[] = [];

  const add = (items: ExploreTopQueryLink[]) => {
    for (const item of items) {
      if (out.length >= limit) return;
      const key = normalizeHomepageQueryKey(item.label);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
  };

  add(DEFAULT_TOP_QUERIES);
  for (const catId of HOMEPAGE_SEO_CATEGORY_ORDER) {
    const list = EXPLORE_TOP_QUERIES_BY_CATEGORY[catId];
    if (list) add(list);
  }
  for (const catId of Object.keys(EXPLORE_TOP_QUERIES_BY_CATEGORY).sort() as (keyof typeof EXPLORE_TOP_QUERIES_BY_CATEGORY)[]) {
    if (HOMEPAGE_SEO_CATEGORY_ORDER.includes(catId)) continue;
    const list = EXPLORE_TOP_QUERIES_BY_CATEGORY[catId];
    if (list) add(list);
  }
  if (out.length < limit) add(HOMEPAGE_SEO_QUERY_PAD);

  return out.slice(0, limit).map((row, i) => ({
    ...row,
    rank: i + 1,
    tool: toolLabelFromHref(row.href),
  }));
}

export function getExploreTopQueriesForCategory(categoryId: string): ExploreTopQueryLink[] {
  const list = EXPLORE_TOP_QUERIES_BY_CATEGORY[categoryId];
  if (list && list.length > 0) return list;
  return DEFAULT_TOP_QUERIES;
}

export function getExploreTopQueriesSectionMeta(categoryId: string): { title: string; subtitle: string } {
  const cat = converterCategories.find((c) => c.id === categoryId);
  const name = cat?.name ?? 'online calculators';
  return {
    title: `Top searches — ${name}`,
    subtitle: `Phrases people actually type—open a matching tool or example.`,
  };
}
