const workflowsClassConfigArr = [{
    key: "Text2Img",
    name: "文生图类",
    what: "AIGC插画集",
    data_format: `{
        "textImgArray": [
        { 
         "content": "电影分镜旁白内容文本 也可以是角色台词",
         "cn_content": "中文的content",
         "src": "-",
         "textimgTitle": "一个戴着帽子拿着花的女孩的平面插图",
         "positionPrompt": "A flat illustration of a girl wearing a hat and holding flowers, minimalist, warm, utilitarianism, geometric, danish design --s 50"
       },
       { 
        "content": "电影分镜旁白内容文本 也可以是角色台词",
        "cn_content": "中文的content",
        "src": "-",
        "textimgTitle": "电影获奖照片依然可爱敦实傲慢的棕色鼹鼠",
        "positionPrompt": "cinematic film still awardwinning photo cute stocky snooty brown mole, rust, epic, wearing medivel royal clothes, full body . shallow depth of field, vignette, highly detailed, high budget, bokeh . shallow depth of field, vignette, highly detailed, high budget, bokeh, cinemascope, moody, epic, gorgeous, film grain, grainy"
      },
      { 
        "content": "电影分镜旁白内容文本 也可以是角色台词",
        "cn_content": "中文的content",
        "src": "-",
        "textimgTitle": "一群机器士兵",
        "positionPrompt": "An army of cybernetic soldiers marching, muted colors, photorealistic, cinematic, cinematic lighting, DSLR, wide angle lens"
      }, { 
        "content": "电影分镜旁白内容文本 也可以是角色台词",
        "cn_content": "中文的content",
        "src": "-",
        "textimgTitle": "画布框架，卡通，3d，逼真",
        "positionPrompt": "canvas frame, cartoon, 3d, photorealistic"
      }
      ]
      }`, //参考生成的数据格式
    positionPrompt_Reference: `Example of Using the Formula
      Using the formula, you can create a new prompt like this:
      Subject: "majestic golden eagle"
      Attire/Appearance: "soaring through a vibrant sunset"
      Composition: "in mid-flight"
      Technical Elements: "wide-angle shot, soft focus"
      Style: "dramatic, breathtaking"
      Detail Level: "highly detailed, premium quality"
      Visual Effects: "rich colors, slight lens flare"
      Complete Example Prompt
      "Majestic golden eagle soaring through a vibrant sunset, in mid-flight, wide-angle shot, soft focus, dramatic, breathtaking, highly detailed, premium quality, rich colors, slight lens flare."`,
    prompt_generation_method: "Text2Image_Prompt_Generation_Method"
  },
  {
    key: "Storyboard",
    what: "AI绘画分镜脚本",
    name: "分镜类",
    data_format: `{
        "textImgArray": [
        { 
         "content": "电影分镜旁白内容文本 也可以是角色台词",
         "cn_content": "中文的content",
         "src": "-",
         "textimgTitle": "电影分镜标题内容",
         "positionPrompt": "[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty."
       },
       { 
        "content": "电影分镜旁白内容文本 也可以是角色台词",
        "cn_content": "中文的content",
        "src": "-",
        "textimgTitle": "电影分镜标题内容",
        "positionPrompt": "[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty."
      }
      ]
      }`, //参考生成的数据格式
    positionPrompt_Reference: `[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty.`,
    prompt_generation_method: "Storyboard_Prompt_Generation_Method"
  },
];

module.exports = {
  workflowsClassConfigArr
}