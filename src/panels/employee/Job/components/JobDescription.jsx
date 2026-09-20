import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function DescriptionSection({
  data,
  onChange,
  errors = {},
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleQuillChange = (name, value) => {
    onChange({ [name]: value });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ]
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Job Description
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Describe the role, responsibilities, and qualifications.
        </p>
      </div>

      <div className="space-y-6">
        {/* Short Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Short Description *
          </label>
          <input
            type="text"
            name="shortDescription"
            value={data.shortDescription || ''}
            onChange={handleChange}
            placeholder="A short summary of the job..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          {errors.shortDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Job Description *
          </label>
          <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
            <ReactQuill
              theme="snow"
              value={data.description || ''}
              onChange={(val) => handleQuillChange('description', val)}
              modules={modules}
              placeholder="Describe the role, day-to-day work, and expectations..."
            />
          </div>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Responsibilities */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Key Responsibilities *
          </label>
          <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
            <ReactQuill
              theme="snow"
              value={data.responsibilities || ''}
              onChange={(val) => handleQuillChange('responsibilities', val)}
              modules={modules}
              placeholder="List key responsibilities..."
            />
          </div>
          {errors.responsibilities && (
            <p className="mt-1 text-sm text-red-500">{errors.responsibilities}</p>
          )}
        </div>

        {/* Qualifications */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Qualifications *
          </label>
          <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
            <ReactQuill
              theme="snow"
              value={data.qualifications || ''}
              onChange={(val) => handleQuillChange('qualifications', val)}
              modules={modules}
              placeholder="List required qualifications..."
            />
          </div>
          {errors.qualifications && (
            <p className="mt-1 text-sm text-red-500">{errors.qualifications}</p>
          )}
        </div>

        {/* Why Join Us */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Why Join Us
          </label>
          <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
            <ReactQuill
              theme="snow"
              value={data.whyJoinUs || ''}
              onChange={(val) => handleQuillChange('whyJoinUs', val)}
              modules={modules}
              placeholder="Highlight company culture, growth opportunities, and benefits..."
            />
          </div>
        </div>
      </div>

      <style>{`
        .ql-container {
          font-size: 16px;
          min-height: 150px;
        }
        .ql-toolbar {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          background: #f8fafc;
        }
        .ql-container.ql-snow {
          border: none !important;
        }
      `}</style>
    </div>
  );
}
