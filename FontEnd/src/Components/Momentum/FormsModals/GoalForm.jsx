import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import "./Styles.css";
import { toast } from 'react-hot-toast';
import { createOutcomeReq } from '../../../Redux/Actions/outcome.action';
import { useDispatch } from 'react-redux';
import { createGoalReq } from '../../../Redux/Actions/goal.action';

const OutcomeValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  startDate: Yup.date()
    .nullable()
    .typeError('Invalid date')
    .min(new Date(), 'Start date cannot be in the past'),
});

function formatDate(date) {
  return date.toISOString().split('T')[0]; // => "YYYY-MM-DD"
}

function GoalForm({ isOpen, onClose, milestone }) {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const initialValues = {
    title: '',
    startDate: '',
   
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const startDateObj = new Date(values.startDate);
      const endDateObj = new Date(startDateObj);
      endDateObj.setDate(startDateObj.getDate() + 6);

      const goaldata = {
        title: values.title,
        milestone: milestone,
        startDate: values.startDate,
        endDate: endDateObj.toISOString().slice(0,10), // en format ISO pour backend
      };
console.log("GoalData", goaldata);
      await dispatch(createGoalReq(goaldata));
      toast.success("Goal added successfully");
      setSubmitting(false);
      resetForm();
      onClose();
    } catch (error) {
      toast.error("Error adding Goal");
      setSubmitting(false);
    }
  };

  const UpdateEndDate = () => {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
      if (values.startDate) {
        const start = new Date(values.startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        setFieldValue('endDate', formatDate(end));
      } else {
        setFieldValue('endDate', '');
      }
    }, [values.startDate, setFieldValue]);

    return null;
  };

  const ResetOnOpen = () => {
    const { resetForm } = useFormikContext();
    useEffect(() => {
      if (isOpen) {
        resetForm();
      }
    }, [isOpen, resetForm]);
    return null;
  };

  return (
    <div className="modal-form" onClick={onClose}>
      <div className="modal-container-form" onClick={e => e.stopPropagation()}>
        <div className="modal-content-form milestone-form-dialog">
          <div className="modal-header milestone-gap-title mb-0">
            <h5>Add Outcome</h5>
            <button type="button" className="close-btn" onClick={onClose}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M3.33301 15.9998C3.33301 10.0287..." stroke="#221E5D" strokeWidth="1.5" />
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
                <ResetOnOpen />
                <UpdateEndDate />

                <div className="form-group mb-3">
                  <label htmlFor="title" className="form-label">Goal</label>
                  <Field type="text" name="title" className="form-control" placeholder="Enter Goal" />
                  <div className="text-dangers">
                    <ErrorMessage name="title" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <Field type="date" name="startDate" className="form-control" />
                  <div className="text-dangers">
                    <ErrorMessage name="startDate" />
                  </div>
                </div>

                {/* <div className="form-group mb-3">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <Field type="text" name="endDate" className="form-control" readOnly />
                </div> */}

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

export default GoalForm;
