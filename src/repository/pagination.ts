export default {
    async paginate<T>(page: number = 1, itemsPerPage: number = 10) {
    const skip = (page - 1) * itemsPerPage;
    const [data, total] = await (this as any).createQueryBuilder()
      .orderBy('updated_at', 'DESC')
      .skip(skip)
      .take(itemsPerPage)
      .getManyAndCount();
    
    const totalPages = Math.ceil(total / itemsPerPage);

    return {
        data: data as T[],
        pagination: {
            page: page,
            size: itemsPerPage,
            total_counts: total,
            total_pages: totalPages
        }
    }
  }
}