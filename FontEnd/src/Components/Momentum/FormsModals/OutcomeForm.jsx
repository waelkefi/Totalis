import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Styles.css";
import { toast } from 'react-hot-toast';
import { createOutcomeReq } from '../../../Redux/Actions/outcome.action';
import { useDispatch } from 'react-redux';

// Validation Schema
const OutcomeValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  expected_completion: Yup.date().nullable().typeError('Invalid date'),
});

function OutcomeForm({ isOpen, onClose, vision }) {
  const dispatch = useDispatch(); 

  if (!isOpen) return null;

  const initialValues = {
    title: '',
    description: '',
    expected_completion: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const outcomeData = {
      ...values,
      vision: vision._id,
    };
    try {
      await dispatch(createOutcomeReq(outcomeData));
      toast.success("Outcome added successfully");
      setSubmitting(false);
      resetForm();
      onClose();
    } catch (error) {
      toast.error("Error adding outcome");
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-form" onClick={onClose}>
      <div className="modal-container-form" onClick={e => e.stopPropagation()}>
        <div className="modal-content-form milestone-form-dialog">
          <div className="modal-header milestone-gap-title mb-0">
            <h5>Add Outcome</h5>
            <button type="button" className="close-btn" onClick={onClose}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33301 15.9998C3.33301 10.0287 3.33301 7.04311 5.188 5.18812C7.04299 3.33313 10.0286 3.33313 15.9997 3.33313C21.9708 3.33313 24.9564 3.33313 26.8114 5.18812C28.6663 7.04311 28.6663 10.0287 28.6663 15.9998C28.6663 21.9709 28.6663 24.9565 26.8114 26.8115C24.9564 28.6665 21.9708 28.6665 15.9997 28.6665C10.0286 28.6665 7.04299 28.6665 5.188 26.8115C3.33301 24.9565 3.33301 21.9709 3.33301 15.9998Z" stroke="#221E5D" strokeWidth="1.5" />
                <path d="M18.6663 16L9.33301 16M17.3738 14.2322L15.2336 12.1452M17.3738 17.7677L15.2336 19.8547" stroke="#221E5D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={OutcomeValidationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="p-3">
                <div className="form-group mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <Field type="text" name="title" className="form-control" placeholder="Enter outcome title" />
                  <div className="text-dangers">
                    <ErrorMessage name="title" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="form-control"
                    placeholder="Describe the outcome"
                    rows="4"
                  />
                  <div className="text-dangers">
                    <ErrorMessage name="description" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="expected_completion" className="form-label">Expected Completion Date</label>
                  <Field type="date" name="expected_completion" className="form-control" />
                  <div className="text-dangers">
                    <ErrorMessage name="expected_completion" />
                  </div>
                </div>

                <button style={{ float: "right" }} type="submit" className="sec-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default OutcomeForm;
