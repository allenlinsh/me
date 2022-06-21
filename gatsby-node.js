const crypto = require(`crypto`)

exports.createPages = ({ actions, reporter }) => {
  actions.createPage({
                       path: "/",
                       component: require.resolve("./src/pages/index.js")
                     })
}

exports.sourceNodes = ({ actions: { createTypes, createNode } }, {
  // SEO
  title = "Allen Lin",
  description = "Hi there. My name is Allen Lin. I'm a student entrepreneur at Northeastern University. I study Computer Science and specialize in Machine Learning and Mobile App Development.",
  siteUrl = "https://allenlinsh.com",
  appName = "Allen Lin",

  // Content
  headline = "Allen Lin",
  subHeadline = "I'm a <strong>student entrepreneur</strong> at Northeastern University. I study Computer Science and specialize in <strong>Machine Learning</strong> and <strong>Mobile App Development</strong>.",
  socialList = [
    {
      icon: "FaGithub",
      url: "https://github.com/allenlinsh",
      ariaLabel: "Link to my GitHub profile"
    },
    {
      icon: "FaTwitter",
      url: "https://twitter.com/allenlinsh",
      ariaLabel: "Link to my Twitter profile"
    },
    {
      icon: "FaLinkedin",
      url: "https://www.linkedin.com/in/allenlinsh",
      ariaLabel: "Link to my LinkedIn profile"
    }
  ]
}) => {
  createTypes(`
    type MinimalistConfig implements Node {
      title: String!
      description: String!
      siteUrl: String!
      appName: String!
      headline: String!
      subHeadline: String!
      socialList: [Social!]!
    }
    type Social {
      icon: String
      iconSet: String
      url: String
      ariaLabel: String
    }
  `)

  const minimalistConfig = {
    title,
    description,
    siteUrl,
    appName,
    headline,
    subHeadline,
    socialList
  }

  createNode({
               ...minimalistConfig,
               id: `minimalist-config`,
               parent: null,
               children: [],
               internal: {
                 type: `MinimalistConfig`,
                 contentDigest: crypto
                   .createHash(`md5`)
                   .update(JSON.stringify(minimalistConfig))
                   .digest(`hex`),
                 content: JSON.stringify(minimalistConfig),
                 description: `Minimalist Theme Config`
               }
             })
}
