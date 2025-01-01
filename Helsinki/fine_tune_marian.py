import pandas as pd
from transformers import MarianMTModel, MarianTokenizer, Trainer, TrainingArguments
from sklearn.model_selection import train_test_split
import torch
import os

# Function to preprocess CSV data
def preprocess_data(csv_path):
    data = pd.read_csv(csv_path)
    train_texts, val_texts, train_labels, val_labels = train_test_split(
        data["English"].tolist(), data["Spanish"].tolist(), test_size=0.2, random_state=42
    )
    return train_texts, val_texts, train_labels, val_labels

# Dataset class for tokenized data
class TranslationDataset(torch.utils.data.Dataset):
    def __init__(self, tokenizer, input_texts, target_texts, max_length=128):
        self.tokenizer = tokenizer
        self.input_texts = input_texts
        self.target_texts = target_texts
        self.max_length = max_length

    def __len__(self):
        return len(self.input_texts)

    def __getitem__(self, idx):
        inputs = self.tokenizer(
            self.input_texts[idx],
            max_length=self.max_length,
            padding="max_length",
            truncation=True,
            return_tensors="pt",
        )
        targets = self.tokenizer(
            self.target_texts[idx],
            max_length=self.max_length,
            padding="max_length",
            truncation=True,
            return_tensors="pt",
        )
        inputs = {k: v.squeeze() for k, v in inputs.items()}
        targets = {k: v.squeeze() for k, v in targets.items()}
        inputs["labels"] = targets["input_ids"]
        return inputs

# Main fine-tuning function
def fine_tune_model(csv_path, model_name, output_dir):
    train_texts, val_texts, train_labels, val_labels = preprocess_data(csv_path)
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)

    train_dataset = TranslationDataset(tokenizer, train_texts, train_labels)
    val_dataset = TranslationDataset(tokenizer, val_texts, val_labels)

    training_args = TrainingArguments(
        output_dir=output_dir,
        evaluation_strategy="epoch",
        save_strategy="epoch",
        learning_rate=5e-5,
        per_device_train_batch_size=16,
        num_train_epochs=3,
        save_total_limit=2,
        logging_dir="./logs",
        logging_steps=10,
        remove_unused_columns=False,
        load_best_model_at_end=True,
        fp16=torch.cuda.is_available(),  # Use FP16 if GPU is available
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        tokenizer=tokenizer,
    )

    trainer.train()
    model.save_pretrained(output_dir)
    tokenizer.save_pretrained(output_dir)
    print(f"Model fine-tuned and saved to {output_dir}")

if __name__ == "__main__":
    CSV_PATH = "english_to_spanish.csv"
    MODEL_NAME = "Helsinki-NLP/opus-mt-en-es"
    OUTPUT_DIR = "./fine_tuned_marian"

    fine_tune_model(CSV_PATH, MODEL_NAME, OUTPUT_DIR)
