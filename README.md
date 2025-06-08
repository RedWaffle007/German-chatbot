# German Chatbot

## Project Motivation

As a language enthusiast, I began learning **German** in 2021. I found that chatting regularly in German would accelerate vocabulary building and contextual understanding. Due to resource constraints, I couldn’t host a heavier model like **Mistral**, but the **Phi-3 Mini** model proved efficient enough to simulate basic German conversation. Even without deep context, it helped reinforce my learning through vocabulary exposure and text interaction.

## Overview

A Dockerized conversational AI chatbot with a BMW-themed frontend, built using **Python**, **Flask**, and **Hugging Face Transformers**. This project showcases full-stack integration, continuous integration workflows, and deployment experimentation across cloud platforms.

## Features

* **Conversational AI:**
  Utilizes [`microsoft/phi-3-mini-4k-instruct`](https://huggingface.co/microsoft/phi-3-mini-4k-instruct), chosen for its compact size and strong instruction-following capabilities—outperforming alternatives like `gpt-2` in robustness.

* **Custom Frontend:**
  BMW-themed UI for German car enthusiasts.

* **Containerized Deployment:**
  Fully Dockerized for reproducibility and platform independence.

* **CI Automation:**
  GitHub Actions integrated for automated testing and build workflows.

* **Dependency Management:**
  Python packages tracked with `pipreqs` for a minimal, clean `requirements.txt`.

## Cloud Deployment Trials

* **AWS:**
  Set up a full CI/CD pipeline with CodePipeline. Source and build stages passed, but testing failed due to billing constraints.

* **Render:**
  Deployment worked until a 512 MB memory cap blocked the model (required ≥2 GB).

## Limitations

* Free-tier cloud services couldn’t support the memory needs of the deployed transformer model.
* Highlights practical trade-offs and real-world limitations when deploying LLMs on budget platforms.

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/german-chatbot.git
cd german-chatbot

# 2. Build Docker image
docker build -t german-chatbot .

# 3. Run the container
docker run -p 5000:5000 german-chatbot
```

Visit the app at: `http://localhost:5000`

## Acknowledgments

* Microsoft Phi-3 Mini 4K Instruct (via Hugging Face)
* Hugging Face Transformers
* GitHub Actions
* Render and AWS (deployment testing)

---

### Note:

This project requires at least **2 GB of RAM** for inference and will not run on free-tier cloud platforms without optimization.
