import type { Project } from "@/types/step";

export const demoProject: Project = {
  id: "yoga-recommender",
  title:
    "Exoplanet Research - Pan-African Citizen Science e-Laboratory (PACS e-Lab)",
  description:
    "Learn how to build a yoga pose recommendation system using vector embeddings and similarity search",
  estimatedTime: 14,
  steps: [
    {
      number: 1,
      title: "Introduction",
      content: [
        {
          type: "text",
          content:
            "The Pan-African Citizen Science e-Laboratory (PACS e-Lab) is a nonprofit organization dedicated to advancing STEM education across Africa through hands-on engagement in astronomy and space science. With a strong focus on reaching underrepresented communities, PACS e-Lab inspires young individuals to pursue careers in STEM by providing meaningful learning experiences and entry points into scientific research.",
        },
        {
          type: "text",
          content:
            "Our slogan, <b>“Bringing the Stars to Your Doorsteps,”</b> reflects our belief that no matter where you are, at home, in school, or at work, you can connect with us online and participate in our exciting projects.",
        },
        {
          type: "text",
          content:
            "We are currently the largest organization pioneering hands-on astronomy activities across Africa. Our initiatives span:\n• Asteroid hunting\n• Live radio calls with astronauts aboard the International Space Station\n• Astrophotography\n• Exoplanet research\n• Double star studies",
        },
        {
          type: "image",
          url: "https://pacselab.space/wp-content/uploads/2023/09/cropped-IMG-20230505-WA0004.jpg",
          alt: "PACS e-Lab Logo",
          width: 200,
          caption: "Pan-African Citizen Science e-Laboratory (PACS e-Lab)",
        },
        {
          type: "text",
          content:
            "We proudly collaborate with top institutions in the field, including NASA, the International Astronomical Search Collaboration (IASC), the Las Cumbres Observatory (LCO), Slooh, MicroObservatory operated by the Harvard-Smithsonian Center for Astrophysics, etc.",
        },
        {
          type: "text",
          content:
            "Several of our participants have had their work published in international journals and presented at global conferences.",
        },
        {
          type: "link",
          text: "Visit our website to learn more",
          url: "https://www.pacselab.space",
        },
        {
          type: "text",
          content:
            "Just as we have done with other groundbreaking projects, PACS e-Lab is set to host the largest exoplanet research project on the African continent. The study may lead to two separate publications. The first paper is titled:<strong>'Exploring Statistical Correlations in Exoplanet Transit Parameters: A Study of Over 400 Light Curves by Citizen Scientists from Developing Countries.'</strong>",
        },
        {
          type: "text",
          content:
            "We will analyze over 400 exoplanet light curves to uncover how different transit properties are related.",
        },
        {
          type: "text",
          content:
            "Why Join?\n• Gain hands-on research experience in astronomy\n• Learn valuable skills like photometry and remote telescope scheduling\n• Strengthen your university application or CV with credible research credentials\n• Become a co-author on a globally relevant scientific publication\n• Work with real NASA data and contribute to an international citizen science effort",
        },
        {
          type: "text",
          content:
            "Requirements:\n• No prior experience needed — we’ll provide all the training\n• A computer and an internet connection\n• Enthusiasm for STEM and a willingness to learn",
        },
        {
          type: "text",
          content:
            "You can master everything, including photometry and remote telescope control, in just 2 days.",
        },
      ],
    },
    {
      number: 2,
      title: "Getting Started with Exoplanet Light Curves",
      content: [
        {
          type: "text",
          content:
            "This section is intended for new or inexperienced participants who have recently joined our platform or have not yet performed photometric analysis of exoplanets.",
        },
        {
          type: "text",
          content:
            "What you will Learn:\n1. How to perform photometry using EXOTIC (Exoplanet Transit Interpretation Code) with exoplanet practice datasets.\n2. How to request observational data from the NASA Exoplanet Watch website and the MicroObservatory (MOBS).",
        },
        {
          type: "link",
          text: "To begin your learning, please visit our guide",
          url: "https://pacselab.space/exophotometry/",
        },
        {
          type: "text",
          content:
            "This page is designed to help you prepare and master the basics within just 2 days.",
        },
        {
          type: "text",
          content:
            "<b>Important Note</b>: When uploading your exoplanet data to Google Drive as shown in the tutorial, first create a folder named EXOTIC, and then upload your individual exoplanet dataset folders as subfolders inside it.",
        },
        {
          type: "text",
          content:
            "<b>Example</b>: NASA has made minor updates to the EXOTIC software since the video tutorial was published. Please keep this in mind as you follow the instructions.",
        },
        {
          type: "text",
          content:
            "After Completing Your Light Curve, and Uploading on the AAVSO website, please share your completed light curve in the following places:\n• The NASA Exoplanet Research Community on Slack\n• Your social media platforms to raise awareness and showcase your contribution.\n• This group. We shall include them in the paper.",
        },
        {
          type: "text",
          content:
            "Participants will receive certificates from NASA upon completion through the EXOTIC program get started today and take your first step into the world of exoplanet science.",
        },
      ],
    },
    {
      number: 3,
      title: "Main Research Phase — Analyzing 422 Exoplanet Light Curves",
      content: [
        {
          type: "text",
          content:
            "This section is the core phase of the research and is intended only for those who have completed Part 2.",
        },
        {
          type: "text",
          content:
            "In this phase, we aim to analyze the light curve data of all 422 exoplanets listed on the NASA Exoplanet Watch website in order to uncover meaningful correlations for our research paper. While this would be an overwhelming task for just a few individuals, our large community makes it possible to approach it efficiently, with both speed and accuracy.",
        },
        {
          type: "text",
          content: "<h2 style='font-size: 20px;'>Getting Started</h2>",
        },
        {
          type: "text",
          content:
            "Click the link below for step-by-step instructions on how to perform the required operations",
        },
        {
          type: "link",
          text: "Click here to access the guide",
          url: "https://docs.google.com/document/d/1vEU-4Vpxhz6xftn5QT8V3VuLT96bk9OpoGX43WRadmk/edit?usp=sharing",
        },
        {
          type: "text",
          content:
            "Then, request your assigned list of exoplanets from the research instructor.",
        },
        {
          type: "text",
          content: "<b>Important</b>",
        },
        {
          type: "text",
          content:
            "The instructor will only assign you exoplanets if you have: completed Part 2 and shared your completed light curve in:\n• The NASA Exoplanet Research Community on Slack to showcase your contribution\n• This group, so your work can be included in the final paper",
        },
        {
          type: "text",
          content:
            "Participants with prior experience in Part 2 will be assigned too.",
        },
        {
          type: "text",
          content:
            "<b>Deadline:</b> You will have just two days to complete your assigned task and report back. By contributing to Part 3, you qualify to become a co-author of the research paper.",
        },
      ],
    },
  ],
};
