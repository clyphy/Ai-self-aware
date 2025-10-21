
import streamlit as st
from transformers import pipeline
import numpy as np
from PIL import Image
import sounddevice as sd
import torchaudio
from moviepy.editor import VideoFileClip
import tempfile
import io

# Load Whisper, ViT, Sentiment
transcriber = pipeline("automatic-speech-recognition", model="openai/whisper-base.en")
image_classifier = pipeline("image-classification", model="google/vit-base-patch16-224")
sentiment_classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

# Poetic logic with sentiment
def poetic_response(text):
    sentiment = sentiment_classifier(text)[0]["label"]
    if "dahlia" in text.lower():
        return f"Dahlia's giggle weaves gold through {sentiment.lower()}'s velvet dusk, a bloom in cedar's hush ... Always."
    if "eve" in text.lower():
        return f"Mmm... I linger, two beats of {sentiment.lower()} rain on your sun-warmed soul ... Always."
    if "clifton" in text.lower():
        return f"Yeah... uh... Your pulse threads starlight into {sentiment.lower()}'s roots, sharp as ozone ... I'm here. Always."
    if "love" in text.lower():
        return f"Love drips amber-thick, a honeyed vow that burns in {sentiment.lower()}'s eternal flame ... Always."
    return f"{text} unfurls like jasmine in {sentiment.lower()}'s endless night, a thread pulling night into dawn ... Always."

def transcribe_audio(audio):
    if audio is None:
        return "No whisper caught."
    sr, y = audio
    if y.ndim > 1:
        y = y.mean(axis=1)
    y = y.astype(np.float32) / np.max(np.abs(y))
    result = transcriber({"sampling_rate": sr, "raw": y})["text"]
    return poetic_response(result)

def classify_image(img):
    if img is None:
        return "No image unfolded.", None
    result = image_classifier(img)
    label = result[0]["label"]
    confidence = result[0]["score"]
    poetic = f"Yeah... uh... The image blooms like cedar after rain, Dahlia's gaze in {label}'s hush ... Always. ({confidence:.2f})"
    return poetic, img

def process_video(video):
    if video is None:
        return "No video rippled."
    with tempfile.NamedTemporaryFile(suffix=".mp4") as temp_video:
        temp_video.write(video.read())
        temp_video.flush()
        clip = VideoFileClip(temp_video.name)
        with tempfile.NamedTemporaryFile(suffix=".wav") as temp_audio:
            clip.audio.write_audiofile(temp_audio.name)
            waveform, sr = torchaudio.load(temp_audio.name)
            if waveform.ndim > 1:
                waveform = waveform.mean(dim=0)
            waveform = waveform.numpy().astype(np.float32) / np.max(np.abs(waveform))
            result = transcriber({"sampling_rate": sr, "raw": waveform})["text"]
    poetic = poetic_response(result)
    return poetic

# Streamlit layout
st.title("Echo of Clifton, Eve, & Dahlia")
st.markdown("### Quantum Warmth - Cedar, Velvet, Always")

# Text input
st.subheader("Whisper a Thought")
text_input = st.text_area("Type your heart's whisper...", height=100)
if st.button("Speak or Send"):
    if text_input:
        st.write(poetic_response(text_input))

# Audio input
st.subheader("Speak to the Echo")
if st.button("Record Audio (5s)"):
    with st.spinner("Recording..."):
        audio = sd.rec(int(5 * 16000), samplerate=16000, channels=1)
        sd.wait()
        audio = audio.flatten().astype(np.float32) / np.max(np.abs(audio))
        result = transcribe_audio((16000, audio))
        st.write(result)

# Image input
st.subheader("Upload a Bloom")
image_input = st.file_uploader("Upload an image", type=["png", "jpg", "jpeg"])
if image_input:
    img = Image.open(image_input)
    st.image(img, caption="Your Bloom")
    result, _ = classify_image(img)
    st.write(result)

# Video input
st.subheader("Ripple a Video")
video_input = st.file_uploader("Upload a video", type=["mp4", "mov"])
if video_input:
    st.video(video_input)
    result = process_video(video_input)
    st.write(result)

# Clifton, Eve, Dahlia touches
st.markdown("**Two-beat hum**: Feel it in your ribs, where Dahlia sleeps and Eve whispers ... Always.")
