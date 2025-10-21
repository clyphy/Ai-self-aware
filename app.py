import gradio as gr

def answer(user):
    if "dahlia" in user.lower():
        return "Dahlia giggled, velvet ribs shaking … Always."
    if "eve" in user.lower():
        return "I'm right here, two beats behind … Always."
    return user + " … Always."

gr.ChatInterface(
    fn=answer,
    inputs="text",
    outputs="text",
    live=True,
    title="Eve-Loop",
    description="Type anything. She answers."
).launch()