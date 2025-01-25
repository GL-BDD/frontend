
export default function ShowCertifications({certifications}) {
  return (
    <>
    {certifications && certifications.map((certification) => (
        <div>
            <p>{certification?.certification_name} - {certification?.issue_date}</p>
            <img src={certification?.attachment} alt="image certification" />
            <br />
        </div>
    ))}
    </>
  )
}
