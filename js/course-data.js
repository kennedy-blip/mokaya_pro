/* ============================================================
   MOKAYA PRO — DATA SCIENCE ACADEMY
   Full Curriculum Data  •  Lecturer: Kennedy Blip (Mokaya)
   ============================================================ */

const COURSE_META = {
  title: "Data Science & Artificial Intelligence",
  code: "DS 301",
  lecturer: "Kennedy Blip — Mokaya",
  lecturerTitle: "Lecturer, Data Science & AI",
  lecturerBio: "Data scientist and educator based in Meru, Kenya. 8+ years building data products for fintech, agriculture and education. This course is my classroom — every unit, tutorial and project below is what I teach live to my students.",
  semester: "Semester 2 • 2026",
  credits: 4,
  level: "Beginner → Advanced",
  duration: "14 Weeks • 56 Contact Hours",
  language: "English",
  prerequisites: "Basic computer literacy. No prior coding required — Unit 1 starts from zero.",
  grading: "Assignments 20% • Mini Projects 20% • Quiz 10% • Final Capstone 50%",
  timetable: "Tue & Thu 09:00–11:00 EAT • Lab Fri 14:00–16:00 • Office Hours Wed 10:00–12:00",
  email: "lecturer@mokaya-pro.ac.ke",
  location: "Meru, Kenya • Also live on Vercel",
};

