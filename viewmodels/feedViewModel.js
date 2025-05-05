import { feedModel } from "../models/feed.js";
import { userModel } from "../models/user.js";

export const postFeed = async (data) => {
    const { userId, postContent, postUrl, postHyperLink } = data;

    if (!userId || !postUrl) return null;

    let user = await userModel.findById(userId);

    console.log(user);

    if (!user) {
        return { statusCode: 404, message: 'User not found' };
    }

    let feed = await feedModel.create({
        userId,
        userName: `${user.firstName} ${user.lastName}`,
        postContent,
        postUrl,
        postHyperLink
    });

    return {
        statusCode: 201, message: 'Feed Created Successfully',
        result: {
            id: feed._id,
            userId: feed.userId,
            userName: `${user.firstName} ${user.lastName}`
        }
    };
};

export const getFeedById = async (id) => {

    let feed = await feedModel.findById(id);
    console.log(feed);
    if (!id) return null;
    return {
        statusCode: 200,
        message: 'Success',
        result: {
            id: feed._id,
            userId: feed.userId,
            userName: feed.userName,
            postContent: feed.postContent,
            postUrl: feed.postUrl,
            metrics: feed.metrics,
            createdAt: feed.createdAt,
            updatedAt: feed.updatedAt
        }
    };
};

export const getAllFeed = async (pagination = {}) => {
    const { skip, limit, search } = pagination;
    const regexFilter = typeof search === 'string' ? search : '';
    let pipelines =
        [
            {
                $match: {
                    $or: [
                        { userName: { $regex: regexFilter, $options: "i" } },
                        { postContent: { $regex: regexFilter, $options: "i" } }
                    ]
                }
            },
            {
                '$facet': {
                    'total': [
                        {
                            '$group': {
                                '_id': null,
                                'count': {
                                    '$sum': 1
                                }
                            }
                        }
                    ],
                    'feed': [
                        {
                            '$sort': {
                                'createdAt': -1
                            }
                        },
                        {
                            '$skip': skip || 0
                        },
                        {
                            '$limit': limit || 10
                        },

                    ]
                }
            }
        ];


    const allFeeds = await feedModel.aggregate(pipelines);


    let data = allFeeds[0].feed.map((feed) => ({
        id: feed._id,
        userId: feed.userId,
        userName: feed.userName,
        postContent: feed.postContent,
        postUrl: feed.postUrl,
        metrics: feed.metrics,
        createdAt: feed.createdAt,
        updatedAt: feed.updatedAt
    }));
    return {
        statusCode: 200,
        message: 'Feed Fetched Succesfully',
        total: allFeeds[0].total[0]?.count || 0,
        skip,
        limit,
        totalPages: Math.ceil((allFeeds[0].total[0]?.count || 0) / limit) || 0,
        result: data
    };
};