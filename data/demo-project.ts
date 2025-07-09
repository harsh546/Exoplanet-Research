import type { Project } from "@/types/step"

export const demoProject: Project = {
  id: "yoga-recommender",
  title: "Build a contextual Yoga Poses recommender app with Firestore, Vector Search, Langchain and Gemini",
  description: "Learn how to build a yoga pose recommendation system using vector embeddings and similarity search",
  estimatedTime: 50,
  steps: [
    {
      number: 1,
      title: "Introduction",
      content: [
        {
          type: "text",
          content:
            "In this codelab, you will build a contextual yoga pose recommender application using Firestore Vector Search, Langchain, and Gemini. This application will allow users to search for yoga poses based on natural language descriptions and find similar poses.",
        },
        {
          type: "text",
          content: "You will learn how to:",
        },
        {
          type: "text",
          content:
            "• Set up Firestore with Vector Search\n• Process and import yoga pose data\n• Generate vector embeddings for text using Langchain\n• Implement similarity search using vector embeddings\n• Create a simple interface to query and display results",
        },
        {
          type: "image",
          url: "/placeholder.svg?height=300&width=600",
          alt: "Yoga Pose Recommender App Architecture",
          caption: "Architecture diagram of the Yoga Pose Recommender application",
        },
      ],
    },
    {
      number: 2,
      title: "Before you Begin",
      content: [
        {
          type: "text",
          content: "Before starting this codelab, make sure you have the following prerequisites:",
        },
        {
          type: "text",
          content:
            "• Python 3.8 or higher installed\n• A Google Cloud account with billing enabled\n• Basic knowledge of Python and Firebase/Firestore\n• Familiarity with vector embeddings and similarity search concepts",
        },
        {
          type: "question",
          question: "Do you have all the prerequisites ready?",
          options: ["Yes, I have everything set up", "No, I need to set up some prerequisites"],
          inputType: "radio",
        },
        {
          type: "link",
          text: "Set up Google Cloud Account",
          url: "https://cloud.google.com/free",
        },
      ],
    },
    {
      number: 3,
      title: "Setup Firestore",
      content: [
        {
          type: "text",
          content:
            "In this step, we will set up Firestore with Vector Search capabilities. Follow these instructions to create a new Firestore database and enable the necessary features.",
        },
        {
          type: "text",
          content:
            "1. Go to the Firebase console and create a new project\n2. Enable Firestore database in your project\n3. Set up the necessary security rules\n4. Install the required Python packages",
        },
        {
          type: "code",
          language: "bash",
          content: "pip install firebase-admin langchain google-cloud-firestore",
        },
        {
          type: "text",
          content: "After installing the packages, you need to set up your service account credentials:",
        },
        {
          type: "code",
          language: "python",
          content:
            'import firebase_admin\nfrom firebase_admin import credentials, firestore\n\n# Initialize Firebase\ncred = credentials.Certificate("path/to/serviceAccountKey.json")\nfirebase_admin.initialize_app(cred)\ndb = firestore.client()',
        },
      ],
    },
    {
      number: 4,
      title: "Prepare the Yoga poses dataset",
      content: [
        {
          type: "text",
          content:
            "For this project, we will use a dataset of yoga poses with descriptions, benefits, and other metadata. We need to prepare this data for import into Firestore and for generating vector embeddings.",
        },
        {
          type: "text",
          content: "The dataset should include the following fields for each yoga pose:",
        },
        {
          type: "text",
          content:
            "• name: The name of the yoga pose\n• sanskrit_name: The Sanskrit name of the pose\n• description: A detailed description of how to perform the pose\n• benefits: Health benefits of the pose\n• level: Difficulty level (beginner, intermediate, advanced)\n• pose_type: Category of the pose (standing, seated, etc.)",
        },
        {
          type: "code",
          language: "python",
          content:
            'import json\n\n# Sample yoga pose data\nyoga_poses = [\n    {\n        "name": "Downward-Facing Dog",\n        "sanskrit_name": "Adho Mukha Svanasana",\n        "description": "Start on your hands and knees, with hands shoulder-width apart...",\n        "benefits": "Stretches the shoulders, hamstrings, calves, arches, and hands...",\n        "level": "Beginner",\n        "pose_type": "Standing"\n    },\n    # More poses...\n]\n\n# Save to a JSON file\nwith open("yoga_poses.json", "w") as f:\n    json.dump(yoga_poses, f, indent=2)',
        },
        {
          type: "question",
          question: "Have you prepared your dataset?",
          inputType: "text",
          placeholder: "Yes/No. If no, what issues are you facing?",
        },
      ],
    },
    {
      number: 5,
      title: "Import Data into Firestore and generate Vector Embeddings",
      subtitle: "Create vector embeddings for similarity search",
      content: [
        {
          type: "text",
          content:
            "We have the data/yoga_poses.json file and now need to populate the Firestore Database with it and importantly, generate the Vector Embeddings for each of the records. The Vector Embeddings will be used later on when we have to do a similarity search on them with the user query that has been provided in natural language.",
        },
        {
          type: "text",
          content: "We will be using the LangChain connections to implement the above process.",
        },
        {
          type: "text",
          content: "The steps to do that will be as follows:",
        },
        {
          type: "text",
          content:
            "1. We will convert the list of JSON objects into a list of LangChain Document objects. Each document object has attributes: page_content and metadata. The metadata object will contain the entire JSON object that has attributes like name, description, sanskrit_name, etc. The page_content will be a concatenation of all the fields.",
        },
        {
          type: "text",
          content:
            '2. Once we have a list of Document objects, we will be using the FirestoreVectorStore LangChain class and creating a TEXT_COLLECTION variable that points to "text-poses", a Vercel AI Embedding class and the Firestore connection details (PROJECT_ID and DATABASE_NAME). This will create the collection and will also generate an embedding field for each of the attributes.',
        },
        {
          type: "code",
          language: "python",
          content:
            "def create_langchain_documents(poses):\n    \"\"\"Creates a list of LangChain Documents from a list of poses.\"\"\"\n    documents = []\n    for pose in poses:\n        # Convert pose to a string representation for page_content\n        page_content = f\"\"\"\n        {'description': pose.get('description', '')}\n        {'sanskrit_name': pose.get('sanskrit_name', '')}\n        {'name': pose.get('name', '')}\n        {'benefits': pose.get('benefits', '')}\n        {'pose_type': pose.get('pose_type', 'N/A')}\n        \"\"\"\n        # metadata = pose\n        document = Document(page_content=page_content, metadata=metadata)\n        documents.append(document)\n    return documents\n\ndef main():\n    all_poses = load_yoga_poses_data_from_local_file()\n    documents = create_langchain_documents(all_poses)\n    logging.info(\"Successfully created LangChain documents. Total documents: {len(documents)}\")\n    \n    embedding_model = VertexAIEmbeddings(\n        model_name=settings.embedding_model_name,\n        project=settings.project_id,\n        location=settings.location\n    )\n    \n    client = firestore.Client(project=settings.project_id, database=settings.database)\n    \n    vector_store = FirestoreVectorStore.from_documents(\n        client=client,\n        collection=settings.text_collection,\n        embedding=embedding_model,\n        embedding_key=\"embedding\"\n    )\n    \n    logging.info(\"Added documents to the vector store.\")\n\nif __name__ == \"__main__\":\n    main()",
        },
        {
          type: "text",
          content:
            "Let us run this application. In the terminal window with the active python (.venv) environment, run the following command inside the yoga-poses-recommender-python folder:",
        },
        {
          type: "code",
          language: "bash",
          content: "python import-data.py",
        },
        {
          type: "text",
          content: "If all goes well, you should see a message similar to the one below:",
        },
        {
          type: "code",
          language: "bash",
          content: "2024-01-15 14:00:00,479 - INFO - Added documents to the vector store.",
        },
        {
          type: "text",
          content:
            "To check if the records have been inserted successfully and the embeddings have been generated, visit the Firestore Cloud console.",
        },
        {
          type: "image",
          url: "/placeholder.svg?height=400&width=600",
          alt: "Firestore Console showing vector embeddings",
          caption: "Firestore Console with the yoga poses collection and vector embeddings",
        },
      ],
    },
    {
      number: 6,
      title: "Perform Vector Similarity Search in Firestore",
      content: [
        {
          type: "text",
          content:
            "Now that we have our data in Firestore with vector embeddings, we can implement similarity search to find yoga poses based on natural language queries.",
        },
        {
          type: "code",
          language: "python",
          content:
            'from langchain.vectorstores import FirestoreVectorStore\nfrom langchain.embeddings import VertexAIEmbeddings\nfrom google.cloud import firestore\n\ndef search_similar_poses(query, limit=5):\n    # Initialize embedding model\n    embedding_model = VertexAIEmbeddings(\n        model_name="embedding-model-name",\n        project="your-project-id",\n        location="us-central1"\n    )\n    \n    # Initialize Firestore client\n    client = firestore.Client(project="your-project-id")\n    \n    # Initialize vector store\n    vector_store = FirestoreVectorStore(\n        client=client,\n        collection="text-poses",\n        embedding=embedding_model,\n        embedding_key="embedding"\n    )\n    \n    # Perform similarity search\n    results = vector_store.similarity_search(query, k=limit)\n    \n    # Extract and return the results\n    poses = []\n    for doc in results:\n        poses.append(doc.metadata)\n    \n    return poses\n\n# Example usage\nresults = search_similar_poses("yoga poses for back pain")\nfor pose in results:\n    print(f"Name: {pose[\'name\']}")\n    print(f"Description: {pose[\'description\'][:100]}...")\n    print()',
        },
        {
          type: "question",
          question: "What type of yoga poses would you like to search for?",
          inputType: "text",
          placeholder: "E.g., poses for relaxation, back pain, flexibility...",
        },
      ],
    },
    {
      number: 7,
      title: "Optional: Connecting to Google Cloud Run",
      content: [
        {
          type: "text",
          content:
            "To make your application accessible via the web, you can deploy it to Google Cloud Run. This step is optional but recommended for a complete solution.",
        },
        {
          type: "text",
          content: "First, let's create a simple Flask API to serve our yoga pose recommendations:",
        },
        {
          type: "code",
          language: "python",
          content:
            "from flask import Flask, request, jsonify\nfrom search import search_similar_poses\n\napp = Flask(__name__)\n\n@app.route('/api/search', methods=['POST'])\ndef search():\n    data = request.json\n    query = data.get('query', '')\n    limit = data.get('limit', 5)\n    \n    if not query:\n        return jsonify({'error': 'Query is required'}), 400\n    \n    results = search_similar_poses(query, limit)\n    return jsonify({'results': results})\n\nif __name__ == '__main__':\n    app.run(host='0.0.0.0', port=8080)",
        },
        {
          type: "text",
          content: "Next, create a Dockerfile to containerize your application:",
        },
        {
          type: "code",
          language: "dockerfile",
          content:
            "FROM python:3.9-slim\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\n\nCOPY . .\n\nCMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app",
        },
        {
          type: "text",
          content: "Finally, deploy to Cloud Run using the following commands:",
        },
        {
          type: "code",
          language: "bash",
          content:
            "# Build the container\ngcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/yoga-recommender\n\n# Deploy to Cloud Run\ngcloud run deploy yoga-recommender \\\n  --image gcr.io/YOUR_PROJECT_ID/yoga-recommender \\\n  --platform managed \\\n  --region us-central1 \\\n  --allow-unauthenticated",
        },
      ],
    },
    {
      number: 8,
      title: "The Web Application",
      content: [
        {
          type: "text",
          content:
            "Now let's create a simple web interface to interact with our yoga pose recommender. We'll use HTML, CSS, and JavaScript to build a user-friendly interface.",
        },
        {
          type: "code",
          language: "html",
          content:
            '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Yoga Pose Recommender</title>\n  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">\n</head>\n<body class="bg-gray-100 min-h-screen">\n  <div class="container mx-auto px-4 py-8">\n    <h1 class="text-3xl font-bold text-center mb-8">Yoga Pose Recommender</h1>\n    \n    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8">\n      <div class="p-6">\n        <h2 class="text-xl font-semibold mb-4">Find the perfect yoga pose</h2>\n        <p class="text-gray-600 mb-4">Describe what you\'re looking for in natural language</p>\n        \n        <div class="mb-4">\n          <textarea \n            id="query-input" \n            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" \n            rows="3" \n            placeholder="E.g., poses for back pain, beginner poses for flexibility..."\n          ></textarea>\n        </div>\n        \n        <button \n          id="search-button" \n          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"\n        >\n          Search Poses\n        </button>\n      </div>\n    </div>\n    \n    <div id="results-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n      <!-- Results will be populated here -->\n    </div>\n    \n    <div id="loading" class="hidden text-center py-8">\n      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>\n      <p class="mt-2 text-gray-600">Searching for poses...</p>\n    </div>\n  </div>\n  \n  <script>\n    document.addEventListener(\'DOMContentLoaded\', () => {\n      const queryInput = document.getElementById(\'query-input\');\n      const searchButton = document.getElementById(\'search-button\');\n      const resultsContainer = document.getElementById(\'results-container\');\n      const loading = document.getElementById(\'loading\');\n      \n      searchButton.addEventListener(\'click\', async () => {\n        const query = queryInput.value.trim();\n        \n        if (!query) return;\n        \n        // Show loading indicator\n        resultsContainer.innerHTML = \'\';\n        loading.classList.remove(\'hidden\');\n        \n        try {\n          const response = await fetch(\'/api/search\', {\n            method: \'POST\',\n            headers: {\n              \'Content-Type\': \'application/json\'\n            },\n            body: JSON.stringify({ query, limit: 6 })\n          });\n          \n          const data = await response.json();\n          \n          // Hide loading indicator\n          loading.classList.add(\'hidden\');\n          \n          if (data.results && data.results.length > 0) {\n            data.results.forEach(pose => {\n              const poseCard = document.createElement(\'div\');\n              poseCard.className = \'bg-white rounded-lg shadow-md overflow-hidden\';\n              poseCard.innerHTML = `\n                <div class="p-6">\n                  <h3 class="text-xl font-semibold mb-2">${pose.name}</h3>\n                  <p class="text-gray-500 text-sm mb-3">${pose.sanskrit_name}</p>\n                  <p class="text-gray-700 mb-4">${pose.description.substring(0, 150)}...</p>\n                  <div class="flex justify-between items-center">\n                    <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${pose.level}</span>\n                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">${pose.pose_type}</span>\n                  </div>\n                </div>\n              `;\n              resultsContainer.appendChild(poseCard);\n            });\n          } else {\n            resultsContainer.innerHTML = `\n              <div class="col-span-full text-center py-8">\n                <p class="text-gray-600">No poses found matching your query. Try a different search.</p>\n              </div>\n            `;\n          }\n        } catch (error) {\n          console.error(\'Error:\', error);\n          loading.classList.add(\'hidden\');\n          resultsContainer.innerHTML = `\n            <div class="col-span-full text-center py-8">\n              <p class="text-red-600">An error occurred while searching. Please try again later.</p>\n            </div>\n          `;\n        }\n      });\n    });\n  </script>\n</body>\n</html>',
        },
        {
          type: "text",
          content:
            'You can serve this HTML file using a simple web server or integrate it with your Flask application by placing it in a "templates" folder and rendering it with Flask\'s template engine.',
        },
      ],
    },
    {
      number: 9,
      title: "Congratulations!",
      content: [
        {
          type: "text",
          content:
            "Congratulations! You have successfully built a contextual Yoga Poses recommender application using Firestore Vector Search, Langchain, and Gemini.",
        },
        {
          type: "text",
          content: "In this codelab, you learned how to:",
        },
        {
          type: "text",
          content:
            "• Set up Firestore with Vector Search capabilities\n• Process and import yoga pose data\n• Generate vector embeddings for text using Langchain\n• Implement similarity search using vector embeddings\n• Create a simple web interface to query and display results",
        },
        {
          type: "text",
          content: "You can extend this application in several ways:",
        },
        {
          type: "text",
          content:
            "• Add user authentication to save favorite poses\n• Implement filters for pose difficulty, type, etc.\n• Add images for each yoga pose\n• Create a mobile app using Flutter or React Native\n• Integrate with a voice assistant for hands-free interaction",
        },
        {
          type: "question",
          question: "How would you rate this codelab?",
          options: ["Excellent", "Good", "Average", "Poor"],
          inputType: "radio",
        },
        {
          type: "text",
          content: "Thank you for completing this codelab! We hope you found it helpful and informative.",
        },
      ],
    },
  ],
}
