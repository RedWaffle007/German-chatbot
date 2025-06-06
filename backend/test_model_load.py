from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "microsoft/phi-3-mini-4k-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)
print("Model and tokenizer loaded successfully!")
