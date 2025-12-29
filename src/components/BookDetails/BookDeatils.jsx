import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../Loader/Loader";
import coverImg from "../../images/image.png";
import "./BookDeatils.css";

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function getBookDetails() {
      setLoading(true);

      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const {
            title,
            description,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          setBook({
            title,
            description:
              typeof description === "string"
                ? description
                : description?.value || "No description found",
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places?.join(", ") || "No subject places found",
            subject_times: subject_times?.join(", ") || "No subject times found",
            subjects: subjects?.join(", ") || "No subjects found",
          });
        } else {
          setBook(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    }

    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  if (!book) {
    return (
      <section className="book-details">
        <div className="container">
          <p>Book details not available.</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book.cover_img} alt={book.title} />
          </div>

          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book.title}</span>
            </div>

            <div className="book-details-item description">
              <span>{book.description}</span>
            </div>

            <div className="book-details-item">
              <span className="fw-6">Subject Places: </span>
              <span className="text-italic">{book.subject_places}</span>
            </div>

            <div className="book-details-item">
              <span className="fw-6">Subject Times: </span>
              <span className="text-italic">{book.subject_times}</span>
            </div>

            <div className="book-details-item">
              <span className="fw-6">Subjects: </span>
              <span>{book.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
