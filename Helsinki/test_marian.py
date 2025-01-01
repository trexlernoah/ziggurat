from transformers import MarianMTModel, MarianTokenizer
import random

# Load fine-tuned model
MODEL_DIR = "./fine_tuned_marian"
tokenizer = MarianTokenizer.from_pretrained(MODEL_DIR)
model = MarianMTModel.from_pretrained(MODEL_DIR)

# Generate vocabulary set
def generate_vocab(prompt, word_count=20):
    themes = {
        "food": ["apple", "bread", "cook", "delicious", "tasty"],
        "nature": ["tree", "walk", "run", "beautiful", "green"],
        "general": ["apple", "run", "beautiful", "cook", "fast"],
    }
    
    words = themes.get(prompt.lower(), themes["general"])
    additional_words = random.choices(themes["general"], k=word_count - len(words))
    selected_words = (words + additional_words)[:word_count]

    translations = []
    for word in selected_words:
        inputs = tokenizer(word, return_tensors="pt", truncation=True, padding=True)
        outputs = model.generate(**inputs)
        translated = tokenizer.decode(outputs[0], skip_special_tokens=True)
        translations.append({"english": word, "spanish": translated, "type": "noun"})

    return {
        "theme": prompt,
        "word_count": word_count,
        "vocab_set": translations,
    }

if __name__ == "__main__":
    PROMPT = "food"
    WORD_COUNT = 10
    vocab_set = generate_vocab(PROMPT, WORD_COUNT)
    print(vocab_set)
