import { Note } from '../models/note.js';
export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search = '' } = req.query;

    const skip = (page - 1) * perPage;

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
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};
