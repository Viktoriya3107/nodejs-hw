import { Note } from '../models/note.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search = '' } = req.query;

    const pageNumber = Number(page);
    const perPageNumber = Number(perPage);

    const skip = (pageNumber - 1) * perPageNumber;

    const query = {};

    if (tag) {
      query.tag = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const totalNotes = await Note.countDocuments(query);

    const notes = await Note.find(query)
      .skip(skip)
      .limit(perPageNumber);

    const totalPages = Math.ceil(totalNotes / perPageNumber);

    res.status(200).json({
      page: pageNumber,
      perPage: perPageNumber,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};
