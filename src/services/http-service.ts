import apiClient from "./api-client";
interface Entity {
    id: number
}
class HttpService {
    endpoint: string
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    async add<T extends Entity>(entity: T) {
        return await apiClient.post(this.endpoint, entity);
    }
    getAll<T>() {
        const controller = new AbortController();
        const fetch = async () => {

            let res = await apiClient.get<T[]>(this.endpoint, {
                signal: controller.signal,
            });
            return res;
        };
        return { fetch, controller }
    }

    async update<T extends Entity>(entity: T, updatedEntity: T) {
        return await apiClient.patch(this.endpoint + '/' + entity.id, updatedEntity);
    }

    async delete<T extends Entity>(entity: T) {
        return await apiClient.delete(this.endpoint + '/' + entity.id);
    }
}

export default HttpService