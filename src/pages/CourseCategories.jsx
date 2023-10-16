import React, { Suspense, useState } from "react";
import { httpInterceptedService } from "@core/http-service";
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import CategoryList from "../features/categories/components/CategoryList";
import Modal from "../components/Modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AddOrUpdateCategory from "../features/categories/components/AddOrUpdateCategory";
import { useCategoryContext } from "../features/categories/components/CategoryContext";

const CourseCategories = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { category } = useCategoryContext();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const deleteCategory = (categoryId) => {
    setSelectedCategory(categoryId);

    setShowDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);

    const response = httpInterceptedService.delete(
      `/Course/Category/${selectedCategory}`
    );

    toast.promise(
      response,
      {
        pending: "درحال حذف",
        success: {
          render() {
            const url = new URL(window.location.href);

            navigate(url.pathname + url.search);

            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }) {
            return t("categoryList." + data.response.data.code);
          },
        },
      },
      {
        position: toast.POSITION.BOTTOM_LEFT,
      }
    );
  };

  const data = useLoaderData();
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h3 className="mb-0">دسته بندی دوره ها</h3>
            <a
              href="#"
              className="btn btn-primary fw-bolder  mt-n1"
              onClick={() => setShowAddCategory(true)}
            >
              <i className="fas fa-plus ms-2"></i>افزودن دسته جدید
            </a>
          </div>
          {(showAddCategory || category) && (
            <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
          )}

          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
          >
            <Await resolve={data.categories}>
              {(loadedCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadedCategories}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف اطمینان دارید؟"
      >
        <button
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal>
    </>
  );
};

const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = import.meta.env.VITE_PAGE_SIZE;
  let url = "/CourseCategory/sieve";

  url += `?page=${page}&pageSize=${pageSize}`;

  const response = await httpInterceptedService.get(url);
  return response.data;
};

export async function categoriesLoader({ request }) {
  return defer({
    categories: loadCategories(request),
  });
}

export default CourseCategories;
