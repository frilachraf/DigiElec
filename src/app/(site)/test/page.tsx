import { apiClient } from "@/lib/api-client"

export default async function TestPage() {
    const { data, success, error } = await apiClient.get('/products')

    return (
        <>
        <div className="pt-40 bg-muted">
            {JSON.stringify(data)}
        </div>
        </>
    )
}