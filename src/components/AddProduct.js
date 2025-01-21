import React from 'react'


import UploadImg from './UploadImg'
import NumberInput from './NumberInput'
import UploadCertificateLink from './UploadCertificateLink'

export default function AddProduct() {
  return (
    <>
    <UploadCertificateLink/>
    <NumberInput/>
    <UploadImg/>
    <div className="container d-flex justify-content-between">
    <button type="button" class="btn btn-primary btn-lg">Save</button>
    <button type="button" class="btn btn-secondary btn-lg">Discard</button>
    </div>
    </>
  )
}
