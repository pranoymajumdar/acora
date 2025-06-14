import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useTRPC } from "~/lib/trpc";

export const useCollectionProducts = () => {
    const trpc = useTRPC();
    const [searchParams, setSearchParams] = useSearchParams();
    const shopSlug = searchParams.get("shopSlug");
    const collectionSlug = searchParams.get("collectionSlug");

    const {
        data: shopData,
        isLoading: isShopLoading,
        error: shopError
    } = useQuery({
        ...trpc.shop.bySlug.queryOptions({
            shopSlug: shopSlug!
        }),
        enabled: !!shopSlug,
        staleTime: 5 * 60 * 1000,
    })

    const effectiveCollectionSlug = collectionSlug || shopData?.collection?.[0]?.slug;

    const {
        data: collectionProductsData,
        isLoading: isCollectionProductsLoading,
        error: collectionProductsError
    } = useQuery({
        ...trpc.collection.products.queryOptions({
            collectionSlug: effectiveCollectionSlug!
        }),
        enabled: !!effectiveCollectionSlug,
        staleTime: 2 * 60 * 1000, // 2 minutes
    })

    const updateSearchParams = (updates: {
        shopSlug?: string;
        collectionSlug?: string;
    }) => {
        const newParams = new URLSearchParams(searchParams);

        if (updates.shopSlug !== undefined) {
            updates.shopSlug
                ? newParams.set("shopSlug", updates.shopSlug)
                : newParams.delete("shopSlug");
        }

        if (updates.collectionSlug !== undefined) {
            updates.collectionSlug
                ? newParams.set("collectionSlug", updates.collectionSlug)
                : newParams.delete("collectionSlug");
        }

        setSearchParams(newParams);
    };


    const setCollectionSlug = (slug: string) => {
        updateSearchParams({ collectionSlug: slug });
    };

    const setShopSlug = (slug: string) => {
        updateSearchParams({ shopSlug: slug, collectionSlug: undefined }); // Clear collection when changing shop
    };

    return {
        data: {
            shop: shopData,
            products: collectionProductsData,
        },
        loading: {
            shop: isShopLoading,
            products: isCollectionProductsLoading,
        },
        error: {
            shop: shopError,
            products: collectionProductsError,
        },
        actions: {
            updateSearchParams,
            setCollectionSlug,
            setShopSlug,
        },
    };

}