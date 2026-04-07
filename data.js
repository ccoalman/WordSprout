const EMOJI_IMAGE_BASE = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/";

function emojiToCodePoints(emoji) {
  return Array.from(emoji)
    .map(char => char.codePointAt(0))
    .filter(code => code !== 0xfe0f)
    .map(code => code.toString(16))
    .join("-");
}

function emojiImage(emoji) {
  return `${EMOJI_IMAGE_BASE}${emojiToCodePoints(emoji)}.svg`;
}

function createWord({
  id,
  word,
  phonetic,
  definition,
  example,
  emoji,
  category,
  level = "Easy"
}) {
  return {
    id,
    word,
    phonetic,
    definition,
    example,
    image: emojiImage(emoji),
    category,
    level,
    emoji
  };
}

const WORDS = [
  createWord({
    id: "dog",
    word: "dog",
    phonetic: "/dɒɡ/",
    definition: "A furry animal that barks and is often kept as a pet.",
    example: "The dog wagged its tail when it saw me.",
    emoji: "🐶",
    category: "Animals"
  }),
  createWord({
    id: "cat",
    word: "cat",
    phonetic: "/kæt/",
    definition: "A small furry animal that meows.",
    example: "The cat slept on the sofa.",
    emoji: "🐱",
    category: "Animals"
  }),
  createWord({
    id: "fish",
    word: "fish",
    phonetic: "/fɪʃ/",
    definition: "An animal that lives in water and has fins.",
    example: "The fish swam in the tank.",
    emoji: "🐟",
    category: "Animals"
  }),
  createWord({
    id: "bird",
    word: "bird",
    phonetic: "/bɝːd/",
    definition: "An animal with feathers and wings.",
    example: "The bird sat on the tree branch.",
    emoji: "🐦",
    category: "Animals"
  }),
  createWord({
    id: "rabbit",
    word: "rabbit",
    phonetic: "/ˈræbɪt/",
    definition: "A small animal with long ears that hops.",
    example: "The rabbit ate a carrot.",
    emoji: "🐰",
    category: "Animals"
  }),
  createWord({
    id: "elephant",
    word: "elephant",
    phonetic: "/ˈelɪfənt/",
    definition: "A very large animal with a trunk.",
    example: "The elephant sprayed water with its trunk.",
    emoji: "🐘",
    category: "Animals",
    level: "Medium"
  }),
  createWord({
    id: "lion",
    word: "lion",
    phonetic: "/ˈlaɪən/",
    definition: "A big wild cat with a loud roar.",
    example: "The lion rested in the sun.",
    emoji: "🦁",
    category: "Animals",
    level: "Medium"
  }),
  createWord({
    id: "monkey",
    word: "monkey",
    phonetic: "/ˈmʌŋki/",
    definition: "An animal that likes to climb and swing.",
    example: "The monkey swung from the tree.",
    emoji: "🐵",
    category: "Animals"
  }),
  createWord({
    id: "frog",
    word: "frog",
    phonetic: "/frɒɡ/",
    definition: "A small animal that jumps and lives near water.",
    example: "The frog jumped into the pond.",
    emoji: "🐸",
    category: "Animals"
  }),
  createWord({
    id: "turtle",
    word: "turtle",
    phonetic: "/ˈtɝːtəl/",
    definition: "An animal with a hard shell.",
    example: "The turtle moved very slowly.",
    emoji: "🐢",
    category: "Animals",
    level: "Medium"
  }),
  createWord({
    id: "horse",
    word: "horse",
    phonetic: "/hɔːrs/",
    definition: "A large animal that can run very fast.",
    example: "The horse ran across the field.",
    emoji: "🐴",
    category: "Animals"
  }),
  createWord({
    id: "duck",
    word: "duck",
    phonetic: "/dʌk/",
    definition: "A bird that swims and has a flat bill.",
    example: "The duck floated on the lake.",
    emoji: "🦆",
    category: "Animals"
  }),

  createWord({
    id: "apple",
    word: "apple",
    phonetic: "/ˈæpəl/",
    definition: "A round fruit that can be red or green.",
    example: "I ate an apple at lunch.",
    emoji: "🍎",
    category: "Food"
  }),
  createWord({
    id: "banana",
    word: "banana",
    phonetic: "/bəˈnænə/",
    definition: "A long yellow fruit that is easy to peel.",
    example: "The banana was sweet and soft.",
    emoji: "🍌",
    category: "Food"
  }),
  createWord({
    id: "pizza",
    word: "pizza",
    phonetic: "/ˈpiːtsə/",
    definition: "A baked food with cheese and toppings.",
    example: "We shared a big pizza for dinner.",
    emoji: "🍕",
    category: "Food"
  }),
  createWord({
    id: "ice-cream",
    word: "ice cream",
    phonetic: "/ˈaɪs kriːm/",
    definition: "A cold sweet treat that melts quickly.",
    example: "She had chocolate ice cream in a cone.",
    emoji: "🍦",
    category: "Food"
  }),
  createWord({
    id: "bread",
    word: "bread",
    phonetic: "/bred/",
    definition: "A soft food baked from flour.",
    example: "Dad made toast with bread.",
    emoji: "🍞",
    category: "Food"
  }),
  createWord({
    id: "milk",
    word: "milk",
    phonetic: "/mɪlk/",
    definition: "A white drink often poured on cereal.",
    example: "I poured milk into my cup.",
    emoji: "🥛",
    category: "Food"
  }),
  createWord({
    id: "egg",
    word: "egg",
    phonetic: "/eɡ/",
    definition: "A food with a shell that can be cooked many ways.",
    example: "Mom fried an egg for breakfast.",
    emoji: "🥚",
    category: "Food"
  }),
  createWord({
    id: "rice",
    word: "rice",
    phonetic: "/raɪs/",
    definition: "Small white grains cooked and eaten as food.",
    example: "We had rice with dinner.",
    emoji: "🍚",
    category: "Food"
  }),
  createWord({
    id: "carrot",
    word: "carrot",
    phonetic: "/ˈkærət/",
    definition: "A long orange vegetable that grows in the ground.",
    example: "The rabbit ate the carrot.",
    emoji: "🥕",
    category: "Food"
  }),
  createWord({
    id: "cake",
    word: "cake",
    phonetic: "/keɪk/",
    definition: "A sweet baked dessert.",
    example: "We ate cake at the party.",
    emoji: "🍰",
    category: "Food"
  }),
  createWord({
    id: "orange-fruit",
    word: "orange",
    phonetic: "/ˈɔrɪndʒ/",
    definition: "A round fruit with orange skin and juicy pieces inside.",
    example: "He peeled the orange for a snack.",
    emoji: "🍊",
    category: "Food"
  }),
  createWord({
    id: "strawberry",
    word: "strawberry",
    phonetic: "/ˈstrɔːberi/",
    definition: "A small red fruit with tiny seeds on the outside.",
    example: "The strawberry tasted sweet.",
    emoji: "🍓",
    category: "Food"
  }),

  createWord({
    id: "sun",
    word: "sun",
    phonetic: "/sʌn/",
    definition: "The bright star in the sky that gives us light and warmth.",
    example: "The sun was shining this morning.",
    emoji: "☀️",
    category: "Nature"
  }),
  createWord({
    id: "tree",
    word: "tree",
    phonetic: "/triː/",
    definition: "A tall plant with a trunk and branches.",
    example: "The tree gave us cool shade.",
    emoji: "🌳",
    category: "Nature"
  }),
  createWord({
    id: "flower",
    word: "flower",
    phonetic: "/ˈflaʊər/",
    definition: "The colorful part of a plant.",
    example: "The flower smelled nice.",
    emoji: "🌸",
    category: "Nature"
  }),
  createWord({
    id: "mountain",
    word: "mountain",
    phonetic: "/ˈmaʊntən/",
    definition: "A very high piece of land.",
    example: "Snow covered the mountain top.",
    emoji: "⛰️",
    category: "Nature",
    level: "Medium"
  }),
  createWord({
    id: "cloud",
    word: "cloud",
    phonetic: "/klaʊd/",
    definition: "A white or gray shape in the sky.",
    example: "A cloud moved across the sun.",
    emoji: "☁️",
    category: "Nature"
  }),
  createWord({
    id: "rain",
    word: "rain",
    phonetic: "/reɪn/",
    definition: "Water that falls from clouds.",
    example: "The rain made the ground wet.",
    emoji: "🌧️",
    category: "Nature"
  }),
  createWord({
    id: "moon",
    word: "moon",
    phonetic: "/muːn/",
    definition: "The bright round object we see in the night sky.",
    example: "The moon was big and bright.",
    emoji: "🌙",
    category: "Nature"
  }),
  createWord({
    id: "star",
    word: "star",
    phonetic: "/stɑːr/",
    definition: "A tiny bright light seen in the night sky.",
    example: "We looked at the stars at night.",
    emoji: "⭐",
    category: "Nature"
  }),
  createWord({
    id: "leaf",
    word: "leaf",
    phonetic: "/liːf/",
    definition: "A flat green part of a plant or tree.",
    example: "A leaf fell from the tree.",
    emoji: "🍃",
    category: "Nature"
  }),
  createWord({
    id: "river",
    word: "river",
    phonetic: "/ˈrɪvər/",
    definition: "A long stream of flowing water.",
    example: "The river moved quickly after the rain.",
    emoji: "🌊",
    category: "Nature"
  }),
  createWord({
    id: "snow",
    word: "snow",
    phonetic: "/snoʊ/",
    definition: "Soft white ice that falls from the sky when it is cold.",
    example: "The snow covered the road.",
    emoji: "❄️",
    category: "Nature"
  }),

  createWord({
    id: "ball",
    word: "ball",
    phonetic: "/bɔːl/",
    definition: "A round object used in games and sports.",
    example: "The kids kicked the ball outside.",
    emoji: "⚽",
    category: "Objects"
  }),
  createWord({
    id: "car",
    word: "car",
    phonetic: "/kɑːr/",
    definition: "A vehicle with wheels that people drive.",
    example: "The car stopped at the light.",
    emoji: "🚗",
    category: "Objects"
  }),
  createWord({
    id: "house",
    word: "house",
    phonetic: "/haʊs/",
    definition: "A building where people live.",
    example: "Their house has a blue door.",
    emoji: "🏠",
    category: "Objects"
  }),
  createWord({
    id: "book",
    word: "book",
    phonetic: "/bʊk/",
    definition: "Something you read that has pages.",
    example: "I read a book before bed.",
    emoji: "📘",
    category: "Objects"
  }),
  createWord({
    id: "chair",
    word: "chair",
    phonetic: "/tʃer/",
    definition: "A piece of furniture you sit on.",
    example: "Please sit on the chair.",
    emoji: "🪑",
    category: "Objects"
  }),
  createWord({
    id: "bicycle",
    word: "bicycle",
    phonetic: "/ˈbaɪsɪkəl/",
    definition: "A vehicle with two wheels that you pedal.",
    example: "He rode his bicycle to the park.",
    emoji: "🚲",
    category: "Objects",
    level: "Medium"
  }),
  createWord({
    id: "clock",
    word: "clock",
    phonetic: "/klɒk/",
    definition: "Something that tells the time.",
    example: "The clock showed three o'clock.",
    emoji: "🕒",
    category: "Objects"
  }),
  createWord({
    id: "key",
    word: "key",
    phonetic: "/kiː/",
    definition: "A small metal object used to open a lock.",
    example: "I used the key to open the door.",
    emoji: "🔑",
    category: "Objects"
  }),
  createWord({
    id: "phone",
    word: "phone",
    phonetic: "/foʊn/",
    definition: "A device used to call or message people.",
    example: "Her phone rang in the kitchen.",
    emoji: "📱",
    category: "Objects"
  }),
  createWord({
    id: "lamp",
    word: "lamp",
    phonetic: "/læmp/",
    definition: "A light you can turn on in a room.",
    example: "The lamp helped me read at night.",
    emoji: "💡",
    category: "Objects"
  }),
  createWord({
    id: "gift",
    word: "gift",
    phonetic: "/ɡɪft/",
    definition: "Something given to someone as a present.",
    example: "She opened her birthday gift.",
    emoji: "🎁",
    category: "Objects"
  }),

  createWord({
    id: "read",
    word: "read",
    phonetic: "/riːd/",
    definition: "To look at words and understand them.",
    example: "I like to read storybooks.",
    emoji: "📖",
    category: "Actions"
  }),
  createWord({
    id: "write",
    word: "write",
    phonetic: "/raɪt/",
    definition: "To make letters or words on paper.",
    example: "She used a pencil to write her name.",
    emoji: "✍️",
    category: "Actions"
  }),
  createWord({
    id: "run",
    word: "run",
    phonetic: "/rʌn/",
    definition: "To move very fast with your legs.",
    example: "The boy can run across the field.",
    emoji: "🏃",
    category: "Actions"
  }),
  createWord({
    id: "sing",
    word: "sing",
    phonetic: "/sɪŋ/",
    definition: "To make music with your voice.",
    example: "We sing songs in music class.",
    emoji: "🎤",
    category: "Actions"
  }),
  createWord({
    id: "clap",
    word: "clap",
    phonetic: "/klæp/",
    definition: "To hit your hands together to make a sound.",
    example: "The class began to clap.",
    emoji: "👏",
    category: "Actions"
  }),
  createWord({
    id: "sleep",
    word: "sleep",
    phonetic: "/sliːp/",
    definition: "To rest with your eyes closed.",
    example: "The baby went to sleep early.",
    emoji: "🛏️",
    category: "Actions"
  }),
  createWord({
    id: "jump",
    word: "jump",
    phonetic: "/dʒʌmp/",
    definition: "To push your body up off the ground.",
    example: "The girl can jump very high.",
    emoji: "🤸",
    category: "Actions"
  }),
  createWord({
    id: "draw",
    word: "draw",
    phonetic: "/drɔː/",
    definition: "To make a picture with a pencil or crayon.",
    example: "He likes to draw animals.",
    emoji: "🎨",
    category: "Actions"
  }),
  createWord({
    id: "dance",
    word: "dance",
    phonetic: "/dæns/",
    definition: "To move your body to music.",
    example: "They dance to their favorite song.",
    emoji: "💃",
    category: "Actions"
  }),
  createWord({
    id: "laugh",
    word: "laugh",
    phonetic: "/læf/",
    definition: "To make a happy sound when something is funny.",
    example: "We laugh at silly jokes.",
    emoji: "😂",
    category: "Actions"
  }),
  createWord({
    id: "swim",
    word: "swim",
    phonetic: "/swɪm/",
    definition: "To move through water.",
    example: "The children swim in the pool.",
    emoji: "🏊",
    category: "Actions"
  }),

  createWord({
    id: "pencil",
    word: "pencil",
    phonetic: "/ˈpensəl/",
    definition: "A tool used for writing or drawing.",
    example: "I sharpened my pencil.",
    emoji: "✏️",
    category: "School"
  }),
  createWord({
    id: "ruler",
    word: "ruler",
    phonetic: "/ˈruːlər/",
    definition: "A tool used to measure and draw straight lines.",
    example: "Use the ruler to draw a line.",
    emoji: "📏",
    category: "School"
  }),
  createWord({
    id: "backpack",
    word: "backpack",
    phonetic: "/ˈbækpæk/",
    definition: "A bag you carry on your back.",
    example: "My backpack is full of books.",
    emoji: "🎒",
    category: "School"
  }),
  createWord({
    id: "notebook",
    word: "notebook",
    phonetic: "/ˈnoʊtbʊk/",
    definition: "A book with pages for writing notes.",
    example: "She opened her notebook in class.",
    emoji: "📓",
    category: "School"
  }),
  createWord({
    id: "scissors",
    word: "scissors",
    phonetic: "/ˈsɪzərz/",
    definition: "A tool used for cutting paper.",
    example: "Use the scissors carefully.",
    emoji: "✂️",
    category: "School"
  }),
  createWord({
    id: "calculator",
    word: "calculator",
    phonetic: "/ˈkælkjəleɪtər/",
    definition: "A small machine used for math problems.",
    example: "He used a calculator in math class.",
    emoji: "🧮",
    category: "School",
    level: "Medium"
  }),
  createWord({
    id: "pen",
    word: "pen",
    phonetic: "/pen/",
    definition: "A tool filled with ink for writing.",
    example: "She signed her name with a pen.",
    emoji: "🖊️",
    category: "School"
  }),
  createWord({
    id: "crayon",
    word: "crayon",
    phonetic: "/ˈkreɪɒn/",
    definition: "A colored stick used for drawing.",
    example: "The child used a blue crayon.",
    emoji: "🖍️",
    category: "School"
  }),
  createWord({
    id: "desk",
    word: "desk",
    phonetic: "/desk/",
    definition: "A table used for writing or schoolwork.",
    example: "My books are on the desk.",
    emoji: "🪑",
    category: "School"
  }),
  createWord({
    id: "paper",
    word: "paper",
    phonetic: "/ˈpeɪpər/",
    definition: "A thin sheet used for writing or drawing.",
    example: "Draw your picture on the paper.",
    emoji: "📄",
    category: "School"
  }),
  createWord({
    id: "school-bus",
    word: "school bus",
    phonetic: "/skuːl bʌs/",
    definition: "A bus that takes children to school.",
    example: "The school bus arrived early.",
    emoji: "🚌",
    category: "School"
  }),

  createWord({
    id: "happy",
    word: "happy",
    phonetic: "/ˈhæpi/",
    definition: "Feeling glad and full of joy.",
    example: "She felt happy on her birthday.",
    emoji: "😊",
    category: "Feelings"
  }),
  createWord({
    id: "sad",
    word: "sad",
    phonetic: "/sæd/",
    definition: "Feeling unhappy.",
    example: "He felt sad when the game ended.",
    emoji: "😢",
    category: "Feelings"
  }),
  createWord({
    id: "angry",
    word: "angry",
    phonetic: "/ˈæŋɡri/",
    definition: "Feeling mad or upset.",
    example: "She was angry about the mess.",
    emoji: "😠",
    category: "Feelings"
  }),
  createWord({
    id: "scared",
    word: "scared",
    phonetic: "/skerd/",
    definition: "Feeling afraid.",
    example: "The loud noise made him scared.",
    emoji: "😨",
    category: "Feelings"
  }),
  createWord({
    id: "sleepy",
    word: "sleepy",
    phonetic: "/ˈsliːpi/",
    definition: "Feeling tired and ready to sleep.",
    example: "I feel sleepy after a long day.",
    emoji: "😴",
    category: "Feelings"
  }),
  createWord({
    id: "excited",
    word: "excited",
    phonetic: "/ɪkˈsaɪtɪd/",
    definition: "Feeling very happy and eager.",
    example: "The class was excited for the trip.",
    emoji: "🤩",
    category: "Feelings",
    level: "Medium"
  }),
  createWord({
    id: "surprised",
    word: "surprised",
    phonetic: "/sərˈpraɪzd/",
    definition: "Feeling shocked because something unexpected happened.",
    example: "I was surprised by the gift.",
    emoji: "😲",
    category: "Feelings",
    level: "Medium"
  }),
  createWord({
    id: "calm",
    word: "calm",
    phonetic: "/kɑːm/",
    definition: "Feeling quiet and peaceful.",
    example: "She took a deep breath and felt calm.",
    emoji: "😌",
    category: "Feelings"
  }),
  createWord({
    id: "proud",
    word: "proud",
    phonetic: "/praʊd/",
    definition: "Feeling good about something you did.",
    example: "He felt proud of his drawing.",
    emoji: "😎",
    category: "Feelings"
  }),
  createWord({
    id: "confused",
    word: "confused",
    phonetic: "/kənˈfjuːzd/",
    definition: "Not understanding something clearly.",
    example: "I felt confused by the hard question.",
    emoji: "😕",
    category: "Feelings",
    level: "Medium"
  }),
  createWord({
    id: "shy",
    word: "shy",
    phonetic: "/ʃaɪ/",
    definition: "Feeling nervous around people.",
    example: "The shy child spoke very softly.",
    emoji: "☺️",
    category: "Feelings"
  }),

  createWord({
    id: "red",
    word: "red",
    phonetic: "/red/",
    definition: "The color of an apple or a stop sign.",
    example: "She wore a red shirt.",
    emoji: "❤️",
    category: "Colors"
  }),
  createWord({
    id: "blue",
    word: "blue",
    phonetic: "/bluː/",
    definition: "The color of the sky on a clear day.",
    example: "The ocean looked blue.",
    emoji: "💙",
    category: "Colors"
  }),
  createWord({
    id: "green",
    word: "green",
    phonetic: "/ɡriːn/",
    definition: "The color of grass and leaves.",
    example: "The frog was green.",
    emoji: "💚",
    category: "Colors"
  }),
  createWord({
    id: "yellow",
    word: "yellow",
    phonetic: "/ˈjeloʊ/",
    definition: "The color of the sun or a banana.",
    example: "I picked the yellow crayon.",
    emoji: "💛",
    category: "Colors"
  }),
  createWord({
    id: "orange-color",
    word: "orange",
    phonetic: "/ˈɔrɪndʒ/",
    definition: "A bright color made from red and yellow.",
    example: "The pumpkin is orange.",
    emoji: "🧡",
    category: "Colors"
  }),
  createWord({
    id: "purple",
    word: "purple",
    phonetic: "/ˈpɝːpəl/",
    definition: "A color made from red and blue.",
    example: "She wore a purple hat.",
    emoji: "💜",
    category: "Colors"
  }),
  createWord({
    id: "pink",
    word: "pink",
    phonetic: "/pɪŋk/",
    definition: "A light red color.",
    example: "The flower was pink.",
    emoji: "💗",
    category: "Colors"
  }),
  createWord({
    id: "brown",
    word: "brown",
    phonetic: "/braʊn/",
    definition: "The color of chocolate or tree bark.",
    example: "The bear was brown.",
    emoji: "🤎",
    category: "Colors"
  }),
  createWord({
    id: "black",
    word: "black",
    phonetic: "/blæk/",
    definition: "A very dark color.",
    example: "The cat had black fur.",
    emoji: "🖤",
    category: "Colors"
  }),
  createWord({
    id: "white",
    word: "white",
    phonetic: "/waɪt/",
    definition: "The color of snow or milk.",
    example: "The clouds looked white.",
    emoji: "🤍",
    category: "Colors"
  }),

  createWord({
    id: "shirt",
    word: "shirt",
    phonetic: "/ʃɝːt/",
    definition: "Clothes you wear on the top half of your body.",
    example: "He put on a clean shirt.",
    emoji: "👕",
    category: "Clothing"
  }),
  createWord({
    id: "pants",
    word: "pants",
    phonetic: "/pænts/",
    definition: "Clothes that cover both legs.",
    example: "My pants have big pockets.",
    emoji: "👖",
    category: "Clothing"
  }),
  createWord({
    id: "shoes",
    word: "shoes",
    phonetic: "/ʃuːz/",
    definition: "Things you wear on your feet.",
    example: "She tied her shoes before running.",
    emoji: "👟",
    category: "Clothing"
  }),
  createWord({
    id: "hat",
    word: "hat",
    phonetic: "/hæt/",
    definition: "Something you wear on your head.",
    example: "He wore a hat in the sun.",
    emoji: "🧢",
    category: "Clothing"
  }),
  createWord({
    id: "dress",
    word: "dress",
    phonetic: "/dres/",
    definition: "A piece of clothing worn in one piece.",
    example: "She wore a blue dress.",
    emoji: "👗",
    category: "Clothing"
  }),
  createWord({
    id: "socks",
    word: "socks",
    phonetic: "/sɒks/",
    definition: "Soft clothing worn on your feet inside shoes.",
    example: "My socks are warm and soft.",
    emoji: "🧦",
    category: "Clothing"
  }),
  createWord({
    id: "jacket",
    word: "jacket",
    phonetic: "/ˈdʒækɪt/",
    definition: "A coat you wear to stay warm.",
    example: "She zipped up her jacket.",
    emoji: "🧥",
    category: "Clothing"
  }),
  createWord({
    id: "shorts",
    word: "shorts",
    phonetic: "/ʃɔːrts/",
    definition: "Short pants worn in warm weather.",
    example: "He wore shorts to the park.",
    emoji: "🩳",
    category: "Clothing"
  }),
  createWord({
    id: "gloves",
    word: "gloves",
    phonetic: "/ɡlʌvz/",
    definition: "Clothing worn on your hands.",
    example: "I wore gloves in the snow.",
    emoji: "🧤",
    category: "Clothing"
  }),
  createWord({
    id: "scarf",
    word: "scarf",
    phonetic: "/skɑːrf/",
    definition: "A long piece of clothing worn around the neck.",
    example: "Her scarf kept her warm.",
    emoji: "🧣",
    category: "Clothing"
  }),
  createWord({
    id: "boots",
    word: "boots",
    phonetic: "/buːts/",
    definition: "Strong shoes that cover the feet and ankles.",
    example: "He wore boots in the rain.",
    emoji: "🥾",
    category: "Clothing"
  })
];

const CATEGORIES = [
  "All",
  "Animals",
  "Food",
  "Nature",
  "Objects",
  "Actions",
  "School",
  "Feelings",
  "Colors",
  "Clothing"
];

function getWordsByCategory(category) {
  if (category === "All") {
    return WORDS;
  }

  return WORDS.filter(word => word.category === category);
}

function getWordsByLevel(level) {
  return WORDS.filter(word => word.level === level);
}

function getWordById(id) {
  return WORDS.find(word => word.id === id);
}

function getRandomWords(count, category = "All") {
  const source = [...getWordsByCategory(category)];

  for (let i = source.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [source[i], source[j]] = [source[j], source[i]];
  }

  return source.slice(0, count);
}