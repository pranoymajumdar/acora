import { useCollectionProducts } from "./useCollectionProducts";


function CollectionsPage() {
  const { data, loading, actions, error } = useCollectionProducts();
  return (
    <main>
      <code>
        <pre>{JSON.stringify(data.products, null, 4)}</pre>
      </code>
    </main>
  );
}

export default CollectionsPage;