const UNITS = [
  {
    id: "u1", number: 1, title: "Foundations & Python for Data Science",
    icon: "🐍", color: "#2563eb", weeks: "Week 1–2", hours: 8,
    subjects: ["Python Programming", "Jupyter Notebooks", "Git & GitHub", "Problem Solving"],
    outcomes: ["Write Python programs from scratch", "Use Jupyter / Colab professionally", "Version-control your work with Git"],
    preview: "Start from zero. Install Python, write your first programs, and learn the exact workflow professional data scientists use every day — notebooks, Git, and clean code.",
    topics: [
      { id:"u1t1", title:"What is Data Science? The DS Workflow", preview:"Discover what data scientists actually do — from asking the right question to deploying a model. See the 6-step workflow you will use in every project this semester.", duration:"45 min", difficulty:"Beginner", language:"Python", objectives:["Explain the 6-step DS workflow","Distinguish DS vs ML vs AI vs Statistics","Set up your dev environment"], tutorials:[{title:"Kaggle — Intro to Data Science",url:"https://www.kaggle.com/learn/intro-to-data-science",type:"Tutorial"},{title:"freeCodeCamp — Data Science Full Course",url:"https://www.youtube.com/watch?v=Lhro-dovrEg",type:"Video"}], code:"print('Hello, Data Science!')\n# The DS Workflow:\n# 1. Ask  2. Get Data  3. Clean  4. Explore\n# 5. Model  6. Communicate", task:"Write a 1-page reflection: 'What problem in Meru would you solve with data?' Post it in the class forum." },
      { id:"u1t2", title:"Python Basics: Variables, Loops & Functions", preview:"Master the building blocks — variables, data types, conditionals, loops and functions. Every data script you write this semester uses these.", duration:"90 min", difficulty:"Beginner", language:"Python", objectives:["Use variables, lists, dicts, loops","Write reusable functions","Debug common errors"], tutorials:[{title:"Python Docs — Tutorial",url:"https://docs.python.org/3/tutorial/",type:"Docs"},{title:"freeCodeCamp — Python for Beginners",url:"https://www.freecodecamp.org/learn/scientific-computing-with-python/",type:"Course"}], code:"students = ['Achieng','Brian','Cynthia']\nfor s in students:\n    print(f'Karibu, {s}!')\n\ndef average(scores):\n    return sum(scores)/len(scores)\n\nprint(average([80,90,70]))  # 80.0", task:"Mini Project 1: Grade Calculator — input 5 scores, output average + grade (A–F)." },
      { id:"u1t3", title:"Jupyter, Colab & Git Workflow", preview:"Learn the professional notebook workflow in Jupyter and Google Colab, and version-control every experiment with Git & GitHub.", duration:"60 min", difficulty:"Beginner", language:"Python", objectives:["Create & run Jupyter notebooks","Use Colab with GPU","Commit & push with Git"], tutorials:[{title:"Jupyter Docs",url:"https://jupyter.org/",type:"Docs"},{title:"GitHub Skills — Intro to GitHub",url:"https://github.com/skills/introduction-to-github",type:"Hands-on"}], code:"# Terminal workflow\ngit init && git add . && git commit -m 'feat: first notebook'\ngit push origin main", task:"Push your first notebook to GitHub. Link it in your portfolio page." },
      { id:"u1t4", title:"Data Types, Strings & Working with Files", preview:"Handle real-world messy text, read CSV/JSON files, and write clean outputs — the first step of every data pipeline.", duration:"75 min", difficulty:"Beginner", language:"Python", objectives:["Manipulate strings & dates","Read CSV/JSON with Python","Write results to files"], tutorials:[{title:"Python — Input/Output & Files",url:"https://docs.python.org/3/tutorial/inputoutput.html",type:"Docs"},{title:"W3Schools — Python File Handling",url:"https://www.w3schools.com/python/python_file_handling.asp",type:"Tutorial"}], code:"import csv\nwith open('students.csv') as f:\n    rows = list(csv.DictReader(f))\nprint(f'{len(rows)} students loaded')", task:"Read the sample students.csv in the Playground and print the top 3 by score." },
    ]
  },
  {
    id: "u2", number: 2, title: "Data Wrangling with Pandas & NumPy",
    icon: "🧹", color: "#059669", weeks: "Week 3–4", hours: 8,
    subjects: ["Pandas", "NumPy", "Data Cleaning", "Feature Engineering"],
    outcomes: ["Clean messy real-world datasets", "Transform data with Pandas & NumPy", "Engineer features that improve models"],
    preview: "Real data is messy. Learn to clean, merge, reshape and engineer features with Pandas and NumPy — the most-used skill in every data job.",
    topics: [
      { id:"u2t1", title:"NumPy: Arrays & Vectorised Math", preview:"Replace slow loops with fast vectorised NumPy operations. Understand arrays, broadcasting and why NumPy powers all of ML.", duration:"60 min", difficulty:"Beginner", language:"Python", objectives:["Create & slice NumPy arrays","Vectorise operations","Use broadcasting"], tutorials:[{title:"NumPy — Beginner Guide",url:"https://numpy.org/doc/stable/user/quickstart.html",type:"Docs"},{title:"Kaggle — Intro to NumPy",url:"https://www.kaggle.com/learn/numpy",type:"Tutorial"}], code:"import numpy as np\nscores = np.array([78, 92, 65, 88])\nprint('Mean:', scores.mean())   # 80.75\nprint('Top:', scores.max())     # 92", task:"Compute mean, median, std of 10 exam scores using only NumPy." },
      { id:"u2t2", title:"Pandas: DataFrames, Filtering & GroupBy", preview:"The heart of data wrangling. Load CSVs, filter rows, group and aggregate — answer business questions in a few lines.", duration:"90 min", difficulty:"Beginner", language:"Python", objectives:["Load & inspect DataFrames","Filter, sort, groupby","Aggregate with agg()"], tutorials:[{title:"Pandas — User Guide",url:"https://pandas.pydata.org/docs/user_guide/",type:"Docs"},{title:"Kaggle — Intro to Pandas",url:"https://www.kaggle.com/learn/pandas",type:"Tutorial"}], code:"import pandas as pd\ndf = pd.read_csv('students.csv')\nprint(df[df.score > 80].groupby('course').score.mean())", task:"Find the average score per course and the top student overall." },
      { id:"u2t3", title:"Cleaning Messy Data: Missing Values & Types", preview:"Handle missing values, duplicates, wrong types and outliers. Learn the exact checklist professionals run on every new dataset.", duration:"75 min", difficulty:"Intermediate", language:"Python", objectives:["Detect missing/duplicates","Impute & convert types","Detect outliers"], tutorials:[{title:"Pandas — Missing Data",url:"https://pandas.pydata.org/docs/user_guide/missing_data.html",type:"Docs"},{title:"Towards Data Science — Data Cleaning",url:"https://towardsdatascience.com/data-cleaning-in-python-5b6f0f31084f",type:"Article"}], code:"df = df.drop_duplicates()\ndf['score'] = df['score'].fillna(df['score'].median())\ndf['date'] = pd.to_datetime(df['date'])", task:"Clean the messy dataset in the Playground — fix 5 planted errors." },
      { id:"u2t4", title:"Merging, Reshaping & Feature Engineering", preview:"Join multiple tables, pivot data into analysis-ready shape, and create new features that make models smarter.", duration:"75 min", difficulty:"Intermediate", language:"Python", objectives:["Merge/join DataFrames","Pivot & melt","Create engineered features"], tutorials:[{title:"Pandas — Reshaping",url:"https://pandas.pydata.org/docs/user_guide/reshaping.html",type:"Docs"},{title:"DataCamp — Feature Engineering",url:"https://www.datacamp.com/courses/feature-engineering-for-machine-learning",type:"Course"}], code:"df['grade'] = pd.cut(df.score, [0,50,65,80,100],\n                       labels=['F','C','B','A'])\ndf['pass'] = (df.score >= 50).astype(int)", task:"Engineer 3 new features from the student dataset and explain why each helps." },
    ]
  },
  {
    id: "u3", number: 3, title: "Data Visualisation & Exploratory Analysis",
    icon: "📊", color: "#7c3aed", weeks: "Week 5–6", hours: 8,
    subjects: ["Matplotlib", "Seaborn", "Plotly", "Storytelling with Data"],
    outcomes: ["Choose the right chart for every question", "Build publication-quality visualisations", "Tell a data story to non-technical audiences"],
    preview: "A chart is worth a thousand rows. Learn to explore data visually and present insights that decision-makers actually understand.",
    topics: [
      { id:"u3t1", title:"EDA: The Data Scientist's First Move", preview:"Before any model, explore. Learn the systematic EDA checklist — distributions, correlations, and the questions hidden in your data.", duration:"60 min", difficulty:"Beginner", language:"Python", objectives:["Run a full EDA checklist","Spot patterns & anomalies","Form hypotheses"], tutorials:[{title:"Seaborn — EDA Guide",url:"https://seaborn.pydata.org/tutorial/relational.html",type:"Docs"},{title:"Kaggle — Data Visualisation",url:"https://www.kaggle.com/learn/data-visualization",type:"Tutorial"}], code:"df.describe()          # summary stats\ndf.corr(numeric_only=True)  # correlations", task:"Write a 5-point EDA report on the student dataset." },
      { id:"u3t2", title:"Matplotlib & Seaborn Charts", preview:"Bar, line, scatter, histogram, heatmap — build every essential chart and learn when each one lies or tells the truth.", duration:"90 min", difficulty:"Beginner", language:"Python", objectives:["Build 8 core chart types","Style charts professionally","Avoid misleading axes"], tutorials:[{title:"Matplotlib — Gallery",url:"https://matplotlib.org/stable/gallery/index.html",type:"Gallery"},{title:"Seaborn — Tutorial",url:"https://seaborn.pydata.org/tutorial.html",type:"Docs"}], code:"import matplotlib.pyplot as plt\nplt.hist(df.score, bins=10, color='#2563eb')\nplt.title('Score Distribution')\nplt.show()", task:"Recreate the 4 charts in the Final Project dashboard using Seaborn." },
      { id:"u3t3", title:"Interactive Charts with Plotly", preview:"Build hoverable, zoomable, shareable charts for the web — the same tech behind this course app's dashboards.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Build Plotly Express charts","Add interactivity","Export for web"], tutorials:[{title:"Plotly — Python Docs",url:"https://plotly.com/python/",type:"Docs"},{title:"Plotly Express Guide",url:"https://plotly.com/python/plotly-express/",type:"Docs"}], code:"import plotly.express as px\nfig = px.scatter(df, x='hours', y='score', color='course')\nfig.show()", task:"Build an interactive scatter of study hours vs score. Share the link." },
      { id:"u3t4", title:"Data Storytelling & Dashboards", preview:"Turn analysis into decisions. Structure a story: headline, evidence, implication, recommendation — and present it like a consultant.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Structure a data story","Design a 1-page dashboard","Present to stakeholders"], tutorials:[{title:"Storytelling with Data",url:"https://www.storytellingwithdata.com/",type:"Book Site"},{title:"Tableau — Free Training",url:"https://www.tableau.com/learn/training",type:"Course"}], code:"# Story arc:\n# 1. Headline (insight)  2. Chart (evidence)\n# 3. So-what (implication)  4. Now-what (action)", task:"Present your EDA findings in 5 slides. Class votes on best story." },
    ]
  },
  {
    id: "u4", number: 4, title: "Statistics & Probability for ML",
    icon: "🎲", color: "#d97706", weeks: "Week 7–8", hours: 8,
    subjects: ["Descriptive Statistics", "Probability", "Hypothesis Testing", "Bayesian Thinking"],
    outcomes: ["Interpret stats correctly — no p-hacking", "Test hypotheses rigorously", "Understand the maths behind ML models"],
    preview: "Models are just statistics with computers. Master distributions, inference and Bayesian thinking — the maths that separates real data scientists from button-pushers.",
    topics: [
      { id:"u4t1", title:"Descriptive Stats & Distributions", preview:"Mean, median, variance, normal distribution, CLT — understand your data's shape before you model it.", duration:"75 min", difficulty:"Intermediate", language:"Python", objectives:["Compute & interpret stats","Recognise distributions","Apply CLT"], tutorials:[{title:"StatQuest — Statistics",url:"https://www.youtube.com/@statquest",type:"Video"},{title:"Khan Academy — Statistics",url:"https://www.khanacademy.org/math/statistics-probability",type:"Course"}], code:"import numpy as np\nprint(np.percentile(df.score, [25,50,75]))  # quartiles", task:"Describe the score distribution in 3 sentences using stats only." },
      { id:"u4t2", title:"Probability & Bayes' Theorem", preview:"From coin flips to spam filters — probability is the language of uncertainty, and Bayes is its grammar.", duration:"75 min", difficulty:"Intermediate", language:"Python", objectives:["Compute conditional probability","Apply Bayes' theorem","Model uncertainty"], tutorials:[{title:"StatQuest — Bayes Theorem",url:"https://www.youtube.com/watch?v=AT6YD-SCLV8",type:"Video"},{title:"Seeing Theory — Probability",url:"https://seeing-theory.brown.edu/",type:"Interactive"}], code:"P(A|B) = P(B|A) * P(A) / P(B)  # Bayes\n# Used in: spam filters, medical tests, Naive Bayes ML", task:"Solve the medical-test paradox. Explain why a positive test ≠ 99% sick." },
      { id:"u4t3", title:"Hypothesis Testing & p-values", preview:"Test claims with data: t-tests, ANOVA, chi-square. Learn what p-values really mean — and the mistakes that fool even pros.", duration:"90 min", difficulty:"Intermediate", language:"Python", objectives:["Run t-tests & ANOVA","Interpret p-values correctly","Avoid common fallacies"], tutorials:[{title:"SciPy — Stats Docs",url:"https://docs.scipy.org/doc/scipy/reference/stats.html",type:"Docs"},{title:"StatQuest — p-values",url:"https://www.youtube.com/watch?v=-f6j-oo3lyo",type:"Video"}], code:"from scipy import stats\nt, p = stats.ttest_ind(group_a, group_b)\nprint(f't={t:.2f}, p={p:.4f}')", task:"Test: 'Do morning students score higher?' Report effect size + p-value." },
      { id:"u4t4", title:"Correlation, Regression & Causation", preview:"Correlation is not causation — but regression is how we quantify relationships. Master linear regression by hand and with code.", duration:"75 min", difficulty:"Intermediate", language:"Python", objectives:["Compute correlation","Fit linear regression","Distinguish correlation vs causation"], tutorials:[{title:"StatQuest — Linear Regression",url:"https://www.youtube.com/watch?v=nk2RYR-ypK4",type:"Video"},{title:"SciPy — Linear Regression",url:"https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.linregress.html",type:"Docs"}], code:"from scipy.stats import linregress\nr = linregress(df.hours, df.score)\nprint(f'slope={r.slope:.2f}, r={r.rvalue:.2f}')", task:"Predict score from study hours. Report R² and interpret the slope." },
    ]
  },
  {
    id: "u5", number: 5, title: "Machine Learning Fundamentals",
    icon: "🤖", color: "#dc2626", weeks: "Week 9–10", hours: 10,
    subjects: ["Scikit-learn", "Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
    outcomes: ["Train & evaluate ML models correctly", "Avoid data leakage & overfitting", "Choose the right algorithm for each problem"],
    preview: "The core of modern data science. Train classifiers, regressors and clustering models with Scikit-learn — and evaluate them honestly.",
    topics: [
      { id:"u5t1", title:"The ML Workflow & Train/Test Split", preview:"How models learn: features, labels, loss, optimisation. Master the train/test split that keeps your evaluation honest.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Explain supervised vs unsupervised","Split data correctly","Prevent leakage"], tutorials:[{title:"Scikit-learn — Getting Started",url:"https://scikit-learn.org/stable/getting_started.html",type:"Docs"},{title:"Kaggle — Intro to ML",url:"https://www.kaggle.com/learn/intro-to-machine-learning",type:"Tutorial"}], code:"from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)", task:"Split the student dataset. Verify no leakage between splits." },
      { id:"u5t2", title:"Regression: Linear & Logistic", preview:"Predict numbers and probabilities. Linear regression for scores, logistic regression for pass/fail — with full evaluation.", duration:"90 min", difficulty:"Intermediate", language:"Python", objectives:["Fit linear & logistic regression","Interpret coefficients","Evaluate with metrics"], tutorials:[{title:"Scikit-learn — Linear Models",url:"https://scikit-learn.org/stable/modules/linear_model.html",type:"Docs"},{title:"StatQuest — Logistic Regression",url:"https://www.youtube.com/watch?v=yIYKR6cgKo4",type:"Video"}], code:"from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)\nprint('R2:', model.score(X_test, y_test))", task:"Predict final score from hours + attendance. Beat R² = 0.70." },
      { id:"u5t3", title:"Classification: Trees, Forests & SVM", preview:"Decision trees, random forests and support vector machines — powerful classifiers with very different personalities.", duration:"90 min", difficulty:"Advanced", language:"Python", objectives:["Train tree-based models","Tune hyperparameters","Compare algorithms"], tutorials:[{title:"Scikit-learn — Trees",url:"https://scikit-learn.org/stable/modules/tree.html",type:"Docs"},{title:"Kaggle — Intermediate ML",url:"https://www.kaggle.com/learn/intermediate-machine-learning",type:"Tutorial"}], code:"from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100, random_state=42)\nclf.fit(X_train, y_train)", task:"Classify pass/fail. Compare Tree vs Forest vs Logistic on accuracy + F1." },
      { id:"u5t4", title:"Clustering & Unsupervised Learning", preview:"Find hidden groups without labels. K-Means, PCA and dimensionality reduction — discover structure in unlabeled data.", duration:"75 min", difficulty:"Advanced", language:"Python", objectives:["Run K-Means clustering","Apply PCA","Visualise clusters"], tutorials:[{title:"Scikit-learn — Clustering",url:"https://scikit-learn.org/stable/modules/clustering.html",type:"Docs"},{title:"StatQuest — K-Means",url:"https://www.youtube.com/watch?v=4b5hIR8B2Fk",type:"Video"}], code:"from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=3, random_state=42).fit(X)\ndf['cluster'] = km.labels_", task:"Cluster students into 3 study profiles. Name each cluster." },
      { id:"u5t5", title:"Model Evaluation: Metrics & Cross-Validation", preview:"Accuracy lies. Learn precision, recall, F1, ROC-AUC, confusion matrices and cross-validation — evaluate like a scientist.", duration:"75 min", difficulty:"Advanced", language:"Python", objectives:["Compute full metric suite","Read confusion matrices","Use cross-validation"], tutorials:[{title:"Scikit-learn — Metrics",url:"https://scikit-learn.org/stable/modules/model_evaluation.html",type:"Docs"},{title:"Towards Data Science — Metrics",url:"https://towardsdatascience.com/accuracy-precision-recall-f1-score-interpretation-of-performance-measures-b709247bda2a",type:"Article"}], code:"from sklearn.metrics import classification_report\nprint(classification_report(y_test, y_pred))", task:"Write a model card: metrics, limitations, ethical risks." },
    ]
  },
  {
    id: "u6", number: 6, title: "Deep Learning & Neural Networks",
    icon: "🧠", color: "#0891b2", weeks: "Week 11–12", hours: 8,
    subjects: ["TensorFlow / PyTorch", "CNNs", "RNNs & Transformers", "Computer Vision"],
    outcomes: ["Build neural networks in PyTorch", "Understand CNNs & Transformers", "Train a real image classifier"],
    preview: "Go beyond classical ML. Build neural networks that see, read and generate — the tech behind ChatGPT, self-driving cars and medical imaging.",
    topics: [
      { id:"u6t1", title:"Neural Networks from Scratch", preview:"Perceptrons, activations, backpropagation — build a neural net with pure NumPy before touching any framework.", duration:"90 min", difficulty:"Advanced", language:"Python", objectives:["Implement a perceptron","Understand backprop","Build a 2-layer net in NumPy"], tutorials:[{title:"3Blue1Brown — Neural Networks",url:"https://www.youtube.com/watch?v=aircAruvnKk",type:"Video"},{title:"PyTorch — 60-Min Blitz",url:"https://pytorch.org/tutorials/beginner/deep_learning_101.html",type:"Tutorial"}], code:"import numpy as np\ndef relu(x): return np.maximum(0, x)\n# forward -> loss -> backprop -> update", task:"Implement XOR with a 2-layer NumPy network. Show it learns." },
      { id:"u6t2", title:"PyTorch & TensorFlow Essentials", preview:"The two frameworks that run the world. Build, train and save models in PyTorch — the research standard.", duration:"90 min", difficulty:"Advanced", language:"Python", objectives:["Build models in PyTorch","Train with autograd","Save & load models"], tutorials:[{title:"PyTorch — Tutorials",url:"https://pytorch.org/tutorials/",type:"Docs"},{title:"TensorFlow — Tutorials",url:"https://www.tensorflow.org/tutorials",type:"Docs"}], code:"import torch\nmodel = torch.nn.Sequential(\n    torch.nn.Linear(10, 32), torch.nn.ReLU(),\n    torch.nn.Linear(32, 1))", task:"Train a PyTorch regressor on the student dataset. Compare to sklearn." },
      { id:"u6t3", title:"CNNs & Computer Vision", preview:"How machines see: convolutions, pooling, feature maps. Train an image classifier on a real dataset.", duration:"90 min", difficulty:"Advanced", language:"Python", objectives:["Explain convolutions","Build a CNN","Train on CIFAR-10"], tutorials:[{title:"PyTorch — CNN Tutorial",url:"https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html",type:"Tutorial"},{title:"Keras — CNN Guide",url:"https://keras.io/guides/functional_api/",type:"Docs"}], code:"# CNN: Conv -> ReLU -> Pool -> Flatten -> Dense\n# Output: class probabilities via Softmax", task:"Train a CNN to 80%+ on CIFAR-10. Deploy it on Vercel with a demo page." },
      { id:"u6t4", title:"Transformers & Attention (How LLMs Work)", preview:"The architecture behind ChatGPT. Understand attention, tokens and why transformers changed everything.", duration:"75 min", difficulty:"Advanced", language:"Python", objectives:["Explain self-attention","Tokenise text","Use a pretrained transformer"], tutorials:[{title:"Hugging Face — Course",url:"https://huggingface.co/course/chapter1",type:"Course"},{title:"Jay Alammar — Illustrated Transformer",url:"https://jalammar.github.io/illustrated-transformer/",type:"Article"}], code:"from transformers import pipeline\nclf = pipeline('sentiment-analysis')\nprint(clf('I love data science!'))", task:"Run sentiment analysis on 10 Kenyan tweets. Report accuracy." },
    ]
  },
  {
    id: "u7", number: 7, title: "NLP, LLMs & Generative AI",
    icon: "💬", color: "#be185d", weeks: "Week 13", hours: 6,
    subjects: ["Text Processing", "Embeddings", "LLM APIs", "Prompt Engineering"],
    outcomes: ["Process text with NLP pipelines", "Use LLM APIs responsibly", "Build a RAG-style Q&A demo"],
    preview: "Text is the world's biggest data source. Process language with NLP, call LLM APIs, and build your first AI assistant.",
    topics: [
      { id:"u7t1", title:"Text Processing & TF-IDF", preview:"Tokenise, clean and vectorise text. TF-IDF, n-grams and the classic NLP pipeline that still powers search.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Tokenise & clean text","Vectorise with TF-IDF","Build a text classifier"], tutorials:[{title:"Scikit-learn — Text Features",url:"https://scikit-learn.org/stable/modules/feature_extraction.html",type:"Docs"},{title:"NLTK — Book",url:"https://www.nltk.org/book/",type:"Book"}], code:"from sklearn.feature_extraction.text import TfidfVectorizer\nX = TfidfVectorizer().fit_transform(texts)", task:"Classify SMS messages as spam/ham. Report F1 score." },
      { id:"u7t2", title:"Embeddings & Semantic Search", preview:"Turn words into numbers that capture meaning. Embeddings power search, recommendations and RAG systems.", duration:"60 min", difficulty:"Advanced", language:"Python", objectives:["Generate text embeddings","Compute similarity","Build semantic search"], tutorials:[{title:"OpenAI — Embeddings Guide",url:"https://platform.openai.com/docs/guides/embeddings",type:"Docs"},{title:"Sentence Transformers",url:"https://www.sbert.net/",type:"Docs"}], code:"from sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer('all-MiniLM-L6-v2')\nemb = model.encode(['Karibu Kenya'])", task:"Build semantic search over 20 course topics. Show top-3 results." },
      { id:"u7t3", title:"LLM APIs & Prompt Engineering", preview:"Call GPT/Claude/Gemini APIs, engineer prompts, and build a course Q&A assistant — with cost, safety and evaluation in mind.", duration:"75 min", difficulty:"Intermediate", language:"Python", objectives:["Call an LLM API","Engineer effective prompts","Evaluate outputs"], tutorials:[{title:"OpenAI — API Docs",url:"https://platform.openai.com/docs",type:"Docs"},{title:"Anthropic — Prompt Engineering",url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",type:"Docs"}], code:"# Prompt pattern:\n# Role + Context + Task + Format + Examples\nprompt = 'You are a DS tutor. Explain {topic} simply.'", task:"Build a tutor bot for this course. Test it on 10 student questions." },
    ]
  },
  {
    id: "u8", number: 8, title: "SQL, Databases & Big Data",
    icon: "🗄️", color: "#65a30d", weeks: "Week 14", hours: 6,
    subjects: ["SQL", "PostgreSQL / Supabase", "APIs & Web Scraping", "Data Pipelines"],
    outcomes: ["Query relational databases with SQL", "Connect Python to live databases", "Scrape & ingest web data ethically"],
    preview: "Data lives in databases. Query with SQL, connect Python to PostgreSQL/Supabase, and pull data from APIs — the backend half of data science.",
    topics: [
      { id:"u8t1", title:"SQL Essentials: SELECT, JOIN, GROUP BY", preview:"The universal language of data. Filter, join and aggregate tables — skills every employer tests for.", duration:"75 min", difficulty:"Beginner", language:"SQL", objectives:["Write SELECT/JOIN/GROUP BY","Use window functions","Optimise queries"], tutorials:[{title:"SQLBolt — Interactive SQL",url:"https://sqlbolt.com/",type:"Interactive"},{title:"Mode — SQL Tutorial",url:"https://mode.com/sql-tutorial/",type:"Tutorial"}], code:"SELECT course, AVG(score) AS avg_score\nFROM students\nGROUP BY course\nHAVING AVG(score) > 70\nORDER BY avg_score DESC;", task:"Answer 5 business questions on the sample DB in the Playground." },
      { id:"u8t2", title:"Python + Databases (Supabase / PostgreSQL)", preview:"Connect Python to a live database, run queries, and load results straight into Pandas. The full stack of a real data app.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Connect to PostgreSQL","Query into Pandas","Write results back"], tutorials:[{title:"Supabase — Docs",url:"https://supabase.com/docs",type:"Docs"},{title:"Pandas — SQL I/O",url:"https://pandas.pydata.org/docs/user_guide/io.html#sql",type:"Docs"}], code:"import pandas as pd\nfrom sqlalchemy import create_engine\nengine = create_engine('postgresql://...')\ndf = pd.read_sql('SELECT * FROM students', engine)", task:"Connect to a free Supabase project. Load the students table into Pandas." },
      { id:"u8t3", title:"APIs, Web Scraping & Pipelines", preview:"Pull data from REST APIs, scrape responsibly, and schedule pipelines that keep your data fresh automatically.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Call REST APIs with requests","Scrape with BeautifulSoup","Schedule with cron/GitHub Actions"], tutorials:[{title:"Requests — Docs",url:"https://requests.readthedocs.io/",type:"Docs"},{title:"Beautiful Soup — Docs",url:"https://www.crummy.com/software/BeautifulSoup/bs4/doc/",type:"Docs"}], code:"import requests\nr = requests.get('https://api.example.com/data')\ndata = r.json()", task:"Fetch live data from a public API (e.g. Open-Meteo weather for Meru). Chart it." },
    ]
  },
  {
    id: "u9", number: 9, title: "MLOps, Deployment & Vercel",
    icon: "🚀", color: "#4f46e5", weeks: "Week 15", hours: 6,
    subjects: ["FastAPI", "Docker", "Vercel Deployment", "Monitoring"],
    outcomes: ["Serve models as REST APIs", "Containerise with Docker", "Deploy live apps on Vercel"],
    preview: "A model in a notebook helps no one. Package it as an API, containerise it, and deploy it to the world on Vercel — like this very course app.",
    topics: [
      { id:"u9t1", title:"Serving Models with FastAPI", preview:"Turn your trained model into a REST API with FastAPI. Test it, document it, and call it from any app.", duration:"75 min", difficulty:"Advanced", language:"Python", objectives:["Build a FastAPI app","Validate with Pydantic","Test with Swagger UI"], tutorials:[{title:"FastAPI — Tutorial",url:"https://fastapi.tiangolo.com/tutorial/",type:"Docs"},{title:"FastAPI — Deployment",url:"https://fastapi.tiangolo.com/deployment/",type:"Docs"}], code:"from fastapi import FastAPI\napp = FastAPI()\n@app.post('/predict')\ndef predict(hours: float):\n    return {'score': 40 + hours*5}", task:"Serve your Unit 5 model as a FastAPI endpoint. Share the docs link." },
      { id:"u9t2", title:"Docker & Reproducible Environments", preview:"'Works on my machine' ends here. Containerise your app so it runs identically everywhere.", duration:"60 min", difficulty:"Advanced", language:"Python", objectives:["Write a Dockerfile","Build & run containers","Use docker-compose"], tutorials:[{title:"Docker — Get Started",url:"https://docs.docker.com/get-started/",type:"Docs"},{title:"Docker — Python Guide",url:"https://docs.docker.com/language/python/",type:"Docs"}], code:"FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCMD ['uvicorn', 'main:app']", task:"Containerise your FastAPI app. Run it locally and screenshot it." },
      { id:"u9t3", title:"Deploying to Vercel: Frontend + API", preview:"Ship it. Deploy static frontends and serverless APIs on Vercel with Git — the exact workflow used for this course app.", duration:"60 min", difficulty:"Intermediate", language:"JavaScript", objectives:["Deploy static sites on Vercel","Use Vercel serverless functions","Connect GitHub → Vercel"], tutorials:[{title:"Vercel — Docs",url:"https://vercel.com/docs",type:"Docs"},{title:"Vercel — GitHub Integration",url:"https://vercel.com/docs/deployments/git",type:"Docs"}], code:"// vercel.json\n{ \"cleanUrls\": true }\n// Push to GitHub → Import in Vercel → Live in 60s", task:"Deploy your Mini Project to Vercel. Submit the live URL." },
    ]
  },
  {
    id: "u10", number: 10, title: "Capstone: Final Project & Career Launch",
    icon: "🎓", color: "#0f766e", weeks: "Week 16", hours: 8,
    subjects: ["End-to-End DS Project", "Portfolio", "Interviews", "Freelancing"],
    outcomes: ["Deliver a complete end-to-end data project", "Build a portfolio that gets interviews", "Launch your DS career"],
    preview: "Bring it all together. Design, build, evaluate and deploy a complete data product — your Final Project — and present it like a professional.",
    topics: [
      { id:"u10t1", title:"Capstone Design: Problem → Data → Model", preview:"Frame a real problem, find or collect data, design your pipeline. Great projects start with great questions.", duration:"60 min", difficulty:"Advanced", language:"Python", objectives:["Frame a DS problem","Design the pipeline","Define success metrics"], tutorials:[{title:"Kaggle — Competitions",url:"https://www.kaggle.com/competitions",type:"Platform"},{title:"CRISP-DM Guide",url:"https://www.datascience-pm.com/crisp-dm/",type:"Guide"}], code:"# Capstone template:\n# Problem -> Data -> EDA -> Model -> Eval -> Deploy -> Story", task:"Submit your capstone proposal (1 page) for lecturer approval." },
      { id:"u10t2", title:"Building the Final Project (Live Demo)", preview:"Build the full project inside this app — EDA, model training, prediction UI and deployment. See the working demo in the Final Project tab.", duration:"3 hours", difficulty:"Advanced", language:"Python", objectives:["Complete end-to-end pipeline","Build prediction UI","Deploy on Vercel"], tutorials:[{title:"This Course — Final Project Demo",url:"#/final-project",type:"In-App Demo"},{title:"Scikit-learn — Full Pipeline",url:"https://scikit-learn.org/stable/modules/pipeline.html",type:"Docs"}], code:"pipeline = Pipeline([\n  ('scaler', StandardScaler()),\n  ('model', RandomForestRegressor())\n])\npipeline.fit(X_train, y_train)", task:"Complete the Final Project checklist in the Final Project tab." },
      { id:"u10t3", title:"Portfolio, GitHub & DS Interviews", preview:"Turn your projects into a job. Build a GitHub portfolio, write READMEs that sell, and prepare for DS interviews.", duration:"60 min", difficulty:"Intermediate", language:"Python", objectives:["Polish GitHub portfolio","Write project READMEs","Prepare for interviews"], tutorials:[{title:"GitHub — Portfolio Guide",url:"https://github.com/matiassingersani/awesome-readme",type:"Guide"},{title:"DataLemur — Interview Prep",url:"https://datalemur.com/",type:"Practice"}], code:"# README formula:\n# Problem -> Approach -> Results -> Demo -> Tech", task:"Publish your portfolio page. Link 3 projects with live demos." },
      { id:"u10t4", title:"Freelancing & Consulting with Data", preview:"Monetise your skills. Price projects, find clients on Upwork/Fiverr, and deliver like a consultant from day one.", duration:"45 min", difficulty:"Intermediate", language:"Python", objectives:["Price DS services","Find first clients","Deliver & retain clients"], tutorials:[{title:"Upwork — Data Science Jobs",url:"https://www.upwork.com/freelance-jobs/data-science/",type:"Platform"},{title:"Fiverr — Data Services",url:"https://www.fiverr.com/categories/programming-tech/data",type:"Platform"}], code:"# Pricing formula:\n# (Hours x Rate) + Data Complexity + Urgency\n# Always: 30% upfront, milestone payments", task:"Create your first Upwork/Fiverr gig. Share the link in class." },
    ]
  },
];

