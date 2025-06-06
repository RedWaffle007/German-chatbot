from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load Phi-3 Mini model and tokenizer
model_id = "microsoft/phi-3-mini-4k-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)
chatbot = pipeline("text-generation", model=model, tokenizer=tokenizer)

@app.route('/chat', methods=['POST', 'OPTIONS'])  # <-- match frontend
def chat():
    if request.method == 'OPTIONS':
        # CORS preflight
        return jsonify({'status': 'ok'}), 200

    user_input = request.json['text']
    prompt = f"<|user|>\n{user_input}\n<|assistant|>\n"
    result = chatbot(prompt, max_length=50, do_sample=True, temperature=0.7)[0]['generated_text']
    # Extract only the assistant's reply
    response = result.split("<|assistant|>")[-1].strip()
    return jsonify({'text': response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
