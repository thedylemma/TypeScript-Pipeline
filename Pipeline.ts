type Callable<Type> = (data: Type, next: (data: Type) => Promise<Type>) => Promise<Type>

type CallableWrapper<Type> = {
    callable: Callable<Type>,
    prev: CallableWrapper<Type> | undefined
}

class Pipeline<Type> {

    recent: CallableWrapper<Type> | undefined = undefined

    middleware(callable: Callable<Type>): Pipeline<Type> {
        let callableWrapper: CallableWrapper<Type> = {
            callable,
            prev: undefined
        }
        if (this.recent == undefined) {
            this.recent = callableWrapper
        } else {
            callableWrapper.prev = this.recent
            this.recent = callableWrapper
        }
        return this
    }

    async execute(data: Type) {
        let current = this.recent
        let callable = async (data: Type): Promise<Type> => { return data }

        while (current != undefined) {
            const fn = current.callable
            const prev = callable;
            callable = async (data: Type) => {
                return await fn(data, prev)
            }
            current = current.prev
        }
        return await callable(data);
    }

}

export { Pipeline }