const MINI_PROJECTS = [
  { id:"mp1", title:"Grade Calculator", unit:"Unit 1 • Python", difficulty:"Beginner", desc:"Input 5 scores, get average + letter grade. Your first Python program.", skills:["Python","Loops","Functions"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"1 hr" },
  { id:"mp2", title:"Student Score Analyser", unit:"Unit 2 • Pandas", difficulty:"Beginner", desc:"Load a CSV, clean it, and report class averages per course.", skills:["Pandas","Cleaning","GroupBy"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"2 hrs" },
  { id:"mp3", title:"Sales Dashboard", unit:"Unit 3 • Visualisation", difficulty:"Beginner", desc:"Interactive Plotly dashboard of monthly sales with filters.", skills:["Plotly","Dashboards","Storytelling"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"3 hrs" },
  { id:"mp4", title:"Hypothesis Tester", unit:"Unit 4 • Statistics", difficulty:"Intermediate", desc:"T-test whether morning students really outperform afternoon ones.", skills:["SciPy","t-tests","p-values"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"2 hrs" },
  { id:"mp5", title:"House Price Predictor", unit:"Unit 5 • ML", difficulty:"Intermediate", desc:"Linear regression on housing data with full evaluation report.", skills:["Scikit-learn","Regression","Metrics"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"4 hrs" },
  { id:"mp6", title:"Pass/Fail Classifier", unit:"Unit 5 • ML", difficulty:"Intermediate", desc:"Random Forest classifier with confusion matrix and model card.", skills:["Random Forest","F1 Score","Model Card"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"4 hrs" },
  { id:"mp7", title:"Student Clustering", unit:"Unit 5 • Unsupervised", difficulty:"Advanced", desc:"K-Means clusters of study profiles with PCA visualisation.", skills:["K-Means","PCA","Clustering"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"3 hrs" },
  { id:"mp8", title:"Image Classifier (CNN)", unit:"Unit 6 • Deep Learning", difficulty:"Advanced", desc:"PyTorch CNN trained on CIFAR-10, deployed as a web demo.", skills:["PyTorch","CNN","Vercel"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"6 hrs" },
  { id:"mp9", title:"Sentiment Analyser", unit:"Unit 6–7 • NLP", difficulty:"Intermediate", desc:"Classify tweet sentiment with a Hugging Face transformer.", skills:["Transformers","NLP","Hugging Face"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"3 hrs" },
  { id:"mp10", title:"Spam SMS Classifier", unit:"Unit 7 • NLP", difficulty:"Intermediate", desc:"TF-IDF + Naive Bayes spam detector with F1 evaluation.", skills:["TF-IDF","Naive Bayes","NLP"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"3 hrs" },
  { id:"mp11", title:"SQL Business Queries", unit:"Unit 8 • SQL", difficulty:"Beginner", desc:"Answer 5 business questions with JOINs and window functions.", skills:["SQL","PostgreSQL","Joins"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"2 hrs" },
  { id:"mp12", title:"Weather API Dashboard", unit:"Unit 8–9 • APIs", difficulty:"Intermediate", desc:"Live Meru weather from Open-Meteo API, charted and deployed.", skills:["REST APIs","FastAPI","Vercel"], demo:"https://mokaya-pro-five.vercel.app", repo:"https://github.com/", time:"4 hrs" },
];

const RESOURCES = [
  { cat:"Books", title:"Python Crash Course — Eric Matthes", url:"https://ehmatthes.com/", note:"Best first Python book. Free chapters online." },
  { cat:"Books", title:"Hands-On ML with Scikit-Learn, Keras & TensorFlow — Géron", url:"https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125974/", note:"The ML bible. Chapters 1–8 map to Units 5–6." },
  { cat:"Books", title:"Storytelling with Data — Cole Nussbaumer Knaflic", url:"https://www.storytellingwithdata.com/", note:"Unit 3 essential. Learn to present data like a consultant." },
  { cat:"Docs", title:"Python Official Docs", url:"https://docs.python.org/3/tutorial/", note:"The source of truth for Python." },
  { cat:"Docs", title:"Pandas User Guide", url:"https://pandas.pydata.org/docs/user_guide/", note:"Bookmark this. You will live here in Unit 2." },
  { cat:"Docs", title:"Scikit-learn User Guide", url:"https://scikit-learn.org/stable/user_guide.html", note:"Every model in Unit 5, documented." },
  { cat:"Docs", title:"PyTorch Tutorials", url:"https://pytorch.org/tutorials/", note:"Unit 6 deep learning, step by step." },
  { cat:"Docs", title:"FastAPI Tutorial", url:"https://fastapi.tiangolo.com/tutorial/", note:"Unit 9 — serve your models." },
  { cat:"Docs", title:"Vercel Docs", url:"https://vercel.com/docs", note:"Deploy everything in this course." },
  { cat:"Docs", title:"Supabase Docs", url:"https://supabase.com/docs", note:"Free PostgreSQL for your data apps (Unit 8)." },
  { cat:"Practice", title:"Kaggle Learn — Free Micro-courses", url:"https://www.kaggle.com/learn", note:"Python, Pandas, ML, DL — all free, all hands-on." },
  { cat:"Practice", title:"HackerRank — Python & SQL", url:"https://www.hackerrank.com/", note:"Interview prep. 1 problem a day." },
  { cat:"Practice", title:"DataLemur — SQL & Stats Practice", url:"https://datalemur.com/", note:"Best free SQL interview practice." },
  { cat:"Practice", title:"LeetCode — Python", url:"https://leetcode.com/problemset/?topicSlugs=array", note:"Algorithms for DS interviews." },
  { cat:"Datasets", title:"Kaggle Datasets", url:"https://www.kaggle.com/datasets", note:"10M+ free datasets for every project." },
  { cat:"Datasets", title:"UCI Machine Learning Repository", url:"https://archive.ics.uci.edu/", note:"Classic academic datasets." },
  { cat:"Datasets", title:"Kenya Open Data Portal", url:"https://opendata.go.ke/", note:"Real Kenyan data — perfect for local projects." },
  { cat:"Datasets", title:"Open-Meteo — Free Weather API", url:"https://open-meteo.com/", note:"No API key. Great for Unit 8 API project." },
  { cat:"Video", title:"StatQuest with Josh Starmer", url:"https://www.youtube.com/@statquest", note:"Statistics & ML explained brilliantly." },
  { cat:"Video", title:"3Blue1Brown — Neural Networks", url:"https://www.youtube.com/watch?v=aircAruvnKk", note:"Unit 6 visual intuition." },
  { cat:"Video", title:"freeCodeCamp — Data Science Full Course", url:"https://www.youtube.com/watch?v=Lhro-dovrEg", note:"10-hour free DS course. Watch alongside Units 1–5." },
  { cat:"Tools", title:"Google Colab — Free GPU Notebooks", url:"https://colab.research.google.com/", note:"Run Python + PyTorch in your browser, free." },
  { cat:"Tools", title:"Jupyter — Interactive Notebooks", url:"https://jupyter.org/", note:"The DS professional's notebook." },
  { cat:"Tools", title:"GitHub — Code & Portfolio Hosting", url:"https://github.com/", note:"Your portfolio lives here. Start now." },
];

const QUIZ = [
  { q:"What is the correct order of the Data Science workflow?", opts:["Model → Clean → Ask → Communicate","Ask → Get Data → Clean → Explore → Model → Communicate","Clean → Ask → Model → Explore","Explore → Ask → Communicate → Model"], ans:1, exp:"The 6-step workflow: Ask, Get Data, Clean, Explore, Model, Communicate." },
  { q:"Which Python library is best for tabular data wrangling?", opts:["NumPy","Matplotlib","Pandas","Requests"], ans:2, exp:"Pandas DataFrames are the standard for tabular data." },
  { q:"In Pandas, which method groups rows and aggregates values?", opts:["df.sort()","df.groupby()","df.merge()","df.head()"], ans:1, exp:"groupby() splits data into groups, then agg() summarises each." },
  { q:"A p-value of 0.03 means…", opts:["There is a 3% chance the null is true","If the null were true, you'd see this data 3% of the time","The effect is 3% large","The model is 97% accurate"], ans:1, exp:"p-value = P(data | null true). It is NOT P(null true | data)." },
  { q:"Correlation between study hours and score is 0.85. This means…", opts:["Hours cause scores","Hours and scores move together strongly","Hours have no effect","The relationship is weak"], ans:1, exp:"Strong positive correlation — but correlation alone never proves causation." },
  { q:"Why split data into train and test sets?", opts:["To make training faster","To evaluate on unseen data honestly","To reduce file size","It is optional"], ans:1, exp:"Testing on unseen data reveals overfitting and true generalisation." },
  { q:"Which model predicts a probability of pass/fail?", opts:["Linear Regression","Logistic Regression","K-Means","PCA"], ans:1, exp:"Logistic regression outputs probabilities for binary classification." },
  { q:"K-Means is an example of…", opts:["Supervised learning","Unsupervised learning","Reinforcement learning","Deep learning"], ans:1, exp:"K-Means finds clusters without labels — unsupervised." },
  { q:"What does a confusion matrix show?", opts:["Feature importance","True vs predicted class counts","Loss over epochs","Data distributions"], ans:1, exp:"It cross-tabulates actual vs predicted classes — the basis for precision/recall/F1." },
  { q:"In a CNN, what does a convolution layer do?", opts:["Flattens images","Detects local patterns like edges","Connects to the internet","Reduces labels"], ans:1, exp:"Convolution filters slide over the image detecting edges, textures, shapes." },
  { q:"What is TF-IDF used for?", opts:["Image classification","Vectorising text for ML","Database queries","Deploying models"], ans:1, exp:"TF-IDF converts text into numeric features capturing word importance." },
  { q:"Which SQL clause combines rows from two tables?", opts:["GROUP BY","ORDER BY","JOIN","HAVING"], ans:2, exp:"JOIN combines tables based on related columns." },
  { q:"What does FastAPI do?", opts:["Trains neural networks","Serves ML models as REST APIs","Visualises data","Cleans CSVs"], ans:1, exp:"FastAPI turns Python functions/models into fast web APIs." },
  { q:"What is the main benefit of Docker?", opts:["Faster code","Identical environments everywhere","Better charts","Free hosting"], ans:1, exp:"Docker containers run identically on any machine — no 'works on my machine'." },
  { q:"What does Vercel do for this course app?", opts:["Trains models","Hosts & deploys web apps from Git","Stores databases","Writes code"], ans:1, exp:"Vercel deploys this app automatically from GitHub in ~60 seconds." },
  { q:"Which metric balances precision and recall?", opts:["Accuracy","F1 Score","R²","AUC only"], ans:1, exp:"F1 = harmonic mean of precision and recall." },
  { q:"What is data leakage?", opts:["Data stored insecurely","Test data influencing training","Too much data","Missing values"], ans:1, exp:"Leakage = information from test/future leaking into training — inflates scores falsely." },
  { q:"Which tool gives free GPU notebooks in the browser?", opts:["Excel","Google Colab","Photoshop","VS Code only"], ans:1, exp:"Colab runs Python + PyTorch with free GPUs — perfect for Unit 6." },
  { q:"What is an embedding?", opts:["A type of chart","A numeric vector capturing meaning","A database","A Python package"], ans:1, exp:"Embeddings turn words/data into vectors where similar things are close." },
  { q:"What makes a great capstone project?", opts:["Complex code only","Real problem + clean data + honest evaluation + deployed demo","No documentation","Secret data"], ans:1, exp:"Real problem, honest metrics, and a live demo — that is what employers want." },
];

const SAMPLE_STUDENTS = (() => {
  // Deterministic pseudo-random sample (seeded) — 120 students
  const courses = ["Data Science","Computer Science","Statistics","Mathematics"];
  const names = ["Achieng","Brian","Cynthia","David","Esther","Felix","Grace","Hassan","Ivy","James","Kamau","Lucy","Moses","Nancy","Otieno","Pauline","Quinn","Ruth","Samuel","Teresa","Victor","Wanjiru","Yusuf","Zainab"];
  let seed = 42;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const rows = [];
  for (let i = 0; i < 120; i++) {
    const hours = Math.round(rnd() * 14 * 10) / 10;
    const attendance = Math.round((55 + rnd() * 45) * 10) / 10;
    const prev = Math.round((40 + rnd() * 50) * 10) / 10;
    let score = 18 + hours * 3.4 + attendance * 0.28 + prev * 0.22 + (rnd() - 0.5) * 14;
    score = Math.max(22, Math.min(99, Math.round(score * 10) / 10));
    rows.push({
      id: i + 1,
      name: names[i % names.length] + " " + String.fromCharCode(65 + (i % 26)) + ".",
      course: courses[i % courses.length],
      hours, attendance, prev, score,
      grade: score >= 80 ? "A" : score >= 65 ? "B" : score >= 50 ? "C" : "F",
      pass: score >= 50 ? 1 : 0,
    });
  }
  return rows;
})();

const PLAYGROUND_SAMPLES = {
  python: `# Welcome to the Mokaya Pro Playground 🐍
# This runs REAL Python in your browser (Pyodide).
# Try editing the code and press RUN!

import statistics

scores = [78, 92, 65, 88, 74, 91, 59, 83, 95, 67]
print("Students:", len(scores))
print("Mean score:", round(statistics.mean(scores), 1))
print("Median:", statistics.median(scores))
print("Top score:", max(scores))
print("Pass rate:", sum(1 for s in scores if s >= 50) / len(scores) * 100, "%")

# Your turn: add a student and recompute!
`,
  javascript: `// JavaScript Playground ⚡
// This runs real JavaScript in your browser.

const students = [
  { name: "Achieng", score: 92 },
  { name: "Brian", score: 74 },
  { name: "Cynthia", score: 88 },
  { name: "David", score: 59 },
];

const avg = students.reduce((a, s) => a + s.score, 0) / students.length;
console.log("Class average:", avg.toFixed(1));

students
  .filter(s => s.score >= 80)
  .forEach(s => console.log("⭐ Distinction:", s.name, s.score));

// Your turn: sort students by score!
`,
  sql: `-- SQL Playground 🗄️
-- This simulates a students table. Try your own queries!

-- 1. All students ordered by score
SELECT name, course, score FROM students ORDER BY score DESC;

-- 2. Average score per course
SELECT course, AVG(score) AS avg_score
FROM students GROUP BY course;

-- 3. Top 5 students
SELECT name, score FROM students ORDER BY score DESC LIMIT 5;

-- 4. Pass rate
SELECT COUNT(*) * 100.0 / (SELECT COUNT(*) FROM students)
AS pass_rate_pct FROM students WHERE score >= 50;
`,
  r: `# R Playground 📈 (simulated — R runs in the RStudio Cloud link below)
# In real R, this would be:
#
# scores <- c(78, 92, 65, 88, 74, 91, 59, 83, 95, 67)
# mean(scores)        # 78.2
# median(scores)      # 81.0
# sd(scores)          # 11.4
# hist(scores)        # histogram
#
# R is still used in academia & government.
# Python covers 90% of this course — R is a bonus language.
# Try it free: https://posit.cloud/

print("R is covered as a bonus language in this course.")
print("Python is the primary language (Units 1-10).")
print("Open Posit Cloud to run real R code!")
`,
};
