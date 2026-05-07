const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear in dependency order
  await prisma.chapterTranslation.deleteMany()
  await prisma.novelTranslation.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.chapter.deleteMany()
  await prisma.novel.deleteMany()

  const novel = await prisma.novel.create({
    data: {
      title: '斗破苍穹',
      author: '天蚕土豆',
      description:
        '这里是属于斗气的世界，没有花俏异能，唯有以斗气为尊。一个天才少年，因为某种特殊原因，斗之气全部停滞，被人嘲讽为废材，却在一位神秘老人的指导下，踏上了一条逆天崛起之路……',
      status: 'COMPLETED',
      chapters: {
        create: [
          {
            order: 1,
            title: '第一章 天才少年',
            content: `萧炎，乌坦城萧家大少爷，自幼便是城中有名的天才少年。

十一岁那年，萧炎的斗之气便已达到斗者三段，比起同龄人足足超出了三个年级，族中长老无不赞叹，称其为"萧家百年一遇的天才"。彼时的萧炎意气风发，走在城中大街上，便有人主动让路，投来羡慕的目光。

然而命运总是善于捉弄人。就在萧炎十三岁那年，一向平稳上升的斗之气忽然像是遭到了一堵无形高墙的阻拦，任凭他如何努力，无论消耗多少家中珍贵的修炼丹药，斗之气却始终一动不动。

一日、一月、一年……眼看着昔日不如自己的同龄人一个个赶了上来，甚至远远超越，萧炎心中的苦涩无以言说。

"少爷，该用午膳了。"老侍从萧胖子在院外小声唤道。

萧炎坐在石桌旁，手中把玩着一块巴掌大小的石板。那是他三年前在城外山林中偶然拾到的，石板表面布满了细密的纹路，似是某种古老的文字，却无人能辨认。他常常感觉石板微微温热，仿佛有什么东西在其中沉睡着。

"知道了。"他轻声应道，收起石板，缓缓起身。`,
          },
          {
            order: 2,
            title: '第二章 废柴觉醒',
            content: `翌日清晨，萧炎照例坐在院中的石台上，手握那块不知从何处来的古旧石板，静静感受着那一丝若有若无的温热。

忽然，石板微微一颤，一道莫名的气息涌入萧炎的神识之中。他心中一惊，几乎要将石板扔开，但不知为何，手掌却像是生了根一般，纹丝未动。

"小子，是你将本尊惊醒？"

苍老而威严的声音凭空在脑海中响起，没有任何征兆。萧炎猛地跳起，环顾四周，院中哪有半个人影。

"莫要乱看，本尊在你手中的石板之内。"

萧炎低头盯着石板，深吸一口气，压下心中的震惊，小心翼翼地开口："您……您是谁？"

"药老。曾是一位九品炼药师，机缘巧合之下神识被封印于此石板之中，已有近百年了。"声音平淡，却有着一种难以言说的压迫感，"你的身体我已大致感知，斗之气停滞并非天资耗尽，而是有人在你体内动了手脚。"

萧炎握紧了石板，指节微微泛白："谁？"

"暂时还不清楚。"药老顿了一顿，"但老夫可以帮你恢复。你可愿意？"

萧炎沉默片刻，嘴角缓缓勾起一个坚定的弧度："愿意。"`,
          },
          {
            order: 3,
            title: '第三章 初入修炼',
            content: `药老的方法说来简单，做来却是锥心蚀骨的痛苦。

"你体内的封堵如同一道凝固的铁闸，横亘在丹田与经脉之间，"药老的声音透过石板传来，平静而清晰，"需以纯粹的意念之力，不断冲击，直至将其瓦解。轻则三日，重则七日，其间痛苦非比寻常，你可想清楚了？"

"想清楚了。"萧炎盘腿坐在卧房正中，背脊挺直，眼中没有半分犹豫。

"好。开始吧。"

萧炎闭上眼睛，将全部的意念缓缓沉入丹田深处。那里本该是灵气流转之所，如今却如一潭死水，连一丝涟漪也泛不起来。在死水的最底层，他感受到了那道封堵——细如发丝，却坚如精铁，冷冽而陌生。

深吸一口气，意念猛地向前撞去。

那一刻，一股锐利的剧痛从丹田炸开，如同有人将一根烧红的铁针刺入脊髓，萧炎的身体猛地一颤，汗水刹那间浸透了衣衫。但他咬紧牙关，额头青筋隐现，始终没有出声。

痛，是真的痛。但在痛苦之下，还有一种久违的感觉——那封堵之处，出现了一道极细极细的裂缝。

药老的声音再度响起，罕见地带着一丝赞许："不错的意志。继续。"

萧炎再度凝聚意念，朝着那道裂缝，重重地撞了下去。`,
          },
        ],
      },
    },
    include: { chapters: true },
  })

  // zh-CN translations (same content as original)
  await prisma.novelTranslation.create({
    data: {
      novelId: novel.id,
      locale: 'zh-CN',
      title: '斗破苍穹',
      description:
        '这里是属于斗气的世界，没有花俏异能，唯有以斗气为尊。一个天才少年，因为某种特殊原因，斗之气全部停滞，被人嘲讽为废材，却在一位神秘老人的指导下，踏上了一条逆天崛起之路……',
    },
  })

  for (const chapter of novel.chapters) {
    await prisma.chapterTranslation.create({
      data: {
        chapterId: chapter.id,
        locale: 'zh-CN',
        title: chapter.title,
        content: chapter.content,
      },
    })
  }

  // English translations
  await prisma.novelTranslation.create({
    data: {
      novelId: novel.id,
      locale: 'en',
      title: 'Battle Through the Heavens',
      description:
        'In a world where fighting spirit reigns supreme, young genius Xiao Yan suddenly loses his powers at age thirteen. Guided by a mysterious elder sealed within an ancient stone slab, he sets out on a journey to reclaim his strength and carve his own legend.',
    },
  })

  const enChapters = [
    {
      title: 'Chapter 1: The Fallen Genius',
      content: `Xiao Yan was known throughout Wutan City as a prodigy. By eleven, his fighting spirit had reached the third tier — a full three levels ahead of his peers. The clan elders praised him as a once-in-a-century talent, and for a time, the streets parted before him.

But fate is a cruel jester. At thirteen, the steady climb of his fighting spirit came to an abrupt halt. No matter how hard he trained, no matter how many precious cultivation pills he consumed, not a single thread of progress could be coaxed forth.

Days turned to months, months to years. As former juniors caught and surpassed him, Xiao Yan bore the weight of their pitying stares in silence.

"Young master, dinner is ready," called old servant Xiao Fatty from outside the courtyard.

Xiao Yan sat at the stone table, turning a palm-sized stone slab in his hands. He had found it in the mountains outside town three years ago — its surface covered in ancient etchings no one could decipher. He often felt a faint warmth from it, as though something lay sleeping within.

"I'll be right there," he said quietly, pocketing the slab and rising to his feet.`,
    },
    {
      title: 'Chapter 2: The Awakening',
      content: `The next morning, Xiao Yan sat as usual in the courtyard with the stone slab in his palm, searching for that familiar trace of warmth.

Without warning, the slab trembled. A strange energy surged into his mind. He nearly dropped it — but his hand refused to move.

"Boy. Did you wake me?"

An ancient, commanding voice echoed in his head. Xiao Yan leapt to his feet and spun around, but the courtyard was empty.

"Don't look around. I'm in the slab you're holding."

He stared down at the stone, took a slow breath, and spoke carefully: "...Who are you?"

"My name is Yao Lao. I was once a ninth-tier Alchemist. Through a twist of fate, my soul was sealed into this stone nearly a hundred years ago." A pause. "I have sensed your body. Your stagnant fighting spirit isn't natural exhaustion — someone tampered with you."

Xiao Yan's grip tightened. "Who?"

"Unknown, for now. But I can help you recover it. Are you willing?"

Xiao Yan was silent for a moment. A slow, resolute smile spread across his face. "Yes."`,
    },
    {
      title: 'Chapter 3: First Steps in Cultivation',
      content: `Yao Lao's method was simple to describe and brutal in practice.

"There is a blockage in your meridians, like a locked iron gate between your dantian and your energy channels," the old master explained. "You must use pure willpower to break it down. Three days if you are fortunate, seven if not. The pain will be considerable."

"I understand," Xiao Yan said. He sat cross-legged at the center of his room, back straight, eyes closed.

"Begin."

He turned his focus inward, sinking his consciousness toward his dantian. Where there should have been a swirling current of energy, there was only stillness. At the very depths of it, he felt the blockage: thread-thin, cold, and foreign — hard as iron.

He gathered every scrap of willpower and flung it forward.

The pain that erupted was instantaneous and absolute — a searing rod of fire driven through his spine. His body convulsed once, drenching his clothes in sweat. But his teeth clamped shut and no sound escaped.

Through the agony, he felt it: a hairline crack in the barrier.

Yao Lao's voice came again, softer this time, carrying the rare warmth of approval: "Good resolve. Continue."

Xiao Yan gathered himself and struck again.`,
    },
  ]

  for (let i = 0; i < novel.chapters.length; i++) {
    await prisma.chapterTranslation.create({
      data: {
        chapterId: novel.chapters[i].id,
        locale: 'en',
        title: enChapters[i].title,
        content: enChapters[i].content,
      },
    })
  }

  console.log(`\n✓ 已创建小说：${novel.title}（ID: ${novel.id}）`)
  console.log('✓ zh-CN 翻译：3 章')
  console.log('✓ English translations: 3 chapters\n')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
