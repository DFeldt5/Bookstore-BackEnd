import express, { Request, Response, Router, NextFunction } from 'express';
import { checkToken } from '../../core/middleware';

const addBooksRouter: Router = express.Router();

import {
    pool,
    validationFunctions,
    credentialingFunctions,
} from '../../core/utilities';

const format = (resultRow) => ({
    ...resultRow,
    formatted: `{${resultRow.id}} - [${resultRow.title}] says: ${resultRow.authors}`,
});

const isStringProvided = validationFunctions.isStringProvided;
const isNumberProvided = validationFunctions.isNumberProvided;

// Book ID validation
// No arguments yet
const isValidBookID = (bookId: string): boolean => isNumberProvided(bookId);

// ISBN validation
// length has to be 13digits
const isValidISBN = (isbn: string): boolean =>
    isNumberProvided(isbn) && /^\d{13}$/.test(isbn);

// Author validation
// No arguments yet
const isValidAuthor = (author: string): boolean => isStringProvided(author);

// Published year validation
// Needs to be 4 digits.
const isValidPublishYear = (year: string): boolean =>
    isNumberProvided(year) && /^\d{4}$/.test(year);

// Title validation
// No arguments yet
const isValidTitle = (title: string): boolean => isStringProvided(title);

// Average rating validation
// No arguments yet
const isValidAvgRating = (avgRating: string): boolean =>
    isStringProvided(avgRating);

//  Rating count validation
// No arguments yet
const isValidRatingCnt = (ratingCnt: string): boolean =>
    isNumberProvided(ratingCnt);

// 1 star Rating validation
// No arguments yet
const isValidOneStar = (oneStar: string): boolean => isNumberProvided(oneStar);

// 2 star Rating validation
// No arguments yet
const isValidTwoStar = (twoStar: string): boolean => isNumberProvided(twoStar);

// 3 star Rating validation
// No arguments yet
const isValidThreeStar = (threeStar: string): boolean =>
    isNumberProvided(threeStar);

// 4 star Rating validation
// No arguments yet
const isValidFourStar = (fourStar: string): boolean =>
    isNumberProvided(fourStar);

// 5 star Rating validation
// No arguments yet
const isValidFiveStar = (fiveStar: string): boolean =>
    isNumberProvided(fiveStar);

// Image URL validation
// Must follow basic structure of http://, https://, or ftp://
const isValidImageURL = (imageURL: string): boolean =>
    isStringProvided(imageURL) &&
    /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(imageURL);

// Small Image URL validation
// Must follow basic structure of http://, https://, or ftp://
const isValidSmallImageURL = (smallImageURL: string): boolean =>
    isStringProvided(smallImageURL) &&
    /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(smallImageURL);

addBooksRouter.get('/test', (req, res) => {
    res.send('Test route working');
});

