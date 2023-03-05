//yin yang symbols and names
const binary = [
    '⚋', '⚊'
]

const binaryName = [
    "DON'T", 'DO'
]

// four symbols
const quaternary = [
    '⚏', '⚎', 
    '⚍', '⚌'
]

const quaternaryName = [
    'YIELD', 'COOPERATE', 
    'COMPETE', 'IMPOSE'
]

// bagua
const octal = [
    '☷', '☶', '☵', '☴', 
    '☳', '☲', '☱', '☰'
]

const octalName = [
    'EARTH','MOUNTAIN','WATER','WIND',
    'THUNDER','FIRE','LAKE','HEAVEN'
]

// traditional iching oracles symbols and names in numeric order
const oracles = [
    '䷁', '䷖', '䷇', '䷓', '䷏', '䷢', '䷬', '䷋',
    '䷎', '䷳', '䷦', '䷴', '䷽', '䷷', '䷞', '䷠', 
    '䷆', '䷃', '䷜', '䷺', '䷧', '䷿', '䷮', '䷅', 
    '䷭', '䷑', '䷯', '䷸', '䷟', '䷱', '䷛', '䷫', 
    '䷗', '䷚', '䷂', '䷩', '䷲', '䷔', '䷐', '䷘', 
    '䷣', '䷕', '䷾', '䷤', '䷶', '䷝', '䷰', '䷌', 
    '䷒', '䷨', '䷻', '䷼', '䷵', '䷥', '䷹', '䷉', 
    '䷊', '䷙', '䷄', '䷈', '䷡', '䷍', '䷪', '䷀'
]

const names = [
    'Receptive Earth','Splitting Apart','Holding Together','Contemplation',
    'Enthusiasm','Progress','Gathering Together','Standstill',
    'Modesty','Keeping Still','Obstruction','Development',
    'Small Preponderance','Wanderer','Influence','Retreat',
    'The Army','Youthful Folly','Abysmal Water','Dispersion',
    'Deliverance', 'Before Completion','Oppression','Conflict',
    'Pushing Upward','Venom','The Well','Gentle Wind',
    'Continuity','The Cauldron','Great Preponderance','Coming To Meet',
    'Return','Mouth Corners','Difficult Beginning','Increase',
    'Arousing Thunder','Biting Through','Following','Innocence',
    'Hidden Intelligence','Grace','After Completion','The Family',
    'Abundance','Clinging Fire','Revolution','Fellowship',
    'Approach','Decrease','Limitation','Inner Truth',
    'Marrying Maiden','Opposition','Joyous Lake','Treading',
    'Peace','Great Taming','Waiting','Small Taming',
    'Great Power','Great Possession','Breakthrough','Creative Heaven'
]

// kind wen sequence of oracles
const sequence = [
    '2', '23', '8', '20', '16', '35', '45', '12', 
    '15', '52', '39', '53', '62', '56', '31', '33', 
    '7', '4', '29', '59', '40', '64', '47', '6', 
    '46', '18', '48', '57', '32', '50', '28', '44', 
    '24', '27', '3', '42', '51', '21', '17', '25', 
    '36', '22', '63', '37', '55', '30', '49', '13', 
    '19', '41', '60', '61', '54', '38', '58', '10', 
    '11', '26', '5', '9', '34', '14', '43', '1'
]

