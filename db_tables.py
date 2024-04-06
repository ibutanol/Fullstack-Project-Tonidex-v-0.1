from sqlalchemy import create_engine, ForeignKey, Column,Text, String, Integer 
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship 
from dataclasses import dataclass

engine = create_engine("sqlite:///Toniedata.db")
base = declarative_base() 
Session = sessionmaker(bind=engine)

@dataclass
class Tonies(base):
    __tablename__ = "Tonies"

    tonie_id = Column("tonie_id", Integer, primary_key=True, autoincrement=True)
    title = Column("title", String(50), nullable=False)
    figure = Column("figure", String(50), nullable=False)
    description = Column("description", Text(), nullable=False)
    runtime = Column("runtime", String(20), nullable=True, default="Keine Laufzeit")
    age_recommendation = Column("age_recommendation", String(20), nullable=True, default="Keine Altersangabe")
    image = Column("image", String(250), nullable=True)
    titles = relationship("Titles")

          

class Titles(base):
    __tablename__ = "Titles"

    
    title_id = Column("title_id", Integer, primary_key=True, autoincrement=True)
    title_nr = Column("title_nr", Integer, nullable=False)
    titles = Column("title", String, nullable=True)
    tonie_id = Column("tonie_id", Integer, ForeignKey("Tonies.tonie_id"))
    tonie = relationship("Tonies",back_populates="titles")

class Wunschliste(base):
    __tablename__ = "Wunschliste"

    wishlist_id = Column("wishlist_id", Integer, primary_key=True, autoincrement=True)
    tonie_id = Column("tonie_id", Integer, ForeignKey("Tonies.tonie_id"))
    user_id = Column("user_id", Integer, ForeignKey("User.user_id"))
    user = relationship("User",back_populates="wishlist")

class User(base):
    __tablename__ = "User"

    user_id = Column("user_id", Integer, primary_key=True, autoincrement=True)
    when = Column("Wann", String(50), nullable=False)
    namen = Column("Name", String(50), nullable=False)
    wishlist_id = Column("wishlist_id", Integer, ForeignKey("Wunschliste.whishlist_id"))
    wishlist = relationship("Wunschliste")

                                                    



if __name__ == "__main__":
    base.metadata.create_all(bind=engine)        


