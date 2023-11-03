const router = require("express").Router();
const userController = require("../controller/users");

/**
 * Get user by id or email
 * @method GET
 * @route /api/v1/users/:userId
 * @visibility private
 */
router.get("/:userId", userController.getUserById);

/**
 * update user by id
 * @method PUT
 * @route /api/v1/users/:userId
 * @visibility private
 */
router.put("/:userId", userController.putUserById);

/**
 * update user by id
 * @method PATCH
 * @route /api/v1/users/:userId
 * @visibility private
 */
router.patch("/:userId", userController.patchUserById);

/**
 * delete user by id
 * @method DELETE
 * @route /api/v1/users/:userId
 * @visibility private
 */
router.delete("/:userId", userController.deleteUserById);

/**
 * Get all users, include
 * TODO:
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=["by","name"]
 * @method GET
 * @visibility private
 */

router.get("/", userController.getUsers);

/**
 * Create a new user
 * @route /api/v1/users
 * @method POST
 * @visibility private
 */
router.post("/", userController.postUser);

module.exports = router;