const iching = {
    "binary":
        [
            {
                "bin": "0",
                "sign": "⚋",
                "name": "yin",
                "judgement": "do not"
            },
            {
                "bin": "1",
                "sign": "⚊",
                "name": "yang",
                "judgement": "do"
            }
        ],
    "quaternary":
        [
            {
                "bin": "00",
                "sign": "⚏",
                "name": "old yin",
                "judgement": "yield"
            
            },
            {
                "bin": "01",
                "sign": "⚎",
                "name": "young yin",
                "judgement": "cooperate"
            
            },
            {
                "bin": "10",
                "sign": "⚍",
                "name": "young yang",
                "judgement": "compete"
            
            },
            {
                "bin": "11",
                "sign": "⚌",
                "name": "old yang",
                "judgement": "impose"
            
            }
        ],
    "octal":
        [
            {
                "bin": "000",
                "sign": "☷",
                "name": "Earth",
                "judgement": "earth"
            },
            {
                "bin": "001",
                "sign": "☶",
                "name": "Mountain",
                "judgement": "a mountain"
            },
            {
                "bin": "010",
                "sign": "☵",
                "name": "Water",
                "judgement": "water"
            },
            {
                "bin": "011",
                "sign": "☴",
                "name": "Wind",
                "judgement": "wind"
            },
            {
                "bin": "100",
                "sign": "☳",
                "name": "Thunder",
                "judgement": "thunder"
            },
            {
                "bin": "101",
                "sign": "☲",
                "name": "Fire",
                "judgement": "fire"
            },
            {
                "bin": "110",
                "sign": "☱",
                "name": "Lake",
                "judgement": "a lake"
            },
            {
                "bin": "111",
                "sign": "☰",
                "name": "Heaven",
                "judgement": "heaven"
            }
        ],
    "gua":
        // https://en.wikibooks.org/wiki/I_Ching/The_Moving_Line search binary values in reversed order ex: 100100 should be searched as 001001
        [
            {
                "bin": "000000",
                "sign": "䷁",
                "name": "Field",
                "judgement": "The Receptive brings about sublime success, Furthering through the perseverance of a mare. <br>If the superior man undertakes something and tries to lead, He goes astray; But if he follows, he finds guidance. It is favorable to find friends in the west and south, To forego friends in the east and north. Quiet perseverance brings good fortune.",
                "image": "The earth's condition is receptive devotion. <br>Thus the superior man who has breadth of character Carries the outer world.",
                "changes":
                    [
                        "When there is hoarfrost underfoot, Solid ice is not far off.",
                        "Straight, square, great. Without purpose, Yet nothing remains unfurthered.",
                        "Hidden lines. One is able to remain persevering. If by chance you are in the service of a king, Seek not works, but bring to completion.",
                        "A tied-up sack. No blame, no praise.",
                        "A yellow lower garment brings supreme good fortune.",
                        "Dragons fight in the meadow. Their blood is black and yellow.",
                        "Lasting perseverance furthers."
                    ]
            },
            {
                "bin": "000001",
                "sign": "䷖",
                "name": "Stripping",
                "judgement": "It does not further one To go anywhere.",
                "image": "The mountain rests upon the earth: The image of Splitting Apart. <br>Thus those above can insure their position Only by giving generously to those below.",
                "changes":
                    [
                        "The leg of the bed is split. Those who persevere are destroyed. Misfortune.",
                        "The bed is split at the edge. Those who persevere are destroyed. Misfortune.",
                        "He splits with them. No blame.",
                        "The bed is split up to the skin. Misfortune.",
                        "A shoal of fishes. Favor comes through the court ladies. Everything acts to further.",
                        "There is a large fruit still uneaten. The superior man receives a carriage. The house of the inferior man is split apart."
                    ]
            },
            {
                "bin": "000010",
                "sign": "䷇",
                "name": "Grouping",
                "judgement": "Holding Together brings good fortune. Inquire of the oracle once again Whether you possess sublimity, constancy, and perseverance; Then there is no blame. Those who are uncertain gradually join. Whoever comes too late Meets with misfortune.",
                "image": "On the earth is water: The image of Holding Together. <br>Thus the kings of antiquity Bestowed the different states as fiefs And cultivated friendly relations With the feudal lords.",
                "changes":
                    [
                        "Hold to him in truth and loyalty; This is without blame. Truth, like a full earthen bowl:  Thus in the end Good fortune comes from without.",
                        "Hold to him inwardly. Perseverance brings good fortune.",
                        "You hold together with the wrong people.",
                        "Hold to him outwardly also. Perseverance brings good fortune.",
                        "Manifestation of holding together. In the hunt the king uses beaters on three sides only And foregoes game that runs off in front. The citizens need no warning. Good fortune.",
                        "He finds no head for holding together. Misfortune."
                    ]
            },
            {
                "bin": "000011",
                "sign": "䷓",
                "name": "Viewing",
                "judgement": "The ablution has been made, But not yet the offering. Full of trust they look up to him.",
                "image": "The wind blows over the earth: The image of Contemplation. <br>Thus the kings of old visited the regions of the world, Contemplated the people, And gave them instruction.",
                "changes":
                    [
                        "Boylike contemplation. For an inferior man, no blame. For a superior man, humiliation.",
                        "Contemplation through the crack of the door. Furthering for the perseverance of a woman.",
                        "Contemplation of my life Decides the choice Between advance and retreat.",
                        "Contemplation of the light of the kingdom. It furthers one to exert influence as the guest of a king.",
                        "Contemplation of my life. The superior man is without blame.",
                        "Contemplation of his life. The superior man is without blame."
                    ]
            },
            {
                "bin": "000100",
                "sign": "䷏",
                "name": "Providing-For",
                "judgement": "It furthers one to install helpers And to set armies marching.",
                "image": "Thunder comes resounding out of the earth: <br>The image of Enthusiasm. Thus the ancient kings made music In order to honor merit, And offered it with splendor To the Supreme Deity, Inviting their ancestors to be present.",
                "changes":
                    [
                        "Enthusiasm that expresses itself Brings misfortune.",
                        "Firm as a rock. Not a whole day. Perseverance brings good fortune.",
                        "Enthusiasm that looks upward creates remorse. Hesitation brings remorse.",
                        "The source of enthusiasm. He achieves great things. Doubt not. You gather friends around you As a hair clasp gathers the hair.",
                        "Persistently ill, and still does not die.",
                        "Deluded enthusiasm. But if after completion one changes, There is no blame."
                    ]
            },
            {
                "bin": "000101",
                "sign": "䷢",
                "name": "Prospering",
                "judgement": "The powerful prince Is honored with horses in large numbers. In a single day he is granted audience three times.",
                "image": "The sun rises over the earth: The image of Progress. <br>Thus the superior man himself Brightens his bright virtue.",
                "changes":
                    [
                        "Progressing, but turning back. Perseverance brings good fortune. If one meets with no confidence, one should remain calm. No mistake.",
                        "Progressing, but in sorrow. Perseverance brings good fortune. Then one obtains happiness from one's ancestress.",
                        "All are in accord. Remorse disappears.",
                        "Progress like a hamster. Perseverance brings danger.",
                        "Remorse disappears. Take not gain and loss to heart. Undertakings bring good fortune. Everything serves to further.",
                        "Making progress with the horns is permissible Only for the purpose of punishing one's own city. To be conscious of danger brings good fortune. No blame. Perseverance brings humiliation."
                    ]
            },
            {
                "bin": "000110",
                "sign": "䷬",
                "name": "Clustering",
                "judgement": "Success. The king approaches his temple. It furthers one to see the great man. This brings success. Perseverance furthers. To bring great offerings creates good fortune. It furthers one to undertake something.",
                "image": "Over the earth, the lake: The image of Gathering Together. <br>Thus the superior man renews his weapons In order to meet the unforeseen.",
                "changes":
                    [
                        "If you are sincere, but not to the end, There will sometimes be confusion, sometimes gathering together. If you call out, Then after one grasp of the hand you can laugh again. Regret not. Going is without blame.",
                        "Letting oneself be drawn Brings good fortune and remains blameless. If one is sincere, It furthers one to bring even a small offering.",
                        "Gathering together amid sighs. Nothing that would not further. Going is without blame. Slight humiliation.",
                        "Great good fortune. No blame.",
                        "If in gathering together one has position, This brings no blame. If there are some who are not yet sincere in the work, Sublime and enduring perseverance is needed. Then remorse disappears.",
                        "Lamenting and sighing,floods of tears. No blame."
                    ]
            },
            {
                "bin": "000111",
                "sign": "䷋",
                "name": "Obstruction",
                "judgement": "Evil people do not further The perseverance of the superior man. The great departs; the small approaches.",
                "image": "Heaven and earth do not unite: The image of Standstill. <br>Thus the superior man falls back upon his inner worth In order to escape the difficulties. He does not permit himself to be honored with revenue.",
                "changes":
                    [
                        "When the ribbon grass is pulled up, the sod comes with it. Each according to his kind. Perseverance brings good fortune and success.",
                        "They bear and endure; This means good fortune for inferior people. The standstill serves to help the great man attain success.",
                        "They bear shame.",
                        "He who acts at the command of the highest Remains without blame. Those of like mind partake of the blessing",
                        "Standstill is giving way. Good fortune for the great man. \"What if it should fail, what if it should fail?\"  In this way, he ties it to a cluster of mulberry shoots.",
                        "The standstill comes to an end. First standstill, then good fortune."
                    ]
            },
            {
                "bin": "001000",
                "sign": "䷎",
                "name": "Humbling",
                "judgement": "Modesty creates success. The superior man carries things through.",
                "image": "Within the earth, a mountain: The image of Modesty. <br>Thus the superior man reduces that which is too much, And augments that which is too little. He weighs things and makes them equal.",
                "changes":
                    [
                        "A superior man modest about his modesty May cross the great water. Good fortune.",
                        "Modesty that comes to expression. Perseverance brings good fortune.",
                        "A superior man of modesty and merit Carries things to conclusion. Good fortune.",
                        "Nothing that would not further modesty In movement.",
                        "No boasting of wealth before one's neighbor. It is favorable to attack with force. Nothing that would not further.",
                        "Modesty that comes to expression. It is favorable to set armies marching To chastise one's own city and one's country."
                    ]
            },
            {
                "bin": "001001",
                "sign": "䷳",
                "name": "Bound",
                "judgement": "Keeping his back still So that he no longer feels his body. He goes into the courtyard And does not see his people. No blame.",
                "image": "Mountains standing close together: The image of Keeping Still. <br>Thus the superior man Does not permit his thoughts To go beyond his situation.",
                "changes":
                    [
                        "Keeping his toes still. No blame. Continued perseverance furthers.",
                        "Keeping his calves still. He cannot rescue him whom he follows. His heart is not glad.",
                        "Keeping his hips still. Making his sacrum stiff. Dangerous. The heart suffocates.",
                        "Keeping his trunk still. No blame.",
                        "Keeping his jaws still. The words have order. Remorse disappears.",
                        "Noblehearted keeping still. Good fortune."
                    ]
            },
            {
                "bin": "001010",
                "sign": "䷦",
                "name": "Limping",
                "judgement": "The southwest furthers. The northeast does not further. It furthers one to see the great man. Perseverance brings good fortune.",
                "image": "Water on the mountain: The image of Obstruction. <br>Thus the superior man turns his attention to himself And molds his character.",
                "changes":
                    [
                        "Going leads to obstructions, Coming meets with praise.",
                        "The king's servant is beset by obstruction upon obstruction, But it is not his own fault.",
                        "Going leads to obstructions; Hence he comes back.",
                        "Going leads to obstructions, Coming leads to union.",
                        "In the midst of the greatest obstructions, Friends come.",
                        "Going leads to obstructions, Coming leads to great good fortune. It furthers one to see the great man."
                    ]
            },
            {
                "bin": "001011",
                "sign": "䷴",
                "name": "Infiltrating",
                "judgement": "The maiden Is given in marriage. Good fortune. Perseverance furthers.",
                "image": "On the mountain, a tree: The image of Development. <br>Thus the superior man abides in dignity and virtue, In order to improve the mores.",
                "changes":
                    [
                        "The wild goose gradually draws near the shore. The young son is in danger. There is talk. No blame.",
                        "The wild goose gradually draws near the cliff. Eating and drinking in peace and concord. Good fortune.",
                        "The wild goose gradually draws near the plateau. The man goes forth and does not return. The woman carries a child but does not bring it forth. Misfortune. It furthers one to fight off robbers.",
                        "The wild goose gradually draws near the tree. Perhaps it will find a flat branch. No blame.",
                        "The wild goose gradually draws near the summit. For three years the woman has no child. In the end nothing can hinder her. Good fortune.",
                        "The wild goose gradually draws near the cloud heights. Its feathers can be used for the sacred dance. Good fortune."
                    ]
            },
            {
                "bin": "001100",
                "sign": "䷽",
                "name": "Small Exceeding",
                "judgement": "Success. Perseverance furthers. Small things may be done; great things should not be done. The flying bird brings the message: It is not well to strive upward, It is well to remain below. Great good fortune.",
                "image": "Thunder on the mountain: The image of Preponderance of the Small. <br>Thus in his conduct the superior man gives preponderance to reverence. In bereavement he gives preponderance to grief. In his expenditures he gives preponderance to thrift.",
                "changes":
                    [
                        "The bird meets with misfortune through flying.",
                        "She passes by her ancestor And meets her ancestress. He does not reach his prince And meets the official. No blame.",
                        "If one is not extremely careful, Somebody may come up from behind and strike him. Misfortune",
                        "No blame. He meets him without passing by. Going brings danger. One must be on guard. Do not act. Be constantly persevering.",
                        "Dense clouds, No rain from our western territory. The prince shoots and hits him who is in the cave.",
                        "He passes him by, not meeting him. The flying bird leaves him. Misfortune. This means bad luck and injury."
                    ]
            },
            {
                "bin": "001101",
                "sign": "䷷",
                "name": "Sojourning",
                "judgement": "Success through smallness. Perseverance brings good fortune To the wanderer.",
                "image": "Fire on the mountain: The image of The Wanderer. <br>Thus the superior man Is clear-minded and cautious In imposing penalties, And protracts no lawsuits.",
                "changes":
                    [
                        "If the wanderer busies himself with trivial things, He draws down misfortune upon himself.",
                        "The wanderer comes to and inn. He has his property with him. He wins the steadfastness of a young servant.",
                        "The wanderer's inn burns down. He loses the steadfastness of his young servant. Danger.",
                        "The wanderer rests in a shelter. He obtains his property and an ax. My heart is not glad.",
                        "He shoots a pheasant. It drops with the first arrow. In the end this brings both praise and office.",
                        "The bird's nest burns up. The wanderer laughs at first, Then must needs lament and weep. Through carelessness he loses his cow. Misfortune."
                    ]
            },
            {
                "bin": "001110",
                "sign": "䷞",
                "name": "Conjoining",
                "judgement": "Success. Perseverance furthers. To take a maiden to wife brings good fortune.",
                "image": "A lake on the mountain: The image of Influence. <br>Thus the superior man encourages people to approach him By his readiness to receive them.",
                "changes":
                    [
                        "The influence shows itself in the big toe.",
                        "The influence shows itself in the calves of the legs. Misfortune. Tarrying brings good fortune.",
                        "The influence shows itself in the thighs. Holds to that which follows it. To continue is humiliating.",
                        "Perseverance brings good fortune. Remorse disappears. If a man is agitated in mind, And his thoughts go hither and thither, Only those friends On whom he fixes his conscious thoughts Will follow.",
                        "The influence shows itself in the back of the neck. No remorse.",
                        "The influence shows itself in the jaws, cheeks and tongue."
                    ]
            },
            {
                "bin": "001111",
                "sign": "䷠",
                "name": "Retiring",
                "judgement": "Success. In what is small, perseverance furthers.",
                "image": "Mountain under heaven: the image of Retreat. <br>Thus the superior man keeps the inferior man at a distance, Not angrily but with reserve.",
                "changes":
                    [
                        "At the tail in retreat. This is dangerous. One must not wish to undertake anything.",
                        "He holds him fast with yellow oxhide. No one can tear him loose.",
                        "A halted retreat Is nerve-wracking and dangerous. To retain people as men- and maidservants Brings good fortune.",
                        "Voluntary retreat brings good fortune to the superior man And downfall to the inferior man.",
                        "Friendly retreat. Perseverance brings good fortune.",
                        "Cheerful retreat. Everything serves to further."
                    ]
            },
            {
                "bin": "010000",
                "sign": "䷆",
                "name": "Leading",
                "judgement": "The army needs perseverance And a strong man. Good fortune without blame.",
                "image": "In the middle of the earth is water: The image of The Army. <br>Thus the superior man increases his masses By generosity toward the people.",
                "changes":
                    [
                        "An army must set forth in proper order. If the order is not good, misfortune threatens.",
                        "In the midst of the army. Good fortune. No blame. The king bestows a triple decoration.",
                        "Perchance the army carries corpses in the wagon. Misfortune.",
                        "The army retreats. No blame",
                        "There is game in the field. It furthers one to catch it. Without blame. Let the eldest lead the army. The younger transports corpses; Then perseverance brings misfortune.",
                        "The great prince issues commands, Founds states, vests families with fiefs. Inferior people should not be employed."
                    ]
            },
            {
                "bin": "010001",
                "sign": "䷃",
                "name": "Enveloping",
                "judgement": "Youthful Folly has success. It is not I who seek the young fool; The young fool seeks me. At the first oracle I inform him. If he asks two or three times, it is importunity. If he importunes, I give him no information. Perseverance furthers.",
                "image": "A spring wells up at the foot of the mountain: The image of Youth. <br>Thus the superior man fosters his character By thoroughness in all that he does.",
                "changes":
                    [
                        "To make a fool develop It furthers one to apply discipline. The fetters should be removed. To go on in this way brings humiliation.",
                        "To bear with fools in kindliness brings good fortune. To know how to take women Brings good fortune. The son is capable of taking charge of the household.",
                        "Take not a maiden who, when she sees a man of bronze, Loses possession of herself. Nothing furthers.",
                        "Entangled folly brings humiliation.",
                        "Childlike folly brings good fortune.",
                        "In punishing folly It does not further one To commit transgressions. The only thing that furthers Is to prevent transgressions."
                    ]
            },
            {
                "bin": "010010",
                "sign": "䷜",
                "name": "Gorge",
                "judgement": "The Abysmal repeated. If you are sincere, you have success in your heart, And whatever you do succeeds.",
                "image": "Water flows on uninterruptedly and reaches it goal: The image of the Abysmal repeated. <br>Thus the superior man walks in lasting virtue And carries on the business of teaching.",
                "changes":
                    [
                        "Repetition of the Abysmal. In the abyss one falls into a pit.Misfortune.",
                        "The abyss is dangerous. One should strive to attain small things only.",
                        "Forward and backward, abyss on abyss. In danger like this, pause at first and wait, Otherwise you will fall into a pit in the abyss. Do not act in this way.",
                        "A jug of wine, a bowl of rice with it; Earthen vessels Simply handed in through the window. There is certainly no blame in this.",
                        "The abyss is not filled to overflowing, It is filled only to the rim. No blame.",
                        "Bound with cords and ropes, Shut in between thorn-hedged prison walls:  For three years one does not find the way. Misfortune."
                    ]
            },
            {
                "bin": "010011",
                "sign": "䷺",
                "name": "Dispersing",
                "judgement": "Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers.",
                "image": "The wind drives over the water: The image of Dispersion. <br>vThus the kings of old sacrificed to the Lord And built temples.",
                "changes":
                    [
                        "He brings help with the strength of a horse. Good fortune.",
                        "At the dissolution He hurries to that which supports him. Remorse disappears.",
                        "He dissolves his self. No remorse.",
                        "He dissolves his bond with his group. Supreme good fortune. Dispersion leads in turn to accumulation. This is something that ordinary men do not think of.",
                        "His loud cries are as dissolving as sweat. Dissolution! A king abides without blame.",
                        "He dissolves his blood. Departing, keeping at a distance, going out, Is without blame."
                    ]
            },
            {
                "bin": "010100",
                "sign": "䷧",
                "name": "Deliverance",
                "judgement": "The southwest furthers. If there is no longer anything where one has to go, Return brings good fortune. If there is still something where one has to go, Hastening brings good fortune.",
                "image": "Thunder and rain set in: The image of Deliverance. <br>Thus the superior man pardons mistakes And forgives misdeeds.",
                "changes":
                    [
                        "Without blame.",
                        "One kills three foxes in the field And receives a yellow arrow.,Perseverance brings good fortune.",
                        "If a man carries a burden on his back And nontheless rides in a carriage, He thereby encourages robbers to draw near. Perseverance leads to humiliation.",
                        "Deliver yourself from your great toe. Then the companion comes, And him you can trust.",
                        "If only the superior man can deliver himself, It brings good fortune. Thus he proves to inferior men that he is in earnest.",
                        "The prince shoots at a hawk on a high wall. He kills it. Everything serves to further."
                    ]
            },
            {
                "bin": "010101",
                "sign": "䷿",
                "name": "Before Completion",
                "judgement": "Success. But if the little fox, after nearly completing the crossing, Gets his tail in the water, There is nothing that would further.",
                "image": "Fire over water: The image of the condition before transition. <br>Thus the superior man is careful In the differentiation of things, So that each finds its place.",
                "changes":
                    [
                        "He gets his tail in the water. Humiliating.",
                        "He brakes his wheels. Perseverance brings good fortune.",
                        "Before completion, attack brings misfortune. It furthers one to cross the great water.",
                        "Perseverance brings good fortune. Remorse disappears. Shock, thus to discipline the Devil's Country. For three years, great realms are awarded.",
                        "Perseverance brings good fortune. No remorse. The light of the superior man is true. Good fortune.",
                        "There is drinking of wine In genuine confidence. No blame. But if one wets his head, He loses it, in truth."
                    ]
            },
            {
                "bin": "010110",
                "sign": "䷮",
                "name": "Confining",
                "judgement": "Success. Perseverance. The great man brings about good fortune. No blame. When one has something to say, It is not believed.",
                "image": "There is no water in the lake: The image of Exhaustion. <br>Thus the superior man stakes his life On following his will.",
                "changes":
                    [
                        "One sits oppressed under a bare tree And strays into a gloomy valley. For three years one sees nothing.",
                        "One is oppressed while at meat and drink. The man with the scarlet knee bands is just coming. It furthers one to offer sacrifice. To set forth brings misfortune. No blame.",
                        "A man permits himself to be oppressed by stone, And leans on thorns and thistles. He enters his house and does not see his wife. Misfortune.",
                        "He comes very quietly, oppressed in a golden carriage. Humiliation, but the end is reached.",
                        "His nose and feet are cut off. Oppression at the hands of the man with the purple knee bands. Joy comes softly. It furthers one to make offerings and libations.",
                        "He is oppressed by creeping vines. He moves uncertainly and says, \"Movement brings remorse.\" If one feels remorse over this and makes a start, Good fortune comes."
                    ]
            },
            {
                "bin": "010111",
                "sign": "䷅",
                "name": "conflict",
                "judgement": "You are sincere And are being obstructed. A cautious halt halfway brings good fortune. Going through to the end brings misfortune. It furthers one to see the great man. It does not further one to cross the great water.",
                "image": "Heaven and water go their opposite ways: The image of Conflict. <br>Thus in all his transactions the superior man Carefully considers the beginning.",
                "changes":
                    [
                        "If one does not perpetuate the affair, There is little gossip. In the end, good fortune comes.",
                        "One cannot engage in conflict; One returns home, gives way. The people of his town, Three hundred households, Remain free of guilt.",
                        "To nourish oneself on ancient virtue induces perseverance. Danger.In the end,good fortune comes. If by chance you are in the service of a king,Seek not works.",
                        "One cannot engage in conflict. One turns back and submits to fate, Changes one's attitude, And finds peace in perseverance. Good fortune.",
                        "To contend before him Brings good fortune.",
                        "Even if by chance a leather belt is bestowed on one, By the end of morning It will have been snatched away three times."
                    ]
            },
            {
                "bin": "011000",
                "sign": "䷭",
                "name": "Ascending",
                "judgement": "Pushing Upward has supreme success. One must see the great man. Fear not. Departure toward the south Brings good fortune.",
                "image": "Within the earth, wood grows: The image of Pushing Upward. <br>Thus the superior man of devoted character Heaps up small things In order to achieve something high and great.",
                "changes":
                    [
                        "Pushing upward that meets with confidence Brings great good fortune",
                        "If one is sincere, It furthers one to bring even a small offering. No blame.",
                        "One pushes upward into an empty city.",
                        "The king offers him Mount Ch'i. Good fortune. No blame.",
                        "Perseverance brings good fortune. One pushes upward by steps.",
                        "Pushing upward in darkness. It furthers one to be unremittingly persevering"
                    ]
            },
            {
                "bin": "011001",
                "sign": "䷑",
                "name": "Correcting",
                "judgement": "Work on What Has Been Spoiled (decay) Has supreme success. It furthers one to cross the great water. Before the starting point, three days. After the starting point, three days.",
                "image": "The wind blows low on the mountain: The image of Decay. <br>Thus the superior man stirs up the people And strengthens their spirit.",
                "changes":
                    [
                        "Setting right what has been spoiled by the father. If there is a son, No blame rests upon the departed father. Danger. In the end good fortune",
                        "Setting right what has been spoiled by the mother. One must not be too persevering.",
                        "Setting right what has been spoiled by the father. There will be little remorse. No great blame.",
                        "Tolerating what has been spoiled by the father. In continuing one sees humiliation.",
                        "Setting right what has been spoiled by the father. One meets with praise.",
                        "He does not serve kings and princes, Sets himself higher goals."
                    ]
            },
            {
                "bin": "011010",
                "sign": "䷯",
                "name": "Welling",
                "judgement": "The town may be changed, But the well cannot be changed. It neither decreases nor increases. They come and go and draw from the well. If one gets down almost to the water And the rope does not go all the way, Or the jug breaks, it brings misfortune.",
                "image": "Water over wood: the image of The Well. <br>Thus the superior man encourages the people at their work, And exhorts them to help one another.",
                "changes":
                    [
                        "One does not drink the mud of the well. No animals come to an old well.",
                        "At the well hole one shoots fishes. The jug is broken and leaks.",
                        "The well is cleaned, but no one drinks from it. This is my heart's sorrow, For one might draw from it. If the king were clear-minded, Good fortune might be enjoyed in common.",
                        "The well is being lined. No blame.",
                        "In the well there is a clear, cold spring From which one can drink.",
                        "One draws from the well Without hindrance. It is dependable.Supreme good fortune."
                    ]
            },
            {
                "bin": "011011",
                "sign": "䷸",
                "name": "Ground",
                "judgement": "Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.",
                "image": "Winds following one upon the other: The image of the Gently Penetrating. <br>Thus the superior man Spreads his commands abroad And carries out his undertakings.",
                "changes":
                    [
                        "In advancing and in retreating, The perseverance of a warrior furthers.",
                        "Penetration under the bed. Priests and magicians are used in great number. Good fortune. No blame.",
                        "Repeated penetration. Humiliation.",
                        "Remorse vanishes. During the hunt Three kinds of game are caught.",
                        "Perseverance brings good fortune. Remorse vanishes. Nothing that does not further. No beginning, but an end. Before the change, three days. After the change, three days. Good fortune.",
                        "Penetration under the bed. He loses his property and his ax Perseverance brings misfortune."
                    ]
            },
            {
                "bin": "011100",
                "sign": "䷟",
                "name": "Persevering",
                "judgement": "Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.",
                "image": "Thunder and wind: the image of Duration. <br>Thus the superior man stands firm And does not change his direction.",
                "changes":
                    [
                        "Seeking duration too hastily brings misfortune persistently. Nothing that would further",
                        "Remorse disappears.",
                        "He who does not give duration to his character Meets with disgrace. Persistent humiliation.",
                        "No game in the field.",
                        "Giving duration to one's character through perseverance. This is good fortune for a woman, misfortune for a man.",
                        "Restlessness as an enduring condition brings misfortune."
                    ]
            },
            {
                "bin": "011101",
                "sign": "䷱",
                "name": "Holding",
                "judgement": "Supreme good fortune. Success.",
                "image": "Fire over wood: The image of The Caldron. <br>Thus the superior man consolidates his fate By making his position correct.",
                "changes":
                    [
                        "A ting with legs upturned. Furthers removal of stagnating stuff. One takes a concubine for the sake of her son. No blame.",
                        "There is food in the ting. My comrades are envious, But they cannot harm me. Good fortune.",
                        "The handle of the ting is altered. One is impeded in his way of life. The fat of the pheasant is not eaten. Once rain falls, remorse is spent. Good fortune comes in the end.",
                        "The legs of the ting are broken. The prince's meal is spilled And his person is soiled. Misfortune.",
                        "The ting has yellow handles, golden carrying rings. Perseverance furthers.",
                        "The ting has rings of jade. Great good fortune. Nothing that would not act to further."
                    ]
            },
            {
                "bin": "011110",
                "sign": "䷛",
                "name": "Great Exceeding",
                "judgement": "The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.",
                "image": "The lake rises above the trees: The image of Preponderance of the Great. <br>Thus the superior man, when he stands alone, Is unconcerned, And if he has to renounce the world, He is undaunted.",
                "changes":
                    [
                        "To spread white rushes underneath. No blame.",
                        "A dry poplar sprouts at the root. An older man takes a young wife. Everything furthers.",
                        "The ridgepole sags to the breaking point. Misfortune.",
                        "The ridgepole is braced. Good fortune. If there are ulterior motives, it is humiliating.",
                        "A withered poplar puts forth flowers. An older woman takes a husband. No blame. No praise.",
                        "One must go through the water. It goes over one's head. Misfortune. No blame."
                    ]
            },
            {
                "bin": "011111",
                "sign": "䷫",
                "name": "Coupling",
                "judgement": "The maiden is powerful. One should not marry such a maiden.",
                "image": "Under heaven, wind: The image of Coming to Meet. <br>Thus does the prince act when disseminating his commands And proclaiming them to the four quarters of heaven.",
                "changes":
                    [
                        "It must be checked with a brake of bronze. Perseverance brings good fortune. If one lets it take its course, one experiences misfortune. Even a lean pig has it in him to rage around.",
                        "There is a fish in the tank. No blame. Does not further guests.",
                        "There is no skin on his thighs, And walking comes hard. If one is mindful of the danger, No great mistake is made.",
                        "No fish in the tank. This leads to misfortune.",
                        "A melon covered with willow leaves. Hidden lines. Then it drops down to one from heaven.",
                        "He comes to meet with his horns. Humiliation. No blame."
                    ]
            },
            {
                "bin": "100000",
                "sign": "䷗",
                "name": "Returning",
                "judgement": "Success. Going out and coming in without error. Friends come without blame. To and Fro goes the way. On the seventh day comes return. It furthers one to have somewhere to go.",
                "image": "Thunder within the earth: The image of The Turning Point. <br>Thus the kings of antiquity closed the passes At the time of solstice. Merchants and strangers did not go about, And the ruler Did not travel through the provinces.",
                "changes":
                    [
                        "Return from a short distance. No need for remorse. Great good fortune",
                        "Quiet return. Good fortune.",
                        "Repeated return. Danger. No blame.",
                        "Walking in the midst of others, One returns alone.",
                        "Noblehearted return. No remorse.",
                        "Missing the return. Misfortune. Misfortune from within and without. If armies are set marching in this way, One will in the end suffer a great defeat, Disastrous for the ruler of the country. For ten years It will not be possible to attack again."

                    ]
            },
            {
                "bin": "100001",
                "sign": "䷚",
                "name": "Swallowing",
                "judgement": "Perseverance brings good fortune. Pay heed to the providing of nourishment. And to what a man seeks To fill his own mouth with.",
                "image": "At the foot of the mountain, thunder: The image of Providing Nourishment. <br>Thus the superior man is careful of his words And temperate in eating and drinking.",
                "changes":
                    [
                        "You let your magic tortoise go, And look at me with the corners of your mouth drooping. Misfortune.",
                        "Turning to the summit for nourishment, Deviating from the path To seek nourishment from the hill. Continuing to do this brings misfortune.",
                        "Turning away from nourishment. Perseverance brings misfortune. Do not act thus for ten years. Nothing serves to further.",
                        "Turning to the summit For provision of nourishment Brings good fortune. Spying about with sharp eyes Like a tiger with insatiable craving. No blame.",
                        "Turning away from the path. To remain persevering brings good fortune. One should not cross the great water.",
                        "The source of nourishment. Awareness of danger brings good fortune. It furthers one to cross the great water."
                    ]
            },
            {
                "bin": "100010",
                "sign": "䷂",
                "name": "Sprouting",
                "judgement": "Difficulty at the Beginning works supreme success, Furthering through perseverance. Nothing should be undertaken. It furthers one to appoint helpers.",
                "image": "Clouds and thunder: The image of Difficulty at the Beginning. <br>Thus the superior man Brings order out of confusion.",
                "changes":
                    [
                        "Hesitation and hindrance. It furthers one to remain persevering. It furthers one to appoint helpers.",
                        "Difficulties pile up. Horse and wagon part. He is not a robber; He wants to woo when the time comes. The maiden is chaste, She does not pledge herself. Ten years--then she pledges herself.",
                        "Whoever hunts deer without the forester Only loses his way in the forest. The superior man understands the signs of the time And prefers to desist. To go on brings humiliation.",
                        "Horse and wagon part. Strive for union. To go on brings good fortune. Everything acts to further.",
                        "Difficulties in blessing. A little perseverance brings good fortune. Great perseverance brings misfortune.",
                        "Horse and wagon part. Bloody tears flow."

                    ]
            },
            {
                "bin": "100011",
                "sign": "䷩",
                "name": "Augmenting",
                "judgement": "It furthers one To undertake something. It furthers one to cross the great water.",
                "image": "Wind and thunder: the image of Increase. <br>Thus the superior man: If he sees good, he imitates it; If he has faults, he rids himself of them.",
                "changes":
                    [
                        "It furthers one to accomplish great deeds. Supreme good fortune.No blame.",
                        "Someone does indeed increase him;Ten pairs of tortoises cannot oppose it. Constant perseverance brings good fortune. The king presents him before God. Good fortune.",
                        "One is enriched through unfortunate events. No blame, if you are sincereAnd walk in the middle,And report with a seal to the prince.",
                        "If you walk in the middle And report to the prince, He will follow. It furthers one to be used In the removal of the capital.",
                        "If in truth you have a kind heart, ask not. Supreme good fortune. Truly, kindness will be recognized as your virtue.",
                        "He brings increase to no one. Indeed, someone even strikes him. He does not keep his heart constantly steady. Misfortune."
                    ]
            },
            {
                "bin": "100100",
                "sign": "䷲",
                "name": "Shake",
                "judgement": "Shock brings success. Shock comes--oh, oh! Laughing words--ha, ha! The shock terrifies for a hundred miles, And he does not let fall the sacrificial spoon and chalice.",
                "image": "Thunder repeated: the image of Shock. <br>Thus in fear and trembling The superior man sets his life in orderAnd examines himself.",
                "changes":

[
"Shock comes--oh, oh! Then follow laughing words--ha, ha! Good fortune.",
"Shock comes bringing danger. A hundred thousand times You lose your treasures And must climb the Change hills. Do not go in pursuit of them. After seven days you will get them back.",
"Shock comes and makes one distraught. If shock spurs to action One remains free of misfortune.",
"Shock is mired.",
"Shock goes hither and thither. Danger. However, nothing at all is lost. Yet there are things to be done.",
"Shock brings ruin and terrified gazing around. Going ahead brings misfortune. If is has not yet touched one's own body But has reached one's neighbor first, There is no blame. One's comrades have something to talk about.",
         ]
            },
            {
                "bin": "100101",
                "sign": "䷔",
                "name": "Gnawing Bite",
                "judgement": "Biting Through has success. It is favorable to let justice be administered.",
                "image": "Thunder and lightning: The image of Biting Through. <br>Thus the kings of former times made firm the laws Through clearly defined penalties.",
                "changes":
[
"His feet are fastened in the stocks, So that his toes disappear. No blame.",
"Bites through tender meat, So that his nose disappears. No blame.",
"Bites on old dried meat And strikes on something poisonous. Slight humiliation. No blame.",
"Bites on dried gristly meat. Receives metal arrows. It furthers one to be mindful of difficulties And to be persevering. Good fortune.",
"Bites on dried lean meat. Receives yellow gold. Perseveringly aware of danger. No blame.",
"His neck is fastened in the wooden cangue, So that his ears disappear. Misfortune."
           ]
},
            {
                "bin": "100110",
                "sign": "䷐",
                "name": "Following",
                "judgement": "Following has supreme success. Perseverance furthers. No blame.",
                "image": "Thunder in the middle of the lake: The image of Following. <br>Thus the superior man at nightfall Goes indoors for rest and recuperation.",
        "changes":
[
"The standard is changing. Perseverance brings good fortune. To go out of the door in company Produces deeds.",
"If one clings to the little boy, One loses the strong man.",
"If one clings to the strong man, One loses the little boy. Through following one finds what one seeks. It furthers one to remain persevering.",
"Following creates success. Perseverance brings misfortune. To go one's own way with sincerity brings clarity. How could there be blame in this? ",
"Sincere in the good. Good fortune.",
"He meets with firm allegiance And is still further bound. The king introduces him To the Western Mountain."
           ]
},
            {
                "bin": "100111",
                "sign": "䷘",
                "name": "Innocence",
                "judgement": "Supreme success. Perseverance furthers. If someone is not as he should be, He has misfortune,And it does not further him To undertake something.",
                "image": "Under heaven thunder rolls: All things attain the natural state of innocence. <br>Thus the kings of old, Rich in virtue, and in harmony with the time, Fostered and nourished all beings.",
        "changes":
[
"Innocent behavior brings good fortune.",
"If one does not count on the harvest while plowing, Nor on the use of the ground while clearing it, It furthers one to undertake something.",
"Undeserved misfortune. The cow that was tethered by someone Is the wanderer's gain, the citizen's loss.",
"He who can be persevering Remains without blame.",
"Use no medicine in an illness Incurred through no fault of your own. It will pass of itself.",
"Innocent action brings misfortune. Nothing furthers."
  ]         
},
            {
                "bin": "101000",
                "sign": "䷣",
                "name": "Intelligence Hidden",
                "judgement": "In adversity It furthers one to be persevering.",
                "image": "The light has sunk into the earth: The image of Darkening of the Light. <br>Thus does the superior man live with the great mass: He veils his light, yet still shines.",
        "changes":
[
"Darkening of the light during flight. He lowers his wings. The superior man does not eat for three days On his wanderings. But he has somewhere to go. The host has occasion to gossip about him.",
"Darkening of the light injures him in the left thigh. He gives aid with the strength of a horse. Good fortune.",
"Darkening of the light during the hunt in the south. Their great leader is captured. One must not expect perseverance too soon.",
"He penetrates the left side of the belly. One gets at the very heart of the darkening of the light, And leaves gate and courtyard.",
"Darkening of the light as with Prince Chi. Perseverance furthers.",
"Not light but darkness. First he climbed up to heaven, Then he plunged into the depths of the earth."
 ]         
},
            {
                "bin": "101001",
                "sign": "䷕",
                "name": "Adorning",
                "judgement": "Grace has success. In small matters It is favorable to undertake something.",
                "image": "Fire at the foot of the mountain: The image of Grace. <br>Thus does the superior man proceed When clearing up current affairs. But he dare not decide controversial issues in this way.",
        "changes":
[
"He lends grace to his toes, leaves the carriage, and walks.",
"Lends grace to the beard on his chin.",
"Graceful and moist. Constant perseverance brings good fortune.",
"Grace or simplicity? A white horse comes as if on wings. He is not a robber, He will woo at the right time.",
"Grace in the hills and gardens. The roll of silk is meager and small. Humiliation, but in the end good fortune.",
"Simple grace. No blame."
 ]         
},
            {
                "bin": "101010",
                "sign": "䷾",
                "name": "Already Fording",
                "judgement": "Success in small matters. Perseverance furthers. At the beginning good fortune, At the end disorder.",
                "image": "Water over fire: the image of the condition In After Completion. <br>Thus the superior man Takes thoughts of misfortune And arms himself against it in advance.",
        "changes":
[
"He brakes his wheels. He gets his tail in the water. No blame.",
"The woman loses the curtain of her carriage.Do not run after it; On the seventh day you will get it.",
"The Illustrious Ancestor Disciplines the Devil's Country. After three years he conquers it. Inferior people must not be employed.",
"The finest clothes turn to rags. Be careful all day long.",
"The neighbour in the east who slaughters an ox Does not attain as much real happiness As the neighbour in the west With his small offering.",
"He gets his head in the water. Danger."
 ]         
},
            {
                "bin": "101011",
                "sign": "䷤",
                "name": "Dwelling People",
                "judgement": "The perseverance of the woman furthers.",
                "image": "Wind comes forth from fire: The image of The Family. <br>Thus the superior man has substance in his words And duration in his way of life.",
        "changes":
[
"Firm seclusion within the family. Remorse disappears.",
"She should not follow her whims. She must attend within to the food. Perseverance brings good fortune.",
"When tempers flare up in the family, Too great severity brings remorse. Good fortune nonetheless. When woman and child dally and laugh, It leads in the end to humiliation.",
"She is the treasure of the house. Great good fortune.",
"As a king he approaches his family. Fear not. Good fortune.",
"His work commands respect. In the end good fortune comes.",
  ]        
            },
            {
                "bin": "101100",
                "sign": "䷶",
                "name": "Abounding",
                "judgement": "Abundance has success. The king attains abundance. Be not sad. Be like the sun at midday.",
                "image": "Both thunder and lightning come: The image of Abundance. <br>Thus the superior man decides lawsuits And carries out punishments.",
        "changes":
[
"When a man meets his destined ruler, They can be together ten days, And it is not a mistake. Going meets with recognition.",
"The curtain is of such fullness That the polestars can be seen at noon. Through going one meets with mistrust and hate. If one rouses him through truth, Good fortune comes.",
"The underbrush is of such abundance That the small stars can be seen at noon. He breaks his right arm. No blame.",
"The curtain is of such fullness That the polestars can be seen at noon. He meets his ruler, who is of like kind. Good fortune.",
"Lines are coming, Blessing and fame draw near. Good fortune.",
"His house is in a state of abundance. He screens off his family. He peers through the gate And no longer perceives anyone. For three years he sees nothing. Misfortune.",
   ]       
            },
            {
                "bin": "101101",
                "sign": "䷝",
                "name": "Radiance",
                "judgement": "Perseverance furthers. It brings success. Care of the cow brings good fortune.",
                "image": "That which is bright rises twice: The image of Fire. <br>Thus the great man, by perpetuating this brightness, Illumines the four quarters of the world.",
        "changes":
[
"The footprints run crisscross. If one is seriously intent, no blame.",
"Yellow light. Supreme good fortune.",
"In the light of the setting sun, Men either beat the pot and sing Or loudly bewail the approach of old age. Misfortune.",
"Its coming is sudden; It flames up, dies down, is thrown away.",
"Tears in floods, sighing and lamenting. Good fortune.",
"The king uses him to march forth and chastise. Then it is best to kill the leaders And take captive the followers. No blame.",
    ]       
            },
            {
                "bin": "101110",
                "sign": "䷰",
                "name": "Skinning",
                "judgement": "On your own day You are believed. Supreme success. Furthering through perseverance. Remorse disappears.",
                "image": "Fire in the lake: the image of Revolution. <br>Thus the superior man Sets the calendar in order.",
        "changes":
[
"Wrapped in the hide of a yellow cow.",
"When one's own day comes, one may create revolution. Starting brings good fortune. No blame.",
"Starting brings misfortune. Perseverance brings danger. When the talk of revolution has gone the rounds three times, One may commit himself, And men will believe him.",
"Remorse disappears. Men believe him. Changing the form of government brings good fortune.",
"The great man changes like a tiger. Even before he questions the oracle He is believed.",
"The superior man changes like a panther. The inferior man molts in the face. Starting brings misfortune. To remain persevering brings good fortune. And makes the seasons clear."
  ]        
},
            {
                "bin": "101111",
                "sign": "䷌",
                "name": "Concording People",
                "judgement": "Fellowship with Men in the open. Success. It furthers one to cross the great water. The perseverance of the superior man furthers.",
                "image": "Heaven together with fire: The image of Fellowship with Men. <br>Thus the superior man organizes the clans And makes distinctions between things.",
        "changes":
[
"Fellowship with men at the gate. No blame.",
"Fellowship with men in the clan. Humiliation.",
"He hides weapons in the thicket; He climbs the high hill in front of it. For three years he does not rise up.",
"He climbs up on his wall; he cannot attack. Good fortune.",
"Men bound in fellowship first weep and lament, But afterward the laugh. After great struggles they succeed in meeting.",
"Fellowship with men in the meadow. No remorse."
  ]         
},
            {
                "bin": "110000",
                "sign": "䷒",
                "name": "Nearing",
                "judgement": "Approach has supreme success. Perseverance furthers. When the eight month comes, There will be misfortune.",
                "image": "The earth above the lake: The image of Approach. <br>Thus the superior man is inexhaustible In his will to teach, And without limits In his tolerance and protection of the people.",
        "changes":
[
"Joint approach. Perseverance brings good fortune.",
"Joint approach. Good fortune. Everything furthers.",
"Comfortable approach. Nothing that would not further. If one is induced to grieve over it, One becomes free of blame.",
"Complete approach. No blame.",
"Wise approach. This is right for a great prince. Good fortune.",
"Greathearted approach. Good fortune. No blame.",
  ]        
            },
            {
                "bin": "110001",
                "sign": "䷨",
                "name": "Diminishing",
                "judgement": "Decrease combined with sincerity Brings about supreme good fortune Without blame. One may be persevering in this. It furthers one to undertake something. How is this to be carried out? One may use two small bowls for the sacrifice.",
                "image": "At the foot of the mountain, the lake: The image of Decrease. <br>Thus the superior man controls his anger And restrains his instincts.",
        "changes":
[
"Going quickly when one's tasks are finished Is without blame. But one must reflect on how much one may decrease others.",
"Perseverance furthers. To undertake something brings misfortune. Without decreasing oneself, One is able to bring increase to others.",
"When three people journey together, Their number decreases by one. When one man journeys alone, He finds a companion.",
"If a man decreases his faults, It makes the other hasten to come and rejoice. No blame.",
"Someone does indeed increase him. Ten pairs of tortoises cannot oppose it. Supreme good fortune.",
"If one is increased without depriving others, there is no blame. Perseverance brings good fortune. It furthers one to undertake something. One obtains servants But no longer has a separate home.",
    ]       
            },
            {
                "bin": "110010",
                "sign": "䷻",
                "name": "Articulating",
                "judgement": "Success. Galling limitation must not be persevered in.",
                "image": "Water over Lake: the image of Limitation. <br>Thus the superior man Creates numbers and measure, And examines the nature of virtue and correct conduct.",
        "changes":
[
"Not going out of the door and the courtyard Is without blame.",
"Not going out of the gate and the courtyard Brings misfortune.",
"He who knows no limitation Will have cause to lament. No blame.",
"Contented limitation. Success.",
"Sweet limitation brings good fortune. Going brings esteem.",
"Galling limitation. Perseverance brings misfortune. Remorse disappears."
 ]         
            },
            {
                "bin": "110011",
                "sign": "䷼",
                "name": "Inner Truth",
                "judgement": "Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.",
                "image": "Wind over lake: the image of Inner Truth. <br>Thus the superior man discusses criminal cases In order to delay executions.",
        "changes":
[
"Being prepared brings good fortune. If there are secret designs, it is disquieting.",
"A crane is calling in the shade. Its young answers it. I have a good goblet. I will share it with you.",
"He finds a comrade. Now he beats the drum, now he stops. Now he sobs, now he sings.",
"The moon nearly at the full. The team horse goes astray. No blame.",
"He possesses truth, which links together. No blame.",
"Cockcrow penetrating to heaven. Perseverance brings misfortune."
 ]          
            },
            {
                "bin": "110100",
                "sign": "䷵",
                "name": "Converting the Maiden",
                "judgement": "Undertakings bring misfortune. Nothing that would further.",
                "image": "Thunder over the lake: The image of The Marrying Maiden. <br>Thus the superior man Understands the transitory In the light of the eternity of the end.",
        "changes":
[
"The marrying maiden as a concubine. A lame man who is able to tread. Undertakings bring good fortune.",
"A one-eyed man who is able to see. The perseverance of a solitary man furthers.",
"The marrying maiden as a slave. She marries as a concubine.",
"The marrying maiden draws out the allotted time. A late marriage comes in due course.",
"The sovereign I gave his daughter in marriage. The embroidered garments of the princess Were not as gorgeous As those of the servingmaid. The moon that is nearly full Brings good fortune.",
"The woman holds the basket, but there are no fruits in it. The man stabs the sheep, but no blood flows. Nothing that acts to further."
 ]         
},
            {
                "bin": "110101",
                "sign": "䷥",
                "name": "Polarising",
                "judgement": "In small matters, good fortune.",
                "image": "Above fire; below, the lake: The image of Opposition. <br>Thus amid all fellowship The superior man retains his individuality.",
        "changes":
[
"Remorse disappears. If you lose your horse, do not run after it; It will come back of its own accord. When you see evil people, Guard yourself against mistakes.",
"One meets his lord in a narrow street. No blame.",
"One sees the wagon dragged back, The oxen halted, A man's hair and nose cut off. Not a good beginning, but a good end.",
"Isolated through opposition, One meets a like-minded man With whom one can associate in good faith. Despite the danger, no blame.",
"Remorse disappears. The companion bites his way through the wrappings. If one goes to him, How could it be a mistake?",
"Isolated through opposition, One sees one's companion as a pig covered with dirt, As a wagon full of devils. First one draws a bow against him, Then one lays the bow aside. He is not a robber; he will woo at the right time. As one goes, rain falls; then good fortune comes.",
  ]         
            },
            {
                "bin": "110110",
                "sign": "䷹",
                "name": "Open",
                "judgement": "Success. Perseverance is favorable.",
                "image": "Lakes resting on one another: The image of the Joyous. <br>Thus the superior man joins with his friends For discussion and practice.",
        "changes":
[
"Contented joyousness. Good fortune.",
"Sincere joyousness. Good fortune. Remorse disappears.",
"Coming joyousness. Misfortune.",
"Joyousness that is weighed is not at peace. After ridding himself of mistakes a man has joy.",
"Sincerity toward disintegrating influences is dangerous.",
"Seductive joyousness."
          ]
},
            {
                "bin": "110111",
                "sign": "䷉",
                "name": "Treading",
                "judgement": "Treading upon the tail of the tiger. It does not bite the man. Success.",
                "image": "Heaven above, the lake below: The image of Treading. <br>Thus the superior man discriminates between high and low, And thereby fortifies the thinking of the people.",
        "changes":

["Simple conduct. Progress without blame.",
"Treading a smooth, level course. The perseverance of a dark man Brings good fortune.",
"A one-eyed man is able to see, A lame man is able to tread. He treads on the tail of the tiger. The tiger bites the man. Misfortune. Thus does a warrior act on behalf of his great prince.",
"He treads on the tail of the tiger. Caution and circumspection Lead ultimately to good fortune.",
"Resolute conduct. Perseverance with awareness of danger.",
"Look to your conduct and weigh the favorable signs. When everything is fulfilled, supreme good fortune comes."]
           
            },
            {
                "bin": "111000",
                "sign": "䷊",
                "name": "Pervading",
                "judgement": "The small departs, The great approaches. Good fortune. Success.",
                "image": "Heaven and earth unite: the image of Peace. <br>Thus the ruler Divides and completes the course of heaven and earth; He furthers and regulates the gifts of heaven and earth, And so aids the people.",
        "changes":

["When ribbon grass is pulled up, the sod comes with it. Each according to his kind. Undertakings bring good fortune.",
"Bearing with the uncultured in gentleness, Fording the river with resolution, Not neglecting what is distant, Not regarding one's companions: Thus one may manage to walk in the middle.",
"No plain not followed by a slope. No going not followed by a return. He who remains persevering in danger Is without blame. Do not complain about this truth; Enjoy the good fortune you still possess.",
"He flutters down, not boasting of his wealth, Together with his neighbor, Guileless and sincere.",
"The sovereign I Gives his daughter in marriage. This brings blessing And supreme good fortune.",
"The wall falls back into the moat. Use no army now. Make your commands known within your own town. Perseverance brings humiliation."]
           
            },
            {
                "bin": "111001",
                "sign": "䷙",
                "name": "Great Accumulating",
                "judgement": "Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.",
                "image": "Heaven within the mountain: The image of The Taming Power of the Great. <br>Thus the superior man aquaints himself with many sayings of antiquity And many deeds of the past, In order to strengthen his character thereby.",
        "changes":

["Danger is at hand. It furthers one to desist.",
"The axletrees are taken from the wagon.",
"A good horse that follows others. Awareness of danger, With perseverance, furthers. Practice chariot driving and armed defense daily. It furthers one to have somewhere to go.",
"The headboard of a young bull. Great good fortune.",
"The tusk of a gelded boar. Good fortune.",
"One attains the way of heaven. Success."]
         
            },
            {
                "bin": "111010",
                "sign": "䷄",
                "name": "Attending",
                "judgement": "If you are sincere, You have light and success. Perseverance brings good fortune. It furthers one to cross the great water.",
                "image": "Clouds rise up to heaven: <br>The image of Waiting. <br>Thus the superior man eats and drinks, Is joyous and of good cheer.",
        "changes":

["Waiting in the meadow. It furthers one to abide in what endures. No blame.",
"Waiting on the sand. There is some gossip. The end brings good fortune.",
"Waiting in the mud Brings about the arrival of the enemy.",
"Waiting in blood. Get out of the pit.",
"Waiting at meat and drink. Perseverance brings good fortune.",
"One falls into the pit. Three uninvited guests arrive. Honor them, and in the end there will be good fortune."]
          
            },
            {
                "bin": "111011",
                "sign": "䷈",
                "name": "Small Harvest",
                "judgement": "The Taming Power of the Small has success. Dense clouds, no rain from our western region.",
                "image": "The wind drives across heaven: The image of The Taming Power of the Small. <br>Thus the superior man Refines the outward aspect of his nature.",
        "changes":

["Return to the way. How could there be blame in this? Good fortune.",
"He allows himself to be drawn into returning. Good fortune.",
"The spokes burst out of the wagon wheel. Man and wife roll their eyes.",
"If you are sincere, blood vanishes and fear gives way. No blame.",
"If you are sincere and loyally attached, You are rich in your neighbor.",
"The rain comes, there is rest. This is due to the lasting affect of character. Perseverance brings the woman into danger. The moon is nearly full. If the superior man persists, Misfortune comes."]
         
            },
            {
                "bin": "111100",
                "sign": "䷡",
                "name": "Great Invigorating",
                "judgement": "Perseverance furthers.",
                "image": "Thunder in heaven above: The image of The Power of the Great. <br>Thus the superior man does not tread upon paths That do not accord with established order.",
        "changes":
["Power in the toes. Continuing brings misfortune. This is certainly true.",
"Perseverance brings good fortune.",
"The inferior man works through power. The superior man does not act thus. To continue is dangerous. A goat butts against a hedge And gets its horns entangled.",
"Perseverance brings good fortune. Remorse disappears. The hedge opens; there is no entanglement. Power depends upon the axle of a big cart.",
"Loses the goat with ease. No remorse.",
"A goat butts against a hedge. It cannot go backward, it cannot go forward. Nothing serves to further. If one notes the difficulty, this brings good fortune."]
          
            },
            {
                "bin": "111101",
                "sign": "䷍",
                "name": "Great Possessing",
                "judgement": "Supreme success.",
                "image": "Fire in heaven above: The image of Possession in Great Measure. <br></br>Thus the superior man curbs evil and furthers good, And thereby obeys the benevolent will of heaven.",
        "changes":

["No relationship with what is harmful; There is no blame in this. If one remains conscious of difficulty, One remains without blame.",
"A big wagon for loading. One may undertake something. No blame.",
"A prince offers it to the Son of Heaven. A petty man cannot do this.",
"He makes a difference Between himself and his neighbor. No blame.",
"He whose truth is accessible, yet dignified, Has good fortune.",
"Change in the Sixth place means: He is blessed by heaven. Good fortune. Nothing that does not further.",]
           
            },
            {
                "bin": "111110",
                "sign": "䷪",
                "name": "Displacement",
                "judgement": "One must resolutely make the matter known At the court of the king. It must be announced truthfully. Danger. It is necessary to notify one's own city. It does not further to resort to arms. It furthers one to undertake something.",
                "image": "The lake has risen up to heaven: The image of Break-through. <br>Thus the superior man Dispenses riches downward And refrains from resting on his virtue.",
        "changes":
    ["Mighty in the forward-striding toes. When one goes and is not equal to the task, One makes a mistake.",
"A cry of alarm. Arms at evening and at night. Fear nothing.",
"To be powerful in the cheekbones Brings misfortune. The superior man is firmly resolved. He walks alone and is caught in the rain. He is bespattered, And people murmur against him. No blame.",
"There is no skin on his thighs, And walking comes hard. If a man were to let himself be led like a sheep, Remorse would disappear. But if these words are heard They will not be believed.",
"In dealing with weeds, Firm resolution is necessary. Walking in the middle Remains free of blame.",
"No cry. In the end misfortune comes."]
            },
            {
                "bin": "111111",
                "sign": "䷀",
                "name": "Force",
                "judgement": "The Creative works sublime success, Furthering through perseverance.",
                "image": "The movement of heaven is full of power. <br>Thus the superior man makes himself strong and untiring.",
                "changes":
    [
        "Hidden dragon. Do not act.",
"Dragon appearing in the field.  It furthers one to see the great man.",
"All day long the superior man is creatively active. At nightfall his mind is beset with cares. Danger. No blame.",
"Wavering flight over the depths. No blame.",
"Flying dragon in the heavens. It furthers one to see the great man.",
"Arrogant dragon will have cause to repent.",
        "When all the lines Change, it means: There appears a flight of dragons without heads. Good fortune."
    ]
            }
        ],
}

