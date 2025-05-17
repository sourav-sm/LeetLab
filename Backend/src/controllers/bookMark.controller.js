import { db } from "../libs/db.js";

// get all bookmarks for a user
export const getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await db.bookMark.findMany({
      where: {
        userId: req.user.id, 
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Bookmarks fetched successfully",
      bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch bookmarks",
    });
  }
};

// get a single bookmark
export const getBookMarks = async (req, res) => {
  const { bookMarkId } = req.params;
  try {
    const bookmark = await db.bookMark.findUnique({
      where: {
        id: bookMarkId,
        userId: req.user.id, 
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!bookmark) {
      return res.status(404).json({
        error: "Bookmark not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookmark fetched successfully",
      bookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch bookmark",
    });
  }
};

// Create a new bookmark
export const createBookMark = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const bookMark = await db.bookMark.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Bookmark created successfully",
      bookMark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to create bookmark",
    });
  }
};

// Add problems to a bookmark
export const addProblemToBookMark = async (req, res) => {
  const { bookMarkId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
        console.log(problemIds);
      return res.status(400).json({ error: "Invalid or missing problemIds" });
    }

    const problemsInBookMark = await db.ProblemInBookMark.createMany({
      data: problemIds.map((problemId) => ({
        BookMarkId:bookMarkId,
        problemId,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to bookmark",
      problemsInBookMark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to add problems to bookmark",
    });
  }
};

// Delete a bookmark
export const deleteBookMark = async (req, res) => {
  const { bookMarkId } = req.params;
  try {
    const deletedBookMark = await db.bookMark.delete({
      where: {
        id: bookMarkId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Bookmark deleted successfully",
      deletedBookMark,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to delete bookmark",
    });
  }
};

// Remove problems from a bookmark
export const removeProblemFromBookMark = async (req, res) => {
  const { bookMarkId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing problemIds",
      });
    }

    const deletedProblems = await db.problemsInBookMark.deleteMany({
      where: {
        bookMarkId,
        problemId: {
          in: problemIds,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems removed from bookmark",
      deletedProblems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to remove problems from bookmark",
    });
  }
};
