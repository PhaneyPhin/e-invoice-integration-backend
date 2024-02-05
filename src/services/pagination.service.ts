import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class PaginationService<Entity extends ObjectLiteral> {
    public async getPagination(page: number, pageSize: number, query: SelectQueryBuilder<Entity>) {
        const [data, total] = await query
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount()
        
        const totalPages = Math.ceil(total / pageSize);

        return {
            data: data,
            pagination: {
                page: page,
                size: pageSize,
                total_counts: total,
                total_pages: totalPages
            }
        }
    }
}