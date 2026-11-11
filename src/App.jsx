import { useEffect, useState } from "react";
import DocumentList from "./DocumentList.jsx";
import Editor from "./Editor.jsx";
import * as api from "./api.js";
import "./App.css";

export default function App() {
    const [docs, setDocs] = useState([]);
    const [view, setView] = useState({ name: "list" }); // list | new | edit
    const [error, setError] = useState(null);

    async function loadDocs() {
        try {
            setDocs(await api.getDocuments());
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadDocs();
    }, []);

    async function openDoc(id) {
        try {
            setView({ name: "edit", doc: await api.getDocument(id) });
        } catch (err) {
            setError(err.message);
        }
    }

    async function save(data) {
        if (view.name === "edit") await api.updateDocument(view.doc.id, data);
        else await api.createDocument(data);
        await loadDocs();
        setView({ name: "list" });
    }

    async function remove() {
        await api.deleteDocument(view.doc.id);
        await loadDocs();
        setView({ name: "list" });
    }

    return (
        <main>
            {error && <p className="error">{error}</p>}
            {view.name === "list" && (
                <DocumentList docs={docs} onOpen={openDoc} onNew={() => setView({ name: "new" })} />
            )}
            {view.name === "new" && (
                <Editor onSave={save} onCancel={() => setView({ name: "list" })} />
            )}
            {view.name === "edit" && (
                <Editor key={view.doc.id} doc={view.doc} onSave={save} onDelete={remove}
                        onCancel={() => setView({ name: "list" })} />
            )}
        </main>
    );
}
