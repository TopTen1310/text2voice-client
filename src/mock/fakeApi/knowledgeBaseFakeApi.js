export default function knowledgeBaseFakeApi(server, apiPrefix) {
    const categories = [
        { label: 'Survey', value: 'survey' },
        { label: 'Themes', value: 'themes' },
        { label: 'Security', value: 'security' },
        { label: 'Integration', value: 'integration' },
        { label: 'Media', value: 'media' },
        { label: 'Analytic', value: 'analytic' },
        { label: 'Chatbot', value: 'chatbot' },
        { label: 'Commission', value: 'commission' },
    ]

    server.get(
        `${apiPrefix}/knowledge-base/categories`,
        (schema) => schema.db.helpCenterCategoriesData
    )

    server.post(
        `${apiPrefix}/knowledge-base/articles-query`,
        (schema, { requestBody }) => {
            const { category } = JSON.parse(requestBody)
            let data = schema.db.helpCenterArticleListData
            if (category) {
                data = schema.db.helpCenterArticleListData.where({ category })
            }
            return data
        }
    )

    server.get(
        `${apiPrefix}/knowledge-base/article`,
        (schema, { queryParams }) => {
            const { id } = queryParams

            const article = schema.db.helpCenterArticleListData.find(id)

            return article
        }
    )

    server.get(
        `${apiPrefix}/knowledge-base/others-article`,
        (schema, { queryParams }) => {
            const { id } = queryParams

            const article = schema.db.helpCenterArticleListData.find(id)
            let articles = schema.db.helpCenterArticleListData
            const category = article.category
            const sameCategoryArticle =
                schema.db.helpCenterArticleListData.where({ category })
            const relatedArticle = sameCategoryArticle.filter(
                (article) => article.id !== id
            )
            articles = articles.filter((article) => article.id !== id)
            const popularArticle = [
                articles[0],
                articles[4],
                articles[7],
                articles[11],
            ]
            return {
                relatedArticle,
                popularArticle,
            }
        }
    )

    server.get(`${apiPrefix}/knowledge-base/categorized-articles`, (schema) => {
        let articles = schema.db.helpCenterArticleListData
        const categorizedArticles = categories.map((category) => {
            const articleByCategory = articles.filter(
                (article) => article.category === category.value
            )
            category.articles = articleByCategory
            return category
        })

        return categorizedArticles
    })

    server.post(
        `${apiPrefix}/knowledge-base/article`,
        (schema, { requestBody }) => {
            const { id, category, categoryLabel, ...rest } =
                JSON.parse(requestBody)
            let articles = schema.db.helpCenterArticleListData
            const articleExist = articles.some((article) => article.id === id)

            if (!categories.some((cat) => cat.value === category)) {
                categories.unshift({
                    label: categoryLabel,
                    value: category,
                })
            }

            if (articleExist) {
                schema.db.helpCenterArticleListData.update({ id }, rest)
            } else {
                schema.db.helpCenterArticleListData.insert({
                    id,
                    category,
                    authors: [
                        {
                            name: 'Carolyn Perkins',
                            img: '/img/avatars/thumb-1.jpg',
                        },
                    ],
                    starred: true,
                    updateTime: '6 months ago',
                    createdBy: 'Carolyn Perkins',
                    timeToRead: 2,
                    viewCount: 0,
                    ...rest,
                })
            }

            return true
        }
    )
}
