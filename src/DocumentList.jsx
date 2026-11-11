export default function DocumentList({ docs, onOpen, onNew }) {
    return (
        <section>
            <h1>Dokument</h1>
            <button onClick={onNew}>Nytt dokument</button>
            {docs.length === 0 ? (
                <p>Inga dokument ännu.</p>
            ) : (
                <ul className="doclist">
                    {docs.map((doc) => (
                        <li key={doc.id}>
                            <button className="link" onClick={() => onOpen(doc.id)}>
                                {doc.title}
                            </button>
                            <small>Uppdaterad {new Date(doc.updatedAt).toLocaleString("sv-SE")}</small>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