/**
 * @api {post} /addbook Request to add a book
 *
 * @apiDescription To add a book, you must provide the following information:
 * ID, ISBN, Author, Published year, Title, Average Rating, Ratings count, 1 Star Rating, 2 Star Rating, 3 Star Rating, 4 Star Rating, 5 Star Rating, Image URL and Small Image URL.
 *
 * ID rules:
 *
 * ISBN rules:
 * - Must be 13 digits.
 *
 * Author rules:
 *
 * Published Year rules:
 * - Must be 4 digits.
 *
 * Title rules:
 *
 * Average Rating rules:
 *
 * Ratings count rules:
 *
 * 1-5 Star Rating rules:
 *
 * Image URL rules:
 * - Must follow basic structure of http://, https://, or ftp://
 *
 * Small Image URL rules:
 * - Must follow basic structure of http://, https://, or ftp://
 *
 * @apiName PostaddBook
 * @apiGroup Books
 *
 * @apiBody {String} bookId the bookId of the book
 * @apiBody {String} isbn the ISBN of the book
 * @apiBody {String} author the author of the book
 * @apiBody {String} year the published year of the book
 * @apiBody {String} title the title of the book
 * @apiBody {String} avgRating the average rating of the book
 * @apiBody {String} ratingCnt the rating count of the book
 * @apiBody {String} oneStar the 1 star rating of the book
 * @apiBody {String} twoStar the 2 star rating of the book
 * @apiBody {String} threeStar the 3 star rating of the book
 * @apiBody {String} fourStar the 4 star rating of the book
 * @apiBody {String} fiveStar the 5 star rating of the book
 * @apiBody {String} imageURL the image url of the book
 * @apiBody {String} smallImageURL the small image url of the book
 *
 * @apiError (400: Invalid bookId) {String} message "Invalid or missing bookId - please refer to documentation"
 * @apiError (400: Invalid isbn) {String} message "Invalid or missing ISBN - please refer to documentation"
 * @apiError (400: Invalid author) {String} message "Invalid or missing Author Name - please refer to documentation"
 * @apiError (400: Invalid year) {String} message "Invalid or missing Published Year - please refer to documentation"
 * @apiError (400: Invalid title) {String} message "Invalid or missing Title - please refer to documentation"
 * @apiError (400: Invalid avgRating) {String} message "Invalid or missing Average Rating - please refer to documentation"
 * @apiError (400: Invalid oneStar) {String} message "Invalid or missing One star Rating - please refer to documentation"
 * @apiError (400: Invalid twoStar) {String} message "Invalid or missing Two star Rating - please refer to documentation"
 * @apiError (400: Invalid threeStar) {String} message "Invalid or missing Three star Rating - please refer to documentation"
 * @apiError (400: Invalid fourStar) {String} message "Invalid or missing Four star Rating - please refer to documentation"
 * @apiError (400: Invalid fiveStar) {String} message "Invalid or missing Five star Rating - please refer to documentation"
 * @apiError (400: Invalid imageURL) {String} message "Invalid or missing Image URL - please refer to documentation"
 * @apiError (400: Invalid smallImageURL) {String} message "Invalid or missing Small Image URL - please refer to documentation"
 *
 *
 */
addBooksRouter.post(
    '/addbook',
    checkToken,
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidBookID(request.body.bookId)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing Book ID',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidISBN(request.body.isbn)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing ISBN',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidAuthor(request.body.author)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing Author Name',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidPublishYear(request.body.year)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing Published Year',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidTitle(request.body.title)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing Title',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidAvgRating(request.body.avgRating)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing average rating',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidRatingCnt(request.body.ratingCnt)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing rating count',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidOneStar(request.body.oneStar)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing 1 star rating',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidTwoStar(request.body.twoStar)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing 2 star rating',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidThreeStar(request.body.threeStar)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing 3 star rating',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidFourStar(request.body.fourStar)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing 4 star rating',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidFiveStar(request.body.fiveStar)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing 5 star rating',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidImageURL(request.body.imageURL)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing imageURL',
            });
        }
    },
    (request: Request, response: Response, next: NextFunction) => {
        if (isValidSmallImageURL(request.body.smallImageURL)) {
            next();
        } else {
            response.status(400).send({
                message: 'Invalid or Missing small imageURL',
            });
        }
    },
    // Insert to the database when all validations are cleared.
    async (request: Request, response: Response, next: NextFunction) => {
        const theQuery =
            'INSERT INTO books (id, isbn13, authors, publication_year, title, rating_avg, rating_count, rating_1_star, rating_2_star, rating_3_star, rating_4_star, rating_5_star, image_url, image_small_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
        const values = [
            request.body.bookId,
            request.body.isbn,
            request.body.author,
            request.body.year,
            request.body.title,
            request.body.avgRating,
            request.body.ratingCnt,
            request.body.oneStar,
            request.body.twoStar,
            request.body.threeStar,
            request.body.fourStar,
            request.body.fiveStar,
            request.body.imageURL,
            request.body.smallImageURL,
        ];
        try {
            const result = await pool.query(theQuery, values);
            response.status(201).send({
                entry: format(result.rows[0]),
            });
        } catch (error) {
            if (error.detail && <string>error.detail.endsWith('exists.')) {
                console.error('Duplicate entry detected');
                response.status(400).send({
                    message: 'Duplicate entry exists',
                });
            } else {
                console.error('DB Query error on POST');
                console.error(error);
                response.status(500).send({
                    message: 'Server error - contact support',
                });
            }
        }
    }
);

export { addBooksRouter };
