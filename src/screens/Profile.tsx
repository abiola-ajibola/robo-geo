import { Navigate } from "react-router-dom";
import { User } from "../types";
import useBlank from "../hooks/useBlank";
import LabeledListItem from "../components/LabeledListItem";
import useGeoData from "../hooks/useGeoData";
import CurrenciesTable from "../components/CurrenciesTable";
import "../styles/profile.css";
import CircularLoader from "../components/CircularLoader";

export default function Profile({ user }: { user: User }): JSX.Element {
  useBlank();
  const geoData = useGeoData(user.address.geo);

  if (!user.id) return <Navigate to="/map" />;
  const userImageUrl = new URL(user.image_url);
  userImageUrl.searchParams.delete("size");
  userImageUrl.searchParams.append("size", "256x256");

  const { name, username, email, address, phone, website, company } = user;

  const pseudoAddress = `${address.suite}, ${address.street}, ${address.city}.`;

  return (
    <div className="profile-page__wrapper">
      <div className="profile-page__left">
        <div className="profile-image__wrapper">
          <img src={userImageUrl.href} alt={name} className="profile-image" />
        </div>
        <h2 className="header__h2 separator">BIO DATA</h2>
        <div className="profile-page__bio-data__wrapper">
          <h3 className="header__h3">{name}</h3>
          <ul className="profile-page__bio-data">
            <LabeledListItem label="Username">{username}</LabeledListItem>
            <LabeledListItem label="Email">
              {" "}
              <a href={"mailto:" + email}>{email}</a>
            </LabeledListItem>
            <LabeledListItem label="Pseudo-address">
              {pseudoAddress}
            </LabeledListItem>
            <LabeledListItem label="Phone">
              <a href={"tel:+1" + phone}>{phone}</a>
            </LabeledListItem>
            <LabeledListItem label="Website">
              <a href={"http://" + website}>{website}</a>
            </LabeledListItem>
            <LabeledListItem label="Company">{company.name}</LabeledListItem>
          </ul>
        </div>
      </div>
      <div className="profile-page__right">
        <h2 className="header__h2 separator">ACTUAL LOCATION INFO</h2>
        <div className="profile-page__bio-data__wrapper">
          {geoData && !geoData.error ? (
            geoData.type === "ocean" ? (
              <ul className="profile-page__bio-data">
                <LabeledListItem label="Ocean Name">
                  {geoData.ocean_name}
                </LabeledListItem>
                <h4 className="key">About:</h4>
                <article className="value">{geoData?.about}</article>
              </ul>
            ) : (
              <ul className="profile-page__bio-data">
                <LabeledListItem label="Country">
                  {geoData?.country}
                </LabeledListItem>
                <LabeledListItem label="Official name">
                  {geoData?.official_name}
                </LabeledListItem>
                <LabeledListItem label="State">
                  {geoData?.state}
                </LabeledListItem>
                <LabeledListItem label="Address">
                  {geoData?.display_name}
                </LabeledListItem>
                <LabeledListItem label="Flag">
                  <br />
                  <img
                    src={geoData?.flag_url}
                    alt={geoData?.country + " flag"}
                  />
                </LabeledListItem>
                <LabeledListItem label="ISO codes">
                  <br />
                  <span>Country: </span>
                  <span>{geoData?.ISO_country}</span>
                  <br />
                  <span>State: </span>
                  <span>{geoData?.ISO_state}</span>
                </LabeledListItem>
                <LabeledListItem label="Capital">
                  {geoData?.capital}
                </LabeledListItem>
                <LabeledListItem label="Dialing code">
                  {geoData?.calling_code}
                </LabeledListItem>
                <LabeledListItem label="Currencies">
                  <CurrenciesTable className="profile-page__currencies-table">
                    {geoData?.currencies?.map(({ code, name, symbol }) => {
                      return (
                        <tr key={name}>
                          <td>{name}</td>
                          <td>{code}</td>
                          <td>{symbol}</td>
                        </tr>
                      );
                    })}
                  </CurrenciesTable>
                </LabeledListItem>
                <LabeledListItem label="Timezones">
                  {geoData?.timezones?.join(", ")}
                </LabeledListItem>
                <LabeledListItem label="Top Level Domains (TLD)">
                  {geoData?.top_level_domain?.join(", ")}
                </LabeledListItem>
                <LabeledListItem label="Area">
                  {geoData?.area?.toString() + " "}
                  km<sup>2</sup>
                </LabeledListItem>
                <LabeledListItem label="Population">
                  {geoData?.population?.toString()}
                </LabeledListItem>
                <h4 className="key">About:</h4>
                <article className="value">{geoData?.about}</article>
              </ul>
            )
          ) : (
            <h2 className="error__loader">
              {geoData?.error || (
                <div className="spinner__wrapper">
                  <CircularLoader />
                </div>
              )}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
