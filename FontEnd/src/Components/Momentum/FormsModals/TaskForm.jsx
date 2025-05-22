import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import "./Styles.css";
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createActionReq } from '../../../Redux/Actions/action.action';

const TaskValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  date: Yup.date()
    .nullable()
    .typeError('Invalid date')
    .min(new Date(), 'Date cannot be in the past'),
    startHour: Yup.string()
    .required('Start hour is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start hour must be a valid time (HH:mm)'),
  endHour: Yup.string()
    .required('End hour is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'End hour must be a valid time (HH:mm)')
    .test('is-after-start', 'End hour must be after start hour', function (value) {
      const { startHour } = this.parent;
      if (!startHour || !value) return true;
      return value > startHour;
    }),
});

function TaskForm({ isOpen, onClose, goal }) {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const initialValues = {
    title: '',
    date: '',
    startHour: '',
    endHour: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const taskData = {
        title: values.title,
        goal: goal._id,
        date: values.date,
        startHour: values.startHour,
        endHour: values.endHour,
      };

      console.log("Data", taskData);
      await dispatch(createActionReq(taskData));
      toast.success("Task added successfully");
      setSubmitting(false);
      resetForm();
      onClose();
    } catch (error) {
      toast.error("Error adding Task");
      setSubmitting(false);
    }
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
            <h5>Add Task</h5>
            <button type="button" className="close-btn" onClick={onClose}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M3.33301 15.9998C3.33301 10.0287..." stroke="#221E5D" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={TaskValidationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="p-3">
                <ResetOnOpen />

                <div className="form-group mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <Field type="text" name="title" className="form-control" placeholder="Enter task title" />
                  <div className="text-dangers">
                    <ErrorMessage name="title" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <Field type="date" name="date" className="form-control" />
                  <div className="text-dangers">
                    <ErrorMessage name="date" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="startHour" className="form-label">Start Hour</label>
                  <Field type="time" name="startHour" className="form-control" />
                  <div className="text-dangers">
                    <ErrorMessage name="startHour" />
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="endHour" className="form-label">End Hour</label>
                  <Field type="time" name="endHour" className="form-control" />
                  <div className="text-dangers">
                    <ErrorMessage name="endHour" />
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

export default TaskForm;
