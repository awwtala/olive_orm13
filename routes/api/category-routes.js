const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// find all categoriey
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const categoryDataId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryDataId) {
      res
        .status(400)
        .json({ message: "This Id does not belong to a category" });
      return;
    }
    res.status(200).json(categoryDataId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  //create a new category
  try {
    const categoryNew = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(CategoryDelete);
    if (!CategoryDelete) {
      res
        .status(400)
        .json({ message: "This Id does not belong to a category" });
      return;
    }
    res.status(200).json(CategoryDelete);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
