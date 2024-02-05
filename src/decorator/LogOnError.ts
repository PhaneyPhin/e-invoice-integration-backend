export function LogOnError(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        try {
            return await originalMethod.call(...[this, ...args]);
        } catch (e) {
            console.log('Error on ', target, key, e);
        }
    };

    return descriptor;
}
