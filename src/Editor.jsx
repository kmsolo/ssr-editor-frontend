import { useState } from "react";

export default function Editor({ doc, onSave, onDelete, onCancel }) {
    const [title, setTitle] = useState(doc?.title ?? "");
    const [content, setContent] = useState(doc?.content ?? "");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) {
            setError("Titel måste fyllas i.");
            return;
        }
        try {
            await onSave({ title, content });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <section>
            <h1>{doc ? "Redigera dokument" : "Nytt dokument"}</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titel</label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="content">Innehåll</label>
                <textarea id="content" rows={18} value={content}
                          onChange={(e) => setContent(e.target.value)} />

                <button type="submit">Spara</button>
                <button type="button" onClick={onCancel}>Avbryt</button>
            </form>
            {doc && (
                <button className="danger" onClick={() => {
                    if (confirm("Ta bort dokumentet?")) onDelete();
                }}>
                    Ta bort
                </button>
            )}
        </section>
    );
}
