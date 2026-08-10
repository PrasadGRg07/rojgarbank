import BasicInformation from "./BasicInformation";
import DescriptionSection from "./JobDescription";
import RequirementSection from "./RequirementSection";
import SalarySection from "./SalarySection";
import LocationSection from "./LocationSection";
import BenefitSection from "./BenefitSection";
import ApplicationSection from "./ApplicationSettings";
import PublishActions from "./PublishActions";

export default function JobForm({
  data,
  errors = {},
  loading = false,

  onChange,

  onPublish,
  onPreview,
  onSaveDraft,
  onSchedule,
  onCancel,
}) {
  return (
    <div className="space-y-8">

      <BasicInformation
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <DescriptionSection
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <RequirementSection
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <SalarySection
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <LocationSection
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <BenefitSection
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <ApplicationSection
        data={data}
        errors={errors}
        onChange={onChange}
      />

      <PublishActions
        loading={loading}
        onPublish={onPublish}
        onPreview={onPreview}
        onSaveDraft={onSaveDraft}
        onSchedule={onSchedule}
        onCancel={onCancel}
      />

    </div>
  );
}